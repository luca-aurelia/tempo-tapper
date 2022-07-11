import * as Random from './Random'
import * as Numbers from './Numbers'

export function create(palette: string[]) {
  const noiseOffset = Math.random() * 888
  const getNextFillStyle = Random.createRandomWalker(palette)

  let x = Math.random()
  let y = Math.random()
  let radius = Random.range(0.01, 0.1)
  let angleOffset = Random.range(-0.1, 0.1)

  function getNoise(offset: number) {
    return Random.noise2d(offset + x, offset + y)
  }

  function update(speed: number) {
    const angle = (getNoise(noiseOffset) + angleOffset) * Numbers.tau

    const dX = Math.cos(angle) * 0.01 * speed
    const dY = Math.sin(angle) * 0.01 * speed
    let dRadius = getNoise(noiseOffset + 888)
    dRadius = Numbers.denormalize(dRadius, -0.01, 0.01) * speed

    x += dX
    y += dY
    radius += dRadius

    if (x < 0 || x > 1) {
      x = Math.random()
    }

    if (y < 0 || y > 1) {
      y = Math.random()
    }

    if (radius < 0 || radius > 0.1) {
      radius = Random.range(0.01, 0.1)
    }

    const fillStyle = getNextFillStyle()

    return {
      x,
      y,
      radius,
      fillStyle,
    }
  }

  return {
    update,
  }
}
