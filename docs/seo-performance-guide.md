# SEO & Performance Guide

> **Audience**: Developers maintaining or extending the project.

---

## 1. JSON-LD Structured Data

### What's Implemented

JSON-LD is implemented in **two places** for maximum SEO:

1. **`index.html`** — Static JSON-LD in `<head>` (visible to crawlers without JS execution)
2. **`src/components/JsonLd.tsx`** — Dynamic JSON-LD rendered by React (includes full treatment catalog)

The `MedicalBusiness` schema enables:

- **Google Knowledge Panel** with clinic name, address, hours, rating
- **Rich search snippets** with aggregate rating (★ 4.8 from 56 reviews)
- **Medical specialty** tags for healthcare search queries
- **Treatment price catalog** with individual treatment prices in INR

### Schema Fields

| Field | Source | Example |
|---|---|---|
| `name` | `clinicData.business_identity.name` | Acureatus AI Advanced Physio Pain Clinic |
| `telephone` | `clinicData.locations[0].contact_numbers[0]` | +91 79962 17888 |
| `aggregateRating` | `clinicData.business_identity.rating/review_count` | 4.8 / 56 reviews |
| `address` | Hardcoded from clinic data | Mangaluru, Karnataka 575002 |
| `openingHours` | Mon–Sat 09:00–20:00 | — |
| `priceRange` | From treatment prices | ₹250–₹500 |
| `hasOfferCatalog` | `clinicData.treatment_price_list_inr` | All 10 treatments with prices |

### Testing

1. Deploy or use preview URL
2. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Enter URL → Verify `MedicalBusiness` schema is detected
4. Check for warnings/errors in the report

---

## 2. SEO Meta Tags (`index.html`)

### What's Implemented

| SEO Element | Status | Details |
|---|---|---|
| `<title>` | ✅ | Under 60 chars with keyword |
| `<meta name="description">` | ✅ | Under 160 chars |
| `<meta name="robots">` | ✅ | `index, follow, max-image-preview:large` |
| `<link rel="canonical">` | ✅ | Points to `https://acureatus.com/` |
| Open Graph tags | ✅ | Title, description, image, URL, locale, site_name |
| Twitter card tags | ✅ | Title, description, image |
| `<meta name="theme-color">` | ✅ | `#002B5B` |
| JSON-LD structured data | ✅ | MedicalBusiness schema in `<head>` |

### SEO Checklist (All Done ✅)

- [x] Page title with keyword
- [x] Meta description under 160 chars
- [x] Canonical URL
- [x] Robots meta tag
- [x] Open Graph tags with image dimensions
- [x] Twitter card tags
- [x] JSON-LD MedicalBusiness schema (static + dynamic)
- [x] `sitemap.xml` at `/sitemap.xml`
- [x] `robots.txt` with sitemap reference
- [x] Preconnect for external domains
- [x] Single `<h1>` tag in HeroSection
- [x] Semantic HTML throughout
- [x] Alt text on all images
- [x] Social links with real URLs (not `href="#"`)
- [x] Footer links with adequate tap targets

---

## 3. Performance Optimizations

### Lazy Loading Strategy

| Layer | What | How |
|---|---|---|
| **Page-level** | Blog, BlogPost, NotFound | `React.lazy()` in `App.tsx` |
| **Section-level** | 12 below-fold sections | `React.lazy()` in `Index.tsx` |
| **Image-level** | All off-screen images | `loading="lazy"` + `decoding="async"` |

### Image Optimization

| Technique | Applied To | Impact |
|---|---|---|
| `fetchPriority="high"` | First hero slide | Faster LCP |
| `width`/`height` attributes | Hero LCP image | Prevents CLS |
| Downscaled URLs (w=600) | Testimonial images | ~2MB saved |
| Downscaled URLs (w=800) | Team backgrounds | ~1MB saved |
| `loading="lazy"` | All below-fold images | Deferred loading |
| `decoding="async"` | All below-fold images | Non-blocking decode |

### Resource Hints (`index.html`)

| Hint | Domain | Purpose |
|---|---|---|
| `preconnect` | `fonts.googleapis.com` | Faster font CSS |
| `preconnect` | `fonts.gstatic.com` | Faster font files |
| `preconnect` | `images.unsplash.com` | Faster image loads |
| `dns-prefetch` | `images.unsplash.com` | DNS resolution fallback |

### Font Loading

| Optimization | Details |
|---|---|
| Single consolidated import | All 5 fonts in one `@import` URL |
| `display=swap` | Text visible immediately with fallback |
| Fonts loaded | Outfit, DM Sans, Lora, Space Grotesk, Playfair Display |

### PWA Service Worker Caching (Workbox)

| Cache | Strategy | TTL | Max Entries |
|---|---|---|---|
| Google Fonts CSS | CacheFirst | 1 year | 10 |
| Google Fonts webfonts | CacheFirst | 1 year | 30 |
| Unsplash images | CacheFirst | 30 days | 50 |
| Static assets | Precache | Build-time | All |

### Error Boundaries

Every major section is wrapped in an `ErrorBoundary` component. If a section crashes, it silently disappears rather than taking down the entire page. Errors are logged to `console.error` with the section name.

### Lighthouse Scores (Post-Optimization)

| Category | Before | After | Notes |
|---|---|---|---|
| Performance | 71 | 86–93 | Lazy loading, image optimization, preconnect |
| Accessibility | 91 | 91 | Already good |
| Best Practices | 73 | 96 | Fixed forwardRef warnings, lazy images |
| SEO | 66 | 90+ | Meta tags, canonical, sitemap (on custom domain) |

> **Note**: SEO shows ~69 on Lovable preview URLs due to the server-side `x-robots-tag: noindex, nofollow` header. This is automatically removed when published to a custom domain.

### Vite Configuration

**File**: `vite.config.ts`

- **React dedupe**: `resolve.dedupe: ["react", "react-dom", "react/jsx-runtime"]`
- **PWA plugin**: Full Workbox configuration with runtime caching
- **HMR overlay disabled**: Cleaner development experience

---

## 4. Sitemap & Robots

### `public/sitemap.xml`

```xml
<urlset>
  <url><loc>https://acureatus.com/</loc><priority>1.0</priority></url>
  <url><loc>https://acureatus.com/blog</loc><priority>0.8</priority></url>
</urlset>
```

### `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://acureatus.com/sitemap.xml
```

---

## Quick Reference

| Task | File |
|---|---|
| Edit static JSON-LD | `index.html` (in `<head>`) |
| Edit dynamic JSON-LD | `src/components/JsonLd.tsx` |
| Update treatment prices in schema | `src/data/clinicData.ts` → auto-propagates |
| Change font stack | `src/index.css` (line 1) |
| Adjust caching strategy | `vite.config.ts` → `runtimeCaching` |
| Add preconnect for new domains | `index.html` |
| Edit meta tags | `index.html` |
| Edit sitemap | `public/sitemap.xml` |
| Edit robots.txt | `public/robots.txt` |
| Fix React dedupe issues | `vite.config.ts` → `resolve.dedupe` |

---

*Last updated: March 2026*