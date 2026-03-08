# Animations & Dark Mode Guide

> **Audience**: Developers maintaining or extending the project.

---

## 1. Scroll Reveal Animations

### Component

**File**: `src/components/ScrollReveal.tsx`

A reusable wrapper that animates children into view when scrolled to, using Framer Motion's `useInView`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to animate |
| `className` | `string` | `""` | Additional CSS classes |
| `delay` | `number` | `0` | Delay in seconds before animation starts |
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Direction the element slides from |
| `distance` | `number` | `40` | Distance in pixels to travel |

### Usage

```tsx
import ScrollReveal from "@/components/ScrollReveal";

<ScrollReveal delay={0.2} direction="left">
  <h2>This slides in from the left</h2>
</ScrollReveal>
```

### Where It's Applied

| Section | Effect |
|---|---|
| `ServicesSection` | Heading fades up on scroll |
| `PricingSection` | Price table fades up on scroll |
| `StatsBar` | Stats counter row reveals with delay |

---

## 2. Animated Counters

### Component

**File**: `src/components/AnimatedCounter.tsx`

Counts from 0 to a target number with an ease-out cubic animation when scrolled into view.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `end` | `number` | — | Target number to count to |
| `duration` | `number` | `2` | Animation duration in seconds |
| `suffix` | `string` | `""` | Text after number (e.g., "+") |
| `prefix` | `string` | `""` | Text before number (e.g., "₹") |
| `className` | `string` | `""` | Additional CSS classes |

### Usage

```tsx
import AnimatedCounter from "@/components/AnimatedCounter";

<AnimatedCounter end={56} suffix="+" duration={1.5} />
// Renders: 0 → 1 → ... → 56+
```

### Stats Bar

**File**: `src/components/StatsBar.tsx`

Displays 4 animated stats in the hero section:

| Stat | Value | Translation Key |
|---|---|---|
| Years Experience | 3+ | `stats.yearsExperience` |
| Happy Patients | 56+ | `stats.happyPatients` |
| Advanced Technologies | 6 | `stats.advancedTech` |
| Specialized Clinics | 5 | `stats.specializedClinics` |

---

## 3. Dark Mode Refinements

### Changes Made

| Token | Before | After | Reason |
|---|---|---|---|
| `--background` | `213 80% 8%` | `215 28% 7%` | Less saturated, easier on eyes |
| `--card` | `213 60% 12%` | `215 25% 11%` | Subtler card elevation |
| `--primary` | `197 71% 73%` | `197 71% 68%` | Better contrast ratio against dark bg |
| `--muted-foreground` | `210 15% 60%` | `210 15% 65%` | Improved readability for secondary text |
| `--destructive` | `0 62.8% 30.6%` | `0 72% 51%` | More visible error states |
| `--radius` | `0rem` | `0.75rem` | Consistent with light mode |
| Sidebar tokens | Generic gray | Matched to main theme | Consistent sidebar appearance |

### Theme Transition

Added `transition: background-color 0.3s ease, color 0.3s ease` to `body` for smooth light↔dark switching.

### Testing Dark Mode

1. Click the theme toggle (sun/moon icon) in the header
2. Check these areas for proper contrast:
   - Hero section text over images
   - Pricing table rows and headers
   - FAQ accordion text
   - Footer links
   - Contact form inputs
3. Use Chrome DevTools → Rendering → Emulate `prefers-color-scheme: dark`

---

## Quick Reference

| Task | File |
|---|---|
| Add scroll animation to a section | Wrap with `<ScrollReveal>` from `@/components/ScrollReveal` |
| Add animated number | Use `<AnimatedCounter end={100} />` from `@/components/AnimatedCounter` |
| Adjust dark mode colors | `src/index.css` → `.dark` block |
| Modify stats values | `src/components/StatsBar.tsx` |
| Add stats translations | `src/hooks/useI18n.tsx` → `stats.*` keys |

---

*Last updated: March 2026*
