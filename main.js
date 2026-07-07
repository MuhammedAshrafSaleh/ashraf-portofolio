/**
 * main.js — Muhammed Ashraf Portfolio
 * Vanilla ES6+ · No frameworks · Shared across all 3 pages
 */
(function () {
  "use strict";

  /* ── Page detection ──────────────────────────────────────── */
  const page = document.body.dataset.page; // "home" | "project-web" | "project-mobile"

  /* ── State ───────────────────────────────────────────────── */
  const state = {
    lang:  localStorage.getItem("ma_lang")  || "en",
    theme: localStorage.getItem("ma_theme") || "dark",
  };

  /* ── i18n strings ────────────────────────────────────────── */
  const I18N = {
    "nav.work":    { en: "Work",    ar: "الأعمال" },
    "nav.about":   { en: "About",   ar: "عنّى" },
    "nav.process": { en: "Process", ar: "المنهج" },
    "nav.stack":   { en: "Stack",   ar: "الأدوات" },
    "nav.contact": { en: "Contact", ar: "تواصل" },
    "hero.chip":   { en: "Available for new work", ar: "متاح لمشاريع جديدة" },
    "hero.role":   { en: "Full-Stack Developer",   ar: "مطوّر Full-Stack" },
    "hero.pitch":  { en: "I help business owners turn operational chaos into clean web and mobile <em>systems</em>. Real problems, real software, <em>shipped</em>.", ar: "بساعد أصحاب المشاريع <em>يحوّلوا</em> الفوضى التشغيلية لأنظمة ويب وموبايل<em> نظيفة</em>. مشاكل حقيقية، شغل حقيقى، يتسلّم." },
    "hero.cta.work":    { en: "See the work",    ar: "شوف الشغل" },
    "hero.cta.contact": { en: "Start a project", ar: "ابدأ مشروع" },
    "hero.based.l":     { en: "Based",     ar: "الموقع" },
    "hero.reach.l":     { en: "Reach",     ar: "تواصل" },
    "hero.platforms.l": { en: "Platforms", ar: "المنصات" },
    "hero.based":       { en: "Cairo, Egypt · Working worldwide", ar: "القاهرة، مصر · بشتغل مع العالم" },
    "about.label": { en: "About",  ar: "عنّى" },
    "about.h2":    { en: "I build software for people who <em>don't want to think</em> about software.", ar: "بصمم برامج لناس <em>مش عايزة</em> تفكر فى البرامج." },
    "about.p1":    { en: "I'm Muhammed Ashraf, a full-stack developer from Egypt. I build the systems that quietly run businesses — web platforms, mobile apps, internal tools — the kind of software that should disappear into the work.", ar: "أنا محمد أشرف، مطوّر full-stack من مصر. بصمم وبنّى الأنظمة اللى بتشغّل المشاريع فى الخلفية — منصات ويب، تطبيقات موبايل، أدوات داخلية — النوع من البرامج اللى المفروض يختفى فى الشغل." },
    "about.p2":    { en: "Most of my work starts with a paper notebook, a WhatsApp group, or a Google Sheet that grew out of control. My job is to listen long enough to see the actual problem — then build the smallest, sharpest system that solves it.", ar: "أغلب شغلى بيبدأ من كشكول ورق، أو جروب واتساب، أو شيت Google كبر أكتر من اللازم. شغلى إنى أسمع كفاية علشان أشوف المشكلة الحقيقية — وبعدين أبنى أصغر وأقوى نظام يحلها." },
    "about.p3":    { en: "I compete in problem-solving contests for fun — that habit shapes how I approach work. Every project gets the same lens: what's the constraint, what's the cheapest path through it, what would break under load?", ar: "بنافس فى مسابقات حل المشكلات للمتعة — العادة دى بتشكّل طريقة شغلى. كل مشروع بيتعامل معاه بنفس العدسة: إيه القيد، إيه أرخص طريق ينفع، إيه اللى يكسر تحت الضغط؟" },
    "about.stat1": { en: "Systems shipped",        ar: "أنظمة مسلّمة" },
    "about.stat2": { en: "Industries",             ar: "صناعات" },
    "about.stat3": { en: "Languages (AR / EN)",    ar: "لغات (عربى/إنجليزى)" },
    "about.stat4": { en: "Problems worth solving", ar: "مشاكل تستحق الحل" },
    "stack.label":    { en: "Stack",   ar: "الأدوات" },
    "stack.h2":       { en: "Tools I reach for.",  ar: "الأدوات اللى بستخدمها." },
    "stack.subtitle": { en: "I'm tool-agnostic — but these are what I'm fastest and sharpest with.", ar: "مش متعصّب لأداة معينة — بس دول اللى بشتغل بيهم بسرعة وحدّة." },
    "stack.frontend": { en: "Frontend", ar: "واجهات أمامية " },
    "stack.backend":  { en: "Backend",      ar: "خدمات خلفية" },
    "stack.data":     { en: "Mobile", ar: "الموبيل" },
    "stack.int":      { en: "Integrations", ar: "تكاملات" },
    "process.label":  { en: "Process", ar: "المنهج" },
    "process.h2":     { en: "How a project moves from problem to solution.", ar: "ازاى المشروع بيتحرّك من مشكلة لحل." },
    "process.01.title": { en: "Discovery", ar: "الاكتشاف" },
    "process.01.body":  { en: "I sit with you and watch how the work actually happens today — paper, WhatsApp, Excel, whatever. The real problem is rarely the one stated in the first meeting.", ar: "بقعد معاك وأشوف الشغل بيحصل ازاى دلوقتى — ورق، واتساب، اكسل، أى حاجة. المشكلة الحقيقية نادراً ما تكون اللى اتقالت فى أول اجتماع." },
    "process.02.title": { en: "Shape",    ar: "التشكيل" },
    "process.02.body":  { en: "I write the problem back to you in plain language, then sketch the smallest system that solves it. We cut scope here, not later.", ar: "بكتبلك المشكلة تانى بكلام واضح، وبعدها برسم أصغر نظام يقدر يحلها. بنقص النطاق هنا، مش بعدين." },
    "process.03.title": { en: "Build",    ar: "التنفيذ" },
    "process.03.body":  { en: "I ship in tight loops. You see something working every week — not a 3-month surprise. Feedback in, changes in, no drama.", ar: "بشتغل فى دورات قصيرة. بتشوف حاجة شغّالة كل أسبوع — مش مفاجأة بعد ٣ شهور. ملاحظاتك تدخل، التعديلات تدخل، من غير دراما." },
    "process.04.title": { en: "Deliver",  ar: "التسليم" },
    "process.04.body":  { en: "Deploy, document, train your team, and stay on call. The codebase is yours — clean, readable, and explained.", ar: "Deploy وتوثيق وتدريب للفريق وأنا متاح. الكود ملكك — نظيف ومقروء ومشروح." },
    "work.label": { en: "Selected Work",              ar: "مختارات من الشغل" },
    "work.h2":    { en: "Five problems, five systems.", ar: "خمس مشاكل، خمس أنظمة." },
    "work.view":  { en: "View case study",             ar: "افتح الحالة" },
    "chr.category": { en: "Real Estate Platform", ar: "منصة عقارية" },
    "chr.name":     { en: "CHR Developments",     ar: "CHR للتطوير العقاري" },
    "chr.tagline":  { en: "A digital showroom for a real estate developer — properties, projects, and inquiries in one elegant flow.", ar: "صالة عرض رقمية لمطور عقاري — وحدات ومشاريع واستفسارات في تدفق أنيق واحد." },
    "dp.category":  { en: "FinOps · Mobile",  ar: "تطبيق مالى · موبايل" },
    "dp.name":      { en: "debitPro",          ar: "debitPro" },
    "dp.tagline":   { en: "An installment-office app: clients, plans, monthly collections, and reminders — without the notebook.", ar: "تطبيق لمكتب أقساط: عملاء، خطط أقساط، تحصيلات شهرية، وتذكيرات — من غير الكشكول." },
    "testi.label":   { en: "Words",             ar: "آراء" },
    "testi.h2":      { en: "What clients say.", ar: "العملاء بيقولوا إيه." },
    "testi.q1":      { en: "Muhammed didn't just deliver an app — he understood our business better than some of our own staff. The cash ledger he built saved us from a serious problem we didn't even know we had.", ar: "محمد ما سلّمش تطبيق وبس — فهم شغلنا أحسن من بعض موظفينا. دفتر العهد اللى عمله أنقذنا من مشكلة كبيرة ما كنّاش حتى عارفينها." },
    "testi.q1.role": { en: "Owner, Finishing Works Co.", ar: "صاحب شركة تشطيبات" },
    "testi.q2":      { en: "He pushed back when we asked for the wrong thing, and pushed harder when we asked for the right thing. That's rare.", ar: "رفض لما طلبنا الغلط، واندفع أكتر لما طلبنا الصح. ده شىء نادر." },
    "testi.q2.role": { en: "Product Lead, EdTech",   ar: "مديرة منتج" },
    "testi.q3":      { en: "Our installment office runs on his app now. Three months in, zero late payments missed.", ar: "مكتب الأقساط بتاعنا شغّال على تطبيقه دلوقتى. تلات شهور وصفر قسط متأخر فايت." },
    "testi.q3.role": { en: "Installment Office", ar: "مكتب أقساط" },
    "contact.label":  { en: "Contact",  ar: "تواصل" },
    "contact.h1":     { en: "Got a <em>problem</em><br>worth solving?", ar: "عندك <em>مشكلة</em><br>تستاهل تتحل؟" },
    "contact.body":   { en: "Tell me about it. Whether it's a half-built idea, a Google Sheet that grew teeth, or a real product — I'll reply within 24 hours.", ar: "احكيلى عنها. سواء فكرة نص خلصانة، أو شيت Google ضرب عقله، أو منتج فعلى — هرد فى أقل من ٢٤ ساعة." },
    "contact.email.btn":    { en: "Email me",     ar: "ابعتلى ايميل" },
    "contact.linkedin.btn": { en: "LinkedIn",     ar: "لينكدإن" },
    "contact.whatsapp.btn": { en: "WhatsApp",     ar: "واتساب" },
    "contact.copy.label":   { en: "Or copy email", ar: "أو انسخ الإيميل" },
    "contact.copied":       { en: "Copied ✓",     ar: "تم النسخ ✓" },
    "footer.copy": { en: "Designed & built by Muhammed Ashraf · 2026", ar: "تصميم وتطوير محمد أشرف · ٢٠٢٦" },
    /* ── Project pages shared ─── */
    "pp.back":       { en: "Back to all work",     ar: "ارجع لكل الأعمال" },
    "pp.live":       { en: "Live demo",            ar: "تجربة حية" },
    "pp.source":     { en: "Source",               ar: "الكود" },
    "pp.problem":    { en: "The problem",          ar: "المشكلة" },
    "pp.solution":   { en: "The solution",         ar: "الحل" },
    "pp.stack":      { en: "Tech stack",           ar: "الأدوات المستخدمة" },
    "pp.features":   { en: "Key features",         ar: "أبرز المزايا" },
    "pp.challenges": { en: "Challenges I solved",  ar: "تحديات حليتها" },
    "pp.next":       { en: "Next project",         ar: "المشروع التالى" },
    "pp.gallery":    { en: "Gallery",              ar: "معرض" },
    "pp.gallery.sub":{ en: "Every screen in the app, organized by build phase.", ar: "كل شاشة من شاشات التطبيق، مقسّمة على مراحل التطوير." },
    "pp.walkthrough":    { en: "Project walkthrough", ar: "شرح المشروع" },
    "pp.walkthrough.sub":{ en: "A short video where I walk through the problem, the system, and the key decisions.", ar: "فيديو قصير بشرح فيه المشكلة، النظام، والقرارات الأساسية." },
    /* ── CHR project ─── */
    "chr.pp.name":    { en: "CHR Developments",       ar: "CHR للتطوير العقاري" },
    "chr.pp.cat":     { en: "Real Estate Platform",   ar: "منصة عقارية" },
    "chr.pp.tagline": { en: "A digital showroom for a real estate developer — properties, projects, and inquiries in one elegant flow.", ar: "صالة عرض رقمية لمطور عقاري — وحدات ومشاريع واستفسارات في تدفق أنيق واحد." },
    "chr.problem":    { en: "CHR's properties were spread across PDFs, WhatsApp messages, and brochures. Prospective buyers couldn't browse projects without going through a sales rep, and inquiries got lost in inboxes.", ar: "كانت وحدات CHR مبعثرة بين ملفات PDF ورسائل واتساب وبروشورات. لم يكن العملاء يستطيعون تصفح المشاريع بدون مندوب مبيعات، والاستفسارات كانت تضيع في البريد." },
    "chr.solution":   { en: "Built a full-stack Laravel platform: a public marketing site (projects, construction updates, blog, contact) backed by a resource-based admin dashboard that manages every piece of content — with full Arabic/English support.", ar: "بنيت منصة Laravel متكاملة: موقع تسويقى عام (مشاريع، تحديثات إنشاء، مدونة، تواصل) مدعوم بلوحة تحكم إدارية بتدير كل جزء من المحتوى — بدعم كامل للعربية والإنجليزية." },
    "chr.f1": { en: "Current/previous projects with plans, images & services",     ar: "مشاريع حالية وسابقة بمخططات وصور وخدمات" },
    "chr.f2": { en: "Construction updates with per-project progress phases",        ar: "تحديثات إنشاء بمراحل تقدّم لكل مشروع" },
    "chr.f3": { en: "Contact form with interactive Leaflet map & rate-limited requests",       ar: "نموذج تواصل بخريطة Leaflet تفاعلية وطلبات محدودة المعدل" },
    "chr.f4": { en: "Bilingual content via spatie/laravel-translatable (AR/EN)",            ar: "محتوى ثنائي اللغة عبر spatie/laravel-translatable (عربي/إنجليزي)" },
    "chr.f5": { en: "Full admin dashboard: home, about, projects, blog & site settings",                     ar: "لوحة تحكم كاملة: الرئيسية، من نحن، المشاريع، المدونة، وإعدادات الموقع" },
    "chr.c1.title": { en: "Bilingual content + RTL layouts", ar: "محتوى ثنائي اللغة + تخطيطات RTL" },
    "chr.c1.body":  { en: "Every page had to mirror correctly in Arabic without maintaining two versions. Solved with spatie/laravel-translatable on every content model and a locale-aware routing middleware.", ar: "كل صفحة لازم تنعكس صح بالعربي من غير الحفاظ على نسختين. اتحلت بمكتبة spatie/laravel-translatable على كل موديل محتوى مع middleware واعى باللغة." },
    "chr.c2.title": { en: "One resource CRUD pattern, dozens of content types", ar: "نمط CRUD واحد، عشرات أنواع المحتوى" },
    "chr.c2.body":  { en: "Nearly 20 content areas (heroes, team, testimonials, projects, blog, construction updates) needed admin CRUD without duplicating boilerplate. Standardized on Laravel resource routes and controllers per area.", ar: "قرابة 20 قسم محتوى (أقسام رئيسية، فريق، آراء عملاء، مشاريع، مدونة، تحديثات إنشاء) محتاجة CRUD إدارى من غير تكرار كود. اتوحّد الشكل على resource routes وcontrollers لكل قسم." },
    "chr.next.name": { en: "debitPro",        ar: "debitPro" },
    "chr.next.cat":  { en: "FinOps · Mobile", ar: "تطبيق مالى · موبايل" },
    /* ── debitPro project ─── */
    "dp.pp.name":    { en: "debitPro",                ar: "debitPro" },
    "dp.pp.cat":     { en: "FinOps · Mobile",         ar: "تطبيق مالى · موبايل" },
    "dp.pp.status":  { en: "In progress",             ar: "تحت التطوير" },
    "dp.pp.tagline": { en: "An installment-office app: clients, installment plans, monthly collections, and reminders — without the notebook.", ar: "تطبيق لمكتب أقساط: عملاء، خطط أقساط، تحصيلات شهرية، وتذكيرات — من غير الكشكول." },
    "dp.problem":    { en: "An installment office was running on paper notebooks and WhatsApp reminders. Missed payments, lost records, and zero visibility into who owed what.", ar: "مكتب أقساط كان شغّال بكشاكيل ورق وتذكيرات واتساب. أقساط فايتة، سجلات ضايعة، وصفر رؤية لمين عليه إيه." },
    "dp.solution":   { en: "A clean mobile app: clients, plans, automated monthly schedules, payment logging, overdue alerts, and a simple owner dashboard with the office's full financial picture.", ar: "تطبيق موبايل نظيف: عملاء، خطط، جداول شهرية أوتوماتيكية، تسجيل دفعات، تنبيهات تأخير، ولوحة تحكم بسيطة للمالك بكل الصورة المالية للمكتب." },
    "dp.f1": { en: "Client profiles with live payment-quality scoring",       ar: "ملفات عملاء بتقييم جودة سداد لحظى" },
    "dp.f2": { en: "Automated monthly schedules + one-time grace-period loans",     ar: "جداول شهرية أوتوماتيكية + مُهَل دفعة واحدة" },
    "dp.f3": { en: "Immutable payment ledger — reversals, never deletes",         ar: "سجل دفعات ثابت — عكس الدفعة مش حذفها" },
    "dp.f4": { en: "PDF exports: accounts, current-dues, overdue & payments",              ar: "تصدير PDF: الحسابات، المستحقات الحالية، المتأخرات، والدفعات" },
    "dp.f5": { en: "Owner dashboard: collections, active dues, recent transactions",                 ar: "لوحة تحكم للمالك: التحصيلات، المستحقات النشطة، آخر العمليات" },
    "dp.f6": { en: "Offline-aware, atomic Firestore writes — no partial states", ar: "كتابة ذرية على Firestore بوعى بحالة الاتصال — بدون حالات ناقصة" },
    "dp.c1.title": { en: "Reliable monthly schedules", ar: "جداول شهرية موثوقة" },
    "dp.c1.body":  { en: "Edge cases everywhere — early payment, partial payment, plan renegotiation. Built a deterministic schedule engine that can replay any client's history.", ar: "حالات حدية في كل حتة — دفعة مبكرة، دفعة جزئية، تعديل خطة. بنيت محرك جداول حتمي يقدر يعيد تشغيل تاريخ أي عميل." },
    "dp.c2.title": { en: "An audit trail that can't lie", ar: "سجل تدقيق مايتقلبش" },
    "dp.c2.body":  { en: "Money records can't be edited after the fact. Payments are never deleted, only reversed, so every transaction stays a permanent, replayable record.", ar: "السجلات المالية مينفعش تتعدل بعد ما تتسجل. الدفعات متتمسحش، بس بتتعكس، عشان كل عملية تفضل سجل دائم يتراجع." },
    "dp.next.name": { en: "Cashes",                 ar: "Cashes" },
    "dp.next.cat":  { en: "Construction SaaS · Mobile", ar: "SaaS للمقاولات · موبايل" },
    "dp.ph01.title": { en: "Authentication",    ar: "الحساب والدخول" },
    "dp.ph01.body":  { en: "Sign-up, login, password recovery, and confirmation flow — onboarded in two screens.", ar: "إنشاء حساب، تسجيل دخول، استعادة كلمة المرور، وتأكيد الإرسال." },
    "dp.ph02.title": { en: "Account & Settings", ar: "الحساب والإعدادات" },
    "dp.ph02.body":  { en: "Preferences, language, dark mode, profile editing and password change in one place.", ar: "التفضيلات واللغة والوضع الليلى وتعديل الحساب وكلمة المرور فى مكان واحد." },
    "dp.ph03.title": { en: "Clients",  ar: "العملاء" },
    "dp.ph03.body":  { en: "Searchable client directory, fast new-client entry, and a single profile that summarizes every plan and balance.", ar: "قائمة عملاء قابلة للبحث، إضافة عميل سريعة، وملف موحّد يلخّص كل الخطط والأرصدة." },
    "dp.ph04.title": { en: "Installments", ar: "الأقساط" },
    "dp.ph04.body":  { en: "Add records, schedule monthly installments, collect payments, and track every plan in real time.", ar: "إضافة سجلات، جدولة أقساط شهرية، تحصيل دفعات، وتتبع كل خطة لحظياً." },
    "dp.ph05.title": { en: "Loans (مُهَل)", ar: "المُهَل والسلف" },
    "dp.ph05.body":  { en: "One-time loans / grace payments managed alongside recurring installments.", ar: "السلف والمُهَل غير الشهرية بتُدار جنب الأقساط من نفس المصدر المالى." },
    "dp.ph06.title": { en: "Filters & Views", ar: "الفلاتر والعروض" },
    "dp.ph06.body":  { en: "Powerful filters across status, client class, date range, and category.", ar: "فلاتر قوية على الحالة وتصنيف العميل والتاريخ والنوع." },
    "dp.p1.1": { en: "Create account",       ar: "إنشاء حساب جديد" },
    "dp.p1.2": { en: "Login",                ar: "تسجيل الدخول" },
    "dp.p1.3": { en: "Forgot password",      ar: "نسيت كلمة المرور" },
    "dp.p1.4": { en: "Recovery link sent",   ar: "تم الإرسال بنجاح" },
    "dp.p2.1": { en: "Settings",             ar: "الإعدادات" },
    "dp.p2.2": { en: "Edit profile",         ar: "تعديل الحساب" },
    "dp.p3.1": { en: "Clients list",         ar: "قائمة العملاء" },
    "dp.p3.2": { en: "Add client",           ar: "إضافة عميل" },
    "dp.p3.3": { en: "Client profile",       ar: "تفاصيل العميل" },
    "dp.p4.1": { en: "Add record",           ar: "إضافة سجل" },
    "dp.p4.2": { en: "Add monthly installment", ar: "إضافة قسط شهرى" },
    "dp.p4.3": { en: "Collect payment",      ar: "دفع القسط" },
    "dp.p4.4": { en: "Track installments",   ar: "تتبع الأقساط" },
    "dp.p5.1": { en: "Add grace loan",       ar: "إضافة مُهلة" },
    "dp.p5.2": { en: "Client's grace loans", ar: "مُهَل العميل" },
    "dp.p6.1": { en: "All accounts",         ar: "كل الحسابات" },
    "dp.p6.2": { en: "Grace loans view",     ar: "عرض المُهَل" },
    /* ── Cashes project ─── */
    "cashes.category": { en: "Construction SaaS · Mobile", ar: "SaaS للمقاولات · موبايل" },
    "cashes.name":     { en: "Cashes",                     ar: "Cashes" },
    "cashes.tagline":  { en: "A multi-tenant cash & invoicing app for finishing companies — site engineers log disbursements and receipts, owners keep oversight.", ar: "تطبيق متعدد الشركات لإدارة المصروفات والفواتير لشركات التشطيبات — مهندسو الموقع يسجّلون الصرف والإيصالات، والملاك يتابعون." },
    "cashes.pp.name":    { en: "Cashes",                     ar: "Cashes" },
    "cashes.pp.cat":     { en: "Construction SaaS · Mobile", ar: "SaaS للمقاولات · موبايل" },
    "cashes.pp.tagline": { en: "A multi-tenant SaaS app for construction & finishing companies: cash disbursements, vendor invoicing, and receipt documentation for site engineers — with company-level admin oversight.", ar: "تطبيق SaaS متعدد الشركات لشركات المقاولات والتشطيبات: صرف نقدية، فواتير موردين، وتوثيق إيصالات لمهندسي الموقع — مع إشراف إداري على مستوى الشركة." },
    "cashes.problem":  { en: "Finishing companies ran site cash on paper and WhatsApp: each engineer tracked disbursements and receipts his own way, owners had no live view of spend per project, and receipt photos got lost. Nothing tied a company's engineers, projects, and money together.", ar: "شركات التشطيبات كانت بتدير فلوس المواقع بالورق والواتساب: كل مهندس بيسجّل الصرف والإيصالات بطريقته، والملاك مالهمش رؤية لحظية للمصروف لكل مشروع، وصور الإيصالات بتضيع. مفيش حاجة بتربط مهندسي الشركة ومشاريعها وفلوسها ببعض." },
    "cashes.solution": { en: "A single multi-tenant app with three roles — Owner, company Admin, and User — driven by JWT-based routing and Postgres RLS. Engineers log cash entries with compressed receipt photos and export a branded PDF ledger per project; owners and admins get real-time notifications and seat-limited user management. Dark, Arabic-first, gold-accented.", ar: "تطبيق واحد متعدد الشركات بثلاث أدوار — مالك، أدمن شركة، ومستخدم — مبني على توجيه بالـ JWT وحماية صفوف Postgres (RLS). المهندسون يسجّلون قيود نقدية بصور إيصالات مضغوطة ويصدّرون كشف حساب PDF بهوية المشروع؛ والملاك والأدمن يستقبلون إشعارات لحظية وإدارة مستخدمين محدودة بالمقاعد. داكن، عربي أولاً، بلمسة ذهبية." },
    "cashes.f1": { en: "Multi-tenant role model: Owner / Admin / User with RLS isolation", ar: "نموذج أدوار متعدد الشركات: مالك / أدمن / مستخدم مع عزل RLS" },
    "cashes.f2": { en: "Per-project cash ledger with vendor, amount, and date entries", ar: "كشف نقدية لكل مشروع بقيود المورد والمبلغ والتاريخ" },
    "cashes.f3": { en: "Receipt capture (camera/gallery), compressed to ≤500KB", ar: "التقاط إيصالات (كاميرا/معرض) مضغوطة حتى ٥٠٠ كيلوبايت" },
    "cashes.f4": { en: "Branded PDF export with logo, entries, thumbnails & totals", ar: "تصدير PDF بالهوية: شعار، قيود، صور مصغّرة، وإجماليات" },
    "cashes.f5": { en: "Real-time notifications feed for admins (assignments, entries, alerts)", ar: "خلاصة إشعارات لحظية للأدمن (تكليفات، قيود، تنبيهات)" },
    "cashes.f6": { en: "Seat-limited user creation via Supabase Edge Functions", ar: "إنشاء مستخدمين محدود بالمقاعد عبر Supabase Edge Functions" },
    "cashes.c1.title": { en: "Receipt image lifecycle", ar: "دورة حياة صور الإيصالات" },
    "cashes.c1.body":  { en: "Storing every receipt forever was costly and risky. Built a 30-day expiry pipeline with pg_cron that flags records and deletes the storage files, shows a 5-day warning banner, and always keeps the financial record even after the photo is gone.", ar: "تخزين كل إيصال للأبد كان مكلف وخطر. بنيت نظام انتهاء بعد ٣٠ يوم بـ pg_cron بيعلّم السجلات ويمسح ملفات التخزين، ويعرض تنبيه قبل ٥ أيام، ويحتفظ دايماً بالسجل المالي حتى بعد اختفاء الصورة." },
    "cashes.c2.title": { en: "One app, three panels, zero leaks", ar: "تطبيق واحد، ثلاث لوحات، صفر تسريب" },
    "cashes.c2.body":  { en: "Owner, Admin, and User share one binary but must never see each other's data. Solved with JWT-driven routing off the splash screen (no DB query) plus strict row-level-security policies so every query is scoped by company and user automatically.", ar: "المالك والأدمن والمستخدم بيشاركوا نفس التطبيق لكن ممنوع أي واحد يشوف بيانات التاني. اتحلّت بتوجيه معتمد على الـ JWT من شاشة البداية (من غير استعلام قاعدة بيانات) مع سياسات حماية صفوف صارمة بحيث كل استعلام بيتقيّد تلقائياً بالشركة والمستخدم." },
    "cashes.next.name": { en: "EUX Client App",       ar: "تطبيق EUX" },
    "cashes.next.cat":  { en: "Logistics · Mobile",   ar: "لوجستيات · موبايل" },
    "cashes.ph01.title": { en: "Owner (CEO) Panel", ar: "لوحة المالك" },
    "cashes.ph01.body":  { en: "Companies overview, brand-logo setup, and user account creation across the whole platform.", ar: "نظرة عامة على الشركات، إعداد الشعار، وإنشاء حسابات المستخدمين على مستوى المنصة كلها." },
    "cashes.ph02.title": { en: "Company Admin Panel", ar: "لوحة أدمن الشركة" },
    "cashes.ph02.body":  { en: "Company-scoped user management and a real-time notifications feed with typed, color-coded alerts.", ar: "إدارة مستخدمين محصورة بالشركة وخلاصة إشعارات لحظية بتنبيهات مصنّفة وملوّنة." },
    "cashes.ph03.title": { en: "Authentication", ar: "الحساب والدخول" },
    "cashes.ph03.body":  { en: "JWT-role splash routing, login, forgot/reset password — no self-registration.", ar: "توجيه بالدور من شاشة البداية، تسجيل دخول، ونسيان/إعادة تعيين كلمة المرور — بدون تسجيل ذاتي." },
    "cashes.ph04.title": { en: "Settings", ar: "الإعدادات" },
    "cashes.ph04.body":  { en: "Profile & avatar editing, AR/EN language switch, dark/light appearance, and password change.", ar: "تعديل الحساب والصورة، تبديل اللغة عربي/إنجليزي، المظهر الداكن/الفاتح، وتغيير كلمة المرور." },
    "cashes.ph05.title": { en: "Projects Management", ar: "إدارة المشاريع" },
    "cashes.ph05.body":  { en: "Site engineers create and manage their own projects with live portfolio totals.", ar: "مهندسو الموقع ينشئون ويديرون مشاريعهم مع إجماليات لحظية للمحفظة." },
    "cashes.ph06.title": { en: "Invoices & Cash Entries", ar: "الفواتير والقيود النقدية" },
    "cashes.ph06.body":  { en: "The financial ledger: add/edit cash entries, attach receipts, browse the image gallery, and export a PDF.", ar: "الدفتر المالي: إضافة/تعديل القيود النقدية، إرفاق الإيصالات، تصفّح معرض الصور، وتصدير PDF." },
    "cashes.p1.1": { en: "Companies list",     ar: "قائمة الشركات" },
    "cashes.p1.2": { en: "Add company",        ar: "إضافة شركة" },
    "cashes.p1.3": { en: "Edit company",       ar: "تعديل شركة" },
    "cashes.p1.4": { en: "Create user",        ar: "إنشاء مستخدم" },
    "cashes.p1.5": { en: "Edit user",          ar: "تعديل مستخدم" },
    "cashes.p1.6": { en: "Company users",      ar: "مستخدمو الشركة" },
    "cashes.p2.1": { en: "Admin — all users",  ar: "الأدمن — كل المستخدمين" },
    "cashes.p2.2": { en: "Notifications",      ar: "الإشعارات" },
    "cashes.p3.1": { en: "Splash",             ar: "شاشة البداية" },
    "cashes.p3.2": { en: "Login",              ar: "تسجيل الدخول" },
    "cashes.p3.3": { en: "Forgot password",    ar: "نسيت كلمة المرور" },
    "cashes.p3.4": { en: "Email sent",         ar: "تم إرسال الإيميل" },
    "cashes.p4.1": { en: "Settings",           ar: "الإعدادات" },
    "cashes.p4.2": { en: "Edit profile",       ar: "تعديل الحساب" },
    "cashes.p5.1": { en: "Projects overview",  ar: "نظرة المشاريع" },
    "cashes.p5.2": { en: "Create project",     ar: "إنشاء مشروع" },
    "cashes.p5.3": { en: "Project settings",   ar: "إعدادات المشروع" },
    "cashes.p6.1": { en: "Project details",    ar: "تفاصيل المشروع" },
    "cashes.p6.2": { en: "Invoices ledger",    ar: "دفتر الفواتير" },
    "cashes.p6.3": { en: "Add cash entry",     ar: "إضافة قيد نقدي" },
    "cashes.p6.4": { en: "Edit cash entry",    ar: "تعديل قيد نقدي" },
    "cashes.p6.5": { en: "Receipts gallery",   ar: "معرض الإيصالات" },
    /* ── EUX project ─── */
    "eux.category": { en: "Logistics · Mobile", ar: "لوجستيات · موبايل" },
    "eux.name":     { en: "EUX Client App",     ar: "تطبيق EUX" },
    "eux.tagline":  { en: "An Arabic-first shipping app: clients create courier orders and track shipments live through J&T Express.", ar: "تطبيق شحن عربي أولاً: العملاء ينشئون طلبات شحن ويتتبعون الشحنات لحظياً عبر J&T Express." },
    "eux.pp.name":    { en: "EUX Client App",     ar: "تطبيق EUX" },
    "eux.pp.cat":     { en: "Logistics · Mobile", ar: "لوجستيات · موبايل" },
    "eux.pp.tagline": { en: "A Flutter app for EUX — a courier reseller — letting clients manage shipping orders and track shipments live. Arabic-first (RTL), backed by Firebase, Google Sheets, and the J&T Express logistics API.", ar: "تطبيق Flutter لـ EUX — وسيط شحن — يتيح للعملاء إدارة طلبات الشحن وتتبع الشحنات لحظياً. عربي أولاً (RTL)، مدعوم بـ Firebase وGoogle Sheets وواجهة J&T Express اللوجستية." },
    "eux.problem":  { en: "EUX resells J&T Express shipping to its clients, but orders lived in scattered chats and spreadsheets. Clients couldn't enter a proper shipment manifest, see only their own orders, or track a parcel without messaging support — and every status update came back in untranslated logistics jargon.", ar: "EUX بتبيع شحن J&T Express لعملائها، لكن الطلبات كانت متبعثرة في المحادثات والشيتات. العملاء ماكانوش يقدروا يدخّلوا بيان شحنة صح، ولا يشوفوا طلباتهم بس، ولا يتتبعوا طرد من غير ما يكلّموا الدعم — وكل تحديث حالة بيرجع بمصطلحات لوجستية غير مترجمة." },
    "eux.solution": { en: "A clean Arabic mobile app where each client signs in, fills a full J&T shipment manifest, and sees only their own orders (filtered by phone). A Google Apps Script turns a Google Sheet into the order database, while a signed integration with the J&T Express API returns live scan history — translated into Arabic for display.", ar: "تطبيق موبايل عربي نظيف كل عميل يسجّل دخوله، يملأ بيان شحنة J&T كامل، ويشوف طلباته هو بس (مفلترة بالهاتف). Google Apps Script بيحوّل شيت Google لقاعدة بيانات الطلبات، وتكامل موقّع مع واجهة J&T Express بيرجّع سجل المسح لحظياً — مترجم للعربي للعرض." },
    "eux.f1": { en: "Email/password auth (Firebase) with Firestore user profiles", ar: "تسجيل دخول بالبريد/كلمة المرور (Firebase) مع ملفات مستخدمين على Firestore" },
    "eux.f2": { en: "Full J&T shipment manifest: receiver, address, COD/FOD, weight", ar: "بيان شحنة J&T كامل: المستلم، العنوان، COD/FOD، الوزن" },
    "eux.f3": { en: "Create, edit, delete & list orders — filtered per user", ar: "إنشاء وتعديل وحذف وعرض الطلبات — مفلترة لكل مستخدم" },
    "eux.f4": { en: "Live shipment tracking via the J&T Express API", ar: "تتبع الشحنات لحظياً عبر واجهة J&T Express" },
    "eux.f5": { en: "Arabic translation of scan types & problem reasons", ar: "ترجمة عربية لأنواع المسح وأسباب المشاكل" },
    "eux.f6": { en: "Google Sheets order backend via Apps Script Web App", ar: "قاعدة طلبات على Google Sheets عبر Apps Script Web App" },
    "eux.c1.title": { en: "Signed logistics API integration", ar: "تكامل موقّع مع واجهة لوجستية" },
    "eux.c1.body":  { en: "J&T's tracking API requires HMAC-style request signing — base64(md5(bizContent + privateKey)) — and returns raw scan codes. Built the signing flow and a translation layer that maps scan types and problem reasons into clear Arabic for end users.", ar: "واجهة تتبع J&T بتتطلب توقيع طلبات بأسلوب HMAC — base64(md5(bizContent + privateKey)) — وبترجّع أكواد مسح خام. بنيت آلية التوقيع وطبقة ترجمة بتحوّل أنواع المسح وأسباب المشاكل لعربي واضح للمستخدم." },
    "eux.c2.title": { en: "A spreadsheet as a backend", ar: "شيت كقاعدة بيانات" },
    "eux.c2.body":  { en: "With no dedicated server, a Google Sheet became the order database. Wrapped it in a Google Apps Script Web App for HTTP CRUD and filtered orders per user by matching the manifest's Remarks field to the signed-in client's phone number.", ar: "من غير سيرفر مخصص، شيت Google بقى قاعدة بيانات الطلبات. غلّفته في Google Apps Script Web App للـ CRUD عبر HTTP وفلترت الطلبات لكل مستخدم بمطابقة حقل الملاحظات برقم هاتف العميل المسجّل." },
    "eux.next.name": { en: "FegmaPlatform LMS",       ar: "منصة EduPlatform التعليمية" },
    "eux.next.cat":  { en: "E-Learning Platform · Web", ar: "منصة تعليم · ويب" },
    "eux.ph01.title": { en: "Authentication", ar: "الحساب والدخول" },
    "eux.ph01.body":  { en: "Email/password signup, login, password reset and sign-out via Firebase Auth.", ar: "تسجيل حساب بالبريد/كلمة المرور، دخول، إعادة تعيين كلمة المرور، وخروج عبر Firebase Auth." },
    "eux.ph02.title": { en: "Orders Management", ar: "إدارة الطلبات" },
    "eux.ph02.body":  { en: "Create, edit, and list shipping orders with a full J&T manifest — filtered to the signed-in client.", ar: "إنشاء وتعديل وعرض طلبات الشحن ببيان J&T كامل — مفلترة للعميل المسجّل." },
    "eux.ph03.title": { en: "Order Tracking", ar: "تتبع الطلبات" },
    "eux.ph03.body":  { en: "Live scan history from the J&T Express API, translated into Arabic status updates.", ar: "سجل مسح لحظي من واجهة J&T Express، مترجم لتحديثات حالة بالعربي." },
    "eux.ph04.title": { en: "Splash & Routing", ar: "البداية والتوجيه" },
    "eux.ph04.body":  { en: "Checks auth status and connectivity to route the user to login or the main app.", ar: "بيتحقق من حالة الدخول والاتصال لتوجيه المستخدم للدخول أو التطبيق الرئيسي." },
    "eux.p1.1": { en: "Signup",          ar: "إنشاء حساب" },
    "eux.p1.2": { en: "Login",           ar: "تسجيل الدخول" },
    "eux.p1.3": { en: "Password reset",  ar: "إعادة تعيين كلمة المرور" },
    "eux.p2.1": { en: "Orders list",     ar: "قائمة الطلبات" },
    "eux.p2.2": { en: "Add order",       ar: "إضافة طلب" },
    "eux.p2.3": { en: "Edit order",      ar: "تعديل طلب" },
    "eux.p3.1": { en: "Track shipment",  ar: "تتبع الشحنة" },
    "eux.p3.2": { en: "Scan history",    ar: "سجل المسح" },
    "eux.p4.1": { en: "Splash",          ar: "شاشة البداية" },
    /* ── LMS project ─── */
    "lms.category": { en: "E-Learning Platform · Web", ar: "منصة تعليم · ويب" },
    "lms.name":     { en: "FegmaPlatform LMS",           ar: "منصة EduPlatform التعليمية" },
    "lms.tagline":  { en: "A full learning-management platform: instructors sell courses, students learn and earn certificates, admins run the whole marketplace.", ar: "منصة تعليم متكاملة: المدرّبون يبيعون الكورسات، الطلاب يتعلّمون ويحصلون على شهادات، والأدمن يدير السوق كله." },
    "lms.pp.name":    { en: "FegmaPlatform LMS",           ar: "منصة EduPlatform التعليمية" },
    "lms.pp.cat":     { en: "E-Learning Platform · Web", ar: "منصة تعليم · ويب" },
    "lms.pp.tagline": { en: "A Laravel learning-management platform with three roles — Student, Instructor, and Admin — covering course sales, video learning, certificates, instructor payouts, and a full CMS-driven marketplace.", ar: "منصة تعليم على Laravel بثلاث أدوار — طالب، مدرّب، وأدمن — تغطي بيع الكورسات، التعلّم بالفيديو، الشهادات، مدفوعات المدرّبين، وسوق كامل مُدار بنظام محتوى." },
    "lms.problem":  { en: "Selling courses online means juggling three very different users at once: students who buy, watch, and expect certificates; instructors who build content and want to get paid; and admins who must approve courses, run payouts, and control a public marketing site. Stitching that together from generic tools is brittle and hard to trust with money.", ar: "بيع الكورسات أونلاين معناه إدارة ثلاث أنواع مستخدمين مختلفين في نفس الوقت: طلاب بيشتروا ويتفرّجوا وينتظروا شهادات؛ مدرّبون بيبنوا محتوى وعايزين فلوسهم؛ وأدمن لازم يوافق على الكورسات ويدير المدفوعات ويتحكّم في موقع تسويقي عام. جمع ده من أدوات عامة هش وصعب توثيقه مع الفلوس." },
    "lms.solution": { en: "A single Laravel platform with a separate admin guard. Students browse a filterable catalog, checkout via Stripe/PayPal/Razorpay, watch lessons, track completion, and download a generated PDF certificate. Instructors build chaptered courses, earn wallet commission, and request payouts. Admins approve courses, run enrollment, configure gateways, and build the whole homepage through a CMS.", ar: "منصة Laravel واحدة بحارس أدمن منفصل. الطلاب يتصفّحون كتالوج قابل للفلترة، يدفعون عبر Stripe/PayPal/Razorpay، يشاهدون الدروس، يتتبعون الإنجاز، ويحمّلون شهادة PDF مولّدة. المدرّبون يبنون كورسات بفصول، يكسبون عمولة في المحفظة، ويطلبون سحب أرباح. الأدمن يوافق على الكورسات، يدير التسجيل، يضبط بوابات الدفع، ويبني الصفحة الرئيسية كاملة عبر نظام محتوى." },
    "lms.f1": { en: "Course catalog, cart & multi-gateway checkout (Stripe/PayPal/Razorpay)", ar: "كتالوج كورسات، سلة، ودفع متعدد البوابات (Stripe/PayPal/Razorpay)" },
    "lms.f2": { en: "Video player with lesson-completion tracking & resume", ar: "مشغّل فيديو مع تتبع إنجاز الدروس واستئناف المشاهدة" },
    "lms.f3": { en: "On-demand PDF certificates via a visual Certificate Builder", ar: "شهادات PDF عند الطلب عبر منشئ شهادات مرئي" },
    "lms.f4": { en: "Instructor dashboard: chaptered courses, wallet & payouts", ar: "لوحة المدرّب: كورسات بفصول، محفظة، وسحب أرباح" },
    "lms.f5": { en: "Admin approvals, manual & CSV bulk enrollment, revenue analytics", ar: "موافقات الأدمن، تسجيل يدوي وجماعي بالـ CSV، وتحليلات إيرادات" },
    "lms.f6": { en: "Full CMS homepage builder, blog, and custom pages", ar: "منشئ صفحة رئيسية كامل بنظام محتوى، مدوّنة، وصفحات مخصصة" },
    "lms.c1.title": { en: "Money that has to add up", ar: "فلوس لازم تظبط" },
    "lms.c1.body":  { en: "Every sale splits a commission to the platform and credits the instructor's wallet, which later funds payout withdrawals across multiple gateways. Built a wallet + commission engine with a configurable rate and one-pending-request payout flow so balances always reconcile.", ar: "كل عملية بيع بتقسّم عمولة للمنصة وبتضيف رصيد لمحفظة المدرّب، اللي بعدين بتموّل طلبات السحب عبر بوابات متعددة. بنيت محرك محفظة وعمولة بنسبة قابلة للضبط وتدفق سحب بطلب معلّق واحد بحيث الأرصدة دايماً بتتطابق." },
    "lms.c2.title": { en: "Certificates on demand", ar: "شهادات عند الطلب" },
    "lms.c2.body":  { en: "Certificates had to look designed, not generic. Admins position text elements on a background via a Certificate Builder, and once a student completes every lesson the PDF is generated on demand with DomPDF — injecting student, course, instructor, and date.", ar: "الشهادات لازم تبان مصمّمة، مش عامة. الأدمن بيحدد أماكن عناصر النص على خلفية عبر منشئ الشهادات، ولما الطالب يكمّل كل الدروس بيتولّد الـ PDF عند الطلب بـ DomPDF — بإدراج اسم الطالب والكورس والمدرّب والتاريخ." },
    "lms.next.name": { en: "CHR Developments",     ar: "CHR للتطوير العقاري" },
    "lms.next.cat":  { en: "Real Estate Platform", ar: "منصة عقارية" },
    "theme.to-light": { en: "Light mode", ar: "الوضع الفاتح" },
    "theme.to-dark":  { en: "Dark mode",  ar: "الوضع الداكن" },
  };

  function t(key) {
    const e = I18N[key];
    return e ? (e[state.lang] || e.en) : key;
  }

  /* ── SVG helpers ─────────────────────────────────────────── */
  function sunSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
  }
  function moonSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;
  }
  function arrowSvg() {
    const d = state.lang === "ar" ? "M9 1.5L2.5 7l6.5 5.5M3 7h9" : "M5 1.5L11.5 7 5 12.5M11 7H2";
    return `<svg class="btn__arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function backArrowSvg() {
    const d = state.lang === "ar" ? "M5 3l5 5-5 5M3 8h7" : "M11 3L6 8l5 5M13 8H6";
    return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="${d}" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  /* ── Theme ───────────────────────────────────────────────── */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const btn = document.querySelector("[data-action='toggle-theme']");
    if (!btn) return;
    btn.innerHTML  = state.theme === "dark" ? sunSvg() : moonSvg();
    btn.title      = state.theme === "dark" ? t("theme.to-light") : t("theme.to-dark");
    btn.setAttribute("aria-label", btn.title);
  }

  /* ── i18n ────────────────────────────────────────────────── */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir  = state.lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.innerHTML = t(el.dataset.i18n);
    });
    document.querySelectorAll(".lang-switcher__option").forEach(opt => {
      opt.classList.toggle("lang-switcher__option--active", opt.dataset.lang === state.lang);
    });
    document.querySelectorAll("[data-arrow]").forEach(el => { el.innerHTML = arrowSvg(); });
    document.querySelectorAll("[data-back-arrow]").forEach(el => { el.innerHTML = backArrowSvg(); });
  }

  /* ── Terminal animation ──────────────────────────────────── */
  const TERMINAL = {
    en: [
      { t: "cmd", s: "whoami" }, { t: "out", s: "muhammed_ashraf" },
      { t: "out", s: "→ full-stack developer · egypt · open for work", m: true }, { t: "blank" },
      { t: "cmd", s: "cat tagline.txt" }, { t: "out", s: "Turning problems into digital solutions." }, { t: "blank" },
      { t: "cmd", s: "ls ./services" }, { t: "out", s: "web-platforms/   mobile-apps/   internal-tools/   bilingual-systems/" }, { t: "blank" },
      { t: "cmd", s: "stack --top" }, { t: "out", s: "next.js  ·  react-native  ·  node.js  ·  postgres  ·  typescript" }, { t: "blank" },
      { t: "cmd", s: "echo $approach" }, { t: "out", s: "\u201cListen long enough to see the actual problem.\u201d", i: true }, { t: "blank" },
      { t: "cmd", s: "open ./work", final: true },
    ],
    ar: [
      { t: "cmd", s: "whoami" }, { t: "out", s: "محمد_أشرف" },
      { t: "out", s: "← مطوّر full-stack · مصر · متاح لمشاريع جديدة", m: true }, { t: "blank" },
      { t: "cmd", s: "cat tagline.txt" }, { t: "out", s: "بحوّل المشاكل لحلول رقمية." }, { t: "blank" },
      { t: "cmd", s: "ls ./services" }, { t: "out", s: "منصات-ويب/   تطبيقات-موبايل/   أدوات-داخلية/   أنظمة-ثنائية-اللغة/" }, { t: "blank" },
      { t: "cmd", s: "stack --top" }, { t: "out", s: "next.js  ·  react-native  ·  node.js  ·  postgres  ·  typescript" }, { t: "blank" },
      { t: "cmd", s: "echo $approach" }, { t: "out", s: "«اسمع كفاية علشان تشوف المشكلة الحقيقية.»", i: true }, { t: "blank" },
      { t: "cmd", s: "open ./work", final: true },
    ],
  };
  let termTimer = null;
  function runTerminal() {
    if (termTimer) { clearTimeout(termTimer); termTimer = null; }
    const body = document.getElementById("js-terminal-body");
    if (!body) return;
    const script = TERMINAL[state.lang] || TERMINAL.en;
    let li = 0, ci = 0;
    function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
    function renderLines() {
      const parts = [];
      for (let i = 0; i <= li && i < script.length; i++) {
        const line = script[i]; const isCur = i === li;
        const text = isCur ? (line.s || "").slice(0, ci) : (line.s || "");
        if (line.t === "blank") { parts.push(`<span class="terminal__line terminal__line--blank">&nbsp;</span>`); continue; }
        if (line.t === "cmd") {
          const cur = isCur ? `<span class="terminal__cursor"></span>` : (line.final ? `<span class="terminal__cursor terminal__cursor--still"></span>` : "");
          parts.push(`<span class="terminal__line terminal__line--cmd"><span class="terminal__prompt"><span class="terminal__prompt-user">muhammed</span><span class="terminal__prompt-at">@</span><span class="terminal__prompt-host">portfolio</span><span class="terminal__prompt-path"> ~ </span><span class="terminal__prompt-sign">$</span></span> <span class="terminal__cmd">${esc(text)}</span>${cur}</span>`);
        } else {
          const cls = ["terminal__line terminal__line--out", line.m ? "terminal__line--muted" : "", line.i ? "terminal__line--italic" : ""].filter(Boolean).join(" ");
          const cur = isCur ? `<span class="terminal__cursor terminal__cursor--out"></span>` : "";
          parts.push(`<span class="${cls}">${esc(text)}${cur}</span>`);
        }
      }
      body.innerHTML = parts.join("");
      body.scrollTop = body.scrollHeight;
    }
    function tick() {
      const cur = script[li]; if (!cur) return;
      if (cur.t === "blank") { li++; ci = 0; renderLines(); termTimer = setTimeout(tick, 90); return; }
      if (ci < cur.s.length) {
        ci++; renderLines();
        termTimer = setTimeout(tick, (cur.t === "cmd" ? 38 : 14) + Math.random() * 22);
      } else {
        termTimer = setTimeout(() => { li++; ci = 0; renderLines(); tick(); }, cur.t === "cmd" ? 240 : 180);
      }
    }
    renderLines(); tick();
  }

  /* ── Scroll reveal ───────────────────────────────────────── */
  function setupReveal() {
    const els = document.querySelectorAll(".anim-reveal:not(.anim-reveal--visible)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("anim-reveal--visible")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("anim-reveal--visible"); io.unobserve(e.target); } });
    }, { threshold: 0.10 });
    els.forEach(e => io.observe(e));
  }

  /* ── Navbar scroll state ─────────────────────────────────── */
  function setupNavbar() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("navbar--scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── Email copy ──────────────────────────────────────────── */
  function setupEmailCopy() {
    const btn = document.querySelector("[data-action='copy-email']");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const fb = btn.querySelector(".contact-section__copy-feedback");
      const addr = "muhammedashrafsaleh@gmail.com";
      const done = () => { if (fb) { fb.textContent = t("contact.copied"); setTimeout(() => { fb.textContent = ""; }, 1600); } };
      if (navigator.clipboard) { navigator.clipboard.writeText(addr).then(done, () => { location.href = "mailto:" + addr; }); }
      else { location.href = "mailto:" + addr; }
    });
  }

  /* ── Event delegation ────────────────────────────────────── */
  function setupEvents() {
    document.addEventListener("click", e => {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;

      if (action === "toggle-lang") {
        state.lang = state.lang === "en" ? "ar" : "en";
        localStorage.setItem("ma_lang", state.lang);
        applyI18n(); applyTheme();
        if (page === "home") runTerminal();
        return;
      }
      if (action === "toggle-theme") {
        state.theme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem("ma_theme", state.theme);
        document.documentElement.classList.add("theme-transitioning");
        applyTheme();
        setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 320);
        return;
      }
      if (action === "scroll-to") {
        const target = document.getElementById(el.dataset.target);
        if (!target) return;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
        return;
      }
    });
  }

  /* ── Home page specifics ─────────────────────────────────── */
  function initHome() {
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("mouseenter", () => card.classList.add("project-card--hover"));
      card.addEventListener("mouseleave", () => card.classList.remove("project-card--hover"));
    });
    runTerminal();
  }

  /* ── Boot ────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    applyI18n();
    setupNavbar();
    setupReveal();
    setupEmailCopy();
    setupEvents();
    if (page === "home") initHome();
  });
})();
