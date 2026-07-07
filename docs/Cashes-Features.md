# Cashes — Full Feature List

**Cashes** is a multi-tenant SaaS mobile app for construction/finishing companies. It manages cash disbursements, vendor invoicing, and receipt documentation for site engineers — with company-level admin oversight.

**Stack:** Flutter · Clean Architecture · Cubit · Supabase (PostgreSQL + Auth + Storage + Edge Functions + pg_cron)
**Defaults:** Dark theme · Arabic (RTL) · Gold `#F5A623` primary

---

## User Roles

| Role | Panel | Can Create | Can Read | Can Delete |
|---|---|---|---|---|
| **Owner** | CEO Panel | Companies, Users | Everything (all companies) | Companies, Users |
| **Admin** | Admin Panel | Users (seat-limited) | Own company users + notifications | Users in own company |
| **User** | Projects | Projects, Cash Entries | Own projects/entries only | Own projects/entries |

---

## Phase 1 — Owner (CEO) Panel

- **F-01 · Companies List** — Companies overview with logo, name, user count; search, filter, pull-to-refresh; overview statistics (total users, total companies, synced count); `+ ADD COMPANY` and `+ ADD USER` buttons.
- **F-02 · Add Company** — Company profile setup: name (required, 2–100 chars), brand identity logo upload (camera/gallery, compressed to ≤500KB).
- **F-03 · Edit Company** — Update company name/logo; **Delete Company** with confirmation dialog and cascade delete (all users, projects, entries, images).
- **F-04 · Create User Account** — Full name, company dropdown, email, password + confirm; creates user via `create-user` Edge Function (no Owner logout) + session refresh. Supports `user` and `admin` roles.
- **F-05 · Edit User** — Update full name, reassign company; **Delete User** (via `admin-delete-user` Edge Function) with cascade delete.
- **F-06 · Users List (per company)** — Owner drill-down into a company's users (read-only); tapping a user shows their projects in view-only mode.

---

## Phase 2 — Company Admin Panel

- **F-07 · Admin — All Users** — Users scoped to admin's company (`role = 'user'` only); search by name/email; delete user with confirmation; drill into user projects (read-only); bottom nav (Users / Notifications with unread badge). Admins can create seat-limited users (max-users enforcement per company).
- **F-08 · Admin — Notifications** — Real-time alerts feed; type tags (`NEW ASSIGNMENT`, `UPDATE LOG`/`ENTRY ADDED`, `STRUCTURAL ALERT`, `ARCHIVED`) with color coding; shows engineer name, project, date/time; tap marks read and deep-links to project; delete notification; refresh.

---

## Phase 3 — Authentication

- **F-09 · Splash Screen** — Reads role from JWT (no DB query) and routes: `owner` → Companies, `admin` → Admin Users, `user` → Projects. Handles deleted-user/no-internet edge cases. Min 1.5s duration.
- **F-10 · Login** — Email/password with show/hide toggle; role-based navigation on success; "Forgot Password?" link; no self-registration.
- **F-11 · Forgot Password** — Email input → `resetPasswordForEmail`; always shows success (security best practice).
- **F-12 · Email Sent Confirmation** — Static confirmation screen + back to login; device back disabled.
- **Reset Password** — Set new password from the email reset link.

---

## Phase 4 — Settings

- **F-13 · Settings Main** — Profile card with editable avatar; Personal Information link; language toggle (AR/EN with immediate RTL/LTR switch); appearance toggle (Dark/Light, persisted); logout with confirmation; app version.
- **F-14 · Edit Profile** — Update full name, email, avatar; change password (verify current → new + confirm) with inline validation.

---

## Phase 5 — Projects Management (User)

- **F-15 · Projects Overview** — "Active Developments" home; project cards with name, creation date, total amount, ⋮ menu; search; total portfolio value footer; FAB to create; scoped to `user_id = auth.uid()`; pull-to-refresh.
- **F-16 · Create Project (Bottom Sheet)** — Name a new project; auto-creates `new_assignment` notification.
- **F-17 · Project Settings (Bottom Sheet)** — Rename project (→ `update_log` notification); **Delete Project** with cascade delete (→ `archived` notification).

---

## Phase 6 — Invoices & Cash Entries (User)

- **F-18 · Project Details (Container)** — Tabbed container (Invoices / Images); refresh + print/export icons; FAB and print only on Invoices tab.
- **F-19 · Invoices Tab (Financial Ledger)** — Total invoiced summary; ledger table (Date | Vendor/Entity | Amount); tap row → edit; **PDF export** (project name, company logo, entries table, receipt thumbnails, grand total) via share sheet; image-expiry warning banner.
- **F-20 · Add Cash Entry** — Transaction amount (> 0), entry name, date (no future dates, with custody/الُعهدة date selectable for PDF); optional receipt attach (camera/gallery, pre-generated UUID flow, compress ≤500KB); idempotent insert via `client_request_id`; auto-creates `entry_added` notification.
- **F-21 · Edit Cash Entry** — Edit amount/name/date; manage receipt (delete existing / attach new / handle expired); **Delete Entry** (→ `structural_alert` notification); save → `update_log` notification.
- **F-22 · Images Tab (Receipt Gallery)** — Grid/masonry of non-expired receipt images from `cash_entries.receipt_url`; tap → edit entry; no FAB; expiry warning banner; expired receipts hidden.

---

## Cross-Cutting Features

- **Role-based routing & guards** — Single app, JWT-driven role detection; read-only "view only" mode for Owner/Admin drilling into user data.
- **Seat limits** — Per-company max-users enforcement on user creation (Owner & Admin).
- **Notifications system** — RPC-based: `new_assignment`, `entry_added`, `update_log`, `structural_alert`, `archived`.
- **Image lifecycle** — Compress to ≤500KB, upload to `receipt-images/{company_id}/{user_id}/{entry_id}.jpg`; 30-day expiry via pg_cron (DB flag + Storage file deletion); 5-day-before warning banner; financial record never deleted.
- **PDF export** — Generated with `pdf` + `printing`; includes logo, entries, receipt thumbnails, totals, custody date; degrades gracefully when receipts expired.
- **Localization** — Arabic (default, RTL) + English, ARB-based, runtime switch.
- **Theming** — Dark (default) / Light, gold accent, persisted via `shared_preferences`.
- **Global UX standards** — Snackbar feedback on every state change, confirmation dialogs on destructive actions, loading indicators, empty states, double-tap protection, offline banner.
- **Auth resilience** — Token refresh on 401, forced logout on deleted account (403/RLS), session-expiry handling.

---

## Out of Scope (v1.0)

In-app messaging · multi-currency · project status workflows · Owner analytics dashboard · third-party accounting integrations · web admin panel · user self-registration · role-selection UI · background push notifications.

---

*Total: 22 primary screens across 6 phases.*
