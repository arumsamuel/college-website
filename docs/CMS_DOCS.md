# College Website — CMS Setup & Admin Training

## What "CMS" means here

The site is database-driven via the Express API. Content is served from SQLite tables:
`news`, `events`, `staff`, `board_members`, `library_items`, `announcements`, `registrations`, `contact_messages`.

Staff can update content **without touching React code** by editing the database (via SQL scripts, the included seed, or a future admin UI) — the site reflects changes immediately.

## Adding News

```sql
INSERT INTO news (title, category, summary, body, image_path)
VALUES ('New Scholarship Program', 'Campus',
        'A new merit scholarship opens next year.',
        'Full details here...',
        '/assets/media/images/news/news-1.jpg');
```

Category choices for the filter chips: `Campus`, `Research`, `Athletics`, `Arts`.

## Adding Events (calendar)

```sql
INSERT INTO events (title, category, location, date, end_date, description)
VALUES ('Orientation Day', 'Academic', 'Student Union', '2026-08-20', NULL, 'Welcome new students.');
```

Categories drive the filter (#All + unique categories). The academic calendar can be exported as iCal from the `/calendar` page.

## Staff Directory

```sql
INSERT INTO staff (name, title, department, email, phone, room, bio)
VALUES ('Jane Doe', 'Professor of Chemistry', 'Chemistry',
        'j.doe@college.edu', '+15550110099', 'Chem 104', 'Specializes in organic chemistry.');
```

Directory is searchable by name/title/room and filterable by department.

## Announcements (ticker)

```sql
INSERT INTO announcements (title, body, audience, is_urgent)
VALUES ('Snow Day', 'Campus closed tomorrow.', 'all', 1);
```

`is_urgent = 1` shows the item first and styles it as urgent. `audience` filters which students see it on the portal.

## Board Members & Library Items

```sql
INSERT INTO board_members (name, role, bio) VALUES ('Dr. X', 'Trustee', 'Bio...');
INSERT INTO library_items (title, author, type, location, available)
VALUES ('Calculus', 'Stewart', 'Book', 'QA303', 1);
```

## Managing Applications

- `POST /api/registrations` — submitted by the Admissions application form.
- `PATCH /api/registrations/:id/status` — set `pending | accepted | rejected`.
- A registration becomes a `students` record **only after formal admission & enrollment**.

## Media

Upload images to `public/assets/media/images/{section}/` and reference them by relative path:
`/assets/media/images/news/news-1.jpg`. Use compressed JPEG/WebP (≤ ~200KB) and `loading="lazy"`.

## Production Notes

- Set `JWT_SECRET` to a strong value; set `ANTHROPIC_API_KEY` to enable Claude-powered chat (optional).
- Serve over HTTPS behind a reverse proxy (e.g., Caddy/Nginx) for secure portal login.
- Backup `server/college.db` on a schedule.

