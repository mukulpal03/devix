# Design System — Agent Instructions

This skill describes the visual design language for all UI output. Every component, layout, and page should follow the design specs in the module files below. These describe *what the design looks like* — you choose how to implement the styles.

## Style
A research-journal aesthetic printed on warm stone — authoritative, editorial, almost achromatic. Pages live on warm ivory parchment (never pure white), with near-black slate as the dominant ink. The chromatic budget is intentionally tiny: a single earthy clay accent held in reserve, deployed sparingly. Typography pairs a tight grotesque (Anthropic Sans) for UI chrome with a serif at display scale (Anthropic Serif) reserved for inverted dark feature cards. Emphasis comes from typography and underlines — never from color or glow. Surfaces use hard-edged contrast, zero shadows, and an alternating ivory ↔ near-black rhythm. Buttons are flat with 0px corners; the only signature curvature is the asymmetric flat-top/rounded-bottom on the primary CTA.


## Before Writing Any Code

1. **Read every module that applies.** For a landing page, read at minimum: `layout.md`, `typography.md`, `colors.md`, `buttons.md`, `cards.md`, `shadows.md`, `radius.md`, `borders.md`. Do NOT write JSX until you have loaded all relevant modules.

## Critical Rules

- **Tokens are AGNOSTIC, framework-independent names:** The tokens defined in the `.md` files (like `neutral-primary-soft`, `heading`, `border-default`) are agnostic design system tokens, NOT literal class names from any CSS framework. Do not blindly use them as utility classes — you must explicitly map them in your styling layer (CSS variables, theme config, design tokens, etc.) before referencing them. You must implement the mapping yourself.

- **Cross-reference modules.** A card containing buttons must satisfy both `cards.md` AND `buttons.md`.
- **Dark mode is automatic.** The CSS custom properties resolve differently in light/dark via `@media (prefers-color-scheme: dark)`. Never manually swap colors.
- **Every interactive element needs hover, focus, and disabled states** — defined in the relevant module.
- **Use semantic HTML:** proper heading hierarchy (`h1`→`h6`), `<button>` for actions, `<a>` for navigation, ARIA attributes where needed.
- **Never use pure white (#FFFFFF) or pure black (#000000)** for any surface. Page bases use warm ivory; the darkest surface is slate-dark (#141413).
- **Every section uses `#FAF9F5` (Ivory Light) as its background — mandatory, no exceptions.** Surface variation comes from the cards placed inside sections, not from changing section backgrounds. See `colors.md` → "Section Background Rule".
- **Surface alternation is the page rhythm at the card level:** within an ivory section, cards alternate between dark editorial features and light release cards. Hard-edged transitions, no gradients, no shadow softening.
- **All cards use 24px radius** (light release, dark editorial, callout) — this is the system's signature card geometry.
- **Emphasis is typographic, not chromatic.** Underline keywords in display headlines; never colorize, glow, or highlight them.

## Module Index

### Foundation (read first for any UI work)
- [colors.md](colors.md) — all background, text, and border color tokens
- [typography.md](typography.md) — heading scale, paragraphs, labels, links
- [layout.md](layout.md) — spacing rhythm, containers, animation, visual depth
- [radius.md](radius.md) — border-radius scale
- [shadows.md](shadows.md) — elevation tokens
- [borders.md](borders.md) — border widths and styles

### Components
- [buttons.md](buttons.md) — button variants, sizes, states, asymmetric primary CTA
- [button-group.md](button-group.md) — grouped button structure
- [cards.md](cards.md) — light release cards and dark editorial feature cards
- [inputs.md](inputs.md) — form controls, labels, states
- [alerts.md](alerts.md) — alert variants
- [badges.md](badges.md) — badge variants, metadata labels
- [lists.md](lists.md) — list components
- [avatars.md](avatars.md) — avatar variants, sizes, indicators
- [icon-shapes.md](icon-shapes.md) — icon containers

### Complex Components
- [accordion.md](accordion.md) — accordion variants
- [dropdown.md](dropdown.md) — dropdown menus
- [modals.md](modals.md) — modal dialogs
- [tabs.md](tabs.md) — tab navigation
- [tables.md](tables.md) — table structure
- [pagination.md](pagination.md) — pagination components
- [sidebars.md](sidebars.md) — sidebar navigation
- [radios-checkboxes-toggle.md](radios-checkboxes-toggle.md) — selection controls
- [tooltips-popovers.md](tooltips-popovers.md) — tooltips and popovers
- [content.md](content.md) — grid system, responsiveness

---

## Source file: `accordion.md`

# Accordion

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Accordions are flat, ink-bordered, and chromeless. Triggers and panels share the warm ivory surface family — separation is created by 1px ink hairlines, never by drop shadows.

## Core Specs

- **Wrapper:** full width, 1px border `border-brand` (slate-dark), 0px radius — sharp corners on all items
- **Item separator:** 1px bottom border `border-default-subtle` on every item except last
- **Shadow:** none, ever

## Trigger (Button)

- **Layout:** flex, space-between, full width
- **Padding:** 20px horizontal, 18px vertical
- **Font:** Anthropic Sans 16px, weight 500, letter-spacing -0.002em
- **Text color:** `heading`
- **Background:** `surface-page-base` (ivory)
- **Hover:** `surface-elevated` (#F0EEE6) background
- **Focus:** outline none, 2px solid offset focus ring in `border-brand`
- **Transition:** 120–200ms ease-out on `background-color` only — never on transform
- **Open state:** `surface-elevated` background

## Panel (Content)

- **Padding:** 20px horizontal, 20px vertical
- **Background:** `surface-page-base` (ivory)
- **Top border:** 1px solid `border-default-subtle`
- **Font:** Anthropic Sans 16px, `body` color, line-height 1.5
- **Headings inside panels** use `h4`/`h5` from `typography.md`

## Chevron Icon

- Size: 16x16px
- Stroke: 1.5px linear
- Color: `body` text color (open: `heading`)
- Closed: 0deg rotation
- Open: 180deg rotation
- Transition: 150ms ease-out on transform — this is the one place transform is permitted, since the icon literally rotates

## Variants

### Default (Collapse)
One panel open at a time. Items stacked inside a single shared 1px ink-bordered wrapper with sharp corners.

### Separated Cards
Each item is independent — has its own 1px `border-brand` border, 0px radius, no shadow. 12px bottom margin between items. No shared outer border. The wrapper is transparent.

### Always Open
Multiple panels can expand simultaneously. Same styling as Default.

### Flush
No outer border. Trigger and panel have transparent backgrounds. Only 1px `border-default-subtle` bottom-border dividers between items. Use inside cards or sections that already provide a background.

## States

| State | Trigger appearance |
|---|---|
| Closed | `heading` text, `surface-page-base` background |
| Open | `heading` text, `surface-elevated` background |
| Hover | `surface-elevated` background, `heading` text |
| Focus | 2px solid offset `border-brand` ring, no outline |
| Disabled | `fg-disabled` text, not-allowed cursor, no hover/focus |

## Rules

- **0px radius mandatory** — sharp corners on wrapper, items, and separated-card variants.
- **No drop shadows.** Borders carry all separation.
- **Hover and open states use ivory tonal shifts** (`surface-page-base` → `surface-elevated`), never chromatic fills.
- **Focus rings are solid 2px offset** in `border-brand` — never a glowing ring.
- **Icon stroke matches body weight** (1.5px linear).
- Don't use accent colors (clay/sky/fig) on accordion triggers or panels.

---

## Source file: `alerts.md`

# Alerts

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Alerts communicate state — informational, success, danger, or warning. Like the rest of the system, alerts favor flat surfaces, 0px corners, and ink-line borders. No glow halos.

## Core Specs

- **Padding:** 16px (vertical) 20px (horizontal)
- **Radius:** 0px (base) — sharp corners
- **Border:** 1px solid (variant-specific)
- **Background:** soft tonal fill (variant-specific)
- **Shadow:** none, ever
- **Heading:** Anthropic Sans 16px, weight 600, variant text color
- **Body:** Anthropic Sans 15px, weight 400, line-height 1.4, variant text color
- **Icon:** 16x16px, 1.5px stroke, leading the heading; matches text color
- **Layout:** flex row — icon, content (heading + body), optional close button at trailing edge
- **Heading → body gap:** 4px
- **Icon → content gap:** 12px

## Variants

### Brand (informational, the default neutral alert)
- **Background:** `brand-softer` (#F0EEE6) — warm ivory tint
- **Border:** 1px solid `border-default`
- **Text:** `heading`
- **Icon:** info glyph in `heading` color

### Success
- **Background:** `success-soft`
- **Border:** 1px solid `border-success-subtle`
- **Text:** `fg-success-strong`
- **Icon:** check glyph in `fg-success-strong`

### Danger
- **Background:** `danger-soft`
- **Border:** 1px solid `border-danger-subtle`
- **Text:** `fg-danger-strong`
- **Icon:** alert glyph in `fg-danger-strong`

### Warning
- **Background:** `warning-soft`
- **Border:** 1px solid `border-warning-subtle`
- **Text:** `fg-warning`
- **Icon:** warning glyph in `fg-warning`

### Inverted (on dark surfaces — used inside dark feature cards)
- **Background:** transparent
- **Border:** 1px solid `border-buffer` (ivory)
- **Text:** `surface-page-base` (ivory)
- **Icon:** matching ivory tone

## With Action / CTA

- CTA appears below the alert body (or trailing the body on a single line) using the **Arrow Text Link** pattern from `buttons.md` (e.g. `View details →`).
- Never use a filled brand button inside an alert — the alert itself is the emphasis surface.

## Dismissible Alert

- Trailing 16x16px X glyph button in the variant text color
- Hit area 24x24px
- Hover: subtle background tint shift (no separate close-button background fill)
- Focus: 2px solid offset focus ring in the variant border color

## Rules

- **0px radius mandatory.** Never round alerts.
- **No shadow.** Border + soft tonal fill is the entire visual signal.
- **No icon-only alerts** — always pair the icon with a heading or body text for accessibility.
- **One alert per region.** Don't stack three alerts on top of each other; consolidate or use a notification list pattern.
- **Don't use chromatic accent colors (clay/sky/fig/olive/cactus) for alert backgrounds.** Variants are restricted to the status palette + brand-softer.
- **Inverted alerts** appear only when nested inside a dark feature card — their borders use ivory, not slate-dark.

---

## Source file: `avatars.md`

# Avatars

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Avatars in this system are **square** by default, mirroring the 0px-radius signature of buttons and badges. Circular avatars are available but reserved for chat / messaging contexts where the conversational pattern is well-established.

## Core Specs

- **Default shape:** square (0px radius) — matches the system's sharp-corner signature
- **Optional shape:** circular (full radius) — chat/messaging contexts only
- **Default size:** 40x40px
- **Image fit:** cover
- **Background (initials variant):** `surface-warm-card` (#E3DACC) with `heading` color text
- **Border (when applied):** 1px solid, ink-toned

## Sizes

| Size | Dimensions | Radius (square default) |
|---|---|---|
| Extra Small | 20x20px | 0px |
| Small | 24x24px | 0px |
| Base | 32x32px | 0px |
| Default | 40x40px | 0px |
| Large | 48x48px | 0px |
| XL | 56x56px | 0px |
| 2XL | 64x64px | 0px |

## Initials Avatar (no image)

- Background: `surface-warm-card` (#E3DACC) for warm tone, OR `brand` (slate-dark) for inverted contrast
- Text: `heading` (on warm) or `surface-page-base` (on dark)
- Font: Anthropic Sans, weight 500, size scales with avatar (e.g. 32x32px avatar → 14px initials)
- Letter-spacing: -0.002em
- Maximum 2 letters

## Bordered Avatar

- 4px padding gutter inside a 1px solid `border-brand` (slate-dark) outline
- Alternative: 2px solid `border-default` ring directly on the avatar edge
- Radius: 0px (square)
- No box-shadow — the ink line is the visual

## Stacked Avatars

- Displayed in a flex row
- Each avatar: 40x40px, **square** (0px radius), 2px solid `border-buffer` (ivory) outline so adjacent avatars read distinctly
- Overlap: -12px negative margin on all except first

### Stacked Counter ("+3")
- Same size as avatars (40x40px), square (0px radius)
- Background: `brand` (slate-dark), text: `surface-page-base` (ivory)
- Font: Anthropic Sans 13px, weight 500
- Border: 2px solid `border-buffer` (ivory)
- Same overlap margin as other avatars

## Avatar with Text

- Layout: flex row, 12px gap between avatar and text
- Avatar: 40x40px, square (0px radius), cover fit
- Name: Anthropic Sans 15px, weight 500, `heading` color
- Subtitle / role: Anthropic Sans 14px, weight 400, `body-subtle` color
- Vertical alignment: center

## Status Indicator Dot

- 8x8px square (0px radius — never circular, even on circular avatars)
- Positioned absolute: 0 bottom, 0 right, OR -2px outside the avatar
- 1px border in `border-buffer` (ivory)
- Background per status:
  - Online: `success` (olive)
  - Away: `warning`
  - Offline: `body-muted`
  - Do not disturb: `danger` (clay-ember)

## Circular Avatar (chat / messaging only)

When a chat/conversation context demands a circular avatar:
- Radius: 9999px (full)
- All other specs identical
- Status dot remains 0px-radius square (the dot does not become circular)
- This is the only place full-radius shapes appear in the system.

## Rules

- **Default to square 0px-radius avatars** — circular only inside chat/messaging surfaces.
- **No drop shadows** under avatars.
- **No glow rings.** Bordered avatars use a solid 1–2px ink line.
- **Initials use Anthropic Sans, never the serif.** The serif at display scale is reserved exclusively for dark feature cards.
- **Status dots are square**, even when paired with circular avatars — preserves the system's formal language.
- **Cover-fit images.** Never apply `object-fit: contain` to avatars; faces should fill the frame.

---

## Source file: `badges.md`

# Badges

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Badges in this system are deliberately **chromeless** by default — pure typography with no chip, pill, or capsule treatment. The system favors metadata labels (DATE, CATEGORY in Anthropic Mono) over filled badges. Use filled badges sparingly and only for state communication.

## Core Specs

- **Border:** 1px (when border is used) — solid, ink-toned
- **Default radius:** 0px
- **Pill radius:** 0px (pills are explicitly forbidden in this system; treat "pill" as a synonym for the default rectangular badge)
- **Shadow:** none, ever
- **Font:** Anthropic Sans for general badges; Anthropic Mono for metadata labels (DATE, CATEGORY)
- **Letter-spacing:** +0.04em (uppercase metadata labels) or normal (sentence-case badges)

## Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Default (small) | 12px | 8px | 2px |
| Large | 14px | 10px | 4px |
| Metadata label (chromeless) | 16px (Mono) | 0 | 0 |

## Variants

### Metadata Label (default, no chrome)
The signature badge pattern. Used for DATE, CATEGORY, TYPE labels in card footers and content meta rows.
- **Background:** transparent
- **Border:** none
- **Text:** `body-muted` color, Anthropic Mono 16px weight 400, **uppercase**, letter-spacing +0.04em
- **Radius:** 0px (no chrome)
- **No padding.**
- Pure typographic structure — never wrap with a chip, pill, or capsule background.

### Brand (subtle)
- **Background:** `brand-softer` (#F0EEE6)
- **Border:** 1px solid `border-brand-subtle`
- **Text:** `fg-brand-strong`

### Alternative (Neutral Soft, the default filled badge)
- **Background:** `surface-page-base` (ivory)
- **Border:** 1px solid `border-default`
- **Text:** `heading`

### Gray (Neutral Medium)
- **Background:** `surface-warm-card` (#E3DACC)
- **Border:** none
- **Text:** `heading`

### Clay Accent (use sparingly — one per section max)
- **Background:** transparent
- **Border:** 1px solid `border-clay`
- **Text:** `fg-clay`
- **Note:** Clay-accent badges are decorative-emphasis only. Never use clay for status communication (use Danger instead).

### Categorical Tags (sparing use)
For thematic tags only — one accent per section max.
| Variant | Background | Border | Text |
|---|---|---|---|
| Olive | transparent | `border-olive` | `fg-olive` |
| Sky | transparent | 1px solid `sky` | `fg-sky` |
| Fig | transparent | 1px solid `fig` | `fg-fig` |
| Cactus | transparent | 1px solid `cactus` | `fg-cactus` |

### Danger
- **Background:** `danger-soft`
- **Border:** 1px solid `border-danger-subtle`
- **Text:** `fg-danger-strong`

### Success
- **Background:** `success-soft`
- **Border:** 1px solid `border-success-subtle`
- **Text:** `fg-success-strong`

### Warning
- **Background:** `warning-soft`
- **Border:** 1px solid `border-warning-subtle`
- **Text:** `fg-warning`

### Dark (inverted)
- **Background:** `brand` (slate-dark)
- **Border:** none
- **Text:** `surface-page-base` (ivory)

## Pill Badges

**Pills are explicitly forbidden.** All badges retain the 0px radius. If a designer asks for a "pill," route to the rectangular default badge — the 0px radius is a deliberate formal signature.

## Badges with Icons

- Icon size (default): 12x12px
- Icon size (large): 14x14px
- Icon stroke: 1.5px linear, monochromatic, inherits text color
- Icon spacing: 4px margin next to label

## Icon-only Badge

Square shape — equalize dimensions to 24x24px, no horizontal text padding. 0px radius preserved.

## Dismissible Badges

Badge content + a close button. The close button is a 12x12px X glyph in the same color as the badge text. Close button hover backgrounds per variant:

| Variant | Close button hover background |
|---|---|
| Metadata Label | none — text is chromeless; do not make metadata labels dismissible |
| Brand | brand-soft |
| Alternative | neutral-tertiary-soft |
| Gray | neutral-tertiary |
| Clay Accent | transparent + clay-strong text shift |
| Danger | danger-medium |
| Success | success-medium |
| Warning | warning-medium |

## Dot / Notification Badge

- Positioned absolutely: -4px top, -4px right
- Size: 8x8px, **square** shape (0px radius — never circular)
- 2px border in `border-buffer` color
- Background: `danger` (clay-ember)

## Critical Rules

- **No background fills for default metadata labels** — they are pure text.
- **Never use pill (fully-rounded) shapes.** All badges are rectangular at 0px radius.
- **Never combine multiple chromatic-accent badges in a single section.** Clay/Sky/Fig/Olive/Cactus are categorical, not combinable.
- **Status badges communicate state, not decoration.** Don't use Danger badge fill as a stylistic choice when the meaning isn't actually negative.
- **Mono-typeface metadata labels are uppercase** with +0.04em tracking — never sentence-case for DATE / CATEGORY / TYPE.

---

## Source file: `borders.md`

# Borders

## Width Scale

| Context | Width |
|---|---|
| Default (buttons, inputs, cards, dividers) | 1px |
| Emphasis / focus | 2px |
| Heavy hairline (decorative section dividers) | 1px solid `border-brand` (slate-dark) |

## Style

- **Solid by default** — sharp, ink-like, hairline-precise.
- Dashed borders only for special cases like file dropzones or empty-state placeholders.
- No double, dotted, ridge, or groove styles.

## Color Defaults

- **Primary structural border:** `border-brand` (slate-dark, #141413 in light / ivory in dark) — used on primary buttons, nav buttons, top-nav scrolled separator, and any line that needs to read as "ink."
- **Subtle dividers:** `border-default-subtle` or `border-light` — used between table rows, list items, and within cards.
- **Disabled / muted:** `border-default` (cloud-medium) — used on disabled controls and de-emphasized interactive elements.
- **Status borders match intent:** success → `border-success`, danger → `border-danger`, warning → `border-warning`. Never combine status borders with chromatic accent borders in the same control.

## Rules

- **Borders are the primary depth signal.** Prefer borders over shadows for component separation — shadows are essentially absent from this system.
- **The slate-dark 1px border is a signature pattern.** Primary buttons, nav buttons, and header CTAs all carry a 1px solid slate-dark border on the ivory page base. This reads as "ink line on paper."
- Components in the same family must use matching border widths.
- Never mix 1px and 2px borders within a single component (except focus/active state).
- Never use chromatic accent colors for purely decorative borders. Clay/olive/sky borders are reserved for status communication or single-section emphasis.
- Never round borders independently of the component's radius — corners follow `radius.md`.

## Usage

| Context | Width | Color |
|---|---|---|
| Inputs / selects / textareas | 1px default; 2px on focus | `border-default` default, `border-brand` on focus, `border-danger` on error |
| Primary buttons | 1px | `border-brand` |
| Nav links / ghost buttons | 1px | `border-brand` (on light), `border-buffer` (on dark) |
| Cards (release / light) | 0px (no border) — surface color does the separation | — |
| Cards (dark editorial) | 0px (no border) — surface inversion does the separation | — |
| Tables — row dividers | 1px | `border-light-subtle` |
| Tables — header bottom rule | 1px | `border-brand` |
| Section dividers (when used) | 1px | `border-default-subtle` |
| Sticky nav (scrolled state) | 1px bottom only | `border-default-subtle` or `border-default` |
| Focus ring (interactive elements) | 2px solid offset | `border-brand` (no glow, no blur) |

---

## Source file: `button-group.md`

# Button Groups

> Dependencies: `buttons.md`, `colors.md`, `radius.md`, `borders.md`

Button groups in this system are flat, sharp-cornered, and connected by overlapping 1px ink-line borders. No drop shadows, no asymmetric radius (that's reserved for the standalone Primary Nav CTA).

## Core Specs

- **Wrapper:** inline-flex, 0px radius, no shadow
- **Children overlap:** -1px left margin on all except first button (the borders share an ink line)
- **Buttons inside the group never have individual shadows.** The system uses zero shadows.
- **Borders:** every button in the group has the same border (typically 1px `border-brand`)

## Anatomy

### Wrapper
- Display: inline-flex
- Radius: 0px
- Shadow: none
- Background: transparent

### First Button
- 0px radius on all corners

### Middle Button(s)
- 0px radius on all corners

### Last Button
- 0px radius on all corners

### All buttons except the first
- -1px left margin to overlap borders so the shared ink line reads as a single continuous edge

## Active State (segmented control behavior)

When the group represents a segmented selector:
- **Active button:**
  - Background: `brand` (slate-dark)
  - Text: `surface-page-base` (ivory)
  - Border: stays 1px `border-brand`
  - The active button's z-index is raised so its full ink border sits above neighbors
- **Inactive buttons:**
  - Background: transparent or `surface-page-base`
  - Text: `heading`
  - Border: 1px `border-brand`

## Sizes

Inherit from `buttons.md` — XS / SM / Base / LG / XL. All buttons within a single group must share the same size.

## Icon-only Buttons

- 16x16px icon (1.5px stroke, monochromatic)
- Container width matches the height of text buttons in the same group (square aspect)
- 0px radius

## Rules

- Buttons inside groups follow all styles from `buttons.md` (background, border, focus rings) except they never carry **individual** drop shadows.
- **The asymmetric `0px 0px 8px 8px` Primary Nav CTA radius is forbidden inside button groups.** Groups always use uniform 0px corners.
- All buttons in a single group share size, font-weight, and border treatment — mixed-variant groups are forbidden.
- **No background gradients, no shadow lift on hover.** Hover changes background color or border color only.
- Focus rings: 2px solid offset `border-brand` ring on the focused button — the ring sits above sibling buttons via z-index.
- Maximum 5 buttons per group; beyond that, switch to a select / dropdown pattern.

---

## Source file: `buttons.md`

# Buttons

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `typography.md`

## Core Specs (every button except ghost and disabled)

- **Radius:** 0px (base) — all buttons use sharp corners. The only exception is the **Primary Nav CTA**, which uses the asymmetric `0px 0px 8px 8px` (flat top, rounded bottom) signature.
- **Border:** 1px solid (most variants carry a 1px ink-line border on the ivory surface)
- **Shadow:** none — buttons rely on solid fills, borders, and color shifts for state. Never add box-shadow.
- **Font:** Anthropic Sans
- **Font weight:** 500 (medium) for primary / CTA buttons; 400 (regular) for ghost / nav links
- **Box sizing:** border-box
- **Transition:** 120–200ms ease-out on `color`, `background-color`, `border-color` only — never on transform or shadow.
- **Letter-spacing:** -0.002em on label text

## Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Extra small | 12px | 12px | 6px |
| Small | 14px | 16px | 8px |
| Base (default) | 15px | 31px | 12px |
| Large | 16px | 31px | 14px |
| Extra large | 16px | 32px | 18px |

The base button uses 31px horizontal padding to match the card padding rhythm.

## Variants

### Primary Nav CTA (the "Try Claude" button)
- **Background:** `surface-page-base` (ivory, #FAF9F5)
- **Border:** 1px solid `border-brand` (slate-dark, #141413)
- **Radius:** **`0px 0px 8px 8px`** — signature asymmetric (flat top, rounded bottom). This radius is reserved for this single CTA and never used elsewhere.
- **Text:** `heading` color (slate-dark)
- **Padding:** 12px 31px
- **Font:** Anthropic Sans 15px, weight 500
- **Hover:** `surface-elevated` background, border stays slate-dark
- **Focus:** 2px solid offset focus ring in `border-brand`, no glow
- **Active:** `neutral-secondary` background

### Primary (on dark surfaces — "Continue Reading" inside dark feature cards)
- **Background:** `surface-page-base` (ivory, #FAF9F5)
- **Border:** 1px solid `border-brand` (slate-dark)
- **Radius:** 0px (no asymmetric radius on dark surfaces)
- **Text:** `heading` color (slate-dark)
- **Padding:** 12px 31px
- **Font:** Anthropic Sans 15px, weight 500
- **Hover:** Slight transparency shift or subtle ivory→cloud-light fill swap
- **Focus:** 2px solid offset focus ring in `border-buffer` (ivory)

### Brand (high-emphasis primary on light surfaces)
- **Background:** `brand` (slate-dark, #141413)
- **Border:** 1px solid `border-brand` (slate-dark — visually flush with fill)
- **Text:** `surface-page-base` (ivory)
- **Radius:** 0px
- **Hover:** `brand-strong` background (slightly deeper near-black)
- **Focus:** 2px offset solid focus ring in `border-brand`

### Secondary (Ghost Nav Button — transparent with ink border)
- **Background:** transparent
- **Border:** 1px solid `border-brand` (slate-dark)
- **Text:** `heading`
- **Radius:** 0px
- **Padding:** 22px 12px (taller, narrower — matches inline nav rhythm) for nav usage; 12px 24px for general use
- **Font:** Anthropic Sans 15px, weight 400
- **Hover:** `surface-elevated` background fill, border stays
- **Focus:** 2px solid offset focus ring in `border-brand`

### Tertiary (subtle outline)
- **Background:** transparent
- **Border:** 1px solid `border-default`
- **Text:** `body`
- **Radius:** 0px
- **Hover:** `surface-elevated` background, `border-brand` border, `heading` text
- **Focus:** 2px solid offset ring in `border-brand`

### Ghost (no border, no background)
- **Background:** transparent
- **Border:** transparent
- **Text:** `heading`
- **Radius:** 0px
- **Hover:** `surface-elevated` background, no border appears
- **Focus:** 2px solid offset focus ring in `border-brand`
- **No shadow.**

### Arrow Text Link (the "Read announcement →" pattern)
- **Background:** none
- **Border:** none
- **Text:** `heading` color, Anthropic Sans 15px, weight 400
- **Radius:** none — pure typographic link
- **Trailing arrow:** Append literal `→` glyph directly after text label with one space.
- **No underline at rest.** On hover, an underline appears beneath the text only (not the arrow).
- **Focus:** 2px solid offset focus ring in `border-brand` wrapping the text
- Used inside cards for "Read announcement →", "Read the story", "Model details".

### Muted Ghost (de-emphasized / inactive)
- **Background:** transparent
- **Border:** 1px solid `border-default` (cloud-medium)
- **Text:** `body-muted` color
- **Radius:** 0px
- **Font:** Anthropic Sans 15px, weight 400
- **Hover:** no change OR slight border shift to `border-default-strong`
- Used for de-emphasized or inactive interactive elements.

### Success
- **Background:** `success` (olive)
- **Border:** transparent
- **Text:** `surface-page-base` (ivory)
- **Hover:** `success-strong` background
- **Focus:** 2px solid offset focus ring in `border-success`

### Danger
- **Background:** `danger` (clay-ember)
- **Border:** transparent
- **Text:** `surface-page-base` (ivory)
- **Hover:** `danger-strong` background
- **Focus:** 2px solid offset focus ring in `border-danger`

### Warning
- **Background:** `warning`
- **Border:** transparent
- **Text:** `heading` (slate-dark)
- **Hover:** `warning-strong` background
- **Focus:** 2px solid offset focus ring in `border-warning`

### Disabled (NO shadow)
- **Background:** `disabled` (oat)
- **Border:** 1px solid `border-default`
- **Text:** `fg-disabled`
- **Cursor:** not-allowed
- **No hover, no focus, no shadow.**

## Icons in Buttons

- Icon size: 16x16px
- Icon stroke: 1.5px linear, monochromatic, inherits text color (never chromatic)
- Spacing: 8px gap between icon and label
- Layout: inline-flex, vertically centered
- Trailing arrows on text links use a literal `→` glyph (not an SVG) so they share the type rhythm.

## Critical Rules

- **0px radius is mandatory for all buttons** except the Primary Nav CTA (`0px 0px 8px 8px`).
- **Never apply uniform soft corners to buttons.** No 4px, 6px, or pill rounding.
- **Never add a drop-shadow or hover lift.** State changes are color/border only.
- **Never use accent colors (clay/sky/olive/fig) as button background fills** outside the explicit Success/Danger/Warning intents. The clay accent is reserved for sparing highlight moments — not a primary CTA color.
- **The asymmetric radius is a single-button signature.** Use it only on the top-nav primary CTA.

---

## Source file: `cards.md`

# Cards

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `typography.md`, `layout.md`

Cards are the primary content container in the system. There are **two distinct card families**: light release/listing cards and the signature dark editorial feature card. Choosing the right family is a hierarchy decision, not a style decision.

## Universal Specs

- **Shadow:** none. Always. Surface contrast is the only depth signal.
- **Border:** 0px (no border on cards) — surface color separation is sufficient.
- **Padding:** 31px on all sides (matches the layout system's card-padding rhythm).
- **Internal radius alignment:** any media (images, illustrations) inside a card is hard-clipped to the card's outer radius for flush corners.

## Light Release Card (default content listing)

The standard 3-column "Latest releases" tile. Used for articles, blog posts, news, content listings.

- **Background:** `surface-elevated` (#F0EEE6) **or** `surface-warm-card` (#E3DACC) — alternate within a grid for warmth variation.
- **Radius:** 24px
- **Padding:** 31px
- **Border:** none
- **Shadow:** none
- **Heading:** Anthropic Sans, 20px, weight 600, `heading` color
- **Body text:** Anthropic Sans, 15px, weight 400, `body` color, line-height 1.4
- **Footer metadata row:** label in Anthropic Mono 16px uppercase `body-muted` color, value in Anthropic Sans 15px `heading` color
- **CTA link:** Arrow Text Link pattern (e.g. `Read announcement →`) — see `buttons.md`
- **Internal vertical rhythm:** 16px between heading and body, 24px between body and footer/CTA

### Light card states
- **Static (non-interactive):** No hover styles. Surface color and content do all the work.
- **Interactive (clickable card / link card):**
  - Hover: surface shifts one step (e.g. `surface-elevated` → `surface-warm-card`)
  - Cursor: pointer
  - Transition: 120–200ms ease-out on background-color only
  - **No transform, no scale, no shadow, no border appearance on hover.**
- **Focus (keyboard):** 2px solid offset focus ring in `border-brand` (slate-dark) wrapping the entire card

## Dark Editorial Feature Card (signature inversion)

The big editorial breakpoint that punctuates the page rhythm. Used for hero features, project announcements, pillar content moments. **One per major section, max two per page.**

- **Background:** `surface-feature-dark` (#141413)
- **Radius:** 24px
- **Padding:** 31px (or 48px+ on hero-scale variants)
- **Border:** none
- **Shadow:** none — the card sits flush in the layout grid; the radius IS the visual signal
- **Width behavior:** **Full content-column-width within the 1200px container — never full-bleed to viewport edges.** The ivory page background must remain visible around all four corners (the "contained inversion").
- **Headline:** Anthropic Serif, 91px (display) on desktop, weight 400, `surface-page-base` (ivory) color, line-height 1.10
  - Mobile: 48–56px
  - **This is the only place Anthropic Serif at display scale appears in the system.**
- **Subheading / body:** Anthropic Sans, 18–20px, weight 400, `body-subtle` mapped to its dark-surface value (light ivory tone)
- **CTA button:** Primary on-dark variant — see `buttons.md` (ivory fill, slate-dark border, 0px radius)
- **Embedded imagery:** hard-clipped to 24px radius matching the outer card, typically a dark-field 3D / scientific visualization with luminous lines
- **Layout:** typically split-column — headline + CTA on left ~55%, imagery on right ~45%

### Dark card states
- **Static (non-interactive):** No hover. The card is a content surface, not an action.
- **Interactive (rare — only when the entire card is a link):** Subtle imagery zoom (1.0 → 1.02) clipped at the 24px radius, OR a subtle text-color shift on the embedded CTA. **Never** a background brightness change — the slate-dark surface is fixed.
- **Focus:** 2px solid offset focus ring in `border-buffer` (ivory) — visible against the dark surface

## Tertiary Surface Card (callout / quote / pull-out)

For block quotes, callouts, sidebar excerpts, single-stat blocks.

- **Background:** `surface-warm-card` (#E3DACC)
- **Radius:** 24px
- **Padding:** 31px
- **No border, no shadow.**
- **Heading:** Anthropic Sans, 24px, weight 600, `heading` color
- **Body / quote text:** Anthropic Sans, 16–18px, `body` color
- Used to break long-form light card grids with a tonal warmth shift.

## Card Heading Hierarchy

- The page hierarchy must logically arrive at the card heading level — never skip from `h1` to a `h4` card heading.
- Light cards typically host an `h3` (24px) or `h4` (20px) heading.
- Dark editorial cards host an `h2` (Anthropic Serif 91px, mapped to display) — they are display-scale moments.
- Tertiary callout cards host an `h4` or `h5`.

## Rules

- **Background:** `surface-elevated` / `surface-warm-card` for light cards; `surface-feature-dark` for editorial feature cards.
- **Border:** none on cards.
- **Radius:** **24px on every card variant** — light release cards, dark editorial feature cards, and tertiary callout cards all share the same 24px outer radius. This is the system's signature card geometry.
- **Shadow:** **none, ever, on any card.**
- **Text color:** `heading` and `body` on light cards; ivory (`surface-page-base`) and `body-subtle` mapped to dark on dark feature cards.
- **Interactive light cards:** background-color shift on hover only (no transform / shadow / scale / border).
- **Non-interactive cards:** no hover styles.
- **Dark feature cards never run full-bleed to the viewport edge** — they sit inside the 1200px column with ivory peeking around all corners.
- **One dark feature card per section maximum**, and never two adjacent dark sections (alternation rule from `layout.md`).
- **Imagery clips to card radius:** 24px on all card variants — interior images, illustrations, and media are hard-clipped to match the card's 24px outer corners.
- **Never combine multiple chromatic accents inside a single card** — the underlying palette is achromatic.

---

## Source file: `colors.md`

# Color Tokens

> Brand color: **`#141413`** — a near-black slate that functions as both foreground (ink) and background (inverted surfaces). The brand and its softer shades are the entire structural backbone; warmth comes from the ivory page base, not from chromatic color.

## Background Tokens

### Neutral
| Token | Light | Dark |
|---|---|---|
| neutral-primary-soft | #FAF9F5 | #141413 |
| neutral-primary | #FAF9F5 | #1A1A18 |
| neutral-primary-medium | #F4F2EA | #1F1F1D |
| neutral-primary-strong | #F0EEE6 | #282825 |
| neutral-secondary-soft | #F4F2EA | #1F1F1D |
| neutral-secondary | #F0EEE6 | #282825 |
| neutral-secondary-medium | #E8E6DC | #2E2E2B |
| neutral-secondary-strong | #E3DACC | #3D3D3A |
| neutral-tertiary-soft | #E3DACC | #3D3D3A |
| neutral-tertiary | #D1CFC5 | #4A4A46 |
| neutral-tertiary-medium | #D1CFC5 | #5E5D59 |
| neutral-quaternary | #B0AEA5 | #5E5D59 |
| quaternary-medium | #B0AEA5 | #6E6D68 |
| gray | #87867F | #87867F |

### Brand
| Token | Light | Dark |
|---|---|---|
| brand-softer | #F0EEE6 | #1F1F1D |
| brand-soft | #E3DACC | #282825 |
| brand | #141413 | #FAF9F5 |
| brand-medium | #3D3D3A | #282825 |
| brand-strong | #000000 | #F0EEE6 |

### Status
| Token | Light | Dark |
|---|---|---|
| success-soft | #EDF1E5 | #2A3219 |
| success | #788C5D | #9DB07F |
| success-medium | #C7D2B0 | #4F5C36 |
| success-strong | #4F5C36 | #788C5D |
| danger-soft | #F8E5DD | #3A1B10 |
| danger | #C6613F | #D97757 |
| danger-medium | #E8B6A1 | #6F3522 |
| danger-strong | #8E3F22 | #C6613F |
| warning-soft | #F4EBD7 | #3A2E12 |
| warning | #C6993F | #D9B66A |
| warning-medium | #E5D29B | #6F5722 |
| warning-strong | #6F5722 | #C6993F |

### Utility
| Token | Light | Dark |
|---|---|---|
| dark | #141413 | #141413 |
| dark-strong | #0A0A0A | #282825 |
| disabled | #F0EEE6 | #282825 |

### Accent
| Token | Value (same both modes) | Use |
|---|---|---|
| clay | #D97757 | Primary chromatic accent — warm terracotta, deployed sparingly (one accent per section max) |
| clay-ember | #C6613F | Hover/pressed clay state, deeper accent |
| olive | #788C5D | Categorical thematic tag |
| sky | #6A9BCC | Categorical thematic tag |
| fig | #C46686 | Categorical thematic tag |
| cactus | #BCD1CA | Categorical thematic tag |

## Text Color Tokens

### Base
| Token | Light | Dark |
|---|---|---|
| white | #FAF9F5 | #FAF9F5 |
| black | #141413 | #141413 |
| heading | #141413 | #FAF9F5 |
| body | #3D3D3A | #E8E6DC |
| body-subtle | #5E5D59 | #D1CFC5 |
| body-muted | #87867F | #B0AEA5 |

### Brand
| Token | Light | Dark |
|---|---|---|
| fg-brand-subtle | #5E5D59 | #B0AEA5 |
| fg-brand | #141413 | #FAF9F5 |
| fg-brand-strong | #000000 | #FFFFFF |

### Status
| Token | Light | Dark |
|---|---|---|
| fg-success | #4F5C36 | #9DB07F |
| fg-success-strong | #3A4427 | #C7D2B0 |
| fg-danger | #C6613F | #D97757 |
| fg-danger-strong | #8E3F22 | #E8B6A1 |
| fg-warning-subtle | #6F5722 | #C6993F |
| fg-warning | #4A3A12 | #E5D29B |
| fg-disabled | #B0AEA5 | #5E5D59 |

### Informational / Accent
| Token | Light | Dark |
|---|---|---|
| fg-clay | #D97757 | #D97757 |
| fg-clay-strong | #C6613F | #E8B6A1 |
| fg-olive | #4F5C36 | #9DB07F |
| fg-sky | #4A78A6 | #6A9BCC |
| fg-fig | #9C4A66 | #C46686 |
| fg-cactus | #5E8074 | #BCD1CA |

## Border Color Tokens

| Token | Light | Dark |
|---|---|---|
| border-dark | #141413 | #B0AEA5 |
| border-buffer | #FAF9F5 | #141413 |
| border-buffer-medium | #FAF9F5 | #1F1F1D |
| border-buffer-strong | #FAF9F5 | #282825 |
| border-muted | #F0EEE6 | #282825 |
| border-light-subtle | #E8E6DC | #2E2E2B |
| border-light | #E3DACC | #3D3D3A |
| border-light-medium | #D1CFC5 | #4A4A46 |
| border-default-subtle | #D1CFC5 | #3D3D3A |
| border-default | #B0AEA5 | #5E5D59 |
| border-default-medium | #87867F | #6E6D68 |
| border-default-strong | #5E5D59 | #87867F |
| border-success-subtle | #C7D2B0 | #2A3219 |
| border-success | #788C5D | #4F5C36 |
| border-danger-subtle | #E8B6A1 | #3A1B10 |
| border-danger | #C6613F | #C6613F |
| border-warning-subtle | #E5D29B | #3A2E12 |
| border-warning | #C6993F | #6F5722 |
| border-brand-subtle | #3D3D3A | #5E5D59 |
| border-brand-light | #5E5D59 | #87867F |
| border-brand | #141413 | #FAF9F5 |
| border-dark-subtle | #3D3D3A | #5E5D59 |
| border-clay | #D97757 | #D97757 |
| border-olive | #788C5D | #788C5D |

## Surface System

The page is built from four surface levels that alternate to create the editorial rhythm. Choose surface level by hierarchy, not by aesthetic preference.

| Level | Token | Light | Dark | Purpose |
|---|---|---|---|---|
| 1 | surface-page-base | #FAF9F5 | #141413 | Root page background, all section backgrounds, button fills, default surface |
| 2 | surface-elevated | #F0EEE6 | #1F1F1D | Light release card surface, secondary card backgrounds |
| 3 | surface-warm-card | #E3DACC | #282825 | Tertiary card backgrounds, callout cards |
| 4 | surface-feature-dark | #141413 | #FAF9F5 | Editorial feature cards, inverted content blocks (light text on this surface) |

## Section Background Rule (mandatory)

**Every page section must use `#FAF9F5` (Ivory Light, `surface-page-base`) as its background.** No exceptions.

- All `<section>` containers, all hero blocks, all article wrappers, all top-level layout regions sit on the warm ivory `#FAF9F5` base.
- Tonal variation across the page does **not** come from changing section backgrounds. It comes from **cards placed inside sections** — light release cards (`#F0EEE6` / `#E3DACC`) and dark editorial feature cards (`#141413`) that sit on top of the ivory section surface.
- The ivory `#FAF9F5` background must remain visible **around and between** every card. This is what creates the "contained inversion" rhythm — dark cards never run edge-to-edge; the ivory surface always peeks around them.
- Navigation backgrounds may use `surface-elevated` (#F0EEE6) only when a clear chrome separation is required; otherwise the nav also sits on `#FAF9F5`.

### Forbidden
- Never set a section background to pure white (`#FFFFFF`), pure gray (`#F5F5F5`, `#F0F0F0`, etc.), or any non-ivory neutral.
- Never set a section background to `surface-elevated`, `surface-warm-card`, or `surface-feature-dark` — those are **card** surfaces, not **section** surfaces.
- Never apply gradients, mesh overlays, noise textures, or chromatic tints to section backgrounds.
- Never alternate section backgrounds (e.g. ivory section → warm-card section → ivory section). Surface alternation is achieved through the cards inside sections, not the sections themselves.

## Semantic Usage Rules

- **Page and section backgrounds: `surface-page-base` (#FAF9F5, warm ivory) — mandatory for every section, no exceptions, never pure white.**
- Navigation backgrounds: `surface-page-base` (default) or `surface-elevated` only when explicit chrome separation is needed
- Light release cards: `surface-elevated` (#F0EEE6) or `surface-warm-card` (#E3DACC) — placed on top of the ivory section
- Dark editorial feature cards: `surface-feature-dark` (#141413) with ivory text — placed on top of the ivory section, never as a section background itself
- Primary buttons: `brand` background (slate-dark) with `surface-page-base` (ivory) text — OR ivory background with slate-dark text and 1px solid slate-dark border
- Headings: `heading` text color
- Body text: `body` text color
- Inline links and CTAs: `fg-brand` color, with underline emphasis (no color shift)
- Default borders: `border-brand` (1px solid slate-dark) for primary structural lines; `border-default` for muted dividers
- Status accents: clay/olive/sky/fig/cactus — one chromatic accent per section maximum
- Disabled: `disabled` background + `fg-disabled` text + `border-default`

## Prohibited

- No raw hex/rgb values in component code — always use design tokens
- Never use pure white (#FFFFFF) or pure black (#000000) for any surface, text, or border
- Never use clay/olive/sky/fig/cactus as text color for body copy or navigation
- Never combine multiple chromatic accents within a single section — palette colors are categorical, not combinable
- Never replace underline emphasis with color emphasis on display headlines
- No gradient meshes, glow halos, or chromatic background fills on large surfaces
- No manual light/dark value swapping — let the CSS custom properties handle it

---

## Source file: `content.md`

# Content & Grid System

> Dependencies: `layout.md`, `typography.md`, `colors.md`

## Containers

| Type | Max width | Horizontal padding |
|---|---|---|
| Standard | 1200px | 24px desktop, 20px tablet, 16px mobile |
| Wide | 1280px | 24px (only for asymmetric showcases) |
| Internal (reading / long-form) | 720px | — (60–72 character line length) |
| Narrow editorial column | 560px | — (used for centered hero text columns) |

## Vertical Padding

| Breakpoint | Section vertical padding | Hero / feature padding |
|---|---|---|
| Mobile | 48px | 64px |
| Tablet (≥768px) | 61px | 76px |
| Desktop (≥1024px) | 84px | 96–120px |

## Section Gap

Adjacent sections (when not separated by a contained dark feature card) sit on a **61px gap** rhythm — never tighter than 48px, never looser than 96px without a deliberate hero context.

## Grid System

Mobile-first with flexible desktop configurations.

| Context | Gap |
|---|---|
| Standard content / cards | 16px (compact) or 24px (spacious) |
| Wide component grids | 32px |
| Compact widgets / metadata clusters | 8–12px |

### Responsive Columns

| Breakpoint | Columns |
|---|---|
| Mobile (default) | 1 |
| Small / Tablet (≥640px) | 1–2 |
| Tablet (≥768px) | 2–3 |
| Desktop (≥1024px) | 2–4 |
| Wide (≥1280px) | 3–4 |

The signature card-grid pattern is **3-column equal-width** at desktop (e.g. "Latest releases"). Two-column splits use ~55% / ~45% (the editorial hero rhythm — headline left, body or imagery right).

## Breakpoints

| Name | Width |
|---|---|
| Small | 640px |
| Medium | 768px |
| Large | 1024px |
| Extra large | 1200px |
| 2x Extra large | 1440px |

## Reading Width (long-form text)

- Body copy max-width: ~70 characters (≈ 720px at 16px Anthropic Sans)
- Heading max-width: ~30 characters at display sizes (forces line breaks at meaningful phrase boundaries)
- Pull-quote / callout max-width: ~52 characters

## Hero Column Pattern

The signature hero composition:
- Left column: large weight-700 Anthropic Sans headline (61px), spanning ~55% width
- Right column: brief descriptive paragraph at 18px Anthropic Sans, ~30% width, top-aligned with the headline baseline
- Both sit on the ivory page background with 80px top padding
- Selected keywords in the headline carry the thick-underline emphasis (see `typography.md`)

## Section Composition

Standard editorial section:
1. Optional eyebrow (Anthropic Mono 12px uppercase `body-muted`, +0.04em tracking)
2. Heading (`h2` at 40px or `h3` at 24px)
3. Leading paragraph (subheading 18px)
4. Section content (cards grid, list, or single body column)
5. CTA Arrow Text Link if applicable

## Rules

- **Always design mobile-first.** Stack columns on mobile, expand to multi-column at tablet+.
- **Use layout shifts (column → row)** to accommodate horizontal space rather than stretching components.
- **Lists:** 0–24px left indent, 12px vertical gap between items (see `lists.md`).
- **Body copy:** Anthropic Sans 16px, line-height 1.5.
- **All interactive links follow the underline-on-hover or always-underlined protocol** from `typography.md`. Keywords inside large headlines use the thick-underline-as-emphasis pattern (no color change).
- **Surface alternation:** Sections alternate between `surface-page-base` (ivory) and `surface-feature-dark` editorial cards per the rhythm in `layout.md`. Don't run two dark sections back-to-back.
- **Dark feature cards live inside the 1200px container**, never full-bleed to viewport edges.
- **Maximum 4 columns at desktop** unless the content is genuinely tabular (then use `tables.md`, not the grid system).

---

## Source file: `dropdown.md`

# Dropdown

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `inputs.md`, `typography.md`

Dropdowns are floating, transient overlays — one of the few places a subtle drop shadow is permitted (`shadow-overlay`). The trigger button itself remains flat with 0px corners and an ink-line border.

## Core Specs

### Chevron Icon
- Size: 16x16px
- Stroke: 1.5px linear, monochromatic
- Spacing: 8px left margin from label, -2px right inset
- Color: inherits from trigger text

### Menu Container
- Background: `surface-page-base` (ivory)
- Border: 1px solid `border-brand` (slate-dark)
- Radius: 0px (base)
- Shadow: `shadow-overlay` (the only shadow allowed on this surface — it floats over content)
- Z-index: elevated above content
- Margin top: 8px from trigger

### Menu List
- Padding: 8px
- Font: Anthropic Sans 15px, weight 400, `body` color

### Menu Item
- Layout: inline-flex, vertically centered, full width
- Padding: 10px horizontal, 8px vertical
- Radius: 0px
- Background: transparent
- Text: `body`
- Hover: `surface-elevated` (#F0EEE6) background, `heading` text
- Transition: 120–200ms ease-out on `background-color` and `color` only

## Trigger

The trigger is a button — see `buttons.md`. Common pairings:
- Ghost / nav trigger (transparent, 1px slate-dark border, 0px radius)
- Tertiary trigger (1px `border-default`)
- Input-style trigger when used as a select replacement

## Trigger Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Small | 14px | 12px | 8px |
| Base | 15px | 16px | 10px |
| Large | 16px | 20px | 12px |

## Icon-only Trigger

- Padding: 8px
- Min size: 44x44px
- Icon: 20x20px, 1.5px stroke
- Background: transparent
- Border: 1px `border-default` (or `border-brand` for the primary variant)
- Hover: `surface-elevated` background

## Variants

### Default
- Menu min-width: 192px, items have 0px radius

### With Divider
- 1px top border `border-default-subtle` between child groups (skip the first group)
- 4px vertical margin around the divider

### With Header
- Header padding: 12px horizontal, 12px vertical
- Bottom border: 1px `border-default-subtle`
- Name: `heading` color, Anthropic Sans 15px, weight 600
- Email / subtitle: `body-subtle` color, Anthropic Sans 14px, weight 400, truncated

### With Icons
- Icon before label: 16x16px, 8px right margin, `body-subtle` color, 1.5px stroke
- On hover, icon color shifts to `heading`

### With Checkbox / Radio
- Inputs: 16x16px square (0px radius — see `radios-checkboxes-toggle.md`)
- Focus ring: 2px solid offset `border-brand`
- Helper text: Anthropic Sans 12px, `body-subtle` color, 4px top margin

### With Search
- Search input at top of menu following `inputs.md` specs
- Left magnifier icon: 12px from left edge, input gets 36px left padding
- Search input border: 1px `border-default-subtle` (lighter than menu's outer border)

### Scrollable
- Max height: 224px (≈ 6 standard items), vertical scroll overflow
- Custom scrollbar: 8px wide, `border-default` thumb, transparent track

## States

| State | Appearance |
|---|---|
| Focused trigger | No outline, 2px solid offset focus ring in `border-brand` |
| Hover item | `surface-elevated` background, `heading` text |
| Active / selected item | `surface-warm-card` background, `heading` text, optional 1px left bar in `border-brand` |
| Disabled item | `fg-disabled` text, not-allowed cursor, no pointer events, no hover background |

## Rules

- **0px radius on the menu container, items, and trigger.** No soft corners.
- **`shadow-overlay` is permitted only on the floating menu surface.** The trigger button never carries a shadow.
- **Hover backgrounds are warm tonal shifts** (ivory → elevated → warm-card), never chromatic.
- **No accent colors as menu item backgrounds.** Selected state uses the warm-card surface, not a brand fill.
- **Focus rings are solid 2px offset** in `border-brand` — never a glowing ring.
- **Icon stroke 1.5px linear** for all menu icons.

---

## Source file: `icon-shapes.md`

# Icon Shapes

> Dependencies: `colors.md`, `radius.md`, `borders.md`

Icon containers (the small square fills behind a feature icon) preserve the system's 0px-radius / sharp-corner language. They are flat, ink-toned, and never carry shadows or glow.

## Core Specs

- **Box sizing:** border-box
- **Icon centering:** inline-flex, centered on both axes
- **Shape:** square (0px radius) — always
- **Rounded square:** 0px radius — square is the default and only shape; reject "rounded square" as a synonym for soft corners
- **Border (when applied):** 1px solid, ink-toned (`border-brand` or `border-default`)
- **Shadow:** none, ever
- **Icon stroke:** 1.5px linear, monochromatic, never chromatic except inside the explicit color variants below
- **Icon style:** outline / linear, not filled glyphs (preserves the editorial line-art feel)

## Sizes

| Size | Container | Icon |
|---|---|---|
| XS | 24x24px | 14x14px |
| SM | 32x32px | 16x16px |
| MD | 40x40px | 20x20px |
| LG | 48x48px | 24x24px |
| XL | 56x56px | 28x28px |
| 2XL | 64x64px | 32x32px |

## Color Variants

### Default (Neutral)
- Shape: square (0px radius)
- Background: `surface-warm-card` (#E3DACC)
- Icon color: `heading`
- Border: none

### Brand (subtle ivory)
- Shape: square (0px radius)
- Background: `brand-softer` (#F0EEE6)
- Icon color: `heading`
- Border: 1px solid `border-default-subtle`

### Inverted (on light surfaces)
- Shape: square (0px radius)
- Background: `brand` (slate-dark)
- Icon color: `surface-page-base` (ivory)
- Border: none

### Outline (chromeless)
- Shape: square (0px radius)
- Background: transparent
- Icon color: `heading`
- Border: 1px solid `border-brand` (slate-dark)

### Clay Accent (sparing — one per section max)
- Shape: square (0px radius)
- Background: transparent
- Icon color: `fg-clay`
- Border: 1px solid `border-clay`

### Danger
- Shape: square (0px radius)
- Background: `danger-soft`
- Icon color: `fg-danger-strong`
- Border: 1px solid `border-danger-subtle`

### Success
- Shape: square (0px radius)
- Background: `success-soft`
- Icon color: `fg-success-strong`
- Border: 1px solid `border-success-subtle`

### Warning
- Shape: square (0px radius)
- Background: `warning-soft`
- Icon color: `fg-warning`
- Border: 1px solid `border-warning-subtle`

## On Dark Surfaces (inside dark feature cards)

Inside a dark feature card (#141413), icon shapes invert:
- Background: transparent or `surface-elevated` (light) — never another dark fill
- Icon color: `surface-page-base` (ivory)
- Border: 1px solid `border-buffer` (ivory)

## Rules

- **0px radius is mandatory.** No rounded squares (4px / 8px) or circles for icon containers.
- **No drop shadows. No glow.** Containers are flat ink shapes.
- **Linear icon style preferred** over filled glyphs.
- **One chromatic-accent icon shape per section.** Default to neutral / brand variants for repeating UI moments.
- **Icon stroke matches text weight rhythm:** 1.5px stroke for body-scale icons, never thicker than 2px.

---

## Source file: `inputs.md`

# Inputs

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

## Core Specs

- **Display:** block, full width
- **Radius:** 0px (base) — sharp corners, ink-on-paper
- **Border:** 1px solid `border-default`
- **Background:** `surface-page-base` (ivory) — inputs sit on the same warm surface as the page; tonal contrast comes from the border, not a darker fill
- **Shadow:** none
- **Font:** Anthropic Sans 15px, weight 400, `heading` color
- **Padding:** 12px horizontal, 10px vertical
- **Placeholder:** `body-muted` color, weight 400
- **Caret:** `heading` color
- **Transition:** 120–200ms ease-out on `border-color` and `background-color` only — never on transform.
- **Letter-spacing:** -0.002em

## Label

- Display: block
- Font: Anthropic Sans 15px, weight 500, `heading` color
- Margin bottom: 8px
- Letter-spacing: -0.002em
- Label `htmlFor` must match the input `id`

## Helper Text / Hint

- Font: Anthropic Sans 14px, weight 400, `body-subtle` color
- Margin top: 6px
- Line-height: 1.4

## Sizes

| Size | Font size | Horizontal padding | Vertical padding |
|---|---|---|---|
| Small | 14px | 10px | 8px |
| Base (default) | 15px | 12px | 10px |
| Large | 16px | 14px | 14px |

## States

### Default
- Border: `border-default`
- Background: `surface-page-base`

### Hover
- Border: `border-default-strong`
- Background: stays `surface-page-base` — never tonal shift on hover

### Focus
- Outline: none
- Border: 1px solid `border-brand` (slate-dark)
- Focus ring: **2px solid offset** in `border-brand` (no glow, no blur, no chromatic ring)

### Filled (has value)
- Border: `border-default-strong`
- Text: `heading`

### Success
- Border: `border-success`
- Focus ring: 2px solid offset in `border-success`
- Helper text: `fg-success`

### Error / Danger
- Border: `border-danger`
- Focus ring: 2px solid offset in `border-danger`
- Helper text: `fg-danger-strong`

### Warning
- Border: `border-warning`
- Focus ring: 2px solid offset in `border-warning`

### Disabled
- Background: `disabled` (oat tone)
- Border: `border-default`
- Text: `fg-disabled`
- Cursor: not-allowed
- No hover, no focus.

### Read-only
- Background: `surface-elevated`
- Border: `border-light-subtle`
- Text: `body`
- No focus state.

## Input with Icons

- Icon size: 16x16px
- Icon stroke: 1.5px linear, monochromatic
- Icon color: `body-subtle`; on focus → `heading`
- Container: relative-positioned wrapper
- Start icon: absolutely positioned left, 12px from left edge — input gets 36px left padding
- End icon: absolutely positioned right, 12px from right edge — input gets 36px right padding
- Icons vertically centered within the wrapper

## Textarea

- Same border, radius, background, focus rules as text inputs.
- Min-height: 96px; resize vertical only.
- Padding: 12px horizontal, 10px vertical.
- Line-height: 1.5.

## Select

- Same border, radius, background, focus rules as text inputs.
- Native `<select>` chevron OR a custom 16x16px chevron icon in `body-subtle` (12px from right edge).
- Right padding: 36px to clear the chevron.

## Search Input

- Identical to text input.
- Lead with a 16x16px magnifier icon (start-icon position).
- Optional clear button (right end-icon position) appears once a value is entered: 14x14px X glyph in `body-subtle`, hover → `heading`, no background.

## File / Dropzone

- Border: 1px **dashed** `border-default-strong` (the only place dashed borders are permitted in this system)
- Background: `surface-elevated`
- Radius: 0px
- Padding: 32px
- Hover: border becomes `border-brand`, background `surface-warm-card`
- No shadow.

## Rules

- Every input must have a unique `id`
- Every input must have a matching `<label htmlFor>`
- Padding: 12px horizontal, 10px vertical (default) unless overridden for icon variants
- **0px radius is mandatory** — never round inputs (no 4px, 6px, pill).
- **Background is the ivory page base, not a darker fill.** Tonal differentiation comes from the 1px border.
- **No drop shadows on focus** — focus state is a solid 2px offset ring in `border-brand`, never a blurred glow.
- **No chromatic accent backgrounds** (no clay/sky/fig fills on inputs).
- No arbitrary hex or hardcoded colors — always reference tokens.

---

## Source file: `layout.md`

# Layout & Spacing

## Spacing Rhythm

Base unit: **4px** (compact density). Most composition values land on a 4 / 8 / 16 / 32 / 61 / 76 / 84 grid.

| Context | Value |
|---|---|
| Section vertical padding | 84px (desktop) / 61px (tablet) / 48px (mobile) |
| Section gap (between adjacent sections) | 61px |
| Section header → content | 32px or 48px |
| Heading → paragraph | 16px |
| Container horizontal padding | 24px (desktop) / 20px (tablet) / 16px (mobile) |
| Card padding (interior) | 31px |
| Card grid gap | 16px |
| Wide component grid gap | 24px |
| Column layout gap | 32px or 48px |
| Element gap (label ↔ value, icon ↔ text) | 8px – 16px |
| Inline form gap | 12px |

## Container

Standard section container: **max-width 1200px**, centered, 24px horizontal padding.

Every major section wraps content in this container. Dark editorial feature cards do NOT extend full-bleed to the browser edge — they sit inside the 1200px column, allowing the ivory page background to peek around all four corners (the "contained inversion" effect).

## Content Composition Order

Inside each section, follow this order:
1. Heading (`h1`–`h3`)
2. Leading paragraph (subheading)
3. Normal paragraph(s)
4. Lists, CTA links, or component grids

## Section Pattern

Each section has:
- 84px vertical padding (desktop)
- **Background: `surface-page-base` (#FAF9F5, warm ivory) — mandatory, no exceptions**
- A centered container (max-width 1200px, 24px horizontal padding)
- A section header area with 32–48px bottom margin
- Section content below — typically cards placed on top of the ivory section surface

## Surface Alternation System

**Every section uses the same ivory `#FAF9F5` background.** Page rhythm is created by alternating the **cards inside sections** — not by alternating the sections themselves. See `colors.md` → "Section Background Rule" for the mandatory rule.

```
Section 1 — Ivory background (#FAF9F5)
   └─ Dark editorial feature card (#141413, radius 24px, contained in 1200px column)
Section 2 — Ivory background (#FAF9F5)
   └─ Light release card grid (#F0EEE6 / #E3DACC, radius 24px)
Section 3 — Ivory background (#FAF9F5)
   └─ Dark editorial feature card (#141413, radius 24px)
   ↓
Repeat
```

- **Ivory `#FAF9F5` is the structural baseline** — the "paper" — and it is the background for every section without exception.
- **Dark cards (#141413)** sit on the ivory section, full content-column-width but NOT viewport-edge-to-edge. The ivory section background remains visible around all four corners of the dark card. This contained inversion is essential — never let dark cards run full-bleed to the screen edges, and never use `#141413` as a section background.
- **Light release cards (#F0EEE6 or #E3DACC)** are tertiary surfaces sitting on top of the ivory section. They differentiate from the page base purely through warm tonal shift, never through borders or shadows.
- Transitions between cards are **hard-edged**. No gradient fades, no soft blends, no shadow softening.

## Card Surface Selection Rules

- Single editorial / hero feature → use the **dark feature card** (#141413, 24px radius) on top of the ivory section
- Content listings, releases, articles, blog cards → use **light cards** alternating between `surface-elevated` (#F0EEE6) and `surface-warm-card` (#E3DACC) within a grid, all sitting on top of the ivory section
- Callout / quote / pull-out → use `surface-warm-card` (#E3DACC) for warmth differentiation
- Avoid placing two dark cards adjacent to one another; rhythm requires light → dark → light alternation **at the card level**, with ivory section breathing room between each.

## Motion & Animation

- Prefer CSS-native: `transition`, `animation`, `@keyframes`. Use a Motion library only when CSS cannot achieve the behavior.
- **Transitions are short and editorial:** 120–200ms ease-out for hover/focus states. No bouncy, springy, or theatrical easings.
- **Reserve scroll-triggered animations** for moments that reinforce hierarchy (a feature card revealing on scroll). One orchestrated reveal per page is preferred over many isolated effects.
- No parallax, no auto-playing carousels, no hover wobbles. The system is editorial, not interactive-playful.
- Hover changes are color/border shifts only — no scale, no rotate, no shadow-lift.

## Backgrounds & Visual Depth

- Default to flat, warm ivory backgrounds for all page sections.
- Use **surface color contrast** (ivory ↔ warm-card ↔ slate-dark) and 1px borders for visual separation.
- **No gradient meshes, noise textures, grain overlays, or blur effects** — maintain a clean, printed-paper canvas.
- **No shadows under sections, cards, or hero blocks.**
- Every visual treatment must serve a compositional purpose (structure, separation, or emphasis). No purely ornamental effects competing with content.

## Imagery Treatment

- Use imagery sparingly — text dominates; imagery is a single dramatic accent per major section, never a repeating motif.
- Inside dark feature cards, imagery is hard-clipped to the card's 24px radius (matching the card's outer corners).
- Prefer dark-field, high-contrast 3D / scientific / abstract visualizations on dark cards (luminous lines on near-black). Avoid stock photography.
- Decorative icons should be linear, monochromatic, and sit in `heading` or `body` color — not chromatic.

## Must

- **Every section: background `#FAF9F5` (Ivory Light, `surface-page-base`) — mandatory, no exceptions.** See `colors.md` → "Section Background Rule".
- All containers: max-width 1200px, centered, 24px horizontal padding
- Vertical rhythm: 84px section padding, 61px between sections
- Card radius: 24px on every card variant (light release cards, dark feature cards, callout cards)
- Card padding: 31px on all sides
- Layouts readable and properly spaced on both desktop and mobile
- Dark feature cards always sit inside the 1200px column (never full-bleed) and never replace a section background

---

## Source file: `lists.md`

# Lists

> Dependencies: `colors.md`, `typography.md`

## Core Specs

- **Item spacing:** 12px vertical gap between list items (16px for spacious / reading lists)
- **Text:** Anthropic Sans 16px, weight 400, `body` color, line-height 1.5
- **Marker:** custom — replace native bullets with subtle ink markers (see Marker Styles)
- **Indent:** 0 (list aligns with surrounding text), with marker living in a 24px reserved gutter

## Marker Styles

| List type | Marker |
|---|---|
| Unordered | 3x3px square (0px radius) in `body-subtle` color, centered vertically with text |
| Ordered | Anthropic Sans numerals, weight 500, `body-subtle` color, trailing `.` separator |
| Description / definition | Term in Anthropic Sans 15px weight 600 `heading` color, definition indented 24px in `body` |
| Checklist (read-only) | 14x14px square outline in `border-default-strong`; checked items use a 14x14px filled square in `heading` with an ivory checkmark |

Native disc/circle bullets are replaced with the 3x3px square marker — preserves the 0px-radius / sharp-corner signature.

## List Icons (when icons replace markers)

- Size: 16x16px (compact lists) or 20x20px (spacious / reading lists)
- Stroke: 1.5px linear, monochromatic
- Prevent squishing: `flex-shrink: 0`
- Spacing: 8px right margin between icon and text
- Active / featured icon: `heading` color (or `fg-clay` for a single accented row — never multiple)
- Neutral icon: `body-subtle` color

## Inactive / Disabled Items

- Text: `body-muted` with `text-decoration: line-through` (decoration color matches text)
- Marker / icon: `body-muted`
- Cursor: not-allowed when interactive

## Inline / Comma-separated Lists

For tag rows or metadata lists that read as a single sentence:
- Items separated by ` · ` (interpunct) or ` — ` (em dash) in `body-muted` color
- Use Anthropic Mono if the items are categorical labels (DATE, CATEGORY)

## Description List

Used for metadata blocks (DATE / CATEGORY / AUTHOR pairs) inside cards.

- Layout: 2-column grid, term + definition rows, 16px row gap, 24px column gap
- Term: Anthropic Mono 16px, weight 400, **uppercase**, letter-spacing +0.04em, `body-muted` color
- Definition: Anthropic Sans 15px, weight 400, `heading` color
- No borders between rows; vertical rhythm carries the structure.

## Numbered Steps / Process Lists

- Marker: Anthropic Mono 14px weight 500, `body-subtle` color, uppercase numeral with leading `0` (e.g. `01.`, `02.`)
- Item heading: Anthropic Sans 18px, weight 600, `heading`
- Item body: Anthropic Sans 15px, `body`
- Step gap: 24px

## Pattern

Vertical flex list with 12px gap. Each item is a flex row with centered alignment — marker or icon (16–20px, no-shrink, 8px right margin) followed by `body`-colored text. Markers and icons inherit color from the row context, never chromatic.

## Rules

- **Replace native disc bullets** with the 3x3px square marker — preserves the system's sharp-corner language.
- **No chromatic accent colors** for list markers in default contexts. Reserve `fg-clay` for a single emphasized row, max one per list.
- **Description-list terms use Anthropic Mono uppercase** — they read as data classification labels.
- **No drop shadows** on list items.
- **No hover background fills** on read-only lists; use background-color shifts only on interactive list items (e.g. dropdown options).

---

## Source file: `modals.md`

# Modals

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `buttons.md`, `inputs.md`, `typography.md`

Modals are one of the few transient overlays in this system that may carry a subtle drop shadow (`shadow-modal`). The dialog body remains flat and ink-bordered with a 16px panel radius.

## Core Specs

### Overlay (Backdrop)
- Fixed, covers full viewport
- Z-index: 40
- Background: `brand` (slate-dark, #141413) at 50% opacity (no chromatic tint)
- Backdrop blur: 8px (subtle, not glassy)

### Content Container
- Background: `surface-page-base` (ivory, #FAF9F5)
- Radius: 16px (panel radius — softer than buttons/cards but still architectural)
- Shadow: `shadow-modal` (the only shadow allowed on a static modal surface — it floats over the backdrop)
- Padding: 0 (header / body / footer carry their own padding)
- Border: 1px solid `border-brand` for high-emphasis modals; `border-default` for low-emphasis confirmations
- Max-width: 520px (default), 720px (form / detail variants), 960px (full-content variants)
- Margin: auto, vertically centered with 48px top/bottom safe-zone

## Anatomy

### Header
- Padding: 24px horizontal, 20px vertical
- Bottom border: 1px solid `border-default-subtle`
- Title: Anthropic Sans 20px, weight 600, `heading` color, letter-spacing -0.005em
- Optional eyebrow: Anthropic Mono 14px uppercase `body-muted`, +0.04em tracking, 4px below title
- Close button: 32x32px Ghost variant — see `buttons.md` — 16x16px X glyph in `body-subtle`, hover `heading`

### Body
- Padding: 24px horizontal, 24px vertical
- Vertical spacing between elements: 16px (24px for spacious form layouts)
- Text: Anthropic Sans 16px, weight 400, line-height 1.5, `body` color
- Headings inside body use `h4`/`h5` from `typography.md`

### Footer
- Padding: 16px horizontal, 16px vertical
- Top border: 1px solid `border-default-subtle`
- Layout: flex row, justify-end, 12px gap between buttons
- Action buttons follow `buttons.md` (typically: secondary "Cancel" + primary "Confirm")

## Variants

### Default (Informational)
Standard header + body + footer with primary / secondary action buttons. 520px max-width.

### Pop-up (Confirmation)
Centered text, prominent icon, reduced padding:
- Body: 32px padding, text centered
- Icon container: centered, 16px bottom margin, 56x56px, square (0px radius), background per intent (`success-soft` / `danger-soft` / `warning-soft`), icon color matches `fg-success-strong` / `fg-danger-strong` / `fg-warning`
- Title: Anthropic Sans 20px, weight 600, centered
- Description: Anthropic Sans 15px, `body`, centered, max-width 360px
- Footer buttons: equal-width, full-width on mobile, justified end on desktop

### Form Modal
Body contains inputs following `inputs.md`. Vertical spacing between form elements: 16px. Helper text uses 14px `body-subtle`. Submit / Cancel pattern in footer.

### Editorial / Detail Modal (dark variant — sparing use)
For pillar content moments inside a modal:
- Background: `surface-feature-dark` (#141413)
- Radius: 24px (matches dark feature card radius)
- Title in Anthropic Serif 48–61px, weight 400, ivory
- Body in Anthropic Sans 16px, `body-subtle` mapped to ivory tone
- Close button: 32x32px Ghost with ivory glyph, hover surface tint
- Footer border: 1px `border-buffer` (ivory at low opacity)

## States

- **Open / mounting:** 200ms ease-out fade for backdrop opacity (0 → 0.5) and 180ms ease-out opacity for dialog (0 → 1). Optional 8px translate-y-down → 0 on dialog. **Never use scale-in or bounce.**
- **Focus:** First focusable element receives focus on mount; focus is trapped inside the modal until close.
- **Close:** Escape key, backdrop click (configurable), or close button. 150ms ease-out fade-out.

## Rules

- **Radius: 16px on default modals; 24px on the editorial/dark variant.** Buttons and inputs inside the modal still follow their own 0px radius.
- **`shadow-modal` is the only shadow.** Never stack additional shadows on the dialog or its contents.
- **Backdrop is slate-dark at 50% — never pure black, never a chromatic tint.**
- **No backdrop gradient or noise overlay.**
- **Close button must be present and functional** (X glyph, 32x32 hit area).
- **Accessibility:** `role="dialog"`, `aria-modal="true"`, focus trap, keyboard ESC to close, return focus to trigger on close.
- **No transform-scale animations.** Open/close is opacity + small translate only.
- Dark mode automatic via token system.

---

## Source file: `pagination.md`

# Pagination

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Pagination is a connected row of sharp-cornered ink-bordered tiles — visually a segmented control. Active state uses ink fill (slate-dark), never chromatic accents.

## Container

- Layout: inline-flex, items overlap with -1px left margin (shared ink-line border)
- Font: Anthropic Sans 14px, weight 400, `body` color
- Letter-spacing: -0.002em
- Gap: 0 (border overlap creates the rhythm)

## Pagination Item

- Layout: flex, centered both axes
- Size: 36x36px (default) or 40x40px (large)
- Text: `body` color, weight 500
- Background: `surface-page-base` (ivory)
- Border: 1px solid `border-default`
- Radius: 0px (mandatory)
- Hover: `surface-elevated` background, `heading` text, border stays
- Focus: outline none, 2px solid offset focus ring in `border-brand`, raised z-index
- Overlap: -1px left margin (except first item)
- Transition: 120–200ms ease-out on `background-color` and `color`

## Previous / Next Buttons

- Horizontal padding: 12px, height: 36px
- Icon (chevron-left / chevron-right): 14x14px, 1.5px stroke, inherits text color, 6px gap from label (when "Previous" / "Next" labels are visible)
- First item: 0px radius (always sharp)
- Last item: 0px radius (always sharp)
- Disabled state (e.g. "Previous" on first page): `body-muted` text, `border-default-subtle` border, `surface-elevated` background, no hover, not-allowed cursor

## Active Page Item

- Text: `surface-page-base` (ivory)
- Background: `brand` (slate-dark, #141413)
- Border: 1px solid `border-brand`
- Hover: stays the same (active tile doesn't react to hover) — pointer cursor remains for accessibility
- Z-index raised so its full ink border sits above neighbors
- No drop shadow

## Ellipsis ("…") Placeholder

- Same 36x36 dimensions as items
- Background: transparent
- Border: 1px `border-default`
- Text: `body-muted`, Anthropic Sans 14px weight 400
- Not interactive (no hover, no focus, no click)

## Compact Variant

For dense interfaces or footers:
- Replace numeric tiles with "Page X of Y" Anthropic Sans 14px `body` text between Previous / Next buttons
- Previous / Next remain as bordered 36x36 buttons

## Rules

- **0px radius mandatory** — no soft corners, no pills.
- **Active page uses slate-dark fill + ivory text**, never `fg-clay` or accent colors.
- **No drop shadows** on items, container, or hover state.
- **No transform on hover.** State change is `background-color` + `color` + `border-color` only.
- **Focus ring is a 2px solid offset** in `border-brand` — never a soft glow.
- **All items need hover, focus, and disabled states.**
- **Don't space items apart with gap.** The connected ink-line look (-1px overlap) is the system's signature.

---

## Source file: `radios-checkboxes-toggle.md`

# Radios, Checkboxes & Toggles

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Selection controls in this system stay flat, sharp-cornered, and ink-toned. Both radios and checkboxes use **square** shapes (0px radius) — the round-radio convention is replaced with a square-with-dot indicator to preserve the system's formal sharp-corner language.

## Checkbox

- Size: 18x18px
- Radius: 0px
- Border: 1px solid `border-default-strong`
- Background: `surface-page-base` (ivory)
- Hover: `border-brand`, background stays
- Focus: outline none, 2px solid offset focus ring in `border-brand`
- Transition: 120–200ms ease-out on `background-color` and `border-color`

### Checked
- Background: `brand` (slate-dark)
- Border: `border-brand`
- Indicator: 12x12px ivory check glyph, 1.5px stroke

### Indeterminate
- Background: `brand`
- Indicator: 10x2px ivory horizontal bar (centered)

### Disabled
- Background: `disabled` (oat tone)
- Border: 1px `border-default`
- Indicator (if checked): `fg-disabled` color
- Cursor: not-allowed

## Radio (square indicator — see Critical Rules)

- Size: 18x18px
- Radius: 0px (sharp — see rationale at bottom)
- Border: 1px solid `border-default-strong`
- Background: `surface-page-base` (ivory)
- Hover: `border-brand`
- Focus: outline none, 2px solid offset focus ring in `border-brand`
- Transition: 120–200ms ease-out

### Checked
- Border: 1px `border-brand`
- Background: `surface-page-base`
- Indicator: 8x8px **square** filled in `brand` (slate-dark), centered with 4px padding from outer edges

### Disabled
- Border: `border-default`
- Indicator (if checked): `fg-disabled` color
- Cursor: not-allowed

Group all radio items under the same `name` attribute. Use `aria-label` or visible label.

## Toggle (Switch)

A horizontal switch — sharp-cornered, ink-bordered.

### Track
- Width: 36px, Height: 20px
- Radius: 0px (square track)
- Background: `surface-page-base`
- Border: 1px solid `border-default-strong`
- Focus-within: outline none, 2px solid offset focus ring in `border-brand`
- Checked track: `brand` (slate-dark) background, `border-brand` border
- Disabled track: `disabled` background, `border-default`
- Transition: 150ms ease-out on `background-color`

### Thumb
- Size: 14x14px
- Radius: 0px (square thumb)
- Background: `surface-page-base` (ivory) when track is dark; `brand` (slate-dark) when track is ivory (unchecked state)
- Border: 1px `border-brand`
- Position: 2px inset from track edge; translates left↔right on toggle
- Transition: 150ms ease-out on transform — this is the one place transform is permitted (the thumb literally translates)

### Disabled
- Track: `disabled` background, `border-default` border
- Thumb: `body-muted` fill, `border-default` border
- Label: `fg-disabled`

## Label & Helper Text

- Label position: right of the control, 8px gap, vertically centered with the control
- Label font: Anthropic Sans 15px, weight 400, `heading` color
- Helper text: Anthropic Sans 14px, `body-subtle`, 4px below the label, full row indent (label gutter aligned)
- Disabled label: `fg-disabled`

## Sizes

| Size | Checkbox / Radio | Toggle Track | Toggle Thumb |
|---|---|---|---|
| Small | 14x14 | 28x16 | 10x10 |
| Base | 18x18 | 36x20 | 14x14 |
| Large | 22x22 | 44x24 | 18x18 |

## Critical Rules

- **All selection inputs must have `id` matching label `htmlFor`.**
- **Squares everywhere.** Checkboxes, radios, and toggle thumbs/tracks are 0px radius. The radio-as-square is intentional and matches the system's hard-corner formal signature; the checked indicator is a smaller filled square, not a circle.
- **No drop shadows. No glow rings.** Focus uses a solid 2px offset `border-brand` ring — never a soft halo.
- **No chromatic accents on indicators.** Checked state uses `brand` (slate-dark), never clay/sky/fig fills.
- **Transitions on color and border only**, except for the toggle thumb which uses transform (translate) for the slide.
- **Disabled states: no hover/focus interaction.**
- **Label always present** for accessibility — visually hidden labels (`sr-only`) are acceptable when the control is in a tightly contextualized cluster.

---

## Source file: `radius.md`

# Border Radius

| Token | Value | Default usage |
|---|---|---|
| base | 0px | Buttons, inputs, badges, tooltips, dropdown items, nav buttons, metadata chips |
| default | 0px | Small controls, tags, labels |
| sm | 0px | Checkboxes, tiny elements |
| md | 24px | Light release cards, content listing tiles, secondary panels |
| lg | 16px | Modal containers, sidebar inner panels |
| xl | 24px | Featured editorial cards (dark surfaces), hero feature blocks |
| primary-cta | 0px 0px 8px 8px | **Signature asymmetric radius** — flat top, rounded bottom — used **only** on the primary navigation CTA button |
| full | 9999px | Avatars, dot indicators (sparingly — pills are forbidden) |

## Rules

- **0px is the default for all interactive controls** — buttons, inputs, badges, dropdown items, nav links. Sharp corners are a deliberate formal signal of the design system.
- **Cards (all variants) use 24px radius.** Light release cards, dark editorial feature cards, and tertiary callout cards all share the same 24px outer radius — this is the system's signature card geometry.
- **Featured/editorial dark cards use 24px** to read as "contained inversions" rather than full-bleed bands. Imagery inside these cards is hard-clipped at the same 24px radius.
- **Modals use 16px** — slightly tighter than cards, more architectural than buttons.
- **The primary CTA carries the asymmetric `0px 0px 8px 8px` radius** — flat top, rounded bottom only. This pattern is reserved exclusively for the top-nav primary CTA on light surfaces. Never apply this asymmetric radius elsewhere.
- **Never round button corners uniformly** — avoid 4px, 6px, or pill buttons. The 0px button radius is a deliberate formal signature.
- **Never use arbitrary radius values** outside this scale (no 2px, 6px, 12px, 20px).
- **Radius must be consistent within each component family** — all buttons share radius, all cards share radius.
- **Same-radius clipping for nested imagery:** any image or media inside a card inherits the card's radius for hard edge alignment.

---

## Source file: `shadows.md`

# Shadows

> **Zero box-shadows is the default policy.** Surface depth is achieved entirely through background color contrast — ivory (#FAF9F5) vs slate-dark (#141413) vs warm-card (#E3DACC) — with hard-edged transitions and no blurring. This flat-but-high-contrast approach reads as print design transferred to screen: depth through ink density, not light simulation.

| Token | CSS value | Purpose |
|---|---|---|
| shadow-none | `none` | Default for all components — buttons, cards, inputs, panels, sections |
| shadow-hairline | `inset 0 -1px 0 0 var(--border-default-subtle)` | Optional: 1px inset hairline divider for sticky nav scrolled state. NOT a drop shadow. |
| shadow-overlay | `0 4px 12px rgb(20 20 19 / 0.08)` | **Reserved exclusively** for transient floating overlays (popovers, dropdown menus, tooltip cards, modal backdrops fading in). Never on static surfaces. |
| shadow-modal | `0 8px 24px rgb(20 20 19 / 0.12)` | Reserved exclusively for modal dialog containers when they need lift over a backdrop. |

## Component Mapping

| Component type | Token |
|---|---|
| Buttons (all variants) | shadow-none |
| Cards (light release cards) | shadow-none — surface contrast vs page base is the only differentiator |
| Cards (dark editorial feature cards) | shadow-none — sit flush in their grid with no lift |
| Inputs / textareas / selects | shadow-none — borders carry separation |
| Badges / tags / metadata labels | shadow-none |
| Sticky top navigation (default) | shadow-none |
| Sticky top navigation (scrolled state) | shadow-hairline (1px inset bottom border, not a drop shadow) |
| Popovers / floating dropdowns / tooltip surfaces | shadow-overlay |
| Modal containers | shadow-modal |

## Rules

- **No shadows on cards.** Card surfaces are differentiated from the page base solely by background color contrast. The same applies to panels, sections, hero blocks, and any large UI surface.
- **No shadows on buttons.** Borders and solid fills do all the depth work.
- **No shadows on inputs.** Border thickness on focus (1px → 2px or border color shift) signals state.
- **No drop shadows under headlines, images, or icons.** The aesthetic is flat, editorial, ink-on-paper.
- **No glow halos.** Focus rings use border color shifts or a 2px solid focus ring in `border-brand` — never a soft glow.
- **No layered or stacked shadows.** Never combine shadow tokens.
- **Drop shadows are permitted only on floating, transient overlays** (popovers, modals) — and even there, the shadow must be subtle, neutral-toned, and never blurry-blue or chromatic.
- **Never use shadow as the primary separator** between two adjacent layout regions — use surface color alternation or 1px borders instead.
- **No inner shadows for "depressed" or "skeumorphic" effects** — surfaces are flat.

---

## Source file: `sidebars.md`

# Sidebars

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`, `badges.md`, `alerts.md`

Sidebars in this system are flat, ink-bordered, and quietly editorial. They use the warm ivory family — never a darker chrome fill — and rely on 1px hairlines for separation.

## Core Specs

- Background: `surface-page-base` (ivory, #FAF9F5) — same surface as the main page (sidebars don't visually "lift")
- Right border: 1px solid `border-default-subtle` (left-sidebar); left border for right-sidebar
- Width: 264px (default) — generous breathing room for editorial-feel nav
- Min-width: 240px on tablet
- Shadow: none

## Anatomy

### Outer Container
Hidden on mobile (<768px), visible on tablet+. Needs a toggle / trigger for mobile (hamburger button in the top-nav).

### Inner Wrapper
- Full height, vertical scroll overflow
- Padding: 16px horizontal, 24px vertical

### Sidebar Header / Wordmark
- Padding: 8px horizontal, 16px vertical
- Wordmark: Anthropic Sans 16px, weight 700, `heading` color
- Optional eyebrow: Anthropic Mono 12px uppercase, +0.04em tracking, `body-muted`

### Navigation Section Title
- Anthropic Mono 12px, weight 400, **uppercase**, +0.04em tracking, `body-muted`
- Top margin: 16px, bottom margin: 8px
- Padding: 0 8px

### Navigation List
- Vertical spacing: 4px between items
- Font: Anthropic Sans 15px, weight 400 (inactive), 500 (active)

### Navigation Item
- Layout: flex, vertically centered
- Padding: 10px horizontal, 8px vertical
- Text: `body` color (inactive), `heading` (active)
- Radius: 0px (base)
- Border: 0
- Hover: `surface-elevated` (#F0EEE6) background
- Transition: 120–200ms ease-out on `background-color` and `color` only
- Icon: 16x16px (default) or 20x20px (large), 1.5px linear stroke, `body-subtle` (inactive), `heading` (hover/active)
- Label: 12px left margin from icon
- Trailing badge / count: see `badges.md` (right-aligned)

### Active Item
- Background: `surface-elevated` or `surface-warm-card` (one step warmer than the sidebar surface)
- Text: `heading` color
- Optional 1px left bar in `border-brand` (slate-dark, 2px wide, full item height) — the editorial mark for "this is where you are"
- No chromatic accent fill, no glow

### Separator
- 16px top padding, 16px top margin
- Top border: 1px solid `border-default-subtle`
- 8px vertical spacing below

### Multi-level / Nested Items
- Child indent: 28px left padding
- Same hover / active treatment as top-level items
- Disclosure chevron: 12x12px, 0deg (collapsed) → 90deg (expanded), 150ms ease-out transform on the chevron only

### Bottom CTA / Card
- Padding: 16px
- Top margin: 24px
- Radius: 24px (matches the system's unified card radius)
- Background: `surface-warm-card` (#E3DACC) — warm tonal step from the page base
- Can also use any alert variant from `alerts.md`
- Heading: Anthropic Sans 15px weight 600 `heading`
- Body: Anthropic Sans 14px `body`
- CTA: Arrow Text Link pattern from `buttons.md`

## Collapsed / Mini Sidebar

- Width: 64px
- Items show icon only (20x20px, centered)
- Tooltip on hover (see `tooltips-popovers.md`)
- Wordmark collapses to a square mark
- All other rules unchanged

## Right-side / Detail Sidebar

- Same specs but mirrored — left border instead of right border
- Often used for table-of-contents, in-page navigation: link items use `body` color with 2px left `border-default-subtle` rule that becomes `border-brand` on the active item

## Rules

- **Background matches the page surface** (`surface-page-base`) so the sidebar feels like a continuation of the canvas, not a separate panel.
- **0px radius on nav items.** No soft-cornered nav rows.
- **Active state uses warm tonal step + 2px slate-dark left bar**, never chromatic accent backgrounds.
- **No drop shadows** on the sidebar or its items.
- **Icons are 1.5px linear strokes**, monochromatic, inheriting text color.
- **No transform on hover.** Background-color + color shift only.
- **Multi-level menus indent with 28px** (one base unit cluster), not 44px.
- **Spacing follows the 4 / 8 / 16 / 24 / 32 rhythm.**
- **Only neutral / brand / status / clay tokens** — clay used sparingly (max one accent indicator across the entire sidebar).
- Responsive: hidden on mobile with a hamburger toggle in the top-nav.

---

## Source file: `tables.md`

# Tables

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `typography.md`

Tables are flat ledger surfaces — ink-on-paper, with hairline rules separating rows. The aesthetic borrows from broadsheet data tables: typographic rhythm carries the structure, not chromatic alternation.

## Wrapper

- Horizontal scroll overflow on small viewports
- Background: `surface-page-base` (ivory)
- Radius: 0px (base) — sharp corners on the wrapper
- Border: 1px solid `border-brand` (slate-dark) — primary ledger frame
- Shadow: none

## Table Element

- Full width, left-aligned text (right-aligned for RTL)
- Font: Anthropic Sans 15px, weight 400, `body` color
- Border-collapse: collapse
- Letter-spacing: -0.002em

## Table Head

- Font: Anthropic Sans 14px or Anthropic Mono 14px, weight 500, **uppercase**, letter-spacing +0.04em
- Color: `body-muted` for Mono header style, `heading` for Sans header style
- Background: `surface-elevated` (#F0EEE6)
- Bottom border: 1px solid `border-brand` (the broadsheet rule under the header)
- Cell padding: 16px horizontal, 12px vertical
- Sortable header arrow: 12x12px chevron in `body-muted`, hover `heading`

## Table Body

- Row background: `surface-page-base` (no zebra striping by default — the system favors hairline-only rules)
- Row bottom border: 1px solid `border-light-subtle` (omit on last row to avoid doubling with wrapper border)
- Row hover (optional): `surface-elevated` background, no transform, no shadow
- Row header (`<th scope="row">`): Anthropic Sans 15px, weight 600, `heading` color, no-wrap
- Cell padding: 16px horizontal, 14px vertical
- Cell vertical alignment: top for multi-line content, center for single-line

## Numeric / Tabular Data

- Use Anthropic Mono 14–15px for numerals, especially in financial / metric columns
- Right-align numeric columns
- `font-variant-numeric: tabular-nums` for column alignment

## Caption

- Anthropic Sans 14px, weight 400, `body-subtle` color
- Position: above the table (caption-side: top)
- Padding: 12px 0
- Used for context (e.g. "Showing 1–10 of 248")

## Sticky Header

When the table scrolls vertically:
- `<thead>` becomes `position: sticky; top: 0`
- Add a 1px bottom border `border-brand` so the rule stays visible while scrolling
- No drop shadow under the sticky header — the ink line is sufficient

## Empty State

- Caption row spanning full width
- Content: 32px vertical padding, centered Anthropic Sans 15px `body-subtle` text
- Optional small icon (24x24px linear, `body-muted`) above the message

## Compact / Dense Variant

- Reduce row padding to 8px horizontal, 8px vertical
- Font size: 14px
- Use only for data-dense interfaces (admin grids, log tables)

## Rules

- **Wrapper has horizontal scroll overflow** for responsive scrolling on small viewports.
- **Headers are uppercase Anthropic Mono** (data-classification feel) OR sentence-case Anthropic Sans 600 — pick one and apply consistently across the page.
- **No zebra striping by default.** Row separation is a hairline `border-light-subtle` only.
- **Last row omits the bottom border** to avoid doubling with the wrapper border.
- **Row headers always carry `scope="row"`** for semantic accessibility.
- **No drop shadows.** Sticky headers use the ink-line ruler, not a shadow.
- **No chromatic backgrounds for status cells.** Use Anthropic Mono uppercase tags or status badges (see `badges.md`) for state communication inside cells.
- **No arbitrary hex codes** — always reference tokens.

---

## Source file: `tabs.md`

# Tabs

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `typography.md`

Tabs are flat, ink-bordered, sharp-cornered. Active state is communicated through ink-line emphasis (a thicker bottom border or a slate-dark fill), never through chromatic accents or glow.

## Core Specs

- **Typography:** Anthropic Sans 15px, weight 500 (active), 400 (inactive), `body` color
- **Transitions:** 120–200ms ease-out on `color`, `background-color`, `border-color` only — never on transform

## Variants

### 1. Underline (Default — the editorial pattern)

**Wrapper:** bottom border 1px solid `border-default-subtle`

**Tab Item:**
- Padding: 16px horizontal, 14px vertical
- Bottom border: 2px solid transparent (reserves space so active state doesn't shift layout)
- Top corners: 0px radius
- Transition: 150ms ease-out on `color` and `border-color`

| State | Appearance |
|---|---|
| Active | `heading` text, 2px solid `border-brand` bottom border (slate-dark) |
| Inactive | `body` text, transparent bottom border; hover → `heading` text, 2px `border-default-strong` bottom border |
| Disabled | `fg-disabled` text, not-allowed cursor, transparent bottom border |
| Focus | 2px solid offset focus ring in `border-brand` — does NOT replace the bottom-border indicator |

### 2. Pills (sharp-cornered, not actually pill-shaped)

Note: "Pills" is the convention name; in this system the pill radius is **0px** (sharp). The variant exists for a contained, button-like tab cluster, not a fully-rounded shape.

**Tab Item:**
- Padding: 16px horizontal, 10px vertical
- Radius: 0px (base)
- Font weight: 500 (active), 400 (inactive)
- Transition: 150ms ease-out

| State | Appearance |
|---|---|
| Active | `brand` background (slate-dark), `surface-page-base` text (ivory), no shadow |
| Inactive | transparent background, `body` text; hover → `surface-elevated` background, `heading` text |
| Disabled | `fg-disabled` text, not-allowed cursor |
| Focus | 2px solid offset focus ring in `border-brand` |

### 3. Full Width (segmented bar)

Children overlap with -1px left margin on all except first (shared ink-line border).

**Tab Item:**
- Full width, centered text
- Padding: 14px horizontal, 14px vertical
- Background: `surface-page-base` (ivory)
- Border: 1px solid `border-brand`
- Radius: 0px on every corner of every child — uniformly sharp
- Transition: 150ms ease-out on `background-color` and `color`
- Hover: `surface-elevated` background, `heading` text

| State | Appearance |
|---|---|
| Active | `brand` background, `surface-page-base` text (ivory), 1px `border-brand` |
| First item | sharp start (0px) |
| Last item | sharp end (0px) |
| Focus | 2px solid offset focus ring in `border-brand`, raised z-index |

## Tabs with Icons

- Icon size: 16x16px (default) or 20x20px (large tabs)
- Stroke: 1.5px linear, monochromatic
- Spacing: 8px right margin between icon and label
- Layout: inline-flex, vertically centered
- Icons inherit the text color of the tab state — no chromatic icon colors

## Tab Panel

- Background: transparent (or `surface-page-base` if the surrounding surface is dark)
- Padding: 24px top, 0 horizontal (panel content uses its own container padding)
- Top margin: 0 (the underline / bar carries the visual edge)

## Rules

- **0px radius** across all tab variants — no pill-rounded tabs.
- **Active state is signaled by ink-line emphasis** (slate-dark bottom border or slate-dark background), never by clay/sky/fig accent colors.
- **No drop shadows** on tab wrappers or items.
- **Focus rings are 2px solid offset** in `border-brand`, never glowing.
- **Transitions on color and border only** — never on transform or shadow.
- Don't use chromatic accents to indicate active tabs.

---

## Source file: `tooltips-popovers.md`

# Tooltips & Popovers

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `typography.md`

Tooltips and popovers are floating, transient overlays — among the few surfaces where a subtle drop shadow is permitted (`shadow-overlay`). They retain the system's flat, sharp-cornered language.

## Tooltips

Tooltips deliver short helper labels — never paragraphs, never interactive content.

### Core Specs
- Padding: 8px horizontal, 6px vertical
- Font: Anthropic Sans 13px, weight 500, letter-spacing -0.002em
- Radius: 0px (default — sharp)
- Border: 1px solid (variant-specific)
- Shadow: `shadow-overlay` (the subtle floating shadow)
- Max-width: 280px
- Transition: 150ms ease-out on opacity (0 → 1)

### Dark (Default)
- Background: `brand` (slate-dark, #141413)
- Text: `surface-page-base` (ivory)
- Border: 1px solid `border-brand`

### Light
- Background: `surface-page-base` (ivory)
- Text: `heading`
- Border: 1px solid `border-brand`

## Popovers

Popovers carry richer, multi-line content — paragraphs, links, small forms, or summary metadata. They float over content, can include interactive children, and are dismissible.

### Core Specs
- Background: `surface-page-base` (ivory)
- Border: 1px solid `border-brand`
- Radius: 0px (base)
- Shadow: `shadow-overlay`
- Max-width: 360px (default), 480px (rich variant)
- Transition: 150ms ease-out on opacity

### Header / Title
- Padding: 12px horizontal, 10px vertical
- Background: `surface-elevated` (#F0EEE6)
- Bottom border: 1px solid `border-default-subtle`
- Title font: Anthropic Sans 15px, weight 600, `heading` color
- Optional eyebrow: Anthropic Mono 12px uppercase `body-muted`, +0.04em tracking, 4px above title

### Body / Content
- Standard: 12px horizontal, 10px vertical padding; Anthropic Sans 14px, weight 400, `body` color, line-height 1.4
- Rich: 16px padding; Anthropic Sans 15px, `body`, line-height 1.5; can include lists, links, small forms

### Footer (optional)
- Padding: 12px horizontal, 10px vertical
- Top border: 1px solid `border-default-subtle`
- Layout: flex row, justify-end, 8px gap
- Action buttons follow `buttons.md` — typically a Ghost "Dismiss" + Primary action

### Close Button
- Position: top-right, 8px inset
- 24x24px Ghost button with 14x14px X glyph in `body-subtle`, hover `heading`
- 0px radius

## Arrows

- Size: 8x8px square rotated 45deg
- Background: matches the popover/tooltip background variant exactly
- Border: 1px on the two visible edges, matching the popover border color
- Position: -4px offset from the popover edge toward the trigger

## Placement & Offset

- Default offset from trigger: 8px
- Maintain a 4px viewport-edge buffer on small screens (avoid clipping)
- Reposition logic: top → bottom → right → left (preferred order) when the default placement would clip

## Rules

- **0px radius mandatory** for both tooltips and popovers — no soft corners.
- **`shadow-overlay` is permitted** because these surfaces float above the page; static surfaces still carry no shadow.
- **Dark tooltips use slate-dark fill + ivory text + slate-dark border** — never a chromatic gradient.
- **Light tooltips/popovers use ivory fill + slate-dark border** — the standard ink-line frame.
- **Arrows match the parent background color** and inherit the parent's border on visible edges.
- **No transform animations on enter/exit.** Use opacity only (150ms ease-out) — no scale-in, no slide.
- **Tooltips trigger on hover and focus** with a 200ms delay; they dismiss immediately on blur/leave.
- **Popovers trigger on click and dismiss on click outside, Escape key, or close button.**
- **Accessibility:** tooltips use `role="tooltip"`, popovers use `role="dialog"` with `aria-labelledby` pointing to the title.
- **Don't nest popovers inside popovers.** If you need that hierarchy, switch to a modal.

---

## Source file: `typography.md`

# Typography

> Dependencies: `colors.md`

## Core Rules

- **Primary font (UI / sans):** `'Anthropic Sans', 'Styrene B', 'Inter', 'DM Sans', system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` — all UI chrome: navigation, buttons, labels, badges, footer, body copy, light-surface headlines.
- **Display font (serif):** `'Anthropic Serif', 'Tiempos Headline', 'Playfair Display', 'Lora', Georgia, "Times New Roman", serif` — feature card headlines, editorial hero text, project titles. **Reserved for dark surfaces only** (slate-dark cards). Never use the serif at display scale on the ivory page base.
- **Mono font:** `'Anthropic Mono', 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace` — technical labels, metadata field labels (DATE, CATEGORY), structured data signals. Used sparingly.
- **Fonts configured at app level — never override per-component.**
- **Headings:** weight varies by level (see scale below), `heading` text color, never `clay` or accent color.
- **Body copy:** `body` text color, never use accent color for paragraphs longer than one sentence.
- **Semantic HTML:** Use `h1`–`h6` in order, never skip levels.

## Heading Scale

### Desktop

| Element | Size | Weight | Line-height | Letter-spacing | Margin-bottom | Font |
|---|---|---|---|---|---|---|
| `h1` (display, dark surfaces) | 91px | 400 (regular) | 1.1 | normal | 32px | Anthropic Serif |
| `h1` (light surfaces) | 61px | 700 (bold) | 1.1 | -0.02em (-1.22px) | 24px | Anthropic Sans |
| `h2` | 40px | 600 (semibold) | 1.15 | -0.01em | 24px | Anthropic Sans |
| `h3` | 24px | 600 (semibold) | 1.3 | -0.005em (-0.12px) | 16px | Anthropic Sans |
| `h4` | 20px | 600 (semibold) | 1.4 | normal | 12px | Anthropic Sans |
| `h5` | 18px | 600 (semibold) | 1.4 | normal | 8px | Anthropic Sans |
| `h6` | 16px | 600 (semibold) | 1.5 | normal | 8px | Anthropic Sans |

### Responsive

| Element | Tablet (≥768px) | Mobile (default) |
|---|---|---|
| `h1` (display) | 64px | 48px |
| `h1` (light) | 44px | 36px |
| `h2` | 32px | 28px |
| `h3` | 22px | 20px |
| `h4` | 18px | 18px |
| `h5` | 16px | 16px |
| `h6` | 16px | 16px |

Mobile-first: start with mobile sizes, scale up at tablet and desktop breakpoints.

Never reduce line-height below 1.05 for any heading.

## Paragraphs

### Leading Paragraph (subheading)
- Size: 18px
- Weight: 400 (regular)
- Color: body
- Line-height: 1.4
- Letter-spacing: -0.002em
- Max width: ~64 characters
- Font: Anthropic Sans

### Normal Paragraph (body)
- Size: 16px
- Weight: 400 (regular)
- Color: body
- Line-height: 1.5
- Letter-spacing: normal
- Max width: ~70 characters
- Font: Anthropic Sans

### Small Supporting Copy (body-sm)
- Size: 15px
- Weight: 400 (regular)
- Color: body-subtle
- Line-height: 1.4
- Letter-spacing: -0.002em (-0.03px)
- Use only for helper text, captions, footer secondary content, metadata values.

### Caption
- Size: 12px
- Weight: 400 (regular)
- Color: body-muted
- Line-height: 1.3
- Use for legal text, fine print, hint text.

## UI Labels

| Context | Size | Weight | Font |
|---|---|---|---|
| Button labels | 15px | 500 (medium) | Anthropic Sans |
| Nav links | 15px | 400 (regular) | Anthropic Sans |
| Wordmark / logo lockup | 16px | 700 (bold) | Anthropic Sans |
| Input labels | 14px or 15px | 500 (medium) | Anthropic Sans |
| Captions / meta values | 14px or 15px | 400 (regular) | Anthropic Sans |
| Metadata field labels (DATE, CATEGORY) | 16px | 400 (regular), uppercase, tracking +0.04em | Anthropic Mono |

Do not apply paragraph line-height (1.5) to control labels — keep labels at 1.0–1.4.

## Type Scale Tokens

| Role | Size | Line-height | Letter-spacing |
|---|---|---|---|
| caption | 12px | 1.3 | normal |
| body-sm | 15px | 1.4 | -0.002em |
| body | 16px | 1.5 | normal |
| subheading | 18px | 1.4 | -0.002em |
| heading-sm | 20px | 1.4 | normal |
| heading | 24px | 1.3 | -0.005em |
| heading-lg | 61px | 1.1 | -0.02em |
| display | 91px | 1.1 | normal |

## Links

- **Inline body links:** Same size as surrounding text, `fg-brand` color (slate-dark, the same as surrounding ink), `text-decoration: underline`, hover → underline thickens or shifts to `fg-clay-strong` color only when the link sits in body copy. Never colorize links inside headlines.
- **CTA / arrow links:** `fg-brand` color, weight 400, no underline at rest. Append a literal arrow glyph `→` directly to the text (e.g. `Read announcement →`). On hover, an underline appears. Used for "Read announcement →", "Read the story", "Model details".
- **Display headline emphasis links (the signature pattern):** Selected keywords inside large headlines (61px+) carry a thick `text-decoration: underline` with no color change and no weight change. The underline IS the emphasis — it replaces the conventional bold/color treatment. Use only on display and heading-lg scales.

## Emphasis

- **Underline as primary emphasis device.** In display headlines, mark key nouns with a thick underline only — never bold, never color, never highlight backgrounds.
- `<strong>` for high-priority emphasis in body text only — uses weight 600, same color as surrounding text.
- `<em>` for tone emphasis only, not visual hierarchy — italic, same color.
- All-caps only for short labels and metadata: uppercase, +0.04em letter-spacing, 12–16px, Anthropic Mono for data labels (DATE, CATEGORY) or Anthropic Sans 12px weight 500 for badge text.
- Never replace the underline emphasis mechanic with color emphasis on headlines.

## Surface-Aware Typography

Type behavior changes by surface:

| Surface | Headline font | Headline color | Body color |
|---|---|---|---|
| Page base (ivory) | Anthropic Sans | heading (#141413) | body |
| Light card (elevated / warm) | Anthropic Sans | heading (#141413) | body |
| Dark editorial card (slate-dark) | **Anthropic Serif at display scale (91px)** | white (#FAF9F5) | body-subtle on dark |

**Critical:** Anthropic Serif at display scale only appears on dark surfaces. Anthropic Sans handles all light-surface headlines.

## Dark Mode

Hierarchy stays identical. Only color tokens change (automatic via CSS custom properties). Size, weight, and spacing remain constant. The serif/sans surface assignment is preserved: serif still belongs to inverted dark surfaces.