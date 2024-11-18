import express, { NextFunction, Request, Response } from "express";
import { MessageBroker } from "../utils/broker";
import { OrderEvent } from "../types";
import { RequestAuthorizer } from "./middleware";
import * as service from "../service/order.service";
import { OrderRepository } from "../repository/order.repository";
import { CartRepository } from "../repository/cart.repository";

const repo = OrderRepository;
const cartRepo = CartRepository;
const router = express.Router();

router.post(
  "/orders",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await service.createOrder(user.id, repo, cartRepo);
    return res.status(200).json(response);
  }
);

router.get(
  "/orders/:id",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await service.getOrders(user.id, repo);
    return res.status(200).json(response);
  }
);

router.get(
  "/orders",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const response = await service.getOrders(user.id, repo);
    return res.status(200).json({ message: "Orders found" });
  }
);

router.patch(
  "/orders/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = parseInt(req.params.id);
    const status = req.body.status;
    const response = await service.updateOrder(orderId, status, repo);
    return res.status(200).json({ message: "Orders found" });
  }
);

router.delete(
  "/orders/:id",
  RequestAuthorizer,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      next(new Error("User not found"));
      return;
    }

    const orderId = parseInt(req.params.id);
    const response = await service.deleteOrder(orderId, repo);
    return res.status(200).json({ message: "Order deleted" });
  }
);
export default router;
