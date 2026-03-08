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
| `priceRange` | From treatment prices | ₹250–₹500 |
| `hasOfferCatalog` | `clinicData.treatment_price_list_inr` | All 10 treatments with prices |

### Treatment Prices in Schema

The JSON-LD schema includes all treatments as an `OfferCatalog`:

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

### Testing

1. Deploy or use preview URL
2. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Enter URL → Verify `MedicalBusiness` schema is detected
4. Check for warnings/errors in the report

---

## 2. Performance Optimizations

### Vite Configuration

**File**: `vite.config.ts`

- **React dedupe**: `resolve.dedupe: ["react", "react-dom", "react/jsx-runtime"]` — prevents duplicate React instances from causing "Component is not a function" errors
- **Route-level code splitting**: Pages lazy-loaded with `React.lazy()` + `Suspense`

### Font Loading

| Optimization | Impact |
|---|---|
| Consolidated font imports | Reduced from 6 HTTP requests to 1 |
| `display=swap` | Text visible immediately with fallback font |
| Removed unused fonts | Smaller CSS payload |
| Fonts retained | Outfit, DM Sans |

### DNS Prefetch

**File**: `index.html`

Added `<link rel="dns-prefetch">` for `images.unsplash.com` to resolve DNS early for gallery images.

### PWA Service Worker Caching

**File**: `vite.config.ts`

| Cache | Strategy | TTL |
|---|---|---|
| Google Fonts CSS | CacheFirst | 1 year |
| Google Fonts webfonts | CacheFirst | 1 year |
| Unsplash images | CacheFirst | 30 days |

### Performance Metrics (Dev Mode)

| Metric | Value | Status |
|---|---|---|
| DOM Nodes | ~3,500 | ✅ Moderate |
| JS Heap | ~17 MB | ✅ Lightweight |
| Scripts | ~1.1 MB (dev) | ✅ Normal (200–300 KB in prod) |

### Image Optimization Checklist

- [ ] Convert large JPGs/PNGs to WebP format
- [ ] Use `<picture>` with WebP + fallback
- [ ] Add `width`/`height` attributes to prevent layout shift
- [ ] Use `LazyImage` component for all external images
- [ ] Reduce Unsplash quality params (`&q=60&w=800`)

---

## Quick Reference

| Task | File |
|---|---|
| Edit JSON-LD schema | `src/components/JsonLd.tsx` |
| Update treatment prices in schema | `src/data/clinicData.ts` → auto-propagates |
| Change font stack | `src/index.css` (line 1) |
| Adjust caching strategy | `vite.config.ts` → `runtimeCaching` |
| Add DNS prefetch for new domains | `index.html` |
| Fix React dedupe issues | `vite.config.ts` → `resolve.dedupe` |

---

*Last updated: March 2026*
