# EUX Client App — Features

A Flutter mobile app (`eux_client`) for **EUX**, a shipping/logistics service (a courier reseller/aggregator) that lets clients manage their shipping orders. The UI is **Arabic-first** (RTL, `Locale('ar', 'EG')`, Cairo font).

---

## Core Features

### 1. Authentication (`features/auth`)
- Email/password **signup, login, password reset, and sign-out** via **Firebase Auth**.
- User profile data (name, email, phone) stored in **Cloud Firestore**.

### 2. Orders Management (`features/home`)
- **Create, edit, delete, and list** shipping orders ("Add/Edit Order", "Orders Page").
- Orders contain full shipping details: receiver name/phone/address (governorate, city, area, street), item type/name, **COD/FOD** amounts, weight, insurance, etc. — essentially a **J&T Express shipment manifest** format.
- Backend storage is a **Google Sheet**, accessed via a **Google Apps Script Web App** (`GoogleSheetService`).
- Orders are filtered **per-user** by matching the "Remarks" field to the user's phone number.

### 3. Order Tracking (`features/home` — `TrackingService`)
- Integrates with **J&T Express's logistics tracking API** (`openapi.jtjms-eg.com`).
- Uses HMAC-style request signing: `base64(md5(bizContent + privateKey))` with a configured API account / private key.
- Parses tracking **scan history**, and translates scan types and "problem reasons" into **Arabic** for display.

### 4. Splash Screen (`features/splash`)
- Checks **auth status** (via `SplashCubit` + `NetworkInfo`) and **connectivity** (`connectivity_plus`) to route the user to login or the main app.

---

## Architecture

- **State management:** `flutter_bloc` (Cubits) — `AuthCubit`, `OrdersCubit`, `UserCubit`, `SplashCubit`.
- **Folder structure:** feature-based separation (`features/auth`, `features/home`, `features/splash`).
- **Dependencies:** `get_it`, `dartz`, `equatable` present (intended clean-architecture / DI / error-handling patterns) — note `service_locator.dart` / DI init is currently commented out in `main.dart`.

---

## External Integrations

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | User authentication |
| **Cloud Firestore** | User profile storage |
| **Google Sheets** (Apps Script Web App) | Order database (CRUD via HTTP) |
| **J&T Express Logistics API** (`jtjms-eg.com`) | Real-time shipment tracking |
| **connectivity_plus** / **internet_connection_checker** | Network status checks |

---

## Notable Concerns (worth flagging)

- ⚠️ The **J&T API private key** and **Google Sheets endpoint** are hardcoded in client source — exposed to anyone who decompiles the app. Move secrets to a secure backend/proxy.
- ⚠️ Numerous `print()` debug statements left in production service code — should be removed or gated behind a logger.
- ⚠️ DI / service locator initialization is commented out in `main.dart` — clean-architecture wiring is incomplete.
