import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "./di-setup-test";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 4: More DRY
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  const mockRegistrationStore: Partial<jest.Mocked<RegistrationStore>> = {
    get: jest.fn(),
    put: jest.fn(),
  };

  container.registerInstance(
    RegistrationStore,
    mockRegistrationStore as RegistrationStore
  );

  it("can register a car", async () => {
    const opts = getRegisterCarOptions();
    const newId = "343f64ed-07a9-4908-8b54-a5ef95c7a490";
    mockRegistrationStore.put!.mockResolvedValue({
      id: newId,
    });

    const service = container.resolve(RegistrationService);
    const result = await service.registerCar(opts);

    expect(result).toStrictEqual({
      id: newId,
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
