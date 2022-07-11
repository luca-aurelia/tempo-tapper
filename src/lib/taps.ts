// import Mousetrap from 'mousetrap'
import { writable, type Writable } from 'svelte/store'
import debounce from 'lodash.debounce'

const resetDelay = 3_000

const taps: Writable<DOMHighResTimeStamp[]> = writable([])
export const lastTapAt: Writable<DOMHighResTimeStamp | null> = writable(null)

const resetTapsAfterDebounce = debounce(() => {
  taps.set([])
}, resetDelay)

function recordTap() {
  const now = window.performance.now()

  lastTapAt.set(now)

  taps.update(($taps) => {
    $taps.push(now)
    return $taps
  })

  resetTapsAfterDebounce()
}

// Mousetrap.bind(['command+shift+.', 'ctrl+shift+.'], () => {
//   recordTap()
//   return false
// })

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key !== 'Enter') {
    return
  }

  event.preventDefault()
  recordTap()
  return false
})

export default taps
