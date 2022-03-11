import { RegistrationService } from "../service/registration-service";
import { getTestContainer, useMemoryStore } from "./di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 8: Evaluating large response sets
 *  Advantages: comprehensive
 *  Disadvantages: high maintenance burden
 */

describe("RegistrationService", () => {
  const container = getTestContainer();
  const guidFactory = container.resolve(GuidFactoryMock);
  container.registerInstance(GuidFactory, guidFactory);

  useMemoryStore(container);

  beforeEach(() => {
    guidFactory.reset();
  });

  it("can add multiple registrations", async () => {
    const service = container.resolve(RegistrationService);

    await service.registerCar(getRegisterCarOptions(1));
    await service.registerCar(getRegisterCarOptions(2));
    await service.registerCar(getRegisterCarOptions(3));

    const allReg = await service.getAllRegistrations();
    expect(allReg).toStrictEqual([
      {
        carId: "tesla-model-s",
        id: "12345678-1000-1000-8000-000000000001",
        owner: "Elon Musk",
        vin: "12345-1",
      },
      {
        carId: "tesla-model-s",
        id: "12345678-1000-1000-8000-000000000002",
        owner: "Elon Musk",
        vin: "12345-2",
      },
      {
        carId: "tesla-model-s",
        id: "12345678-1000-1000-8000-000000000003",
        owner: "Elon Musk",
        vin: "12345-3",
      },
    ]);
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
