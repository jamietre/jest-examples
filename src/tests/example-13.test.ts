import { RegistrationService } from "../service/registration-service";
import { getTestContainer, useMemoryStore } from "./di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 12: Testing errors
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  const guidFactory = container.resolve(GuidFactoryMock);
  container.registerInstance(GuidFactory, guidFactory);
  useMemoryStore(container);

  beforeEach(() => {
    guidFactory.reset();
  });

  it("registering duplicate vins is not allowed", async () => {
    const service = container.resolve(RegistrationService);

    const opts = getRegisterCarOptions(1);
    await service.registerCar(opts);
    await expect(service.registerCar(opts)).rejects.toThrow(
      expect.objectContaining({
        name: "BadRequestError",
        message: expect.stringMatching(/already exists/),
      })
    );
  });
});

function getRegisterCarOptions(index: number) {
  const out: FirstArg<RegistrationService["registerCar"]> = {
    carId: "tesla-model-s",
    vin: `12345-${index}`,
    owner: "Elon Musk",
  };
  return out;
}
