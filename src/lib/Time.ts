export function since(timestamp: number): number {
  return window.performance.now() - timestamp
}
