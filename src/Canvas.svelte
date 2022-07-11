<script lang="ts">
  import { onMount } from 'svelte'
  import taps from './lib/taps'
  import * as Numbers from './lib/Numbers'
  import * as Worms from './lib/Worms'
  import sleep from './lib/sleep'
  import averageBpm from './lib/averageBpm'
  import resizeObserver from './lib/actions/resizeObserver'

  const palette = [
    'hsl(23deg, 100%, 50%)',
    'hsl(29deg, 99%, 53%)',
    'hsl(50deg, 100%, 55%)',
    'hsl(86deg, 49%, 52%)',
    'hsl(204deg, 59%, 61%)',
    'hsl(285deg, 20%, 54%)',
  ]

  const worms = [Worms.create(palette), Worms.create(palette)]

  let canvasElement: HTMLCanvasElement
  let cssWidth: number
  let cssHeight: number
  let context: CanvasRenderingContext2D
  let drawing = false

  $: width = cssWidth * 2
  $: height = cssHeight * 2
  $: smallestDimension = Math.min(width, height)

  $: if (canvasElement && $taps.length > 0 && !drawing) {
    scheduleDraw()
  }

  onMount(() => {
    context = canvasElement.getContext('2d')

    const rect = canvasElement.getBoundingClientRect()

    cssWidth = rect.width
    cssHeight = rect.height
  })

  function updateWidthAndHeight(event: CustomEvent<DOMRectReadOnly>) {
    const rect = event.detail
    cssWidth = rect.width
    cssHeight = rect.height
  }

  async function scheduleDraw() {
    if ($taps.length === 0) {
      drawing = false
      clearCanvas()
      return
    }

    drawing = true
    let speed = 0.1

    if ($averageBpm != null) {
      speed = Numbers.remap($averageBpm, 20, 200, 0.1, 1.3)
    }

    drawTaps(speed)

    await sleep(33)

    scheduleDraw()
  }

  async function drawTaps(speed: number) {
    for (const worm of worms) {
      const circleParams = worm.update(speed)
      drawCircle(circleParams)
    }
  }

  interface CircleParams {
    x: number
    y: number
    radius: number
    fillStyle: string
  }

  function drawCircle({ x, y, radius, fillStyle }: CircleParams) {
    x = Numbers.denormalize(x, 0, width)
    y = Numbers.denormalize(y, 0, height)
    radius = Numbers.denormalize(radius, 0, smallestDimension)

    context.fillStyle = fillStyle
    context.beginPath()
    context.arc(x, y, radius, 0, Numbers.tau, false)
    context.fill()
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height)
  }
</script>

<canvas
  {width}
  {height}
  bind:this={canvasElement}
  use:resizeObserver
  on:resize-observed={updateWidthAndHeight}
/>

<style>
  canvas {
    background-color: var(--light-background);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  @media (prefers-color-scheme: dark) {
    canvas {
      background-color: var(--dark-background);
    }
  }
</style>
