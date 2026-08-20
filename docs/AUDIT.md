# College Website — Pre-Launch Accessibility & Performance Audit

## Accessibility (WCAG 2.1 AA)

| Area | Status | Notes |
|------|--------|-------|
| Color contrast | ✅ | Tokens chosen ≥ 4.5:1 in light & dark; accent on bg AA |
| Keyboard navigation | ✅ | All interactive elements reachable/focusable; `:focus-visible` rings |
| Alt text on images | ✅ | Descriptive `alt` on all meaningful images |
| Form labels | ✅ | Explicit `<label>` + `htmlFor` on all inputs/selects |
| ARIA | ✅ | Dialogs (`role="dialog"`), tabs (`role="tablist"`), live regions (`role="status"`, `role="alert"`) |
| Breadcrumbs | ✅ | `<nav aria-label="Breadcrumb">` |
| Skip/escapes | ✅ | Intro video has Skip; modals/mobile menus can be dismissed |
| Screen-reader test | ⚠️ | Manual pass recommended (VoiceOver/NVDA) |
| Video | ✅ | Intro is autoplay muted (no WCAG flash; unmute control provided) |

## Performance & SEO

| Area | Status | Notes |
|------|--------|-------|
| LCP (hero) | ✅ | Hero sliders use local, compressed images with `w=1400&q=85` |
| Local media | ✅ | No external hotlinks; all media under `public/assets/media/` |
| Lazy loading | ✅ | `loading="lazy"` on below-fold images; `preload="none"` on videos |
| Bundle size | ✅ | ~248 KB JS (gzip ~72 KB) / ~31 KB CSS (gzip ~6.3 KB) |
| Meta tags | ✅ | title, description, keywords, theme-color, OG, Twitter card |
| Sitemap | ✅ | `public/sitemap.xml` |
| Structured data | ⚠️ | JSON-LD for Event/News optional enhancement |
| Analytics | ⚠️ | Add `ANALYTICS_ID` script in `index.html` before launch |
| HTTPS/SSL | ⚠️ | Required behind reverse proxy for production |
| HTTPS-only login | ✅ | All portal traffic should run over HTTPS; JWT in localStorage |

## Chatbot Behavior

- Always appends an **AI disclaimer**.
- Falls back to rule-based answers grounded in the site FAQ.
- Any unrecognized query routes to the **Admissions Office** contact.
- `ANTHROPIC_API_KEY` stays server-side (never exposed to the frontend).

## Final Pre-launch Checklist

- [ ] Manual a11y pass (NVDA/VoiceOver) on Home, Admissions, Portal, Dashboard
- [ ] Analytics snippet added
- [ ] `JWT_SECRET` set; HTTPS enforced
- [ ] Media optimized (target <200 KB per image)
- [ ] JSON-LD structured data for flagship events
- [ ] Cache headers for `/assets/**`

