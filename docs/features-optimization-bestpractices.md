# Acureatus — Features, Optimizations & Best Practices

> **Audience**: Developers, stakeholders, and auditors.
> Complete reference of every feature, optimization technique, and engineering best practice in the project.

---

## Table of Contents

1. [Feature Inventory](#1-feature-inventory)
2. [Performance Optimizations](#2-performance-optimizations)
3. [SEO Best Practices](#3-seo-best-practices)
4. [Accessibility (a11y)](#4-accessibility)
5. [Security Best Practices](#5-security-best-practices)
6. [Code Architecture](#6-code-architecture)
7. [PWA & Offline Support](#7-pwa--offline-support)
8. [Internationalization (i18n)](#8-internationalization)
9. [Dark Mode & Theming](#9-dark-mode--theming)
10. [Third-Party Integrations](#10-third-party-integrations)

---

## 1. Feature Inventory

### Core Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, services, team, testimonials, pricing, gallery, FAQ, contact |
| Blog List | `/blog` | Blog posts with tags and reading time |
| Blog Post | `/blog/:slug` | Individual blog article with SEO metadata |
| 404 | `*` | Custom 404 with auto-redirect countdown |
| Offline | N/A | Static HTML fallback when no internet |

### UI Sections (Homepage)

| Section | Component | Key Features |
|---------|-----------|--------------|
| Hero | `HeroSection.tsx` | CTA buttons, LCP-optimized background image, animated counters |
| Stats Bar | `StatsBar.tsx` | Animated counters with intersection observer |
| Services | `ServicesSection.tsx` | Service cards with hover micro-interactions |
| Pillars | `PillarsSection.tsx` | Core value pillars with icons |
| Team | `TeamSection.tsx` | Staff profiles with photos |
| Testimonials | `TestimonialsSection.tsx` | Client reviews carousel |
| Google Reviews | `GoogleReviewsSection.tsx` | Embedded review display |
| Hall of Fame | `HallOfFameSection.tsx` | Achievement showcase |
| Gallery | `GallerySection.tsx` | Image gallery with lightbox |
| Pricing | `PricingSection.tsx` | Treatment pricing cards |
| FAQ | `FAQSection.tsx` | Accordion-style Q&A |
| Blog Preview | `BlogPreviewSection.tsx` | Latest blog posts on homepage |
| Contact Form | `ContactFormSection.tsx` | EmailJS-powered form |
| Contact Info | `ContactSection.tsx` | Address, map, hours, phone |

### Interactive Components

| Component | Purpose |
|-----------|---------|
| `FloatingCTA.tsx` | Sticky bottom CTA bar |
| `WhatsAppButton.tsx` | Floating WhatsApp chat button |
| `ChatFormDialog.tsx` | Chat-style booking dialog |
| `CookieConsent.tsx` | GDPR cookie consent banner |
| `ThemeToggle.tsx` | Light/dark mode toggle |
| `LanguageSwitcher.tsx` | English/Kannada toggle |
| `ScrollReveal.tsx` | Scroll-triggered animations |

---

## 2. Performance Optimizations

### Lazy Loading

| Technique | Implementation | Impact |
|-----------|----------------|--------|
| Route-level code splitting | `React.lazy()` for all pages | Reduces initial bundle |
| Section-level lazy loading | Below-the-fold sections loaded on demand | Faster FCP/LCP |
| Image lazy loading | `LazyImage.tsx` with `loading="lazy"` | Reduces initial payload |
| Hero image priority | `fetchPriority="high"` + explicit `width`/`height` | Optimizes LCP |

### Caching Strategy (Workbox)

| Resource | Strategy | TTL | Max Entries |
|----------|----------|-----|-------------|
| Static assets (JS, CSS, HTML) | Precache | Build version | All |
| Google Fonts CSS | CacheFirst | 1 year | 10 |
| Google Fonts files | CacheFirst | 1 year | 30 |
| Unsplash images | CacheFirst | 30 days | 50 |

### Resource Hints

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://images.unsplash.com" />
```

### Lighthouse Scores (Production)

| Category | Score | Notes |
|----------|-------|-------|
| Performance | 86–93 | Lazy loading, image optimization, precaching |
| Accessibility | 91 | ARIA, landmarks, skip-to-content |
| Best Practices | 96 | No console errors, proper loading |
| SEO | 90+ | Full on custom domain (69 on preview due to `noindex` header) |

---

## 3. SEO Best Practices

| Practice | Status | Details |
|----------|--------|---------|
| Title tag < 60 chars | ✅ | Keyword-optimized |
| Meta description < 160 chars | ✅ | Action-oriented |
| Canonical URL | ✅ | Prevents duplicate content |
| Open Graph tags | ✅ | With `og:url`, `og:locale`, image dimensions |
| Twitter Card tags | ✅ | Summary with large image |
| JSON-LD (static) | ✅ | In `index.html` `<head>` — MedicalBusiness schema |
| JSON-LD (dynamic) | ✅ | `JsonLd.tsx` — treatment catalog, aggregate rating |
| Sitemap | ✅ | `public/sitemap.xml` with homepage + blog |
| Robots.txt | ✅ | References sitemap |
| Single H1 | ✅ | In `HeroSection.tsx` |
| Semantic HTML | ✅ | `<header>`, `<main>`, `<section>`, `<footer>` |
| Alt text on all images | ✅ | Including hero LCP image |
| Responsive viewport | ✅ | `<meta name="viewport">` |

---

## 4. Accessibility

| Feature | Implementation |
|---------|----------------|
| Skip-to-content link | `SkipToContent.tsx` — hidden until focused |
| ARIA labels | On navigation, buttons, interactive elements |
| Landmark regions | `<header>`, `<main>`, `<nav>`, `<footer>` |
| Keyboard navigation | All interactive elements focusable |
| Color contrast | Checked for WCAG AA compliance |
| Focus indicators | Visible focus rings on all controls |
| Screen reader support | Semantic HTML + ARIA attributes |

---

## 5. Security Best Practices

| Practice | Implementation |
|----------|----------------|
| No API keys in code | EmailJS public key only; private keys via environment |
| Content Security Policy | Ready for deployment-level CSP headers |
| Cookie consent | GDPR-compliant banner with localStorage tracking |
| XSS prevention | React's built-in escaping |
| No `dangerouslySetInnerHTML` | Avoided throughout |
| HTTPS enforced | Via deployment platform (auto SSL) |

---

## 6. Code Architecture

### Error Handling

| Layer | Strategy |
|-------|----------|
| Section-level | `ErrorBoundary` wrapper per section — one section's crash doesn't break the page |
| Route-level | `Suspense` fallback with loading indicator |
| 404 handling | Custom `NotFound.tsx` with auto-redirect |
| Console logging | Errors logged with section name for debugging |

### Design System

| Aspect | Implementation |
|--------|----------------|
| CSS tokens | HSL-based semantic tokens in `index.css` |
| Tailwind config | Extended with custom colors, fonts, animations |
| Component library | shadcn/ui with customized variants |
| Dark mode | Tailwind `class` strategy with `ThemeToggle` |

### File Structure

```
src/
├── assets/          # Static images (logo, hero)
├── components/      # Reusable UI components
│   └── ui/          # shadcn/ui primitives
├── data/            # Static data (clinic, blog, gallery)
├── hooks/           # Custom hooks (i18n, mobile, toast)
├── lib/             # Utilities
├── pages/           # Route components
└── test/            # Test setup and tests
```

---

## 7. PWA & Offline Support

| Feature | Status | Details |
|---------|--------|---------|
| Service Worker | ✅ | Workbox via `vite-plugin-pwa` |
| Auto-update | ✅ | `registerType: "autoUpdate"` |
| Precaching | ✅ | All static assets |
| Offline fallback | ✅ | `public/offline.html` — branded page with retry + call CTA |
| App manifest | ✅ | Name, icons, theme color, standalone display |
| Installable | ✅ | Meets PWA install criteria |
| Auto-reconnect | ✅ | Offline page listens for `online` event and reloads |
| Dark mode support | ✅ | Offline page respects stored theme |

---

## 8. Internationalization

| Feature | Details |
|---------|---------|
| Languages | English (`en`), Kannada (`kn`) |
| Implementation | `useI18n` hook with React Context |
| Storage | `localStorage` key: `locale` |
| Coverage | All user-facing text |
| Switching | `LanguageSwitcher.tsx` in header |

---

## 9. Dark Mode & Theming

| Feature | Details |
|---------|---------|
| Strategy | Tailwind `darkMode: ["class"]` |
| Toggle | `ThemeToggle.tsx` — sun/moon icon |
| Persistence | `localStorage` key: `theme` |
| Default | System preference via `prefers-color-scheme` |
| Transition | Smooth CSS transition on `body` |
| Coverage | All components, including offline page |

---

## 10. Third-Party Integrations

| Service | Package/Method | Purpose |
|---------|----------------|---------|
| EmailJS | `@emailjs/browser` | Contact form submission |
| Google Fonts | CDN + preconnect | Typography (display + body) |
| Unsplash | CDN + CacheFirst | Gallery/hero images |
| Framer Motion | `framer-motion` | Scroll animations, transitions |
| Embla Carousel | `embla-carousel-react` | Testimonial/gallery carousels |
| Lucide Icons | `lucide-react` | Consistent icon system |
| React Query | `@tanstack/react-query` | Data fetching/caching (future-ready) |

---

## Summary Checklist

- [x] 14+ homepage sections with error boundaries
- [x] Blog system with dynamic routes
- [x] Bilingual (English + Kannada)
- [x] Dark mode with persistence
- [x] PWA with offline fallback
- [x] Lighthouse 86–96 across all categories
- [x] Full SEO schema (JSON-LD, OG, sitemap)
- [x] GDPR cookie consent
- [x] Accessibility (skip-to-content, ARIA, landmarks)
- [x] Performance (lazy loading, code splitting, caching)
- [x] Security (no exposed keys, XSS prevention)
- [x] Responsive design (mobile-first)

---

*Last updated: March 2026*
