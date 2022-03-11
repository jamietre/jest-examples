import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "./di-setup-test";
import { FirstArg } from "../util/type-helpers";
import { Lifecycle } from "tsyringe";

/**
 * Example 5: Use an implementation instead of a mock
 * Benefits: We don't rely on assumptions using mock responses from a functional
 *   dependency
 * Shortcomings: Not evaluating a known value for ID returned by the
 *   service. A bug could make this still pass.
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  // Note that this will register the store in a transient scope, which means that each
  // resolution will be a new instance! This is useful for unit tests, because the
  // state will be reset for each test.
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
