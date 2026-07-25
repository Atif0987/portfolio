# Requirements Document

## Introduction

This document covers six UI enhancement areas for the Atif Raza portfolio website — a Next.js 16 / React 19 / Tailwind CSS 4 application. The enhancements are: (1) a mobile hamburger navigation menu with smooth open/close interaction, (2) replacing the LinkedIn URL on "Book a Call" with a Calendly booking link, (3) scroll-triggered fade-in animations for every page section, (4) a spacing and padding audit across desktop and mobile, (5) full responsiveness across all breakpoints, and (6) replacing placeholder client entries in the marquee with real Shopify and WordPress project brand names and URLs.

## Glossary

- **Navbar**: The fixed top navigation bar implemented in `app/components/layout/navbar.tsx`.
- **MobileMenu**: The slide-in or overlay navigation drawer rendered on viewports narrower than the `md` Tailwind breakpoint (< 768 px).
- **HamburgerButton**: The icon button in the Navbar that toggles the MobileMenu open and closed on mobile viewports.
- **BookACallButton**: The secondary CTA link rendered in `ContactSection` that currently points to the LinkedIn profile URL.
- **CalendlyLink**: The Calendly scheduling URL stored in `siteConfig` that replaces the LinkedIn URL on the BookACallButton.
- **ScrollFadeIn**: A CSS/JS mechanism that transitions a section element from `opacity: 0; transform: translateY(20px)` to `opacity: 1; transform: translateY(0)` once the element enters the viewport.
- **IntersectionObserver**: The browser API used to detect when a section crosses the viewport threshold for ScrollFadeIn.
- **ClientsMarquee**: The horizontally scrolling ticker implemented in `app/components/sections/clients-marquee.tsx`.
- **ClientEntry**: A single item in the ClientsMarquee consisting of a brand name rendered as a clickable anchor tag.
- **SiteConfig**: The configuration object exported from `app/data/site.ts`.
- **Section**: Any of the eight full-width page sections: Hero, ClientsMarquee, ImpactStats, TechStack, FeaturedProjects, Experience, Process, Contact.
- **Container**: The max-width wrapper component at `app/components/shared/container.tsx` that applies horizontal gutter padding.

---

## Requirements

### Requirement 1: Mobile Navigation Menu

**User Story:** As a visitor on a mobile device, I want a hamburger button that opens and closes a navigation menu, so that I can access all navigation links without a cluttered header.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768 px, THE Navbar SHALL display a HamburgerButton in place of the desktop navigation link row.
2. WHEN the viewport width is 768 px or greater, THE Navbar SHALL hide the HamburgerButton and display the desktop navigation link row.
3. WHEN the HamburgerButton is activated, THE MobileMenu SHALL open with a smooth transition of 300 ms or less.
4. WHEN the MobileMenu is open and the HamburgerButton is activated again, THE MobileMenu SHALL close with a smooth transition of 300 ms or less.
5. WHILE the MobileMenu is open, THE MobileMenu SHALL display all navigation links defined in `navigation` data and the Resume download button.
6. WHEN a navigation link inside the MobileMenu is activated, THE MobileMenu SHALL close automatically.
7. WHILE the MobileMenu is open, THE Navbar SHALL render a close icon (✕) in place of the hamburger icon to indicate the dismissal action.
8. WHEN the MobileMenu is open and the user presses the Escape key, THE MobileMenu SHALL close.
9. WHILE the MobileMenu is open, THE Page SHALL prevent body scroll to avoid content shifting behind the overlay.
10. THE MobileMenu SHALL be keyboard accessible with Tab navigation through all links and the close button.

---

### Requirement 2: Calendly Integration on "Book a Call" Button

**User Story:** As a potential client or employer, I want to click "Book a Call" and land directly on a Calendly scheduling page, so that I can book time without leaving the site or navigating through LinkedIn.

#### Acceptance Criteria

1. THE SiteConfig SHALL expose a `calendly` property containing the Calendly scheduling URL.
2. WHEN the BookACallButton is rendered, THE ContactSection SHALL use `siteConfig.calendly` as the `href` attribute instead of `siteConfig.linkedin`.
3. THE BookACallButton SHALL open the Calendly URL in a new browser tab with `target="_blank"` and `rel="noopener noreferrer"`.
4. IF `siteConfig.calendly` is an empty string, THEN THE BookACallButton SHALL fall back to `siteConfig.linkedin` as the `href` attribute.

---

### Requirement 3: Section Scroll Fade-in Animations

**User Story:** As a visitor scrolling down the page, I want each section to fade in as it enters the viewport, so that the page feels polished and progressive.

#### Acceptance Criteria

1. WHEN a Section enters the viewport by at least 15% of the element's height, THE Section SHALL begin the ScrollFadeIn transition.
2. THE ScrollFadeIn transition SHALL animate `opacity` from `0` to `1` and `transform` from `translateY(20px)` to `translateY(0)` over 600 ms with an ease-out timing function.
3. WHEN a Section has already completed the ScrollFadeIn transition, THE Section SHALL remain visible and SHALL NOT re-animate on subsequent scroll events.
4. THE ScrollFadeIn mechanism SHALL use IntersectionObserver with a threshold of 0.15.
5. WHERE the user has enabled the `prefers-reduced-motion` media feature, THE Section SHALL display without the ScrollFadeIn transition and SHALL be immediately visible.
6. THE ScrollFadeIn mechanism SHALL be implemented as a reusable React hook or wrapper component so that any Section can adopt it without duplicating logic.
7. WHEN JavaScript is disabled or IntersectionObserver is unavailable, THE Section SHALL be visible without animation (progressive enhancement fallback).

---

### Requirement 4: Section Spacing Review and Consistency

**User Story:** As a visitor, I want consistent vertical spacing between every section, so that the page layout feels intentional and polished on all screen sizes.

#### Acceptance Criteria

1. THE Page SHALL apply a minimum vertical padding of 80 px (`py-section-padding-md`) to each Section on viewport widths of 768 px and above.
2. THE Page SHALL apply a minimum vertical padding of 48 px to each Section on viewport widths below 768 px.
3. THE ClientsMarquee Section SHALL use vertical padding of 48 px (`py-12`) on all viewports to maintain its compact visual role.
4. THE ImpactStats Section SHALL use vertical padding of 80 px (`py-section-padding-md`) on all viewports.
5. THE Container component SHALL apply horizontal gutter padding of 24 px (`px-gutter`) on all viewports.
6. WHEN a Section contains a heading and a sub-paragraph, THE Section SHALL apply a bottom margin of 48 px between that header block and the content below it on viewports 768 px and above.
7. WHEN a Section contains a heading and a sub-paragraph, THE Section SHALL apply a bottom margin of 32 px between that header block and the content below it on viewports below 768 px.

---

### Requirement 5: Full Responsiveness Across All Device Sizes

**User Story:** As a visitor on any device — mobile, tablet, or desktop — I want every section to render without overflow, truncation, or broken layout, so that the portfolio looks professional regardless of screen size.

#### Acceptance Criteria

1. THE Page SHALL render without horizontal overflow on viewports 320 px wide and above.
2. THE Hero Section SHALL switch from a two-column grid layout to a single-column stacked layout on viewports below 768 px, with the text block above the image.
3. THE FeaturedProjects Section slider SHALL be horizontally scrollable with visible scroll snap on viewports below 768 px, and SHALL NOT show partially clipped cards on the initial load.
4. THE TechStack grid SHALL render as two columns on viewports below 768 px and four columns on viewports 768 px and above.
5. THE ExperienceSection grid SHALL collapse from the three-column layout to a single-column layout on viewports below 768 px.
6. THE ProcessSection grid SHALL render as a single column on viewports below 768 px, two columns on viewports 768–1023 px, and six columns on viewports 1024 px and above.
7. THE ContactSection card SHALL render in a single-column stacked layout with centered text on viewports below 768 px, and SHALL display the two-column side-by-side layout on viewports 768 px and above.
8. THE Navbar SHALL maintain a single-row height of 64 px on all viewports and SHALL NOT wrap its content onto a second row.
9. IF an image's natural width exceeds the width of its parent container, THEN THE Image component SHALL scale down to fit within the container without cropping or stretching.

---

### Requirement 6: Replace Clients Marquee with Real Brand Data

**User Story:** As a visitor, I want to see the real brands Atif has worked with in the marquee, so that I can verify his client history and visit the actual project sites.

#### Acceptance Criteria

1. THE `clients` data export in `app/data/clients.ts` SHALL be replaced with a typed array of `{ name: string; url: string; category: "shopify" | "wordpress" }` objects containing the 16 real client entries listed in the project brief.
2. THE ClientsMarquee SHALL render each ClientEntry as an anchor tag (`<a>`) with `href` set to the client's URL, `target="_blank"`, and `rel="noopener noreferrer"`.
3. THE ClientsMarquee SHALL continue to use the dual-list infinite-scroll marquee pattern (two identical lists side by side) to ensure seamless looping.
4. WHEN a ClientEntry anchor is hovered, THE ClientEntry SHALL apply the existing hover style (`text-white` and `drop-shadow`) that was previously applied to the plain `<span>` elements.
5. THE ClientsMarquee heading text SHALL remain "Trusted By Industry Leaders".
6. THE `clients` array SHALL include all 11 Shopify project entries and all 5 WordPress project entries exactly as specified in the project brief, with no placeholder or dummy entries.
