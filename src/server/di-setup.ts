import {
  container,
  DependencyContainer,
  instanceCachingFactory,
} from "tsyringe";
import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";

export function configureDependencies(): DependencyContainer {
  container.register(RegistrationStore, {
    useFactory: instanceCachingFactory(
      (c) => c.resolve(RegistrationStoreMemory) as Partial<RegistrationStore>
    ),
  });

  // container.register(GuidFactory, {
  //   useFactory: instanceCachingFactory((c) => c.resolve(GuidFactoryMock)),
  // });

  return container;
}
