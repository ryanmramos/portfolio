---
slug: loquela
title: Loquela
status: In progress
timeframe: "2026"
visibility: private
previewLabel: product preview
summary: A language-learning platform that turns everyday content into reusable language practice.
contribution: Building the Spring Boot API and Angular app for invite-only language practice.
technologies:
  - Spring Boot
  - PostgreSQL
  - Angular
  - MinIO
media:
  - type: image
    src: /images/projects/loquela-context-wide.svg
    alt: Loquela contextual learning preview showing a lookup for sobremesa
    label: Contextual learning preview
  - type: slides
    src: /presentations/loquela-presentation.pptx
    label: Open Loquela presentation
links:
  - label: Open Loquela (invite-only)
    href: https://loquela-edge-production.up.railway.app/login
---

#### Overview

Loquela is a language-learning platform designed to make useful practice easier to build and revisit. It combines a Spring Boot API with an independently built Angular web application.

Access is currently invite-only while the project is still in testing.

#### Technical notes

PostgreSQL stores application data, while MinIO provides S3-compatible object storage for local development. Optional workflows support Anki package exports and YouTube subtitle ingestion.
