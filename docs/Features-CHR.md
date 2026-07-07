# CHR Developments — Features & Tech Stack

A full-stack Laravel web application for a real estate development company, providing a public marketing site and a full admin dashboard to manage all site content.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend framework | Laravel 10 (PHP ^8.1) |
| Templating | Blade |
| Auth scaffolding | Laravel Breeze, Laravel Sanctum |
| Database | MySQL (Eloquent ORM) |
| Multi-language content | `spatie/laravel-translatable` |
| Flash notifications | `yoeunes/toastr` |
| HTTP client | Guzzle |
| Frontend build | Vite + `laravel-vite-plugin` |
| CSS | Tailwind CSS 3, `@tailwindcss/forms`, PostCSS/Autoprefixer |
| Frontend JS | Alpine.js, Axios |
| Maps | Leaflet.js (Contact Us page) |
| Dev/test tooling | Laravel Sail, Pint, PHPUnit, Faker, Mockery, Collision, Ignition |

## Localization

- Full Arabic (RTL) / English (LTR) support via `SetLocale` middleware and `lang/{locale}` route (`lang/ar`, `lang/en`).
- Content fields on models are translatable using `spatie/laravel-translatable`.

## Authentication & Access

- Laravel Breeze-based auth: login, registration, email verification, password reset/confirmation.
- Authenticated `/dashboard` and `/profile` (edit, update, password update, delete account).
- All `/admin/*` routes are protected by the `auth` middleware.

## Public (Frontend) Site

Routes under `Frontend\*` controllers (`PageController`, `AboutController`, `ContactUsController`):

- **Home page** — hero section, about-home teaser, features, testimonials.
- **About Us** — CEO message, company numbers/stats, team members, testimonials.
- **Current Projects** — list + detail page per project (location, area, status, category, plans, images, services).
- **Previous Projects** — portfolio/listing of completed developments.
- **Construction Updates** — list of updates + per-project progress detail (phases, images, embedded videos).
- **Blog** — blog listing and single post view.
- **Contact Us** — office locations with interactive map (coordinates), contact form with client call/request submission (rate-limited, `throttle:5,1`).
- **Social/WhatsApp integration** — floating quick-access social buttons, footer social links, fixed links (e.g. WhatsApp).
- Fully responsive design.

## Admin Dashboard

Prefix `/admin`, resource-based CRUD (`Route::resource`) for nearly every content area:

**Home**
- Hero section
- About-Home section

**About**
- CHR About (company overview)
- About Heading
- About CEO (message)
- About Numbers (stats/counters)
- Features
- Team members
- Testimonials

**Projects**
- Projects (core resource)
- Current Projects
- Previous Projects
- Project Details, Project Headings, Project Images, Project Plans, Project Services
- Construction Updates + Construction Update Projects (progress tracking per project)

**Blog**
- Blog posts (CRUD)

**Contact Us**
- Client Requests (submitted contact/call requests)
- Contact Locations
- Coordinates (map pins)

**Website Links / Settings**
- Navigation (Nav) management
- Social Media links
- Contacts (general contact info)
- Fixed Links (e.g. WhatsApp floating button)
- Footer Section content

**Profile**
- Admin profile edit, password update, account deletion

## Data Model Overview

Eloquent models: `AboutCeo`, `AboutHeading`, `AboutHome`, `AboutNumber`, `Blog`, `ChrAbout`, `ClientRequest`, `ConstructionUpdate`, `ConstructionUpdateProject`, `Contact`, `ContactLocations`, `Coordinate`, `CurrentProject`, `Feature`, `FixedLink`, `FooterSection`, `Hero`, `Nav`, `PreviousProject`, `Project`, `ProjectDetail`, `ProjectHeading`, `ProjectImage`, `ProjectPlan`, `ProjectService`, `SocialMedia`, `Team`, `Testimonial`, `User`.
