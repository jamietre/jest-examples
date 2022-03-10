export type Car = {
  id: string;
  make: string;
  model: string;
};

class DbService {
  get(id: string) {
    throw new Error("Database is not connected!");
  }
  put(car: Car {
    throw new Error("Database is not connected!");
  }
}
