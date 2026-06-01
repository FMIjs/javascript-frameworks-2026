import * as d3 from "d3";

/**
 * Returns alternating CSS class names based on index.
 */
export function isEven(_: unknown, i: number): boolean {
  return i % 2 === 0;
}