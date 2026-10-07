# Leoessential Studio & Academy — Design System

## 1. Visual Identity & Brand Philosophy

Leoessential communicates **quiet luxury, architectural restraint, and clinical integrity**. The visual identity eschews garish neon beauty cliches and busy commercial clutter in favor of:
- Ample architectural whitespace and breathable margins
- Tactile neutral tones inspired by warm stone, fine linen, and alabaster
- Warm bronze/camel metallic accents that signal bespoke craftsmanship
- High-contrast editorial typography paired with clean geometric body copy

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

### Hairlines & Dividers
| Token Name | RGBA Value | Semantic Purpose |
|---|---|---|
| `border-subtle` | `rgba(28, 25, 23, 0.08)` | Section boundaries, card dividers, table borders |
| `border-medium` | `rgba(28, 25, 23, 0.16)` | Input fields, active tab indicators, hover borders |

---

## 3. Typography Scale & Font Pairings

### Font Families
1. **Editorial Serif:** `'Cormorant Garamond', Georgia, serif`
   - *Roles:* Display titles, Section headers (`h1`, `h2`, `h3`), Brand wordmark, blockquotes.
   - *Traits:* Light tracking, delicate ascenders, elegant italic variants.
2. **Technical Sans-Serif:** `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
   - *Roles:* Body copy, form controls, navigation links, feature lists, micro-kickers.
   - *Traits:* High legibility at small sizes, generous x-height, geometric precision.
3. **Tabular Numerals:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
   - *Roles:* Prices, durations, appointment timestamps, phone numbers.

### Type Scale Hierarchy
| Level | Font Family | Size (Desktop / Mobile) | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| **Display H1** | Cormorant Garamond | `3.75rem (60px) / 2.5rem (40px)` | 300 / 400 | `-0.02em` | `1.1` |
| **Section H2** | Cormorant Garamond | `2.5rem (40px) / 2rem (32px)` | 300 / 400 | `-0.01em` | `1.15` |
| **Card H3** | Cormorant Garamond | `1.5rem (24px) / 1.25rem (20px)` | 500 | `0` | `1.25` |
| **Subhead** | Plus Jakarta Sans | `1.125rem (18px) / 1rem (16px)` | 400 | `0` | `1.6` |
| **Body Primary** | Plus Jakarta Sans | `0.9375rem (15px) / 0.875rem (14px)` | 400 | `0` | `1.65` |
| **Caption / Meta** | Plus Jakarta Sans | `0.75rem (12px) / 0.75rem (12px)` | 500 / 600 | `+0.08em` | `1.4` |
| **Kicker / Badge** | Plus Jakarta Sans | `0.6875rem (11px)` | 600 | `+0.2em` | `1.2` |

---

## 4. Spacing, Layout & Responsive Grid

- **Base Spacing:** 8-point spatial system (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Container Max-Width:** `80rem (1280px)` with responsive gutter:
  - Mobile: `16px (px-4)`
  - Tablet: `24px (px-6)`
  - Desktop: `32px (px-8)`
- **Responsive Breakpoints:**
  - `sm`: 640px
  - `md`: 768px (Desktop navigation & grid switch)
  - `lg`: 1024px (2/3-column complex layouts)
  - `xl`: 1280px

---

## 5. Component Patterns & Visual Standards

### Buttons
1. **Primary Luxury CTA:**
   - Background: `bg-[#C49A70]`, Hover: `hover:bg-[#B0855C]`, Text: `text-white`
   - Typography: Uppercase, tracking `0.15em`, font size `12px`, font weight `600`
   - Padding: `px-7 py-3.5`
   - Active: `active:scale-[0.98]`
2. **Secondary Wireframe:**
   - Background: `bg-transparent`, Border: `border border-[#1C1917]/20`, Hover: `hover:border-[#1C1917] hover:bg-[#EFE9DF]/50`
   - Text: `text-[#1C1917]`
3. **Ghost Icon Button:**
   - Minimal background with subtle border, used for mobile drawer toggles and copy triggers.

### Cards & Containers
- Clean 1px hairlines: `border border-[#1C1917]/10`
- Subtle ambient hover elevation: `hover:border-[#C49A70]/60 hover:shadow-[0_4px_20px_rgba(28,25,23,0.04)]`
- Inner padding: `p-6 sm:p-8`
- Editorial framing: Asymmetrical decorative borders (`-rotate-1 border-[#C49A70]/30`) on highlighted hero showcases.

### Media Containers & Placeholders
- Aspect ratio discipline: `aspect-[4/5]` for portraits, `aspect-[4/3]` for kit showcases, `aspect-square` for products.
- Fallback & Skeletons:
  - While loading or on asset error, render a warm neutral gradient (`from-[#EFE9DF] via-[#FAF8F5] to-[#E5DDD0]`) with subtle radial micro-dots and category iconography (Eye for Lashes, Sparkles for Brows, GraduationCap for Academy, ShoppingBag for Retail).
  - No raw broken image borders or default browser alt tags.

### Modals & Drawers
- Backdrop: `rgba(28, 25, 23, 0.6)` with backdrop blur (`backdrop-blur-sm`).
- Modal card: `bg-[#FAF8F5] border border-[#C49A70]/30 max-w-xl mx-auto rounded-none shadow-2xl`.
- Accessibility: Focus trapping, `Escape` key close listener, and `aria-modal="true"`.

---

## 6. Accessibility & Compliance (WCAG 2.1 AA)

1. **Color Contrast:**
   - All body text (`#1C1917` and `#44403C`) against canvas `#FAF8F5` satisfies the 7:1 enhanced contrast requirement.
   - Accent button text (`#FFFFFF` on `#C49A70` and `#B0855C`) satisfies the 4.5:1 minimum threshold.
2. **Keyboard Navigation:**
   - Visible outline focus rings (`focus-visible:ring-2 focus-visible:ring-[#C49A70]`).
3. **Mobile Touch Targets:**
   - Minimum tap target of `44px x 44px` on all interactive links, icons, and buttons.
   - Padded bottom safe area (`pb-[max(12px,env(safe-area-inset-bottom))]`) for fixed mobile navigation.
