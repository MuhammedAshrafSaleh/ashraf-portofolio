# DebtPro — Feature List

A Flutter debt/installment management app (Arabic-first, RTL, dark/light theme) backed by
Firebase Auth + Firestore. Architecture: Clean Architecture, BLoC/Cubit, GoRouter, get_it DI.

---

## 1. Onboarding
- First-launch onboarding walkthrough (`/onboarding`), shown once and persisted via
  `SharedPreferences` (`kHasSeenOnboardingKey`).
- Redirects to `/login` afterwards; never shown again on subsequent launches.

## 2. Authentication (`auth`)
- Email/password **registration** with email verification flow.
- **Login** with email/password.
- **Email verification** gate — unverified users are routed to `/verify-email` and blocked
  from the rest of the app until verified; "resend verification email" support.
- **Forgot password** — send password reset email, with a confirmation ("email sent") screen.
- **Sign out**.
- **Reload user** (refresh Firebase user state, e.g. after verifying email).
- **Get current user** use case for session bootstrapping.
- GoRouter auth guard: unauthenticated → `/login`; unverified → `/verify-email`;
  authenticated → `/dashboard`.

## 3. Clients (`clients`)
- **Client list** with real-time Firestore stream (`watchClients`), filtering/search, and
  status filters.
- **Add client** — captures full name, phone, gender, documentation type, client type.
- **Edit client**.
- **Delete client**.
- **Client detail page** — shows denormalized totals per client:
  - `totalPaid`, `totalRemaining`
  - `activeDebtsCount`
  - `paymentQualityScore`, `onTimePaymentsCount`, `totalDuePaymentsCount`
  - Lists the client's installments and grace periods.

## 4. Installments (`installments`)
- **Add installment** for a client (monthly recurring debt, due day fixed at the 10th).
- **Edit installment** — locked for editing after the first payment is made
  (`editLocked: true`).
- **Delete installment**.
- **Installment tracking page** — view an installment and its full payment history/schedule.
- **Get installment with payments** (combined detail + payment list use case).
- **Watch installments for client** — real-time stream per client.
- **Pay office commission** on an installment.
- Automatic payment status computation: `upcoming` / `current` / `overdue`, based on due date
  (10th of month).

## 5. Grace Periods (`grace_periods`)
- **Add grace period** — single-payment debt type (not recurring). Grace window =
  `dueDate + 10 days`.
- **Edit grace period**.
- **Delete grace period**.
- **Get grace period** detail.
- **Watch grace periods for client** — real-time stream.
- **Pay office commission** on a grace period.
- Automatic grace period status computation based on due date + grace window.

## 6. Payments (`payments` — BLoC, not Cubit)
- **Pay installment payment** — records a monthly installment payment.
- **Pay grace period** — records payment of a grace-period debt.
- **Reverse payment** — marks a transaction `reversed` (never deletes; immutable audit log).
- **Get transactions** / **watch transactions for client** — real-time transaction history.
- **Refresh payment statuses** — batch job run once on authenticated app start; updates stale
  `upcoming`/`current` statuses to `overdue` in chunked batches of 499 writes (Firestore
  500-write limit).
- Confirmation dialogs required before paying or reversing any payment.

## 7. Accounts / Reports (`accounts`)
- **Accounts (browse) page** — list of financial account items with a status filter row.
- **Current dues report** — clients/amounts currently due.
- **Overdue report** — overdue clients and tiles showing overdue amounts.
- **Transactions PDF export** — generate a PDF of payment transactions, with:
  - Day picker for filtering by payment date
  - +/- amount adjustments
  - Exclusion of reversed rows
- Dedicated PDF generators: accounts PDF, current-dues PDF, overdue PDF, payments PDF —
  all rendered off the UI thread via a PDF isolate (`pdf_isolate.dart`).

## 8. Dashboard (`dashboard`)
- **Dashboard summary page** with:
  - Collection "hero" stat card
  - Stat cards (key metrics)
  - Clients-with-active-dues count widget
  - Recent transactions list/tile
- **Get dashboard data** and **get recent transactions** use cases aggregate data across
  clients/installments/grace periods/payments.

## 9. Settings (`settings`)
- **Owner/business config** — get & update owner configuration (e.g. business name, office
  commission settings) shown via `OwnerConfigRow` widgets.
- **Edit account page** — update display name, email, and password.
- **Theme toggle** — dark (default) / light, persisted under `app_theme`.
- **Language switch** — Arabic (default, RTL, Cairo font) / English (LTR, Inter font),
  persisted under `app_language`.
- **Load preferences** on app start (theme + language).
- **Reset account** — wipes app/user data.

## 10. Cross-Cutting / Platform Features
- **Firebase backend**: Auth + Firestore, all data isolated per-user under `users/{userId}/`.
- **Offline/network detection** (`connectivity_plus`) — every Firestore-hitting repository
  method checks connectivity first and returns a localized `NetworkFailure` if offline.
- **Atomic multi-document writes** — `runTransaction` / `WriteBatch` only, no looped
  single-document writes, for actions like paying an installment, reversing a payment, or
  creating an installment.
- **Localization** — full Arabic + English string coverage (`app_ar.arb` / `app_en.arb`),
  Arabic as source of truth.
- **Theming** — dark/light themes, `AppTypography` per-locale fonts.
- **Responsive/RTL-safe UI** — `EdgeInsetsDirectional`/`AlignmentDirectional` throughout,
  no hardcoded pixel sizes, keyboard-aware scrollable forms.
- **Persistent bottom navigation shell** (`MainShell` + GoRouter `ShellRoute`) wrapping
  Dashboard, Clients, Accounts, and Settings tabs.
- **Consistent UX contract** across all async operations: loading indicators, success/error
  SnackBars, and confirmation dialogs before destructive/financial actions (pay, reverse,
  delete, logout).
