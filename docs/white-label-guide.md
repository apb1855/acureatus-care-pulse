# Acureatus — White-Label / Multi-Customer Guide

> **Audience**: Developers or agency owners who want to reuse this codebase for different clinic or business clients with minimal changes.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Quick Checklist (15-Minute Handoff)](#2-quick-checklist)
3. [Detailed File-by-File Changes](#3-detailed-file-by-file-changes)
4. [Optional Customisations](#4-optional-customisations)
5. [Things You Do NOT Need to Change](#5-things-you-do-not-need-to-change)
6. [Step-by-Step: New Client Setup](#6-step-by-step-new-client-setup)

---

## 1. Overview

This project is built as a **single data-source architecture**. Almost all business-specific content (name, address, phone, services, pricing) lives in **one data file**: `src/data/clinicData.ts`.

**Change the data → the entire site updates** — including the pricing table (10 treatments, ₹250–₹500), team section, services, FAQs, and JSON-LD SEO schema.

---

## 2. Quick Checklist

| # | Task | File | Priority |
|---|---|---|---|
| 1 | Replace all business data (including prices) | `src/data/clinicData.ts` | 🔴 Must |
| 2 | Replace logo image | `src/assets/acureatus-logo.png` | 🔴 Must |
| 3 | Replace hero background | `src/assets/hero-bg.jpg` | 🔴 Must |
| 4 | Update page title & meta tags | `index.html` | 🔴 Must |
| 5 | Update WhatsApp number | `src/components/ChatFormDialog.tsx` | 🔴 Must |
| 6 | Update phone number in header/hero | `Header.tsx`, `HeroSection.tsx` | 🔴 Must |
| 7 | Change brand colours | `src/index.css` (`:root` + `.dark`) | 🟡 Should |
| 8 | Change fonts | `src/index.css` + `tailwind.config.ts` | 🟡 Should |
| 9 | Replace gallery images | `GallerySection.tsx` | 🟡 Should |
| 10 | Replace team photos | `TeamSection.tsx` | 🟡 Should |
| 11 | Update hero slideshow images | `HeroSection.tsx` | 🟡 Should |
| 12 | Setup EmailJS for client | `ContactFormSection.tsx` | 🟡 Should |
| 13 | Update translations (i18n) | `src/hooks/useI18n.tsx` | 🟡 Should |
| 14 | Update PWA manifest | `vite.config.ts` | 🟢 Nice |
| 15 | Replace PWA icons/favicon | `public/` | 🟢 Nice |

---

## 3. Detailed File-by-File Changes

### 3.1 `src/data/clinicData.ts` — THE MAIN FILE

This is the **single source of truth** for all business content including **treatment pricing**.

#### Treatment Pricing Format

```ts
treatment_price_list_inr: [
  { item: "Service Name", price: 500 },           // Fixed price
  { item: "Another Service", price_range: "250 - 500" },  // Range
],
```

#### Current Acureatus Prices (Replace for New Client)

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

**After changing this file**, the following auto-update:
- Hero (name, tagline, rating)
- Pillars
- Services / Specialized Clinics
- **Pricing table** (all treatments and prices)
- **JSON-LD schema** (Google rich results with treatment prices)
- Team section
- Contact section (address, phone, hours)
- FAQ section
- Footer
- Payment methods badges

### 3.2 `index.html` — Page Title & SEO

Update title, meta description, OG tags, Twitter cards.

### 3.3 `src/assets/` — Logo & Hero Image

| File | Format | Size |
|---|---|---|
| `acureatus-logo.png` | PNG (transparent bg) | 200–400px wide |
| `hero-bg.jpg` | JPG | 1920×1080, under 300KB |

### 3.4 WhatsApp Number

Search for `917996217888` → Replace with new number (country code + number, no `+` or spaces).

### 3.5 Brand Colours — `src/index.css`

Change HSL values in both `:root` and `.dark` blocks.

### 3.6 Fonts — `src/index.css` + `tailwind.config.ts`

Replace `@import` URL and update `fontFamily`.

---

## 4. Optional Customisations

| Customisation | File | Effort |
|---|---|---|
| Change number of pillars | `clinicData.ts` → `core_pillars` | 1 min |
| Add/remove service cards | `clinicData.ts` → `specialized_clinics` | 2 min |
| **Add/remove treatments & prices** | `clinicData.ts` → `treatment_price_list_inr` | 1 min |
| **Change payment methods** | `clinicData.ts` → `payment_options` | 1 min |
| Change service card icons | `ServicesSection.tsx` → `clinicIcons` | 5 min |
| Enable/disable Hall of Fame | `Index.tsx` — uncomment/comment | 1 min |
| Change operating hours | `clinicData.ts` → `operating_hours` | 1 min |
| Add more FAQ items | `clinicData.ts` → `faqs` | 2 min |
| Add/change languages | `src/hooks/useI18n.tsx` | 30 min |

---

## 5. Things You Do NOT Need to Change

- ✅ All `src/components/ui/` components (shadcn/ui primitives)
- ✅ `src/lib/utils.ts`
- ✅ `src/hooks/` (i18n structure, mobile detection)
- ✅ `src/App.tsx` (router setup)
- ✅ Form validation schemas (Zod rules)
- ✅ Animation configurations (Framer Motion, ScrollReveal, AnimatedCounter)
- ✅ Dark mode toggle logic
- ✅ Cookie consent logic
- ✅ PWA service worker caching logic
- ✅ React dedupe config in `vite.config.ts`

---

## 6. Step-by-Step: New Client Setup

### Minute 0–5: Core Data & Pricing
1. Open `src/data/clinicData.ts`
2. Replace ALL fields including `treatment_price_list_inr` and `payment_options`

### Minute 5–10: Branding
3. Replace logo and hero images
4. Change colours in `src/index.css`

### Minute 10–15: Contact Info
5. Search `7996217888` → Replace with client's phone
6. Update EmailJS credentials

### Minute 15–20: SEO & Meta
7. Update `index.html` — title, description, OG tags
8. Update `vite.config.ts` — PWA manifest name

### Minute 20–30: Images & i18n (Optional)
9. Update gallery, team photos, hero slideshow
10. Update translations in `useI18n.tsx` if client needs different languages

### Done! 🎉

---

## Search-and-Replace Cheat Sheet

| Search For | Replace With | Files |
|---|---|---|
| `Acureatus` | Client name | Multiple |
| `7996217888` | Client phone | Header, Hero, FloatingCTA |
| `917996217888` | Client WhatsApp | ChatFormDialog, FloatingCTA |
| `acureatus@gmail.com` | Client email | ContactFormSection |
| `#002B5B` | Client primary hex | vite.config.ts, index.html |
| `Mangaluru` | Client city | Multiple |

---

*Last updated: March 2026*
