# Stack Rationale & Maintenance Assessment

## Selected Stack: Option 2 (Vanilla HTML/CSS/JS + Dynamic JSON Data Engine)

### Decision Criteria Evaluation

1. **Skill Alignment**: Sanjana is proficient in HTML, CSS, JavaScript, Python, and Kotlin. Avoids framework-specific traps (like React/Next.js hydration errors) to focus on raw application performance.
2. **Cost**: 100% Free hosting on GitHub Pages or Vercel with zero server costs.
3. **Portfolio Requirements**: Supports modal popups, interactive image carousels, markdown case study rendering, global command search palette (Ctrl+K), and dark mode.
4. **Content Updates**: New projects can be added in under 2 minutes by updating `data/portfolio.json` or dropping markdown into `content/projects/`.

---

## Maintenance Assessment Question

> **"Can I maintain this?"**
> 
> **YES, 100%.** Because there are no complex build chains, compilation steps, or server dependencies, the portfolio remains editable directly in any text editor or via `admin.html`. Updating content requires zero build commands.
