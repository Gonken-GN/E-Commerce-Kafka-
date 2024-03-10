import express, {NextFunction, Request, Response} from "express";
import * as service from "../service/order.service";

const router = express.Router();

router.post("/order", async (req: Request, res: Response, next: NextFunction) => {
   return res.status(200).json({message: "Order created"});
});

router.get("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message: "Order found"});
 });

router.get("/orders", async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message: "Orders found"});
});

 router.delete("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message: "Order deleted"});
 });
export default router;