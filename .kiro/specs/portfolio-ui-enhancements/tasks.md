# Implementation Plan: Portfolio UI Enhancements

## Overview

Incremental implementation of six UI enhancement areas: data/foundation changes first, then the shared scroll animation hook and CSS, then individual component updates (mobile nav, clients marquee, and all scroll-animated sections) in parallel once their foundations are in place.

## Tasks

- [ ] 1. Foundation — update siteConfig and clients data
  - [x] 1.1 Add `calendly: ""` field to `siteConfig` in `app/data/site.ts`
    - Insert the `calendly` property (empty string) into the existing `siteConfig` object so downstream components can reference it
    - _Requirements: 2.1_

  - [x] 1.2 Replace `string[]` clients with typed `Client[]` array in `app/data/clients.ts`
    - Export a new `Client` type: `{ name: string; url: string; category: "shopify" | "wordpress" }`
    - Replace the existing `clients` export with the 16 real brand entries (11 Shopify + 5 WordPress) exactly as listed in the design document
    - Remove any placeholder or dummy entries
    - _Requirements: 6.1, 6.6_

- [x] 2. Create `useScrollFadeIn` hook and CSS animation classes
  - [x] 2.1 Create `app/hooks/useScrollFadeIn.ts`
    - Add `"use client"` directive at the top
    - Use `useRef<HTMLElement | null>` and `useState<boolean>(false)`
    - In `useEffect`: guard with `typeof IntersectionObserver === "undefined"` → `setIsVisible(true)` immediately as progressive enhancement fallback
    - Construct `IntersectionObserver` with `threshold: 0.15`; on `entry.isIntersecting`, call `setIsVisible(true)` then `observer.unobserve(el)` so the animation fires exactly once
    - Return `{ ref, isVisible }`
    - Cleanup: call `observer.disconnect()` on effect teardown
    - _Requirements: 3.4, 3.6, 3.7_

  - [ ]* 2.2 Write property test for scroll fade-in visibility monotonicity (Property 6)
    - **Property 6: Scroll fade-in visibility is monotonically increasing**
    - Install `fast-check` if not present; set up test harness with a mock IntersectionObserver
    - Generate random counts (1–20) of subsequent `isIntersecting: false` callbacks after one `isIntersecting: true` callback
    - Assert `isVisible` remains `true` after each subsequent `false` callback
    - **Validates: Requirements 3.3**

  - [x] 2.3 Add scroll animation CSS classes to `app/globals.css`
    - Add `.scroll-fade-in` rule: `opacity: 0; transform: translateY(20px); transition: opacity 600ms ease-out, transform 600ms ease-out`
    - Add `.scroll-fade-in.visible` rule: `opacity: 1; transform: translateY(0)`
    - Add `@media (prefers-reduced-motion: reduce)` block overriding `.scroll-fade-in` to `opacity: 1; transform: none; transition: none`
    - _Requirements: 3.2, 3.5_

- [x] 3. Mobile Navigation Menu
  - [x] 3.1 Add `isMobileMenuOpen` state and `HamburgerButton` to `app/components/layout/navbar.tsx`
    - Add `const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)` with `toggleMenu` and `closeMenu` helpers
    - Render `HamburgerButton` inside the existing right-side `<div className="flex items-center gap-4">`, before the Resume button, with `className="md:hidden"`
    - Button shows `menu` Material Icon when `!isMobileMenuOpen`, `close` icon when `isMobileMenuOpen`
    - Set `aria-expanded={isMobileMenuOpen}`, `aria-label`, and `aria-controls="mobile-menu"` on the button
    - _Requirements: 1.1, 1.2, 1.7_

  - [x] 3.2 Add `MobileMenu` panel to `app/components/layout/navbar.tsx`
    - Render a `<div id="mobile-menu">` immediately after the closing `</nav>` tag
    - Use `max-height` CSS transition (NOT conditional render) to open/close: `max-h-screen opacity-100` when open, `max-h-0 opacity-0` when closed; `transition-all duration-300 ease-in-out`
    - Apply `glass-nav fixed top-16 left-0 right-0 z-40 overflow-hidden border-b border-outline-variant/20 md:hidden`
    - Render all `navigation` items as `<Link>` elements — each calls `closeMenu` on click
    - Render the Resume download `<Link>` at the bottom of the panel
    - Set `aria-hidden={!isMobileMenuOpen}` on the panel
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 1.10_

  - [x] 3.3 Add Escape key, viewport resize, and body scroll-lock effects to `app/components/layout/navbar.tsx`
    - Add a `useEffect` (dep: `isMobileMenuOpen`) that registers `keydown` and `resize` listeners only when `isMobileMenuOpen` is `true`; Escape key calls `closeMenu`; resize calls `closeMenu` when `window.innerWidth >= 768`; cleanup removes both listeners
    - Add a separate `useEffect` (dep: `isMobileMenuOpen`) that sets `document.body.style.overflow = "hidden"` when open and `""` when closed; cleanup always resets to `""`
    - _Requirements: 1.8, 1.9_

  - [ ]* 3.4 Write property tests for mobile menu state (Properties 1, 2, 3, 4)
    - **Property 1: Mobile menu toggle is idempotent per cycle**
    - Generate `fc.boolean()` initial state; assert `toggleMenu(initial) === !initial` — 100 runs
    - **Validates: Requirements 1.3, 1.4**
    - **Property 2: Mobile menu renders all navigation items**
    - Generate `fc.array` of `{ title: string; href: string }` (1–10 items); render open menu; assert every title appears — 100 runs
    - **Validates: Requirements 1.5**
    - **Property 3: Clicking any mobile menu link closes the menu**
    - Generate non-empty nav array; pick random index; simulate click; assert `isMobileMenuOpen === false` — 100 runs
    - **Validates: Requirements 1.6**
    - **Property 4: Hamburger icon reflects open state**
    - Generate `fc.boolean()`; assert icon name is `"close"` when `true`, `"menu"` when `false` — 100 runs
    - **Validates: Requirements 1.7**

- [x] 4. Update ClientsMarquee to render typed `Client` objects
  - [x] 4.1 Update `ClientList` in `app/components/sections/clients-marquee.tsx`
    - Change `<span key={client}>` to `<a key={client.url} href={client.url} target="_blank" rel="noopener noreferrer">`
    - Change display value from `{client}` (string) to `{client.name}`
    - Preserve existing hover CSS classes exactly (`whitespace-nowrap font-display-lg text-xl text-white/40 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-2xl`)
    - _Requirements: 6.2, 6.4, 6.5_

  - [ ]* 4.2 Write property test for client anchor rendering (Property 7)
    - **Property 7: Every client entry renders as a correctly attributed anchor**
    - Generate `fc.array` of `Client` objects (1–20 items); render `ClientList`; assert every `<a>` element has `href === client.url`, `target === "_blank"`, `rel === "noopener noreferrer"` — 100 runs
    - **Validates: Requirements 6.2**

- [x] 5. Checkpoint — foundation and shared utilities complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Add scroll animations to `ContactSection`
  - [x] 6.1 Update `app/components/sections/contact.tsx` with `useScrollFadeIn`, Calendly fallback, and mobile padding
    - Add `"use client"` directive at the top of the file
    - Import `useScrollFadeIn` from `../../hooks/useScrollFadeIn`
    - Derive `const bookingUrl = siteConfig.calendly || siteConfig.linkedin` before the JSX return
    - Replace `href={siteConfig.linkedin}` on the Book a Call button with `href={bookingUrl}`; keep `target="_blank"` and `rel="noopener noreferrer"` unchanged
    - Apply `scroll-fade-in` and conditional `visible` class to the root `<section>` element; attach `ref` from the hook
    - Change card padding from `p-12` to `p-8 md:p-12`
    - _Requirements: 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 5.7_

  - [ ]* 6.2 Write property test for Calendly fallback logic (Property 5)
    - **Property 5: Calendly fallback is correct for all URL combinations**
    - Pure function: `computeBookingUrl = (calendly, linkedin) => calendly || linkedin`
    - Generate `fc.webUrl()` for linkedin and `fc.oneof(fc.constant(""), fc.webUrl())` for calendly
    - Assert result equals `calendly` when non-empty, `linkedin` when `calendly` is `""`  — 100 runs
    - **Validates: Requirements 2.2, 2.4**

- [x] 7. Add scroll animations to `ImpactStats`
  - [x] 7.1 Update `app/components/sections/impact-stats.tsx`
    - Add `"use client"` directive
    - Import and call `useScrollFadeIn`; destructure `{ ref, isVisible }`
    - Apply `scroll-fade-in` and `${isVisible ? "visible" : ""}` to the root `<section>` className; attach `ref`
    - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [x] 8. Add scroll animations to `TechStack`
  - [x] 8.1 Update `app/components/sections/tech-stack.tsx`
    - Add `"use client"` directive
    - Import and call `useScrollFadeIn`; destructure `{ ref, isVisible }`
    - Apply `scroll-fade-in` and conditional `visible` class to the root `<section>`; attach `ref`
    - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [x] 9. Add scroll animations to `FeaturedProjects`
  - [x] 9.1 Update `app/components/sections/featured-projects.tsx`
    - File is already `"use client"` — no directive change needed
    - Import and call `useScrollFadeIn`; destructure `{ ref, isVisible }`
    - Apply `scroll-fade-in` and conditional `visible` class to the root `<section>`; attach `ref`
    - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [x] 10. Add scroll animations to `ExperienceSection`
  - [x] 10.1 Update `app/components/sections/experience.tsx`
    - Add `"use client"` directive
    - Import and call `useScrollFadeIn`; destructure `{ ref, isVisible }`
    - Apply `scroll-fade-in` and conditional `visible` class to the root `<section>`; attach `ref`
    - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [x] 11. Add scroll animations to `ProcessSection`
  - [x] 11.1 Update `app/components/sections/process.tsx`
    - Add `"use client"` directive
    - Import and call `useScrollFadeIn`; destructure `{ ref, isVisible }`
    - Apply `scroll-fade-in` and conditional `visible` class to the root `<section>`; attach `ref`
    - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [x] 12. Final checkpoint — all enhancements complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Tasks 3 and 4 can run in parallel after Task 1 completes (both depend only on `site.ts` / `clients.ts` data)
- Tasks 6–11 can all run in parallel after Task 2 completes (all depend only on the `useScrollFadeIn` hook and CSS classes)
- Each task references specific requirements for traceability
- Property tests use `fast-check` as the PBT library (TypeScript-native, works with Jest/Vitest)
- The design's Correctness Properties section drives the property test sub-tasks (Properties 1–7)
- `hero.tsx` is intentionally excluded — it already has a `.fade-in` CSS animation and does not need the scroll hook

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "2.3", "3.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2"] },
    { "id": 3, "tasks": ["3.3", "6.1", "7.1", "8.1", "9.1", "10.1", "11.1"] },
    { "id": 4, "tasks": ["3.4", "6.2"] }
  ]
}
```
