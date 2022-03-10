import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

/**
 * Example 3: Test uses partial mock dependency
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
    mockRegistrationStore.put.mockResolvedValue({
      id: "343f64ed-07a9-4908-8b54-a5ef95c7a490",
    });

    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla-model-s",
      owner: "Elon Musk",
    });

    expect(result).toStrictEqual({
      id: result.id,
      carId: "tesla-model-s",
      vin: "12345",
      owner: "Elon Musk",
    });
  });
});
