# Acureatus — Developer Documentation

> **Audience**: Junior developers joining the project.
> This guide explains how the codebase is organised, how to change colours/fonts, and how the WhatsApp & EmailJS integrations work.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [How the Theme Palette Works](#2-how-the-theme-palette-works)
3. [Dark Mode](#3-dark-mode)
4. [How to Customise Fonts](#4-how-to-customise-fonts)
5. [EmailJS Integration](#5-emailjs-integration)
6. [WhatsApp Integration](#6-whatsapp-integration)
7. [PWA (Progressive Web App)](#7-pwa-progressive-web-app)
8. [Cookie Consent](#8-cookie-consent)
9. [Treatment Pricing Data](#9-treatment-pricing-data)
10. [Error Boundaries](#10-error-boundaries)
11. [Performance Architecture](#11-performance-architecture)

---

## 1. Project Structure

```
├── public/                  # Static assets served as-is (favicon, robots.txt, PWA icons, sitemap.xml)
├── docs/                    # Developer documentation (you are here)
│   ├── index.md                     # Documentation index
│   ├── developer-guide.md           # This file
│   ├── features-guide.md            # i18n, accessibility, booking guide
│   ├── animations-darkmode-guide.md # Animations & dark mode guide
│   ├── services-reviews-microinteractions-guide.md  # Service details, reviews, hover effects
│   ├── seo-performance-guide.md     # JSON-LD, performance optimizations
│   ├── seo-domain-deployment-cookies.md  # SEO, domain, deployment, cookies guide
│   ├── white-label-guide.md         # Reusing for other clients
│   ├── admin-panel-implementation-guide.md  # Auth & admin panel guide
│   ├── future-backend-guide.md      # Firebase / MongoDB / Lovable Cloud migration
│   └── project-invoice.md           # Cost breakdown
├── src/
│   ├── assets/              # Images imported by components (logo, hero background)
│   ├── components/          # All React components
│   │   ├── ui/              # Reusable UI primitives (Button, Input, Dialog, etc.)
│   │   │                      These come from shadcn/ui and are rarely edited.
│   │   ├── ErrorBoundary.tsx  # Class-based error boundary (wraps each section)
│   │   ├── Header.tsx        # Top navigation bar (desktop + mobile sheet) + theme toggle
│   │   ├── HeroSection.tsx   # Landing hero with background image slideshow
│   │   ├── PillarsSection.tsx  # Core pillars (Feature108 tabbed layout)
│   │   ├── ServicesSection.tsx  # Specialized clinic cards (BentoGrid)
│   │   ├── PricingSection.tsx  # Treatment price table (reads from clinicData.ts)
│   │   ├── TeamSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── GoogleReviewsSection.tsx  # Google reviews widget (static)
│   │   ├── BlogPreviewSection.tsx    # Blog preview cards (3 latest posts)
│   │   ├── ContactFormSection.tsx  # "Contact Us" form → sends email via EmailJS
│   │   ├── ContactSection.tsx      # "Visit Us" with clinic addresses & map
│   │   ├── FAQSection.tsx          # Collapsible FAQ list
│   │   ├── Footer.tsx
│   │   ├── FloatingCTA.tsx         # Floating Action Button (FAB) — Book Now, Chat, Go to Top
│   │   ├── ChatFormDialog.tsx      # Dialog form that opens from FAB → sends to WhatsApp
│   │   ├── ThemeToggle.tsx         # Dark/light mode toggle button
│   │   ├── LanguageSwitcher.tsx    # EN ↔ ಕನ್ನಡ language toggle
│   │   ├── ScrollReveal.tsx        # Framer Motion scroll-triggered animation wrapper
│   │   ├── AnimatedCounter.tsx     # Animated number counter (used in StatsBar)
│   │   ├── StatsBar.tsx            # Hero stats (3+ years, 56+ patients, etc.)
│   │   ├── LazyImage.tsx           # Image with skeleton loading state
│   │   ├── JsonLd.tsx              # SEO structured data (MedicalBusiness schema)
│   │   ├── SkipToContent.tsx       # Accessibility skip link
│   │   ├── CookieConsent.tsx       # Cookie consent banner (forwardRef)
│   │   └── WhatsAppButton.tsx      # (Legacy) Standalone WhatsApp button — hidden, replaced by FAB
│   ├── data/
│   │   ├── clinicData.ts    # ALL clinic info (addresses, phone, hours, pricing, team, FAQs)
│   │   ├── blogData.ts      # Blog posts data (static)
│   │   └── galleryData.ts   # Gallery image data
│   ├── hooks/               # Custom React hooks
│   │   ├── useI18n.tsx      # Multi-language context (EN + Kannada)
│   │   ├── use-mobile.tsx   # Mobile breakpoint detection
│   │   └── use-toast.ts     # Toast notification hook
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper for classnames)
│   ├── pages/
│   │   ├── Index.tsx         # Main page — lazy loads sections with error boundaries
│   │   ├── BlogList.tsx      # Blog listing page
│   │   ├── BlogPost.tsx      # Individual blog post page
│   │   └── NotFound.tsx      # 404 page with auto-redirect
│   ├── index.css             # Global styles + Tailwind theme tokens (colours, fonts)
│   ├── App.tsx               # Router setup + providers (lazy loaded pages)
│   └── main.tsx              # Entry point — renders App into the DOM
├── tailwind.config.ts        # Tailwind configuration (extends theme with custom tokens)
├── vite.config.ts            # Vite config + PWA plugin + React dedupe
├── index.html                # HTML shell (meta tags, OG tags, canonical, JSON-LD, preconnect)
└── package.json              # Dependencies and scripts
```

### How a page is built

`src/pages/Index.tsx` is the homepage. It uses **React.lazy()** to code-split below-fold sections and wraps each in an **ErrorBoundary**:

```tsx
// Header and Hero load eagerly (above the fold)
<E name="Header"><Header /></E>
<E name="Hero"><HeroSection /></E>

// Everything below is lazy-loaded inside a Suspense boundary
<Suspense fallback={<SectionFallback />}>
  <E name="Pillars"><PillarsSection /></E>
  <E name="Services"><ServicesSection /></E>
  <E name="Pricing"><PricingSection /></E>
  <E name="Team"><TeamSection /></E>
  <E name="Gallery"><GallerySection /></E>
  <E name="Testimonials"><TestimonialsSection /></E>
  <E name="GoogleReviews"><GoogleReviewsSection /></E>
  <E name="Blog"><BlogPreviewSection /></E>
  <E name="ContactForm"><ContactFormSection /></E>
  <E name="Contact"><ContactSection /></E>
  <E name="FAQ"><FAQSection /></E>
  <E name="Footer"><Footer /></E>
  <E name="FloatingCTA"><FloatingCTA /></E>
  <E name="CookieConsent"><CookieConsent /></E>
</Suspense>
```

**To reorder sections**, simply move the components in `Index.tsx`.

**To add a new section**, create a component in `src/components/`, lazy-import it in `Index.tsx`, and wrap with `<E name="YourSection">`.

### Blog Pages

The app includes a blog system with three routes:
- `/` — Homepage with `BlogPreviewSection` showing 3 latest posts
- `/blog` — Full blog listing page (`BlogList.tsx`)
- `/blog/:slug` — Individual blog post page (`BlogPost.tsx`)

Blog data lives in `src/data/blogData.ts`.

---

## 2. How the Theme Palette Works

All colours live in **one place**: `src/index.css`, inside CSS custom properties (variables).

### Where colours are defined

```css
/* src/index.css */
:root {
  --background: 210 20% 98%;      /* Page background */
  --foreground: 213 80% 19%;      /* Default text colour */
  --primary: 213 100% 19%;        /* Main brand colour (dark navy) */
  --primary-foreground: 0 0% 100%; /* Text on primary (white) */
  --secondary: 197 71% 73%;       /* Accent colour (light teal) */
  /* ...more tokens */
}

.dark {
  --background: 215 28% 7%;       /* Dark page background */
  --foreground: 210 20% 95%;      /* Light text for dark mode */
  --primary: 197 71% 68%;         /* Teal becomes primary in dark */
  /* ...all tokens redefined for dark */
}
```

> **Format**: All values are in **HSL without the `hsl()` wrapper** — e.g. `213 100% 19%`.

### How to change the entire colour scheme

1. Open `src/index.css`.
2. Find the `:root { ... }` block (light mode) and `.dark { ... }` block (dark mode).
3. Change the HSL values in **both** blocks.
4. Save. Every component using `bg-primary`, `text-primary`, etc. updates automatically.

### Rules to follow

| ✅ Do | ❌ Don't |
|---|---|
| Use semantic classes: `bg-primary`, `text-muted-foreground` | Hard-code colours: `bg-blue-900`, `text-white` |
| Change colours only in `index.css` | Add colour values directly in component files |
| Keep HSL format without the wrapper | Use hex or rgb values in CSS variables |
| Update **both** `:root` and `.dark` blocks | Only change one theme |

---

## 3. Dark Mode

### How it works

1. **ThemeToggle** component (`src/components/ThemeToggle.tsx`) adds/removes the `dark` class on `<html>`
2. **Tailwind** detects the class via `darkMode: ["class"]` in `tailwind.config.ts`
3. **CSS variables** switch between `:root` (light) and `.dark` (dark) values in `index.css`
4. **localStorage** saves the choice as `theme: "light"` or `theme: "dark"`
5. **Smooth transition**: `body` has `transition: background-color 0.3s ease, color 0.3s ease`

### Where the toggle lives

The toggle button is in the **Header** (`src/components/Header.tsx`), between the language switcher and the "Book Now" button.

### Special handling

Some components use hardcoded colors for consistent appearance regardless of theme:

- **HeroSection**: Always uses dark navy overlay + white text
- **Footer**: Uses dark background in both themes

### Adding dark mode to a new component

Just use semantic classes. They automatically adapt:
```tsx
<div className="bg-card text-card-foreground">  {/* Auto-adapts */}
<p className="text-muted-foreground">            {/* Auto-adapts */}
```

---

## 4. How to Customise Fonts

### Where fonts are loaded

At the top of `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### Where fonts are mapped

In `tailwind.config.ts` and `src/index.css`:
- `--font-display: 'Playfair Display', serif` — Headings
- `--font-body: 'DM Sans', sans-serif` — Body text
- `--font-sans: 'Space Grotesk', ...` — Sans-serif fallback

### How to change a font

1. Pick a new font from [Google Fonts](https://fonts.google.com/)
2. Replace the `@import` URL in `src/index.css`
3. Update the CSS variables and/or `tailwind.config.ts` `fontFamily`
4. All `font-display` and `font-body` classes auto-update

---

## 5. EmailJS Integration

The **Contact Us** form (`src/components/ContactFormSection.tsx`) sends emails using [EmailJS](https://www.emailjs.com/).

### Setup steps

1. Sign up at [emailjs.com](https://www.emailjs.com/) (free: 200 emails/month)
2. **Email Services** → Add Gmail → Connect `acureatus@gmail.com` → Copy **Service ID**
3. **Email Templates** → Create template with: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`, `{{to_email}}`  → Copy **Template ID**
4. **Account** → API Keys → Copy **Public Key**
5. Update `src/components/ContactFormSection.tsx`:

```ts
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY = "your_public_key";
```

---

## 6. WhatsApp Integration

### How it works

The **FAB → Chat form** (`src/components/ChatFormDialog.tsx`) builds a WhatsApp Click-to-Chat URL:

```tsx
const url = `https://wa.me/917996217888?text=${encodeURIComponent(messageText)}`;
window.open(url, "_blank");
```

### Chat form fields

The WhatsApp chat form collects:
- **Name** (required)
- **Phone Number** (required)
- **Service Interested In** (optional)
- **Message** (required)
- **Preferred Date** (required, calendar picker, Sundays disabled)
- **Preferred Time** (required, select from 09:00 AM – 08:00 PM slots)

### Changing the WhatsApp number

Search for `917996217888` and replace with the new number (country code + number, no `+` or spaces).

Files to update:
- `src/components/ChatFormDialog.tsx`
- `src/components/FloatingCTA.tsx` (if any direct links)

---

## 7. PWA (Progressive Web App)

### What it does

The app is installable as a mobile app. Users can add it to their home screen from the browser.

### How it's configured

In `vite.config.ts`, the `VitePWA` plugin handles:
- **Service worker**: Auto-generated with Workbox, caches static assets
- **Manifest**: App name, icons, theme color, display mode
- **Runtime caching**: Google Fonts (1 year), Google Fonts webfonts (1 year), Unsplash images (30 days, 50 entries max)
- **Auto-update**: `registerType: "autoUpdate"` — SW updates silently

### PWA Icons

- `public/pwa-192x192.png` — Standard icon
- `public/pwa-512x512.png` — Large icon + maskable

### How users install it

- **Android**: Chrome → Menu → "Add to Home Screen"
- **iPhone**: Safari → Share → "Add to Home Screen"

---

## 8. Cookie Consent

### How it works

- Appears 1.5 seconds after first visit
- User choices: "Accept All" or "Essential Only"
- Choice saved to `localStorage` as `cookie-consent`
- Banner never appears again after a choice is made
- Component uses `forwardRef` for compatibility

### Data stored on user's device

| Key | Value | Purpose |
|---|---|---|
| `theme` | `"light"` / `"dark"` | Remember dark mode preference |
| `locale` | `"en"` / `"kn"` | Remember language preference |
| `cookie-consent` | `"accepted"` / `"declined"` | Remember consent choice |
| `cookie-consent-date` | ISO date | When consent was given |

---

## 9. Treatment Pricing Data

### Current Price List (INR)

All pricing is managed in `src/data/clinicData.ts` → `treatment_price_list_inr`:

| Treatment | Price (₹) |
|---|---:|
| Spinal Decompression | 500 |
| Laser Therapy | 500 |
| Tens / IFT | 350 |
| Electrical Stimulation | 350 |
| Spinal Manual Therapy | 350 |
| Exercise Therapy | 250 – 500 |
| Coordination Board Exercises | 400 |
| Manual Muscle Testing | 400 |
| Interactive Sports Gaming | 350 |
| Hand Rehabilitation | 500 |

**Price range**: ₹250 – ₹500 per session.

### How pricing is rendered

- **PricingSection** (`src/components/PricingSection.tsx`) reads `clinicData.treatment_price_list_inr` and renders a table
- **JSON-LD** in `index.html` and `src/components/JsonLd.tsx` includes treatment pricing for Google rich results
- **Payment methods accepted**: Google Pay, UPI, Cash

### Updating prices

1. Open `src/data/clinicData.ts`
2. Edit the `treatment_price_list_inr` array
3. Use `price: number` for fixed prices, or `price_range: "min - max"` for ranges
4. Both the pricing table and JSON-LD schema update automatically

---

## 10. Error Boundaries

### What it does

**File**: `src/components/ErrorBoundary.tsx`

A class-based React error boundary that wraps each major section on the homepage. If any section throws a runtime error, it is **silently caught** — the section disappears instead of crashing the entire page.

### How it works

```tsx
<ErrorBoundary sectionName="Services">
  <ServicesSection />
</ErrorBoundary>
```

- Errors are logged to `console.error` with the section name
- The default fallback renders nothing (`null`)
- Custom fallback UI can be passed via the `fallback` prop

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to protect |
| `fallback` | `ReactNode` | `null` | UI to show on error |
| `sectionName` | `string` | `"unknown"` | Label for console logging |

---

## 11. Performance Architecture

### Lazy Loading Strategy

The app uses a two-tier loading approach:

1. **Eager (above-the-fold)**: `Header` and `HeroSection` are imported normally for instant render
2. **Lazy (below-the-fold)**: All 12 other sections use `React.lazy()` and load via a shared `<Suspense>` boundary

### Image Optimization

| Technique | Applied To |
|---|---|
| `fetchPriority="high"` | First hero slide |
| `loading="lazy"` + `decoding="async"` | All below-fold images |
| Downscaled image URLs (600-800px) | Testimonials, team backgrounds |
| `width`/`height` attributes | Hero LCP image |

### Resource Hints (`index.html`)

| Hint | Domain | Purpose |
|---|---|---|
| `preconnect` | `fonts.googleapis.com` | Faster font CSS |
| `preconnect` | `fonts.gstatic.com` | Faster font files |
| `preconnect` | `images.unsplash.com` | Faster image loads |

### Lighthouse Scores (Post-Optimization)

| Category | Score |
|---|---|
| Performance | 86–93 |
| Accessibility | 91 |
| Best Practices | 96 |
| SEO | 90+ (when published to custom domain) |

> **Note**: SEO shows ~69 on preview URLs due to Lovable's `x-robots-tag: noindex, nofollow` header on staging. This is removed on published/custom domains.

---

## Quick Reference

| Task | File to edit |
|---|---|
| Change colours | `src/index.css` (`:root` + `.dark` blocks) |
| Change fonts | `src/index.css` (imports) + `tailwind.config.ts` |
| Change section order | `src/pages/Index.tsx` |
| Change clinic info / prices | `src/data/clinicData.ts` |
| Change WhatsApp number | Search `917996217888` in codebase |
| Setup EmailJS | `src/components/ContactFormSection.tsx` (3 constants) |
| Change cookie banner | `src/components/CookieConsent.tsx` |
| Change dark mode behavior | `src/components/ThemeToggle.tsx` |
| Change PWA config | `vite.config.ts` (VitePWA section) |
| Change FAB behaviour | `src/components/FloatingCTA.tsx` |
| Change language translations | `src/hooks/useI18n.tsx` |
| Edit blog posts | `src/data/blogData.ts` |
| Edit error boundary behavior | `src/components/ErrorBoundary.tsx` |
| Edit SEO meta tags | `index.html` |
| Edit JSON-LD schema | `index.html` (static) + `src/components/JsonLd.tsx` (dynamic) |

---

*Last updated: March 2026*