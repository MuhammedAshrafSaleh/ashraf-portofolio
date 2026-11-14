# DOTS — Full Feature Overview for Marketing

> DOTS is a bilingual Arabic/English e-commerce and catalog platform built for lighting, smart home, and electrical supplies in Egypt. It is a complete, production-ready system — not a template — custom-built from the ground up with a modern tech stack and a full-featured admin panel.

---

## 1. Fully Bilingual — Arabic-First, RTL Native

DOTS is not just "translated." It was designed Arabic-first:

- Every page, product, blog post, service, and content block exists in both **Arabic and English**
- Full **right-to-left (RTL)** layout for Arabic with a pixel-perfect left-to-right (LTR) flip for English
- Arabic-script URLs — Arabic slugs in Arabic routes (e.g. `/ar/منتجات/اسم-المنتج`)
- Language switcher keeps the visitor on the same page in the other language
- `hreflang` tags and bilingual `sitemap.xml` for bilingual SEO
- Every admin field has a side-by-side AR/EN editor — one save, both languages updated

---

## 2. Professional Product Catalog

An enterprise-grade catalog system with the depth a B2B electrical supplier needs:

- **Multi-level category tree** — 3 levels (main → group → leaf) with icons, hero images, descriptions, buying guides, and FAQ sections per category
- **Rich product pages** — name, overview, specs table, image gallery with captions, warranty info, downloadable files (datasheet, IES file, LDT file, installation guide, plus extras)
- **Smart product variants** — configure variants by any attributes (CCT, wattage, finish, size…) with color/finish swatches; each variant has its own SKU, price, compare-at price, and stock level
- **Product flags** — New Arrival, Best Seller, Smart Home Pick, Dimmable, Ships in 24h
- **Price on request** — products without a price show "Request a quote" with a WhatsApp button instead of an add-to-cart
- **Related products & upsells** — "Often specified together" and "Don't forget" sections per product
- **Brands** — full brand pages with filtered product tabs, project references, and "Specified by DOTS" highlights
- **In-stock / Low stock / On order** — real-time stock statuses on the product listing and product page

---

## 3. Powerful Product Discovery

Customers can find exactly what they need, fast:

- **Livewire-powered product listing** — no page reloads; filter, sort, and paginate instantly
- **Faceted filtering** — by category, brand, any attribute (CCT, wattage, finish…), price range, in-stock only, ships-in-24h
- **Active filter chips** with a one-click clear-all
- **Four sort modes** — Recommended, Newest, Price Low→High, Price High→Low
- **Grid/list view toggle** — customers choose how they browse
- **Full-text search** with scope selection (All / Lighting / Smart Home / Electrical / Brands) — searches both Arabic and English names, SKUs, and brands simultaneously
- **Shareable, bookmarkable filter URLs** — every filter combination has a unique URL, great for sharing quotes and for SEO

---

## 4. Smooth Shopping Experience

A checkout flow designed for Egyptian customers:

- **Cart drawer + cart page** — Livewire-powered, no reloads; qty steppers, remove items, coupon code, delivery estimate, VAT breakdown
- **Coupon system** — percent or fixed discount, minimum order value, usage limits, date range, once-per-customer option
- **"Quote this cart on WhatsApp"** — one click sends the full cart as a formatted WhatsApp message to the sales team
- **Guest checkout** — no account required; customers can save their details after the order to create an account in one step
- **Saved addresses** — returning customers choose from up to 4 saved addresses at checkout
- **Egyptian mobile validation** — built-in format enforcement for 010/011/012/015 numbers
- **Governorate-based delivery** — delivery methods are filtered by governorate automatically
- **VAT-inclusive pricing** — 14% VAT shown on all totals (included, not added)

---

## 5. Three Payment Methods — Zero Lock-in

DOTS supports the three most common Egyptian payment flows out of the box:

| Method | How it works |
|---|---|
| **Cash on Delivery** | Order placed instantly; payment marked paid by staff on delivery |
| **Card via Paymob** | Full Paymob Unified Checkout integration; hidden automatically when credentials are not configured |
| **InstaPay via WhatsApp** | Order created, items reserved for a configurable window; customer is guided to send the receipt on WhatsApp; staff confirms payment in the admin |

- Paymob credentials live only in environment variables — never in the database or admin panel
- Card option silently disappears when not configured — no broken buttons
- Automatic stock reservation and release on expired InstaPay payments (scheduled job)

---

## 6. Order Management

Everything the operations team needs:

- **Dual status system** — Order status (New → Confirmed → Preparing → Shipped → Delivered / Cancelled) and Payment status (Pending / Awaiting Transfer / Paid / Failed / Refunded) tracked independently
- **Full order timeline** — every status change is logged with timestamp, optional note, and admin user
- **Customer-visible notes** — add a note to any status change that the customer sees on the track page
- **Order tracking** — customers track any order with just the order number and mobile number; no account required
- **Order numbering** — sequential starting at DT-10001 (prefix configurable), unique index, also the tracking number
- **Data snapshot** — product name, variant, SKU, unit price, image, delivery address and method are locked to the order at placement; no price drift
- **WhatsApp update** — one-click button in the order detail opens a prefilled WhatsApp chat using an editable template

---

## 7. Customer Accounts

A clean, full-featured account area:

- **Register with mobile and email** — either can be used to log in; standard password reset by email
- **Account area** — overview dashboard, full order history, order detail with timeline, wishlist, saved addresses, profile editor
- **Wishlist** — heart on every product card and product page; login prompt for guests
- **Guest order linking** — a guest order is linked to an account automatically when both the mobile and email match (on registration or at checkout's "save my details" step)
- **Rate limiting** — 5 failed login attempts → 15-minute lockout (brute-force protection built in)
- **Account security** — password change logs out all other devices

---

## 8. WhatsApp as a First-Class Channel

WhatsApp is woven into the product, not bolted on:

- Every WhatsApp click is **logged** to the database (source, page, product/cart/order, customer, IP, timestamp) — full visibility into quote request volume
- **Sources tracked**: product page, cart, InstaPay order, BOQ/drawings upload request, brand page, service page, project page, blog article, order help, general
- **Bilingual message templates** — editable by the admin; variables like `{order_number}`, `{total}`, `{product_name}` are interpolated automatically
- **No automatic messages** — all WhatsApp interactions are staff-initiated, keeping the number healthy and compliant

---

## 9. Services & Consultation

Sell your expertise, not just products:

- **Services pages** — each service has a hero, description, gallery, process steps, and a live consultation request form
- **Consultation requests** — name, mobile, project type, area range, notes — all in the admin
- **Process steps** — the "how we work" section is editable from the admin, shared across all services

---

## 10. Projects Portfolio

A powerful portfolio section that doubles as social proof:

- **Current and previous project tabs** — with hero images, descriptions, gallery
- **Project ↔ Brand links** — a brand's page shows "Specified by DOTS" projects that used that brand's products automatically
- **Bilingual project slugs** — separate Arabic and English URLs

---

## 11. Blog & Content

A built-in content marketing engine:

- **Blog** — posts with categories and tags, featured image, author, bilingual title/body/meta
- **Rich text editor (TipTap)** — headings, paragraphs, bold/italic, links, ordered/unordered lists, blockquotes, images with captions, callout boxes — in every content field
- **Static content pages** — Delivery, Returns, Warranty, Careers, Terms & Conditions, Privacy Policy — all editable from the admin, no code changes needed
- **Newsletter** — footer and blog sidebar sign-up; subscriber list exportable as CSV from the admin

---

## 12. SEO — Ready Out of the Box

DOTS was built with organic traffic in mind:

- **Per-page meta** — every product, category, brand, service, project, article, and content page has its own bilingual title and description
- **Open Graph tags** — correct sharing previews on WhatsApp and social media
- **Canonical URLs** — no duplicate content
- **`sitemap.xml`** — auto-generated, bilingual, covering all public pages
- **`hreflang`** — proper bilingual signals for Google
- **Server-rendered HTML** — no JavaScript rendering required; Google indexes everything on the first crawl
- **Responsive WebP images** — `srcset` for every screen size, lazy-loaded, served from the same server (no third-party CDN dependency)
- **Shareable filter URLs** — every faceted search result has a unique URL that can be indexed

---

## 13. Full Admin Panel — No Third-Party Required

A custom-built admin panel that covers every operation:

| Section | What you can manage |
|---|---|
| **Dashboard** | Key metrics at a glance |
| **Products** | Full catalog — create, edit (tabs: details, variants, files, media, SEO, related), bulk publish/archive/delete |
| **Categories** | Tree with drag-and-drop reorder |
| **Brands** | Brand pages, logos, SEO |
| **Attributes** | Variant axes (CCT, wattage, finish…) with swatch colors |
| **Page content** | Every section of every public page — hero images, headings, body text, CTAs |
| **Services** | Full service editor |
| **Projects** | Portfolio editor — current and previous |
| **Blog** | Posts, categories, tags |
| **Content pages** | Static pages (terms, delivery policy, etc.) |
| **Orders** | List, filter, detail view, status updates, payment confirmation, Paymob logs, WhatsApp updates |
| **Customers** | Customer list, order history, disable accounts |
| **Coupons** | Full coupon rules |
| **WhatsApp leads** | Every logged WhatsApp click |
| **Consultations** | Service consultation request inbox |
| **Newsletter** | Subscriber list with CSV export |
| **Delivery methods** | Unlimited methods, per-governorate rules, free-over amount |
| **Payment methods** | Edit names, descriptions, instructions, order, active/inactive |
| **Settings** | Contact info, WhatsApp number, InstaPay address, hotline, socials, maps link, order prefix, WhatsApp templates, footer links, SEO defaults |
| **Users** | Admin user management |

- **Permission-gated** — every admin action is behind a named permission; roles can be expanded without code changes
- **Bilingual editing everywhere** — every content field has AR and EN tabs side by side
- **Media management** — image upload, cropping, replacement, and removal on every model
- **TipTap rich text** — available on every long-text field in the admin

---

## 14. Performance — Built for Real Traffic

- **Redis caching with tags** — category trees, brand lists, facet counts, listing pages, page sections, and settings are all cached and invalidated precisely on data changes
- **Zero N+1 queries** — strict lazy-load prevention enforced in development; every listing and detail page uses optimized eager loading
- **75× faster product listing** — sort indexes eliminate full-table scans even at 10,000+ products (measured: 15 ms → 0.2 ms)
- **WebP responsive images** — multiple sizes generated automatically; `srcset` served for every viewport
- **Queue workers** — image processing and emails are queued, keeping page responses fast

---

## 15. Security & Reliability

- **CSRF, XSS, SQL injection protection** — standard Laravel security stack
- **Honeypot + rate limits** on all public forms (consultation, newsletter, contact, login)
- **HTTP security headers** — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Guard separation** — customer accounts and admin accounts are completely separate; a customer can never reach `/admin`
- **Daily encrypted backups** to Google Drive — database + all uploaded media, 7-day retention, email alert on failure
- **Paymob HMAC webhook verification** — every payment callback is verified and idempotent
- **565 automated tests** — unit and feature tests covering every critical flow: checkout, payments, coupons, delivery rules, stock, WhatsApp logging, auth, guard separation

---

## 16. Operations & Deployment

- Runs on any **Ubuntu VPS** (Hostinger, DigitalOcean, AWS, etc.) with CloudPanel or a standard LAMP/LEMP stack
- **Cloudflare-ready** — works behind Cloudflare (DNS-only or proxied)
- **Let's Encrypt SSL** — automatic HTTPS
- **Scheduler** — daily backups, expired reservation cleanup, all cron-managed
- **Queue workers via Supervisor** — no dropped jobs on restart
- **Environment-based configuration** — `.env` only; no secrets in code or database
- **Bulk product import** — Excel import/export for catalog management (upload a spreadsheet, map columns once, import thousands of products)

---

## Summary

DOTS is a production-ready, bilingual, SEO-optimized e-commerce and catalog platform purpose-built for Egyptian electrical and lighting suppliers. It handles the full customer journey — discovery, browsing, cart, checkout, payment, tracking — plus a complete back-office and marketing toolset, with WhatsApp deeply integrated as the primary sales channel.

**Built on:** Laravel 13 · Livewire 4 · Alpine.js · MySQL 8 · Redis · Vite · Spatie packages · Pest testing
