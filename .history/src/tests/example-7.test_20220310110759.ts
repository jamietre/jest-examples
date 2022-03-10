import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 7: Use an implementation that has repdocible values
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  container.registerType(RegistrationStore, RegistrationStoreMemory);
  const guidFactory = container.resolve(GuidFactoryMock);
  container.registerInstance(GuidFactory, guidFactory);

  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);

    const opts = getRegisterCarOptions();
    const result = await service.registerCar(opts);

    expect(result).toStrictEqual({
      id: "",
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
