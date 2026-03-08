# Acureatus — Features Guide: i18n, Accessibility, PWA, Booking

> **Audience**: Developers maintaining or extending the project.
> This guide covers Multi-language support, Accessibility, Loading states, 404 page, Favicon, and Online Booking.

---

## Table of Contents

1. [Multi-Language (i18n) System](#1-multi-language-i18n-system)
2. [Accessibility (a11y)](#2-accessibility-a11y)
3. [Loading States & Skeleton Screens](#3-loading-states--skeleton-screens)
4. [404 Page](#4-404-page)
5. [Favicon & PWA Icons](#5-favicon--pwa-icons)
6. [Online Appointment Booking](#6-online-appointment-booking)

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

  return (
    <h2>{t("services.title")}</h2>  // "Specialized Clinics" or "ವಿಶೇಷ ಕ್ಲಿನಿಕ್‌ಗಳು"
  );
};
```

### Adding a new translation key

1. Open `src/hooks/useI18n.tsx`
2. Add the key to **both** `en` and `kn` objects:

```tsx
const translations = {
  en: {
    "mySection.title": "My New Title",
  },
  kn: {
    "mySection.title": "ನನ್ನ ಹೊಸ ಶೀರ್ಷಿಕೆ",
  },
};
```

3. Use in component: `t("mySection.title")`

### Adding a new language (e.g., Hindi)

1. Add the locale type:
```tsx
export type Locale = "en" | "kn" | "hi";
```

2. Add Hindi translations:
```tsx
const translations = {
  en: { ... },
  kn: { ... },
  hi: {
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    // ... all keys
  },
};
```

3. Update `LanguageSwitcher.tsx` to cycle through 3 languages or show a dropdown.

### Where the switcher appears

The language switcher is in the **Header** between the nav links and the theme toggle. It shows:
- When in English: Shows `ಕನ್ನಡ` (click to switch to Kannada)
- When in Kannada: Shows `EN` (click to switch to English)

### Components using `t()` translations

All 13 major components are wired to the i18n system:

| Component | Translation keys used |
|---|---|
| `HeroSection` | `hero.*` |
| `PillarsSection` | `pillars.*` |
| `ServicesSection` | `services.*` |
| `PricingSection` | `pricing.*` |
| `TeamSection` | `team.*` |
| `GallerySection` | `gallery.*` |
| `TestimonialsSection` | `testimonials.*` |
| `ContactFormSection` | `contact.*` |
| `ContactSection` | `visit.*` |
| `FAQSection` | `faq.*` |
| `Footer` | `footer.*`, `nav.*`, `visit.*` |
| `FloatingCTA` | `fab.*` |
| `CookieConsent` | `cookie.*` |
| `Header` | `nav.*` |

> **Note**: Some content like clinic names, addresses, FAQ questions/answers, and testimonial quotes remain in English as they are proper nouns or clinic-specific data from `clinicData.ts`.

### Storage

| Key | Value | Location |
|---|---|---|
| `locale` | `"en"` or `"kn"` | `localStorage` |

---

## 2. Accessibility (a11y)

### What's Implemented

| Feature | File | Description |
|---|---|---|
| **Skip to content** | `src/components/SkipToContent.tsx` | Hidden link that appears on Tab focus, jumps to `#main-content` |
| **Main content landmark** | `src/pages/Index.tsx` | `id="main-content"` and `role="main"` on page wrapper |
| **Banner landmark** | `src/components/Header.tsx` | `role="banner"` on header |
| **Navigation labels** | `src/components/Header.tsx` | `aria-label="Main navigation"` and `aria-label="Mobile navigation"` |
| **Button labels** | Throughout | `aria-label` on icon-only buttons (theme toggle, menu, FAB) |
| **Link labels** | Header | `aria-label="Call to book appointment"` on phone link |
| **Image alt text** | Throughout | All `<img>` tags have descriptive `alt` attributes |
| **SR-only text** | Sheet title | `className="sr-only"` for screen reader context |

### How Skip to Content Works

```
User presses Tab on page load
      ↓
"Skip to main content" link becomes visible (top-left)
      ↓
Pressing Enter scrolls to #main-content
      ↓
Link hides again when focus moves away
```

### Testing Accessibility

1. **Keyboard navigation**: Press Tab through the page. Every interactive element should be focusable.
2. **Screen reader**: Use VoiceOver (Mac) or NVDA (Windows) to navigate.
3. **Lighthouse audit**: Chrome DevTools → Lighthouse → Accessibility.
4. **Contrast check**: Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### What to add for future sections

Always include:
- `aria-label` on icon-only buttons
- `alt` text on images (empty `alt=""` for decorative images)
- Semantic HTML (`<section>`, `<nav>`, `<main>`, `<header>`, `<footer>`)
- Focus styles (Tailwind's `focus:ring` classes)
- `role` attributes where semantic HTML isn't sufficient

---

## 3. Loading States & Skeleton Screens

### LazyImage Component

**File**: `src/components/LazyImage.tsx`

A drop-in replacement for `<img>` that shows:
1. **Skeleton** (animated gray pulse) while loading
2. **Error state** if image fails to load
3. **Fade-in** when image loads successfully

### Usage

```tsx
import LazyImage from "@/components/LazyImage";

// Replace:
<img src="photo.jpg" alt="Description" className="w-full h-64 object-cover" />

// With:
<LazyImage
  src="photo.jpg"
  alt="Description"
  className="w-full h-64 object-cover"
  wrapperClassName="w-full h-64"
/>
```

### Props

| Prop | Type | Description |
|---|---|---|
| `src` | `string` | Image URL |
| `alt` | `string` | Alt text |
| `className` | `string` | Classes for the `<img>` element |
| `wrapperClassName` | `string` | Classes for the outer `<div>` wrapper |
| All `<img>` props | Various | Passed through to `<img>` |

### How it works

```
Component mounts → Shows skeleton (bg-muted animate-pulse)
      ↓
Image starts loading (native lazy loading via loading="lazy")
      ↓
onLoad fires → Skeleton fades out, image fades in (opacity transition)
      ↓
OR onError fires → Shows "Failed to load" message
```

### Where to apply it

Best suited for:
- Gallery images
- Team member photos
- Hero background alternatives
- Any external image (Unsplash, uploaded photos)

**Not needed for**:
- Small icons
- SVGs
- Images imported as ES6 modules (already bundled)

---

## 4. 404 Page

**File**: `src/pages/NotFound.tsx`

### Features

- Clinic logo and branding
- Shows the invalid URL path
- **10-second auto-redirect** to homepage with countdown
- Two action buttons: "Go to Homepage" and "Call Us"
- Uses semantic tokens (works in both light/dark mode)

### Customizing

- Change redirect timeout: Edit `useState(10)` for a different countdown
- Change redirect target: Edit `window.location.href = "/"`
- Remove auto-redirect: Delete the countdown `useEffect`

---

## 5. Favicon & PWA Icons

### Current Setup

| File | Used For |
|---|---|
| `public/pwa-192x192.png` | Favicon + Apple touch icon + PWA small icon |
| `public/pwa-512x512.png` | PWA large icon + maskable icon |

### How to Replace

1. Create your icon (512×512px, PNG)
2. Replace `public/pwa-512x512.png`
3. Create a 192×192 version → Replace `public/pwa-192x192.png`
4. The favicon, Apple touch icon, and PWA icons all update automatically

### Where they're referenced

- `index.html`: `<link rel="icon" href="/pwa-192x192.png">`
- `index.html`: `<link rel="apple-touch-icon" href="/pwa-192x192.png">`
- `vite.config.ts`: PWA manifest icons array

---

## 6. Online Appointment Booking

### Current Status: Requires Lovable Cloud

The database-backed appointment booking system requires **Lovable Cloud** to be enabled for:
- Storing appointments in a database
- Managing available time slots
- Sending confirmation notifications

### Planned Architecture

```
Patient fills booking form
      ↓
Form validated (Zod) → Submitted to Supabase
      ↓
Database stores: name, phone, date, time, service, status
      ↓
Admin can view/manage bookings
      ↓
(Optional) Confirmation via WhatsApp/Email
```

### Database Schema (Planned)

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### To Implement

1. Enable Lovable Cloud
2. Create the `appointments` table
3. Build the booking form component
4. Add RLS policies for security
5. (Optional) Build an admin view to manage appointments

---

## Quick Reference

| Task | File |
|---|---|
| Add translation key | `src/hooks/useI18n.tsx` |
| Change language switcher UI | `src/components/LanguageSwitcher.tsx` |
| Add new language | `src/hooks/useI18n.tsx` (add locale type + translations) |
| Replace LazyImage in a section | Import `LazyImage` from `@/components/LazyImage` |
| Change 404 redirect time | `src/pages/NotFound.tsx` (countdown state) |
| Replace favicon | `public/pwa-192x192.png` |
| Add ARIA label | Add `aria-label="..."` to the element |

---

*Last updated: March 2026*
