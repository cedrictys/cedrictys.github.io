# Cedric Tan — Personal Website

A single-page personal site: about, experience, projects, skills, education, and contact.
Plain HTML/CSS/JS, no build step or framework.

## Local preview

```bash
cd personal-website
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Deploying with GitHub Pages

1. Push this folder's contents to a GitHub repository (either `<username>.github.io` for a
   root-domain site, or any repo name for a project site served at
   `https://<username>.github.io/<repo>`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`,
   folder `/ (root)`.
4. Save — GitHub will publish the site at the URL shown on that page within a minute or two.

## Structure

```
index.html      Page markup
css/style.css   Styling (dark, minimal theme)
js/script.js    Nav toggle, scroll reveal, active-link highlighting, stat counters
assets/         Downloadable résumé PDF
```

## Updating content

Edit `index.html` directly — content is organized into `<section>` blocks by id
(`about`, `experience`, `projects`, `skills`, `education`, `contact`).
