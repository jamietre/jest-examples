import { container } from "tsyringe";
import { Request, Response } from "express";
import { RegistrationService } from "../../service/registration-service";
import { ExpressHandler } from "./types";

export type GetRegistrationParams = {
  id: string;
};

@injectable()
export class GetRegistrationHandler implements ExpressHandler {
  constructor(private registrationService: RegistrationService) {}
  async handle(request: Request<GetRegistrationParams>, response: Response) {
    const id = request.params.id;
    const registration = await this.registrationService.getRegistrationById(id);
    response.send(registration).set("Content-Type", "application/json");
  }
}
