export function toInt(value?: string) {
  return value ? Number.parseInt(value, 10) : 0;
}
