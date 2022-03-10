import { container } from "tsyringe";
import { Request, Response } from "express";
import { RegistrationService } from "../../service/registration-service";
import { ExpressHandler } from "./types";

export type GetRegistrationParams = {
  id: string;
};

export class GetRegistrationHandler implements ExpressHandler {
  constructor(private registrationService: RegistrationService) {}
   handle getRegistrationHandler(
    request: Request<GetRegistrationParams>,
    response: Response
  ) {
    const id = request.params.id;
  }
  
}
