export type Car = {
  id: string;
  make: string;
  model: string;
};

class DbService {
  get(id: string) {
    throw new Error("Database is not connected!");
  }
  put() {
    throw new Error("Database is not connected!");
  }
}
