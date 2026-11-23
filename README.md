# Mehak Khan - Portfolio

Static site: HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or run `python -m http.server 8000` in this folder and visit http://localhost:8000.

## What to edit
Everything lives in `js/data.js`:
- `config` - email, GitHub, LinkedIn, resume path, optional form endpoint
- `projects` - descriptions, tech, workflow, live demo and GitHub links (`null` = "coming soon" button)
- `skills`, `timeline`, `certs`

Files to replace:
- `assets/profile.jpg` - your photo (portrait, ~720x840). Until then an "MK" placeholder shows.
- `assets/projects/<id>.svg` - generated covers. Replace with real screenshots (keep a 5:2 ratio, or change the CSS) and list screenshots in `data.js` under `screenshots`.
- `assets/Mehak_Khan_Resume.pdf` - your latest resume.

## TODO before sending to recruiters
- Replace each project's `githubUrl` with its own repository link (right now they point to your GitHub profile).
- Add live demo links for Resumatic, Storytime and Employee Attrition when available.
- Add certificate URLs in `certs`.
- Verify the LinkedIn URL in `config`.
- Optional: paste a Formspree endpoint into `config.formEndpoint` so messages arrive without opening a mail app.

## Deploy
Push the folder to a GitHub repository, then import it in Vercel or Netlify (framework: "Other", no build command, output directory = root). GitHub Pages also works.
