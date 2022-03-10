import { container as globalContainer, DependencyContainer} from "tsyringe"
export function getTestContainer(): DependencyContainer {
  const container = globalContainer.createChildContainer();
  return container;

}