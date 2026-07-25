# Design Document: Portfolio UI Enhancements

## Overview

This document describes the technical design for six UI enhancement areas on the Atif Raza portfolio site — a Next.js / React 19 / Tailwind CSS 4 application. The enhancements are:

1. **Mobile Navigation Menu** — hamburger toggle with slide-down overlay
2. **Calendly Integration** — replace LinkedIn URL on "Book a Call" with Calendly link
3. **Scroll Fade-in Animations** — IntersectionObserver-driven entrance animations per section
4. **Section Spacing Review** — consistent vertical rhythm across all breakpoints
5. **Full Responsiveness** — layout fixes for every section at 320 px and above
6. **Clients Marquee Data** — replace placeholder strings with typed real-brand entries

The site uses Tailwind CSS v4's `@theme inline` configuration, which means design tokens (spacing, colors, fonts, container widths) live in `globals.css` under `@theme inline` and are referenced as CSS custom properties via utility classes. All custom utilities (`px-gutter`, `py-section-padding-md`, `max-w-container-max`, etc.) are defined there and must be used consistently.

---

## Architecture

The portfolio is a single-page Next.js application. All eight sections are rendered by `app/page.tsx` as server components by default. Components that need client-side state (scroll detection, slider, mobile menu) are already marked `"use client"`. The enhancements follow this same pattern: server components stay server components; client interactivity is isolated to leaf components or custom hooks.

```
app/
  page.tsx                      ← Server component, renders all 8 sections
  globals.css                   ← Tailwind v4 @theme inline + animation classes
  hooks/
    useScrollFadeIn.ts          ← NEW: IntersectionObserver custom hook
  data/
    site.ts                     ← MODIFY: add calendly field
    clients.ts                  ← REPLACE: string[] → Client[] typed array
  components/
    layout/
      navbar.tsx                ← MODIFY: add mobile menu state + HamburgerButton + MobileMenu
    sections/
      contact.tsx               ← MODIFY: bookingUrl fallback logic
      clients-marquee.tsx       ← MODIFY: string → Client, <span> → <a>
      hero.tsx                  ← VERIFY: already has fade-in; no scroll hook needed
      impact-stats.tsx          ← MODIFY: add "use client" + useScrollFadeIn
      tech-stack.tsx            ← MODIFY: add "use client" + useScrollFadeIn
      featured-projects.tsx     ← MODIFY: add useScrollFadeIn (already "use client")
      experience.tsx            ← MODIFY: add "use client" + useScrollFadeIn
      process.tsx               ← MODIFY: add "use client" + useScrollFadeIn
      contact.tsx               ← MODIFY: add "use client" + useScrollFadeIn (+ calendly)
```

---

## Components and Interfaces

### 1. Mobile Navigation Menu

#### State additions to `Navbar`

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
const closeMenu = () => setIsMobileMenuOpen(false);
```

#### HamburgerButton

Rendered inside the `<div className="flex items-center gap-4">` block (right side of nav), before the Resume button. Visible only on `md:hidden`.

```
┌──────────────────────────────────────────────────┐
│  [Logo + Name]           [☰]  [Resume]  (mobile) │
│  [Logo + Name]  [Nav Links]   [Resume]  (desktop) │
└──────────────────────────────────────────────────┘
```

Props/behaviour:
- Renders `menu` icon when `!isMobileMenuOpen`; renders `close` icon when `isMobileMenuOpen`
- `aria-expanded={isMobileMenuOpen}`
- `aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}`
- `aria-controls="mobile-menu"`

#### MobileMenu panel

Rendered immediately after `</nav>` close tag, conditionally shown via CSS transition, NOT conditional rendering (avoids layout flash). Uses `max-height` CSS transition:

```tsx
<div
  id="mobile-menu"
  className={`glass-nav fixed top-16 left-0 right-0 z-40 overflow-hidden border-b border-outline-variant/20
    transition-all duration-300 ease-in-out md:hidden
    ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
>
```

Contents:
- All `navigation` items as `<Link>` elements — each calls `closeMenu` on click
- Resume download `<Link>` at the bottom
- `aria-hidden={!isMobileMenuOpen}` on the panel

#### Escape key + resize cleanup (useEffect in Navbar)

```tsx
useEffect(() => {
  if (!isMobileMenuOpen) return;
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
  const onResize = () => { if (window.innerWidth >= 768) closeMenu(); };
  document.addEventListener("keydown", onKey);
  window.addEventListener("resize", onResize);
  return () => {
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", onResize);
  };
}, [isMobileMenuOpen]);
```

#### Body scroll lock (useEffect in Navbar)

```tsx
useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [isMobileMenuOpen]);
```

---

### 2. Calendly Integration

#### `app/data/site.ts` change

Add one field to the existing `siteConfig` object:

```ts
export const siteConfig = {
  // ...existing fields...
  calendly: "",   // ← set to Calendly URL when available, empty string = fall back to LinkedIn
};
```

#### `app/components/sections/contact.tsx` change

Derive `bookingUrl` before the JSX return:

```tsx
const bookingUrl = siteConfig.calendly || siteConfig.linkedin;
```

Replace the hard-coded `href={siteConfig.linkedin}` on the Book a Call button with `href={bookingUrl}`. All other attributes (`target="_blank"`, `rel="noopener noreferrer"`) remain unchanged.

Because `bookingUrl` is a static derived value (not reactive state), `contact.tsx` does NOT need to become a client component for this change alone. However, it will be converted to `"use client"` when the scroll animation hook is added (see §3).

---

### 3. Scroll Fade-in Animations

#### `app/hooks/useScrollFadeIn.ts`

```ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollFadeIn() {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true); // progressive enhancement fallback
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once only
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
```

Key design decisions:
- `observer.unobserve(el)` immediately after first intersection ensures the animation fires only once (Requirement 3.3).
- Checking `typeof IntersectionObserver === "undefined"` sets `isVisible = true` immediately as a progressive enhancement fallback (Requirement 3.7).
- The hook is generic — `ref` is typed as `HTMLElement | null` so it can be spread onto any semantic element.

#### CSS additions to `globals.css`

```css
.scroll-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.scroll-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

#### Section usage pattern

Each section (ImpactStats → Contact) is converted to `"use client"` and wraps its root `<section>` element:

```tsx
"use client";
import { useScrollFadeIn } from "../../hooks/useScrollFadeIn";

export default function ExampleSection() {
  const { ref, isVisible } = useScrollFadeIn();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`scroll-fade-in ${isVisible ? "visible" : ""} ... existing classes ...`}
    >
      {/* content */}
    </section>
  );
}
```

Hero keeps its existing `.fade-in` class and is NOT given the scroll hook (it is always visible on load).

---

### 4. Section Spacing Review

All spacing tokens are already defined in `globals.css`:
- `--spacing-section-padding-md: 40px` → utility `py-section-padding-md`
- `--spacing-section-padding-lg: 60px` → utility `py-section-padding-lg`
- `--spacing-gutter: 24px` → utility `px-gutter`

Current sections already use these tokens correctly. The audit confirms:

| Section | Current padding | Required | Action |
|---|---|---|---|
| Hero | `pt-16` (only top, min-height driven) | no change | None |
| ClientsMarquee | `py-12` (48 px) | `py-12` all viewports | None — correct |
| ImpactStats | `py-section-padding-md` | 80 px | None — correct |
| TechStack | `py-section-padding-lg` | ≥ 80 px | None — correct |
| FeaturedProjects | `py-section-padding-lg` | ≥ 80 px | None — correct |
| ExperienceSection | `py-section-padding-lg` | ≥ 80 px | None — correct |
| ProcessSection | `py-section-padding-lg` | ≥ 80 px | None — correct |
| ContactSection | `py-section-padding-lg` | ≥ 80 px | None — correct |

Heading-to-content spacing (`mb-16` = 64 px on desktop, `mb-12` = 48 px minimum) is present in TechStack, FeaturedProjects, ProcessSection. Sections without a sub-heading block (ImpactStats, ClientsMarquee) use `mb-12` between the label and the grid.

The ContactSection card currently uses `p-12` (48 px) on all sides. On mobile this can feel cramped. Change to `p-8 md:p-12` to give 32 px padding on mobile (addresses Requirement 4.2 spirit and Requirement 5.7).

---

### 5. Full Responsiveness Fixes

#### Hero

Current: `md:grid-cols-2` — collapses to single column on mobile automatically. Image block is the second grid item so it naturally falls below text. No change required for text/image order.

Verify `max-w-lg` on the `<Image>` wrapper prevents overflow. The `w-full` class already constrains it to its grid cell. No changes needed.

#### ImpactStats

Current: `grid-cols-2 md:grid-cols-5` with `col-span-2 md:col-span-1` on the last stat. This is correct — the 5th stat spans two columns on mobile to center itself. No changes needed.

#### TechStack

Current: `grid-cols-2 md:grid-cols-4`. Already correct per Requirement 5.4. No changes needed.

#### FeaturedProjects

Current project cards use `w-full md:w-[780px]` for full-width cards and `w-full md:w-[388px]` for half-width cards. On mobile, `w-full` means the card fills the slider container width. The slider container is `overflow-x-auto` with `snap-x snap-mandatory`. This is correct behaviour.

The `slider-container` has no explicit width, which means it inherits from `Container` → `max-w-container-max`. That is fine. No changes needed.

Verify `pb-8` gives enough clearance for the dot indicators below. The dots are rendered with `mt-8` outside the slider, so they sit below. No change needed.

#### ExperienceSection

Current: `md:grid-cols-3` — collapses to single column on mobile. The left panel (heading + description) and right panel (timeline, `md:col-span-2`) stack vertically. No changes needed.

#### ProcessSection

Current: `grid-cols-1 md:grid-cols-3 lg:grid-cols-6`. Matches Requirement 5.6 exactly. No changes needed.

#### ContactSection

Current: `flex flex-col ... md:flex-row`. Collapses to vertical stack on mobile. The card uses `p-12` everywhere. Change to `p-8 md:p-12` (32 px mobile, 48 px desktop) to improve mobile spacing.

Also add `text-center md:text-left` is already present. CTA buttons use `flex-col sm:flex-row` for their row — already correct.

#### Navbar

Current: fixed `h-16` in `<Container className="flex h-16 items-center justify-between">`. The hamburger button and Resume button are both in the right-side `<div>`. At no breakpoint does the nav wrap. Confirmed no changes needed beyond the mobile menu addition.

---

### 6. Clients Marquee Data

#### `app/data/clients.ts` — new type and data

```ts
export type Client = {
  name: string;
  url: string;
  category: "shopify" | "wordpress";
};

export const clients: Client[] = [
  // Shopify (11)
  { name: "Soapbox",              url: "https://www.soapboxsoaps.com/",         category: "shopify" },
  { name: "The Detox Market",     url: "https://www.thedetoxmarket.ca/",        category: "shopify" },
  { name: "Maeva",                url: "https://maeva.co/",                     category: "shopify" },
  { name: "Violet Grey",          url: "https://www.violetgrey.com/",           category: "shopify" },
  { name: "Vitality CBD",         url: "https://vitalitycbd.co.uk/",            category: "shopify" },
  { name: "Bitsy Bug Boutique",   url: "https://bitsybugboutique.com/",         category: "shopify" },
  { name: "Fanarch",              url: "https://fanarch.com/",                  category: "shopify" },
  { name: "Jewelry Lab",          url: "https://jewelrylab.co/",                category: "shopify" },
  { name: "Reggie Begelton",      url: "https://reggiebegelton.com/",           category: "shopify" },
  { name: "Goldfarb Inc",         url: "https://goldfarbinc.com/",              category: "shopify" },
  { name: "Keeot",                url: "https://keeot.com/",                    category: "shopify" },
  // WordPress (5)
  { name: "Stride Care",          url: "https://www.stridecare.com/",           category: "wordpress" },
  { name: "Nashville Song Critique", url: "https://nashvillesongcritique.com/", category: "wordpress" },
  { name: "Gables Cinema",        url: "https://gablescinema.com/",             category: "wordpress" },
  { name: "Sudsies",              url: "https://sudsies.com/",                  category: "wordpress" },
  { name: "Coral Gables Chamber", url: "https://coralgableschamber.org/",       category: "wordpress" },
];
```

#### `app/components/sections/clients-marquee.tsx` — ClientList update

`ClientList` currently maps `clients` (a `string[]`) to `<span>` elements using the string as both `key` and display text. After the data change, `clients` is `Client[]`, so `ClientList` must be updated:

```tsx
function ClientList() {
  return (
    <>
      {clients.map((client) => (
        <a
          key={client.url}
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap font-display-lg text-xl text-white/40 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-2xl"
        >
          {client.name}
        </a>
      ))}
    </>
  );
}
```

Changes:
- `<span key={client}>` → `<a key={client.url} href={client.url} ...>`
- Display value changes from `{client}` (string) to `{client.name}`
- Same hover classes preserved exactly

---

## Data Models

### Client (new)

```ts
type Client = {
  name: string;           // Brand display name
  url: string;            // Fully qualified URL including https://
  category: "shopify" | "wordpress";  // Platform for filtering/display
};
```

### SiteConfig (modified)

```ts
type SiteConfig = {
  name: string;
  title: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  avatar: string;
  heroImage: string;
  location: string;
  timezone: string;
  calendly: string;   // ← NEW: empty string = fall back to linkedin
};
```

### Navigation (unchanged)

```ts
type NavigationItem = { title: string; href: string };
```

### useScrollFadeIn return shape

```ts
type ScrollFadeInResult = {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
};
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Prework reflection:** After reviewing the acceptance criteria, the following criteria yield meaningful universally-quantified properties: mobile menu toggle (1.4), mobile menu content completeness (1.5), link-click closes menu (1.6), icon state mapping (1.7), Calendly fallback logic (2.4), scroll animation monotonicity (3.3), and ClientEntry anchor rendering (6.2). Criteria 1.4 and 1.6 both test "closing the menu" but from different triggers — they are not redundant because 1.4 tests the toggle pathway and 1.6 tests the link-click pathway. These are kept separate. Criteria 1.5 and 1.6 involve different aspects of the same menu (content vs. close-on-click) and cannot be combined. Property 3 (icon state) is implied if the menu open/close state is correct, but it tests a separate rendering concern (which icon element is shown) that is worth keeping explicit. No redundancy justifies consolidation.

---

### Property 1: Mobile menu toggle is idempotent per cycle

*For any* open mobile menu state, activating the HamburgerButton sets `isMobileMenuOpen` to `false`; for any closed state, activating it sets `isMobileMenuOpen` to `true`.

**Validates: Requirements 1.3, 1.4**

---

### Property 2: Mobile menu renders all navigation items

*For any* navigation data array, when the mobile menu is open, every item in that array must appear as a rendered link element inside the mobile menu panel.

**Validates: Requirements 1.5**

---

### Property 3: Clicking any mobile menu link closes the menu

*For any* navigation link rendered inside the open mobile menu, activating that link must result in `isMobileMenuOpen` becoming `false`.

**Validates: Requirements 1.6**

---

### Property 4: Hamburger icon reflects open state

*For any* value of `isMobileMenuOpen`, the Navbar must render a close icon (`close`) when the value is `true` and a hamburger icon (`menu`) when the value is `false`.

**Validates: Requirements 1.7**

---

### Property 5: Calendly fallback is correct for all URL combinations

*For any* non-empty `linkedin` URL string and any `calendly` string, `bookingUrl` equals `calendly` when `calendly` is non-empty, and equals `linkedin` when `calendly` is an empty string.

**Validates: Requirements 2.2, 2.4**

---

### Property 6: Scroll fade-in visibility is monotonically increasing

*For any* section that has reached the `isVisible = true` state, no subsequent IntersectionObserver callback (with `isIntersecting = false`) shall change `isVisible` back to `false`.

**Validates: Requirements 3.3**

---

### Property 7: Every client entry renders as a correctly attributed anchor

*For any* array of `Client` objects, every rendered client element must be an anchor (`<a>`) whose `href` matches `client.url`, `target` is `"_blank"`, and `rel` is `"noopener noreferrer"`.

**Validates: Requirements 6.2**

---

## Error Handling

### Mobile Menu

- If `navigation` data is empty, the mobile menu renders no links but still opens/closes correctly. The Resume button is always shown.
- Escape key and resize listeners are registered only when `isMobileMenuOpen` is `true` — the effect cleans up both listeners on close or unmount, preventing memory leaks.
- Body scroll lock uses `document.body.style.overflow` which is a string assignment — safe in all browsers. The cleanup effect always resets to `""` on unmount regardless of open state.

### Calendly Integration

- `siteConfig.calendly` is initialized as `""`. The fallback `siteConfig.calendly || siteConfig.linkedin` handles all cases: empty string, undefined (if mistyped), null — all are falsy and fall back to LinkedIn.
- The BookACallButton always has a valid `href` because `siteConfig.linkedin` is always a non-empty string in the current config.

### Scroll Fade-in Hook

- `typeof IntersectionObserver === "undefined"` guard covers SSR (Next.js server render) and very old browsers. In both cases `isVisible` is set to `true` immediately, ensuring content is always visible.
- `useEffect` cleanup calls `observer.disconnect()` — covers component unmount before the first intersection fires.
- The `ref.current` null check prevents the observer from calling `observe(null)`.

### Clients Marquee

- Using `client.url` as the React `key` is safe because all URLs in the data are unique. If duplicate URLs were ever added, the key collision would surface as a React warning.
- `target="_blank"` with `rel="noopener noreferrer"` prevents tab-napping attacks on opened URLs.

---

## Testing Strategy

### Overall Approach

This feature set is primarily UI rendering, CSS-driven interaction, and configuration changes. The testing strategy uses a combination of:

- **Property-based tests** for the pure logic portions: menu state transitions, booking URL derivation, scroll animation monotonicity, and client anchor rendering.
- **Example-based unit tests** for specific interaction behaviours: Escape key, resize handler, body scroll lock, ARIA attributes.
- **Smoke tests** for structural/configuration checks: hook exports, data shape, heading text.

The property-based testing library is **fast-check** (TypeScript-native, works with Jest/Vitest). Each property test runs a minimum of 100 iterations.

---

### Property-Based Tests

Each property below maps directly to a Correctness Property from the design.

#### Property 1 — Mobile menu toggle is idempotent per cycle

**Tag:** `Feature: portfolio-ui-enhancements, Property 1: Mobile menu toggle is idempotent per cycle`

- Generate a random initial boolean state for `isMobileMenuOpen`
- Simulate one `toggleMenu()` call
- Assert the result is the logical NOT of the initial state
- Run 100 iterations with `fc.boolean()` as the generator

```ts
fc.assert(
  fc.property(fc.boolean(), (initial) => {
    const result = toggle(initial);
    expect(result).toBe(!initial);
  }),
  { numRuns: 100 }
);
```

#### Property 2 — Mobile menu renders all navigation items

**Tag:** `Feature: portfolio-ui-enhancements, Property 2: Mobile menu renders all navigation items`

- Generate a random array of `{ title: string; href: string }` navigation items (1–10 items)
- Render the MobileMenu with those items and `isOpen = true`
- Assert every generated title appears in the rendered output
- Run 100 iterations

#### Property 3 — Clicking any mobile menu link closes the menu

**Tag:** `Feature: portfolio-ui-enhancements, Property 3: Clicking any mobile menu link closes the menu`

- Generate a random non-empty navigation array
- Pick a random index from that array
- Render the open mobile menu, simulate a click on the link at that index
- Assert `isMobileMenuOpen` is `false`
- Run 100 iterations

#### Property 4 — Hamburger icon reflects open state

**Tag:** `Feature: portfolio-ui-enhancements, Property 4: Hamburger icon reflects open state`

- Generate a random boolean for `isMobileMenuOpen`
- Render Navbar with that state
- Assert the Material Icon name rendered in the hamburger button equals `"close"` when `true` and `"menu"` when `false`
- Run 100 iterations with `fc.boolean()`

#### Property 5 — Calendly fallback is correct for all URL combinations

**Tag:** `Feature: portfolio-ui-enhancements, Property 5: Calendly fallback is correct for all URL combinations`

Pure function — no rendering needed. Test the derivation logic directly:

```ts
const computeBookingUrl = (calendly: string, linkedin: string) =>
  calendly || linkedin;

fc.assert(
  fc.property(
    fc.webUrl(),               // non-empty linkedin
    fc.oneof(fc.constant(""), fc.webUrl()),  // empty or non-empty calendly
    (linkedin, calendly) => {
      const url = computeBookingUrl(calendly, linkedin);
      if (calendly) expect(url).toBe(calendly);
      else expect(url).toBe(linkedin);
    }
  ),
  { numRuns: 100 }
);
```

#### Property 6 — Scroll fade-in visibility is monotonically increasing

**Tag:** `Feature: portfolio-ui-enhancements, Property 6: Scroll fade-in visibility is monotonically increasing`

- Instantiate `useScrollFadeIn` in a test harness
- Fire a mock IntersectionObserver callback with `isIntersecting: true`
- Assert `isVisible === true`
- Then fire additional callbacks with `isIntersecting: false`
- Assert `isVisible` remains `true`
- Run 100 iterations varying the number of subsequent `false` callbacks

#### Property 7 — Every client entry renders as a correctly attributed anchor

**Tag:** `Feature: portfolio-ui-enhancements, Property 7: Every client entry renders as a correctly attributed anchor`

- Generate a random array of `Client` objects (1–20 items) with arbitrary `name`, `url`, and `category`
- Render `ClientList` with that data
- For every rendered anchor element, assert `href === client.url`, `target === "_blank"`, `rel === "noopener noreferrer"`
- Run 100 iterations

---

### Example-Based Unit Tests

- **Escape key closes menu**: simulate `keydown` with `key: "Escape"` when menu is open → `isMobileMenuOpen === false`
- **Viewport resize closes menu**: simulate `resize` event with `window.innerWidth = 800` when menu is open → menu closes
- **Body scroll lock**: when menu opens → `document.body.style.overflow === "hidden"`; when closes → `""`
- **Calendly link opens in new tab**: render ContactSection with a non-empty `calendly` value → `<a>` has `target="_blank"` and `rel="noopener noreferrer"`
- **Book a Call uses calendly URL**: render ContactSection, verify `href === siteConfig.calendly`
- **IntersectionObserver threshold**: verify `new IntersectionObserver(...)` is called with `{ threshold: 0.15 }`
- **Marquee dual list**: render `ClientsMarquee`, verify two sets of client links exist (one real, one `aria-hidden`)
- **Reduced motion CSS**: verify `.scroll-fade-in` under `@media (prefers-reduced-motion: reduce)` has `opacity: 1` and `transition: none`

---

### Smoke Tests

- `useScrollFadeIn` is exported from `app/hooks/useScrollFadeIn.ts`
- `siteConfig.calendly` property exists and is a string
- `clients` array has length 16, with 11 `"shopify"` entries and 5 `"wordpress"` entries
- `clients` array contains no entries with dummy names (e.g. "Luxe Interiors", "Nexus Tech")
- `ClientsMarquee` heading contains text "Trusted By Industry Leaders"
- `Container` renders with `px-gutter` class

---

## File Changes Summary

| File | Action | Description |
|---|---|---|
| `app/data/site.ts` | Modify | Add `calendly: ""` to `siteConfig` |
| `app/data/clients.ts` | Replace | `string[]` → `Client[]` with 16 real brand entries |
| `app/hooks/useScrollFadeIn.ts` | Create | IntersectionObserver hook returning `{ ref, isVisible }` |
| `app/globals.css` | Modify | Add `.scroll-fade-in`, `.scroll-fade-in.visible`, and `@media (prefers-reduced-motion)` rules |
| `app/components/layout/navbar.tsx` | Modify | Add `isMobileMenuOpen` state, HamburgerButton, MobileMenu panel, Escape/resize/scroll-lock effects |
| `app/components/sections/contact.tsx` | Modify | Add `"use client"`, `bookingUrl` derivation, `useScrollFadeIn`, `p-8 md:p-12` on card |
| `app/components/sections/clients-marquee.tsx` | Modify | Update `ClientList` to render `<a>` tags from `Client` objects |
| `app/components/sections/impact-stats.tsx` | Modify | Add `"use client"` + `useScrollFadeIn` |
| `app/components/sections/tech-stack.tsx` | Modify | Add `"use client"` + `useScrollFadeIn` |
| `app/components/sections/featured-projects.tsx` | Modify | Add `useScrollFadeIn` (already `"use client"`) |
| `app/components/sections/experience.tsx` | Modify | Add `"use client"` + `useScrollFadeIn` |
| `app/components/sections/process.tsx` | Modify | Add `"use client"` + `useScrollFadeIn` |
| `app/components/sections/hero.tsx` | No change | Already has `.fade-in` CSS animation; scroll hook not needed |
| `app/components/shared/container.tsx` | No change | Already uses `px-gutter max-w-container-max` |
| `app/components/layout/footer.tsx` | No change | No enhancements touch the footer |
