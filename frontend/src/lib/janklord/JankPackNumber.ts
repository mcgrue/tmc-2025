export type JankPackNumber = 1 | 2 | 3;

export const toJankPackNumber = (n: number): JankPackNumber => {
  if (n === 1 || n === 2 || n === 3) {
    return n;
  }

  throw new Error(`Invalid JankPackNumber: ${n}`);
};
