<script lang="ts">
  import averageBpm from './lib/averageBpm'
</script>

<div class="current-bpm">
  {#if $averageBpm == null}
    tap enter
    <span class="emoji"> ✹ </span>
  {:else}
    {$averageBpm.toFixed(2)} bpm
  {/if}
</div>

<style>
  .current-bpm {
    display: block;
    font-size: var(--large-text);
  }

  .emoji {
    transform: translateY(3px);
    margin-left: 4px;
    display: inline-block;
  }
</style>
