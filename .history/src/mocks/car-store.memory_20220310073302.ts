import { CarStore } from "./car-store";

class CarStoreMemory implements Required<CarStore> {
  private store = new Map<string, Car>();
  get(id: string) {
    return this.store.get(id);
  }
  put(
}
