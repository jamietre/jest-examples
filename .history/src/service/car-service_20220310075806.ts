import { injectable } from "tsyringe";
import {
  Car,
  CarRegistration,
  RegistrationStore,
} from "../db/registration-store";
import { GuidFactory } from "../util/guid-factory";

@injectable()
export class CarService {
  constructor(
    private registrationStore: RegistrationStore,
    private guidFactory: GuidFactory
  ) {}
  registerCar(options: {
    vin: string;
    owner: string;
    car: Car;
  }): CarRegistration {
    const { vin, owner, car } = options;
    const entity: CarRegistration = {
      carId: this.guidFactory.getGuid(),
      owner,
      vin,
      car,
    };
  }
}
