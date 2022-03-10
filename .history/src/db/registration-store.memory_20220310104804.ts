import { singleton } from "tsyringe";
import { GuidFactory } from "../util/guid-factory";
import { assertIsDefined } from "../util/type-helpers";
import { CarRegistration, RegistrationStore } from "./registration-store";

@singleton()
export class RegistrationStoreMemory
  implements Partial<Required<RegistrationStore>>
{
  constructor(private guidFactory: GuidFactory) {}
  private store = new Map<string, CarRegistration>();
  async get(id: string): Promise<CarRegistration | undefined> {
    return Promise.resolve(this.store.get(id));
  }
  async put(
    registration: Omit<CarRegistration, "id">
  ): Promise<{ id: string }> {
    if ((await this.getByVin(registration.vin)) !== undefined) {
      throw new Error("A registration already exists for this VIN");
    }
    const id = this.guidFactory.getGuid();
    this.store.set(registration.id, { id, ...registration });
  }
  async getAll(): Promise<CarRegistration[]> {
    return Promise.resolve([...this.store.values()]);
  }
  async getByVin(vin: string): Promise<CarRegistration | undefined> {
    const matches = Array.from(this.store.values()).filter(
      (e) => e.vin === vin
    );
    return matches.length ? matches[0] : undefined;
  }
}
