import { container, DependencyContainer } from "tsyringe";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";

export function configureDependencies(): DependencyContainer {
  container.registerType(RegistrationService, RegistrationStoreMemory);
}
