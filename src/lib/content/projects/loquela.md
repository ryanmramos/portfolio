---
slug: loquela
title: Loquela
status: In progress
timeframe: "2026"
visibility: private
previewLabel: product preview
summary: A local-first desktop app that turns text, videos, and books into contextual language-learning cards.
contribution: Building the complete source-to-card workflow, with local search, video clips, and Anki export.
technologies:
  - Electron
  - Svelte
  - TypeScript
  - SQLite
  - Drizzle
  - Zod
media:
  - type: image
    src: /images/projects/loquela-home-light.png
    darkSrc: /images/projects/loquela-home-dark.png
    alt: Loquela home screen with language-study decks and controls for sources, search, and jobs
    label: Quiet Table home screen
links: []
---

#### Overview

Loquela is a language-learning desktop app for macOS and Windows. It brings source material, vocabulary lookup, card creation, and Anki export into one workflow. Study data stays on your computer, with no account required. The repository is private.

#### Study workflow

Import pasted text, public YouTube videos, PDFs, and EPUBs. Read parsed text or search across your library to find words in context. Dictionary lookup covers Spanish and English through RAE and Wiktionary, and DeepL translates a selected passage on request.

Turn a selection into an editable card with its context and attribution. For YouTube material, preview and trim a video clip to keep with the card. Cards preserve their source context even if the original changes or disappears.

Organize cards into decks, share a card across several decks, or duplicate it to edit independently. Export a deck to Anki as an `.apkg` package with its study directions and media. Complete and data-only archives let you move your library between computers.

#### Technical notes

Electron Forge packages the app, with Svelte, TypeScript, and Vite in the renderer. The main process owns local SQLite storage through Drizzle, while FTS5 indexes passages for search. A narrow preload bridge and Zod-validated contracts keep filesystem, database, and credential access outside the renderer.

Worker threads parse source material. Queued jobs expose progress, cancellation, and retries. Bundled yt-dlp and FFmpeg tools handle YouTube subtitles and video clips, while provider credentials use operating-system storage. Dictionary, translation, and YouTube requests connect to external services.

Source versions preserve imported snapshots and document locations. Updates wait for user approval and active jobs to finish, and database migrations run after an automatic backup.
