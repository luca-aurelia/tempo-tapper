import type { HSL } from './types'
import * as Numbers from './Numbers'

export function lerp(t: number, start: HSL, end: HSL): HSL {
  return [
    Numbers.lerp(t, start[0], end[0]),
    Numbers.lerp(t, start[1], end[1]),
    Numbers.lerp(t, start[2], end[2]),
  ]
}

export function toCssString([l, c, h]: HSL): string {
  return 'hsl(' + l + 'deg, ' + c + '%, ' + h + '%)'
  // return 'lch(' + l + '% ' + c + ' ' + h + ')'
}
