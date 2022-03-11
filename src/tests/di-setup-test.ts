import {
  container as globalContainer,
  DependencyContainer,
  Lifecycle,
} from "tsyringe";
import { RegistrationStore } from "../db/registration-store";
import { RegistrationStoreMemory } from "../db/registration-store.memory";

export function getTestContainer(): DependencyContainer {
  const container = globalContainer.createChildContainer();
  return container;
}

/**
 * Register the memory-based implementation of the store, and return it
 */
export function useMemoryStore(container: DependencyContainer) {
  container.registerType(RegistrationStore, RegistrationStoreMemory);
}
