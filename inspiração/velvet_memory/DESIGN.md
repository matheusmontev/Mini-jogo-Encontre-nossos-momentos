---
name: Velvet Memory
colors:
  surface: '#fff8f7'
  surface-dim: '#e7d6d6'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f0'
  surface-container: '#fceae9'
  surface-container-high: '#f6e4e4'
  surface-container-highest: '#f0dfde'
  on-surface: '#221919'
  on-surface-variant: '#504446'
  inverse-surface: '#382e2e'
  inverse-on-surface: '#feedec'
  outline: '#837376'
  outline-variant: '#d4c2c4'
  surface-tint: '#80515c'
  primary: '#80515c'
  on-primary: '#ffffff'
  primary-container: '#f4b8c4'
  on-primary-container: '#744651'
  inverse-primary: '#f3b7c3'
  secondary: '#a23c3f'
  on-secondary: '#ffffff'
  secondary-container: '#fd8181'
  on-secondary-container: '#73181f'
  tertiary: '#615e57'
  on-tertiary: '#ffffff'
  tertiary-container: '#ccc7bf'
  on-tertiary-container: '#56534c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#f3b7c3'
  on-primary-fixed: '#32101a'
  on-primary-fixed-variant: '#653a44'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b1'
  on-secondary-fixed: '#410007'
  on-secondary-fixed-variant: '#832429'
  tertiary-fixed: '#e7e2d9'
  tertiary-fixed-dim: '#cbc6bd'
  on-tertiary-fixed: '#1d1b16'
  on-tertiary-fixed-variant: '#494640'
  background: '#fff8f7'
  on-background: '#221919'
  surface-variant: '#f0dfde'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
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
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-padding: 24px
  grid-gutter: 16px
---

## Brand & Style

The design system is anchored in the concept of "A Love Letter to Memory." It is designed for an audience that values quiet reflection, sentimental connection, and a meditative gaming experience. The brand personality is tender, sophisticated, and intentionally paced, avoiding the frantic energy of typical mobile games in favor of a serene, tactile environment.

The visual style is a blend of **Soft Minimalism** and **Modern Tactility**. By utilizing heavy whitespace, a restricted palette, and subtle depth through soft shadows, the UI creates an atmosphere that feels like high-quality stationery or a curated photo album. The goal is to evoke a sense of warmth and intimacy, making every interaction feel like a gentle touch.

## Colors

The color palette of this design system is inspired by vintage florals and cream-colored parchment. It relies on a high-value, low-saturation base to ensure a "clean" feel, while using deep accents to ground the experience.

- **Primary (Petal Pink):** Used for interactive states and primary highlights. It provides a soft, welcoming energy.
- **Secondary (Rosewood):** A deep red reserved for critical accents, celebratory moments (matches), and high-level branding.
- **Tertiary (Warm Cream):** The primary background color. It is softer on the eyes than pure white, providing a sentimental, paper-like quality.
- **Neutral (Charcoal Rose):** A very dark, warm grey used for typography to maintain readability without the harshness of pure black.
- **Surface (White):** Used for card faces and elevated containers to provide crisp contrast against the cream background.

## Typography

This design system utilizes **Plus Jakarta Sans** for its entire typographic scale. This font was chosen for its modern, friendly, and open letterforms, which perfectly balance elegance with high readability during gameplay.

Headlines use a tighter letter-spacing and heavier weights to provide a modern, structural feel. Body text maintains a generous line height to ensure the interface feels airy and unhurried. Labels are often set in a slightly tracked-out uppercase style to provide clear, sophisticated signposting for game metrics like "Moves" or "Time."

## Layout & Spacing

The layout philosophy follows a **fixed-center grid** model. On mobile and desktop, the game board is contained within a central "vessel" to keep the user's focus narrow and intimate. 

The spacing rhythm is based on an 8px scale. Generous outer margins (lg or xl) are used to prevent the UI from feeling cluttered. For the memory grid itself, the "grid-gutter" remains consistent at 16px to ensure each card is perceived as an individual, precious object while maintaining a cohesive group.

## Elevation & Depth

Hierarchy in this design system is established through **Ambient Shadows** and tonal layering. 

- **Level 1 (Background):** The Warm Cream base.
- **Level 2 (Cards/Containers):** Pure White surfaces with a very soft, diffused shadow. Shadows should use a hint of the Secondary color (Rosewood) at a very low opacity (5-8%) to create a "warm glow" rather than a cold grey shadow.
- **Level 3 (Active Elements):** When a card is flipped or a button is pressed, the shadow deepens and the element may scale slightly (1.02x) to simulate a physical lift.

Transitions should be exclusively "Ease-in-Out" with durations between 300ms and 500ms to maintain the "smooth" and "romantic" requirement.

## Shapes

The shape language is consistently **Rounded**. There are no sharp corners in the design system, as they would conflict with the romantic and gentle theme. 

Standard components (Cards, Small Buttons) use a 0.5rem (8px) radius. Larger containers or decorative panels use the `rounded-xl` (24px) setting to create a soft, pill-like framing effect that feels safe and inviting.

## Components

### Memory Cards
The hero component of the system. Cards must have a "Back" and "Front" state. The back should feature a subtle, tone-on-tone geometric pattern in Petal Pink. The front is Pure White with the memory icon or image centered. They use `rounded-lg` corners and an ambient shadow.

### Buttons
- **Primary:** Pill-shaped, filled with Petal Pink, and Charcoal Rose text.
- **Ghost:** No fill, a thin (1px) Rosewood border, and Rosewood text. Used for secondary actions like "View Gallery."

### Progress Indicators
Score and time tracking should be displayed in elegant, minimalist containers. Use Rosewood for active progress bars against a Petal Pink track to maintain the romantic color story.

### Modal Dialogs
Used for "Game Over" or "Match Found" celebrations. These should utilize a soft backdrop blur (Glassmorphism) of the background cream, with a white central card.

### Chips & Stats
Small, `rounded-xl` capsules in Cream with Rosewood text, used for displaying difficulty levels or category tags.