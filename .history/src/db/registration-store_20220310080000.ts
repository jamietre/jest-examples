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

export class RegistrationStore {
  async get(id: string): Promise<CarRegistration | undefined> {
    throw new Error("Database is not connected!");
  }
  async put(car: CarRegistration): Promise<void> {
    throw new Error("Database is not connected!");
  }
}
