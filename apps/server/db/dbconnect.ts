import mongoose, { ConnectOptions } from "mongoose";

const dbconnect = (uri: any): void => {

    mongoose
        .connect(uri, {
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
}

export default dbconnect;