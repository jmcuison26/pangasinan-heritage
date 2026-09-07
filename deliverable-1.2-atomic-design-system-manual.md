# Deliverable 1.2: Atomic Design System Manual
## Pangasinan Heritage Digital Showcase — Alaminos' Hundred Islands
### Framework: Vue 3 + Nuxt.js 3 | Methodology: Brad Frost's Atomic Design

---

## Overview

This design system follows **Brad Frost's Atomic Design methodology**, which organizes UI components into five hierarchical levels:
**Atoms → Molecules → Organisms → Templates → Pages**

This manual covers three levels: **Atoms**, **Molecules**, and **Organisms**, totaling **10 components** built specifically for the Alaminos' Hundred Islands heritage showcase platform.

---

## LEVEL 1: ATOMS

Atoms are the smallest, indivisible UI building blocks. They cannot be broken down further without losing their function. All other components are composed from atoms.

---

### ATOM 1 — BaseButton

**File:** `components/atoms/BaseButton.vue`

#### 1. Visual Preview
```
[ Primary ]     [ Secondary ]     [ Ghost ]
[  Small  ]     [  Medium  ]      [ Large ]
```
- **Primary:** Solid teal background, white text, rounded-full
- **Secondary:** White background, teal border and text
- **Ghost:** Transparent background, teal text, hover fill

#### 2. Usage Context
Used for all interactive call-to-action elements across the platform. Primary is used for the main action on a page (e.g., "Explore Now", "Plan Your Visit"). Secondary is used for supporting actions (e.g., "Learn More" on cards). Ghost is used for low-priority or utility actions (e.g., "Clear Search").

#### 3. Responsive Logic
| Breakpoint | Behavior |
|---|---|
| Mobile (`< sm`) | Full width when inside nav mobile menu; normal inline otherwise |
| Tablet (`sm+`) | Inline-flex, auto width |
| All sizes | Touch target minimum 44x44px (WCAG 2.5.5) |

The `size` prop controls padding and font size: `sm` for compact areas (cards, nav), `md` for standard CTAs, `lg` for hero sections.

#### 4. Code Reference
```vue
<!-- Primary CTA -->
<BaseButton variant="primary" size="lg">Explore Now</BaseButton>

<!-- Secondary action on a card -->
<BaseButton variant="secondary" size="sm" href="/islands/governor">
  Learn More
</BaseButton>

<!-- Ghost utility action -->
<BaseButton variant="ghost" size="sm" @click="clearSearch">
  Clear Search
</BaseButton>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding and font size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `href` | `string` | `undefined` | Renders as `<a>` when provided |

---

### ATOM 2 — BaseTypography

**File:** `components/atoms/BaseTypography.vue`

#### 1. Visual Preview
```
H1 — 4xl/6xl bold, tight tracking       (Hero headings)
H2 — 3xl/4xl bold                        (Section titles)
H3 — 2xl semibold                         (Card titles)
H4 — xl semibold                          (Sub-headings)
Body — base, relaxed line height           (Paragraphs)
Caption — sm, relaxed                      (Supporting text)
OVERLINE — xs, uppercase, wide tracking   (Labels/categories)
```

#### 2. Usage Context
Enforces typographic consistency across all pages. Used wherever text appears — headings in the Hero section, body copy in About, overlines above section titles, and captions on image descriptions. Centralizing typography as an atom prevents ad-hoc Tailwind class inconsistencies across the codebase.

#### 3. Responsive Logic
| Variant | Mobile | Tablet/Desktop |
|---|---|---|
| `h1` | `text-4xl` | `md:text-6xl` |
| `h2` | `text-3xl` | `md:text-4xl` |
| All others | Fixed size — no breakpoint change needed |

Colors: `default` (gray-800), `muted` (gray-500), `primary` (teal-600), `white`.

#### 4. Code Reference
```vue
<!-- Section label above a heading -->
<BaseTypography variant="overline" color="primary">Discover the Islands</BaseTypography>

<!-- Main page heading -->
<BaseTypography variant="h1" color="white">Alaminos' Hundred Islands</BaseTypography>

<!-- Body paragraph -->
<BaseTypography variant="body" color="muted">
  124 islands and islets in the Lingayen Gulf.
</BaseTypography>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'h1'–'h4' \| 'body' \| 'caption' \| 'overline'` | `'body'` | Typography scale |
| `color` | `'default' \| 'muted' \| 'primary' \| 'white'` | `'default'` | Text color token |
| `bold` | `boolean` | `false` | Extra bold override |
| `italic` | `boolean` | `false` | Italic override |
| `tag` | `string` | Auto-mapped | Override HTML tag |

---

### ATOM 3 — ColorToken

**File:** `components/atoms/ColorToken.vue`

#### 1. Visual Preview
```
[ Teal 600  ]  [ Teal 100  ]  [ Gray 800  ]  [ Gray 50   ]  [ White     ]
  #0d9488        #ccfbf1        #1f2937        #f9fafb        #ffffff
  Primary        Light BG       Text Dark      Page BG        Surface
```

#### 2. Usage Context
Used exclusively inside the Design System documentation/showcase page to display the platform's color palette. Not used in production pages — it is a documentation-only component that communicates design tokens visually.

#### 3. Responsive Logic
Displayed in a `flex-wrap` row that wraps gracefully on small screens. Swatch size is fixed at `w-16 h-16` — large enough for recognition on mobile without wasting space.

#### 4. Code Reference
```vue
<div class="flex flex-wrap gap-6">
  <ColorToken name="Primary" hex="#0d9488" bgClass="bg-teal-600" />
  <ColorToken name="Light BG" hex="#ccfbf1" bgClass="bg-teal-100" />
  <ColorToken name="Text Dark" hex="#1f2937" bgClass="bg-gray-800" />
  <ColorToken name="Page BG" hex="#f9fafb" bgClass="bg-gray-50" />
  <ColorToken name="White" hex="#ffffff" bgClass="bg-white" />
</div>
```

**Props:**
| Prop | Type | Description |
|---|---|---|
| `name` | `string` | Token name label |
| `hex` | `string` | Hex value shown below swatch |
| `bgClass` | `string` | Tailwind background class for the swatch |

---

### ATOM 4 — BaseIcon

**File:** `components/atoms/BaseIcon.vue`

#### 1. Visual Preview
```
🏝️  (sm)    🏝️  (md)    🏝️  (lg)    🏝️  (xl)
text-sm    text-xl    text-3xl   text-5xl
```

#### 2. Usage Context
Used anywhere a visual icon is needed without importing an icon library (keeping bundle size minimal for 3G/4G users). Emoji-based icons are universally supported across platforms. Used in navigation items, visit info cards, and the empty state of the Heritage Grid.

#### 3. Responsive Logic
Size is controlled entirely via the `size` prop (`sm`, `md`, `lg`, `xl`). No breakpoint-based size changes — the parent component controls sizing context.

Accessibility: when `label` prop is provided, `role="img"` and `aria-label` are set. When decorative (no label), `aria-hidden="true"` is applied automatically.

#### 4. Code Reference
```vue
<!-- Decorative icon in a card -->
<BaseIcon emoji="🏝️" size="lg" aria-hidden="true" />

<!-- Accessible standalone icon -->
<BaseIcon emoji="📍" size="md" label="Location" />

<!-- Small icon inside a button -->
<BaseIcon emoji="🔍" size="sm" aria-hidden="true" />
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `emoji` | `string` | — | The emoji character to display |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls text size |
| `label` | `string` | `undefined` | Accessible label (sets aria-label) |

---

### ATOM 5 — BaseImage

**File:** `components/atoms/BaseImage.vue`

#### 1. Visual Preview
```
┌─────────────────────┐
│                     │  ← rounded-xl (default)
│     Island Photo    │  ← object-cover, full width
│                     │
└─────────────────────┘
  Optional caption text here
```

#### 2. Usage Context
Used for all content images across the platform — island photos in cards, hero backgrounds (as `<img>` tag alternative), and gallery images. Centralizes lazy loading, alt text enforcement, and rounded corner styling.

#### 3. Responsive Logic
- `w-full h-full object-cover` — fills any container while maintaining aspect ratio
- Parent container controls the dimensions (e.g., `h-48` in HeritageCard)
- `loading="lazy"` by default for below-fold images; set `lazy=false` for above-fold (hero) images
- `rounded` prop controls corner radius for different contexts (cards vs. full-bleed)

#### 4. Code Reference
```vue
<!-- Lazy-loaded card image -->
<BaseImage
  src="/images/governor-island.jpg"
  alt="Governor Island with white sand beach"
  :width="400"
  :height="192"
  rounded="lg"
/>

<!-- Eager hero image (above the fold) -->
<BaseImage
  src="/images/hero.jpg"
  alt="Aerial view of Hundred Islands National Park"
  :lazy="false"
  rounded="none"
/>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Required alt text |
| `width` | `number` | — | Intrinsic width (prevents layout shift) |
| `height` | `number` | — | Intrinsic height |
| `caption` | `string` | — | Optional figure caption |
| `rounded` | `'none'–'full'` | `'md'` | Border radius |
| `lazy` | `boolean` | `true` | Enables lazy loading |

---

## LEVEL 2: MOLECULES

Molecules are groups of atoms that form a simple, functional UI unit with a single purpose.

---

### MOLECULE 1 — HeritageCard

**File:** `components/molecules/HeritageCard.vue`

#### 1. Visual Preview
```
┌────────────────────────┐
│  [Island Image / Emoji]│  ← h-48, object-cover
│        [Badge]         │  ← optional top-left badge
├────────────────────────┤
│ OVERLINE CATEGORY      │  ← BaseTypography overline
│ Island Title           │  ← BaseTypography h4
│ Short description text │  ← BaseTypography caption, 2 lines
│ [ Learn More ]         │  ← BaseButton secondary sm
└────────────────────────┘
```

**Atoms used:** BaseTypography, BaseButton

#### 2. Usage Context
The HeritageCard is used exclusively for displaying individual island or heritage site previews inside the HeritageGrid organism. Each card represents one island (e.g., Governor Island, Children's Island) with a preview image, category label, title, description, and a link to its detail page.

#### 3. Responsive Logic
| Breakpoint | Behavior |
|---|---|
| Mobile | Full width, single column (controlled by HeritageGrid parent) |
| Tablet (`sm`) | 2 columns |
| Desktop (`lg`) | 3 columns |

The card itself is always full width within its grid cell. Image height is fixed at `h-48` across all breakpoints for visual consistency. Text is clamped to 2 lines via `line-clamp-2` to maintain uniform card heights.

#### 4. Code Reference
```vue
<HeritageCard
  title="Governor Island"
  description="The largest and most developed island with cottages, a swimming pool, and picnic areas."
  category="Featured Island"
  fallback-emoji="🏝️"
  badge="Most Popular"
  link="/islands/governor"
/>

<!-- With an actual image -->
<HeritageCard
  title="Quezon Island"
  description="Perfect for camping and snorkeling adventures."
  category="Adventure Island"
  image="/images/quezon-island.jpg"
  link="/islands/quezon"
/>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Island name |
| `description` | `string` | — | Short description |
| `category` | `string` | — | Overline label |
| `image` | `string` | — | Image URL (optional) |
| `fallbackEmoji` | `string` | `'🏝️'` | Shown when no image |
| `badge` | `string` | — | Optional badge text |
| `link` | `string` | `'#'` | URL for Learn More |

---

### MOLECULE 2 — SearchForm

**File:** `components/molecules/SearchForm.vue`

#### 1. Visual Preview
```
Mobile:
┌─────────────────────────────────────┐
│  🔍 Search heritage sites...        │
└─────────────────────────────────────┘
           [ 🔍 Search ]

Tablet/Desktop:
┌───────────────────────────┐ [ 🔍 Search ]
│  Search heritage sites... │
└───────────────────────────┘
```

**Atoms used:** BaseButton, BaseIcon

#### 2. Usage Context
The SearchForm is used at the top of the HeritageGrid organism to allow users to filter heritage sites by name or description. On submit, it emits a `search` event with the query string, which the HeritageGrid uses to filter its items reactively. It is not used as a global site search — only for in-grid filtering.

#### 3. Responsive Logic
| Breakpoint | Layout |
|---|---|
| Mobile (`< sm`) | Stacked: input full-width, button below it |
| Tablet+ (`sm+`) | Side by side: input flex-1, button inline |

Input is always full-width on mobile for easy typing on touchscreens. The `sr-only` label ensures screen readers can identify the input field even though no visible label is shown.

#### 4. Code Reference
```vue
<!-- Inside a parent component -->
<SearchForm
  placeholder="Search islands..."
  aria-label="Search Hundred Islands"
  @search="handleSearch"
/>

<script setup>
function handleSearch(query: string) {
  // filter your items list using the query
  filteredItems.value = allItems.filter(i =>
    i.title.toLowerCase().includes(query.toLowerCase())
  )
}
</script>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Search heritage sites...'` | Input placeholder |
| `ariaLabel` | `string` | `'Search heritage sites'` | ARIA label for the form |

**Emits:**
| Event | Payload | Description |
|---|---|---|
| `search` | `string` | Fired on form submit with trimmed query |

---

### MOLECULE 3 — NavigationItem

**File:** `components/molecules/NavigationItem.vue`

#### 1. Visual Preview
```
Normal state:       🏠 Home
Active state:  [ 🏝️ Islands ]   ← teal background highlight
Hover state:        🗺️ Islands   ← gray-100 background
```

**Atoms used:** BaseIcon

#### 2. Usage Context
Used exclusively inside the HeaderNavigation organism to render individual navigation links. The component automatically detects the current route via `useRoute()` and applies an active style when the link matches the current page. Each item renders as a `<NuxtLink>` with proper `aria-current="page"` for accessibility.

#### 3. Responsive Logic
| Breakpoint | Behavior |
|---|---|
| Mobile | Stacked vertically inside the mobile drawer menu |
| Desktop (`md+`) | Horizontal inline row inside the header |

Layout is fully controlled by the parent `HeaderNavigation` organism. The NavigationItem itself is layout-agnostic — it is always a `<li>` element that fills horizontal or vertical space as needed.

#### 4. Code Reference
```vue
<!-- Inside a <ul> list -->
<ul class="flex items-center gap-1">
  <NavigationItem label="Home" to="/" icon="🏠" />
  <NavigationItem label="About" to="/about" icon="ℹ️" />
  <NavigationItem label="Islands" to="/islands" icon="🏝️" />
  <NavigationItem label="Visit" to="/visit" icon="📅" />
</ul>
```

**Props:**
| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Display text of the nav item |
| `to` | `string` | Route path (passed to NuxtLink) |
| `icon` | `string` | Optional emoji icon |

---

## LEVEL 3: ORGANISMS

Organisms are complex UI sections composed of molecules and atoms. They form distinct, self-contained sections of a page.

---

### ORGANISM 1 — HeritageGrid

**File:** `components/organisms/HeritageGrid.vue`

#### 1. Visual Preview
```
          Discover the Islands
       Heritage Island Highlights
  Explore the most iconic islands...

  [ 🔍 Search heritage sites... ] [ Search ]

┌──────────┐  ┌──────────┐  ┌──────────┐
│ Card 1   │  │ Card 2   │  │ Card 3   │
└──────────┘  └──────────┘  └──────────┘
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Card 4   │  │ Card 5   │  │ Card 6   │
└──────────┘  └──────────┘  └──────────┘

  (empty state when no results found)
  🔎 No heritage sites found for "xyz".
         [ Clear search ]
```

**Molecules used:** HeritageCard, SearchForm
**Atoms used:** BaseTypography, BaseIcon, BaseButton

#### 2. Usage Context
The HeritageGrid is used as the primary content section on the homepage and any page that lists multiple heritage sites or islands. It combines the search functionality (SearchForm) with a responsive grid of HeritageCard components. It is the main discovery interface of the platform.

#### 3. Responsive Logic
| Breakpoint | Grid Columns |
|---|---|
| Mobile (`< sm`) | 1 column |
| Tablet (`sm`) | 2 columns |
| Desktop (`lg+`) | 3 columns |

Search state is managed internally via a `searchQuery` ref. The `filteredItems` computed property reactively filters the `items` prop based on title and description. An empty state is shown when no results match. The section heading uses `useId()` for a unique `id` linked to `aria-labelledby` for screen reader section identification.

#### 4. Code Reference
```vue
<HeritageGrid
  title="Island Highlights"
  subtitle="Explore the most iconic islands within Hundred Islands National Park."
  :items="[
    {
      title: 'Governor Island',
      description: 'The largest and most developed island.',
      category: 'Featured Island',
      fallbackEmoji: '🏝️',
      badge: 'Most Popular',
      link: '/islands/governor',
    },
    {
      title: 'Quezon Island',
      description: 'Perfect for camping and snorkeling.',
      category: 'Adventure Island',
      fallbackEmoji: '⛺',
      link: '/islands/quezon',
    },
  ]"
/>
```

**Props:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Island Highlights'` | Section heading |
| `subtitle` | `string` | Default text | Section subheading |
| `items` | `HeritageItem[]` | — | Array of heritage site data |

---

### ORGANISM 2 — HeaderNavigation

**File:** `components/organisms/HeaderNavigation.vue`

#### 1. Visual Preview
```
Desktop:
┌────────────────────────────────────────────────────────────┐
│ 🏝️ Hundred Islands   Home  About  Islands  Visit   [Plan] │
└────────────────────────────────────────────────────────────┘

Mobile (closed):
┌─────────────────────────────────────┐
│ 🏝️ Hundred Islands              ☰  │
└─────────────────────────────────────┘

Mobile (open):
┌─────────────────────────────────────┐
│ 🏝️ Hundred Islands              ✕  │
├─────────────────────────────────────┤
│ 🏠 Home                             │
│ ℹ️ About                            │
│ 🗺️ Islands                         │
│ 📅 Visit                            │
│        [ Plan Your Visit ]          │
└─────────────────────────────────────┘
```

**Molecules used:** NavigationItem
**Atoms used:** BaseIcon, BaseButton

#### 2. Usage Context
The HeaderNavigation is the global site header placed at the top of every page via the Nuxt layout system (`layouts/default.vue`). It provides primary navigation, brand identity, and a call-to-action button. It is sticky (stays at the top while scrolling) with a frosted glass effect for readability over page content.

#### 3. Responsive Logic
| Breakpoint | Behavior |
|---|---|
| Mobile (`< md`) | Logo + hamburger button only; nav items hidden |
| Tablet/Desktop (`md+`) | Full horizontal nav bar with all items and CTA visible |

The hamburger toggle uses `aria-expanded` and `aria-controls` tied to the mobile menu `id` for full keyboard and screen reader accessibility. The mobile menu uses `v-show` (not `v-if`) so the DOM is always present for assistive technologies. `backdrop-blur-sm` with `bg-white/90` creates the sticky frosted glass effect.

#### 4. Code Reference
```vue
<!-- In layouts/default.vue -->
<template>
  <div>
    <HeaderNavigation />
    <main>
      <slot />
    </main>
  </div>
</template>
```

The `navItems` array inside the component controls all navigation links:
```ts
const navItems = [
  { label: 'Home',    to: '/',       icon: '🏠' },
  { label: 'About',  to: '#about',  icon: 'ℹ️' },
  { label: 'Islands', to: '#islands', icon: '🗺️' },
  { label: 'Visit',  to: '#visit',  icon: '📅' },
]
```
To add or remove navigation items, modify this array — no template changes needed.

---

## Summary Table

| Level | Component | File | Atoms Used | Molecules Used |
|---|---|---|---|---|
| Atom | BaseButton | `atoms/BaseButton.vue` | — | — |
| Atom | BaseTypography | `atoms/BaseTypography.vue` | — | — |
| Atom | ColorToken | `atoms/ColorToken.vue` | — | — |
| Atom | BaseIcon | `atoms/BaseIcon.vue` | — | — |
| Atom | BaseImage | `atoms/BaseImage.vue` | — | — |
| Molecule | HeritageCard | `molecules/HeritageCard.vue` | BaseTypography, BaseButton | — |
| Molecule | SearchForm | `molecules/SearchForm.vue` | BaseButton, BaseIcon | — |
| Molecule | NavigationItem | `molecules/NavigationItem.vue` | BaseIcon | — |
| Organism | HeritageGrid | `organisms/HeritageGrid.vue` | BaseTypography, BaseIcon, BaseButton | HeritageCard, SearchForm |
| Organism | HeaderNavigation | `organisms/HeaderNavigation.vue` | BaseIcon, BaseButton | NavigationItem |

---

*Deliverable 1.2 — Atomic Design System Manual*
*Pangasinan Provincial Tourism Office — Digital Heritage Initiative*
*Featured Heritage Site: Alaminos' Hundred Islands National Park*
