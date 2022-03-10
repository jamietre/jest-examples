export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function assertIsDefined<T>(
  value?: T | null | undefined,
  errorMessage?: string
): asserts value is T {
  if (!isDefined(value)) {
    throw new Error(errorMessage || "The value must be defined and not null.");
  }
}

export function assertIsValidDate(
  value?: Date | unknown,
  errorMessage?: string
): asserts value is Date {
  if (!(value instanceof Date) || !isValidDate(value)) {
    throw new Error(errorMessage || "The value must be a Date object.");
  }
}

export function assertIsString(
  value?: unknown,
  errorMessage?: string
): asserts value is string {
  if (!(typeof value === "string")) {
    throw new Error(errorMessage || "The value must be a string.");
  }
}

export function isNonEmptyString(value?: string): boolean {
  return isDefined(value) && value !== "";
}

/**
 * Asserts that the value is a string, and is not empty
 */
export function assertIsNonEmptyString(value: unknown, errorMessage?: string) {
  errorMessage = errorMessage ?? "The value must be a non-empty string";
  assertIsString(value, errorMessage);
  if (!isNonEmptyString(value)) {
    throw new Error(errorMessage);
  }
}

/**
 * Returns true if the value is non-null; non-undefined; and if a string; non-empty
 */
export function isDefinedAndNonEmpty(value: unknown) {
  if (typeof value === "string") {
    return isNonEmptyString(value);
  }
  return isDefined(value);
}

/**
 * Returns true if the operand can be converted to a valid number
 */
export function isNumeric(value: unknown): boolean {
  const num = Number(value);
  return isNumber(num);
}

/**
 * Convert a value to a number, or thow an error
 */
export function toNumber(value: unknown, errorMessage?: string): number {
  const num = Number(value);
  assertIsNumber(num, errorMessage);
  return num;
}

/**
 * Returns true if the operand is a number type and is non NaN
 */
export function isNumber(value: unknown): boolean {
  return typeof value === "number" && !Number.isNaN(value);
}

export function assertIsNumber(
  value: unknown,
  errorMessage?: string
): asserts value is number {
  if (!isNumber(value)) {
    throw new Error(errorMessage ?? "The value must be a number");
  }
}

export function isValidDate(value: Date): boolean {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function toDate(value: string, errorMessage?: string): Date {
  const valueAsDate = new Date(value);
  if (!isValidDate(valueAsDate)) {
    throw new Error(errorMessage ?? "The value is not a valid date/time");
  }
  return valueAsDate;
}

export function assertIsInArray<T>(
  array: T[] | readonly T[],
  value: T,
  errorMessage?: string
) {
  if (!array.includes(value)) {
    throw new Error(errorMessage || "The value is not a member of the array.");
  }
}

export function assertIsBoolean(
  value: unknown,
  errorMessage?: string
): asserts value is boolean {
  if (typeof value !== "boolean") {
    throw new Error(errorMessage ?? "The value must be a boolean");
  }
}

export function assertIsArray<T>(
  value: unknown,
  errorMessage?: string
): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new Error(errorMessage ?? "The value must be an array");
  }
}

export function isPlainObject(value: unknown): boolean {
  return !(typeof value !== "object" || Array.isArray(value) || value === null);
}

export function assertIsPlainObject<T = Record<string, unknown>>(
  value: unknown | T,
  errorMessage?: string
): asserts value is T {
  if (!isPlainObject(value)) {
    throw new Error(errorMessage || `The value must be a plain object.`);
  }
}

export function assertIsTrue(
  value: boolean,
  errorMessage?: string
): asserts value is true {
  if (!value) {
    throw new Error(errorMessage || "The value must be true");
  }
}

export function assertNever(value: never, errorMessage?: string): never {
  throw new Error(errorMessage || `Unexpected value: ${String(value)}`);
}

export function assertNeverNoThrow(_value: never): void {
  /* noop */
}

export function assertArrayNonEmpty<T>(
  arr: T[],
  errorMessage?: string
): asserts arr is { 0: T } & T[] {
  if (!arr.length || arr.length < 1) {
    throw new Error(
      errorMessage ??
        `The array was expected to have at least one element, but it had length=${arr.length}`
    );
  }
}

/**
 * Return the first element of an array, or fail if not possible.
 */
export function mustGetFirstElement<T>(arr: T[], errorMessage?: string): T {
  assertArrayNonEmpty(arr, errorMessage);
  return arr[0];
}

/**
 * Return the last element of an array, or fail if not possible.
 */
export function mustGetLastElement<T>(arr: T[], errorMessage?: string): T {
  assertArrayNonEmpty(arr, errorMessage);
  return arr[arr.length - 1];
}

/**
 * Return the only element of an array, or fail if not possible.
 */
export function mustGetOnlyElement<T>(arr: T[], errorMessage?: string): T {
  if (!arr.length || arr.length !== 1) {
    throw new Error(
      errorMessage ??
        `The array was expected to have exactly one element, but it had length=${arr.length}`
    );
  }
  return arr[0];
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

/**
 * Any class constructor
 */
export interface Constructor<T> {
  new (...args: any[]): T;
}

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export function objectEntries<T extends object>(t: T): Entries<T> {
  return Object.entries(t) as unknown as Entries<T>;
}

/**
 * Given an object TObject, get the type of the value of a specific key TKey
 */
export type TypeOfKey<
  TObject extends Record<string, any>,
  TKey extends keyof TObject
> = {
  [K in keyof TObject]: TObject[K];
}[TKey];

/**
 * Given a branded type (a type that extends String); convert to just string
 */
export type Standardize<T> = {
  [K in keyof T]: T[K] extends String
    ? string
    : T[K] extends Date
    ? Date
    : T[K] extends object
    ? Standardize<T[K]>
    : T[K];
};

/**
 * Represents a type that can be safely serialized, e.g. to JSON
 */
export type Serializable =
  | string
  | number
  | boolean
  | null
  | Date
  | Serializable[]
  | { [key: string]: Serializable };

export type FirstArg<T extends Function> = Parameters<T>[0];
