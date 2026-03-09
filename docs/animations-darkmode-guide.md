# Animations & Dark Mode Guide

> **Audience**: Developers maintaining or extending the project.

---

## 1. Scroll Reveal Animations

### Component

**File**: `src/components/ScrollReveal.tsx`

A reusable wrapper that animates children into view when scrolled to, using Framer Motion's `useInView`. Supports `forwardRef` for parent ref forwarding.

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
| `PricingSection` | Price table (10 treatments, ₹250–₹500) fades up on scroll |
| `StatsBar` | Stats counter row reveals with delay |
| `GoogleReviewsSection` | Review cards stagger in |
| `BlogPreviewSection` | Blog cards stagger in |

---

## 2. Animated Counters

### Component

**File**: `src/components/AnimatedCounter.tsx`

Counts from 0 to a target number with an ease-out cubic animation when scrolled into view. Supports `forwardRef`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `end` | `number` | — | Target number to count to |
| `duration` | `number` | `2` | Animation duration in seconds |
| `suffix` | `string` | `""` | Text after number (e.g., "+") |
| `prefix` | `string` | `""` | Text before number (e.g., "₹") |
| `className` | `string` | `""` | Additional CSS classes |

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

### Optimized Tokens

| Token | Light Value | Dark Value | Notes |
|---|---|---|---|
| `--background` | `210 20% 98%` | `215 28% 7%` | Less saturated dark, easier on eyes |
| `--card` | Themed | `215 25% 11%` | Subtler card elevation |
| `--primary` | `213 100% 19%` (navy) | `197 71% 68%` (teal) | Inverted brand colour for dark |
| `--muted-foreground` | Themed | `210 15% 65%` | Improved readability |
| `--destructive` | Themed | `0 72% 51%` | More visible error states |

### Theme Transition

`body` has `transition: background-color 0.3s ease, color 0.3s ease` for smooth light↔dark switching.

### Testing Dark Mode

1. Click the theme toggle (sun/moon icon) in the header
2. Check these areas for proper contrast:
   - Hero section text over images
   - **Pricing table** rows and headers (₹250–₹500 treatments)
   - FAQ accordion text
   - Footer links
   - Contact form inputs
   - Google Reviews cards
   - Blog preview cards

---

## 4. Error Boundary Integration

Each section on the homepage is wrapped in an `ErrorBoundary` component (`src/components/ErrorBoundary.tsx`). This means:

- If an animation or section crashes, only that section disappears
- The rest of the page continues working normally
- Errors are logged to `console.error` with the section name

Combined with `React.lazy()` for below-fold sections, the app loads the header and hero immediately, then progressively loads other sections.

---

## Quick Reference

| Task | File |
|---|---|
| Add scroll animation to a section | Wrap with `<ScrollReveal>` from `@/components/ScrollReveal` |
| Add animated number | Use `<AnimatedCounter end={100} />` from `@/components/AnimatedCounter` |
| Adjust dark mode colors | `src/index.css` → `.dark` block |
| Modify stats values | `src/components/StatsBar.tsx` |
| Add stats translations | `src/hooks/useI18n.tsx` → `stats.*` keys |
| Edit error boundary | `src/components/ErrorBoundary.tsx` |

---

*Last updated: March 2026*