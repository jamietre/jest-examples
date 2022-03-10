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
  async registerCar(options: {
    vin: string;
    owner: string;
    carId: string;
  }): CarRegistration {
    const { vin, owner, carId } = options;
    const entity: CarRegistration = {
      id: this.guidFactory.getGuid(),
      owner,
      vin,
      carId,
    };
    await this.registrationStore.put(entity);
    return entity;
  }
}
