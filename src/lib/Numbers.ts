export function normalize(x: number, inMin: number, inMax: number) {
  return remap(x, inMin, inMax, 0, 1)
}

export function denormalize(x: number, outMin: number, outMax: number) {
  return remap(x, 0, 1, outMin, outMax)
}

export function remap(
  x: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function average(numbers: number[]): number {
  const total = sum(numbers)
  return total / numbers.length
}

export function sum(numbers: number[]): number {
  let total = 0
  for (const number of numbers) {
    total += number
  }
  return total
}

export function lerp(t: number, start: number, end: number) {
  return start * (1 - t) + end * t
}

export const tau = Math.PI * 2

export function clamp(input: number, min: number, max: number) {
  if (input < min) {
    return min
  }

  if (input > max) {
    return max
  }

  return input
}
