import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

const mockRegistrationStore: jest.Mocked<RegistrationStore> = {
  get: jest.fn(),
  put: jest.fn(),
};

describe("RegistrationService", () => {
  const container = getTestContainer();

  container.register(RegistrationStore, {});
  // fails!
  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla",
      owner: "Elon Musk",
    });
    expect(result.carId).toBeDefined();
  });
});
