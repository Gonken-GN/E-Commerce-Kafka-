import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
  "/catalog",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Catalog created" });
  }
);

export default router;
