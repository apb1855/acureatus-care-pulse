# Acureatus — SEO, Domain, Deployment & Cookies Guide

> **Audience**: Junior developers and site owners.
> This guide covers how to get the website found on Google, buy a domain, deploy, handle cookies, and how theme/language storage works.

---

## Table of Contents

1. [SEO Optimization](#1-seo-optimization)
2. [Google Search Console & Listings](#2-google-search-console--listings)
3. [Domain — Finding, Buying & Managing](#3-domain--finding-buying--managing)
4. [Deployment Options](#4-deployment-options)
5. [Cookies & Local Storage](#5-cookies--local-storage)
6. [How Theme & Language Preferences are Stored](#6-how-theme--language-preferences-are-stored)

---

## 1. SEO Optimization

### What's Already Done

| SEO Element | Status | Location |
|---|---|---|
| Page title (`<title>`) | ✅ | `index.html` |
| Meta description | ✅ | `index.html` |
| Meta robots (`index, follow`) | ✅ | `index.html` |
| Canonical URL | ✅ | `index.html` |
| Open Graph tags (with image dimensions) | ✅ | `index.html` |
| Twitter card tags | ✅ | `index.html` |
| Single `<h1>` tag | ✅ | `HeroSection.tsx` |
| Semantic HTML | ✅ | All components |
| Alt text on images (including hero LCP) | ✅ | Throughout |
| `robots.txt` with sitemap reference | ✅ | `public/robots.txt` |
| `sitemap.xml` | ✅ | `public/sitemap.xml` |
| Responsive viewport | ✅ | `index.html` |
| PWA manifest | ✅ | `vite.config.ts` |
| **JSON-LD in static HTML** | ✅ | `index.html` `<head>` |
| **JSON-LD dynamic (React)** | ✅ | `JsonLd.tsx` |
| **Treatment price catalog in schema** | ✅ | 10 treatments, ₹250–₹500 |
| **Aggregate rating in schema** | ✅ | 4.8★ from 56 reviews |
| **Preconnect hints** | ✅ | Google Fonts + Unsplash |
| **Social links with real URLs** | ✅ | Footer (Facebook, Instagram, YouTube, LinkedIn) |
| **Adequate tap targets** | ✅ | Footer links have padding |

### Lighthouse Scores

| Category | Score | Notes |
|---|---|---|
| Performance | 86–93 | Lazy loading, image optimization |
| Accessibility | 91 | ARIA labels, landmarks, skip-to-content |
| Best Practices | 96 | No console errors, proper image loading |
| SEO | 90+ | All checks pass on custom domain |

> **Important**: SEO shows ~69 on Lovable preview/staging URLs because of the server-side `x-robots-tag: noindex, nofollow` header. This is expected and removed on published custom domains.

### SEO Checklist — All Complete ✅

- [x] Page title under 60 chars with keyword
- [x] Meta description under 160 chars
- [x] Canonical URL
- [x] Robots meta tag
- [x] Open Graph tags with `og:url`, `og:locale`, `og:site_name`, image dimensions
- [x] Twitter card tags
- [x] JSON-LD MedicalBusiness schema (static in HTML + dynamic in React)
- [x] `sitemap.xml` with homepage and blog
- [x] `robots.txt` with sitemap reference
- [x] Preconnect for fonts and images
- [x] All links crawlable (no `href="#"` links)
- [x] All images have alt text
- [x] Hero LCP image has `fetchPriority="high"` and `width`/`height`

---

## 2. Google Search Console & Listings

### Step 1 — Google Search Console (Free)

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add property → URL prefix → Enter `https://acureatus.com`
3. Verify ownership (HTML tag or DNS record)
4. Submit sitemap: `https://acureatus.com/sitemap.xml`
5. Monitor indexing and search performance

### Step 2 — Google Business Profile (Essential for Local SEO)

1. Go to [Google Business Profile](https://www.google.com/business/)
2. Business name: **Acureatus AI Advanced Physio Pain Clinic**
3. Category: **Physiotherapy Clinic**
4. Add address, phone (+91 79962 17888), hours (Mon–Sat 9AM–8PM)
5. Verify with postcard (5–14 days)
6. Add photos, respond to reviews

### Step 3 — Other Platforms

| Platform | Why |
|---|---|
| Bing Places | Bing search results |
| Justdial | Popular in India |
| Practo | Healthcare-specific (India) |
| Facebook Page | Social presence |
| Instagram Business | Visual content |

---

## 3. Domain — Finding, Buying & Managing

### Recommended Domains

- `acureatus.in` (₹199–₹799/year)
- `acureatus.com` (₹599–₹1,200/year)

### Where to Buy

| Provider | Price (INR/year) | .in Support |
|---|---|---|
| Hostinger | ₹149–₹899 | ✅ |
| BigRock | ₹199–₹999 | ✅ |
| GoDaddy | ₹499–₹1,200 | ✅ |
| Namecheap | ₹599–₹999 | ❌ |

### Connect Domain

1. DNS settings → Add CNAME record pointing to deployment URL
2. Wait for propagation (15 min – 48 hours)
3. SSL is automatic on Lovable, Vercel, Netlify

---

## 4. Deployment Options

| Feature | Lovable | Vercel | Netlify | Hostinger |
|---|---|---|---|---|
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Free tier | ✅ | ✅ | ✅ | ❌ |
| Custom domain | ✅ | ✅ | ✅ | ✅ |
| Auto SSL | ✅ | ✅ | ✅ | ✅ |
| Auto-deploy from Git | ❌ | ✅ | ✅ | ❌ |
| CDN | ✅ | ✅ | ✅ | ❌ |

**Recommendation**: Start with **Lovable Publish**. Move to **Vercel** when you need CI/CD.

---

## 5. Cookies & Local Storage

### Data Stored on User's Device

| Key | Value | Purpose |
|---|---|---|
| `theme` | `"light"` / `"dark"` | Dark mode preference |
| `locale` | `"en"` / `"kn"` | Language preference |
| `cookie-consent` | `"accepted"` / `"declined"` | Consent choice |
| `cookie-consent-date` | ISO date | When consent was given |

### Cookie Consent Banner

```
User visits → 1.5s delay → Banner appears
      ↓
"Accept All" or "Essential Only"
      ↓
Saved to localStorage → Banner never shows again
```

### Adding Google Analytics (Future)

```html
<script>
  if (localStorage.getItem('cookie-consent') === 'accepted') {
    // Load GA script
  }
</script>
```

---

## 6. How Theme & Language Preferences are Stored

### Theme Toggle

- `ThemeToggle.tsx` adds/removes `dark` class on `<html>`
- Saved to `localStorage` as `theme`
- Tailwind's `darkMode: ["class"]` detects it
- Smooth transition on `body`

### Language Switcher

- `LanguageSwitcher.tsx` toggles between `en` and `kn`
- Saved to `localStorage` as `locale`
- All components using `t("key")` re-render with new translations

### Why localStorage Instead of Cookies?

- No server needed (static site)
- Larger storage (5–10 MB vs 4 KB)
- Not sent with HTTP requests
- Simpler API

---

## Quick Reference

| Task | What to Do |
|---|---|
| Submit to Google | Google Search Console → Add property → Submit sitemap |
| Add to Google Maps | Google Business Profile → Verify with postcard |
| Buy a domain | Hostinger/BigRock → Search → Buy → Configure DNS |
| Deploy (easiest) | Lovable → Publish |
| Add analytics | Google Analytics → Check consent first |
| Update prices in SEO schema | Edit `src/data/clinicData.ts` → auto-propagates to JSON-LD |
| Edit static JSON-LD | `index.html` → `<script type="application/ld+json">` |
| Edit sitemap | `public/sitemap.xml` |

---

*Last updated: March 2026*