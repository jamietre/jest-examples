import { container, DependencyContainer } from "tsyringe";
import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { Constructor } from "../util/type-helpers";

export function configureDependencies(): DependencyContainer {
  container.registerType(
    RegistrationStore,
    RegistrationStoreMemory as Partial<RegistrationStore>
  );
  return container;
}
