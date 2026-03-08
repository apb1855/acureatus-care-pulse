# Service Details, Reviews & Microinteractions Guide

> **Audience**: Developers maintaining or extending the project.

---

## 1. Service Detail Pages (Expandable Dialogs)

### What's Implemented

Each specialized clinic card in the **Services** section now opens a rich detail dialog with:
- Clinic description and focus area
- Hero image
- **Detailed "About This Clinic"** paragraph
- **Key Treatments** as pill badges
- **Typical Duration** info box
- **"Book Consultation"** CTA that links to the contact form

### Data Source

**File**: `src/data/clinicData.ts` → `specialized_clinics[]`

### Current Specialized Clinics

| # | Clinic | Focus | Duration |
|---|---|---|---|
| 1 | The Shoulder Clinic | Frozen Shoulder & Scapular Imbalance | 6–12 weeks |
| 2 | Robotic Spine Center | Sciatica, Lumbar Spondylitis, Disc Herniation | 8–16 weeks |
| 3 | Neuro-Rehab Wing | Stroke Recovery & Bell's Palsy | Ongoing, milestone-based |
| 4 | Athletic Performance Lab | Professional Athletes & Swimmers | Ongoing programs |
| 5 | Post-Amputation Clinic | Prosthetic Training (Ottobock partner) | 12–24 weeks |

### Adding a New Specialized Clinic

```ts
// In src/data/clinicData.ts → specialized_clinics array:
{
  title: "New Clinic Name",
  focus: "Short description",
  details: "Longer paragraph about what this clinic does...",
  treatments: ["Treatment A", "Treatment B", "Treatment C"],
  duration: "8-12 weeks typical",
}
```

Then add a matching icon and image in `src/components/ServicesSection.tsx` arrays.

---

## 2. Treatment Pricing

### Current Price List (INR)

All prices are managed in `src/data/clinicData.ts` → `treatment_price_list_inr`:

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

**Payment methods**: Google Pay, UPI, Cash

### How Pricing Renders

- `PricingSection.tsx` renders the table from `clinicData.treatment_price_list_inr`
- `JsonLd.tsx` includes prices in the `hasOfferCatalog` for Google rich results
- `PricingSection.tsx` shows payment badges from `clinicData.payment_options`

---

## 3. Google Reviews Widget

### Component

**File**: `src/components/GoogleReviewsSection.tsx`

Displays a grid of Google Business reviews with star ratings, reviewer names, and dates. Shows the aggregate rating (4.7★ from 56 reviews) with a link to view all reviews on Google.

### Current Implementation: Static Reviews

The reviews are currently **hardcoded** in the component. For live Google reviews, you'd need:
1. Google Places API key
2. An edge function to fetch reviews server-side
3. Caching to avoid API rate limits

### Translation Keys

| Key | EN | KN |
|---|---|---|
| `reviews.title` | What Our Patients Say | ನಮ್ಮ ರೋಗಿಗಳು ಏನು ಹೇಳುತ್ತಾರೆ |
| `reviews.reviewsOn` | reviews on Google | Google ನಲ್ಲಿ ವಿಮರ್ಶೆಗಳು |
| `reviews.viewOnGoogle` | View all reviews on Google | Google ನಲ್ಲಿ ಎಲ್ಲಾ ವಿಮರ್ಶೆಗಳನ್ನು ನೋಡಿ |

---

## 4. Microinteractions

### Team Cards

| Effect | Implementation |
|---|---|
| **Hover lift** | `whileHover={{ y: -8, scale: 1.02 }}` via Framer Motion |
| **Tap feedback** | `whileTap={{ scale: 0.98 }}` |
| **Spring physics** | `type: "spring", stiffness: 300, damping: 20` |

### Service Cards (BentoGrid)

| Effect | Implementation |
|---|---|
| **Hover lift** | `hover:-translate-y-1` |
| **Icon color shift** | `group-hover:text-secondary` |
| **CTA arrow slide** | `group-hover:translate-x-1` on ArrowRightIcon |

### Review Cards

| Effect | Implementation |
|---|---|
| **Hover lift** | `whileHover={{ y: -4, scale: 1.01 }}` |
| **Staggered reveal** | `ScrollReveal` with `delay={i * 0.1}` |

---

## Quick Reference

| Task | File |
|---|---|
| Edit clinic details | `src/data/clinicData.ts` → `specialized_clinics` |
| Edit treatment prices | `src/data/clinicData.ts` → `treatment_price_list_inr` |
| Edit payment methods | `src/data/clinicData.ts` → `payment_options` |
| Edit service dialog layout | `src/components/ui/bento-grid.tsx` → `BentoCard` |
| Edit/add Google reviews | `src/components/GoogleReviewsSection.tsx` |
| Add review translations | `src/hooks/useI18n.tsx` → `reviews.*` |
| Modify team card hover effects | `src/components/ui/retro-testimonial.tsx` |

---

*Last updated: March 2026*
