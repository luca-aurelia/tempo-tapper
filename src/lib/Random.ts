import * as Numbers from './Numbers'
import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise()

export function range(min: number, max: number): number {
  return Numbers.denormalize(Math.random(), min, max)
}

export function element<Element>(elements: Element[]) {
  const randomIndex = index(elements)
  return elements[randomIndex]
}

export function index(elements: any[]): number {
  return Math.floor(Math.random() * elements.length)
}

export function createRandomWalker<Element>(elements: Element[]) {
  let currentIndex = index(elements)

  function updateIndex() {
    if (currentIndex === 0) {
      currentIndex = 1
    } else if (currentIndex === elements.length - 1) {
      currentIndex = elements.length - 2
    } else {
      const change = flipCoin() ? 1 : -1
      currentIndex += change
    }
  }

  return function randomWalk(): Element {
    updateIndex()
    return elements[currentIndex]
  }
}

export function flipCoin() {
  return Math.random() < 0.5
}

export function noise2d(x: number, y: number): number {
  const noise = simplex.noise2D(x, y)
  return Numbers.normalize(noise, -1, 1)
}
