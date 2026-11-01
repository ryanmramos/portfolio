<!-- loquela's q tile mark, drawn on its 32 unit pixel grid. it keeps loquela's own colors
     (not the portfolio accent) and follows the page theme. sized by the parent's font-size. -->
<svg class="lq-mark" viewBox="0 0 32 32" aria-hidden="true">
  <rect class="sh" x="5" y="5" width="25" height="25" />
  <rect class="tile" x="2" y="2" width="25" height="25" />
  <rect class="glyph" x="7" y="6" width="13" height="13" />
  <rect class="tile" x="10" y="9" width="7" height="7" />
  <rect class="word" x="11" y="11" width="5" height="3" />
  <rect class="glyph" x="17" y="19" width="3" height="5" />
  <rect class="glyph" x="17" y="21" width="6" height="3" />
</svg>

<style>
  .lq-mark {
    --sh: rgb(5 3 22 / 28%);
    --tile: #166434;
    --glyph: #ffffff;
    --word: #c88a04;
    display: block;
    flex: none;
    width: 0.72em;
    height: 0.72em;
    shape-rendering: crispEdges;
  }
  :global(:root[data-theme='dark']) .lq-mark {
    --sh: #173524;
    --tile: #9be9b9;
    --glyph: #07150c;
    --word: #fbbd37;
  }
  @media (prefers-color-scheme: dark) {
    :global(:root:not([data-theme])) .lq-mark {
      --sh: #173524;
      --tile: #9be9b9;
      --glyph: #07150c;
      --word: #fbbd37;
    }
  }
  .sh { fill: var(--sh); }
  .tile { fill: var(--tile); }
  .glyph { fill: var(--glyph); }
  .word { fill: var(--word); }
</style>
