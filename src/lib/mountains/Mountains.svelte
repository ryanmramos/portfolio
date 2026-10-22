<script lang="ts">
  import { onMount } from 'svelte';
  import { palette, stars, clouds, land, type Cloud } from './art';

  type Placed = { cloud: Cloud; transform?: string };
  type Band = { clouds: Placed[]; seconds: number };

  // a cloud copy scaled around its own center and moved so that center lands on (x, y)
  function place(cloud: Cloud, x: number, y: number, scale = 1): Placed {
    const cx = (cloud.x0 + cloud.x1) / 2;
    const cy = (cloud.y0 + cloud.y1) / 2;
    return { cloud, transform: `translate(${x} ${y}) scale(${scale}) translate(${-cx} ${-cy})` };
  }

  const wide = clouds.reduce((a, b) => (b.x1 - b.x0 > a.x1 - a.x0 ? b : a));
  const wideX = (wide.x0 + wide.x1) / 2;
  const wideY = (wide.y0 + wide.y1) / 2;

  // each band is one 1920 wide strip drawn twice side by side and slid one strip width per loop,
  // so the wrap point never shows. higher clouds are farther away, so they move slower.
  const bands: Band[] = [
    { clouds: [...clouds.map((cloud) => ({ cloud })), place(wide, wideX - 940, wideY - 30)], seconds: 330 },
    { clouds: [place(wide, 330, 235, 1.5), place(wide, 1380, 205, 1.3)], seconds: 220 }
  ];

  let host: HTMLDivElement;
  let skyLayer: SVGGElement;
  let cloudLayer: SVGGElement;
  let landLayer: SVGGElement;
  let shoot: HTMLDivElement;

  onMount(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let px = 0, py = 0, tx = 0, ty = 0, prog = 0, tprog = 0;
    let raf = 0;

    // pointer and scroll ease toward their targets. the loop stops once everything has settled.
    function render() {
      px += (tx - px) * 0.08;
      py += (ty - py) * 0.08;
      prog += (tprog - prog) * 0.12;
      skyLayer.style.transform = `translate(${(px * 2).toFixed(2)}px, 0)`;
      cloudLayer.style.transform = `translate(${(px * 5).toFixed(2)}px, ${(-prog * 8).toFixed(2)}px)`;
      landLayer.style.transform = `translate(${(px * 9).toFixed(2)}px, ${(py * 4 - prog * 14).toFixed(2)}px) scale(1.03)`;
      const settled = Math.abs(tx - px) < 0.001 && Math.abs(ty - py) < 0.001 && Math.abs(tprog - prog) < 0.0005;
      raf = settled ? 0 : requestAnimationFrame(render);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(render); };

    function onScroll() {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      tprog = Math.min(1, scrollY / max);
      if (motion.matches) { prog = tprog; render(); } else kick();
    }
    function onPointer(e: PointerEvent) {
      if (motion.matches) return;
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
      kick();
    }

    // one quick streak at random gaps, dark theme only
    const isDark = () => {
      const t = document.documentElement.dataset.theme;
      return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    };
    let timer: ReturnType<typeof setTimeout>;
    function streak() {
      timer = setTimeout(() => {
        if (!motion.matches && !document.hidden && isDark()) {
          const width = host.clientWidth;
          const angle = 18 + Math.random() * 10;
          const dx = 320 + Math.random() * 160;
          shoot.style.left = `${width * (0.2 + Math.random() * 0.6)}px`;
          shoot.style.top = `${40 + Math.random() * 150}px`;
          shoot.animate(
            [
              { transform: `rotate(${angle}deg) translateX(0)`, opacity: 0 },
              { transform: `rotate(${angle}deg) translateX(${dx * 0.15}px)`, opacity: 1, offset: 0.15 },
              { transform: `rotate(${angle}deg) translateX(${dx}px)`, opacity: 0 }
            ],
            { duration: 850, easing: 'cubic-bezier(.4,0,.8,1)' }
          );
        }
        streak();
      }, 7000 + Math.random() * 11000);
    }

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    addEventListener('pointermove', onPointer, { passive: true });
    onScroll();
    streak();

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  });
</script>

<div class="mountains" bind:this={host} aria-hidden="true">
  <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMin slice">
    <defs>{@html palette}</defs>
    <g filter="url(#page-palette)">
      <rect width="1920" height="1080" fill="#E69ACB" />
      <g bind:this={skyLayer}>{@html stars}</g>
      <g bind:this={cloudLayer}>
        {#each bands as band}
          <g class="band" style:--loop="{band.seconds}s">
            {#each [0, -1920] as dx}
              <g transform="translate({dx} 0)">
                {#each band.clouds as placed}
                  <g transform={placed.transform}>{@html placed.cloud.svg}</g>
                {/each}
              </g>
            {/each}
          </g>
        {/each}
      </g>
      <g bind:this={landLayer} style="transform-origin: 960px 1000px">{@html land}</g>
    </g>
  </svg>
  <div class="shoot" bind:this={shoot}></div>
</div>

<style>
  .mountains { position: absolute; inset: 0; }
  svg { position: absolute; inset: 0; width: 100%; height: 100%; filter: var(--mountain-filter); opacity: var(--mountain-opacity); animation: fade-in 1.6s ease both; }
  .band { animation: drift var(--loop) linear infinite; }
  .shoot { position: absolute; z-index: 1; top: 0; left: 0; width: 140px; height: 2px; border-radius: 2px; opacity: 0; background: linear-gradient(90deg, transparent, rgb(255 255 255 / 90%)); will-change: transform, opacity; }

  @keyframes drift { to { transform: translateX(1920px); } }
  @keyframes fade-in { from { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    .band, svg { animation: none; }
  }
</style>
