# LMS Features

## User Roles

| Role | Description |
|---|---|
| **Student** | Default role after registration. Can buy courses, watch content, write reviews, request instructor status. |
| **Instructor** | Promoted from student via admin approval. Can create/manage courses, view sales, request payouts. |
| **Admin** | Separate auth guard (`admins` table, `/admin` prefix). Full control over the platform. |

---

## 1. Student Features

- Register / login / email verification / forgot password
- Browse course catalog (filter by category, language, level)
- View course detail page with syllabus, instructor info, and reviews
- Add courses to cart and checkout
- Access enrolled course video player
- Track lesson completion (mark lessons as done, resume from last watched)
- Download lesson attachments
- Download completion certificate (PDF) after finishing all lessons
- Write and delete course reviews
- View order history and invoices
- Request to become an instructor (upload supporting document)
- Manage profile (name, photo, password, social links)

---

## 2. Instructor Features

- Instructor dashboard (pending / approved / rejected course counts, recent sales)
- Create and edit courses (basic info, thumbnail, category, language, level, price, discount)
- Build course content: Chapters → Lessons (drag-to-reorder supported)
- Lesson types: video (upload / YouTube / Vimeo / external link) + file attachments (video, audio, doc, PDF, file)
- View orders for their own courses
- Wallet balance (commission earned per sale, configurable rate)
- Request payout withdrawal (one pending request at a time)
- Laravel File Manager for media uploads
- Manage profile (including payout gateway info)

---

## Admin Features

### 3. Course Management
- View all courses, approve / reject / set pending status
- Create and edit courses on behalf of instructors
- Manage course categories (with sub-categories), languages, and levels

### 4. User & Instructor Management
- Review instructor requests (download applicant document, approve / reject)
- Approval/rejection triggers email notification to the applicant
- Manually enroll a student into a course by email (with optional enrollment type, e.g. promo/scholarship)
- Bulk-enroll students via CSV upload (email, course, type columns; duplicates skipped with error report)
- Revoke a manual enrollment (with confirmation, removes student's course access)
- Review "course on demand" requests submitted by users (view details, download attachment, delete)

### 5. Orders & Finance
- View all orders with details
- Configure commission rate (% platform keeps per sale)
- Manage payout gateways (for instructor withdrawals)
- Approve / reject instructor withdrawal requests (deducts from instructor wallet on approval)
- Dashboard revenue analytics with date-range filtering (period revenue, order count, average order value, daily average revenue; daily breakdown for ranges up to 60 days, monthly breakdown for longer ranges)

### 6. Payment Gateways
- **PayPal** — sandbox / live mode, client ID, secret, currency, exchange rate
- **Stripe** — publishable key, secret key, currency, exchange rate
- **Razorpay** — key, secret, currency, exchange rate

All gateway credentials are stored in the database and managed via the admin panel.

### 7. Site Settings
- General settings (site name, tagline, etc.)
- Logo and favicon upload
- SMTP / mail settings (host, port, username, password, encryption, sender email)
- Mail queue toggle
- Commission rate

### 8. CMS / Homepage Builder
| Section | Description |
|---|---|
| Hero | Headline, subtext, CTA, background image |
| Features | Feature cards (icon, title, description) |
| About Us | About section with learner image and video image |
| Latest Courses | Section heading and subtext |
| Become Instructor | CTA section for instructor recruitment |
| Video Section | Embedded promotional video area |
| Brands | Logo carousel / brand strip |
| Featured Instructors | Highlight specific instructors with their courses |
| Testimonials | Student testimonial cards |
| Counters | Animated stat counters (e.g. students, courses) |
| Top Bar | Announcement bar at the top of the site |
| Footer | Footer text, two link columns, social media links |
| Custom Pages | Static pages with a slug (e.g. /page/terms) |

### 9. Blog
- Blog categories
- Blog posts (with slug, featured image)
- Public comment system on posts

### 10. Contact
- Contact info cards (shown on the contact page)
- Contact settings (map embed, address, phone, email)
- Receive contact form submissions via email

### 11. Reviews
- View and delete all course reviews

### Tools
- Database clear — runs `migrate:fresh --seed` and clears all caches (nuclear reset)
- Laravel File Manager for admin media management

---

## Payment Flow

1. Student adds courses to cart
2. Proceeds to checkout and selects a payment gateway
3. On success: order is created, order items recorded, enrollments created, instructor wallet credited
4. On failure/cancel: redirected to order-failed page

---

## Certificate Flow

1. Student completes all lessons in an enrolled course (marks every lesson as done)
2. Certificate download button becomes available
3. Admin builds the certificate template (background image, signature, text element positions) via the Certificate Builder
4. PDF is generated on demand using DomPDF with student name, course name, instructor name, and date injected

---

## Mail / Notifications

| Trigger | Recipient | Type |
|---|---|---|
| Contact form submitted | Admin (receiver email from settings) | ContactMail |
| Instructor request approved | Applicant | InstructorRequestApprovedMail |
| Instructor request rejected | Applicant | InstructorRequestRejectMail |

All emails respect the mail queue setting — if enabled, emails are pushed to the database queue and require `php artisan queue:work` to be running.

---

## File Management

- All uploads handled via `App\Traits\FileUpload` (stored under `storage/app/public/uploads/`)
- Laravel File Manager available to both admin and instructors at their respective `/laravel-filemanager` routes
- PDF generation for certificates via `barryvdh/laravel-dompdf`
- Image processing via `intervention/image-laravel`
