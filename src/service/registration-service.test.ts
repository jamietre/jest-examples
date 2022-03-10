import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { getTestContainer } from "../test/di-setup-test";
import { Constructor } from "../util/type-helpers";
import { RegistrationService } from "./registration-service";

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.register(
    RegistrationStore,
    RegistrationStoreMemory as Partial<
      Required<RegistrationStore>
    > as Constructor<RegistrationStore>
  );

  const service = container.resolve(RegistrationService);

  const testCar = {
    vin: "12345",
    carId: "tesla",
    owner: "Elon Musk",
  };

  it("can register a car", async () => {
    const result = await service.registerCar(testCar);
    expect(result.carId).toBeDefined();
  });

  it("can retrieve a previously registered car", async () => {
    const { id } = await service.registerCar(testCar);
    const registeredCar = await service.getRegistrationById(id);
    expect(registeredCar).toStrictEqual({
      id,
      ...testCar,
    });
  });
});
