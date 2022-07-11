<script lang="ts">
  let dragging = false
</script>

<div
  class="drag-region"
  class:dragging
  data-tauri-drag-region
  on:mousedown={() => (dragging = true)}
  on:mouseup={() => (dragging = false)}
/>

<style>
  .drag-region {
    position: fixed;
    width: 100vh;
    height: 100vh;
    left: 0;
    top: 0;
  }

  .drag-region {
    cursor: grab;
  }

  .drag-region.dragging {
    cursor: grabbing;
  }
</style>
