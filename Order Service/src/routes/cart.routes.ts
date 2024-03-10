import express, {NextFunction, Request, Response} from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";

const router = express.Router();
const repo = repository.cartRepository;

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.createCart(req.body, repo);
    return res.status(200).json(response);
});

router.get("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.getCart(req.body, repo);
    return res.status(200).json(response);
});

router.get("/carts", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.updateCart(req.body, repo);
    return res.status(200).json(response);
});

router.delete("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.deleteCart(req.body, repo);
    return res.status(200).json(response);
});
export default router;