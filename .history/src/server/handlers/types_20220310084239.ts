import { Request, Response } from "express";
export interface ExpressHandler {
  handle(request: Request, response: Response): Promise<void>;
}
