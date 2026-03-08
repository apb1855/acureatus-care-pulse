# Future Backend Integration Guide

> **Audience**: Developers planning to add backend functionality using Firebase or MongoDB.
> **Current Status**: The app is fully frontend-only. This guide outlines how to integrate a backend for dynamic features.

---

## Table of Contents

1. [Overview of Backend-Ready Features](#1-overview-of-backend-ready-features)
2. [Option A: Firebase Integration](#2-option-a-firebase-integration)
3. [Option B: MongoDB Integration](#3-option-b-mongodb-integration)
4. [Option C: Lovable Cloud](#4-option-c-lovable-cloud)
5. [Feature-by-Feature Migration Plan](#5-feature-by-feature-migration-plan)
6. [Comparison Table](#6-comparison-table)

---

## 1. Overview of Backend-Ready Features

These features are currently static/hardcoded and can be upgraded to dynamic:

| Feature | Current State | Current Data | Backend Needed For |
|---|---|---|---|
| Treatment Pricing | Hardcoded in `clinicData.ts` | 10 treatments, ₹250–₹500 | Admin-editable pricing |
| Google Reviews | Hardcoded in `GoogleReviewsSection.tsx` | 4.7★, 56 reviews | Fetching live reviews from Google Places API |
| Appointment Booking | WhatsApp via `ChatFormDialog.tsx` | Form → WhatsApp redirect | Storing bookings, managing slots, confirmations |
| Blog / Health Tips | Not implemented | — | CMS for articles, SEO pages |
| Testimonials | Hardcoded in `TestimonialsSection.tsx` | Static quotes | Admin-managed patient stories |
| Gallery Images | Hardcoded URLs in `galleryData.ts` | Unsplash URLs | Upload & manage clinic photos |
| Team Members | Hardcoded in `clinicData.ts` | 5 team members | Admin-managed staff profiles |
| Payment Methods | Hardcoded in `clinicData.ts` | Google Pay, UPI, Cash | Dynamic payment options |

---

## 2. Option A: Firebase Integration

### Setup

```bash
npm install firebase
```

### Firestore Collections

```
├── reviews/          → name, rating, text, date, approved
├── appointments/     → patientName, phone, service, date, time, status
├── blog_posts/       → title, slug, content, author, tags, publishedAt
├── testimonials/     → quote, name, designation, imageUrl, approved
├── pricing/          → item, price, priceRange, order
└── team/             → name, role, credentials, specialization, photoUrl, order
```

### Example: Dynamic Pricing with Firebase

```tsx
// src/hooks/usePricing.ts
import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const usePricing = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const q = query(collection(db, "pricing"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      setPrices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchPrices();
  }, []);

  return { prices, loading };
};
```

### Migrating Current Prices to Firebase

Seed Firestore with the current 10 treatments:

```ts
const currentPrices = [
  { item: "Spinal Decompression", price: 500, order: 1 },
  { item: "Laser Therapy", price: 500, order: 2 },
  { item: "Tens / IFT", price: 350, order: 3 },
  { item: "Electrical Stimulation", price: 350, order: 4 },
  { item: "Spinal Manual Therapy", price: 350, order: 5 },
  { item: "Exercise Therapy", priceRange: "250 - 500", order: 6 },
  { item: "Coordination Board Exercises", price: 400, order: 7 },
  { item: "Manual Muscle Testing", price: 400, order: 8 },
  { item: "Interactive Sports Gaming", price: 350, order: 9 },
  { item: "Hand Rehabilitation", price: 500, order: 10 },
];
```

---

## 3. Option B: MongoDB Integration

### Architecture

```
React App (Frontend) → REST API (Express.js) → MongoDB Atlas (Database)
```

### Mongoose Schemas

```ts
// models/Pricing.ts
const pricingSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: Number,
  priceRange: String,
  order: { type: Number, default: 0 },
});
```

### Frontend Integration

```tsx
// src/hooks/usePricing.ts
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const usePricing = () => {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/pricing`);
      if (!res.ok) throw new Error("Failed to fetch pricing");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};
```

---

## 4. Option C: Lovable Cloud

Lovable Cloud is the **easiest** option — no external accounts, no separate backend.

### Equivalent Schema (SQL)

```sql
-- Treatment Pricing
CREATE TABLE treatment_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item TEXT NOT NULL,
  price INTEGER,
  price_range TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed with current prices
INSERT INTO treatment_prices (item, price, display_order) VALUES
  ('Spinal Decompression', 500, 1),
  ('Laser Therapy', 500, 2),
  ('Tens / IFT', 350, 3),
  ('Electrical Stimulation', 350, 4),
  ('Spinal Manual Therapy', 350, 5);

INSERT INTO treatment_prices (item, price_range, display_order) VALUES
  ('Exercise Therapy', '250 - 500', 6);

INSERT INTO treatment_prices (item, price, display_order) VALUES
  ('Coordination Board Exercises', 400, 7),
  ('Manual Muscle Testing', 400, 8),
  ('Interactive Sports Gaming', 350, 9),
  ('Hand Rehabilitation', 500, 10);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT now(),
  approved BOOLEAN DEFAULT false
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  tags TEXT[],
  featured_image TEXT,
  published_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 5. Feature-by-Feature Migration Plan

### Priority 1: Dynamic Pricing

| Step | Action |
|---|---|
| 1 | Create `treatment_prices` table with current 10 items |
| 2 | Create `usePricing()` hook with `useQuery` |
| 3 | Update `PricingSection.tsx` to use hook (fallback to `clinicData.ts`) |
| 4 | Update `JsonLd.tsx` to read from same hook |
| 5 | Build admin UI to add/edit/reorder treatments |

### Priority 2: Appointment Booking

| Step | Action |
|---|---|
| 1 | Create `appointments` table |
| 2 | Replace WhatsApp redirect with DB insert |
| 3 | Add confirmation notification (WhatsApp/Email) |
| 4 | Build admin view for managing bookings |

### Priority 3: Live Reviews

| Step | Action |
|---|---|
| 1 | Create `reviews` table, seed with current static reviews |
| 2 | Create edge function for Google Places API |
| 3 | Cache results in DB (refresh daily) |
| 4 | Replace static array with `useQuery` hook |

---

## 6. Comparison Table

| Criteria | Firebase | MongoDB + Express | Lovable Cloud |
|---|---|---|---|
| **Setup complexity** | Medium | High | Low (built-in) |
| **Free tier** | Generous | 512MB Atlas | Usage-based |
| **Real-time updates** | ✅ Built-in | ❌ Need WebSockets | ✅ Built-in |
| **Authentication** | ✅ Firebase Auth | ❌ Build your own | ✅ Built-in |
| **File storage** | ✅ Cloud Storage | ❌ Need S3 | ✅ Built-in |
| **Best for** | Rapid prototyping | Full control | Lovable projects |

### Recommendation

- **Fastest path**: Use **Lovable Cloud** — zero setup, integrated
- **Google ecosystem**: Use **Firebase** — great real-time, generous free tier
- **Full control**: Use **MongoDB** — own your stack, separate backend needed

---

## Files to Modify When Adding Backend

| File | Change |
|---|---|
| `src/components/PricingSection.tsx` | Use `usePricing()` hook instead of `clinicData` |
| `src/components/JsonLd.tsx` | Read prices from hook (with fallback) |
| `src/components/GoogleReviewsSection.tsx` | Replace static array with `useQuery` |
| `src/components/TestimonialsSection.tsx` | Fetch testimonials from DB |
| `src/components/TeamSection.tsx` | Fetch team from DB |
| `src/data/clinicData.ts` | Keep as fallback/default data |
| `src/App.tsx` | Add `/blog`, `/admin` routes |

---

*Last updated: March 2026*
