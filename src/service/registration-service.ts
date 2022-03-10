import { injectable } from "tsyringe";
import { CarRegistration, RegistrationStore } from "../db/registration-store";

@injectable()
export class RegistrationService {
  constructor(private registrationStore: RegistrationStore) {}
  async registerCar(options: {
    vin: string;
    owner: string;
    carId: string;
  }): Promise<CarRegistration> {
    const { vin, owner, carId } = options;

    const { id } = await this.registrationStore.put(options);
    return {
      ...options,
      id,
    };
  }
  async getRegistrationById(registrationId: string): Promise<CarRegistration> {
    const out = await this.registrationStore.get(registrationId);
    if (!out) {
      throw new Error("Bad Request - regisration was not found");
    }
    return out;
  }
  async getAllRegistrations(): Promise<CarRegistration[]> {
    return this.registrationStore.getAll();
  }
}
