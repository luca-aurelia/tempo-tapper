export default async function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}
