import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
// This line is for production
// dotenv.config({ path: "./.env.production" });
// This line is for development of the software
dotenv.config({ path: "./.env" });
import { app } from "./app.js";

connectDB()
    .then(() => {
        console.log(process.env.DATA_BASE_URL);
        app.listen(process.env.PORT || 8080, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
