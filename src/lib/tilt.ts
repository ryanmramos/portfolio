// svelte action: a small pointer-driven tilt for preview tiles. it only runs on pointer events,
// and does nothing when the visitor prefers reduced motion.
export function tilt(node: HTMLElement, max = 3) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');

  function move(event: PointerEvent) {
    if (motion.matches) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
    node.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
  }
  function leave() {
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  }

  node.addEventListener('pointermove', move);
  node.addEventListener('pointerleave', leave);
  return {
    destroy() {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', leave);
    }
  };
}
