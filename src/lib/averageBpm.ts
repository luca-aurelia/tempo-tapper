import taps from './taps'
import { derived, type Readable } from 'svelte/store'
import * as Numbers from './Numbers'

const averageBpm: Readable<null | number> = derived(taps, ($taps) => {
  if ($taps.length < 2) {
    return null
  }

  const intervals = getTimeBetweenTimestamps($taps)
  const averageInterval = Numbers.average(intervals)
  const bpm = getBeatsPerMinute(averageInterval)

  return bpm
})

function getTimeBetweenTimestamps(timestamps: number[]): number[] {
  const intervals = []
  for (let i = 0; i < timestamps.length; i++) {
    const timestamp = timestamps[i]
    const nextTimestamp = timestamps[i + 1]

    if (nextTimestamp == null) {
      break
    }

    const interval = nextTimestamp - timestamp
    intervals.push(interval)
  }
  return intervals
}

function getBeatsPerMinute(durationInMillis: number): number {
  const millisInAMinute = 60_000
  return millisInAMinute / durationInMillis
}

export default averageBpm
