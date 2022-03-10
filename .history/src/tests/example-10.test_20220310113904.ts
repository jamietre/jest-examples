import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 10: Partial object comparisons
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  container.registerType(RegistrationStore, RegistrationStoreMemory);
  const guidFactory = container.resolve(GuidFactoryMock);
  container.registerInstance(GuidFactory, guidFactory);

  beforeEach(() => {
    guidFactory.reset();
  });

  it("can add multiple registrations", async () => {
    const service = container.resolve(RegistrationService);

    await service.registerCar(getRegisterCarOptions(1));
    await service.registerCar(getRegisterCarOptions(2));
    await service.registerCar(getRegisterCarOptions(3));

    const allReg = await service.getAllRegistrations();
    expect(allReg).toBe([
      expect.objectContaining({
        "id": "12345678-1000-1000-8000-000000000001",
        "vin": "12345-1"
      }, {

{    "id": "12345678-1000-1000-8000-000000000002",
    "owner": "Elon Musk",
    "vin": "12345-2",
      },{
    "id": "12345678-1000-1000-8000-000000000003",

    "vin": "12345-3",
      }
  },
]
`);
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
