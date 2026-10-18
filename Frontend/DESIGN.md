# cai: Design Guide & Agent Instructions

> This file is the **single source of truth** for cai's design.
> Every agent that works on the design reads this whole file **before** touching anything, and updates it **before** finishing.

---

## 1. What cai is

cai is a personal investing agent platform. The user adds data sources (URL templates), the agent scrapes them for the companies on the watchlist, and the results become structured reports that support the user's **own** valuation decisions. The AI collects and organizes; the human judges.

**Planned pages** (the target, not all built yet)
- **Sources**: add a source (label, URL template, type), list sources, enable/disable them, and test a source on a single ticker.
- **Results**: the data pulled from the sources.
- **Reports**: a placeholder for now. Its content will change as the user's valuation method develops, so keep its styling flexible.

**Built today** (whoever adds a page updates this list)
- `/home` is the only real page: intro text plus the sources list. A source has only `name` and `url`. You can list, add and delete sources. There is no source type, enable/disable or test-on-ticker yet.
- Results and Reports don't exist yet. The menu shows Home, Data and About; Data and About have no routes and land on the 404 page.
- Style what exists. For pages that aren't built, the groundwork is ready in `src/index.css`: tokens, base table styles, and the `.table-scroll`, `.num`, `.gain` and `.loss` utilities.

**Design goal:** a calm, focused, data-dense tool that feels premium and personal, something you'd trust with money decisions. Clarity over decoration. Every visual choice should make data easier to read, compare and trust.

---

## 2. Rules for the agent

### You may edit freely
- `.css` files (including `.module.css`)
- This file (`DESIGN.md`). Updating it is **required** (see section 6).

### You must ask permission before
- Changing **any** `.tsx` or `.ts` file. This includes adding a `className`, wrapping an element, or adding an import (even importing a new CSS file).
- Adding or removing any dependency (UI kits, Tailwind, icon packs, font packages).
- Renaming, moving or deleting any file.

### How to ask for permission
1. Do everything you can with CSS alone first.
2. Collect **all** the TSX changes you need into **one** request. Don't ask one at a time.
3. For each change, give:
   - the file path
   - the exact change, as a before/after snippet
   - why CSS alone can't do it
4. **Stop and wait** for approval. Apply only what was approved, exactly as approved.

### Never
- Change logic, state, data fetching, props, types or routing.
- Restructure the project, or rename class names that components already use.
- Hard-code colors, spacing or font sizes in component CSS. Use the tokens.
- Finish without updating sections 5 and 6 of this file.

---

## 3. Design requirements (fixed, apply to every pass)

- **Numbers:** right-aligned in tables, with `font-variant-numeric: tabular-nums` so digits line up.
- **Gains/losses:** never rely on color alone. Pair the color with a sign (+/−) or an icon.
- **Contrast:** text meets WCAG AA at minimum. Keep focus states visible on every interactive element.
- **States:** every interactive element has hover, focus, active and disabled styles. Every data view has empty, loading and error states where the markup supports them.
- **Responsive:** works at desktop width and at ~375px mobile width with no horizontal page scroll. Wide tables scroll inside their own container.
- **Restraint:** one accent color, used for actions and emphasis only. Animation is subtle and quick, and is disabled under `prefers-reduced-motion`.

---

## 4. Workflow

1. **Read** this whole file.
2. **Inspect the project:** how CSS is organized (global vs modules), which class names exist, any existing variables. Work with that structure, not against it.
3. **First run only (section 5 is empty):** before writing any CSS, propose a direction:
   - mood in 2–3 sentences
   - color palette with hex values (background, surface, text, muted text, border, accent, positive, negative)
   - fonts
   - light, dark, or both

   Then **wait for approval**.
4. **Tokens first:** define all colors, spacing, radii, font sizes, shadows and transitions as CSS custom properties in one place.
5. **Style page by page:** Sources → Results → Reports.
6. **Check every page** against section 3, at desktop and mobile width.
7. **Update this file:** bring section 5 in line with what now exists, then add your entry to section 6. The task is not finished until this is done.

---

## 5. Design system (living: always reflects the current state)

> Established in the first design pass (2026-10-18). Edit it whenever the CSS changes so it always matches the actual CSS.

### Direction
**A quiet research desk.** Warm paper-white background, white surfaces, thin hairline borders instead of heavy cards or shadows, and one ink-blue accent kept for actions. It should read like a well-kept ledger: dense, even and calm, with numbers that line up.

- **Light theme only** (the user's choice). Don't add a dark theme without asking.
- Hairlines, not boxes: related items join into one bordered group (see the source rows).
- Ink blue is the only accent. It's for primary actions, the active tab, focus rings, the brand mark and the spinner. Green and red are reserved for gain/loss and success/error, and always come with a sign or icon.
- Monospace for machine text: URLs, URL templates, tickers, codes.

### Tokens
All tokens live in `:root` in `src/index.css`. Component CSS uses only these, never raw values. Exceptions: 1–2px border/ring widths, and the `40rem` breakpoint (media queries can't read custom properties).

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#F5F4F0` | Page background |
| `--color-surface` | `#FFFFFF` | Top band, cards, rows, form panel, inputs, secondary buttons |
| `--color-surface-hover` | `#F0EFEA` | Hover fill (buttons, table rows) |
| `--color-surface-active` | `#E8E7E1` | Pressed fill (secondary buttons) |
| `--color-surface-disabled` | `#EFEEEA` | Disabled buttons and fields |
| `--color-text` | `#1B1D21` | Body text, headings (15.3:1 on bg) |
| `--color-text-muted` | `#5C6169` | Secondary text, URLs, inactive tabs, placeholders (5.7:1 on bg) |
| `--color-text-disabled` | `#9A9DA3` | Disabled text only (WCAG exempts it) |
| `--color-border` | `#DEDCD5` | Hairlines, card and row borders, dividers (decorative) |
| `--color-border-strong` | `#898D94` | Input and secondary-button edges, ≥3:1 on bg and surface (WCAG 1.4.11) |
| `--color-accent` | `#3B4FD4` | Primary buttons, active tab, focus ring, links, brand mark, spinner (5.9:1 on bg) |
| `--color-accent-hover` / `-active` | `#3243B8` / `#2A389C` | Primary button hover / pressed |
| `--color-accent-soft` | `#ECEEFB` | Text selection |
| `--color-positive` / `-soft` | `#1D7A4C` / `#E7F2EC` | Gains, success toast (4.8:1 on bg) |
| `--color-negative` / `-soft` | `#BD3530` / `#FBEBEA` | Losses, errors, invalid fields, Delete hover (5.1:1 on bg) |
| `--color-on-fill` | `#FFFFFF` | Text or glyphs on any solid accent/positive/negative fill |
| `--font-sans` | Inter → system UI | Everything |
| `--font-mono` | JetBrains Mono → Cascadia Mono, Consolas | URLs, URL inputs, 404 code |
| `--text-xs … --text-2xl` | 12, 13, 14, 16, 20, 26px (rem) | Type scale, see Typography |
| `--weight-regular/medium/semibold` | 400 / 500 / 600 | |
| `--leading-tight` / `-normal` | 1.25 / 1.5 | Headings and labels / body |
| `--tracking-tight` / `-wide` | -0.011em / 0.06em | Headings / small uppercase labels (table headers) |
| `--space-1 … --space-8` | 4, 8, 12, 16, 24, 32, 48, 64px (rem) | All padding, margins and gaps |
| `--page-max` | 70rem (1120px) | Content column width |
| `--page-gutter` | 16px, 32px from 40rem | Side gutter |
| `--measure` | 65ch | Max line length for prose |
| `--control-height` / `-sm` | 36px / 32px | Buttons and inputs / compact buttons (Delete) |
| `--tap-target` | 44px | Nav tab height |
| `--icon-sm/md/lg` | 16 / 20 / 24px | Error badge / toast icon / spinner |
| `--radius-sm/md/lg/full` | 4 / 6 / 10 / 999px | Brand mark, tabs / controls / cards, panels, toasts / circles |
| `--shadow-sm/md/lg` | soft, ink-tinted | Form panel / (spare) / toasts |
| `--focus-ring` / `--focus-offset` | 2px solid accent / 2px | Every focusable element |
| `--duration-fast` / `-base` | 120ms / 200ms, **0ms under reduced motion** | All transitions. `-base` drives `.collapsible`, and `sources-list.tsx` mirrors it as `collapseDuration`, so change both together |
| `--duration-spin` | 800ms | One spinner turn |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | All transitions |

### Typography
- **Inter** (400/500/600) for UI, **JetBrains Mono** (400/500) for machine text. Both are loaded with an `@import` from Google Fonts at the top of `index.css`, with no npm package. If the fonts can't load, system fonts take over.
- Base size 14px (`--text-md`) with 1.5 line height: data-dense, still comfortable.
- Scale: page title 20px on phones, 26px from 40rem (`.Home > h1`); h2 20px; h3 16px; body/controls 14px; labels, URLs and table cells 13px; table headers and footer 12px.
- Headings are semibold with slight negative tracking and `text-wrap: balance`. Prose uses `text-wrap: pretty` and is capped at `--measure`.
- Numbers: tables use `font-variant-numeric: tabular-nums`, and so does `.num`.
- On touch screens (`pointer: coarse`), inputs switch to 16px so iOS doesn't zoom in on focus. Don't set a font-size on inputs in component CSS, or it breaks this.

### Layout & spacing
- `.Layout` is a grid with three columns: gutter, content (max `--page-max`), gutter. Rows: brand, tabs, main, footer. A `::before` draws the full-width white top band behind the first two rows, so the markup didn't need changing.
- Main has 32px top and 64px bottom padding. The footer has a hairline top border.
- One breakpoint: **40rem (640px)**. Below it: 16px gutters, single-column form, source rows with the URL under the name and Delete. At 40rem and up: 32px gutters, one-row form, Delete centered on the right.
- Spacing comes only from the 4px scale (`--space-*`).
- Verified at 1280px and 375px with no horizontal page scroll. Long URLs wrap (`overflow-wrap: anywhere`), and the tab row scrolls sideways inside itself if it ever overflows.

### Components
- **Buttons** (global, `index.css`): secondary by default (white, strong border). Variants are made by setting variables in component CSS: `--btn-bg`, `--btn-bg-hover`, `--btn-bg-active`, `--btn-fg`, `--btn-fg-hover`, `--btn-border`, `--btn-border-hover`. **Never set `background`, `color` or `border-color` on a button directly**, or hover and disabled stop working. States: hover (fill), active (pressed fill plus 1px drop), focus-visible (accent ring), disabled (grey fill, light text, not-allowed cursor; this beats every variant).
  - *Primary* (accent fill, white text): `.SourcesList > button` (Add Source) and `.AddSourceForm button` (Add).
  - *Quiet danger* (white with muted text, turning negative-soft with red text on hover): `.SourceCard > button` (Delete), compact 32px.
- **Inputs, selects, textareas** (global): 36px, strong border. Hover darkens the border, focus shows an accent border plus ring, disabled is grey. Checkboxes and radios use `accent-color`. Selects are still native, with no custom arrow yet.
- **Invalid field** (`add-source-form.css`): react-hook-form renders `<p class="errors">` right after the input. `input:has(+ .errors)` turns that input's border and focus ring red. The error text is red, 13px, with a round red "!" badge, so it doesn't rely on color alone.
- **Collapsible** (`.collapsible`, `index.css`): slides content open and closed with no fixed height. The wrapper is a one-row grid whose row animates `1fr ↔ 0fr`, with opacity fading alongside, over `--duration-base` with `--ease-out`. The **closed state is the `inert` attribute**, which also blocks clicks, focus and screen readers. Markup must be `.collapsible > <div> (no padding) > content`, because padding on the direct child stops it collapsing to 0. Put spacing on the content as margin, not on the wrappers, so the gap collapses too. Under reduced motion it snaps.
- **Add source form**: a white panel. Its children are flat siblings, so each label, input and error is placed into a named grid area with `:nth-of-type`. Phones get one column; from 40rem it's one row of Name (1fr), Url (2fr, monospace) and Add. It stays mounted inside `.add-form.collapsible` and slides down and up when Add Source is clicked. The button carries `aria-expanded`. Because the form never unmounts, typed values persist between open and close.
- **Source rows**: each `.SourceCard` is a white row with name (medium weight) and URL (monospace, muted, 13px), wrapped in `.source-row.collapsible`. `sources-list.css` joins the rows into one rounded group: shared borders, rounded outer corners only. The first and last rows are found with `:nth-child(1 of .source-row:not([inert]))`, so a row that's sliding out stops counting right away.
- **Delete flow** (`sources-list.tsx`): clicking Delete marks the row as removing (`inert`), so it slides up and can't be clicked twice. After `collapseDuration` the API call runs, and removing the source from the store unmounts the row. If the API call fails, the row slides back down and an error toast shows.
- **Empty state**: when `.SourcesList` has no `.SourceCard` and no `.Spinner`, its `::before` shows a dashed box saying "No sources yet…". The copy lives in CSS because there's no markup for it.
- **Loading**: `.Spinner` is a 24px CSS ring (border with an accent top arc) that hides the old GIF. Inside the sources list it's moved first with `order: -1`, where the cards will appear. Under reduced motion it pulses instead of spinning.
- **Tabs** (`.Menu`): muted text with a 2px underline that's grey on hover and accent for `[aria-current="page"]` (set by NavLink). 44px tall. The focus ring is inset because the row is a scroll container.
- **Brand** (`.Header h1`): 16px semibold wordmark with a 12px accent square.
- **Toasts** (iziToast, restyled in `index.css`): white card with a 10px radius, a large soft shadow, and a 3px tinted stripe on the left (green or red). The stock PNG icons are replaced by round ✓ / ! badges, and the progress bar is tinted. Under reduced motion the slide animations become instant.
- **Tables** (global, ready for Results/Reports, none in use yet): full width, 13px, tabular numbers. Headers are 12px uppercase muted. Rows have hairline separators and a hover fill. Wrap wide tables in `.table-scroll` so they scroll inside their own box.
- **Utilities** (`index.css`): `.num` (right-aligned, tabular, no wrap), `.gain` / `.loss` (green/red plus ▲/▼ arrow; the data should still carry its +/− sign), `.visually-hidden`.
- **404** (`.Page404`): the component renders an empty div, so `:empty::before/::after` show "404" in monospace plus "Page not found". This stops matching on its own once real markup is added.

### File map
| File | Holds |
|---|---|
| `src/index.css` | Google Fonts import, all tokens, reduced-motion switch, base element styles (all in `:where()`, zero specificity), buttons, fields, tables, utilities (including `.collapsible`), iziToast overrides |
| `layout-area/layout/layout.css` | App grid, top band, content column, main and footer spacing |
| `layout-area/header/header.css` | Brand wordmark and accent mark |
| `layout-area/menu/menu.css` | Underline tabs |
| `layout-area/copyrights/copyrights.css` | Footer text |
| `pages-area/home/home.css` | Page title, intro prose, spacing before the sources list |
| `pages-area/page404/page404.css` | Not-found stand-in |
| `shared-area/spinner/spinner.css` | CSS ring spinner and its keyframes (`Spinner-rotate`, `Spinner-pulse`) |
| `srouces/sources-list/sources-list.css` | Grouping of `.source-row`s (skipping rows that are sliding out), empty state, Add Source button, form spacing, spinner order |
| `srouces/source-card/source-card.css` | Source row layout, Delete button |
| `srouces/add-source-form/add-source-form.css` | Form panel, grid areas, invalid state, error badge, Add button |

**Cascade note:** `main.tsx` imports `Layout` (and with it every component's CSS and iziToast's CSS) *before* `index.css`, so `index.css` loads last. That's why the base rules sit in `:where()`: any component class beats them regardless of order. The iziToast overrides rely on this order and use the same selectors as iziToast.

---

## 6. Handoff log (newest entry on top)

> Every agent adds an entry before finishing. Write it for the next agent: someone with zero context who has to continue your work tomorrow.

### Entry template

```
### [YYYY-MM-DD] Short title
**Summary:** What was done, in 2–3 sentences.
**Files changed:** List of files.
**Decisions & why:** The choices that weren't obvious, and the reasoning behind them.
**TSX changes:** Requested / approved / applied (or "none").
**Known issues:** What's broken, unfinished, or looks off.
**Next steps:** What the next agent should do first.
```

<!-- New entries go below this line -->

### [2026-10-18] Slide animations: add form and delete
**Summary:** The add-source form now slides down and up when Add Source is clicked, and a deleted source row slides up before it's removed. Both use a new reusable `.collapsible` utility (grid-row `0fr ↔ 1fr` plus fade), with the `inert` attribute as the closed state.
**Files changed:** `src/index.css` (`.collapsible`), `srouces/sources-list/sources-list.css` (row grouping rewritten for the wrappers, form margin), `srouces/sources-list/sources-list.tsx`, and this file.
**Decisions & why:**
- `inert` is the closed state: it gives the CSS hook and also keeps hidden or removing content unclickable and unfocusable, with no extra class or state.
- The extra inner `<div>` is required: tested in Edge, a padded direct child left a 46px gap when closed, while the inner div collapses to 0.
- Delete is optimistic. The row slides up first and the API call runs after `collapseDuration`. The service dispatches the removal as soon as the API answers, and that would cut the animation off halfway. On failure the row slides back down.
- The add form now stays mounted, so it can animate closed. Side effect: typed values persist across toggles.
**TSX changes:** Requested by the user and applied in `sources-list.tsx`: `collapseDuration` constant, `removingIds` state, the optimistic `handleDelete`, a `.source-row.collapsible` wrapper per card, `aria-expanded` on Add Source, and the form inside `.add-form.collapsible`.
**Known issues:**
- `collapseDuration` (200) duplicates `--duration-base`. Under reduced motion the CSS snaps, but delete still waits 200ms before the API call (invisible to the user).
- New rows appear without an enter animation, both on load and after adding.
- Verified with static and slowed-down screenshots in headless Edge, not in the live app with the backend.
**Next steps:** Same as the entry below. If enter animations are wanted, `@starting-style` on `.source-row` would do it without JS, but it would also animate every row on first load.

### [2026-10-18] First design pass: tokens, shell, Sources page
**Summary:** Set up the "quiet research desk" design system: a light theme, an ink-blue accent, Inter with JetBrains Mono, all as tokens in `index.css`. Styled the app shell (top band, tabs, footer), the Sources list on `/home` (grouped rows, form with inline errors, empty state, CSS spinner), the 404 page and iziToast toasts. Laid groundwork for Results and Reports: base table styles plus `.num`, `.gain`, `.loss` and `.table-scroll`.
**Files changed:** `src/index.css`, all ten component `.css` files listed in the file map, `srouces/sources-list/sources-list.tsx` (approved TSX change, below), and this file (section 1 split into planned vs. built; sections 5 and 6).
**Decisions & why:**
- Light only, at the user's request. The palette was contrast-checked: every text color passes AA, and input and button edges reach 3:1 (`--color-border-strong`).
- The accent is blue, not green, so it never reads as "gain".
- Base styles sit in `:where()` because `index.css` loads *after* the component CSS (see the cascade note). Zero specificity means components always win.
- Button variants are set through `--btn-*` variables, so the hover, active and disabled rules are written once and work for every variant.
- With no markup for them, the empty state and 404 copy come from CSS pseudo-elements. The 404 uses `:empty`, so it retires itself once real markup exists.
- The GIF spinner is hidden in favor of a token-colored CSS ring, because the GIF was off-palette and had "Loading" baked in.
- On phones the URL moves under the name, since the Delete button was squeezing it into a narrow column.
**TSX changes:**
- Applied (approved by the user): `sources-list.tsx` now renders `<Spinner />` instead of `<span>Loading sources...</span>` and imports `Spinner`.
- Applied later the same day, at the user's request: (a) `setLoading(false)` moved into `.finally()`, so the spinner now shows during the fetch. `SourcesList` reads the list with `useSelector` from the Redux store instead of local state, and `main.tsx` wraps the app in `<Provider store={store}>`. Add and delete now update the list without a refresh.
- Requested, awaiting approval: (b) Header text "Template" → "cai". (c) `index.html` title "northwind" → "cai". (d) Drop the "Name: " / "Url: " prefixes in `source-card.tsx`. (e) Link labels to inputs with `htmlFor`/`id` in `add-source-form.tsx`. (f) Spinner: add `role="status"` and `aria-label="Loading"`, and drop the hidden GIF `<img>` and its import.
**Known issues:**
- If the sources fetch fails, the list shows the "No sources yet" empty state (alongside the error toast). There's no error markup to style.
- Two `<h1>`s per page (brand and page title). Making the brand a non-heading would be a markup change.
- The Data and About tabs lead to the 404 page because they have no routes.
- `npm run build` fails before reaching CSS: `utils/form-util.ts` imports a `ProductModel` that doesn't exist (pre-existing, not touched). `npx vite build` (no type check) succeeds.
- Hover and active states were checked in code, not in a rendered screenshot.
**Next steps:** Apply whichever TSX requests (b)–(f) get approved, then remove `.Spinner img { display: none; }` if (f) lands. When Results is built, use the global table styles, `.table-scroll`, `.num` and `.gain`/`.loss`, then add a Results entry to the file map.