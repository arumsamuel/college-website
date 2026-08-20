# College Website — Demo Account & Portal Walkthrough

## Credentials

| Field    | Value                        |
|----------|------------------------------|
| Email    | `demo@student.college.edu`   |
| Password | `demo1234`                   |
| Student  | Jordan Avery (S-2026-0001)   |
| Program  | Computer Science, Year 2     |

The sign-in page has a **"Try Demo Account"** button that auto-fills these credentials, and the credentials are displayed in a clearly-labeled notice. The dashboard shows a banner: *"You're exploring the demo account."*

## Walkthrough

1. **Open** `http://localhost:4010` (production build) or the Vite dev URL.
2. **Go to Sign In** → `Student Portal` chapter in the nav → *Student Portal / Sign In*.
3. Click **"Try Demo Account"** (auto-fills credentials), then **Sign In**.
4. You are redirected to the **Student Dashboard**:
   - **Profile overview** — name, student ID, program, year, email, GPA
   - **Stat cards** — enrolled courses (5), attendance % , assignments due, grades on record
   - **Enrolled Courses** — CS101, CS220, MATH210, ENG110, SCI201 (with credits)
   - **Grades** — 5 graded courses across Fall 2025 / Spring 2026 (A, B+, A-, B)
   - **Homework** — pending / in_progress / submitted / graded items with due dates
   - **Attendance** — present / late / absent records per course
   - **Announcements** — urgent (Winter Weather) and program-scoped (CS Hackathon) items
5. **Fully registered students** get the same dashboard populated with their own records after sign-up.

## Notes

- Signup validates duplicate emails/student IDs (`409`), hashes passwords with `bcryptjs`, and issues a JWT on success.
- Protected dashboard routes return `401` without a valid token.
- Signing out clears the token from `localStorage`.

