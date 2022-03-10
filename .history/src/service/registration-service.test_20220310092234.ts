import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { getTestContainer } from "../test/di-setup-test";
import { Constructor } from "../util/type-helpers";
import { RegistrationService } from "./registration-service";

describe("RegistrationService", () => {
  const container = getTestContainer();
  const registrationStoreMemory = container.register(
    RegistrationStore,
    RegistrationStoreMemory as Required<RegistrationStore> as Constructor<RegistrationStore>
  );

  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla",
      owner: "Elon Musk",
    });
    expect(result.carId).toBeDefined();
  });

  it("can retrieve a previously registered car", () => {});
});
