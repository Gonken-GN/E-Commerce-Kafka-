import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.do";

const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValidUser = true;
  if (!isValidUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

router.post(
  "/cart",
  authMiddleware,
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
    // come from auth user parsed from jwt token
    const response = await service.getCart(req.body.customerId, repo);
    return res.status(200).json(response);
  }
);

router.patch(
  "/cart/:lineItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = parseInt(req.params.lineItemId);
    const response = await service.updateCart(
      {
        id: lineItemId,
        qty: req.body.qty,
      },
      repo
    );
    return res.status(200).json(response);
  }
);

router.delete(
  "/cart/:lineItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = parseInt(req.params.lineItemId);
    const response = await service.deleteCart(lineItemId, repo);
    return res.status(200).json(response);
  }
);
export default router;
