import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

/**
 * Example 3: Test uses mock dependency, passes, but not ideal
 */

const mockRegistrationStore: jest.Mocked<RegistrationStore> = {
  get: jest.fn(),
  put: jest.fn(),
} as jest.Mocked<Partial<RegistrationStore>> as jest.Mocked<RegistrationStore>;

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.registerInstance(RegistrationStore, mockRegistrationStore);

  it("can register a car", async () => {
    mockRegistrationStore.get.mockResolvedValue({
      id: "343f64ed-07a9-4908-8b54-a5ef95c7a490",
      carId: "tesla-model-s",
      vin: "12345",
      owner: "Elon Musk",
    });

    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla-model-s",
      owner: "Elon Musk",
    });

    expect(result.carId).toBeDefined();
    expect(result).toStrictEqual({
      id: "343f64ed-07a9-4908-8b54-a5ef95c7a490",
      carId: "tesla-model-s",
      vin: "12345",
      owner: "Elon Musk",
    });
  });
});
