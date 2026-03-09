# Acureatus — Features Guide: i18n, Accessibility, PWA, Booking, Pricing

> **Audience**: Developers maintaining or extending the project.
> This guide covers Multi-language support, Accessibility, Loading states, 404 page, Favicon, Online Booking, and Treatment Pricing.

---

## Table of Contents

1. [Multi-Language (i18n) System](#1-multi-language-i18n-system)
2. [Accessibility (a11y)](#2-accessibility-a11y)
3. [Loading States & Skeleton Screens](#3-loading-states--skeleton-screens)
4. [404 Page](#4-404-page)
5. [Favicon & PWA Icons](#5-favicon--pwa-icons)
6. [Online Appointment Booking](#6-online-appointment-booking)
7. [Treatment Pricing System](#7-treatment-pricing-system)
8. [Blog System](#8-blog-system)
9. [Error Boundaries](#9-error-boundaries)

---

## 1. Multi-Language (i18n) System

### Architecture

The project uses a **React Context-based i18n system** — no external library needed.

```
src/hooks/useI18n.tsx          ← Context provider + translations
src/components/LanguageSwitcher.tsx  ← Toggle button (EN ↔ ಕನ್ನಡ)
```

### How It Works

```
User clicks language switcher in header
      ↓
useI18n context updates locale state
      ↓
localStorage saves preference ("locale": "en" or "kn")
      ↓
All components using t("key") re-render with new language
```

### Supported Languages

| Code | Language | Status |
|---|---|---|
| `en` | English | ✅ Default |
| `kn` | Kannada (ಕನ್ನಡ) | ✅ Implemented |

### Using translations in components

```tsx
import { useI18n } from "@/hooks/useI18n";

const MyComponent = () => {
  const { t } = useI18n();
  return <h2>{t("services.title")}</h2>;
};
```

### Adding a new translation key

1. Open `src/hooks/useI18n.tsx`
2. Add the key to **both** `en` and `kn` objects
3. Use in component: `t("mySection.title")`

### Adding a new language (e.g., Hindi)

1. Add the locale type: `export type Locale = "en" | "kn" | "hi";`
2. Add Hindi translations to the translations object
3. Update `LanguageSwitcher.tsx` to cycle through 3 languages or show a dropdown

### Components using `t()` translations

| Component | Translation keys used |
|---|---|
| `HeroSection` | `hero.*` |
| `PillarsSection` | `pillars.*` |
| `ServicesSection` | `services.*` |
| `PricingSection` | `pricing.*` (title, subtitle, treatment, price) |
| `TeamSection` | `team.*` |
| `GallerySection` | `gallery.*` |
| `TestimonialsSection` | `testimonials.*` |
| `GoogleReviewsSection` | `reviews.*` |
| `ContactFormSection` | `contact.*` |
| `ContactSection` | `visit.*` |
| `FAQSection` | `faq.*` |
| `Footer` | `footer.*`, `nav.*`, `visit.*` |
| `FloatingCTA` | `fab.*` |
| `CookieConsent` | `cookie.*` |
| `Header` | `nav.*` |
| `StatsBar` | `stats.*` |

> **Note**: Treatment names, prices, clinic addresses, and FAQ answers remain in English as they are clinic-specific data from `clinicData.ts`.

---

## 2. Accessibility (a11y)

### What's Implemented

| Feature | File | Description |
|---|---|---|
| **Skip to content** | `SkipToContent.tsx` | Hidden link that appears on Tab focus, jumps to `#main-content` |
| **Main content landmark** | `Index.tsx` | `id="main-content"` and `role="main"` on page wrapper |
| **Banner landmark** | `Header.tsx` | `role="banner"` on header |
| **Footer landmark** | `Footer.tsx` | `role="contentinfo"` on footer |
| **Navigation labels** | `Header.tsx` | `aria-label="Main navigation"` and `aria-label="Mobile navigation"` |
| **Button labels** | Throughout | `aria-label` on icon-only buttons (theme toggle, menu, FAB, language switcher) |
| **Link labels** | Header, Footer | `aria-label` on phone links and social icons |
| **Image alt text** | Throughout | All `<img>` tags have descriptive `alt` attributes (hero LCP image included) |
| **SR-only text** | Sheet title | `className="sr-only"` for screen reader context |
| **Tap targets** | Footer | Links have adequate padding for mobile touch |

### Lighthouse Accessibility Score: 91

### Testing Accessibility

1. **Keyboard navigation**: Press Tab through the page
2. **Screen reader**: Use VoiceOver (Mac) or NVDA (Windows)
3. **Lighthouse audit**: Chrome DevTools → Lighthouse → Accessibility
4. **Contrast check**: Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 3. Loading States & Skeleton Screens

### LazyImage Component

**File**: `src/components/LazyImage.tsx`

A drop-in replacement for `<img>` that shows:
1. **Skeleton** (animated gray pulse) while loading
2. **Error state** if image fails to load
3. **Fade-in** when image loads successfully

### Section Loading

**File**: `src/pages/Index.tsx`

Below-fold sections are lazy-loaded with `React.lazy()`. While loading, a spinner fallback is shown:

```tsx
const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);
```

### Page Loading

**File**: `src/App.tsx`

All pages (Index, BlogList, BlogPost, NotFound) are lazy-loaded with a "Loading…" text fallback.

---

## 4. 404 Page

**File**: `src/pages/NotFound.tsx`

- Clinic logo and branding
- Shows the invalid URL path
- **10-second auto-redirect** to homepage with countdown
- Two action buttons: "Go to Homepage" and "Call Us"
- Uses semantic tokens (works in both light/dark mode)

---

## 5. Favicon & PWA Icons

| File | Used For |
|---|---|
| `public/pwa-192x192.png` | Favicon + Apple touch icon + PWA small icon |
| `public/pwa-512x512.png` | PWA large icon + maskable icon |

To replace: Create your icon (512×512px PNG), replace the files, and everything updates automatically.

---

## 6. Online Appointment Booking

### Current Status: WhatsApp-Based

The current booking flow uses WhatsApp via the **ChatFormDialog** component:

```
Patient fills chat form (name, phone, service, message, date, time)
      ↓
Form validated with Zod
      ↓
Data formatted as WhatsApp message
      ↓
Opens WhatsApp with pre-filled message to +91 7996217888
```

### Available Time Slots

09:00 AM – 08:00 PM in 30-minute increments (Sundays disabled).

### Future: Database-Backed Booking (Requires Lovable Cloud)

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 7. Treatment Pricing System

### Data Source

**File**: `src/data/clinicData.ts` → `treatment_price_list_inr`

### Current Price List

| # | Treatment | Price (₹) |
|---|---|---:|
| 1 | Spinal Decompression | 500 |
| 2 | Laser Therapy | 500 |
| 3 | Tens / IFT | 350 |
| 4 | Electrical Stimulation | 350 |
| 5 | Spinal Manual Therapy | 350 |
| 6 | Exercise Therapy | 250 – 500 |
| 7 | Coordination Board Exercises | 400 |
| 8 | Manual Muscle Testing | 400 |
| 9 | Interactive Sports Gaming | 350 |
| 10 | Hand Rehabilitation | 500 |

### Payment Methods

Accepted: **Google Pay**, **UPI**, **Cash**

### Where Pricing Appears

| Location | Component | How |
|---|---|---|
| Pricing table on page | `PricingSection.tsx` | Reads `clinicData.treatment_price_list_inr` array |
| Google rich results (static) | `index.html` | JSON-LD in `<head>` |
| Google rich results (dynamic) | `JsonLd.tsx` | Includes each treatment in `hasOfferCatalog` schema |
| Payment badges | `PricingSection.tsx` | Reads `clinicData.payment_options` array |

### Updating Prices

1. Open `src/data/clinicData.ts`
2. Edit the `treatment_price_list_inr` array
3. Both the pricing table UI and JSON-LD schema update automatically
4. **Also update** `index.html` static JSON-LD if prices change significantly

---

## 8. Blog System

### Architecture

```
src/data/blogData.ts       ← Blog post data (static)
src/pages/BlogList.tsx     ← /blog — Full listing page
src/pages/BlogPost.tsx     ← /blog/:slug — Individual post page
src/components/BlogPreviewSection.tsx  ← Homepage preview (3 latest posts)
```

### Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Index.tsx` → `BlogPreviewSection` | Shows 3 latest posts |
| `/blog` | `BlogList.tsx` | Full blog listing |
| `/blog/:slug` | `BlogPost.tsx` | Individual post |

### Adding a New Blog Post

Edit `src/data/blogData.ts` — add a new entry with title, slug, content, excerpt, featuredImage, publishedAt, readingTime, and tags.

---

## 9. Error Boundaries

### What it does

**File**: `src/components/ErrorBoundary.tsx`

Each major section on the homepage is wrapped in an `ErrorBoundary`. If any section throws a runtime error, it disappears silently instead of crashing the whole page.

### How it's used in Index.tsx

```tsx
const E = ({ name, children }) => (
  <ErrorBoundary sectionName={name}>{children}</ErrorBoundary>
);

<E name="Services"><ServicesSection /></E>
```

Errors are logged to `console.error` with the section name for debugging.

---

## Quick Reference

| Task | File |
|---|---|
| Add translation key | `src/hooks/useI18n.tsx` |
| Change language switcher UI | `src/components/LanguageSwitcher.tsx` |
| Replace LazyImage in a section | Import from `@/components/LazyImage` |
| Change 404 redirect time | `src/pages/NotFound.tsx` |
| Replace favicon | `public/pwa-192x192.png` |
| Update treatment prices | `src/data/clinicData.ts` → `treatment_price_list_inr` |
| Update payment methods | `src/data/clinicData.ts` → `payment_options` |
| Add blog post | `src/data/blogData.ts` |
| Edit error boundary | `src/components/ErrorBoundary.tsx` |

---

*Last updated: March 2026*