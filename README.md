# Ahmed Mejri: HPC Systems Engineer Portfolio

Static site (HTML, CSS, vanilla JS) for GitHub Pages. No build step.

## Structure
`index.html` main page · `css/style.css` · `js/projects.js` (projects, skills, certifications data) · `js/main.js` (UI, terminal) · `js/github.js` (live public repos) · `projects/` (case study + generic project page) · `data/articles.json` · `assets/` (CV, images) · `robots.txt`, `sitemap.xml`, `manifest.json`.

## Local development
`python3 -m http.server 8000` then open http://localhost:8000 (needed so `fetch` works).

## Deploy to GitHub Pages
1. Create a repo named `<username>.github.io` (the canonical URL assumes `ahmedmejri1.github.io`; replace it in `index.html`, `robots.txt`, `sitemap.xml` if different).
2. Push these files to the `main` branch root.
3. Settings → Pages → Deploy from branch → `main` / root.

## Customize
- **Add a project:** add an object to `PROJECTS` in `js/projects.js`. Only add buttons with real URLs. `projects/project.html?id=<id>` renders it automatically.
- **Add articles:** edit `data/articles.json` with `[{"title":"…","url":"https://medium.com/…","summary":"…"}]` using real article URLs. Empty = shows a link to the Medium profile.
- **Update CV:** replace `assets/Ahmed-Mejri-HPC-Systems-Engineer-CV.pdf`, keeping the filename.
- **Social links / email:** search for them in `index.html`.
- **Certifications:** edit `CERTS` in `js/projects.js`.
- **Social preview:** `og-image.svg` is not rendered by every platform; consider adding a 1200×630 PNG.

## Privacy
No credentials, internal IPs, hostnames or customer details are published. Keep it that way when adding content.
