<script lang="ts">
  import { base } from '$app/paths';
  import { projects } from '$lib/content/projects';

  const email = 'ryan.ramosenhs@gmail.com';
  const obfuscatedEmail = 'ryan.ramosenhs [at] gmail (dot) com';

  let openProject: string | null = null;
  let copyStatus = '';
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  function toggleProject(slug: string) {
    openProject = openProject === slug ? null : slug;
  }

  function mediaUrl(src: string) {
    return src.startsWith('http') ? src : `${base}${src}`;
  }

  async function copyEmail() {
    if (copyTimer) clearTimeout(copyTimer);

    try {
      await navigator.clipboard.writeText(email);
      copyStatus = 'Copied';
    } catch {
      copyStatus = 'Copy unavailable';
    }

    copyTimer = setTimeout(() => {
      copyStatus = '';
    }, 2200);
  }
</script>

<svelte:head>
  <title>Ryan Matthew Ramos — Software Engineer</title>
  <meta
    name="description"
    content="Ryan Matthew Ramos is a software engineer focused on backend systems, APIs, and useful products."
  />
  <meta name="theme-color" content="#f2eee4" />
</svelte:head>

<div class="site-shell" id="top">
  <div class="mountain-backdrop" aria-hidden="true">
    <img src={`${base}/images/snowy-mountains-page.svg`} alt="" />
  </div>
  <header class="masthead">
    <nav class="site-nav" aria-label="Primary navigation">
      <a class="wordmark" href={`${base}/#top`}>Ryan Matthew Ramos</a>
      <div class="nav-links">
        <a href={`${base}/#about`}>About</a>
        <a href={`${base}/#projects`}>Projects</a>
      </div>
    </nav>

    <div class="hero-copy">
      <p class="eyebrow">Software Engineer <span>·</span> backend systems &amp; APIs</p>
      <p class="hero-description">
        Software Engineer focused on backend systems and APIs for products that help people.
      </p>
      <div class="profile-links" aria-label="External profiles and email">
        <a href="https://github.com/ryanmramos" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        <a href="https://www.linkedin.com/in/ryanmramos/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
        <button class="email-link" type="button" onclick={copyEmail} title="Copy email address">
          {obfuscatedEmail} <span aria-hidden="true">↗</span>
        </button>
        {#if copyStatus}
          <span class="copy-status" aria-live="polite">{copyStatus}</span>
        {/if}
      </div>
    </div>

    <section class="about-grid header-about" id="about" aria-label="About">
      <div class="section-label">About</div>
      <div class="about-copy">
        <p>
          I’m a Software Engineer focused on backend systems and APIs. In my current work, I partner with the iOS team to build reliable payment experiences, while outside of work I enjoy creating products that help people and exploring ideas I care about.
        </p>
        <p class="beyond-code"><span>Interests</span> Ultimate frisbee, snowboarding, running, resistance training, reading, and gaming.</p>
      </div>
    </section>
  </header>

  <main>
    <section class="projects-section content-section" id="projects" aria-label="Selected work">
      <div class="projects-heading">
        <div class="section-label">Projects</div>
      </div>

      <div class="project-list">
        {#each projects as project, index}
          {@const preview = project.media[0]}
          <article class:project-open={openProject === project.slug} class="project-entry">
            <div class="project-row project-row--with-preview">
              <div class="project-copy">
                <div class="project-index">0{index + 1}</div>
                <div class="project-meta">
                  <span>{project.status}</span>
                  <span>·</span>
                  <span>{project.timeframe}</span>
                  {#if project.visibility === 'private'}
                    <span>·</span>
                    <span>Private repo</span>
                  {/if}
                </div>
                <h3>{project.title}</h3>
                <p class="project-summary">{project.summary}</p>
                <p class="technology-line">{project.technologies.join(' · ')}</p>
                <button
                  class="expand-button"
                  type="button"
                  aria-expanded={openProject === project.slug}
                  aria-controls={`project-details-${project.slug}`}
                  onclick={() => toggleProject(project.slug)}
                >
                  {openProject === project.slug ? 'Close details' : 'More about this project'}
                  <span aria-hidden="true">{openProject === project.slug ? '−' : '+'}</span>
                </button>
              </div>
              <button
                class={`project-preview project-preview--${project.slug}`}
                type="button"
                aria-label={`${project.title} ${project.previewLabel}`}
                aria-expanded={openProject === project.slug}
                aria-controls={`project-details-${project.slug}`}
                onclick={() => toggleProject(project.slug)}
              >
                {#if project.media.length}
                  {#if preview.type === 'image'}
                    <img src={mediaUrl(preview.src)} alt={preview.alt ?? preview.label ?? `${project.title} preview`} />
                  {:else if preview.type === 'video'}
                    <video autoplay loop muted playsinline preload="metadata">
                      <source src={mediaUrl(preview.src)} />
                    </video>
                  {:else}
                    <span class="preview-caption"><span>{preview.label ?? project.previewLabel}</span><small>Open project details</small></span>
                  {/if}
                {:else}
                  <span class="preview-template" aria-hidden="true">
                    <span class="preview-template-mark">{project.title.slice(0, 2)}</span>
                    <span class="preview-template-lines"><i></i><i></i><i></i></span>
                  </span>
                  <span class="preview-caption">
                    <span>{project.previewLabel}</span>
                    <small>Open project details</small>
                  </span>
                {/if}
              </button>
            </div>

            {#if openProject === project.slug}
              <div class:project-details--solo={!project.media.length && !project.links.length} class="project-details" id={`project-details-${project.slug}`}>
                <div class="project-markdown">
                  <svelte:component this={project.content} />
                </div>
                {#if project.media.length || project.links.length}
                  <div class="project-media-column">
                    <div class="detail-label">Media &amp; links</div>
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
      <button class="email-link" type="button" onclick={copyEmail}>{obfuscatedEmail}</button>
    </div>
  </footer>
</div>
