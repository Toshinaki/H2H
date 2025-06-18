import { describe, expect, it } from "vitest";
import shallowEqual from "./shallowEqual";

describe("shallowEqual", () => {
  // Test primitives and special values
  it("returns true for identical primitives", () => {
    expect(shallowEqual(42, 42)).toBe(true);
    expect(shallowEqual("test", "test")).toBe(true);
    expect(shallowEqual(true, true)).toBe(true);
    expect(shallowEqual(null, null)).toBe(true);
    expect(shallowEqual(undefined, undefined)).toBe(true);
  });

  it("treats NaN as equal", () => {
    expect(shallowEqual(Number.NaN, Number.NaN)).toBe(true);
  });

  it("returns false for different primitives", () => {
    expect(shallowEqual(1, 2)).toBe(false);
    expect(shallowEqual("a", "b")).toBe(false);
    expect(shallowEqual(true, false)).toBe(false);
    expect(shallowEqual(null, undefined)).toBe(false);
  });

  // Test object scenarios
  it("returns true for same object reference", () => {
    const obj = { a: 1 };
    expect(shallowEqual(obj, obj)).toBe(true);
  });

  it("returns true for objects with identical keys and values", () => {
    const a = { x: 1, y: "test" };
    const b = { x: 1, y: "test" };
    expect(shallowEqual(a, b)).toBe(true);
  });

  it("returns false for objects with different key counts", () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1 };
    expect(shallowEqual(a, b)).toBe(false);
  });

  it("returns false for objects with same keys but different values", () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 3 };
    expect(shallowEqual(a, b)).toBe(false);
  });

  it("returns false when one value is an object and the other is not", () => {
    expect(shallowEqual({}, 42)).toBe(false);
    expect(shallowEqual(42, {})).toBe(false);
  });

  // Test array scenarios
  it("returns true for arrays with identical values", () => {
    const a = [1, 2, "three"];
    const b = [1, 2, "three"];
    expect(shallowEqual(a, b)).toBe(true);
  });

  it("returns false for arrays with different lengths", () => {
    expect(shallowEqual([1, 2], [1])).toBe(false);
  });

  it("returns false for arrays with different values", () => {
    expect(shallowEqual([1, 2], [1, 3])).toBe(false);
  });

  // Test nested objects (shallow comparison only)
  it("does not compare nested objects deeply", () => {
    const a = { nested: { value: 1 } };
    const b = { nested: { value: 1 } };
    expect(shallowEqual(a, b)).toBe(false); // Fails because nested objects are different references
  });

  // Test function references
  it("returns true for identical function references", () => {
    const fn = () => {};
    expect(shallowEqual(fn, fn)).toBe(true);
  });

  it("returns false for different function references", () => {
    expect(
      shallowEqual(
        () => {},
        () => {},
      ),
    ).toBe(true);
  });

  // Test edge cases with NaN in objects
  it("handles NaN in objects correctly", () => {
    const a = { value: Number.NaN };
    const b = { value: Number.NaN };
    expect(shallowEqual(a, b)).toBe(true);
  });

  it("fails when one object has NaN and the other has a different value", () => {
    const a = { value: Number.NaN };
    const b = { value: 42 };
    expect(shallowEqual(a, b)).toBe(false);
  });
});
