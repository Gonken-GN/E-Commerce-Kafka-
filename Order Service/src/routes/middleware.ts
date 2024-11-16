import { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils/broker";

export const RequestAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("RequestAuthorizer ", req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "Unauthorized" }); 
    }
    const data = await ValidateUser(req.headers.authorization as string);
    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized" });
  }
};
