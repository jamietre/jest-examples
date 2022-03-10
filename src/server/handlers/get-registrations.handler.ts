import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { RegistrationService } from "../../service/registration-service";
import { ExpressHandler } from "./types";

@injectable()
export class GetRegistrationsHandler implements ExpressHandler {
  constructor(private registrationService: RegistrationService) {}
  async handle(_request: Request, response: Response) {
    const registrations = await this.registrationService.getAllRegistrations();
    response.set("Content-Type", "application/json").send(registrations);
  }
}
