# 🎓 College Website

A professional, modern, fully responsive college website built with a **React** frontend and a **database-backed Express + SQLite** backend. Features a secure student portal with JWT auth, an AI chatbot grounded in site content, CMS-driven content, and light/dark theme support.

---

## ✨ Features

- **🏠 7 Main Sections** — Home (hero slider, welcome, stats, CTAs), About, Admissions, Academics, Student Life, News & Events, Contact
- **6 Standard Sections** — Staff Directory (searchable), Calendar (filterable + iCal export), Library, Board of Governance, Support Services
- **🎓 Student Portal** — Signup with intro video (skip/dismiss), sign-in with "Try Demo Account", password reset flow, and a protected dashboard showing profile, grades, attendance, homework, courses, and announcements
- **🤖 AI Chat Assistant** — floating widget + Anthropic API proxy (server-side key) grounded on site FAQs, with rule-based fallback and "contact admissions" fallback
- **🌗 Light / Dark Mode** — premium ivory/navy/gold palette; instant theme swap via CSS custom properties, persisted to localStorage with no-flash inline script
- **🔍 Global Search** — header search bar with autocomplete across news, staff, events, and library
- **📣 Announcements Ticker** — scrolling, dismissible urgent alert bar on every page
- **⚡ Quick Links bar, Translator toggle, Breadcrumbs, Social feeds section, SEO meta tags + sitemap.xml**

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6, Vite 5 |
| Backend | Express 4 |
| Database | SQLite via **Node built-in `node:sqlite`** (zero native deps) |
| Auth | JWT (`jsonwebtoken`), bcrypt password hashing (`bcryptjs`) |
| AI Chat | Anthropic API (`ANTHROPIC_API_KEY`) with rule-based fallback |
| Media | Locally stored in `public/assets/media/{images,videos}/{section}/` |

> **Requires Node.js 22.5+** (uses `node:sqlite`; tested on Node 24).

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd server
npm install
cd ../client
npm install
```

### 2. (Optional) Download media assets
All media is downloaded once and saved locally. To (re)download:
```bash
cd server
npm run media
```

### 3. Seed the database
The server auto-seeds the demo student + CMS content on first boot, or run manually:
```bash
cd server
npm run seed
```

### 4. Run in production (server serves pre-built client)
```bash
cd server
npm start        # http://localhost:4010
```
> Rebuild client first if you changed it: `cd client && npm run build`

### 5. Development mode (two terminals)
```bash
# Terminal 1 — API server
cd server && npm run dev          # http://localhost:4010

# Terminal 2 — Vite dev server
cd client && npm run dev          # http://localhost:5174
```

---

## 🔑 Demo Account

| Field | Value |
|-------|-------|
| Email | `demo@student.college.edu` |
| Password | `demo1234` |

The demo account is fully populated with grades, attendance, homework, courses, and announcements so visitors can explore every portal feature without registering. A **"Try Demo Account"** button on the sign-in page auto-fills these credentials, and a banner on the dashboard labels it clearly.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create student account (validates duplicate email, hashes password) |
| POST | `/api/auth/signin` | Sign in, returns JWT + student profile |
| POST | `/api/auth/forgot-password` | Password reset request (safe response) |
| GET | `/api/students/me` | Protected: current profile |
| GET | `/api/students/me/courses` | Protected: enrolled courses |
| GET | `/api/students/me/grades` | Protected: grades |
| GET | `/api/students/me/attendance` | Protected: attendance |
| GET | `/api/students/me/homework` | Protected: homework |
| GET | `/api/students/me/announcements` | Protected: announcements |
| POST | `/api/registrations` | Submit admissions application |
| GET | `/api/registrations` | List applications |
| PATCH | `/api/registrations/:id/status` | Update application status |
| GET | `/api/news` | News feed (filter by category) |
| GET | `/api/events` | Events (filter by category) |
| GET | `/api/staff` | Staff directory (search by q, department) |
| GET | `/api/board` | Board members |
| GET | `/api/library` | Library catalog (search) |
| GET | `/api/announcements` | Announcements |
| GET | `/api/search` | Global search (news, staff, events, library) |
| POST | `/api/contact` | Contact form |
| POST | `/api/chat` | AI chatbot reply (grounded in site content) |
| GET | `/api/stats` | Aggregate stats |

---

## 🗄️ Database Schema

- `registrations` — Admissions applications (name, email, phone, program, status, documents)
- `students` — Portal accounts (student_id, name, email, password_hash, program, year, enrollment_date)
- `students_courses`, `courses`, `grades`, `attendance`, `homework` — portal child records
- `announcements`, `news`, `events`, `staff`, `board_members`, `library_items` — CMS content
- `contact_messages`, `chat_conversations`, `chat_messages`

Registrations and students are **separate** — a registration only becomes a student record once formally admitted and enrolled (or, for the demo, seeded directly).

---

## 📁 Project Structure

```
college-website/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Layout, ChatWidget, SearchBar, Ticker, QuickLinks, etc.
│   │   ├── context/            # ThemeContext, AuthContext
│   │   ├── lib/                # api.js helper
│   │   └── pages/              # 17 page components
│   ├── index.html              # SEO meta + no-flash theme script
│   └── vite.config.js          # dev proxy → localhost:4010
├── public/
│   ├── assets/media/           # Local images + videos (by section)
│   └── sitemap.xml
├── server/
│   ├── index.js                # Express API + static serving
│   ├── database.js             # node:sqlite schema
│   ├── auth.js                 # JWT helpers
│   ├── chatService.js          # Anthropic proxy + rule-based fallback
│   ├── seed.js                 # Demo student + CMS seed
│   ├── download_media.js       # Media downloader
│   └── college.db              # SQLite database (auto-created)
├── docs/                       # Sitemap/wireframes, style guide, schema, demo, CMS, audit
├── TODO.md
└── README.md
```

---

## 🤖 AI Chat Configuration

Set an Anthropic API key to power the AI assistant with Claude. The key stays server-side:
```bash
# Windows (PowerShell)
$env:ANTHROPIC_API_KEY = "sk-ant-..."

# macOS / Linux
export ANTHROPIC_API_KEY="sk-ant-..."
```
Without a key, the bot uses a fully rule-based fallback grounded in the site's FAQ knowledge base and routes uncertain queries to the Admissions Office.

---

## 📄 Documentation

See the `docs/` folder for:
- **SITEMAP.md** — sitemap + wireframes for all main sections
- **STYLE_GUIDE.md** — light/dark color tokens, typography, component library
- **SCHEMA.md** — database schema diagram
- **DEMO_ACCOUNT.md** — demo credentials + portal walkthrough
- **CMS_DOCS.md** — CMS setup and admin training
- **AUDIT.md** — pre-launch accessibility & performance audit checklist

