class CarStoreMemory implements Requred<CarStore> {
  get(id: string) {
    throw new Error("Database is not connected!");
  }
  put();
}
