# Sanjana Londhe — FlyRank Internship & Capstone Portfolio

This repository contains the complete source code, content architecture, evidence tracking system, and cumulative 10-week deliverables for **Sanjana Londhe's FlyRank AI Internship & Final Capstone Portfolio**.

---

## 1. Project Purpose

The purpose of this portfolio is to demonstrate, through real software builds and evidence:
- Prompt engineering capabilities (multi-LLM integration, zero-shot structured JSON extraction).
- Android application development in Kotlin (**BUDS**, **EcoTrace**).
- Web application development in Python and Streamlit (**Visa Helper AI**, **AI Spam Classifier**).
- Low-code / vibe-coding workflows.
- Professional technical decision communication and narrative design (*Love, and only love*).

---

## 2. Portfolio Project Structure

```
/portfolio-capstone
├── index.html                 # Primary single-page portfolio application
├── admin.html                 # Content & data management helper interface
├── data/
│   └── portfolio.json         # Central JSON data store for projects, skills, writing
├── js/                        # Modular ES6 JavaScript engine (renderer, tabs, palette, app)
├── css/                       # Custom styles and Tailwind CSS configurations
├── assets/                    # Profile photos, project screenshots, book covers
├── content/                   # 20 core positioning, identity, sitemap & rationale files
├── case-studies/              # Detailed 4-part case studies (buds.md, visa-helper.md, etc.)
├── evidence/                  # Evidence index, screenshot checklists, link logs, metrics
├── deliverables/              # Cumulative weekly files (week-01.md through week-10-capstone.md)
├── reviews/                   # Design reviews, reviewer questionnaires, triage & fix logs
├── testing/                   # Edge-case matrix, SEO checks, speed checks, browser test logs
├── capstone/                  # Presentation script, build write-up, story & submission checklist
├── FINAL-STATUS.md            # Master status audit & exact next actions
└── README.md                  # System overview & maintenance guide
```

---

## 3. How to Run Locally

### Option A: Standard Local Web Server (Recommended)
1. Clone or open the repository folder in VS Code / terminal.
2. Run live-server via npm:
   ```bash
   npm start
   ```
3. Open `http://127.0.0.1:8080` in your web browser.

### Option B: Direct File Viewing
- Simply double-click `index.html` to open directly in any modern browser.

---

## 4. How to Deploy

### Deploying to GitHub Pages (Free)
1. Push this repository to GitHub: `https://github.com/The-tech17/Portfolio`.
2. Go to **Settings > Pages** in your GitHub repository.
3. Select `main` branch and `/ (root)` folder.
4. Save. Your portfolio will be live at `https://The-tech17.github.io/Portfolio`.

### Deploying to Vercel (Free)
1. Import `The-tech17/Portfolio` into Vercel dashboard.
2. Select **Other / Framework Preset: None**.
3. Click **Deploy**.

---

## 5. Where Content Lives

- **Profile & Project Data**: Editable in [`data/portfolio.json`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/data/portfolio.json).
- **Positioning & Identity Documents**: Located in [`/content/`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/content/).
- **Project Case Studies**: Detailed markdown files in [`/case-studies/`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/case-studies/).

---

## 6. Where Evidence Lives

- Master status log: [`evidence/evidence-index.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/evidence/evidence-index.md)
- Missing screenshot checklist: [`evidence/screenshots-needed.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/evidence/screenshots-needed.md)
- Missing URLs checklist: [`evidence/links-needed.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/evidence/links-needed.md)

---

## 7. How to Update a Case Study

1. Open the project markdown file in [`case-studies/`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/case-studies/) (e.g. `case-studies/buds.md`).
2. Update the text following the mandatory 4-part framework (**Problem, What I Built, My Decisions, Outcome**).
3. If project links change, update `github` and `demo` fields in `data/portfolio.json`.

---

## 8. How to Add a New Project

1. Create a new markdown file in `case-studies/` (e.g. `case-studies/new-project.md`).
2. Add a new object entry to the `"projects"` array in `data/portfolio.json`:
   ```json
   {
     "name": "New Project Title",
     "status": "Active",
     "desc": "Short description of project...",
     "tags": ["Python", "Gemini"],
     "github": "https://github.com/The-tech17/repo",
     "demo": "https://demo.app",
     "image": "assets/projects/new-project.png",
     "casestudy": "case-studies/new-project.md"
   }
   ```
3. Refresh `index.html`. The renderer will construct the card and modal automatically.

---

## 9. How to Update the Identity Kit

- Visual identity tokens (Zinc slate dark palette, Inter font rules) are documented in [`content/identity-kit.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/content/identity-kit.md).
- Stylesheet rules live in [`css/styles.css`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/css/styles.css).

---

## 10. Final Capstone Submission Requirements

The capstone consists of four major components:
- **A. Launched Portfolio**: Custom domain ready, clear 1-line claim, 1 primary CTA.
- **B. Proof**: Authentic Build-In-Public story with real win & limitation ([`capstone/build-in-public-story.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/capstone/build-in-public-story.md)).
- **C. Package**: 4-minute presentation demo script, technical write-up, decision rationale ([`capstone/demo-script.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/capstone/demo-script.md)).
- **D. FlyRank Loop**: FlyRank Intern & Graduate badge integrated in footer, verification link ready.

---

## 11. Remaining Evidence & User Tasks

Refer to [`FINAL-STATUS.md`](file:///c:/Users/DELL/Desktop/Projects/Portfolio/FINAL-STATUS.md) for the exact 9-category status breakdown and explicit action items requiring Sanjana's real-world input (e.g. capturing the BUDS Android APK screenshot).
