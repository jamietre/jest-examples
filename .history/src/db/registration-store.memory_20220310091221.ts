import { singleton } from "tsyringe";
import { assertIsDefined } from "../util/type-helpers";
import { CarRegistration, RegistrationStore } from "./registration-store";

export class RegistrationStoreMemory
  implements Partial<Required<RegistrationStore>>
{
  private store = new Map<string, CarRegistration>();
  async get(id: string): Promise<CarRegistration | undefined> {
    return Promise.resolve(this.store.get(id));
  }
  async put(registration: CarRegistration): Promise<void> {
    assertIsDefined(registration.id, "You must provide an ID on a car");
    this.store.set(registration.id, registration);
  }
  async getAll(): Promise<CarRegistration[]> {
    return Promise.resolve([...this.store]);
  }
}
