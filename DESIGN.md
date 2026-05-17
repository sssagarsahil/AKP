---
name: Heritage Hearth
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#58423a'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0ea'
  outline: '#8c7168'
  outline-variant: '#e0c0b5'
  surface-tint: '#a93702'
  primary: '#7e2600'
  on-primary: '#ffffff'
  primary-container: '#a63500'
  on-primary-container: '#ffc9b7'
  inverse-primary: '#ffb59c'
  secondary: '#7d5700'
  on-secondary: '#ffffff'
  secondary-container: '#fec96f'
  on-secondary-container: '#775300'
  tertiary: '#7d2611'
  on-tertiary: '#ffffff'
  tertiary-container: '#9d3d26'
  on-tertiary-container: '#ffc8bb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#380c00'
  on-primary-fixed-variant: '#822800'
  secondary-fixed: '#ffdeaa'
  secondary-fixed-dim: '#f1be65'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5f4100'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0700'
  on-tertiary-fixed-variant: '#812913'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
  surface-cream: '#fcf9f2'
  accent-gold: '#feb71a'
  spice-red: '#be543c'
  deep-earth: '#31312c'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 12px
  base: 8px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 80px
---

## Brand & Style

Heritage Hearth is a "Modern Traditionalist" culinary brand. It bridges the gap between ancient family recipes and modern digital convenience. The brand personality is warm, communal, and deeply rooted in authenticity, specifically targeting urban families seeking the nostalgic flavors of home.

The design style is **Corporate / Modern** with a **Tactile** twist. It uses a clean, systematic layout inspired by Material Design 3 but softens the technical edge with high-quality food photography and a warm, spice-inspired color palette. The aesthetic emphasizes "freshness" and "craft" through generous whitespace, elegant serif headers, and subtle tonal layering.

## Colors

The palette is driven by the colors of Maharashtrian spices: turmeric, chili, and saffron. 

- **Primary (#a63500):** A deep burnt orange used for brand identity and primary actions.
- **Secondary (#7d5700):** A golden ochre used for accents and highlighting "special" categories.
- **Surface Cream (#fcf9f2):** The primary background color, providing a softer, more organic feel than pure white.
- **Spice Red (#be543c):** Used for tertiary highlights and status badges.

The color system utilizes tonal containers (e.g., `primary-container` and `secondary-container`) to create hierarchical distinction without relying on high-contrast black and white.

## Typography

The system uses a pairing of **Noto Serif** for headlines and **Plus Jakarta Sans** for interface and body elements.

- **Noto Serif** provides the "Heritage" feel. It is used for all major headers to convey quality and tradition.
- **Plus Jakarta Sans** is the modern workhorse. Its soft, rounded terminals make the interface feel approachable and friendly.
- **Visual Hierarchy:** Use `headline-xl` sparingly for hero sections. `headline-md` should be the default for card titles and section headers. All labels for interaction (buttons, navigation) use the SemiBold or Bold weight of the label roles.

## Layout & Spacing

The system follows a **Fluid Grid** approach with defined safe margins.

- **Mobile:** 16px side margins. Content typically stacks in a single column or uses horizontal scrolling for categories and special items.
- **Desktop:** 80px side margins. Utilizes a 12-column grid. Bento-style layouts are encouraged for storytelling sections (e.g., Heritage sections), spanning 7 columns for text and 5 for imagery.
- **Rhythm:** An 8px base unit drives all spacing. Component internal padding should use `sm` (12px) or `md` (24px) to maintain a spacious, premium feel.

## Elevation & Depth

Visual hierarchy is primarily established through **Tonal Layers** and **Subtle Ambient Shadows**.

- **Surface Tiers:** Use `surface-container-low` for large background blocks (like the Heritage section) to create subtle recession. Use `surface-container-lowest` (White) to make cards "pop" against the cream background.
- **Shadows:** Use `shadow-sm` for standard cards to provide a lift of 2dp. Use `shadow-lg` only for floating elements or primary buttons on hover to indicate interactability.
- **Overlays:** The hero section uses a `background` to `transparent` gradient overlay to ensure text legibility over diverse food photography.

## Shapes

The shape language is **Rounded**, echoing the organic nature of food.

- **Primary Containers:** Cards and major sections use `rounded-xl` (1.5rem / 24px) to feel soft and modern.
- **Secondary Elements:** Buttons and small badges use `rounded-lg` (1rem / 16px).
- **Circular Elements:** Avatars and category icons are always `rounded-full` to provide a friendly, rhythmic counterpoint to the structured card layout.

## Components

- **Buttons:** Primary buttons use the primary color with `on-primary` text, no border. Secondary buttons use a `tertiary` border (2px) and `tertiary` text. All buttons have a height of 56px (h-14) for mobile accessibility.
- **Cards:** Product cards must include an image container with an aspect ratio of 16:9 or 4:3, followed by a padded content area. Use a thin `outline-variant` border to define the edge on light surfaces.
- **Chips/Badges:** Use `secondary-container` backgrounds for status badges (e.g., "Best Seller"). Text should be `on-secondary-container`.
- **Bottom Navigation:** Fixed at 80px height. Active states are indicated by a `secondary-container` pill shape behind the icon, ensuring high visibility for the current location.
- **Horizontal Scroll:** Used for "Explore" and "Specials" to allow for density without vertical clutter. Provide a slight offset so the next card is partially visible, signaling more content.