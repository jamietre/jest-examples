import { injectable, singleton } from "tsyringe";
// eslint-disable-next-line no-restricted-imports

import { v4 } from "uuid";

@singleton()
@injectable()
/**
 * Abstraction of GUID to simplify testing code that generates GUIDs, and to strongly type the ID string
 */
export class GuidFactory {
  /**
   * Scope has no effect on the real implementation (GUIDs are not sequential or related)
   * but for testing, this will group guids into a related scope.
   */
  getGuid(): string {
    return v4();
  }
}
