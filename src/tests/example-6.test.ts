import { RegistrationService } from "../service/registration-service";
import { getTestContainer, useMemoryStore } from "./di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { FirstArg } from "../util/type-helpers";
import { Lifecycle } from "tsyringe";

/**
 * Example 6: Mock things that are dynamic (getting a GUID)
 * Shortcomings: Won't scale well to complex tests where you need different GUIDs.
 *   Both tests check against mocked guid.
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  const testGuid = "12345678-1000-1000-8000-111111111111";
  const guidFactory: jest.Mocked<GuidFactory> = {
    getGuid: jest.fn().mockReturnValue(testGuid),
  };
  container.registerInstance(GuidFactory, guidFactory);

  // This is the same code as Test 5 that uses the memory store, just extracted
  // to a common place to be more DRY
  useMemoryStore(container);

  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);

    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);

    expect(result).toStrictEqual({
      id: testGuid,
      ...opts,
    });
  });

  it("can retrieve previously registered car", async () => {
    const service = container.resolve(RegistrationService);
    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);
    const retrieved = await service.getRegistrationById(result.id);

    expect(retrieved).toStrictEqual({
      id: testGuid,
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
