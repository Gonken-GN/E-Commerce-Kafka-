import app from "./express";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 9000;
export const StartServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    });
};

StartServer().then(() => console.log("Server started"));
