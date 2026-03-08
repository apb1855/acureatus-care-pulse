# Acureatus — SEO, Domain, Deployment & Cookies Guide

> **Audience**: Junior developers and site owners.
> This guide covers how to get the website found on Google, buy a domain, deploy, handle cookies, and how theme storage works.

---

## Table of Contents

1. [SEO Optimization](#1-seo-optimization)
2. [Google Search Console & Listings](#2-google-search-console--listings)
3. [Domain — Finding, Buying & Managing](#3-domain--finding-buying--managing)
4. [Deployment Options](#4-deployment-options)
5. [Cookies & Local Storage](#5-cookies--local-storage)
6. [How Theme Preference is Stored](#6-how-theme-preference-is-stored)

---

## 1. SEO Optimization

### What is SEO?

Search Engine Optimization (SEO) is the practice of making your website easy for Google (and other search engines) to find, understand, and rank in search results.

### What's Already Done in This Project

| SEO Element | Status | Location |
|---|---|---|
| Page title (`<title>`) | ✅ | `index.html` — under 60 chars, includes keyword |
| Meta description | ✅ | `index.html` — under 160 chars |
| Open Graph tags (og:title, og:description, og:image) | ✅ | `index.html` |
| Twitter card tags | ✅ | `index.html` |
| Single `<h1>` tag | ✅ | `HeroSection.tsx` |
| Semantic HTML (`<header>`, `<section>`, `<footer>`, `<nav>`) | ✅ | All components |
| Alt text on images | ✅ | Throughout components |
| `robots.txt` | ✅ | `public/robots.txt` |
| Responsive viewport meta | ✅ | `index.html` |
| PWA manifest | ✅ | `vite.config.ts` |

### What You Should Add

#### a) Sitemap (`public/sitemap.xml`)

Create this file so search engines can discover all your pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-03-08</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

#### b) JSON-LD Structured Data

Add this inside `<head>` in `index.html` for rich Google search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Acureatus AI Advanced Physio Pain Clinic",
  "description": "AI-powered physiotherapy clinic in Mangaluru",
  "url": "https://yourdomain.com",
  "telephone": "+917996217888",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1st Floor, Time Square Building, Shivabagh, Mallikatte, Kadri",
    "addressLocality": "Mangaluru",
    "addressRegion": "Karnataka",
    "postalCode": "575002",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 09:00-20:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "56"
  },
  "priceRange": "₹250-₹500"
}
</script>
```

#### c) Canonical Tag

Add in `index.html` `<head>`:
```html
<link rel="canonical" href="https://yourdomain.com/" />
```

#### d) Image Optimization

- Use `loading="lazy"` on images below the fold (already done for most)
- Use WebP format where possible
- Keep image file sizes under 200KB

#### e) Page Speed Tips

- ✅ Google Fonts are cached by service worker (PWA)
- ✅ Unsplash images are cached
- Add `loading="lazy"` to all non-hero images
- Use `<link rel="preconnect" href="https://fonts.googleapis.com">` in `index.html`

### SEO Checklist

- [ ] Replace placeholder OG image with actual clinic photo
- [ ] Add `sitemap.xml`
- [ ] Add JSON-LD structured data
- [ ] Add canonical tag
- [ ] Add `rel="preconnect"` for external resources
- [ ] Test with [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 2. Google Search Console & Listings

### Step 1 — Google Search Console (Free)

This is how you tell Google about your website.

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **"Add Property"**
3. Choose **"URL prefix"** → Enter `https://yourdomain.com`
4. **Verify ownership** — Choose one method:
   - **HTML tag**: Add `<meta name="google-site-verification" content="YOUR_CODE" />` to `index.html`
   - **DNS record**: Add a TXT record in your domain provider
5. After verification:
   - Submit your sitemap: **Sitemaps** → Enter `https://yourdomain.com/sitemap.xml`
   - Check for indexing issues in **Pages** tab
   - Monitor search performance in **Performance** tab

### Step 2 — Google Business Profile (Free, Essential for Local SEO)

This makes your clinic appear on Google Maps and local search results.

1. Go to [Google Business Profile](https://www.google.com/business/)
2. Click **"Manage now"**
3. Enter business name: **Acureatus AI Advanced Physio Pain Clinic**
4. Choose category: **Physiotherapy Clinic**
5. Add address, phone, hours, website URL
6. **Verify** — Google will send a postcard to your address with a code (takes 5–14 days)
7. After verification: Add photos, respond to reviews, post updates

### Step 3 — Other Platforms

| Platform | URL | Why |
|---|---|---|
| Google Business | google.com/business | Maps, local search, reviews |
| Bing Places | bingplaces.com | Bing search results |
| Justdial | justdial.com | Popular in India for local businesses |
| Practo | practo.com | Healthcare-specific listing (India) |
| Sulekha | sulekha.com | Local services marketplace |
| Facebook Page | facebook.com/pages | Social presence, reviews |
| Instagram Business | instagram.com | Visual content, reels |

### Step 4 — Bing Webmaster Tools (Free)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Import from Google Search Console (easiest) or add manually
3. Submit sitemap

---

## 3. Domain — Finding, Buying & Managing

### Step 1 — Choose a Domain Name

Good domain names are:
- **Short**: `acureatus.in` or `acureatus.com`
- **Memorable**: Easy to spell and say
- **Relevant**: Contains brand name or keywords

**Recommended for this clinic**:
- `acureatus.in` (₹199–₹799/year) — Indian domain
- `acureatus.com` (₹599–₹1,200/year) — Global domain
- `acureatusclinic.com` — If `.com` is taken

### Step 2 — Where to Buy

| Provider | Price Range (INR/year) | Indian Domain (.in) | Website |
|---|---|---|---|
| **GoDaddy** | ₹499–₹1,200 | ✅ | godaddy.com |
| **Namecheap** | ₹599–₹999 | ❌ | namecheap.com |
| **Hostinger** | ₹149–₹899 | ✅ | hostinger.in |
| **BigRock** | ₹199–₹999 | ✅ | bigrock.in |
| **Google Domains** (now Squarespace) | ₹700–₹1,200 | ❌ | domains.squarespace.com |

**Recommended**: **Hostinger** or **BigRock** for Indian domains (cheapest + supports `.in`).

### Step 3 — How to Buy (Example: Hostinger)

1. Go to [hostinger.in](https://hostinger.in)
2. Search for your domain (e.g., `acureatus.in`)
3. Add to cart → Checkout
4. Create account → Pay (UPI/Credit Card/Net Banking)
5. After purchase, you'll get access to a **DNS management panel**

### Step 4 — Connect Domain to Your Deployed Website

This depends on where you deploy (see Section 4). Generally:

1. Go to your domain provider's **DNS settings**
2. Add a **CNAME record**:
   - **Name**: `www` (or `@` for root)
   - **Value**: Your deployment URL (e.g., `your-app.lovable.app`)
3. Some providers need an **A record** for root domain:
   - **Name**: `@`
   - **Value**: The IP address provided by your host
4. Wait 15 minutes to 48 hours for DNS propagation

### Step 5 — SSL Certificate (HTTPS)

- **Lovable**: Automatically provides SSL ✅
- **Vercel**: Automatically provides SSL ✅
- **Netlify**: Automatically provides SSL ✅
- **Custom VPS**: Use [Let's Encrypt](https://letsencrypt.org/) (free)

### Domain Maintenance Checklist

- [ ] **Auto-renew**: Enable auto-renewal to avoid losing your domain
- [ ] **Privacy protection**: Enable WHOIS privacy (hides your personal info)
- [ ] **DNS backup**: Keep a record of your DNS settings
- [ ] **Renewal reminders**: Set calendar reminders 30 days before expiry

---

## 4. Deployment Options

### Option A — Lovable Publish (Simplest)

**Cost**: Included with Lovable plan
**Steps**:
1. In Lovable editor → Click **"Publish"** (top right)
2. Click **"Update"** to deploy latest changes
3. Your app is live at `your-project.lovable.app`

**Custom domain**:
1. Go to Project → Settings → Domains
2. Click **"Connect Domain"**
3. Add CNAME record in your DNS provider pointing to the Lovable URL
4. Lovable handles SSL automatically

### Option B — Vercel (Recommended for Production)

**Cost**: Free tier available (hobby projects), Pro from $20/month
**Steps**:
1. Export project to GitHub (Lovable → Settings → GitHub → Connect)
2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
3. Click **"New Project"** → Import your GitHub repo
4. Vercel auto-detects Vite → Click **"Deploy"**
5. Live at `your-project.vercel.app`

**Custom domain on Vercel**:
1. Go to Project → Settings → Domains
2. Add your domain (e.g., `acureatus.in`)
3. Add the DNS records Vercel provides to your domain registrar
4. SSL is automatic

### Option C — Netlify

**Cost**: Free tier available
**Steps**:
1. Export to GitHub
2. Go to [netlify.com](https://netlify.com) → Sign up
3. Click **"Add new site"** → Import from GitHub
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **"Deploy"**

**Custom domain**: Similar to Vercel — add DNS records.

### Option D — Hostinger / Traditional Hosting

**Cost**: ₹149–₹299/month
**Steps**:
1. Run `npm run build` locally → This creates a `dist/` folder
2. Upload contents of `dist/` to `public_html` via FTP or File Manager
3. Add `.htaccess` for SPA routing:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Deployment Comparison

| Feature | Lovable | Vercel | Netlify | Hostinger |
|---|---|---|---|---|
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Free tier | ✅ | ✅ | ✅ | ❌ |
| Custom domain | ✅ (paid plan) | ✅ | ✅ | ✅ |
| Auto SSL | ✅ | ✅ | ✅ | ✅ |
| Auto-deploy from Git | ❌ | ✅ | ✅ | ❌ |
| CDN (Global speed) | ✅ | ✅ | ✅ | ❌ |
| Cost (INR/year) | Plan-based | ₹0–₹15,000 | ₹0–₹12,000 | ₹1,800–₹3,600 |

**Recommendation**: Start with **Lovable Publish** for simplicity. Move to **Vercel** when you need CI/CD from GitHub.

---

## 5. Cookies & Local Storage

### What Are Cookies and Why Do We Need Them?

Cookies and local storage are small pieces of data saved in the user's browser. They allow the website to "remember" things between visits.

### Why Cookies/Storage Are Important for This Project

| Data Stored | Storage Type | Why It's Needed |
|---|---|---|
| Theme preference (light/dark) | `localStorage` | So users don't have to toggle dark mode every visit |
| Cookie consent choice | `localStorage` | Remember if user already accepted/declined cookies |
| PWA service worker cache | Cache API | Offline access, faster loading |

### Legal Requirements

Even though we only store non-personal preferences, it's best practice (and legally required in many regions) to:

1. **Inform users** what data you store
2. **Ask for consent** before storing non-essential data
3. **Allow users to decline**

This is why we added the **Cookie Consent Banner** (`src/components/CookieConsent.tsx`).

### How the Cookie Consent Banner Works

```
User visits site for the first time
      ↓
After 1.5 seconds, banner appears at bottom
      ↓
User clicks "Accept All" or "Essential Only"
      ↓
Choice saved to localStorage:
  - cookie-consent: "accepted" or "declined"
  - cookie-consent-date: ISO timestamp
      ↓
Banner never shows again (unless localStorage is cleared)
```

### Cookie Consent Code Walkthrough

```tsx
// src/components/CookieConsent.tsx

// 1. Check if user already made a choice
const consent = localStorage.getItem("cookie-consent");
if (!consent) setVisible(true); // Show banner

// 2. On accept
localStorage.setItem("cookie-consent", "accepted");
localStorage.setItem("cookie-consent-date", new Date().toISOString());

// 3. On decline
localStorage.setItem("cookie-consent", "declined");
```

### What Happens When User Declines?

- Theme preference still works (it's "essential" functionality)
- No analytics or tracking cookies are set (we don't use any currently)
- If you add Google Analytics later, check consent before loading:

```tsx
if (localStorage.getItem("cookie-consent") === "accepted") {
  // Load Google Analytics
  gtag('config', 'GA_MEASUREMENT_ID');
}
```

### Adding Google Analytics (Future)

If you decide to add analytics:

1. Get a Measurement ID from [Google Analytics](https://analytics.google.com/)
2. Add to `index.html`:
```html
<!-- Only loads if user consented -->
<script>
  if (localStorage.getItem('cookie-consent') === 'accepted') {
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX';
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXX');
  }
</script>
```

---

## 6. How Theme Preference is Stored

### The Flow

```
User clicks moon/sun icon in header
      ↓
ThemeToggle component toggles state
      ↓
useEffect runs:
  1. Adds/removes "dark" class on <html> element
  2. Saves choice to localStorage
      ↓
On next visit:
  1. ThemeToggle checks localStorage on mount
  2. Applies saved preference immediately
```

### Code Walkthrough

```tsx
// src/components/ThemeToggle.tsx

// 1. Read saved preference on component mount
const [dark, setDark] = useState(() => {
  return document.documentElement.classList.contains("dark") ||
    localStorage.getItem("theme") === "dark";
});

// 2. When user toggles, update both DOM and storage
useEffect(() => {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}, [dark]);
```

### How Tailwind Picks It Up

In `tailwind.config.ts`:
```ts
darkMode: ["class"],  // Uses the "dark" class on <html>
```

In `src/index.css`:
```css
:root { /* Light mode tokens */ }
.dark { /* Dark mode tokens — automatically applied */ }
```

### Storage Details

| Key | Value | Stored In | Persistence |
|---|---|---|---|
| `theme` | `"light"` or `"dark"` | `localStorage` | Until manually cleared |
| `cookie-consent` | `"accepted"` or `"declined"` | `localStorage` | Until manually cleared |
| `cookie-consent-date` | ISO date string | `localStorage` | Until manually cleared |

### Why localStorage Instead of Cookies?

- **No server needed**: localStorage is client-side only, perfect for a static site
- **Larger storage**: 5–10 MB vs 4 KB for cookies
- **Not sent with requests**: Cookies are sent with every HTTP request, adding overhead
- **Simpler API**: `localStorage.setItem()` vs complex cookie string manipulation

---

## Quick Reference

| Task | What to Do |
|---|---|
| Submit to Google | Google Search Console → Add property → Verify → Submit sitemap |
| Add to Google Maps | Google Business Profile → Add clinic → Verify with postcard |
| Buy a domain | Hostinger/BigRock → Search → Buy → Configure DNS |
| Deploy (easiest) | Lovable → Publish → Connect domain |
| Deploy (production) | Export to GitHub → Vercel → Import → Deploy |
| Add analytics | Google Analytics → Get ID → Add to `index.html` (check consent) |
| Change cookie banner text | `src/components/CookieConsent.tsx` |
| Check consent in code | `localStorage.getItem("cookie-consent") === "accepted"` |

---

*Last updated: March 2026*
