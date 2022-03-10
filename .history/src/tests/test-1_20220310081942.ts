import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

describe("RegistrationService", () => {
  const container = getTestContainer();
  it("can register a car", () => {
    const service = container.resolve(RegistrationService);
    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla",
      owner: "Elon Musk",
    });
    expect(result.carId).toBeDefined();
  });
});
