import { Lifecycle } from "tsyringe";
import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { getTestContainer, useMemoryStore } from "../tests/di-setup-test";
import { RegistrationService } from "./registration-service";

describe("RegistrationService", () => {
  const container = getTestContainer();
  useMemoryStore(container);

  const testCar = {
    vin: "12345",
    carId: "tesla",
    owner: "Elon Musk",
  };

  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar(testCar);
    expect(result.carId).toBeDefined();
  });

  it("can retrieve a previously registered car", async () => {
    const service = container.resolve(RegistrationService);
    const { id } = await service.registerCar(testCar);
    const registeredCar = await service.getRegistrationById(id);
    expect(registeredCar).toStrictEqual({
      id,
      ...testCar,
    });
  });
});
