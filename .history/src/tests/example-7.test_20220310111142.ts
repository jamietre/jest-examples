import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 7: Use an implementation that has reprducible values
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  container.registerType(RegistrationStore, RegistrationStoreMemory);
  const guidFactory = container.resolve(GuidFactoryMock);
  container.registerInstance(GuidFactory, guidFactory);

  beforeEach(() => {
    guidFactory.reset();
  });
  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);

    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);

    expect(result).toStrictEqual({
      id: "12345678-1000-1000-8000-000000000001",
      ...opts,
    });
  });

  it("can retrieve previously registered car", async () => {
    const service = container.resolve(RegistrationService);
    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);
    const retrieved = await service.getRegistrationById(result.id);

    expect(retrieved).toStrictEqual({
      id: "12345678-1000-1000-8000-000000000001",
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
