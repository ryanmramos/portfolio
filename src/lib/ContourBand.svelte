<script lang="ts">
  import { contourPaths } from './contours';

  export let seed: number;

  const paths = contourPaths(seed);
</script>

<div class="contour-band" aria-hidden="true">
  <svg viewBox="0 0 600 180" preserveAspectRatio="xMidYMid slice">
    {#each paths as d}
      <path {d} fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" />
    {/each}
  </svg>
</div>

<style>
  .contour-band {
    position: absolute; top: -1px; right: 0; width: min(46%, 420px); height: 100px;
    color: var(--contour); pointer-events: none;
    -webkit-mask-image: linear-gradient(to left, #000, transparent);
    mask-image: linear-gradient(to left, #000, transparent);
  }
  svg { display: block; width: 100%; height: 100%; }

  @media (max-width: 760px) {
    .contour-band { display: none; }
  }
</style>
