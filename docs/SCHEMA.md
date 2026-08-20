# College Website — Database Schema

SQLite (Node built-in `node:sqlite`), auto-created at `server/college.db`.

## ER Diagram

```
registrations                     students (auth)
+---------------+       +-------------------------+
| id PK         |       | id PK                   |
| applicant_name|       | student_id UNIQUE       |
| email         |       | name                    |
| phone         |       | email UNIQUE            |
| program       |       | password_hash (bcrypt)  |
| status        |       | program                 |
| document_path |       | year                    |
| created_at    |       | enrollment_date         |
+---------------+       | created_at              |
                        +-------------------------+
                             | 1
                             | has many
              +--------------+-----------------+
              |              |                 |
   grades     |  students_courses   |   homework
   +---------+|  +--------------+  |+------------+
   | id PK   ||  | id PK       |  || id PK      |
   | student ||  | student FK  |  || student FK |
   | course  ||  | course FK   |  || course FK  |
   | term    ||  +--------------+  || title     |
   | grade   ||                    || due_date  |
   | points  ||     attendance     || status    |
   +---------+|    +-------------+ || description|
              |    | id PK       | |+------------+
              +--> | student FK  |
                   | course FK   |
                   | date        |
                   | status      |
                   +-------------+

CMS content: announcements · news · events · staff · board_members · library_items
Interaction:  contact_messages · chat_conversations · chat_messages
```

## Table Inventory

| Table                  | Purpose                                            |
|------------------------|-----------------------------------------------------|
| `registrations`        | Admissions applications (pending/accepted/rejected) |
| `students`             | Portal accounts — separate from registrations       |
| `courses`              | Catalog of courses                                  |
| `students_courses`     | Enrollment join table                               |
| `grades`               | Term grades + grade points                          |
| `attendance`           | Per-course attendance records                       |
| `homework`             | Assignments with status + due dates                 |
| `announcements`        | Urgent + audience-scoped announcements              |
| `news`                 | News feed (category, summary, body, image)          |
| `events`               | Event calendar (category, date, end_date, location) |
| `staff`                | Staff directory (name, title, dept, email, room)    |
| `board_members`        | Board of Trustees                                   |
| `library_items`        | Digital catalog items                               |
| `contact_messages`     | Contact form submissions                            |
| `chat_conversations`   | Chat session store                                  |
| `chat_messages`        | Per-message chat history                            |

## Separation Rule

A `registrations` record only becomes a `students` record once an applicant is **formally admitted and enrolled**. The demo student (`S-2026-0001`) is seeded directly as an enrolled student with a full set of grades, attendance, courses, and homework.

