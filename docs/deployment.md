# Acureatus — Deployment & Domain Guide

> **Audience**: Site owners, developers, and decision-makers.
> Covers deployment options, domain selection with SEO analysis, and go-live checklist.

---

## Table of Contents

1. [Deployment Platforms](#1-deployment-platforms)
2. [Domain Selection — SEO Perspective](#2-domain-selection--seo-perspective)
3. [DNS & SSL Setup](#3-dns--ssl-setup)
4. [Pre-Launch Checklist](#4-pre-launch-checklist)
5. [Post-Launch Tasks](#5-post-launch-tasks)

---

## 1. Deployment Platforms

| Feature | Lovable Publish | Vercel | Netlify | Hostinger |
|---------|----------------|--------|---------|-----------|
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Free tier | ✅ | ✅ | ✅ | ❌ |
| Custom domain | ✅ | ✅ | ✅ | ✅ |
| Auto SSL | ✅ | ✅ | ✅ | ✅ |
| Auto-deploy from Git | ❌ | ✅ | ✅ | ❌ |
| Global CDN | ✅ | ✅ | ✅ | ❌ |
| Edge functions | ❌ | ✅ | ✅ | ❌ |
| Analytics built-in | ❌ | ✅ | ✅ | ❌ |

### Recommendation

- **Start with Lovable Publish** — zero config, instant deploy
- **Move to Vercel** when you need CI/CD, preview deploys, or server-side features
- **Netlify** is a solid alternative to Vercel with similar capabilities

---

## 2. Domain Selection — SEO Perspective

### Domain Extensions Comparison

| Extension | SEO Impact | Best For | Price (INR/yr) | Recommendation |
|-----------|-----------|----------|----------------|----------------|
| `.com` | ⭐⭐⭐⭐⭐ | Global trust, universal recognition | ₹599–₹1,200 | **🏆 BEST OVERALL** |
| `.in` | ⭐⭐⭐⭐ | India-specific local SEO, Google.co.in ranking | ₹199–₹799 | **🏆 BEST FOR LOCAL SEO** |
| `.co.in` | ⭐⭐⭐ | Indian businesses, affordable | ₹149–₹499 | Good budget option |
| `.clinic` | ⭐⭐⭐ | Industry-specific, memorable | ₹2,000–₹4,000 | Niche credibility |
| `.health` | ⭐⭐⭐ | Healthcare vertical | ₹3,000–₹6,000 | Premium niche |
| `.org` | ⭐⭐⭐ | Non-profits, trust | ₹799–₹1,200 | Not ideal for clinics |
| `.net` | ⭐⭐ | Technical/network | ₹799–₹1,200 | Avoid for clinics |

### Our Recommendation: Buy BOTH `.com` and `.in`

**Primary domain: `acureatus.com`** — Why:
- ✅ **Universal trust signal** — users and search engines trust `.com` globally
- ✅ **Brand protection** — prevents competitors from registering it
- ✅ **Works for all geographies** — if the clinic expands beyond Karnataka
- ✅ **Email credibility** — `info@acureatus.com` looks more professional
- ✅ **Backlink value** — external sites are more likely to link to `.com`

**Secondary domain: `acureatus.in`** — Why:
- ✅ **Local SEO boost** — Google treats `.in` as a geo-signal for India
- ✅ **Google.co.in ranking** — slight preference for ccTLDs in local search
- ✅ **Affordable** — costs less than `.com`
- ✅ **Redirect to `.com`** — 301 redirect passes SEO juice

### Setup Strategy

```
acureatus.com    → Primary domain (hosts the website)
acureatus.in     → 301 redirect to acureatus.com
www.acureatus.com → 301 redirect to acureatus.com (non-www preferred)
```

### Why NOT just `.in`?

While `.in` is great for local SEO, it has limitations:
- ❌ Users outside India may not trust `.in` as much
- ❌ If the clinic ever targets NRI patients or medical tourism, `.com` is essential
- ❌ Some platforms auto-complete `.com` in address bars
- ❌ `.com` has stronger perceived authority in healthcare

### SEO Myths Debunked

| Myth | Reality |
|------|---------|
| "`.com` always ranks better" | Google officially says TLD doesn't directly affect ranking. BUT user trust and CTR (click-through rate) are higher for `.com`, which indirectly helps SEO. |
| "`.in` only ranks in India" | `.in` is a ccTLD, so Google associates it with India by default. You can override this in Google Search Console, but it's ideal for India-focused businesses. |
| "New TLDs like `.clinic` hurt SEO" | Google treats all TLDs equally for ranking. However, user recognition and trust are lower for unusual TLDs. |
| "Exact-match domains boost SEO" | This was true pre-2012. Now Google's EMD update reduces the advantage. Brand name domains are better. |

### Where to Buy

| Provider | `.com` Price | `.in` Price | Recommended |
|----------|-------------|-------------|-------------|
| **Hostinger** | ₹699/yr | ₹149/yr | ✅ Best value |
| **BigRock** | ₹799/yr | ₹199/yr | ✅ Indian registrar |
| **GoDaddy** | ₹999/yr | ₹499/yr | ⚠️ Pricey renewals |
| **Namecheap** | ₹599/yr | N/A | ❌ No `.in` support |
| **Google Domains** | Discontinued | — | ❌ Migrated to Squarespace |

**💡 Tip**: Buy for 2+ years. Google may consider domain registration length as a minor trust signal (longer = more legitimate).

---

## 3. DNS & SSL Setup

### Connecting to Lovable

1. In your domain registrar, go to DNS settings
2. Add a **CNAME** record:
   - Name: `@` (or root)
   - Value: Your Lovable deployment URL
3. Wait for propagation (15 min – 48 hours)
4. In Lovable: Project → Settings → Domains → Add custom domain
5. SSL is **automatic** — no manual certificate needed

### Connecting to Vercel (Alternative)

1. In Vercel dashboard: Project → Settings → Domains → Add domain
2. Add DNS records as shown by Vercel (usually A + CNAME)
3. SSL provisions automatically via Let's Encrypt
4. Verify in Vercel dashboard

### For the `.in` redirect

1. In `.in` registrar DNS, add a redirect rule:
   - Type: **301 Permanent Redirect**
   - From: `acureatus.in` → To: `https://acureatus.com`
2. Or use Cloudflare (free) as DNS proxy with Page Rules for 301 redirect

---

## 4. Pre-Launch Checklist

### Technical

- [ ] Custom domain connected with SSL
- [ ] 301 redirect from `.in` to `.com` (if both purchased)
- [ ] 301 redirect from `www` to non-www (or vice versa)
- [ ] `canonical` URL in `index.html` updated to `https://acureatus.com`
- [ ] `sitemap.xml` URLs updated to `https://acureatus.com`
- [ ] `robots.txt` sitemap URL updated
- [ ] JSON-LD `url` fields updated to production domain
- [ ] Open Graph `og:url` updated
- [ ] PWA manifest `start_url` and `scope` verified

### SEO

- [ ] Google Search Console — add property and verify
- [ ] Submit sitemap: `https://acureatus.com/sitemap.xml`
- [ ] Google Business Profile — claim and verify
- [ ] Bing Webmaster Tools — add property (optional)

### Content

- [ ] All placeholder images replaced with real clinic photos
- [ ] Contact info verified (phone, email, address, hours)
- [ ] Blog posts reviewed for accuracy
- [ ] Treatment prices current

### Performance

- [ ] Run Lighthouse on production URL (target: 90+ all categories)
- [ ] Verify service worker activates (check DevTools → Application → Service Workers)
- [ ] Test offline fallback page
- [ ] Test PWA install on mobile

---

## 5. Post-Launch Tasks

### Week 1

- [ ] Verify Google indexes the site (`site:acureatus.com` in Google)
- [ ] Check Search Console for crawl errors
- [ ] Test all forms (contact, booking) in production
- [ ] Verify analytics tracking (if added)

### Month 1

- [ ] Monitor Search Console performance report
- [ ] Check Core Web Vitals in Search Console
- [ ] Respond to any Google Business reviews
- [ ] Publish 2–3 blog posts for content freshness

### Ongoing

- [ ] Monthly Lighthouse audit
- [ ] Update blog content regularly (SEO freshness signal)
- [ ] Monitor and respond to Google reviews
- [ ] Keep dependencies updated for security patches

---

## Quick Reference

| Task | Action |
|------|--------|
| Deploy | Lovable → Publish button |
| Add domain | Project → Settings → Domains |
| Submit to Google | Google Search Console → Add property → Submit sitemap |
| Redirect `.in` → `.com` | DNS redirect rule or Cloudflare Page Rule |
| Update canonical | Edit `index.html` → `<link rel="canonical">` |
| Update sitemap URLs | Edit `public/sitemap.xml` |
| Check SSL | Visit `https://acureatus.com` — look for padlock |

---

*Last updated: March 2026*
