# Pangasinan Heritage Digital Showcase

## Project Title
**Alaminos' Hundred Islands — Pangasinan Heritage Digital Showcase**

## Student Name
Matthew Jmcuison

## Selected Framework
**Vue 3 + Nuxt.js 3** (Option B)

- Framework: Vue 3
- Meta-Framework: Nuxt.js 3
- Styling: Tailwind CSS
- Methodology: Brad Frost's Atomic Design

## Live Website
🌐 **[https://jmcuison26.github.io/pangasinan-heritage/](https://jmcuison26.github.io/pangasinan-heritage/)**

---

## About the Project

A digital heritage showcase platform for **Alaminos' Hundred Islands National Park** in Pangasinan, Philippines. Built using Vue 3 + Nuxt.js 3 with an Atomic Design component system.

## Deliverables

| Deliverable | File |
|---|---|
| 1.1 Framework Selection Report | `deliverable-1.1-framework-selection-report.md` |
| 1.2 Atomic Design System Manual | `deliverable-1.2-atomic-design-system-manual.md` |
| 2.2 GitHub Repository & Pages | This repository + GitHub Pages |

## Project Structure

```
pangasinan_heritage/
├── hundred-islands/          # Nuxt.js 3 project
│   ├── components/
│   │   ├── atoms/            # BaseButton, BaseTypography, BaseIcon, BaseImage, ColorToken
│   │   ├── molecules/        # HeritageCard, SearchForm, NavigationItem
│   │   └── organisms/        # HeritageGrid, HeaderNavigation, HeroCarousel, IslandModal
│   ├── pages/
│   │   ├── index.vue         # Homepage
│   │   └── islands.vue       # All Islands page
│   └── public/images/        # Island photos
├── deliverable-1.1-framework-selection-report.md
├── deliverable-1.2-atomic-design-system-manual.md
└── README.md
```

## Pages

- **Home** — Hero carousel, About section, Island Highlights grid, Visit Guide
- **Islands** — All featured and other islands with modal descriptions
