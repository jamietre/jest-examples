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
  async get(id: string) {
    throw new Error("Database is not connected!");
  }
  async put(car: CarRegistration) {
    throw new Error("Database is not connected!");
  }
}