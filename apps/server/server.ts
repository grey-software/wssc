import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbconnect from "./db/dbconnect";
import AuthRouter from "./Routes/auth.route";
import complaint from "./Routes/Complaint.route";
import Citizen from "./Routes/citizen.route";
import WSSC from "./Routes/WSSCs.route";
import mongoose, { ConnectOptions } from "mongoose";
import testingRouter from "./dummyRoute";
import Supervisor from "./Routes/supervisor.route";

dotenv.config();

const app: Express = express();

const PORT = Number(process.env.PORT);
const Mongo_uri: any = process.env.DB_URL;

// ----- connecting to database -----
mongoose.set("strictQuery", true);
// dbconnect(Mongo_uri)
mongoose
  .connect(Mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions)
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

app.use(cors(corsOptions));

app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Default/home page route
app.get("/", (req: Request, res: Response) => {
  res.send("WELCOME TO THE 'COMMUNITY CLEANUP' PROJECT SERVER SIDE PAGE 👋");
});

// ------ Custom middlewares ---------
app.use("/api/v1/dummy", testingRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/wssc", WSSC);
app.use("/api/v1/citizens", Citizen);
app.use("/api/v1/complaints", complaint);
app.use("/api/v1/supervisors", Supervisor);

// ----- Errors handler ------
app.all("*", (req: Request, res: Response) => {
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
