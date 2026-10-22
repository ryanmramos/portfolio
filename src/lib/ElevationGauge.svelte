<script lang="ts">
  import { onMount } from 'svelte';

  // the page is a mountain: 0 m at the foot of the page, the summit at the top
  const summit = 4100;

  let progress = 0;
  $: meters = Math.round(((1 - progress) * summit) / 10) * 10;

  onMount(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      progress = Math.min(1, scrollY / max);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  });
</script>

<div class="gauge" aria-hidden="true" style:--p={progress}>
  <div class="rail"></div>
  <div class="ticks"></div>
  <div class="mark">
    <i></i>
    <span>{meters.toLocaleString('en-US')} m</span>
  </div>
</div>

<style>
  .gauge { position: fixed; z-index: 20; top: 50%; left: max(14px, env(safe-area-inset-left, 0px)); display: none; width: 34px; height: 38vh; transform: translateY(-50%); color: var(--muted); font-family: 'DM Mono', monospace; font-size: .58rem; letter-spacing: .06em; }
  .rail { position: absolute; top: 0; bottom: 0; left: 3px; width: 1px; background: var(--border); }
  .ticks { position: absolute; top: 0; bottom: 0; left: 3px; width: 7px; background: repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 18px); }
  .mark { position: absolute; top: calc(var(--p) * 100%); left: 0; transform: translateY(-50%); display: flex; align-items: center; gap: 9px; white-space: nowrap; color: var(--accent); }
  .mark i { width: 7px; height: 7px; margin-left: 0; border-radius: 50%; background: var(--accent); }

  @media (min-width: 1280px) {
    .gauge { display: block; }
  }
</style>
