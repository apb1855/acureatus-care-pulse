# Acureatus — Multi-Tenant Architecture Guide

> **Audience**: Developers, architects, and business decision-makers.  
> This guide explains how to evolve the Acureatus codebase into a **SaaS multi-tenant platform** that serves multiple clinics from a single deployed codebase.

---

## Table of Contents

1. [What is Multi-Tenancy?](#1-what-is-multi-tenancy)
2. [Tenancy Strategies — Comparison](#2-tenancy-strategies--comparison)
3. [Recommended Architecture](#3-recommended-architecture)
4. [Tenant Identification — How It Works](#4-tenant-identification--how-it-works)
5. [Data Model](#5-data-model)
6. [Authentication & Role System](#6-authentication--role-system)
7. [Content & Configuration Per Tenant](#7-content--configuration-per-tenant)
8. [Routing Strategy](#8-routing-strategy)
9. [Backend — Lovable Cloud / Supabase Setup](#9-backend--lovable-cloud--supabase-setup)
10. [Billing & Subscription Management](#10-billing--subscription-management)
11. [Admin Super-Panel](#11-admin-super-panel)
12. [Deployment Strategy](#12-deployment-strategy)
13. [Implementation Roadmap](#13-implementation-roadmap)
14. [What Else Can Be Added](#14-what-else-can-be-added)

---

## 1. What is Multi-Tenancy?

Multi-tenancy means one running application serves **multiple independent customers (tenants)** — in this case, multiple physiotherapy clinics — with:

- **Data isolation**: Clinic A cannot see Clinic B's patients or appointments
- **Custom branding**: Each clinic has their own logo, colors, name
- **Shared infrastructure**: One codebase, one database cluster, one deployment

### Real-World Examples

| Platform | Tenants |
|----------|---------|
| Shopify | Each store is a tenant |
| Practo | Each clinic is a tenant |
| Calendly | Each user account is a tenant |

---

## 2. Tenancy Strategies — Comparison

| Strategy | Description | Best For | Complexity |
|----------|-------------|----------|------------|
| **Subdomain routing** ⭐ | `drsmith.acureatus.com`, `citycare.acureatus.com` | SaaS with managed subdomains | Medium |
| **Path-based routing** | `acureatus.com/clinics/drsmith` | Simple setup, no DNS control needed | Low |
| **Custom domain per tenant** | `drsmith.com` → Acureatus backend | Premium tier, white-label | High |
| **Separate deployments** | Each clinic = own deploy | Maximum isolation, not scalable | Very High |

### Our Recommendation: **Subdomain + Custom Domain (Hybrid)**

```
Free tier   → citycare.acureatus.com  (subdomain)
Pro tier    → citycare.com            (custom domain → CNAME to Acureatus)
```

---

## 3. Recommended Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    SINGLE CODEBASE (React + Vite)            │
├──────────────────────────────────────────────────────────────┤
│  TenantProvider (Context)                                    │
│    - Detects tenant from subdomain / path / domain           │
│    - Fetches tenant config from DB                           │
│    - Injects branding, locale, features into entire app      │
├──────────────────────────────────────────────────────────────┤
│  Supabase Backend                                            │
│    - RLS: tenant_id column on ALL tables                     │
│    - Auth: users linked to tenant                            │
│    - Storage: per-tenant buckets                             │
├──────────────────────────────────────────────────────────────┤
│  Tenant A DB rows    │  Tenant B DB rows   │  Tenant C...    │
│  (RLS-isolated)      │  (RLS-isolated)     │                 │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Tenant Identification — How It Works

### Step 1: Detect tenant on page load

```typescript
// src/hooks/useTenant.ts
export function detectTenant(): string | null {
  const hostname = window.location.hostname;

  // subdomain: citycare.acureatus.com
  const subdomainMatch = hostname.match(/^([^.]+)\.acureatus\.com$/);
  if (subdomainMatch) return subdomainMatch[1];

  // custom domain: look up in DB by hostname
  // (handled server-side or via edge function)

  // path-based: /clinic/citycare
  const pathMatch = window.location.pathname.match(/^\/clinic\/([^/]+)/);
  if (pathMatch) return pathMatch[1];

  return null; // fallback to default (Acureatus own site)
}
```

### Step 2: Fetch tenant config

```typescript
// Fetch from tenants table in Supabase
const { data: tenant } = await supabase
  .from("tenants")
  .select("*")
  .eq("slug", tenantSlug)
  .single();
```

### Step 3: Provide to entire app via Context

```typescript
// src/contexts/TenantContext.tsx
export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const slug = detectTenant();
    if (slug) fetchTenant(slug).then(setTenant);
  }, []);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
};
```

---

## 5. Data Model

### Core Tables

```sql
-- Tenants master table
CREATE TABLE tenants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,        -- "citycare" in citycare.acureatus.com
  name        TEXT NOT NULL,               -- "City Care Physio"
  custom_domain TEXT,                      -- "citycare.com" (optional)
  plan        TEXT DEFAULT 'free',         -- 'free' | 'pro' | 'enterprise'
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tenant branding & config
CREATE TABLE tenant_configs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  logo_url    TEXT,
  primary_color   TEXT DEFAULT '#002B5B',
  clinic_name     TEXT,
  phone           TEXT,
  address         TEXT,
  city            TEXT,
  hours           JSONB,                   -- {"mon": "9AM-8PM", ...}
  whatsapp        TEXT,
  google_maps_url TEXT,
  tagline         TEXT,
  languages       TEXT[] DEFAULT '{en}',   -- ['en', 'kn']
  features        JSONB DEFAULT '{}',      -- feature flags per tenant
  seo_title       TEXT,
  seo_description TEXT,
  UNIQUE (tenant_id)
);

-- All staff linked to a tenant
CREATE TABLE staff (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  role        TEXT,
  photo_url   TEXT,
  bio         TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Services per tenant
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  price_min   INTEGER,
  price_max   INTEGER,
  duration_min INTEGER,
  icon        TEXT,
  is_active   BOOLEAN DEFAULT true
);

-- Blog posts per tenant
CREATE TABLE blog_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  slug        TEXT NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT,
  published   BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  UNIQUE (tenant_id, slug)
);

-- Testimonials per tenant
CREATE TABLE testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  author      TEXT NOT NULL,
  content     TEXT NOT NULL,
  rating      INTEGER DEFAULT 5,
  is_approved BOOLEAN DEFAULT false
);

-- Appointments per tenant
CREATE TABLE appointments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  service_id  UUID REFERENCES services(id),
  scheduled_at TIMESTAMPTZ,
  status      TEXT DEFAULT 'pending',     -- 'pending' | 'confirmed' | 'cancelled'
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### RLS Policies (Row-Level Security)

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Public read for active tenant data (services, blog, testimonials)
CREATE POLICY "Public read services" ON services
  FOR SELECT USING (is_active = true);

-- Clinic admins can manage their own tenant's data
CREATE POLICY "Admin manages own services" ON services
  FOR ALL USING (
    tenant_id = (SELECT tenant_id FROM clinic_admins WHERE user_id = auth.uid())
  );

-- Appointments: only tenant admin can see
CREATE POLICY "Admin reads own appointments" ON appointments
  FOR SELECT USING (
    tenant_id = (SELECT tenant_id FROM clinic_admins WHERE user_id = auth.uid())
  );
```

---

## 6. Authentication & Role System

### User Roles

```sql
CREATE TYPE app_role AS ENUM ('super_admin', 'clinic_admin', 'staff', 'patient');

CREATE TABLE user_roles (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  role      app_role NOT NULL,
  UNIQUE (user_id, tenant_id)
);
```

### Role Hierarchy

| Role | Scope | Permissions |
|------|-------|-------------|
| `super_admin` | Platform-wide | Manage all tenants, billing, global config |
| `clinic_admin` | Own tenant only | Manage staff, services, blog, appointments |
| `staff` | Own tenant only | View appointments, limited updates |
| `patient` | Own tenant only | Book appointments, view own history |

### Login Flow

```
User visits citycare.acureatus.com/login
  ↓
Supabase Auth (email + password / Google OAuth)
  ↓
Tenant context detected from subdomain
  ↓
Session includes tenant_id in user metadata
  ↓
RLS policies enforce data isolation automatically
```

---

## 7. Content & Configuration Per Tenant

### Dynamic Theming

```typescript
// Inject tenant CSS variables at runtime
useEffect(() => {
  if (!tenant) return;
  const root = document.documentElement;
  root.style.setProperty('--primary', tenant.primary_color);
  root.style.setProperty('--clinic-name', `"${tenant.clinic_name}"`);
  document.title = tenant.seo_title || tenant.clinic_name;
}, [tenant]);
```

### Feature Flags per Tenant

```typescript
// tenant.features JSON example
{
  "blog": true,
  "gallery": true,
  "pricing": true,
  "whatsapp_button": true,
  "chat_form": false,       // disabled for this clinic
  "kannada_language": true,
  "hall_of_fame": false
}

// Usage in components
const { tenant } = useTenant();
if (!tenant?.features?.blog) return null;
```

### Replacing Static Data

Current `src/data/clinicData.ts` (static) → becomes API calls:

```typescript
// Before (static)
import { clinicData } from "@/data/clinicData";

// After (multi-tenant)
const { data: clinicData } = useQuery({
  queryKey: ["clinic", tenantId],
  queryFn: () => supabase.from("tenant_configs").select("*").eq("tenant_id", tenantId).single()
});
```

---

## 8. Routing Strategy

### Subdomain Approach (Recommended)

```nginx
# Wildcard DNS: *.acureatus.com → same server
# React app reads subdomain and renders tenant-specific content
*.acureatus.com → acureatus-app.vercel.app
```

### Path-based Approach (Simpler Start)

```
/clinic/acureatus     → Acureatus own site
/clinic/citycare      → City Care Physio
/clinic/mangaluru-pt  → Mangaluru PT Clinic
```

Update `src/App.tsx`:
```tsx
<Route path="/clinic/:tenantSlug" element={<Index />} />
<Route path="/clinic/:tenantSlug/blog" element={<BlogList />} />
<Route path="/clinic/:tenantSlug/blog/:slug" element={<BlogPost />} />
<Route path="/admin" element={<AdminPanel />} />
```

---

## 9. Backend — Lovable Cloud / Supabase Setup

### Edge Functions Needed

| Function | Purpose |
|----------|---------|
| `resolve-tenant` | Maps custom domain → tenant_id (called on page load) |
| `send-contact-email` | Per-tenant EmailJS key or SendGrid |
| `book-appointment` | Creates appointment row scoped to tenant |
| `stripe-webhook` | Handles plan upgrades per tenant |

### Storage Buckets

```
acureatus-assets/
├── tenants/
│   ├── {tenant_id}/
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── gallery/
│   │       ├── photo-1.jpg
│   │       └── ...
```

---

## 10. Billing & Subscription Management

### Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | ₹0/mo | 1 location, basic sections, Acureatus subdomain |
| **Pro** | ₹999/mo | All sections, custom domain, blog, gallery |
| **Enterprise** | ₹2,499/mo | Multi-location, API access, priority support |

### Integration

- Use **Stripe** (international) or **Razorpay** (India-preferred, supports UPI/cards)
- Store `plan` and `subscription_id` on `tenants` table
- Stripe webhook → edge function → update `tenants.plan`
- Feature flags auto-unlock based on plan

---

## 11. Admin Super-Panel

A platform-level admin dashboard at `/super-admin` for:

| Feature | Description |
|---------|-------------|
| Tenant management | Create, suspend, delete tenants |
| Plan management | Upgrade/downgrade plans |
| Usage analytics | Page views, appointments per tenant |
| Global announcements | Push notice to all clinics |
| Audit log | Track admin actions per tenant |

### Security

- `super_admin` role only — verified server-side via RLS
- Never expose via client-side role checks
- 2FA recommended for super admin accounts

---

## 12. Deployment Strategy

### Option A — Single Vercel Deployment (Recommended)

```
*.acureatus.com  →  Vercel (wildcard domain)
                     ↓
                 React app (reads subdomain)
                     ↓
                 Supabase (RLS-isolated data per tenant)
```

- One Vercel project, wildcard domain `*.acureatus.com`
- Zero additional infra per new tenant
- Add tenant in DB → instantly live at `{slug}.acureatus.com`

### Option B — Per-Tenant Vercel Deployments (White-Label)

- Premium tier: each clinic gets `git clone` + env vars + own deploy
- More isolation but manual work per clinic
- Use Vercel API to automate deployment creation

---

## 13. Implementation Roadmap

### Phase 1 — Foundation (Week 1–2)
- [ ] Enable Lovable Cloud (Supabase)
- [ ] Create `tenants` and `tenant_configs` tables
- [ ] Build `TenantContext` and `useTenant` hook
- [ ] Replace static `clinicData.ts` with DB queries
- [ ] Subdomain detection logic

### Phase 2 — Admin Panel (Week 3–4)
- [ ] Clinic admin login (Supabase Auth)
- [ ] Dashboard: edit branding, logo, colors
- [ ] Dashboard: manage services, team, pricing
- [ ] Dashboard: view/manage appointments
- [ ] Role-based access (clinic_admin, staff)

### Phase 3 — Tenant Onboarding (Week 5–6)
- [ ] Self-service signup flow for new clinics
- [ ] Automated subdomain provisioning
- [ ] Onboarding wizard (upload logo, set colors, add services)
- [ ] Email verification + welcome email

### Phase 4 — Billing (Week 7–8)
- [ ] Razorpay / Stripe integration
- [ ] Plan-based feature flags
- [ ] Subscription management portal
- [ ] Invoice generation

### Phase 5 — Scale (Month 3+)
- [ ] Custom domain support per tenant
- [ ] Multi-language per tenant
- [ ] Analytics dashboard per tenant
- [ ] API for external integrations

---

## 14. What Else Can Be Added

Beyond multi-tenancy, here are high-value additions for this platform:

### 🏥 Clinical Features
| Feature | Impact | Effort |
|---------|--------|--------|
| Online appointment booking (date + time slot) | ⭐⭐⭐⭐⭐ | Medium |
| Patient portal (view history, upcoming visits) | ⭐⭐⭐⭐ | High |
| Doctor/therapist availability calendar | ⭐⭐⭐⭐ | Medium |
| WhatsApp OTP booking confirmation | ⭐⭐⭐⭐ | Low |
| Digital intake forms (pre-visit questionnaire) | ⭐⭐⭐ | Medium |

### 📊 Analytics & Insights
| Feature | Impact | Effort |
|---------|--------|--------|
| Google Analytics 4 integration | ⭐⭐⭐⭐⭐ | Low |
| Appointment funnel analytics | ⭐⭐⭐⭐ | Medium |
| Revenue reports per month | ⭐⭐⭐⭐ | Medium |
| Heatmaps (Hotjar/Microsoft Clarity) | ⭐⭐⭐ | Low |

### 🤖 AI / Automation
| Feature | Impact | Effort |
|---------|--------|--------|
| AI chatbot for FAQs & booking | ⭐⭐⭐⭐⭐ | Medium |
| Auto-generate blog posts (AI) | ⭐⭐⭐ | Low |
| Smart appointment reminders (SMS/WhatsApp) | ⭐⭐⭐⭐ | Medium |
| Symptom checker widget | ⭐⭐⭐ | High |

### 🌐 Growth & Marketing
| Feature | Impact | Effort |
|---------|--------|--------|
| Google Reviews API integration | ⭐⭐⭐⭐⭐ | Medium |
| Referral program per clinic | ⭐⭐⭐ | Medium |
| Email newsletter (monthly health tips) | ⭐⭐⭐ | Low |
| Patient loyalty/rewards program | ⭐⭐⭐ | High |
| Push notifications (PWA) | ⭐⭐⭐⭐ | Low |

### 🔧 Technical Improvements
| Feature | Impact | Effort |
|---------|--------|--------|
| CI/CD pipeline (GitHub → Vercel) | ⭐⭐⭐⭐⭐ | Low |
| End-to-end tests (Playwright) | ⭐⭐⭐⭐ | Medium |
| Error monitoring (Sentry) | ⭐⭐⭐⭐ | Low |
| Rate limiting on contact form | ⭐⭐⭐ | Low |
| Image CDN with auto-optimization | ⭐⭐⭐⭐ | Medium |

---

## Quick Reference — Key Files to Create

```
src/
├── contexts/
│   └── TenantContext.tsx       ← TenantProvider + useTenant hook
├── hooks/
│   └── useTenantConfig.ts      ← Fetches tenant config from DB
├── pages/
│   ├── admin/
│   │   ├── Dashboard.tsx       ← Clinic admin dashboard
│   │   ├── BrandingEditor.tsx  ← Logo, colors, contact info
│   │   ├── ServicesManager.tsx ← Add/edit/remove services
│   │   └── Appointments.tsx    ← View & manage bookings
│   └── super-admin/
│       ├── TenantList.tsx      ← All clinics
│       └── TenantDetail.tsx    ← Manage single clinic
├── components/
│   └── TenantThemeInjector.tsx ← Sets CSS vars from tenant config
```

---

*Last updated: March 2026*
