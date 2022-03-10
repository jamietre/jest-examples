import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { getTestContainer } from "../test/di-setup-test";

describe("RegistrationService", () => {
  const container = getTestContainer();
  container.register(RegistrationStore, RegistrationStoreMemory )
  
  it('can register a car', () => {
    
  })
});
