import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.do";

const router = express.Router();
const repo = repository.cartRepository;

router.post(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (error) {
        return res.status(404).json({ error });
      }
      const response = await service.createCart(
        req.body as CartRequestInput,
        repo
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
);

router.get(
  "/cart/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.getCart(req.body, repo);
    return res.status(200).json(response);
  }
);

router.get(
  "/carts",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.updateCart(req.body, repo);
    return res.status(200).json(response);
  }
);

router.delete(
  "/cart/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.deleteCart(req.body, repo);
    return res.status(200).json(response);
  }
);
export default router;
