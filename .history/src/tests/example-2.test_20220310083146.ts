import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

const mockRegistrationStore: jest.Mocked<RegistrationStore> = {
  get: jest.fn(),
  put: jest.fn(),
};

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.registerInstance(RegistrationStore, mockRegistrationStore);

  it("can register a car", async () => {
    mockRegistrationStore.get.mockResolvedValue({
      carId: "343f64ed-07a9-4908-8b54-a5ef95c7a490",
    });
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla-model-s",
      owner: "Elon Musk",
    });

    expect(result.carId).toBeDefined();
  });
});
