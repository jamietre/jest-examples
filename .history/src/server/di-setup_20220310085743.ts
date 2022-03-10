import { container, DependencyContainer } from "tsyringe";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { RegistrationService } from "../service/registration-service";
import { Constructor } from "../util/type-helpers";

export function configureDependencies(): DependencyContainer {
  container.registerType(
    RegistrationService,
    RegistrationStoreMemory as Constructor<
      Partial<RegistrationService>
    > as Constructor<RegistrationService>
  );
  return container;
}
