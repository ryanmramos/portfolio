<script lang="ts">
  import { base } from '$app/paths';
  import { onDestroy, onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { projects } from '$lib/content/projects';
  import Mountains from '$lib/mountains/Mountains.svelte';
  import ContourBand from '$lib/ContourBand.svelte';
  import ElevationGauge from '$lib/ElevationGauge.svelte';
  import { tilt } from '$lib/tilt';

  const email = 'ryan.ramosenhs@gmail.com';
  const obfuscatedEmail = 'ryan.ramosenhs [at] gmail (dot) com';
  const themeStorageKey = 'portfolio-theme';

  type Theme = 'light' | 'dark';

  let openProject: string | null = null;
  let copyStatus = '';
  let copyTimer: ReturnType<typeof setTimeout> | undefined;
  let canAutoplayPreview = false;
  let prefersReducedMotion = false;
  let theme: Theme = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  $: themeColor = theme === 'dark' ? '#1d1a16' : '#f2eee4';

  function toggleProject(slug: string) {
    openProject = openProject === slug ? null : slug;
  }

  function detailTransition(node: HTMLElement) {
    const duration = prefersReducedMotion ? 0 : 240;
    const computedStyle = getComputedStyle(node);
    const naturalHeight = node.getBoundingClientRect().height;
    const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;

    return {
      duration,
      easing: cubicOut,
      css: (t: number) => [
        `height: ${naturalHeight * t}px`,
        `padding-top: ${paddingTop * t}px`,
        `padding-bottom: ${paddingBottom * t}px`,
        'overflow: hidden',
        `opacity: ${t}`,
        `transform: translateY(${(1 - t) * -5}px)`
      ].join(';')
    };
  }

  function mediaUrl(src: string) {
    return src.startsWith('http') ? src : `${base}${src}`;
  }

  async function copyEmail() {
    if (copyTimer) clearTimeout(copyTimer);

    try {
      await navigator.clipboard.writeText(email);
      copyStatus = 'Email address copied';
    } catch {
      copyStatus = 'Clipboard unavailable. Select the address above to copy it manually.';
    }

    copyTimer = setTimeout(() => {
      copyStatus = '';
    }, copyStatus.startsWith('Clipboard') ? 8000 : 2200);
  }

  function applyTheme(nextTheme: Theme, persist = true) {
    theme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;

    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, nextTheme);
      } catch {
        // A blocked storage API should not prevent changing the current page's theme.
      }
    }
  }

  // crossfade between themes with the view transitions api where it exists
  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    if (document.startViewTransition && !prefersReducedMotion) document.startViewTransition(() => applyTheme(next));
    else applyTheme(next);
  }

  onDestroy(() => {
    if (copyTimer) clearTimeout(copyTimer);
  });

  onMount(() => {
    let savedTheme: Theme | null = null;

    try {
      const storedTheme = localStorage.getItem(themeStorageKey);
      if (storedTheme === 'light' || storedTheme === 'dark') savedTheme = storedTheme;
    } catch {
      // Fall back to the visitor's system preference when storage is unavailable.
    }

    applyTheme(savedTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), false);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      prefersReducedMotion = motionQuery.matches;
      canAutoplayPreview = !motionQuery.matches;
    };

    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);

    return () => motionQuery.removeEventListener('change', updateMotionPreference);
  });
</script>

<svelte:head>
  <title>Ryan Matthew Ramos — Software Engineer</title>
  <meta
    name="description"
    content="Ryan Matthew Ramos is a software engineer focused on backend systems, APIs, and useful products."
  />
  <meta name="theme-color" content={themeColor} />
</svelte:head>

<ElevationGauge />

<div class="site-shell" id="top">
  <div class="mountain-backdrop" aria-hidden="true">
    <Mountains />
  </div>
  <header class="masthead">
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="wordmark" href={`${base}/#top`}>Ryan Matthew Ramos</a>
      <div class="nav-actions">
        <div class="nav-links">
          <a href={`${base}/#about`}>About</a>
          <a href={`${base}/#projects`}>Projects</a>
        </div>
        <button
          class="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
          onclick={toggleTheme}
        >
          <span class="theme-toggle__label" aria-hidden="true">Theme</span>
          <span class="theme-toggle__value" aria-hidden="true">{theme}</span>
        </button>
      </div>
    </nav>

    <div class="hero-copy">
      <p class="eyebrow">Hi, I'm Ryan.</p>
      <h1 class="hero-description">
        I like building things that help people <em>better themselves.</em>
      </h1>
      <p class="hero-sub">I work on backend services for a payments team, and I work on my own projects on the side.</p>
      <div class="profile-links" aria-label="External profiles and email">
        <a href="https://github.com/ryanmramos" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        <a href="https://www.linkedin.com/in/ryanmramos/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
        <button class="email-link" type="button" onclick={copyEmail} aria-label="Copy email address" title="Copy email address">
          {obfuscatedEmail}
        </button>
        {#if copyStatus}
          <span class="copy-status" role="status">{copyStatus}</span>
        {/if}
      </div>
      <a class="hero-cta" href={`${base}/#projects`}>View selected work <span aria-hidden="true">↓</span></a>
    </div>
  </header>

  <main>
    <section class="projects-section content-section" id="projects" aria-label="Selected work">
      <ContourBand seed={3} />
      <div class="projects-heading">
        <h2 class="section-label">Projects</h2>
      </div>

      <div class="project-list">
        {#each projects as project, index}
          {@const preview = project.media[0]}
          <article class:project-open={openProject === project.slug} class="project-entry" style:--i={index}>
            <div class="project-row project-row--with-preview">
              <div class="project-copy">
                <div class="project-index">0{index + 1}</div>
                <div class="project-meta">
                  <span>{project.status}</span>
                  {#if project.event}
                    <span>·</span>
                    <span>{project.event}</span>
                  {/if}
                  <span>·</span>
                  <span>{project.timeframe}</span>
                  {#if project.visibility === 'private'}
                    <span>·</span>
                    <span>Private repository</span>
                  {/if}
                </div>
                <h3 id={`project-title-${project.slug}`}>{project.title}</h3>
                <p class="project-summary">{project.summary}</p>
                <p class="project-contribution"><span>Project focus</span>{project.contribution}</p>
                <p class="technology-line">{project.technologies.join(' · ')}</p>
                <button
                  class="expand-button"
                  type="button"
                  aria-expanded={openProject === project.slug}
                  aria-controls={`project-details-${project.slug}`}
                  onclick={() => toggleProject(project.slug)}
                >
                  {openProject === project.slug ? `Close ${project.title} details` : 'View project details'}
                  <span aria-hidden="true">{openProject === project.slug ? '−' : '+'}</span>
                </button>
              </div>
              <figure class={`project-preview project-preview--${project.slug}`} use:tilt>
                {#if project.media.length}
                  {#if preview.type === 'image'}
                    <img
                      src={mediaUrl(preview.src)}
                      alt={preview.alt ?? preview.label ?? `${project.title} preview`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  {:else if preview.type === 'video'}
                    {#if canAutoplayPreview}
                      <video
                        autoplay
                        loop
                        muted
                        playsinline
                        preload="metadata"
                        poster={preview.poster ? mediaUrl(preview.poster) : undefined}
                        aria-label={preview.alt ?? preview.label ?? `${project.title} preview`}
                      >
                        <source src={mediaUrl(preview.src)} />
                      </video>
                    {:else if preview.poster}
                      <img
                        src={mediaUrl(preview.poster)}
                        alt={preview.alt ?? preview.label ?? `${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                      />
                    {:else}
                      <span class="preview-caption"><span>{preview.label ?? project.previewLabel}</span></span>
                    {/if}
                  {:else}
                    <span class="preview-caption"><span>{preview.label ?? project.previewLabel}</span></span>
                  {/if}
                {:else}
                  <span class="preview-template" aria-hidden="true">
                    <span class="preview-template-mark">{project.title.slice(0, 2)}</span>
                    <span class="preview-template-lines"><i></i><i></i><i></i></span>
                  </span>
                  <span class="preview-caption">
                    <span>{project.previewLabel}</span>
                  </span>
                {/if}
              </figure>
            </div>

            {#if openProject === project.slug}
              <div
                class:project-details--solo={!project.media.length && !project.links.length}
                class="project-details"
                id={`project-details-${project.slug}`}
                aria-labelledby={`project-title-${project.slug}`}
                transition:detailTransition
              >
                <div class="project-markdown">
                  <svelte:component this={project.content} />
                </div>
                {#if project.media.length || project.links.length}
                  <div class="project-media-column">
                    <div class="detail-label">Project media and links</div>
                    {#if project.media.length}
                      <div class="media-gallery">
                        {#each project.media as media}
                          {#if media.type === 'image'}
                            <a class="media-image" href={mediaUrl(media.src)} target="_blank" rel="noreferrer">
                              <img src={mediaUrl(media.src)} alt={media.alt ?? media.label ?? `${project.title} preview`} loading="lazy" />
                            </a>
                          {:else if media.type === 'video'}
                            <video class="media-video" controls preload="metadata">
                              <source src={mediaUrl(media.src)} />
                              Your browser does not support embedded video.
                            </video>
                          {:else}
                            <a class="media-slide-link" href={mediaUrl(media.src)} target="_blank" rel="noreferrer">
                              {media.label ?? 'View slides'} <span>↗</span>
                            </a>
                          {/if}
                        {/each}
                      </div>
                    {/if}
                    {#if project.links.length}
                      <div class="project-links">
                        {#each project.links as link}
                          <a href={link.href} target="_blank" rel="noreferrer">{link.label} <span>↗</span></a>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
            {/if}
          </article>
        {/each}
      </div>
    </section>

    <section class="about-grid about-section" id="about" aria-label="About">
      <h2 class="section-label">About</h2>
      <div class="about-copy">
        <p>
          I’m a software engineer focused on backend systems and APIs. At work, I partner with the iOS team to build reliable payment experiences. Outside of work, I make products, explore ideas I care about, and stay active.
        </p>
        <p class="beyond-code"><span>Interests</span> Ultimate frisbee, snowboarding, running, resistance training, reading, and gaming.</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="education-line" aria-label="Education: B.Sc. Computer Science from Rice University">
      <span class="footer-kicker">Education</span>
      <span>B.Sc. Computer Science</span>
      <span aria-hidden="true">·</span>
      <span>Rice University</span>
    </div>
    <div class="footer-links">
      <a href={`${base}/#top`}>Back to top <span>↑</span></a>
      <a href="https://github.com/ryanmramos" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
      <a href="https://www.linkedin.com/in/ryanmramos/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
      <button class="email-link" type="button" onclick={copyEmail} aria-label="Copy email address" title="Copy email address">{obfuscatedEmail}</button>
    </div>
  </footer>
</div>
