import {
  container,
  DependencyContainer,
  instanceCachingFactory,
} from "tsyringe";
import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";
import { Constructor } from "../util/type-helpers";

export function configureDependencies(): DependencyContainer {
  container.register(RegistrationStore, {
    useFactory: instanceCachingFactory(
      (c) => c.resolve(RegistrationStoreMemory) as Partial<RegistrationStore>
    ),
  });

  container.register(GuidFactory, {
    useFactory: instanceCachingFactory((c) => c.resolve(GuidFactoryMock)),
  });

  return container;
}
