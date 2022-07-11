<script lang="ts">
  import Canvas from './Canvas.svelte'
  import DragRegion from './DragRegion.svelte'
  import CurrentBpm from './CurrentBpm.svelte'
  import { appWindow } from '@tauri-apps/api/window'
  import { onMount } from 'svelte'

  onMount(() => {
    appWindow.setFocus()
  })
</script>

<main
  style="
  --light-background: rgb(255, 255, 255);
  --dark-text: rgb(0, 0, 0);

  --dark-background: rgb(0, 0, 0);
  --light-text: rgb(255, 255, 255);

  --large-text: 32px;
  --small-text: 20px;
  "
>
  <Canvas />
  <div class="text">
    <CurrentBpm />
  </div>
  <DragRegion />
</main>

<style>
  :global(body) {
    overflow: hidden;
    margin: 0;
  }

  @font-face {
    font-family: 'GT America Regular';
    src: url('/gt-america-standard-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'GT America Bold Italic';
    src: url('/gt-america-bold-italic.woff') format('woff');
  }

  .text {
    text-transform: lowercase;
    position: fixed;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  main {
    font-family: 'GT America Bold Italic';
    user-select: none;

    background-color: var(--light-background);
    color: var(--dark-text);
  }

  @media (prefers-color-scheme: dark) {
    main {
      background-color: var(--dark-background);
      color: var(--light-text);
    }
  }
</style>
