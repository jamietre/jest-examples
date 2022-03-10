import { injectable } from "tsyringe";
import { Car, CarRegistration, CarStore } from "../db/car-store";

@injectable()
export class CarService {
  constructor(private carStore: CarStore) {}
  registerCar(vin: string, car: Car): CarRegistration {}
}
