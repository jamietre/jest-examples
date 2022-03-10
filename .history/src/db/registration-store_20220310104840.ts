import { singleton } from "tsyringe";

export type Car = {
  id: string;
  make: string;
  model: string;
};

export type CarRegistration = {
  id: string;
  carId: string;
  vin: string;
  owner: string;
};

@singleton()
export class RegistrationStore {
  async get(_id: string): Promise<CarRegistration | undefined> {
    throw new Error("Database is not connected!");
  }
  async put(_car: CarRegistration): Promise<{ id: string }> {
    throw new Error("Database is not connected!");
  }
  async getAll(): Promise<CarRegistration[]> {
    throw new Error("Database is not connected!");
  }
  async getByVin(_vin: string): Promise<CarRegistration | undefined> {
    throw new Error("Database is not connected!");
  }
}
