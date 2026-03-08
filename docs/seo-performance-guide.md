# SEO & Performance Guide

> **Audience**: Developers maintaining or extending the project.

---

## 1. JSON-LD Structured Data

### What's Implemented

**File**: `src/components/JsonLd.tsx`

The app injects a `MedicalBusiness` JSON-LD schema into the page `<head>` for Google rich results. This enables:

- **Google Knowledge Panel** with clinic name, address, hours, rating
- **Rich search snippets** with aggregate rating (★ 4.7 from 56 reviews)
- **Medical specialty** tags for healthcare search queries
- **Treatment price catalog** with individual treatment prices in INR

### Schema Fields

| Field | Source | Example |
|---|---|---|
| `name` | `clinicData.business_identity.name` | Acureatus AI Advanced Physio Pain Clinic |
| `telephone` | `clinicData.locations[0].contact_numbers[0]` | +91 79962 17888 |
| `aggregateRating` | `clinicData.business_identity.rating/review_count` | 4.7 / 56 reviews |
| `address` | Hardcoded from clinic data | Mangaluru, Karnataka 575002 |
| `openingHours` | Mon–Sat 09:00–20:00 | — |
| `hasOfferCatalog` | `clinicData.treatment_price_list_inr` | All treatments with prices |
| `medicalSpecialty` | Static list | Physiotherapy, Rehabilitation, etc. |

### Testing

1. Deploy or use preview URL
2. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Enter URL → Verify `MedicalBusiness` schema is detected
4. Check for warnings/errors in the report

### Updating

- Clinic data changes in `clinicData.ts` auto-propagate to the schema
- To add social links: Add URLs to the `sameAs` array
- To add FAQPage schema: Create a separate `FaqJsonLd.tsx` component

---

## 2. Performance Optimizations

### Font Loading

**Before**: 6 separate Google Fonts `@import` requests (sequential, render-blocking)
**After**: 1 consolidated request with `display=swap`

| Optimization | Impact |
|---|---|
| Consolidated font imports | Reduced from 6 HTTP requests to 1 |
| `display=swap` | Text visible immediately with fallback font |
| Removed unused fonts (Inter, Space Mono) | Smaller CSS payload |

**Fonts retained**: Outfit, DM Sans, Lora, Space Grotesk

### Route-Level Code Splitting

**File**: `src/App.tsx`

Pages are lazy-loaded with `React.lazy()` + `Suspense`:

```tsx
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
```

This means the 404 page bundle is only downloaded when a user hits a bad route.

### DNS Prefetch

**File**: `index.html`

Added `<link rel="dns-prefetch">` for `images.unsplash.com` to resolve DNS early for gallery images.

### PWA Service Worker Caching

**File**: `vite.config.ts` (already configured)

| Cache | Strategy | TTL |
|---|---|---|
| Google Fonts CSS | CacheFirst | 1 year |
| Google Fonts webfonts | CacheFirst | 1 year |
| Unsplash images | CacheFirst | 30 days |

### Image Optimization Checklist

For future optimization:
- [ ] Convert large JPGs/PNGs to WebP format
- [ ] Use `<picture>` with WebP + fallback
- [ ] Add `width`/`height` attributes to prevent layout shift
- [ ] Use `LazyImage` component for all external images (see features-guide.md)

---

## Quick Reference

| Task | File |
|---|---|
| Edit JSON-LD schema | `src/components/JsonLd.tsx` |
| Add new schema type (FAQPage, etc.) | Create new component, add to `App.tsx` |
| Change font stack | `src/index.css` (line 1) |
| Adjust caching strategy | `vite.config.ts` → `runtimeCaching` |
| Add DNS prefetch for new domains | `index.html` |

---

*Last updated: March 2026*
