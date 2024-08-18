import express, { Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger, httpLogger } from "./utils";

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use("/order", orderRoutes);
app.use("/cart", cartRoutes);

app.use(HandleErrorWithLogger);

export default app;
