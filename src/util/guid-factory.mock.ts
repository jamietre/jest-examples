import { GuidFactory } from "./guid-factory";

export class GuidFactoryMock implements Required<GuidFactory> {
  nextGuid: number = 1;
  getGuid() {
    const guid = this.getGuidForIndex(this.nextGuid);
    this.nextGuid++;
    return guid;
  }
  reset() {
    this.nextGuid = 1;
  }

  private getGuidForIndex(index: number): string {
    const suffix = String(index).padStart(12, "0");
    return `12345678-1000-1000-8000-${suffix}`;
  }
}
