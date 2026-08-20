# College Website — Build Checklist

## Phase 1 — Project Scaffolding
- [x] Create project structure (college-website/)
- [x] Create TODO.md tracking
- [x] Create root README.md
- [x] Create sitemap.xml

## Phase 2 — Backend (Express + SQLite)
- [x] server/package.json
- [x] server/database.js — schema (registrations, students, grades, attendance, courses, homework, announcements, news, events, staff, board_members, contacts, chat_conversations, chat_messages)
- [x] server/auth.js — JWT sign/verify middleware
- [x] server/index.js — Express API (auth, registrations, CMS, search, chat, contact)
- [x] server/chatService.js — Anthropic proxy + rule-based fallback + contact-admissions fallback
- [x] server/seed.js — demo student + CMS sample content
- [x] server/download_media.js — local media downloader organized by section (fixed path mapping to `images/{section}/` + `videos/{section}/`)

## Phase 3 — Frontend Foundation
- [x] client/package.json
- [x] client/vite.config.js
- [x] client/index.html (SEO meta, favicon)
- [x] client/src/main.jsx
- [x] client/src/index.css — premium design tokens (light/dark), components, responsive
- [x] client/src/context/ThemeContext.jsx
- [x] client/src/context/AuthContext.jsx
- [x] client/src/lib/api.js

## Phase 4 — Frontend Components
- [x] Layout.jsx (header, nav, search, translator, theme toggle, mobile menu, footer, quick links, ticker)
- [x] AnnouncementsTicker.jsx
- [x] QuickLinks.jsx
- [x] SearchBar.jsx
- [x] Breadcrumbs.jsx
- [x] PageHeader.jsx
- [x] ChatWidget.jsx

## Phase 5 — Frontend Pages (Main Sections)
- [x] HomePage.jsx (hero slider, welcome, stats, CTAs)
- [x] AboutPage.jsx
- [x] AdmissionsPage.jsx
- [x] AcademicsPage.jsx
- [x] StudentLifePage.jsx
- [x] NewsEventsPage.jsx
- [x] ContactPage.jsx

## Phase 6 — Frontend Pages (Standard Sections)
- [x] StaffDirectoryPage.jsx
- [x] CalendarPage.jsx
- [x] LibraryPage.jsx
- [x] BoardPage.jsx
- [x] SupportServicesPage.jsx

## Phase 7 — Student Portal
- [x] PortalSignupPage.jsx (intro video + skip)
- [x] PortalSigninPage.jsx (Try Demo Account)
- [x] ForgotPasswordPage.jsx
- [x] StudentDashboardPage.jsx (protected)
- [x] SearchPage.jsx

## Phase 8 — App routing + wiring
- [x] App.jsx — routes + protected route + providers

## Phase 9 — Deliverables / Docs
- [x] docs/SITEMAP.md + wireframes
- [x] docs/STYLE_GUIDE.md
- [x] docs/SCHEMA.md
- [x] docs/DEMO_ACCOUNT.md
- [x] docs/CMS_DOCS.md
- [x] docs/AUDIT.md

## Phase 10 — Install, seed, build & verify
- [x] npm install (server + client)
- [x] Run media downloader (14 images + intro video downloaded locally; hero-1 0-byte cleaned up)
- [x] Seed DB (demo student + CMS sample content)
- [x] Build client (62 modules, 0 errors; JS 248 KB / CSS 31 KB)
- [x] Smoke-test API endpoints (stats, news, staff, events, board, library, search, announcements, signin JWT, protected routes, chat)

