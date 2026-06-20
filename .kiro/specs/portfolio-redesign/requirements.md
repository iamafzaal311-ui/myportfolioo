# Requirements Document

## Introduction

This feature covers the complete redesign and upgrade of Muhammad Afzaal's personal developer portfolio website. The goal is to transform the current vanilla HTML/CSS/JS site — which uses two conflicting CSS systems, a basic sidebar layout, and has no working dark mode or animations — into a modern, professional, performance-optimized portfolio. The redesign must showcase Muhammad as a credible, skilled Flutter/Mobile developer to potential clients and employers. The new design should use a confident, encouraging color palette and introduce pro-level features: smooth scroll animations, skill progress bars, an experience/education timeline, project carousels with phone mockups, stats counters, a testimonials placeholder, and a fully unified, maintainable codebase. All existing project data, assets, and content must be preserved and enhanced.

---

## Glossary

- **Portfolio_Site**: The single-page application (SPA) served from `index.html` that represents Muhammad Afzaal's developer portfolio.
- **Theme_System**: The CSS custom properties (`--*` variables) and `data-theme` attribute mechanism that controls light/dark mode appearance.
- **Navigation**: The fixed pill-shaped top navigation bar or equivalent mechanism for switching between page sections.
- **Hero_Section**: The primary landing view shown first when the page loads, containing name, title, tagline, CTA buttons, and a profile photo.
- **Skills_Section**: The page section that displays technical competencies with animated progress indicators.
- **Timeline_Section**: The page section that presents education and experience in chronological card format.
- **Projects_Section**: The page section that displays project cards with phone mockup overlays for detail views.
- **Stats_Counter**: An animated number counter component that increments from zero to a target value on scroll.
- **Testimonials_Section**: A placeholder section for future client or peer reviews, styled as quote cards.
- **Contact_Section**: The page section with social/contact channel cards and an inline email form.
- **Overlay**: The full-screen or modal layer that appears over the page when a project card is clicked, showing detailed project information and media.
- **Carousel**: A swipeable/clickable image slider inside the phone mockup used to show project screenshots.
- **Scroll_Animation**: CSS/JS-driven entrance animations triggered when an element enters the viewport via IntersectionObserver.
- **CSS_Variable**: A custom property defined in `:root` used throughout the stylesheet to maintain visual consistency.
- **Breakpoint_Mobile**: Viewport width ≤ 768 px.
- **Breakpoint_Tablet**: Viewport width between 769 px and 1024 px.
- **Breakpoint_Desktop**: Viewport width ≥ 1025 px.

---

## Requirements

### Requirement 1: Unified Codebase and CSS Architecture

**User Story:** As a developer maintaining the portfolio, I want a single, conflict-free CSS architecture, so that styles are predictable and future updates do not cause visual regressions.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use exactly one external stylesheet (`style.css`) and zero inline `<style>` blocks in `index.html`.
2. THE Portfolio_Site SHALL define all color, spacing, typography, and shadow tokens exclusively as CSS_Variables inside a single `:root` block in `style.css`.
3. WHEN the same CSS class is referenced more than once in `style.css`, THE Portfolio_Site SHALL contain only the last definition (no duplicate selectors).
4. THE Portfolio_Site SHALL NOT use `!important` declarations except inside browser-reset or accessibility-override rules.
5. THE Portfolio_Site SHALL preserve all existing JavaScript logic from `script.js` and the inline `<script>` block in a single unified `script.js` file.

---

### Requirement 2: Color Palette — Confident and Encouraging

**User Story:** As a visitor, I want the site to feel professional and motivating, so that Muhammad's brand is memorable and trustworthy.

#### Acceptance Criteria

1. THE Theme_System SHALL define a primary accent color in the range of deep teal (`hsl(185, 80%, 40%)`) to indigo-blue (`hsl(220, 70%, 55%)`), providing strong but calm contrast against both light and dark backgrounds.
2. THE Theme_System SHALL define a secondary warm accent (amber/gold range, `hsl(38–50, 90%, 55–65%)`) used for highlights, badges, and call-to-action elements.
3. THE Theme_System SHALL define dark-mode surface colors with a base background no lighter than `hsl(220, 30%, 8%)` to ensure sufficient contrast.
4. THE Theme_System SHALL define light-mode surface colors with a base background no darker than `hsl(210, 30%, 97%)`.
5. WHEN measured by the WCAG 2.1 AA standard, all primary body text in both dark and light mode SHALL achieve a contrast ratio of at least 4.5:1 against its background.

---

### Requirement 3: Dark / Light Mode Toggle

**User Story:** As a visitor, I want to switch between dark and light mode, so that I can view the portfolio comfortably in any environment.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a theme toggle button accessible in the navigation area at all times.
2. WHEN the toggle button is clicked, THE Theme_System SHALL switch the `data-theme` attribute on `<html>` between `"dark"` and `"light"` within 50 ms.
3. WHEN a theme is selected, THE Portfolio_Site SHALL persist the selection in `localStorage` under the key `"theme"`.
4. WHEN the page is loaded, THE Portfolio_Site SHALL read the stored `"theme"` value and apply it before the first paint, preventing a flash of incorrect theme.
5. WHILE dark mode is active, THE Theme_System SHALL apply the dark-mode surface and text CSS_Variables globally.
6. WHILE light mode is active, THE Theme_System SHALL apply the light-mode surface and text CSS_Variables globally.

---

### Requirement 4: Responsive Layout — Mobile-First

**User Story:** As a visitor on any device, I want the portfolio to display correctly, so that I get a consistent professional experience regardless of screen size.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use a single-column stacked layout at Breakpoint_Mobile.
2. THE Portfolio_Site SHALL use a two-column grid layout for cards and sections at Breakpoint_Tablet.
3. THE Portfolio_Site SHALL use a sidebar-plus-content or full-width sectioned layout at Breakpoint_Desktop.
4. WHEN the viewport is at Breakpoint_Mobile, THE Navigation SHALL collapse into a hamburger menu that opens a slide-in drawer.
5. THE Portfolio_Site SHALL NOT produce horizontal scrollbars at any viewport width between 320 px and 2560 px.
6. THE Portfolio_Site SHALL set `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to enable correct mobile scaling.

---

### Requirement 5: Navigation

**User Story:** As a visitor, I want clear, accessible navigation, so that I can jump between sections without confusion.

#### Acceptance Criteria

1. THE Navigation SHALL display links to all five primary sections: Home, About/Skills, Projects, Articles, and Contact.
2. WHEN a navigation link is clicked, THE Navigation SHALL mark that link with an `active` class and remove it from all other links.
3. WHEN the page is scrolled past a section header, THE Navigation SHALL automatically update the active link to reflect the currently visible section.
4. THE Navigation SHALL be `position: fixed` and remain visible during scroll on Breakpoint_Desktop and Breakpoint_Tablet.
5. WHEN the hamburger menu is open at Breakpoint_Mobile, THE Navigation SHALL trap focus within the drawer until the drawer is closed.

---

### Requirement 6: Hero Section

**User Story:** As a visitor landing on the portfolio, I want an impactful first impression, so that I immediately understand who Muhammad is and what he offers.

#### Acceptance Criteria

1. THE Hero_Section SHALL display Muhammad Afzaal's name in a heading no smaller than 48 px on Breakpoint_Desktop.
2. THE Hero_Section SHALL display a typed or animated subtitle cycling through at least three role descriptors (e.g., "Flutter Developer", "Mobile App Specialist", "BS IT Student").
3. THE Hero_Section SHALL display a circular or rounded profile photo sourced from `profile.jpeg`.
4. THE Hero_Section SHALL contain at least two CTA buttons: "View Projects" and "Download CV" (linking to `mycv.pdf`).
5. THE Hero_Section SHALL display at least three Stats_Counters (e.g., projects built, technologies used, semesters completed) that animate from 0 to their target value when scrolled into view.
6. WHEN the Hero_Section is first painted, THE Portfolio_Site SHALL apply entrance animations (fade-in + slide-up) to the heading, subtitle, and photo with staggered delays totaling no more than 800 ms.

---

### Requirement 7: Skills Section

**User Story:** As a hiring client or employer, I want to see Muhammad's technical skills visualized, so that I can quickly assess his competency level.

#### Acceptance Criteria

1. THE Skills_Section SHALL display at least eight technical skills, each with a label and a horizontal progress bar indicating proficiency level.
2. WHEN the Skills_Section is scrolled into view, THE Skills_Section SHALL animate each progress bar from 0% to its target width using a CSS transition of between 0.6 s and 1.2 s per bar.
3. THE Skills_Section SHALL group skills into at least two categories (e.g., "Mobile Development" and "Backend & Tools").
4. THE Skills_Section SHALL display skill technology icons or badges alongside each skill label, sourced from Font Awesome or inline SVG.
5. THE Portfolio_Site SHALL include Flutter, Dart, Firebase, Supabase, Provider, REST APIs, HTML/CSS, and Git as named skills with their respective proficiency percentages.

---

### Requirement 8: Experience and Education Timeline

**User Story:** As a recruiter, I want to see Muhammad's background in a chronological timeline, so that I can evaluate his professional growth at a glance.

#### Acceptance Criteria

1. THE Timeline_Section SHALL display entries in reverse chronological order (most recent at top).
2. EACH Timeline_Section entry SHALL contain: a year/date label, a role or degree title, an institution/organization name, and a one-to-two sentence description.
3. THE Timeline_Section SHALL include at least one education entry (BS IT, 7th semester) and one experience or freelance entry.
4. WHEN a Timeline_Section entry is scrolled into view, THE Timeline_Section SHALL animate the entry with a slide-in effect from alternating left/right sides on Breakpoint_Desktop, and from a single direction on Breakpoint_Mobile.
5. THE Timeline_Section SHALL visually distinguish education entries from experience entries using color coding derived from the Theme_System CSS_Variables.

---

### Requirement 9: Projects Section with Overlay and Media

**User Story:** As a potential client, I want to browse Muhammad's projects with rich detail and screenshots, so that I can evaluate the quality of his work.

#### Acceptance Criteria

1. THE Projects_Section SHALL display all nine existing projects (Zarr Finance, Vemta AI, QR Code Reader & Generator, Repflex Gym Workout, Image to PDF Converter, Agewise Age Calculator, Mehndi & Nail Design Walltrix, Decision Doom Fortune Wheel, Tareek - Bikrami Calendar) as cards.
2. EACH project card SHALL display: a category tag, project title, a short description, and a hover overlay with a "View Details" prompt.
3. WHEN a project card is clicked, THE Overlay SHALL open with a slide-up animation in under 350 ms and display the project title, tag, full description, feature list, GitHub link, and a phone mockup area.
4. THE Overlay SHALL contain two tabs — "Video" and "Snaps" — and default to "Snaps" on open.
5. WHEN the "Video" tab is selected, THE Overlay SHALL load a YouTube embed inside the phone mockup area using a privacy-enhanced URL.
6. WHEN the "Snaps" tab is selected, THE Overlay SHALL render a Carousel of all available screenshot images for that project.
7. THE Carousel SHALL support left/right navigation via buttons and dot indicators showing the current position.
8. WHEN the Overlay is open, THE Portfolio_Site SHALL set `overflow: hidden` on `<body>` to prevent background scroll.
9. WHEN the Escape key is pressed or the backdrop is clicked while the Overlay is open, THE Overlay SHALL close and restore scroll.
10. WHEN a project has a Play Store link available, THE Overlay SHALL display a "View on Play Store" button alongside the GitHub button.

---

### Requirement 10: Testimonials Placeholder Section

**User Story:** As a future client visiting the portfolio, I want to see a testimonials section, so that I can trust Muhammad's track record even before actual reviews are added.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL display at least two placeholder quote cards with a "Leave a Review" or "Coming Soon" state styled to match the rest of the design.
2. THE Testimonials_Section SHALL include a heading and a brief note indicating that real client testimonials will appear here.
3. THE Testimonials_Section SHALL be styled with quote marks, avatar placeholders, and star rating indicators as visual scaffolding.

---

### Requirement 11: Contact Section

**User Story:** As a visitor who wants to hire Muhammad, I want easy access to all contact channels, so that I can reach out through my preferred method without friction.

#### Acceptance Criteria

1. THE Contact_Section SHALL display contact cards for: Email, WhatsApp (`+923285753463`), Upwork, and LinkedIn.
2. WHEN a WhatsApp contact card is clicked, THE Contact_Section SHALL open `https://wa.me/923285753463` in a new tab.
3. WHEN an Email contact card is clicked, THE Contact_Section SHALL reveal an inline email form without navigating away from the page.
4. THE inline email form SHALL contain fields for Name, Email, Subject, and Message, all marked as required.
5. WHEN the email form is submitted, THE Contact_Section SHALL construct a `mailto:` link pre-filled with the form data and open the user's email client.
6. THE Contact_Section SHALL display a floating WhatsApp button fixed to the bottom-right corner, visible on all sections.
7. IF a required form field is empty when the form is submitted, THEN THE Contact_Section SHALL display a browser-native or custom validation message and SHALL NOT submit the form.

---

### Requirement 12: Articles / Resources Section

**User Story:** As a developer visitor, I want to browse curated Flutter and mobile development resources, so that I can discover useful tools Muhammad recommends.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display at least six curated GitHub project or resource cards in the Articles section.
2. EACH resource card SHALL display: a language/type badge, the resource name, a short description, and a star count.
3. WHEN a resource card is clicked, THE Portfolio_Site SHALL open the resource link in a new browser tab.

---

### Requirement 13: Scroll Animations

**User Story:** As a visitor, I want smooth entrance animations as I scroll, so that the portfolio feels polished and modern.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use `IntersectionObserver` to detect when elements enter the viewport and apply entrance animations.
2. WHEN a section heading, card, or skill bar enters the viewport, THE Scroll_Animation SHALL trigger a fade-in combined with a translateY(20px → 0) transform.
3. THE Scroll_Animation SHALL NOT use JavaScript `setTimeout` polling for scroll detection.
4. WHEN `prefers-reduced-motion: reduce` is set in the OS, THE Portfolio_Site SHALL disable all non-essential Scroll_Animations and transitions.
5. THE Portfolio_Site SHALL stagger animations for grid items with a delay increment of 80–120 ms between consecutive items in the same group.

---

### Requirement 14: Performance — No Heavy Frameworks

**User Story:** As a visitor on a mobile connection, I want the portfolio to load fast, so that I don't wait for unnecessary resources.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL NOT include any JavaScript framework or library other than Font Awesome (CSS) and Google Fonts.
2. THE Portfolio_Site SHALL load all project images lazily using `loading="lazy"` on `<img>` elements that are below the fold.
3. THE Portfolio_Site SHALL specify `width` and `height` attributes or an `aspect-ratio` CSS rule on all `<img>` elements to prevent layout shift.
4. THE Portfolio_Site SHALL inline the critical above-the-fold CSS or ensure `style.css` is loaded with a `<link rel="stylesheet">` in `<head>` for render-unblocking.
5. THE Portfolio_Site SHALL NOT exceed 200 KB of JavaScript (uncompressed) across all script files combined.

---

### Requirement 15: Accessibility

**User Story:** As a visitor using a keyboard or screen reader, I want the portfolio to be navigable and understandable, so that I am not excluded by the design.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL assign `aria-label` attributes to all icon-only buttons (hamburger menu, theme toggle, carousel controls, overlay close button).
2. WHEN the Overlay is opened, THE Portfolio_Site SHALL move focus to the close button or the first interactive element inside the Overlay.
3. WHEN the Overlay is closed, THE Portfolio_Site SHALL return focus to the project card that triggered the opening.
4. ALL images with meaningful content SHALL have descriptive `alt` attributes; decorative images SHALL have `alt=""`.
5. THE Portfolio_Site SHALL use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) for major structural regions.
6. THE Portfolio_Site SHALL achieve a minimum Lighthouse accessibility score of 90 when tested in Chrome DevTools.
