// faint topographic rings used as a section divider accent. the shapes come from seeded value noise,
// so a given seed always draws the same terrain and server and client markup match.

function hash(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function noise(seed: number): (x: number) => number {
  const random = hash(seed);
  const table = Array.from({ length: 256 }, random);
  return (x) => {
    const i = Math.floor(x);
    const f = x - i;
    const a = table[i & 255];
    const b = table[(i + 1) & 255];
    return a + (b - a) * f * f * (3 - 2 * f);
  };
}

/** path data for concentric wobbly rings inside a 600 x 180 box */
export function contourPaths(seed: number, rings = 9): string[] {
  const n = noise(seed * 97);
  return Array.from({ length: rings }, (_, index) => {
    const k = index + 1;
    const points = Array.from({ length: 65 }, (_, step) => {
      const t = (step / 64) * Math.PI * 2;
      const wobble = (n(Math.cos(t) * 1.3 + Math.sin(t) * 1.1 + k * 0.15 + 5) - 0.5) * 46 * (k / rings + 0.3);
      const r = k * 17 + wobble;
      return `${(300 + Math.cos(t) * r * 2.1).toFixed(1)} ${(90 + Math.sin(t) * r * 0.95).toFixed(1)}`;
    });
    return `M${points.join(' L')} Z`;
  });
}
