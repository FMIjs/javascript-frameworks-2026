/**
 * Generates an array of random integers.
 */
export function randomInts(count: number, max = 100, noDuplicates = false): number[] {
  if (noDuplicates) {
    if (count > max) throw new Error(`count (${count}) exceeds max (${max}): cannot generate enough unique integers`);
    const set = new Set<number>();
    while (set.size < count) {
      set.add(Math.floor(Math.random() * max) || 1);
    }
    return Array.from(set);
  }

  return Array.from({ length: count }, () => Math.floor(Math.random() * max) || 1);
}

/**
 * Removes a random item from the array (mutates).
 */
export function removeRandom<T>(arr: T[]): T[] {
  const idx = Math.floor(Math.random() * arr.length);
  return arr.filter((_, i) => i !== idx);
}