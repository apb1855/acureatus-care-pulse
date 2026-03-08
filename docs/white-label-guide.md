# Acureatus — White-Label / Multi-Customer Guide

> **Audience**: Developers or agency owners who want to reuse this codebase for different clinic or business clients with minimal changes.
> This guide lists **every file you need to touch** and exactly what to change.

---

## Table of Contents

1. [Overview — What Makes This Reusable](#1-overview)
2. [Quick Checklist (15-Minute Handoff)](#2-quick-checklist)
3. [Detailed File-by-File Changes](#3-detailed-file-by-file-changes)
4. [Optional Customisations](#4-optional-customisations)
5. [Things You Do NOT Need to Change](#5-things-you-do-not-need-to-change)
6. [Step-by-Step: New Client Setup](#6-step-by-step-new-client-setup)

---

## 1. Overview

This project is built as a **single data-source architecture**. Almost all business-specific content (name, address, phone, services, pricing) lives in **one data file**. The components read from that file dynamically.

This means: **change the data → the entire site updates**.

### Architecture diagram

```
src/data/clinicData.ts    ← ALL business content lives here
        ↓
  Components read from it
        ↓
  Website renders dynamically
```

**Additional changes needed**:
- Branding (logo, colours, fonts)
- Images (hero, gallery, team photos)
- Contact integrations (WhatsApp number, EmailJS)
- Meta tags (SEO title, description)

---

## 2. Quick Checklist

Use this checklist for every new client. Estimated time: **15–30 minutes**.

| # | Task | File | Priority |
|---|---|---|---|
| 1 | Replace all business data | `src/data/clinicData.ts` | 🔴 Must |
| 2 | Replace logo image | `src/assets/acureatus-logo.png` | 🔴 Must |
| 3 | Replace hero background | `src/assets/hero-bg.jpg` | 🔴 Must |
| 4 | Update page title & meta tags | `index.html` | 🔴 Must |
| 5 | Update WhatsApp number | `src/components/ChatFormDialog.tsx` | 🔴 Must |
| 6 | Update phone number in header/hero | `src/components/Header.tsx`, `HeroSection.tsx` | 🔴 Must |
| 7 | Change brand colours | `src/index.css` (`:root` + `.dark`) | 🟡 Should |
| 8 | Change fonts | `src/index.css` + `tailwind.config.ts` | 🟡 Should |
| 9 | Replace gallery images | `src/components/GallerySection.tsx` | 🟡 Should |
| 10 | Replace team photos | `src/components/TeamSection.tsx` | 🟡 Should |
| 11 | Update hero slideshow images | `src/components/HeroSection.tsx` | 🟡 Should |
| 12 | Setup EmailJS for client | `src/components/ContactFormSection.tsx` | 🟡 Should |
| 13 | Update PWA manifest | `vite.config.ts` | 🟢 Nice |
| 14 | Replace PWA icons | `public/pwa-192x192.png`, `public/pwa-512x512.png` | 🟢 Nice |
| 15 | Update OG image | `index.html` | 🟢 Nice |
| 16 | Update favicon | `public/favicon.ico` | 🟢 Nice |

---

## 3. Detailed File-by-File Changes

### 3.1 `src/data/clinicData.ts` — THE MAIN FILE

This is the **single source of truth** for all business content. Change everything here first.

```ts
export const clinicData = {
  business_identity: {
    name: "NEW CLIENT NAME",                    // ← Business name
    branding_tagline: "Their tagline here",     // ← Tagline shown in hero & footer
    initiative_of: ["Parent Company Name"],     // ← Parent org (or remove)
    rating: 4.8,                                // ← Google rating
    review_count: 120,                          // ← Review count
    established_approx: "5 years",              // ← How long in business
  },

  locations: [
    {
      branch_name: "Main Branch",
      address: "Full address here",             // ← Address shown in footer & contact
      landmark: "Near Something",
      google_maps_url: "https://maps.google.com/?q=...",  // ← Google Maps link
      coordinates_placeholder: "lat, lng",
      contact_numbers: ["+91 XXXXX XXXXX"],     // ← Phone numbers
      accessibility: {
        wheelchair_elevator: true,
        wheelchair_seating: true,
        wheelchair_restroom: true,
      },
    },
    // Add more branches or remove this array item
  ],

  operating_hours: {
    monday_to_saturday: "09:00 AM - 06:00 PM", // ← Business hours
    sunday: "Closed",
    appointment_required: true,
  },

  medical_team: [
    // ← Add/remove team members
    { name: "Dr. Name", credentials: "MBBS", role: "Director", specialization: "..." },
  ],

  core_pillars: ["Pillar 1", "Pillar 2", "Pillar 3", "Pillar 4"],  // ← Core services

  specialized_clinics: [
    // ← Add/remove service cards
    { title: "Service Name", focus: "Description" },
  ],

  advanced_technology: [
    // ← List of technologies/equipment
    "Technology 1", "Technology 2",
  ],

  treatment_price_list_inr: [
    // ← Pricing table
    { item: "Service Name", price: 500 },
    { item: "Another Service", price_range: "250 - 500" },
  ],

  hall_of_fame: {
    // ← Achievement highlight (or set to null if not needed)
    athlete: "Name",
    achievement: "Achievement description",
    clinic_role: "What you did",
  },

  payment_options: ["Google Pay", "UPI", "Cash", "Card"],  // ← Payment methods

  faqs: [
    // ← Frequently asked questions
    { q: "Question?", a: "Answer." },
  ],
};
```

**After changing this file**, the following sections auto-update:
- Hero (name, tagline, rating)
- Pillars
- Services / Specialized Clinics
- Pricing table
- Team section
- Contact section (address, phone, hours)
- FAQ section
- Footer (address, phone, tagline)

---

### 3.2 `index.html` — Page Title & SEO

```html
<!-- Line 7 -->
<title>NEW CLIENT NAME | City</title>

<!-- Line 8 -->
<meta name="description" content="Description of the new client's business..." />

<!-- Line 9 -->
<meta name="author" content="New Client" />

<!-- Line 11 -->
<meta property="og:title" content="NEW CLIENT NAME" />

<!-- Line 12 -->
<meta property="og:description" content="Their tagline or description" />

<!-- Line 14 — Replace with client's OG image URL -->
<meta property="og:image" content="https://..." />

<!-- Line 18 — Same image for Twitter -->
<meta name="twitter:image" content="https://..." />
```

---

### 3.3 `src/assets/` — Logo & Hero Image

| File | What | Format | Size Recommendation |
|---|---|---|---|
| `acureatus-logo.png` | Business logo | PNG (transparent bg) | 200–400px wide |
| `hero-bg.jpg` | Hero background image | JPG | 1920×1080, under 300KB |

**To replace**: Simply swap the files keeping the same filename. Or rename and update the import:

```tsx
// src/components/Header.tsx — logo import
import logo from "@/assets/new-logo.png";

// src/components/HeroSection.tsx — hero image
import heroBg from "@/assets/new-hero.jpg";
```

---

### 3.4 WhatsApp Number

Search the codebase for `917996217888` and replace with the new number.

**Files to update**:

| File | What to Change |
|---|---|
| `src/components/ChatFormDialog.tsx` | WhatsApp API URL: `wa.me/91XXXXXXXXXX` |
| `src/components/FloatingCTA.tsx` | Any direct WhatsApp links |

**Format**: Country code + number, no `+` or spaces. Example: `919876543210`

---

### 3.5 Phone Number in Header & Hero

```tsx
// src/components/Header.tsx — Search for:
href="tel:+917996217888"
// Replace with new number

// src/components/HeroSection.tsx — Search for:
href="tel:+917996217888"
// Replace with new number
```

**Tip**: Search the entire codebase for `7996217888` to find all instances.

---

### 3.6 Brand Colours — `src/index.css`

Open `src/index.css` and change the HSL values in **both** `:root` (light) and `.dark` (dark) blocks.

**Key tokens to change**:

```css
:root {
  --primary: 213 100% 19%;        /* ← Main brand colour */
  --primary-foreground: 0 0% 100%; /* ← Text on brand colour */
  --secondary: 197 71% 73%;       /* ← Accent colour */
  --navy: 213 100% 19%;           /* ← Custom navy token */
  --sky: 197 71% 73%;             /* ← Custom sky/teal token */
  --gold: 45 93% 58%;             /* ← Highlight colour */
}
```

**Also update** the hardcoded HSL in `HeroSection.tsx` (hero overlay):
```tsx
// Search for: hsl(213,100%,19%)
// Replace with your new primary colour HSL
```

**How to convert a hex colour to HSL**:
1. Go to [convertacolor.com](https://convertacolor.com/)
2. Enter the hex (e.g., `#1a5c2e` for green)
3. Copy the HSL values (e.g., `140 55% 23%`)
4. Paste into `index.css` without the `hsl()` wrapper

---

### 3.7 Fonts — `src/index.css` + `tailwind.config.ts`

**Step 1** — Choose fonts from [Google Fonts](https://fonts.google.com/)

**Step 2** — Replace the `@import` at the top of `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=NEW+DISPLAY+FONT:wght@400;500;600;700&family=NEW+BODY+FONT:wght@300;400;500;600;700&display=swap');
```

**Step 3** — Update `tailwind.config.ts`:
```ts
fontFamily: {
  display: ["New Display Font", "sans-serif"],
  body: ["New Body Font", "sans-serif"],
}
```

---

### 3.8 Gallery Images — `src/components/GallerySection.tsx`

Replace the Unsplash URLs with actual client photos:

```tsx
const galleryImages = [
  { title: "Description", url: "https://client-photo-1.jpg" },
  { title: "Description", url: "https://client-photo-2.jpg" },
  // ...
];
```

**Tip**: Use images sized at 600×600px for the gallery grid.

---

### 3.9 Team Photos — `src/components/TeamSection.tsx`

Replace the placeholder Unsplash URLs:

```tsx
const teamBackgrounds: Record<string, string> = {
  "Dr. New Name": "https://actual-photo-url.jpg",
  // ...
};

const teamProfileImages: Record<string, string> = {
  "Dr. New Name": "https://actual-headshot-url.jpg",
  // ...
};
```

**Important**: The keys must match the `name` field in `clinicData.medical_team`.

---

### 3.10 Hero Slideshow — `src/components/HeroSection.tsx`

```tsx
const heroImages = [
  heroBg,  // Local asset (src/assets/hero-bg.jpg)
  "https://client-photo-1.jpg",
  "https://client-photo-2.jpg",
  "https://client-photo-3.jpg",
];
```

---

### 3.11 EmailJS — `src/components/ContactFormSection.tsx`

Each client needs their own EmailJS account:

```ts
const EMAILJS_SERVICE_ID = "client_service_id";
const EMAILJS_TEMPLATE_ID = "client_template_id";
const EMAILJS_PUBLIC_KEY = "client_public_key";
```

And update the recipient email:
```tsx
to_email: "client@email.com",
```

---

### 3.12 PWA Manifest — `vite.config.ts`

```ts
manifest: {
  name: "New Client Business Name",
  short_name: "ClientName",
  description: "Client description",
  theme_color: "#002B5B",      // ← Match primary colour (hex)
  background_color: "#F5F7FA",
},
```

Also update:
- `public/pwa-192x192.png` — Client's app icon
- `public/pwa-512x512.png` — Larger version

---

### 3.13 Footer Social Links — `src/components/Footer.tsx`

Update social media URLs:

```tsx
const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/CLIENT", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/CLIENT", icon: Instagram },
  // ...
];
```

---

## 4. Optional Customisations

These are **not required** but add a personal touch:

| Customisation | File | Effort |
|---|---|---|
| Change number of pillars (3 or 5 instead of 4) | `clinicData.ts` → `core_pillars` | 1 min |
| Add/remove service cards | `clinicData.ts` → `specialized_clinics` | 2 min |
| Change service card icons | `ServicesSection.tsx` → `clinicIcons` | 5 min |
| Enable/disable Hall of Fame section | `Index.tsx` — uncomment/comment the line | 1 min |
| Change operating hours | `clinicData.ts` → `operating_hours` | 1 min |
| Add more FAQ items | `clinicData.ts` → `faqs` | 2 min |
| Change FAB button actions | `FloatingCTA.tsx` | 5 min |
| Add/remove payment methods | `clinicData.ts` → `payment_options` | 1 min |
| Change cookie banner text | `CookieConsent.tsx` | 2 min |

---

## 5. Things You Do NOT Need to Change

These are reusable as-is across all clients:

- ✅ All `src/components/ui/` components (shadcn/ui primitives)
- ✅ `src/lib/utils.ts`
- ✅ `src/hooks/`
- ✅ `tailwind.config.ts` (structure — only change fontFamily/colours)
- ✅ `vite.config.ts` (structure — only change manifest name)
- ✅ `src/App.tsx` (router setup)
- ✅ `src/main.tsx` (entry point)
- ✅ Form validation schemas (Zod rules)
- ✅ Animation configurations (Framer Motion)
- ✅ Dark mode toggle logic
- ✅ Cookie consent logic
- ✅ PWA service worker caching logic

---

## 6. Step-by-Step: New Client Setup

### Minute 0–5: Core Data
1. Open `src/data/clinicData.ts`
2. Replace ALL fields with client's information
3. Save

### Minute 5–10: Branding
4. Replace `src/assets/acureatus-logo.png` with client's logo
5. Replace `src/assets/hero-bg.jpg` with client's hero image
6. Open `src/index.css` → Change primary/secondary HSL colours
7. (Optional) Change fonts

### Minute 10–15: Contact Info
8. Search codebase for `7996217888` → Replace with client's phone
9. Search for `917996217888` → Replace with client's WhatsApp number
10. Update EmailJS credentials in `ContactFormSection.tsx`

### Minute 15–20: SEO & Meta
11. Update `index.html` — title, description, OG tags
12. Update `vite.config.ts` — PWA manifest name
13. Replace `public/pwa-192x192.png` and `public/pwa-512x512.png`
14. Replace `public/favicon.ico`

### Minute 20–30: Images (Optional)
15. Update hero slideshow images in `HeroSection.tsx`
16. Update gallery images in `GallerySection.tsx`
17. Update team photos in `TeamSection.tsx`
18. Update footer social links in `Footer.tsx`

### Done! 🎉

---

## Search-and-Replace Cheat Sheet

These are all the hardcoded values you need to find and replace:

| Search For | Replace With | Files |
|---|---|---|
| `Acureatus` | Client name | Multiple files |
| `acureatus` | Client name (lowercase) | Multiple files |
| `7996217888` | Client phone | Header, Hero, FloatingCTA |
| `917996217888` | Client WhatsApp (with country code) | ChatFormDialog, FloatingCTA |
| `acureatus@gmail.com` | Client email | ContactFormSection |
| `hsl(213,100%,19%)` | Client primary colour HSL | HeroSection |
| `#002B5B` | Client primary colour hex | vite.config.ts, index.html |
| `Mangaluru` | Client city | Multiple files |
| `Karnataka 575002` | Client postal code | clinicData.ts |

---

*Last updated: March 2026*
