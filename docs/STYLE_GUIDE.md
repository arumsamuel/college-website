# College Website — Style Guide

## Brand Palette

Premium dual-mode palette using CSS custom properties, swapped via `[data-theme]`.

### Light Mode (soft ivory base)
| Token            | Value     | Usage                     |
|------------------|-----------|---------------------------|
| `--bg-primary`   | `#FAF6EF` | Page background (ivory)   |
| `--bg-card`      | `#FFFFFF` | Cards, forms              |
| `--bg-card-alt`  | `#F3EDE1` | Alternating surfaces      |
| `--bg-header`    | `rgba(250,246,239,0.95)` | Sticky header |
| `--text-primary` | `#1A232E` | Headings/body             |
| `--text-secondary`| `#4A5568` | Secondary text            |
| `--text-tertiary`| `#7A8699` | Muted text                |
| `--border`       | `#E5Dcc8` | Borders                   |
| `--accent`       | `#1F6F4A` | Emerald green accent      |
| `--accent-bright`| `#2E8B57` | Hover accent              |
| `--accent-soft`  | `rgba(31,111,74,0.10)` | Soft accent bg   |

### Dark Mode (deep navy base)
| Token            | Value     | Usage                     |
|------------------|-----------|---------------------------|
| `--bg-primary`   | `#0F1E2E` | Page background (navy)    |
| `--bg-card`      | `#16283C` | Cards, forms              |
| `--bg-card-alt`  | `#1C324A` | Alternating surfaces      |
| `--bg-header`    | `rgba(15,30,46,0.95)` | Sticky header    |
| `--text-primary` | `#F2F5F8` | Headings/body             |
| `--text-secondary`| `#B8C4D0` | Secondary text            |
| `--text-tertiary`| `#8A99A9` | Muted text                |
| `--border`       | `#2A3F55` | Borders                   |
| `--accent`       | `#4CAF7D` | Emerald green accent      |
| `--accent-bright`| `#66C98F` | Hover accent              |
| `--accent-soft`  | `rgba(76,175,125,0.12)` | Soft accent bg   |

### Gold secondary accent (both modes)
`--gold: #C9A227` · `--gold-bright: #E0B73E` — used for badges, highlights, hero text.

> Contrast: text on accent and accent on backgrounds meet WCAG 2.1 AA (≥ 4.5:1) in both modes.

## Typography

| Element | Size | Weight |
|---------|------|--------|
| Hero h1    | clamp(2rem, 4.5vw, 3.75rem) | 800/Extrabold |
| Section h2 | clamp(1.5rem, 2.5vw, 2.25rem) | 800         |
| Card h3    | 1.125–1.25rem                  | 700         |
| Body       | 1rem · line-height 1.7         | 400         |
| Small/caption | 0.8125rem                  | 400         |

Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`.

## Component Library

- **Buttons** — `.btn`, `.btn-gold`, `.btn-outline`, `.btn-outline-dark`, `.btn-sm`, `.btn-lg`, `.btn-block`; focus-visible ring
- **Cards** — `.feature-card`, `.summary-card`, `.news-card`, `.event-card`, `.dash-card`, `.engineer-card`
- **Forms** — `.form-card`, `.form-group`, `.form-control`, `.form-message`, `.form-hint`, `.form-row`
- **Tables** — `.table-wrapper`, `.db-table`
- **Badges** — `.badge` + `.badge-gold/.badge-success/.badge-info/.badge-pending/.badge-error`
- **Chips** — `.chip`/`.chip.active` (filter controls)
- **Bars** — `.announce-ticker`, `.quick-links`, `.alert-bar`
- **Chat** — `.chat-widget-fab`, `.chat-widget`, `.msg.user/.msg.bot`, `.typing`
- **Hero/PageHeader** — `.hero`, `.hero-slider`, `.page-header`
- **Misc** — `.breadcrumbs`, `.stat-card`, `.steps-row`, `.video-intro`, `.disclaimer`

## Accessibility Notes

- All interactive elements have visible `:focus-visible` outlines
- Color tokens chosen for WCAG AA contrast in both themes
- Buttons/links have accessible names (aria-label where icon-only)
- Skip-to-content affordance via semantic `<main>`, breadcrumbs `<nav aria-label="Breadcrumb">`

