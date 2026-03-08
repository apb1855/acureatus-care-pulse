# Acureatus — Developer Documentation

> **Audience**: Junior developers joining the project.
> This guide explains how the codebase is organised, how to change colours/fonts, and how the WhatsApp & EmailJS integrations work.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [How the Theme Palette Works](#2-how-the-theme-palette-works)
3. [How to Customise Fonts](#3-how-to-customise-fonts)
4. [EmailJS Integration](#4-emailjs-integration)
5. [WhatsApp Integration](#5-whatsapp-integration)

---

## 1. Project Structure

```
├── public/                  # Static assets served as-is (favicon, robots.txt)
├── src/
│   ├── assets/              # Images imported by components (logo, hero background)
│   ├── components/          # All React components
│   │   ├── ui/              # Reusable UI primitives (Button, Input, Dialog, etc.)
│   │   │                      These come from shadcn/ui and are rarely edited.
│   │   ├── Header.tsx        # Top navigation bar (desktop + mobile sheet)
│   │   ├── HeroSection.tsx   # Landing hero with background image
│   │   ├── PillarsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactFormSection.tsx  # "Contact Us" form → sends email via EmailJS
│   │   ├── ContactSection.tsx      # "Visit Us" with clinic addresses & map
│   │   ├── FAQSection.tsx          # Collapsible FAQ list
│   │   ├── Footer.tsx
│   │   ├── FloatingCTA.tsx         # Floating Action Button (FAB) — Book Now, Chat, Go to Top
│   │   ├── ChatFormDialog.tsx      # Dialog form that opens from FAB → sends to WhatsApp
│   │   └── WhatsAppButton.tsx      # (Legacy) Standalone WhatsApp button — hidden, replaced by FAB
│   ├── data/
│   │   ├── clinicData.ts    # Clinic info (addresses, phone numbers, hours)
│   │   └── galleryData.ts   # Gallery image data
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper for classnames)
│   ├── pages/
│   │   ├── Index.tsx         # Main page — assembles all sections in order
│   │   └── NotFound.tsx      # 404 page
│   ├── index.css             # Global styles + Tailwind theme tokens (colours, fonts)
│   ├── App.tsx               # Router setup
│   └── main.tsx              # Entry point — renders App into the DOM
├── tailwind.config.ts        # Tailwind configuration (extends theme with custom tokens)
├── index.html                # HTML shell
└── package.json              # Dependencies and scripts
```

### How a page is built

`src/pages/Index.tsx` is the homepage. It imports each section component and renders them in order:

```tsx
<HeroSection />
<PillarsSection />
<ServicesSection />
...
<ContactFormSection />   // Contact Us (email form)
<ContactSection />       // Visit Us (addresses)
<FAQSection />
<Footer />
<FloatingCTA />          // Floating button — always visible
```

**To reorder sections**, simply move the `<div>` wrappers in `Index.tsx`.

**To add a new section**, create a component in `src/components/`, then import and place it in `Index.tsx`.

---

## 2. How the Theme Palette Works

All colours live in **one place**: `src/index.css`, inside CSS custom properties (variables).

### Where colours are defined

```css
/* src/index.css */
:root {
  --background: 210 20% 98%;      /* Page background */
  --foreground: 213 80% 19%;      /* Default text colour */
  --primary: 213 100% 19%;        /* Main brand colour (dark navy) */
  --primary-foreground: 0 0% 100%; /* Text on primary (white) */
  --secondary: 197 71% 73%;       /* Accent colour (light teal) */
  --secondary-foreground: 213 100% 19%;
  --muted: 210 20% 94%;           /* Subdued backgrounds */
  --muted-foreground: 213 30% 45%;/* Subdued text */
  --accent: 197 71% 73%;          /* Interactive highlights */
  --destructive: 0 84.2% 60.2%;   /* Error / danger */
  --border: 210 20% 88%;
  --input: 210 20% 88%;
  --ring: 213 100% 19%;           /* Focus ring */
  /* ...more tokens */
}
```

> **Format**: All values are in **HSL without the `hsl()` wrapper** — e.g. `213 100% 19%`.
> Tailwind and shadcn wrap them automatically: `hsl(var(--primary))`.

### How to change the entire colour scheme

1. Open `src/index.css`.
2. Find the `:root { ... }` block.
3. Change the HSL values. For example, to make the brand colour green:

```css
--primary: 150 80% 30%;          /* A green tone */
--primary-foreground: 0 0% 100%; /* Keep white text on it */
```

4. Save. Every component using `bg-primary`, `text-primary`, etc. updates automatically.

### Rules to follow

| ✅ Do | ❌ Don't |
|---|---|
| Use semantic classes: `bg-primary`, `text-muted-foreground` | Hard-code colours: `bg-blue-900`, `text-white` |
| Change colours only in `index.css` | Add colour values directly in component files |
| Keep HSL format without the wrapper | Use hex or rgb values in CSS variables |

### Dark mode

If you add a `.dark` class block in `index.css`, Tailwind will pick it up automatically:

```css
.dark {
  --background: 213 50% 10%;
  --foreground: 210 20% 95%;
  /* ...redefine all tokens for dark */
}
```

---

## 3. How to Customise Fonts

### Where fonts are loaded

At the top of `src/index.css`, Google Fonts are imported:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&...');
```

### Where fonts are mapped

In `tailwind.config.ts`, the `fontFamily` section maps friendly names:

```ts
fontFamily: {
  display: ["Outfit", "sans-serif"],  // Used for headings
  body: ["DM Sans", "sans-serif"],    // Used for body text
  mono: ["Space Mono", "monospace"],  // Used for code-like text
}
```

### How to change a font

**Step 1** — Pick a new font from [Google Fonts](https://fonts.google.com/).

**Step 2** — Replace the `@import` URL in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR+NEW+FONT:wght@400;500;600;700&display=swap');
```

**Step 3** — Update `tailwind.config.ts`:

```ts
fontFamily: {
  display: ["Your New Font", "sans-serif"],
}
```

**Step 4** — All elements using `font-display` or `font-body` in the components will automatically use the new font. No component changes needed.

### Usage in components

```tsx
<h2 className="font-display font-bold">Heading</h2>  // Uses display font
<p className="font-body">Paragraph text</p>           // Uses body font
```

---

## 4. EmailJS Integration

The **Contact Us** form (`src/components/ContactFormSection.tsx`) sends emails using [EmailJS](https://www.emailjs.com/) — a client-side email service (no backend needed).

### How it works (flow)

```
User fills form → Clicks "Send Message"
      ↓
Form validated with Zod (client-side)
      ↓
emailjs.send() called with form data
      ↓
EmailJS server sends email to acureatus@gmail.com
      ↓
User sees success/error toast
```

### Code walkthrough

```tsx
// src/components/ContactFormSection.tsx

// 1. These IDs connect to your EmailJS account
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";    // Your email service
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // Your email template
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";     // Your public API key

// 2. On form submit, data is sent to EmailJS
const onSubmit = async (data) => {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: data.name,       // Maps to {{from_name}} in template
      from_email: data.email,     // Maps to {{from_email}}
      phone: data.phone,          // Maps to {{phone}}
      subject: data.subject,      // Maps to {{subject}}
      message: data.message,      // Maps to {{message}}
      to_email: "acureatus@gmail.com",
    },
    EMAILJS_PUBLIC_KEY
  );
};
```

### Setup steps (first time only)

| Step | Action |
|---|---|
| 1 | Go to [emailjs.com](https://www.emailjs.com/) → Sign up (free: 200 emails/month) |
| 2 | **Email Services** → Add New → Choose Gmail → Connect `acureatus@gmail.com` → Copy **Service ID** |
| 3 | **Email Templates** → Create New → Use variables: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`, `{{to_email}}` → Copy **Template ID** |
| 4 | **Account** → API Keys → Copy **Public Key** |
| 5 | Open `src/components/ContactFormSection.tsx` → Replace the 3 placeholder strings |

### Example email template

```
Subject: New Contact: {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}
```

Set **To Email** = `{{to_email}}` and **Reply To** = `{{from_email}}` in EmailJS template settings.

### Input validation

The form uses **Zod** for validation before any data is sent:

```tsx
const contactSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s.'-]+$/),  // Letters only
  email: z.string().email().max(255),
  phone: z.string().min(10).max(15).regex(/^[+]?[\d\s-]+$/),   // Numbers only
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
});
```

This prevents invalid or malicious input from being submitted.

---

## 5. WhatsApp Integration

There are **two places** where WhatsApp is used:

### A. Floating Action Button (FAB) → Chat Form

**File**: `src/components/ChatFormDialog.tsx`

**Flow**:

```
User clicks FAB (+) → Clicks "Chat with us"
      ↓
Dialog opens with form (Name, Phone, Service, Message, Date, Time)
      ↓
Form validated with Zod
      ↓
Data formatted as a WhatsApp message
      ↓
Opens WhatsApp Web/App with pre-filled message
```

**How the WhatsApp URL is built**:

```tsx
// WhatsApp's Click-to-Chat API
const url = `https://wa.me/917996217888?text=${encodeURIComponent(messageText)}`;
window.open(url, "_blank");
```

- `917996217888` = country code (91) + phone number
- `text=` parameter pre-fills the message
- `encodeURIComponent()` safely encodes special characters

**The message looks like this on WhatsApp**:

```
*Name:* John Doe
*Phone:* +91 99999 99999
*Service:* Back Pain Treatment
*Message:* I'd like to book an appointment
*Preferred Date:* March 15, 2026
*Preferred Time:* 10:00 AM
```

The `*...*` syntax makes text **bold** in WhatsApp.

### B. Changing the WhatsApp number

Search for `917996217888` in the codebase and replace it with the new number (include country code, no `+` or spaces):

```
wa.me/917996217888  →  wa.me/91XXXXXXXXXX
```

Files to update:
- `src/components/ChatFormDialog.tsx` (form submission)
- `src/components/FloatingCTA.tsx` (if any direct links remain)

### Input validation for WhatsApp form

Same approach as the email form — Zod validates everything before building the URL:

```tsx
const formSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s.'-]+$/),
  phone: z.string().min(10).max(15).regex(/^[+]?[\d\s-]+$/),
  message: z.string().min(3).max(1000),
  preferredDate: z.date(),           // Must be a future date, not a Sunday
  preferredTime: z.string(),         // Selected from dropdown (9 AM – 8 PM)
});
```

### Calendar restrictions

- **Past dates** are disabled
- **Sundays** are disabled (clinic is closed)
- **Time slots** are 30-minute intervals from 9:00 AM to 8:00 PM

---

## Quick Reference

| Task | File to edit |
|---|---|
| Change colours | `src/index.css` (`:root` block) |
| Change fonts | `src/index.css` (imports) + `tailwind.config.ts` (fontFamily) |
| Change section order | `src/pages/Index.tsx` |
| Change clinic info | `src/data/clinicData.ts` |
| Change WhatsApp number | Search `917996217888` in codebase |
| Setup EmailJS | `src/components/ContactFormSection.tsx` (3 constants) |
| Add a new FAQ | `src/components/FAQSection.tsx` (add to `faqs` array) |
| Change FAB behaviour | `src/components/FloatingCTA.tsx` |

---

*Last updated: March 2026*
