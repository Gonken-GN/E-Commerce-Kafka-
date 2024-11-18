import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/order.service";
import { MessageBroker } from "../utils/broker";
import { OrderEvent } from "../types";

const router = express.Router();

router.post(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    //  3rd step: publish the message
    // await MessageBroker.publish({
    //   topic: "OrderEvents",
    //   headers: { token: req.headers.authorization },
    //   event: OrderEvent.CREATE_ORDER,
    //   message: {
    //     orderId: 1,
    //     items: [
    //       {
    //         productId: 1,
    //         quantity: 2,
    //       },
    //       {
    //         productId: 2,
    //         quantity: 3,
    //       },
    //     ],
    //   },
    // });
    return res.status(200).json({ message: "Order created" });
  }
);

router.get(
  "/order/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Order found" });
  }
);

router.get(
  "/orders",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Orders found" });
  }
);

router.delete(
  "/order/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Order deleted" });
  }
);
export default router;
