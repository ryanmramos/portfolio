# Ryan Matthew Ramos — Portfolio

Personal portfolio site.

It is a static SvelteKit site deployed to GitHub Pages. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes it whenever `main` changes.

For local edits:

```bash
npm install
npm run dev
```

Project content lives in `src/lib/content/projects/`. Add project media under `static/images/projects/` when it is ready to be shown; optional `media` and `links` arrays in a project’s frontmatter control what appears in its expanded details.
