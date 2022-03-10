import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { RegistrationService } from "../../service/registration-service";
import { ExpressHandler } from "./types";

@injectable()
export class GetRegistrationsHandler implements ExpressHandler {
  constructor(private registrationService: RegistrationService) {}
  async handle(_request: Request<GetRegistrationParams>, response: Response) {
    const registrations = await this.registrationService.getAllRegistrations();
    response.send(registrations).set("Content-Type", "application/json");
  }
}
