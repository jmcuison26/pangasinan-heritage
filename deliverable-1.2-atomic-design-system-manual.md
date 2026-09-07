# Deliverable 1.2: Atomic Design System Manual
## Pangasinan Heritage Digital Showcase — Alaminos' Hundred Islands
### Methodology: Brad Frost's Atomic Design | Framework: Vue 3 + Nuxt.js 3 + Tailwind CSS

---

## Overview

This component library was built using **Brad Frost's Atomic Design methodology**, which organizes UI components into five hierarchical levels. This manual documents three levels — **Atoms**, **Molecules**, and **Organisms** — totaling **10 components** built for the Alaminos' Hundred Islands Heritage Digital Showcase.

Each component entry includes:
1. Visual Preview
2. Usage Context
3. Responsive Logic
4. Code Reference

---

# LEVEL 1: ATOMS

Atoms are the smallest, indivisible UI building blocks. They cannot be broken down further without losing their purpose.

---

## ATOM 1 — Button

**File:** `components/atoms/BaseButton.vue`

---

### 1. Visual Preview

```
[ Primary Button ]     [ Secondary Button ]     [ Ghost Button ]
  Filled teal            White + teal border      Transparent

Sizes:
[ Small ]    [ Medium ]    [ Large ]
```

- **Primary** — solid teal background, white text, used for main CTAs
- **Secondary** — white background with teal border, used for supporting actions
- **Ghost** — transparent background, teal text, used for low-priority actions

---

### 2. Usage Context

The Button atom is used for all interactive call-to-action elements across the platform. It is the foundational interactive element that every other component relies on for user actions.

- **Primary** variant is used for the hero section ("Explore Now"), navigation CTA ("Plan Your Visit"), and modal close actions.
- **Secondary** variant is used on heritage cards ("Learn More") and form submission supporting actions.
- **Ghost** variant is used for utility actions like "Clear Search" in the empty state of the Heritage Grid.

The `href` prop automatically renders the component as an `<a>` tag instead of a `<button>` when a link is needed, keeping the API consistent.

---

### 3. Responsive Logic

| Breakpoint | Behavior |
|---|---|
| Mobile (< sm) | Full width when placed inside the mobile nav drawer; inline otherwise |
| Tablet (sm+) | Inline-flex with auto width |
| All sizes | Minimum touch target of 44×44px maintained (WCAG 2.5.5) |

The `size` prop controls padding and font size across all breakpoints:
- `sm` — used in compact areas such as cards and navigation
- `md` — used for standard CTAs across the page
- `lg` — used in the hero section for maximum visual impact

No breakpoint-based size changes are applied inside the component itself — the parent context controls which size is appropriate.

---

### 4. Code Reference

```vue
<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    :disabled="disabled"
    :aria-disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

const variantClasses = computed(() => ({
  primary: 'bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-500',
  secondary: 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 focus:ring-teal-500',
  ghost: 'bg-transparent text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
}[props.variant]))

const sizeClasses = computed(() => ({
  sm: 'text-sm px-4 py-1.5',
  md: 'text-base px-6 py-2.5',
  lg: 'text-lg px-8 py-3',
}[props.size]))
</script>
```

**How to reuse:**
```vue
<!-- Primary CTA in hero -->
<BaseButton variant="primary" size="lg" href="#about">
  Explore Now
</BaseButton>

<!-- Secondary action on a card -->
<BaseButton variant="secondary" size="sm" @click="openModal">
  Learn More
</BaseButton>

<!-- Ghost utility action -->
<BaseButton variant="ghost" size="sm" @click="clearSearch">
  Clear Search
</BaseButton>
```

**Props Reference:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding and font size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `href` | `string` | `undefined` | Renders as `<a>` when provided |

---

## ATOM 2 — Typography

**File:** `components/atoms/BaseTypography.vue`

---

### 1. Visual Preview

```
H1 — text-4xl / text-6xl, font-bold, tight tracking
     Used for: Hero headings

H2 — text-3xl / text-4xl, font-bold
     Used for: Section titles (About, Island Highlights, Plan Your Visit)

H3 — text-2xl, font-semibold
     Used for: Sub-section headings

H4 — text-xl, font-semibold
     Used for: Card titles inside HeritageCard

body — text-base, leading-relaxed
     Used for: Paragraphs in About section

caption — text-sm, leading-relaxed
     Used for: Supporting text inside cards

OVERLINE — TEXT-XS, UPPERCASE, WIDE TRACKING
     Used for: Section labels above headings
```

---

### 2. Usage Context

The Typography atom enforces a consistent typographic scale across all pages and components. It prevents developers from applying ad-hoc Tailwind text classes directly to elements, which would create inconsistencies over time.

It is used in:
- **Hero section** — `h1` variant with `white` color for the main heading
- **Section labels** — `overline` variant with `primary` color above each section title
- **Section headings** — `h2` variant for "A National Treasure", "Island Highlights", "Plan Your Visit"
- **Card titles** — `h4` variant inside HeritageCard
- **Body paragraphs** — `body` variant in the About section
- **Supporting text** — `caption` variant for card descriptions

---

### 3. Responsive Logic

| Variant | Mobile | Tablet / Desktop |
|---|---|---|
| `h1` | `text-4xl` | `md:text-6xl` |
| `h2` | `text-3xl` | `md:text-4xl` |
| `h3` | `text-2xl` | No change |
| `h4` | `text-xl` | No change |
| `body` | `text-base` | No change |
| `caption` | `text-sm` | No change |
| `overline` | `text-xs` | No change |

The `tag` prop allows overriding the HTML element when semantic needs differ from visual hierarchy (e.g., rendering an `h2` style on a `<p>` element).

---

### 4. Code Reference

```vue
<template>
  <component
    :is="tag"
    :class="[typeClasses, colorClasses, { 'font-bold': bold, 'italic': italic }]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline'
type ColorVariant = 'default' | 'muted' | 'primary' | 'white'

const props = withDefaults(defineProps<{
  variant?: TypographyVariant
  color?: ColorVariant
  bold?: boolean
  italic?: boolean
  tag?: string
}>(), {
  variant: 'body',
  color: 'default',
  bold: false,
  italic: false,
})

const tag = computed(() => {
  if (props.tag) return props.tag
  const tagMap: Record<TypographyVariant, string> = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4',
    body: 'p', caption: 'span', overline: 'span',
  }
  return tagMap[props.variant]
})

const typeClasses = computed(() => ({
  h1: 'text-4xl md:text-6xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold leading-snug',
  h3: 'text-2xl font-semibold leading-snug',
  h4: 'text-xl font-semibold',
  body: 'text-base leading-relaxed',
  caption: 'text-sm leading-relaxed',
  overline: 'text-xs uppercase tracking-widest font-medium',
}[props.variant]))

const colorClasses = computed(() => ({
  default: 'text-gray-800',
  muted: 'text-gray-500',
  primary: 'text-teal-600',
  white: 'text-white',
}[props.color]))
</script>
```

**How to reuse:**
```vue
<!-- Section label above a heading -->
<BaseTypography variant="overline" color="primary">
  About the Park
</BaseTypography>

<!-- Main page heading -->
<BaseTypography variant="h1" color="white">
  Alaminos' Hundred Islands
</BaseTypography>

<!-- Body paragraph -->
<BaseTypography variant="body" color="muted">
  124 islands nestled in the Lingayen Gulf.
</BaseTypography>

<!-- Card caption -->
<BaseTypography variant="caption" color="muted">
  A shallow, calm beach ideal for families.
</BaseTypography>
```

**Props Reference:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'h1'–'h4' \| 'body' \| 'caption' \| 'overline'` | `'body'` | Typography scale |
| `color` | `'default' \| 'muted' \| 'primary' \| 'white'` | `'default'` | Text color token |
| `bold` | `boolean` | `false` | Extra bold override |
| `italic` | `boolean` | `false` | Italic override |
| `tag` | `string` | Auto-mapped | Override the HTML element |

---

## ATOM 3 — Color Tokens

**File:** `components/atoms/ColorToken.vue`

---

### 1. Visual Preview

```
[ Teal 600  ]   [ Teal 400  ]   [ Gray 950  ]   [ Gray 500  ]   [ White    ]
  #0d9488         #2dd4bf         #030712         #6b7280         #ffffff
  Primary         Accent          Page BG         Muted Text      Surface
```

The ColorToken component renders a colored swatch square with the token name and hex value displayed below it.

---

### 2. Usage Context

The ColorToken atom is used exclusively inside the Design System documentation and showcase pages to display the platform's color palette visually. It is a **documentation-only component** — it does not appear in production pages.

It communicates design tokens to developers and stakeholders, ensuring everyone references the same color values. Each token corresponds to a Tailwind CSS class used consistently throughout the project.

---

### 3. Responsive Logic

The ColorToken is displayed in a `flex-wrap` row that wraps gracefully on smaller screens. The swatch size is fixed at `w-16 h-16` — large enough to be clearly visible on mobile without taking excessive space. No breakpoint-based layout changes are needed since this is a documentation component.

---

### 4. Code Reference

```vue
<template>
  <div class="flex flex-col items-center gap-2">
    <div
      :class="['w-16 h-16 rounded-xl shadow-sm border border-gray-200', bgClass]"
      :aria-label="`Color swatch: ${name}`"
      role="img"
    />
    <div class="text-center">
      <p class="text-xs font-semibold text-gray-700">{{ name }}</p>
      <p class="text-xs text-gray-400">{{ hex }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  hex: string
  bgClass: string
}>()
</script>
```

**How to reuse:**
```vue
<!-- Display the full color palette -->
<div class="flex flex-wrap gap-6">
  <ColorToken name="Primary"   hex="#0d9488" bgClass="bg-teal-600" />
  <ColorToken name="Accent"    hex="#2dd4bf" bgClass="bg-teal-400" />
  <ColorToken name="Page BG"   hex="#030712" bgClass="bg-gray-950" />
  <ColorToken name="Muted"     hex="#6b7280" bgClass="bg-gray-500" />
  <ColorToken name="White"     hex="#ffffff" bgClass="bg-white"    />
</div>
```

**Props Reference:**

| Prop | Type | Description |
|---|---|---|
| `name` | `string` | Token label displayed below the swatch |
| `hex` | `string` | Hex color value displayed below the name |
| `bgClass` | `string` | Tailwind background class applied to the swatch |

---

## ATOM 4 — Icon

**File:** `components/atoms/BaseIcon.vue`

---

### 1. Visual Preview

```
Sizes:
🏝️  (sm — text-sm)
🏝️  (md — text-xl)     ← default
🏝️  (lg — text-3xl)
🏝️  (xl — text-5xl)
```

The Icon atom renders an emoji character with consistent sizing, semantic accessibility, and controlled display behavior.

---

### 2. Usage Context

The Icon atom is used wherever a visual icon is needed without importing an external icon library. Using emoji-based icons keeps the bundle size minimal — critical for users on 3G/4G mobile connections in rural Pangasinan.

It is used in:
- **Navigation items** — small icons beside nav labels (🏠 🗺️ 📅)
- **Visit Info cards** — medium icons for location, hours, fees (📍 🕗 🎟️)
- **Heritage Grid empty state** — large search icon (🔎)
- **Hero Carousel** — decorative island icon (🏝️)
- **Stats section** — medium icons beside stat values

---

### 3. Responsive Logic

Size is controlled entirely via the `size` prop (`sm`, `md`, `lg`, `xl`). No breakpoint-based size changes are applied inside the component — the parent component determines which size is appropriate for its context.

**Accessibility behavior:**
- When `label` prop is provided → `role="img"` and `aria-label` are applied (screen reader visible)
- When no `label` → `aria-hidden="true"` is applied automatically (decorative, hidden from screen readers)

---

### 4. Code Reference

```vue
<template>
  <span
    :class="['inline-flex items-center justify-center select-none', sizeClass]"
    :aria-label="label"
    :aria-hidden="!label"
    role="img"
  >
    {{ emoji }}
  </span>
</template>

<script setup lang="ts">
type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(defineProps<{
  emoji: string
  label?: string
  size?: IconSize
}>(), {
  size: 'md',
})

const sizeClass = computed(() => ({
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-5xl',
}[props.size]))
</script>
```

**How to reuse:**
```vue
<!-- Decorative icon (hidden from screen readers) -->
<BaseIcon emoji="🏝️" size="lg" />

<!-- Accessible standalone icon (visible to screen readers) -->
<BaseIcon emoji="📍" size="md" label="Location" />

<!-- Small icon inside a button -->
<BaseIcon emoji="🔍" size="sm" />
```

**Props Reference:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `emoji` | `string` | — | The emoji character to display |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls text size |
| `label` | `string` | `undefined` | Accessible label (sets aria-label) |

---

## ATOM 5 — Image

**File:** `components/atoms/BaseImage.vue`

---

### 1. Visual Preview

```
┌──────────────────────────┐
│                          │  ← rounded-xl (default)
│      Island Photo        │  ← object-cover, fills container
│                          │
└──────────────────────────┘
  Optional caption text here   ← text-xs, gray, centered
```

The Image atom wraps an `<img>` inside a `<figure>` with controlled rounding, lazy loading, and an optional caption.

---

### 2. Usage Context

The Image atom is used for all content images across the platform. It centralizes lazy loading behavior, enforces alt text, and standardizes border radius across different image contexts.

It is used in:
- **Heritage cards** — island thumbnail photos with `rounded="lg"` and `lazy=true`
- **Hero sections** — full-bleed background images with `rounded="none"` and `lazy=false`
- **Modal dialogs** — island detail photos with `rounded="none"`

By centralizing the image component, any future changes to image behavior (e.g., adding `fetchpriority`, `srcset`, or skeleton loaders) only need to be made in one place.

---

### 3. Responsive Logic

| Property | Behavior |
|---|---|
| Width | `w-full` — always fills the parent container |
| Height | `h-full` — fills the parent container's height |
| Fit | `object-cover` — maintains aspect ratio, crops to fill |
| Loading | `lazy` by default; set `lazy=false` for above-fold (hero) images |
| Rounding | Controlled via `rounded` prop — `none`, `sm`, `md`, `lg`, `full` |

The parent container controls the dimensions (e.g., `h-48` in HeritageCard, `h-screen` in hero). The image stretches to fill whatever space is given while maintaining `object-cover` cropping.

---

### 4. Code Reference

```vue
<template>
  <figure :class="['overflow-hidden', roundedClass]">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="lazy ? 'lazy' : 'eager'"
      :class="['w-full h-full object-cover', roundedClass]"
    />
    <figcaption v-if="caption" class="text-xs text-gray-400 mt-1 text-center">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
type RoundedVariant = 'none' | 'sm' | 'md' | 'lg' | 'full'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  rounded?: RoundedVariant
  lazy?: boolean
}>(), {
  rounded: 'md',
  lazy: true,
})

const roundedClass = computed(() => ({
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
}[props.rounded]))
</script>
```

**How to reuse:**
```vue
<!-- Lazy-loaded card image -->
<BaseImage
  src="/images/governor-island.jpeg"
  alt="Governor Island with white sand beach"
  :width="400"
  :height="192"
  rounded="lg"
/>

<!-- Eager-loaded hero image (above the fold) -->
<BaseImage
  src="/images/hero.jpg"
  alt="Aerial view of Hundred Islands"
  :lazy="false"
  rounded="none"
/>
```

**Props Reference:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Required alt text for accessibility |
| `width` | `number` | — | Intrinsic width (prevents layout shift) |
| `height` | `number` | — | Intrinsic height |
| `caption` | `string` | — | Optional figure caption |
| `rounded` | `'none'–'full'` | `'md'` | Border radius variant |
| `lazy` | `boolean` | `true` | Enables native lazy loading |

---

# LEVEL 2: MOLECULES

Molecules are groups of two or more atoms that form a simple, reusable UI unit with a single clear purpose.

---

## MOLECULE 1 — Heritage Card

**File:** `components/molecules/HeritageCard.vue`

**Atoms used:** BaseTypography, BaseButton

---

### 1. Visual Preview

```
┌────────────────────────────┐
│  [ Island Photo / Emoji ]  │  ← h-48, object-cover
│  [ Badge: Most Popular ]   │  ← top-left, teal pill
├────────────────────────────┤
│  FEATURED ISLAND           │  ← BaseTypography overline, teal
│  Governor Island           │  ← BaseTypography h4
│  The largest and most...   │  ← BaseTypography caption, 2 lines
│                            │
│  [ Learn More ]            │  ← BaseButton secondary sm
└────────────────────────────┘
```

---

### 2. Usage Context

The Heritage Card molecule is used exclusively for displaying individual island or heritage site previews inside the Heritage Grid organism. Each card represents one island with a thumbnail image (or emoji fallback), a category label, title, short description, and a "Learn More" button that triggers a modal.

"The Heritage Card is used exclusively for displaying tourist site previews in a responsive heritage-site grid."

It is never used in isolation — it always appears as a child of the HeritageGrid organism, which manages the grid layout and modal state.

---

### 3. Responsive Logic

| Breakpoint | Card Behavior |
|---|---|
| Mobile (< sm) | Full width, single column (parent grid controls) |
| Tablet (sm) | 2 columns (parent grid controls) |
| Desktop (lg) | 3 columns (parent grid controls) |

The card itself is always full width within its grid cell. Image height is fixed at `h-48` across all breakpoints for visual consistency across the grid. Description text is clamped to 2 lines via `line-clamp-2` to ensure all cards maintain equal heights regardless of description length.

---

### 4. Code Reference

```vue
<template>
  <article
    class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md
           transition-shadow focus-within:ring-2 focus-within:ring-teal-500"
    :aria-label="`Heritage site: ${title}`"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden" style="background-color: #ccfbf1;">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        loading="lazy"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center"
        style="font-size: 4rem;" aria-hidden="true">
        {{ fallbackEmoji }}
      </div>
      <span v-if="badge"
        class="absolute top-3 left-3 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {{ badge }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <BaseTypography variant="overline" color="primary" class="mb-1">
        {{ category }}
      </BaseTypography>
      <BaseTypography variant="h4" class="mb-2">{{ title }}</BaseTypography>
      <BaseTypography variant="caption" color="muted" class="mb-4 line-clamp-2">
        {{ description }}
      </BaseTypography>
      <BaseButton variant="secondary" size="sm" @click="$emit('learn-more')">
        Learn More
      </BaseButton>
    </div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  category: string
  image?: string
  fallbackEmoji?: string
  badge?: string
  link?: string
}>(), {
  fallbackEmoji: '🏝️',
  link: '#',
})

defineEmits<{ 'learn-more': [] }>()
</script>
```

**How to reuse:**
```vue
<HeritageCard
  title="Governor Island"
  description="The largest and most developed island."
  category="Featured Island"
  image="/images/Governor island.jpeg"
  badge="Most Popular"
  @learn-more="openModal(island)"
/>
```

**Props Reference:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Island name |
| `description` | `string` | — | Short description |
| `category` | `string` | — | Overline label |
| `image` | `string` | — | Image URL (optional) |
| `fallbackEmoji` | `string` | `'🏝️'` | Shown when no image |
| `badge` | `string` | — | Optional badge text |

---

## MOLECULE 2 — Search Form

**File:** `components/molecules/SearchForm.vue`

**Atoms used:** BaseButton, BaseIcon

---

### 1. Visual Preview

```
Mobile layout (stacked):
┌──────────────────────────────────────┐
│  🔍 Search heritage sites...         │
└──────────────────────────────────────┘
              [ 🔍 Search ]

Tablet/Desktop layout (side by side):
┌────────────────────────────┐ [ 🔍 Search ]
│ 🔍 Search heritage sites...|
└────────────────────────────┘
```

---

### 2. Usage Context

The Search Form molecule is used at the top of the Heritage Grid organism to allow users to filter the list of islands by name or description. On form submission, it emits a `search` event with the trimmed query string which the parent component uses to filter its data reactively.

"The Search Form is used exclusively as an inline filter for the Heritage Grid — not as a global site search."

It does not manage any island data itself — it only emits what the user typed. All filtering logic lives in the parent (HeritageGrid).

---

### 3. Responsive Logic

| Breakpoint | Layout |
|---|---|
| Mobile (< sm) | Stacked: input full-width on top, button below it |
| Tablet+ (sm+) | Side by side: input flex-1 (expands), button stays inline |

The input is always full-width on mobile for easy typing on touchscreens. A visually hidden `<label>` (via `sr-only`) ensures screen readers can identify the input field even though no visible label is displayed.

---

### 4. Code Reference

```vue
<template>
  <form
    role="search"
    :aria-label="ariaLabel"
    class="flex flex-col sm:flex-row gap-3 w-full"
    @submit.prevent="onSubmit"
  >
    <label :for="inputId" class="sr-only">{{ placeholder }}</label>
    <input
      :id="inputId"
      v-model="query"
      type="search"
      :placeholder="placeholder"
      class="flex-1 px-5 py-3 rounded-full border border-gray-300 text-gray-800
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500
             focus:border-transparent text-base"
    />
    <BaseButton type="submit" variant="primary" size="md">
      <BaseIcon emoji="🔍" size="sm" />
      <span class="ml-2">Search</span>
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  placeholder?: string
  ariaLabel?: string
}>(), {
  placeholder: 'Search heritage sites...',
  ariaLabel: 'Search heritage sites',
})

const emit = defineEmits<{ search: [query: string] }>()
const query = ref('')
const inputId = `search-${Math.random().toString(36).slice(2, 7)}`

function onSubmit() {
  emit('search', query.value.trim())
}
</script>
```

**How to reuse:**
```vue
<SearchForm
  placeholder="Search islands..."
  @search="handleSearch"
/>

<script setup>
function handleSearch(query: string) {
  filteredItems.value = allItems.filter(i =>
    i.title.toLowerCase().includes(query.toLowerCase())
  )
}
</script>
```

**Props & Events:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `'Search heritage sites...'` | Input placeholder |
| `ariaLabel` | `string` | `'Search heritage sites'` | Form accessible label |

| Event | Payload | Description |
|---|---|---|
| `search` | `string` | Emitted on submit with trimmed query |

---

## MOLECULE 3 — Navigation Item

**File:** `components/molecules/NavigationItem.vue`

**Atoms used:** BaseIcon

---

### 1. Visual Preview

```
Normal state:      🏠 Home
Hover state:     [ 🏝️ Islands ]   ← gray-100 background
Active state:    [ 🗺️ Islands ]   ← teal background highlight
```

---

### 2. Usage Context

The Navigation Item molecule is used exclusively inside the Header Navigation organism to render individual navigation links. It automatically detects the current route using `useRoute()` and applies an active highlight style when the link matches the current page.

"The Navigation Item is used exclusively inside the HeaderNavigation organism to render individual primary navigation links with active-state detection."

Each item renders as a `<NuxtLink>` with `aria-current="page"` applied when active, which is an accessibility requirement for navigation landmarks.

---

### 3. Responsive Logic

| Breakpoint | Behavior |
|---|---|
| Mobile (< md) | Stacked vertically inside the mobile drawer menu |
| Desktop (md+) | Horizontal inline row inside the header bar |

The Navigation Item component itself is layout-agnostic — it is always a `<li>` element. The parent `HeaderNavigation` organism controls whether it is arranged horizontally (desktop) or vertically (mobile drawer).

---

### 4. Code Reference

```vue
<template>
  <li>
    <NuxtLink
      :to="to"
      :aria-current="isActive ? 'page' : undefined"
      :class="[
        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-teal-500',
        isActive
          ? 'bg-teal-50 text-teal-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      ]"
    >
      <BaseIcon v-if="icon" :emoji="icon" size="sm" aria-hidden="true" />
      <span>{{ label }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  to: string
  icon?: string
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
```

**How to reuse:**
```vue
<!-- Inside a <ul> list -->
<ul class="flex items-center gap-1">
  <NavigationItem label="Home"    to="/"        icon="🏠" />
  <NavigationItem label="About"   to="/#about"  icon="ℹ️" />
  <NavigationItem label="Islands" to="/islands" icon="🗺️" />
  <NavigationItem label="Visit"   to="/#visit"  icon="📅" />
</ul>
```

**Props Reference:**

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Display text of the nav link |
| `to` | `string` | Route path passed to NuxtLink |
| `icon` | `string` | Optional emoji icon |

---

# LEVEL 3: ORGANISMS

Organisms are complex, self-contained UI sections composed of molecules and atoms. They form distinct sections of a page.

---

## ORGANISM 1 — Heritage Grid

**File:** `components/organisms/HeritageGrid.vue`

**Molecules used:** HeritageCard, SearchForm
**Atoms used:** BaseTypography, BaseIcon, BaseButton

---

### 1. Visual Preview

```
          ┌─────────────────────────────────────────┐
          │        DISCOVER THE ISLANDS             │  ← overline
          │         Island Highlights               │  ← h2
          │  Explore the most iconic islands...     │  ← body muted
          └─────────────────────────────────────────┘

     [ 🔍 Search heritage sites...        ] [ 🔍 Search ]

  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  Card 1      │  │  Card 2      │  │  Card 3      │
  └──────────────┘  └──────────────┘  └──────────────┘
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  Card 4      │  │  Card 5      │  │  Card 6      │
  └──────────────┘  └──────────────┘  └──────────────┘

          (empty state when no results found)
               🔎  No heritage sites found
                    [ Clear search ]
```

---

### 2. Usage Context

The Heritage Grid is the primary content discovery section of the homepage. It combines a section header (BaseTypography), a search input (SearchForm molecule), and a responsive grid of island cards (HeritageCard molecules). It manages its own internal search state and filters the provided items array reactively.

"The Heritage Grid organism is the main island discovery interface — it is placed on the homepage to allow users to browse and search all featured heritage islands."

When a user clicks "Learn More" on any card, the grid emits a `learn-more` event with the island data up to the parent page, which opens the Island Modal.

---

### 3. Responsive Logic

| Breakpoint | Grid Columns |
|---|---|
| Mobile (< sm) | 1 column |
| Tablet (sm) | 2 columns |
| Desktop (lg+) | 3 columns |

The grid uses Tailwind's `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` classes. The search query is stored in a local `ref` and the `filteredItems` computed property reactively updates the displayed cards on every keystroke. An accessible empty state is shown when no results match.

---

### 4. Code Reference

```vue
<template>
  <section :aria-labelledby="headingId" class="py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <BaseTypography variant="overline" color="primary">
          Discover the Islands
        </BaseTypography>
        <BaseTypography :id="headingId" variant="h2">{{ title }}</BaseTypography>
        <BaseTypography variant="body" color="muted">{{ subtitle }}</BaseTypography>
      </div>

      <!-- Search -->
      <div class="max-w-xl mx-auto mb-10">
        <SearchForm @search="onSearch" />
      </div>

      <!-- Grid -->
      <div v-if="filteredItems.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in filteredItems" :key="item.title">
          <HeritageCard v-bind="item" @learn-more="$emit('learn-more', item)" />
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <BaseIcon emoji="🔎" size="xl" />
        <BaseTypography variant="body" color="muted" class="mt-4">
          No heritage sites found for "{{ searchQuery }}".
        </BaseTypography>
        <BaseButton variant="ghost" size="sm" @click="searchQuery = ''">
          Clear search
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  items: HeritageItem[]
}>(), {
  title: 'Island Highlights',
  subtitle: 'Explore the most iconic islands.',
})

defineEmits<{ 'learn-more': [item: HeritageItem] }>()

const headingId = `heritage-grid-${Math.random().toString(36).slice(2, 7)}`
const searchQuery = ref('')

const filteredItems = computed(() =>
  props.items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function onSearch(q: string) { searchQuery.value = q }
</script>
```

**How to reuse:**
```vue
<HeritageGrid
  title="Island Highlights"
  subtitle="Explore the most iconic islands."
  :items="islandsArray"
  @learn-more="openModal"
/>
```

---

## ORGANISM 2 — Header Navigation

**File:** `components/organisms/HeaderNavigation.vue`

**Molecules used:** NavigationItem
**Atoms used:** BaseIcon, BaseButton

---

### 1. Visual Preview

```
Desktop:
┌──────────────────────────────────────────────────────────────────┐
│  🏝️ Hundred Islands    Home  About  Islands  Visit  [Plan Visit] │
└──────────────────────────────────────────────────────────────────┘

Mobile (closed):
┌──────────────────────────────────────┐
│  🏝️ Hundred Islands              ☰  │
└──────────────────────────────────────┘

Mobile (open):
┌──────────────────────────────────────┐
│  🏝️ Hundred Islands              ✕  │
├──────────────────────────────────────┤
│  🏠 Home                             │
│  ℹ️  About                           │
│  🗺️ Islands                          │
│  📅 Visit                            │
│         [ Plan Your Visit ]          │
└──────────────────────────────────────┘
```

---

### 2. Usage Context

The Header Navigation is the global site header placed at the top of every page via the Nuxt layout system (`layouts/default.vue`). It provides brand identity, primary navigation links, a call-to-action button, and a mobile-responsive hamburger menu.

"The HeaderNavigation organism is the global site header — it appears on every page and provides primary navigation, branding, and the main call-to-action."

It is sticky (stays visible while scrolling) with a frosted glass effect (`backdrop-blur-sm bg-white/90`) so page content remains readable beneath it.

---

### 3. Responsive Logic

| Breakpoint | Behavior |
|---|---|
| Mobile (< md) | Logo + hamburger button only; nav links hidden |
| Tablet/Desktop (md+) | Full horizontal nav bar with all links and CTA button visible |

The hamburger toggle uses `aria-expanded` and `aria-controls` attributes linked to the mobile menu element's `id` for full keyboard and screen reader accessibility. The mobile menu uses `v-show` (not `v-if`) so the DOM element is always present for assistive technologies even when visually hidden.

---

### 4. Code Reference

```vue
<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm
                 border-b border-gray-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

      <!-- Logo -->
      <NuxtLink to="/" aria-label="Hundred Islands — Home"
        class="flex items-center gap-2 font-bold text-gray-900">
        <BaseIcon emoji="🏝️" size="md" aria-hidden="true" />
        <span class="hidden sm:inline text-teal-700">Hundred Islands</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav aria-label="Main navigation" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <NavigationItem v-for="item in navItems" :key="item.to" v-bind="item" />
        </ul>
      </nav>

      <!-- CTA -->
      <BaseButton variant="primary" size="sm" href="#visit" class="hidden sm:inline-flex">
        Plan Your Visit
      </BaseButton>

      <!-- Mobile Toggle -->
      <button class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        :aria-expanded="menuOpen" aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen">
        <span aria-hidden="true">{{ menuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <nav v-show="menuOpen" id="mobile-menu"
      class="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
      <ul class="flex flex-col gap-1 pt-2">
        <NavigationItem v-for="item in navItems" :key="item.to"
          v-bind="item" @click="menuOpen = false" />
      </ul>
      <div class="mt-3">
        <BaseButton variant="primary" size="sm" href="#visit"
          class="w-full justify-center">
          Plan Your Visit
        </BaseButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const navItems = [
  { label: 'Home',    to: '/',        icon: '🏠' },
  { label: 'About',  to: '/#about',  icon: 'ℹ️' },
  { label: 'Islands', to: '/islands', icon: '🗺️' },
  { label: 'Visit',  to: '/#visit',  icon: '📅' },
]
</script>
```

**How to reuse (in layouts/default.vue):**
```vue
<template>
  <div>
    <HeaderNavigation />
    <main>
      <slot />
    </main>
  </div>
</template>
```

To add or remove navigation links, modify the `navItems` array — no template changes needed.

---

# Summary Table

| Level | Component | File | Atoms Used | Molecules Used |
|---|---|---|---|---|
| Atom | Button | `atoms/BaseButton.vue` | — | — |
| Atom | Typography | `atoms/BaseTypography.vue` | — | — |
| Atom | Color Tokens | `atoms/ColorToken.vue` | — | — |
| Atom | Icon | `atoms/BaseIcon.vue` | — | — |
| Atom | Image | `atoms/BaseImage.vue` | — | — |
| Molecule | Heritage Card | `molecules/HeritageCard.vue` | BaseTypography, BaseButton | — |
| Molecule | Search Form | `molecules/SearchForm.vue` | BaseButton, BaseIcon | — |
| Molecule | Navigation Item | `molecules/NavigationItem.vue` | BaseIcon | — |
| Organism | Heritage Grid | `organisms/HeritageGrid.vue` | BaseTypography, BaseIcon, BaseButton | HeritageCard, SearchForm |
| Organism | Header Navigation | `organisms/HeaderNavigation.vue` | BaseIcon, BaseButton | NavigationItem |

---

*Deliverable 1.2 — Atomic Design System Manual*
*Heritage Site: Alaminos' Hundred Islands National Park, Alaminos City, Pangasinan*
*Framework: Vue 3 + Nuxt.js 3 | Styling: Tailwind CSS | Methodology: Brad Frost's Atomic Design*
