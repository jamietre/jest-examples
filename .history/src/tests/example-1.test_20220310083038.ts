import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

describe("RegistrationService", () => {
  const container = getTestContainer();

  // fails!
  it("can register a car", async () => {
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla-model-s",
      owner: "Elon Musk",
    });
    expect(result.carId).toBeDefined();
  });
});
