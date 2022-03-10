import { container as globalContainer, DependencyContainer } from "tsyringe";
import { GuidFactory } from "../util/guid-factory";
import { GuidFactoryMock } from "../util/guid-factory.mock";

export function getTestContainer(): DependencyContainer {
  const container = globalContainer.createChildContainer();
  // container.registerType(GuidFactory, GuidFactoryMock)
  return container;
}
