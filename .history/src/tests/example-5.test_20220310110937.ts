import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 5: Use an implementation instead of a mock
 * Shortcomings: Not evaluating a known value for ID. A bug could make this still pass.
 */

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.registerType(RegistrationStore, RegistrationStoreMemory);

  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);
    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);

    expect(result).toStrictEqual({
      id: result.id,
      ...opts,
    });
  });

  it("can retrieve previously registered car", async () => {
    const service = container.resolve(RegistrationService);
    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);
    const retrieved = await service.getRegistrationById(result.id);

    expect(retrieved).toStrictEqual({
      id: result.id,
      ...opts,
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
