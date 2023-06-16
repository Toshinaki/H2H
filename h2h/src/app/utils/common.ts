export const uuidv4 = (): string =>
  [1e7]
    .concat(-1e3, -4e3, -8e3, -1e11)
    .join("")
    .replace(/[018]/g, (c: string) =>
      (
        Number(c) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
      ).toString(16)
    );

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
