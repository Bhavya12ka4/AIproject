# ECG Guard Analytics Platform — Design System

> **Source:** Stitch Project `ECG Guard Analytics Platform`
> **Design System:** Clinical Precision & Tonal Depth
> **Color Mode:** Light  | **Color Variant:** Fidelity
> **Device:** Desktop (1280 × 1024)

---

## Creative North Star: "The Clinical Curator"

The interface should feel less like software and more like a **precision instrument** — cool
to the touch, quiet, and profoundly focused. We achieve this through **Intentional Asymmetry**
and **Tonal Layering**, using expansive breathing room and overlapping surfaces to suggest a
continuous, living stream of data.

---

## 1. Color Tokens

### 1.1 Primary Palette

| Token                      | Hex       | Usage                                    |
| -------------------------- | --------- | ---------------------------------------- |
| `--primary`                | `#002869` | Authoritative actions, deep trust blue   |
| `--primary-container`      | `#0B3D91` | Primary button backgrounds               |
| `--on-primary`             | `#FFFFFF` | Text/icons on primary surfaces           |
| `--on-primary-container`   | `#8DADFF` | Text/icons on primary container          |
| `--primary-fixed`          | `#DAE2FF` | Fixed primary tint                       |
| `--primary-fixed-dim`      | `#B1C5FF` | Dimmed fixed primary                     |
| `--on-primary-fixed`       | `#001947` | Text on fixed primary                    |
| `--on-primary-fixed-variant` | `#144296` | Text on fixed primary variant          |
| `--inverse-primary`        | `#B1C5FF` | Primary for inverse/dark surfaces        |

### 1.2 Secondary Palette (Cyan — "Healthy" Signal)

| Token                        | Hex       | Usage                                  |
| ---------------------------- | --------- | -------------------------------------- |
| `--secondary`                | `#00696B` | Healthy data streams, active states    |
| `--secondary-container`      | `#56F5F8` | Active tab backgrounds, highlights     |
| `--on-secondary`             | `#FFFFFF` | Text/icons on secondary                |
| `--on-secondary-container`   | `#006E70` | Text on secondary container            |
| `--secondary-fixed`          | `#5AF8FB` | Fixed secondary tint                   |
| `--secondary-fixed-dim`      | `#2DDBDE` | Dimmed fixed secondary                 |
| `--on-secondary-fixed`       | `#002020` | Text on fixed secondary                |
| `--on-secondary-fixed-variant` | `#004F51` | Text on fixed secondary variant      |

### 1.3 Tertiary Palette (Deep Slate)

| Token                        | Hex       | Usage                                  |
| ---------------------------- | --------- | -------------------------------------- |
| `--tertiary`                 | `#142E42` | Supporting accents                     |
| `--tertiary-container`       | `#2C4459` | Tertiary container backgrounds         |
| `--on-tertiary`              | `#FFFFFF` | Text/icons on tertiary                 |
| `--on-tertiary-container`    | `#98B1CA` | Text on tertiary container             |
| `--tertiary-fixed`           | `#CCE5FF` | Fixed tertiary tint                    |
| `--tertiary-fixed-dim`       | `#B0C9E3` | Dimmed fixed tertiary                  |
| `--on-tertiary-fixed`        | `#011D31` | Text on fixed tertiary                 |
| `--on-tertiary-fixed-variant` | `#31495E` | Text on fixed tertiary variant        |

### 1.4 Error Palette ("Anomaly" Red — Cardiac Alerts Only)

| Token                  | Hex       | Usage                                        |
| ---------------------- | --------- | -------------------------------------------- |
| `--error`              | `#BA1A1A` | 🚨 **Reserved for cardiac alerts only**      |
| `--error-container`    | `#FFDAD6` | Error container background                   |
| `--on-error`           | `#FFFFFF` | Text/icons on error                          |
| `--on-error-container` | `#93000A` | Text on error container                      |

> [!CAUTION]
> Red is **forbidden** for decorative elements. It is a functional signal reserved solely
> for cardiac alerts and critical data errors. Never use it for "Delete" buttons — use
> `--outline` instead.

### 1.5 Surface & Background Hierarchy

| Token                        | Hex       | Layer                               |
| ---------------------------- | --------- | ------------------------------------ |
| `--background`               | `#F7F9FC` | Page background                     |
| `--on-background`            | `#191C1E` | Text on background                  |
| `--surface`                  | `#F7F9FC` | **Level 0** — Base canvas            |
| `--surface-dim`              | `#D8DADD` | Dimmed surface                      |
| `--surface-bright`           | `#F7F9FC` | Bright surface                      |
| `--surface-container-lowest` | `#FFFFFF` | **Floating Elements** (glassmorphism)|
| `--surface-container-low`    | `#F2F4F7` | **Level 1** — Sections              |
| `--surface-container`        | `#ECEEF1` | **Level 2** — Cards                 |
| `--surface-container-high`   | `#E6E8EB` | **Level 3** — Hover / Active        |
| `--surface-container-highest`| `#E0E3E6` | **Level 4** — Maximum elevation     |
| `--surface-variant`          | `#E0E3E6` | Variant surface                     |
| `--surface-tint`             | `#345BAF` | Tint overlay                        |
| `--on-surface`               | `#191C1E` | Primary text (never use `#000`)     |
| `--on-surface-variant`       | `#434652` | Secondary metadata text             |

### 1.6 Outline & Border Tokens

| Token              | Hex       | Usage                                        |
| ------------------ | --------- | -------------------------------------------- |
| `--outline`        | `#747783` | Prominent outlines, disabled delete buttons  |
| `--outline-variant`| `#C4C6D3` | Ghost borders (use at **15% opacity**)       |

### 1.7 Inverse Tokens (Dark Contexts)

| Token                  | Hex       |
| ---------------------- | --------- |
| `--inverse-surface`    | `#2D3133` |
| `--inverse-on-surface` | `#EFF1F4` |
| `--inverse-primary`    | `#B1C5FF` |

### 1.8 Override / Brand Colors

| Role      | Hex       | Usage                        |
| --------- | --------- | ---------------------------- |
| Primary   | `#0B3D91` | Brand primary override       |
| Secondary | `#00CED1` | Cyan highlight override      |
| Tertiary  | `#4A6278` | Supporting accent override   |
| Neutral   | `#F0F2F5` | Neutral base override        |

---

## 2. Typography

### 2.1 Font Stack

| Role               | Family      | Usage                                    |
| ------------------ | ----------- | ---------------------------------------- |
| **Headlines**      | `Manrope`   | Patient names, primary metrics, headings |
| **Body**           | `Inter`     | Body text, data labels, metadata         |
| **Labels**         | `Inter`     | Timestamps, units, small annotations     |

> Import from Google Fonts:
> ```
> @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
> ```

### 2.2 Type Scale

| Token          | Size      | Weight | Family    | Usage                                 |
| -------------- | --------- | ------ | --------- | ------------------------------------- |
| `display-lg`   | `3.5rem`  | 700    | Manrope   | Hero moments                          |
| `display-md`   | `2.75rem` | 700    | Manrope   | **Heart rate / BPM values**           |
| `display-sm`   | `2.25rem` | 600    | Manrope   | Large data points                     |
| `headline-lg`  | `2rem`    | 700    | Manrope   | **Patient names, primary metrics**    |
| `headline-md`  | `1.75rem` | 600    | Manrope   | Section titles                        |
| `headline-sm`  | `1.5rem`  | 600    | Manrope   | Sub-section titles                    |
| `title-lg`     | `1.375rem`| 600    | Inter     | Card titles                           |
| `title-md`     | `1rem`    | 600    | Inter     | Component headers                     |
| `title-sm`     | `0.875rem`| 600    | Inter     | Button text (caps)                    |
| `body-lg`      | `1rem`    | 400    | Inter     | Paragraphs, descriptions              |
| `body-md`      | `0.875rem`| 400    | Inter     | Default body text                     |
| `body-sm`      | `0.75rem` | 400    | Inter     | Supporting text                       |
| `label-lg`     | `0.875rem`| 500    | Inter     | Form labels                           |
| `label-md`     | `0.75rem` | 500    | Inter     | **Units (BPM, ms, mV)**              |
| `label-sm`     | `0.6875rem`| 500   | Inter     | Timestamps, fine annotations          |

### 2.3 Signature Pairing

```
┌──────────────────────────────┐
│  72  ← display-md (Manrope) │  ← Heart Rate value
│  bpm ← label-md   (Inter)   │  ← Unit label
└──────────────────────────────┘
```

Use `--on-surface` for primary data, `--on-surface-variant` for secondary metadata.

---

## 3. Spacing

### 3.1 Base Grid

**Grid unit:** `8px` (spacing scale = `2`)

| Token    | Value    | px   | Usage                                |
| -------- | -------- | ---- | ------------------------------------ |
| `sp-1`   | `0.25rem`| 4    | Micro gaps                           |
| `sp-2`   | `0.5rem` | 8    | Tight internal padding               |
| `sp-3`   | `0.75rem`| 12   | Icon-to-text gaps                    |
| `sp-4`   | `1rem`   | 16   | Standard internal padding            |
| `sp-6`   | `1.5rem` | 24   | Card padding, section gaps           |
| `sp-8`   | `2rem`   | 32   | **Minimum gutter width**             |
| `sp-10`  | `2.5rem` | 40   | Column spacing                       |
| `sp-12`  | `3rem`   | 48   | Section separation                   |
| `sp-16`  | `4rem`   | 64   | Page-level vertical rhythm           |
| `sp-20`  | `5rem`   | 80   | Hero section spacing                 |
| `sp-24`  | `6rem`   | 96   | Maximum breathing room               |

### 3.2 Spacing Rules

- All spacing must align to the **8px grid**.
- Gutters between content areas must be **≥ 32px** (sp-8).
- Card internal padding: **24px** (sp-6).
- Section separation: **48–64px** (sp-12 to sp-16).

---

## 4. Shape & Roundness

**Corner radius scale:** `ROUND_FOUR`

| Token      | Value       | Usage                                   |
| ---------- | ----------- | --------------------------------------- |
| `none`     | `0`         | Never for main containers               |
| `sm`       | `0.125rem`  | Form field subtle radius                |
| `md`       | `0.375rem`  | Default cards                           |
| `lg`       | `0.5rem`    | Container cards                         |
| `xl`       | `0.75rem`   | **Primary buttons**                     |
| `2xl`      | `1rem`      | Large interactive elements              |
| `full`     | `9999px`    | **Pill tabs**, status badges            |

---

## 5. Elevation & Depth

### 5.1 The "No-Line" Rule

> [!IMPORTANT]
> Standard `1px` borders are **prohibited** for sectioning. Boundaries must be
> defined through **background color shifts** and **negative space** only.

### 5.2 Tonal Layering Stack

```
Level 0  →  surface                (#F7F9FC)   Base canvas
Level 1  →  surface-container-low  (#F2F4F7)   Sections
Level 2  →  surface-container      (#ECEEF1)   Cards
Level 3  →  surface-container-high (#E6E8EB)   Hover / Active
Float    →  surface-container-lowest (#FFFFFF)  Glassmorphism panels
```

### 5.3 Shadow Specifications

| Context            | Shadow Value                                    |
| ------------------ | ----------------------------------------------- |
| **Ambient (cards)**| `0px 12px 32px rgba(11, 61, 145, 0.08)`         |
| **Ghost border**   | `outline-variant` (#C4C6D3) at **15% opacity**  |
| **None required**  | Use tonal layering instead of shadows            |

> Shadows represent **criticality**, not light. Blue-tinted glows
> feel more "clinical" than grey shadows.

### 5.4 Glassmorphism

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.60);   /* surface-container-lowest @ 60% */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

---

## 6. Component Specifications

### 6.1 Buttons

| Variant     | Background                               | Text             | Radius | Border                     |
| ----------- | ---------------------------------------- | ---------------- | ------ | -------------------------- |
| **Primary** | `--primary-container` (#0B3D91)          | `--on-primary`   | `xl`   | None                       |
| **Secondary**| Transparent                             | `--primary`      | `xl`   | Ghost border (15% opacity) |
| **Hover**   | Gradient `--primary` → `--primary-container` | `--on-primary` | `xl` | None                      |

### 6.2 Form Fields

```css
.input-field {
  background: var(--surface-container-high);  /* #E6E8EB */
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 0.125rem;                    /* sm */
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
}

.input-field:focus {
  border-bottom-color: var(--primary);
}
```

- Labels: `label-md` positioned **8px** above the field.

### 6.3 Diagnostic Cards

- **No dividers.** Use "Padding Stacking."
- Title: top-left. Status badge: top-right.
- Status colors: `--error` (Anomaly) or `--secondary` (Stable).
- ECG waveform should **bleed to card edges**.

### 6.4 Tab Navigation (Pill Style)

```css
.tab {
  border-radius: 9999px;              /* full pill */
  padding: 8px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  color: var(--on-surface-variant);
}

.tab--active {
  background: var(--secondary-container); /* #56F5F8 */
  color: var(--on-secondary-container);   /* #006E70 */
}
```

---

## 7. CSS Custom Properties (Copy-Paste Ready)

```css
:root {
  /* ── Primary ── */
  --primary: #002869;
  --primary-container: #0B3D91;
  --on-primary: #FFFFFF;
  --on-primary-container: #8DADFF;
  --primary-fixed: #DAE2FF;
  --primary-fixed-dim: #B1C5FF;
  --inverse-primary: #B1C5FF;

  /* ── Secondary (Cyan / Healthy) ── */
  --secondary: #00696B;
  --secondary-container: #56F5F8;
  --on-secondary: #FFFFFF;
  --on-secondary-container: #006E70;
  --secondary-fixed: #5AF8FB;
  --secondary-fixed-dim: #2DDBDE;

  /* ── Tertiary (Deep Slate) ── */
  --tertiary: #142E42;
  --tertiary-container: #2C4459;
  --on-tertiary: #FFFFFF;
  --on-tertiary-container: #98B1CA;
  --tertiary-fixed: #CCE5FF;
  --tertiary-fixed-dim: #B0C9E3;

  /* ── Error (Cardiac Alerts ONLY) ── */
  --error: #BA1A1A;
  --error-container: #FFDAD6;
  --on-error: #FFFFFF;
  --on-error-container: #93000A;

  /* ── Surfaces ── */
  --background: #F7F9FC;
  --on-background: #191C1E;
  --surface: #F7F9FC;
  --surface-dim: #D8DADD;
  --surface-bright: #F7F9FC;
  --surface-container-lowest: #FFFFFF;
  --surface-container-low: #F2F4F7;
  --surface-container: #ECEEF1;
  --surface-container-high: #E6E8EB;
  --surface-container-highest: #E0E3E6;
  --surface-variant: #E0E3E6;
  --surface-tint: #345BAF;
  --on-surface: #191C1E;
  --on-surface-variant: #434652;

  /* ── Outlines ── */
  --outline: #747783;
  --outline-variant: #C4C6D3;

  /* ── Inverse ── */
  --inverse-surface: #2D3133;
  --inverse-on-surface: #EFF1F4;

  /* ── Typography ── */
  --font-headline: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-label: 'Inter', sans-serif;

  /* ── Spacing (8px grid) ── */
  --sp-1: 0.25rem;   /*  4px */
  --sp-2: 0.5rem;    /*  8px */
  --sp-3: 0.75rem;   /* 12px */
  --sp-4: 1rem;      /* 16px */
  --sp-6: 1.5rem;    /* 24px */
  --sp-8: 2rem;      /* 32px */
  --sp-10: 2.5rem;   /* 40px */
  --sp-12: 3rem;     /* 48px */
  --sp-16: 4rem;     /* 64px */
  --sp-20: 5rem;     /* 80px */
  --sp-24: 6rem;     /* 96px */

  /* ── Radii ── */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-ambient: 0px 12px 32px rgba(11, 61, 145, 0.08);
  --shadow-none: none;
}
```

---

## 8. Do's and Don'ts

### ✅ Do

- Use **asymmetrical layouts** — a sidebar that doesn't reach the bottom creates a custom feel.
- Use `--secondary` (Cyan) for all **"active" data visualizations**.
- Rely on the **8px grid** for all padding (24px, 32px, 64px).
- Use `--on-surface` (`#191C1E`) for text — **never** `#000000`.
- Define boundaries through **background color shifts**, not borders.

### ❌ Don't

- **Don't** use Red for anything other than a cardiac emergency.
- **Don't** use `1px` borders for sectioning — they create visual noise.
- **Don't** use solid black (`#000000`) — it breaks the soft premium contrast.
- **Don't** nest cards-in-cards with shadows — use surface tonal shifts instead.
- **Don't** use standard grey drop shadows — use blue-tinted ambient glows.
