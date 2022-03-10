import { GuidFactory } from "./guid-factory";

export class MockGuidFactory implements Required<GuidFactory> {
  nextGuid: number = 0;
  getGuid() {
    if (this.guid) {
      return this.guid;
    }

    const scopeNumber = MockGuidFactory.scopes.get(scopeName);
    assertIsDefined(scopeNumber);
    const nextGuid = this.scopeStates.get(scopeName);
    assertIsDefined(nextGuid);

    const guid = MockGuidFactory.getGuidWithScope(scopeNumber, nextGuid);
    this.scopeStates.set(scopeName, nextGuid + 1);
    return guid;
  }
  getGuidUnscoped() {
    return this.getGuid('default' as GuidScope);
  }
  reset() {
    this.guid = undefined;
    this.scopeStates = getInitialScopeStates();
  }

  private getGuidForIndex(index: number): string {
    const suffix = String(index).padStart(12, '0');
    return `12345678-1000-1000-8000-${suffix}`;
  }
}
