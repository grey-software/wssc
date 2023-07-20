"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./Routes/auth.route"));
const Complaint_route_1 = __importDefault(require("./Routes/Complaint.route"));
const citizen_route_1 = __importDefault(require("./Routes/citizen.route"));
const WSSCs_route_1 = __importDefault(require("./Routes/WSSCs.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const dummyRoute_1 = __importDefault(require("./dummyRoute"));
const supervisor_route_1 = __importDefault(require("./Routes/supervisor.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
const Mongo_uri = process.env.DB_URL;
// ----- connecting to database -----
mongoose_1.default.set("strictQuery", true);
// dbconnect(Mongo_uri)
mongoose_1.default
    .connect(Mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
    .then(() => {
    console.log("Database Connected Successfuly.");
})
    .catch((err) => {
    console.log(err);
});
const corsOptions = {
    origin: ['https://fyp-wsscm-system.vercel.app', 'https://wssc-govt-kpk.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ---- Default/home page route
app.get("/", (req, res) => {
    res.send("WELCOME TO THE 'COMMUNITY CLEANUP' PROJECT SERVER SIDE PAGE 👋");
});
// ------ Custom middlewares ---------
app.use("/api/v1/dummy", dummyRoute_1.default);
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/wssc", WSSCs_route_1.default);
app.use("/api/v1/citizens", citizen_route_1.default);
app.use("/api/v1/complaints", Complaint_route_1.default);
app.use("/api/v1/supervisors", supervisor_route_1.default);
// ----- Errors handler ------
app.all("*", (req, res) => {
    res.status(500).json({
        status: 500,
        success: false,
        message: `Can not find ${req.originalUrl} on this server`,
    });
});
// -------- app listening port number ---------
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map