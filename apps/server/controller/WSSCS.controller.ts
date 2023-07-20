import { NextFunction, Request, Response } from "express";
import { AdminsModel } from "../Models/WsscsAdmin.schema";
import bcrypt from 'bcryptjs'
import { WSSC_TYPES } from "../@types/WSSC'sSchema.type";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { citizenModel } from "../Models/citizen.schema";
import { SupervisorModel } from "../Models/supervisor.schema";
import { ComplaintModel } from "../Models/complaint.schema";
dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY: any = process.env.JWT_KEY;

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { fullname, shortname, logo, WSSC_CODE, password, isAdmin } = req.body;
    // checking whether there is same wssc organization registered or not
    // encrypt password by using bcrypt algorithm
    const salt: string = bcrypt.genSaltSync(10);
    const hashPassword: string = bcrypt.hashSync(password, salt);
    console.log(hashPassword)
    try {
        const admin = await AdminsModel.findOne({ WSSC_CODE: req.body.WSSC_CODE });
        console.log(admin)
        if (!admin) {

            const RegisterWSSC: any = new AdminsModel({ fullname, shortname, logo, WSSC_CODE: WSSC_CODE, isAdmin: isAdmin, password: hashPassword })
            await RegisterWSSC.save();

            const { password, ...detail } = RegisterWSSC._doc;
            res.status(200).json({ success: true, status: 200, ...detail })
        }
        else {
            res.status(403).json({ success: false, status: 403, message: "this organization has already registered!" })
        }

    } catch (error) {
        res.status(500).json({ success: false, status: 500, error })
    }
}

// SignIn controller
export const SignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const { WSSC_Code, password } = req.body;
    console.log(req.body)
    // first we need to validate the data before saving it in DB
    // const { error } = SignIn_validate(req.body);
    // if (error) return res.send(error.details[0].message);

    try {
        console.log("inside admin page")
        const admin:
            | (WSSC_TYPES & {
                _id: Types.ObjectId;
                _doc: any;
            })
            | null = await AdminsModel.findOne({ WSSC_CODE: req.body.WSSC_CODE });
        if (!admin)
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Wrong Credentials",
            });
        // Now checking password
        const isCorrect: boolean = await bcrypt.compare(
            req.body.password,
            admin.password
        );

        // if the password is wrong.
        if (!isCorrect)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        // if the user credential is okay then we assign/send jwt token for authentication and authorization
        const adminToken = jwt.sign({ id: admin._id, name: admin.shortname, isAdmin: admin.isAdmin, WSSC_CODE: admin.WSSC_CODE }, SECRET_KEY)
        const { password, ...detail } = admin._doc;

        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // })
            res.status(200)
            .json({detail, adminToken});
    } catch (error) {
        res.status(500).json({ success: false, status: 500, error })
    }
};

// In case of logout, we remove or deleted jwt token.
export const AdminLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res
            .clearCookie("access_token", {
                sameSite: "none",
            })
            .status(200)
            .json({
                status: 200,
                success: true,
                message: "Admin Signed Out Successfully",
            });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
};

// below controller is used to get the overall statistics on the basis of request/logged WSSC organization
export const Statistics = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const users = await citizenModel.find({ WSSC_CODE: req.user.WSSC_CODE }); // retrieve no of registered users
        const supervisors = await SupervisorModel.find({ WSSC_CODE: req.user.WSSC_CODE, isDeleted: false }); // retrieve no of superisors registered
        const complaints = await ComplaintModel.find({ WSSC_CODE: req.user.WSSC_CODE }); // retrieve no of registered complaints

        // find no of type of complaints registered
        const solidWasteComplaints = complaints.filter(complaint => complaint.complaintType === 'Solid waste').length;
        const waterSupplyComplaints = complaints.filter(complaint => complaint.complaintType === 'Water Supply').length;
        const wasteWaterComplaints = complaints.filter(complaint => complaint.complaintType === 'Waste water').length;
        const staffComplaints = complaints.filter(complaint => complaint.complaintType === 'Staff').length;
        const otherComplaints = complaints.filter(complaint => complaint.complaintType === 'Other').length;
        const waterSanitation = waterSupplyComplaints + wasteWaterComplaints;;
        // -------- getting current status of each complaints --------------------
        const lastStatusArray = complaints.map(complaint => {
            const lastStatusIndex = complaint.status.length - 1;
            const lastStatus = complaint.status[lastStatusIndex];
            return lastStatus;
        });
        // ----- below filtering is used to get the current status of each complaint ----------
        const initiatedStatus = lastStatusArray.filter(status => status.state === 'Initiated');
        const inProgressStatus = lastStatusArray.filter(status => status.state === 'InProgress');
        const completedStatus = lastStatusArray.filter(status => status.state === 'Completed');
        const closedStatus = lastStatusArray.filter(status => status.state === 'Closed');
// ---------- below is the code to get overall organization performance percentage and rating on the basis of complaints submitted by citizens
        
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let totalFeedbacks = 0;

        complaints &&
            complaints.forEach((complaint, index) => {
                if (complaint.feedback) {
                    totalFeedbacks += 1;
                }

                if (complaint?.feedback?.rating == 1) one += 1;
                if (complaint?.feedback?.rating == 2) two += 1;
                if (complaint?.feedback?.rating == 3) three += 1;
                if (complaint?.feedback?.rating == 4) four += 1;
                if (complaint?.feedback?.rating == 5) five += 1;
            });

        let rate = one * 1 + two * 2 + three * 3 + four * 4 + five * 5;

        let totalRating = 0;
        if (rate != 0) totalRating = rate / totalFeedbacks;

        const OrgPercentage = (totalRating / 5.00) * 100;
        
        res.status(200).json({
            status: 200,
            success: true,
            record: {
                users: users.length,
                supervisors: supervisors.length,
                complaints: complaints.length,
            },
            complaints: {
                solidWaste: solidWasteComplaints,
                waterSanitation: waterSanitation,
                Staff: staffComplaints,
                Other: otherComplaints
            },
            complaintsStatus: {
                Initiated: initiatedStatus.length,
                InProgress: inProgressStatus.length,
                Completed: completedStatus.length,
                Closed: closedStatus.length,
            },
            ratingAverages: { totalRating, OrgPercentage }
        });
    } catch (error) {
        res.status(404).json({ status: 404, success: false, message: error });
    }
};

// update all complaints controller
export const UpdateAllComplaints = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        // Update all complaints matching the query
        const updateResult: any = await ComplaintModel.updateMany({}, { $set: { WSSC_CODE: 'wsscm23200' } });

        res.status(200).json({ message: 'Complaints updated successfully', updatedCount: updateResult.nModified });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating complaints' });
    }


}

// shift all supervisors and users to wsscm
export const SupervisorUsersShifting = async (req: Request,
    res: Response,
    next: NextFunction) => {

    try {
        // Update all complaints matching the query
        const updateSupervisors: any = await SupervisorModel.updateMany({}, { $set: { WSSC_CODE: 'wsscm23200' } });
        const updateUsers: any = await citizenModel.updateMany({}, { $set: { WSSC_CODE: 'wsscm23200' } });

        res.status(200).json({ message: 'Shiftted all users and supervisors records successfully', supervisors: updateSupervisors.length, users: updateUsers.length });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating complaints' });
    }


}