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

Each clinic now has additional fields:

| Field | Type | Description |
|---|---|---|
| `details` | `string` | Long-form description of the clinic |
| `treatments` | `string[]` | List of key treatments offered |
| `duration` | `string` | Typical recovery/program duration |

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

### Component Flow

```
User hovers on BentoCard → Card lifts up, icon shifts color
       ↓
User clicks "View More" → Dialog opens with full details
       ↓
User clicks "Book Consultation" → Dialog closes, scrolls to #contact-form
```

---

## 2. Google Reviews Widget

### Component

**File**: `src/components/GoogleReviewsSection.tsx`

Displays a grid of Google Business reviews with star ratings, reviewer names, and dates. Shows the aggregate rating (4.7★) with a link to view all reviews on Google.

### Current Implementation: Static Reviews

The reviews are currently **hardcoded** in the component. For live Google reviews, you'd need:
1. Google Places API key
2. An edge function to fetch reviews server-side
3. Caching to avoid API rate limits

### Review Data Structure

```ts
{
  name: "Reviewer Name",
  rating: 5,           // 1-5 stars
  date: "2 weeks ago", // Relative date string
  text: "Review text...",
  avatar: "A",         // First letter for avatar
}
```

### Adding/Editing Reviews

Edit the `googleReviews` array in `src/components/GoogleReviewsSection.tsx`. Each review card:
- Shows avatar initial in a colored circle
- Displays star rating
- Animates on scroll with staggered delay
- Lifts on hover

### Translation Keys

| Key | EN | KN |
|---|---|---|
| `reviews.title` | What Our Patients Say | ನಮ್ಮ ರೋಗಿಗಳು ಏನು ಹೇಳುತ್ತಾರೆ |
| `reviews.reviewsOn` | reviews on Google | Google ನಲ್ಲಿ ವಿಮರ್ಶೆಗಳು |
| `reviews.viewOnGoogle` | View all reviews on Google | Google ನಲ್ಲಿ ಎಲ್ಲಾ ವಿಮರ್ಶೆಗಳನ್ನು ನೋಡಿ |

### Upgrading to Live Reviews (Future)

1. Enable Lovable Cloud
2. Create an edge function that calls Google Places API
3. Cache results in a database table (refresh daily)
4. Replace the static array with a `useQuery` fetch

---

## 3. Microinteractions

### Team Cards

**File**: `src/components/ui/retro-testimonial.tsx`

| Effect | Implementation |
|---|---|
| **Hover lift** | `whileHover={{ y: -8, scale: 1.02 }}` via Framer Motion |
| **Tap feedback** | `whileTap={{ scale: 0.98 }}` |
| **Spring physics** | `type: "spring", stiffness: 300, damping: 20` |
| **Glow shadow** | `hover:shadow-xl hover:shadow-primary/10` |
| **Border highlight** | `hover:border-primary/30` |

### Service Cards (BentoGrid)

**File**: `src/components/ui/bento-grid.tsx`

| Effect | Implementation |
|---|---|
| **Hover lift** | `hover:-translate-y-1` |
| **Icon color shift** | `group-hover:text-secondary` |
| **CTA arrow slide** | `group-hover:translate-x-1` on ArrowRightIcon |
| **Background dim** | `group-hover:bg-foreground/[.03]` overlay |

### Review Cards

**File**: `src/components/GoogleReviewsSection.tsx`

| Effect | Implementation |
|---|---|
| **Hover lift** | `whileHover={{ y: -4, scale: 1.01 }}` |
| **Staggered reveal** | `ScrollReveal` with `delay={i * 0.1}` |

### Adding Microinteractions to New Components

Use Framer Motion's gesture props:

```tsx
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {/* content */}
</motion.div>
```

Or use Tailwind for simpler effects:

```tsx
<div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  {/* content */}
</div>
```

---

## Quick Reference

| Task | File |
|---|---|
| Edit clinic details | `src/data/clinicData.ts` → `specialized_clinics` |
| Edit service dialog layout | `src/components/ui/bento-grid.tsx` → `BentoCard` |
| Edit/add Google reviews | `src/components/GoogleReviewsSection.tsx` |
| Add review translations | `src/hooks/useI18n.tsx` → `reviews.*` |
| Modify team card hover effects | `src/components/ui/retro-testimonial.tsx` → `TestimonialCard` |

---

*Last updated: March 2026*
