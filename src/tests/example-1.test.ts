import { RegistrationStore } from "../db/registration-store";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "./di-setup-test";

/**
 * Example 1: Naive test. (It's x'd out because it will fail)
 */

describe("RegistrationService", () => {
  const container = getTestContainer();

  xit("can register a car", async () => {
    const service = container.resolve(RegistrationService);

    const result = await service.registerCar({
      vin: "12345",
      carId: "tesla-model-s",
      owner: "Elon Musk",
    });
    expect(result.id).toBeDefined();
  });
});
