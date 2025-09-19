export function parsePrice(str: string): number {
  if (str.startsWith('$')) {
    return parseFloat(str.slice(1));
  }
  return parseFloat(str) || 0;
}
