import { injectable } from "tsyringe";
import { Car, CarRegistration, RegistrationStore } from "../db/registration-store";
import { GuidFactory } from "../util/guid-factory";

@injectable()
export class CarService {
  constructor(private registrationStore: RegistrationStore, guidFactory: GuidFactory) {}
  registerCar(vin: string, car: Car): CarRegistration {
    const entity: CarRegistration = {
      carId: 
    }
  }
}
