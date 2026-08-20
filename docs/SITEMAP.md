# College Website — Sitemap & Wireframes

## Sitemap

```
/                          Home
├── /about                 About Us
├── /admissions            Admissions
│   └── (Apply form)       Admissions application → registrations table
├── /academics             Academics
├── /student-life          Student Life
├── /news                  News & Events
│   └── /calendar          Academic Calendar (filterable + iCal export)
├── /contact               Contact Us
├── /staff-directory       Staff Directory (searchable)
├── /library               Library / Media Center
├── /board                 Board of Governance
├── /support-services      Support Services
├── /search?q=             Site Search
└── /portal                Student Portal
    ├── /portal/signup         (intro video + skip)
    ├── /portal/signin         (Try Demo Account)
    ├── /portal/forgot-password
    └── /portal/dashboard      (protected)
```

## Wireframes

### Home
```
┌──────────────────────────────────────────┐
│ Announcements Ticker  [dismissible]      │
│ ┌──────────────────────────────────────┐ │
│ │ Header: Logo  [Nav] [Search] [🌙]  │ │
│ ├──────────────────────────────────────┤ │
│ │ Hero Slider (3 rotating images)      │ │
│ │  Welcome msg + CTA buttons           │ │
│ │  Apply Now  ·  Visit Campus          │ │
│ │  Stats: 8500+ students · 60 programs │ │
│ └──────────────────────────────────────┘ │
│ Quick Links bar                          │
│ Welcome from leadership (text + photo)   │
│ Quick Stats cards                        │
│ News/Events teasers                      │
│ Social media feeds (FB/IG/X)             │
│ ┌──────────────────────────────────────┐ │
│ │ Footer                               │ │
│ └──────────────────────────────────────┘ │
│ ✕ floating ChatWidget                     │
└──────────────────────────────────────────┘
```

### About / Admissions / Academic / Student Life / News
```
┌──────────────────────────────────────────┐
│ Breadcrumbs: Home > About                │
│ PageHeader (title + subtitle)            │
│ Content sections:                        │
│   - Mission & Vision cards               │
│   - Leadership grid (photos + bios)      │
│   - Accreditation info                   │
│   - Campus map / gallery                 │
│ /admissions adds:                        │
│   - Step-by-step application guide       │
│   - Tuition & fees table                 │
│   - Deadline calendar                    │
│   - Financial aid / scholarships         │
│   - FAQ accordion                        │
│   - Application form (→ registrations)   │
│ /news adds:                              │
│   - Category filter chips (news)         │
│   - News cards grid                      │
│   - Event filter chips (events)          │
│   - Event cards with date/location       │
└──────────────────────────────────────────┘
```

### Student Portal — Signin / Signup / Dashboard
```
Portal Signup:
  - Intro video (autoplay muted, unmute control, Skip button)
  - Registration form (name, email, student ID, password, program, year)
  - Duplicate email/ID validation; password hashed at backend

Portal Signin:
  - Email + password form
  - Forgot password link
  - "Try Demo Account" button (auto-fills demo@student.college.edu / demo1234)
  - Demo credentials shown in a labeled notice

Dashboard (protected):
  Stat cards: Courses · Attendance % · Assignments Due · GPA
  Profile overview card (name, ID, program, year, email)
  Courses table  ·  Grades table
  Homework list (status badges)  ·  Attendance table
  Announcements list (urgent badge support)
```

## Page × Feature Matrix

| Feature                        | Home | About | Adms | Acad | Life | News | Contact |
|--------------------------------|------|-------|------|------|------|------|---------|
| Hero / header                  | ✅   |       |      |      |      |      |         |
| Page header + breadcrumbs      |      | ✅    | ✅  | ✅  | ✅  | ✅  | ✅      |
| Media (local /assets/media)    | ✅   | ✅    | ✅  | ✅  | ✅  | ✅  | ✅      |
| Data from API                  | stats| staff | forms| prog | life | news/events | contact |
| CTA (Apply/Portal)             | ✅   | ✅    | ✅  | ✅  | ✅  | ✅  |         |

