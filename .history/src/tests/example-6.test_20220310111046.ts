import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { FirstArg } from "../util/type-helpers";

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
  container.registerType(RegistrationStore, RegistrationStoreMemory);
  container.registerInstance(GuidFactory, guidFactory);

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
