import { container, injectable } from "tsyringe";
import { Request, Response } from "express";
import { RegistrationService } from "../../service/registration-service";
import { ExpressHandler } from "./types";
import { CarRegistration } from "../../db/registration-store";

export type PostRegistrationParams = Omit<CarRegistration, "id">;

@injectable()
export class PostRegistrationHandler implements ExpressHandler {
  constructor(private registrationService: RegistrationService) {}
  async handle(
    request: Request<{}, PostRegistrationParams>,
    response: Response
  ) {
    const options = request.body;
    const registration = await this.registrationService.registerCar(options);
    response.set("Content-Type", "application/json").send(registration);
  }
}
