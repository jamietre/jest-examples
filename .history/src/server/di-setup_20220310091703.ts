import {
  container,
  DependencyContainer,
  instanceCachingFactory,
} from "tsyringe";
import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { Constructor } from "../util/type-helpers";

export function configureDependencies(): DependencyContainer {
  container.register(RegistrationStore, {
    useFactory: instanceCachingFactory(
      (c) =>
        c.resolve(RegistrationStoreMemory) as Constructor<
          Partial<RegistrationStore>
        >
    ),
  });
  return container;
}
