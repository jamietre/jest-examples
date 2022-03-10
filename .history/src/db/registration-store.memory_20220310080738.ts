import { singleton } from "tsyringe";
import { assertIsDefined } from "../util/type-helpers";
import {  CarRegistration, RegistrationStore } from "./registration-store";

export class RegistrationStoreMemory implements Required<RegistrationStore> {
  private store = new Map<string, CarRegistration>();
  async get(id: string): Promise<CarRegistration | undefined> {
    return Promise.resolve(this.store.get(id));
  }
  async put(regitration: CarRegistration): Promise<void> {
    assertIsDefined(regitration.id, "You must provide an ID on a car");
    this.store.set(regitration.id, regitration);
  }
}
