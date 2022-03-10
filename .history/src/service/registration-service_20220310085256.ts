import { injectable } from "tsyringe";
import {
  Car,
  CarRegistration,
  RegistrationStore,
} from "../db/registration-store";
import { GuidFactory } from "../util/guid-factory";

@injectable()
export class RegistrationService {
  constructor(
    private registrationStore: RegistrationStore,
    private guidFactory: GuidFactory
  ) {}
  async registerCar(options: {
    vin: string;
    owner: string;
    carId: string;
  }): Promise<CarRegistration> {
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
  async getRegistrationById(registrationId: string): Promise<CarRegistration> {
    const out = await this.registrationStore.get(registrationId);
    if (!out) {
      throw new Error("Bad Request - regisration was not found");
    }
    return out;
  }

  async registerCar(options: {
    id: string;
    carId: string;
    owner: string;
  }): CarRegistration {}
}
