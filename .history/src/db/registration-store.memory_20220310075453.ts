import { assertIsDefined } from "../util/type-helpers";
import { Car, CarRegistration, RegistrationStore } from "./registration-store";

export class CarStoreMemory implements Required<RegistrationStore> {
  private store = new Map<string, CarRegistration>();
  get(id: string): CarRegistration | undefined {
    return this.store.get(id);
  }
  put(regitration: CarRegistration) {
    assertIsDefined(regitration.id, "You must provide an ID on a car");
    this.store.set(regitration.id, regitration);
  }
}
