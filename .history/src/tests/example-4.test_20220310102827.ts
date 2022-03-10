import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { getTestContainer } from "../test/di-setup-test";

/**
 * Example 5: Test uses a local implementation
 */

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.registerType(
    RegistrationStore,
    RegistrationStoreMemory as RegistrationStore
  );

  it("can register a car", async () => {
    mockRegistrationStore.get!.mockResolvedValue({
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

    expect(result.id).toBeDefined();
    expect(result).toStrictEqual({
      id: result.id,
      carId: "tesla-model-s",
      vin: "12345",
      owner: "Elon Musk",
    });
  });
});
