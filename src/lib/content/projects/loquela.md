---
slug: loquela
title: Loquela
status: In progress
timeframe: "2026"
visibility: private
previewLabel: product preview
summary: A local-first desktop app that turns text, videos, and books into language-learning cards, with local search, video clips, and Anki export.
technologies:
  - Electron
  - Svelte
  - TypeScript
  - SQLite
  - Drizzle
  - Zod
media:
  - type: image
    src: /images/projects/loquela-home-light.jpg
    darkSrc: /images/projects/loquela-home-dark.jpg
    alt: Loquela home screen with study decks on the card table
    caption: Home. Decks sit on the card table, with the last deck ready to continue.
  - type: image
    src: /images/projects/loquela-deck-light.jpg
    darkSrc: /images/projects/loquela-deck-dark.jpg
    alt: A deck of cards with the Anki card preview beside it
    caption: Deck. Each card keeps its source context, with a preview of the exported Anki card.
  - type: image
    src: /images/projects/loquela-search-light.jpg
    darkSrc: /images/projects/loquela-search-dark.jpg
    alt: Search results for a word with a card draft and dictionary senses
    caption: Search. Find a word across your sources, pick dictionary senses, and draft a card.
  - type: image
    src: /images/projects/loquela-clip-light.jpg
    darkSrc: /images/projects/loquela-clip-dark.jpg
    alt: Trimming a YouTube clip around a search result
    caption: Clip trim. Cut a YouTube clip to the captions around the word, to keep with the card.
  - type: image
    src: /images/projects/loquela-reader-light.jpg
    darkSrc: /images/projects/loquela-reader-dark.jpg
    alt: EPUB reader with a selected sentence and a create card popover
    caption: Reader. Select a sentence in an EPUB to search it or turn it into a card.
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
