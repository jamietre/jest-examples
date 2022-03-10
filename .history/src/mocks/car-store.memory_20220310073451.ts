import { assertIsDefined } from "../util/type-helpers";
import { Car, CarStore } from "./car-store";

export class CarStoreMemory implements Required<CarStore> {
  private store = new Map<string, Car>();
  get(id: string): Car | undefined {
    return this.store.get(id);
  }
  put(car: Car) {
    assertIsDefined(car.id, "You must provide an ID on a car");
    store[car.id];
  }
}
