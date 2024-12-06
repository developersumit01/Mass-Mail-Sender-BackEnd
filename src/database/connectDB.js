import mongoose from "mongoose";
import { DATA_BASE_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.DATA_BASE_URL}/${DATA_BASE_NAME}`
        );
        console.log("Host of the database", connectionInstance.connection.host);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
