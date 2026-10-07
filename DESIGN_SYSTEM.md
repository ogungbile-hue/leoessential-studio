# Leoessential Studio & Academy — Design System

## 1. Visual Identity & Brand Philosophy

Leoessential communicates **quiet luxury, architectural restraint, and clinical integrity**. As an exclusive lash extension studio and academy, the visual identity eschews garish salon cliches and busy commercial clutter in favor of:
- **Lash Architectural Precision:** Clean macro photography capturing surgical 1:1 lash isolation, textured wispy peaks, and weightless volume fans. (Nail imagery, manicures, and unrelated salon visuals are strictly excluded).
- **Ample Whitespace & Breathable Margins:** Editorial pacing inspired by high-fashion lookbooks and architectural monographs.
- **Tactile Neutral Palette:** Warm stone, fine linen, and alabaster tones with subtle bronze accents.
- **High-Contrast Editorial Typography:** Cormorant Garamond paired with geometric sans-serif for technical clarity.

---

## 2. Color Palette & Semantic Tokens

### Canvas & Surfaces (Warm Linen & Alabaster)
| Token Name | Hex Value | Semantic Purpose |
|---|---|---|
| `surface-canvas` | `#FAF8F5` | Primary page backdrop, light, calm, breathable |
| `surface-subtle` | `#F5F0E8` | Secondary container surface, table headers |
| `surface-sand` | `#EFE9DF` | Accent panels, quote blocks, and frame borders |
| `surface-card` | `#FFFFFF` | High-contrast elevated cards and modal surfaces |

### Contours & Text (Deep Obsidian Stone)
| Token Name | Hex Value | Semantic Purpose |
|---|---|---|
| `text-primary` | `#1C1917` | Dominant editorial headings, wordmarks, body primary |
| `text-secondary` | `#44403C` | Supporting descriptions, sub-headings |
| `text-muted` | `#7A7267` | Durations, metadata kickers, timestamps, borders |
| `text-subtle` | `#A8A29E` | Micro captions, inactive tab text |

### Luxury Accent (Camel Bronze & Gold)
| Token Name | Hex Value | Semantic Purpose |
|---|---|---|
| `accent-primary` | `#C49A70` | Primary brand accent, primary CTA buttons, badges |
| `accent-hover` | `#B0855C` | Interactive hover state for primary CTAs |
| `accent-subtle` | `rgba(196, 154, 112, 0.15)` | Selection highlights, badge backgrounds |
| `accent-border` | `rgba(196, 154, 112, 0.35)` | Luxury card borders and decorative frames |

### Glassmorphism & Frosted Layers
| Class Name | Treatment | Usage |
|---|---|---|
| `.glass-nav-top` | `rgba(28, 25, 23, 0.32)` + `blur(20px)` + `border-white/12` | Fixed navbar floating over cinematic hero carousel |
| `.glass-nav-scrolled` | `rgba(250, 248, 245, 0.88)` + `blur(20px)` + `border-[#1C1917]/8` | Fixed navbar during page scroll |
| `.glass` | `rgba(255, 255, 255, 0.12)` + `blur(14px)` + `border-white/20` | Floating segmented pill CTA inside hero |

---

## 3. Typography Scale & Font Pairings

### Font Families
1. **Editorial Serif:** `'Cormorant Garamond', Georgia, serif`
   - *Roles:* Display titles, Section headers (`h1`, `h2`, `h3`), Brand wordmark, blockquotes.
   - *Traits:* Light tracking, delicate ascenders, elegant italic accents.
2. **Technical Sans-Serif:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
   - *Roles:* Body copy, form controls, navigation links, feature lists, micro-kickers.
   - *Traits:* High legibility at small sizes, generous x-height, geometric precision.
3. **Tabular Numerals:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
   - *Roles:* Prices, durations, appointment timestamps, phone numbers.

---

## 4. Imagery Guidelines & Art Direction

- **Focus:** 100% macro and editorial photography centered on natural lash lines, handcrafted Russian volume fans, 1:1 precision isolation, fine Japanese steel tweezers, and the tranquil studio sanctuary.
- **Strict Exclusion:** **No nail imagery, polish bottles, manicures, or unrelated aesthetic treatments.**
- **Lighting:** Soft natural daylight or diffused ring illumination highlighting individual hair fiber separation and ocular hygiene.
- **Transitions:** Fluid 1.5s Ken Burns crossfades with Motion `AnimatePresence`.

---

## 5. Spacing, Layout & Responsive Grid

- **Base Spacing:** 8-point spatial system (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Container Max-Width:** `80rem (1280px)` with responsive gutters (`px-4 sm:px-6 lg:px-8`).
- **Responsive Breakpoints:**
  - `sm`: 640px (Mobile landscape & large phones)
  - `md`: 768px (Tablets & small screens)
  - `lg`: 1024px (Desktop layout & expanded navigation)
  - `xl`: 1280px (Standard desktop container max width)

---

## 6. Accessibility & Compliance (WCAG 2.1 AA)

1. **Color Contrast:**
   - Obsidian text (`#1C1917`) on warm linen (`#FAF8F5`) satisfies the 7:1 enhanced contrast requirement.
   - Accent button text (`#FFFFFF` on `#C49A70`) satisfies the 4.5:1 minimum threshold.
2. **Motion Preference:**
   - Respects `prefers-reduced-motion: reduce` by replacing kinetic scale/zoom animations with gentle opacity crossfades.
3. **Mobile Touch Targets:**
   - Minimum tap target of `44px x 44px` on all interactive links, icons, and buttons.
   - Fixed mobile booking bar with safe area padding.
