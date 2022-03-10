import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 5: Test uses a local implementation
 */

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.registerType(RegistrationStore, RegistrationStoreMemory);

  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla-model-s",
      owner: "Elon Musk",
    });

    expect(result.id).toBeDefined();
    expect(result).toStrictEqual({
      id: result.id,
      carId: "tesla-model-s",
      vin: "12345",
      owner: "Elon Musk",
    });
  });
});

function getRegisterCarOptions() {
  const out: FirstArg<RegistrationService["registerCar"]> = {
    carId: "tesla-model-s",
    vin: "12345",
    owner: "Elon Musk",
  };
  return out;
}
