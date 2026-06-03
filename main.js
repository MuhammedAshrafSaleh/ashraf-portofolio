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
    "stack.frontend": { en: "Frontend",     ar: "واجهات أمامية" },
    "stack.backend":  { en: "Backend",      ar: "خدمات خلفية" },
    "stack.data":     { en: "Data & Infra", ar: "بيانات وبنية" },
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
    "chr.solution":   { en: "Built a content-managed real estate platform with project pages, unit filtering, interactive maps, and a lead pipeline that pushes inquiries straight to the sales team — with full Arabic/English support.", ar: "بنيت منصة عقارية بنظام إدارة محتوى، صفحات مشاريع، فلترة وحدات، خرائط تفاعلية، وخط استفسارات يدفع الطلبات مباشرة لفريق المبيعات — بدعم كامل للعربية والإنجليزية." },
    "chr.f1": { en: "Project & unit catalog with smart filtering",     ar: "كتالوج مشاريع ووحدات مع فلترة ذكية" },
    "chr.f2": { en: "Interactive map view of all developments",        ar: "عرض خرائط تفاعلي لكل المشاريع" },
    "chr.f3": { en: "Multi-step inquiry form with CRM hand-off",       ar: "نموذج استفسار متعدد الخطوات مع تسليم للـ CRM" },
    "chr.f4": { en: "Bilingual content management (AR/EN)",            ar: "إدارة محتوى ثنائية اللغة (عربي/إنجليزي)" },
    "chr.f5": { en: "SEO-optimized project pages",                     ar: "صفحات مشاريع محسّنة لمحركات البحث" },
    "chr.c1.title": { en: "Bilingual content + RTL layouts", ar: "محتوى ثنائي اللغة + تخطيطات RTL" },
    "chr.c1.body":  { en: "Every page had to mirror correctly in Arabic without rebuilding it twice. Solved with a single source of truth and logical CSS properties throughout.", ar: "كل صفحة لازم تنعكس صح بالعربي بدون إعادة بنائها مرتين. اتحلت بمصدر واحد للحقيقة وخصائص CSS منطقية." },
    "chr.c2.title": { en: "Map performance at scale", ar: "أداء الخرائط مع زيادة البيانات" },
    "chr.c2.body":  { en: "Hundreds of unit markers on one map killed performance. Clustered markers and lazy-loaded unit details on demand.", ar: "مئات العلامات على خريطة واحدة بطّأت الأداء. عملت تجميع للعلامات وتحميل تفاصيل الوحدات عند الطلب." },
    "chr.next.name": { en: "debitPro",        ar: "debitPro" },
    "chr.next.cat":  { en: "FinOps · Mobile", ar: "تطبيق مالى · موبايل" },
    /* ── debitPro project ─── */
    "dp.pp.name":    { en: "debitPro",                ar: "debitPro" },
    "dp.pp.cat":     { en: "FinOps · Mobile",         ar: "تطبيق مالى · موبايل" },
    "dp.pp.status":  { en: "In progress",             ar: "تحت التطوير" },
    "dp.pp.tagline": { en: "An installment-office app: clients, installment plans, monthly collections, and reminders — without the notebook.", ar: "تطبيق لمكتب أقساط: عملاء، خطط أقساط، تحصيلات شهرية، وتذكيرات — من غير الكشكول." },
    "dp.problem":    { en: "An installment office was running on paper notebooks and WhatsApp reminders. Missed payments, lost records, and zero visibility into who owed what.", ar: "مكتب أقساط كان شغّال بكشاكيل ورق وتذكيرات واتساب. أقساط فايتة، سجلات ضايعة، وصفر رؤية لمين عليه إيه." },
    "dp.solution":   { en: "A clean mobile app: clients, plans, automated monthly schedules, payment logging, overdue alerts, and a simple owner dashboard with the office's full financial picture.", ar: "تطبيق موبايل نظيف: عملاء، خطط، جداول شهرية أوتوماتيكية، تسجيل دفعات، تنبيهات تأخير، ولوحة تحكم بسيطة للمالك بكل الصورة المالية للمكتب." },
    "dp.f1": { en: "Client profiles + installment plans",       ar: "ملفات عملاء + خطط أقساط" },
    "dp.f2": { en: "Automated monthly schedule generation",     ar: "توليد جداول شهرية أوتوماتيكي" },
    "dp.f3": { en: "Overdue & upcoming payment alerts",         ar: "تنبيهات للدفعات المتأخرة والقادمة" },
    "dp.f4": { en: "Receipt printing (Bluetooth)",              ar: "طباعة إيصالات بالبلوتوث" },
    "dp.f5": { en: "Owner financial dashboard",                 ar: "لوحة تحكم مالية للمالك" },
    "dp.c1.title": { en: "Reliable monthly schedules", ar: "جداول شهرية موثوقة" },
    "dp.c1.body":  { en: "Edge cases everywhere — early payment, partial payment, plan renegotiation. Built a deterministic schedule engine that can replay any client's history.", ar: "حالات حدية في كل حتة — دفعة مبكرة، دفعة جزئية، تعديل خطة. بنيت محرك جداول حتمي يقدر يعيد تشغيل تاريخ أي عميل." },
    "dp.next.name": { en: "CHR Developments",       ar: "CHR للتطوير العقاري" },
    "dp.next.cat":  { en: "Real Estate Platform",   ar: "منصة عقارية" },
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
