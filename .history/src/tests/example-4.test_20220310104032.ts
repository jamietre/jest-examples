import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";
import { FirstArg } from "../util/type-helpers";

/**
 * Example 3: More DRY
 */

const mockRegistrationStore: Partial<jest.Mocked<RegistrationStore>> = {
  get: jest.fn(),
  put: jest.fn(),
};

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.registerInstance(
    RegistrationStore,
    mockRegistrationStore as RegistrationStore
  );

  it("can register a car", async () => {
    const opts = getRegisterCarOptions();
    mockRegistrationStore.get!.mockResolvedValue({
      id: "343f64ed-07a9-4908-8b54-a5ef95c7a490",
      ...opts,
    });

    const service = container.resolve(RegistrationService);
    const result = await service.registerCar(opts);

    expect(result.id).toBeDefined();
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
