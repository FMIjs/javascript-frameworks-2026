# D3 Scales — Visual Demos Design

**Date:** 2026-06-11
**Task:** week12 / task3
**Goal:** Extend `task3.ts` with visual SVG demos for all four D3 scale types, replacing the current console.log-only probing.

---

## Canvas & Layout

- Single `<svg>` element, **800 × 580 px**
- Shared margin: `{ top: 20, right: 20, bottom: 20, left: 80 }`
- Inner width: 700px (800 - 80 - 20)
- Four horizontal rows stacked vertically, each ~120px tall, separated by 20px gaps
- Each row is a `<g>` translated to its vertical offset
- Each row has a bold gray label on the far left (using the left margin space)

---

## Row 1 — Linear Scale (`d3.scaleLinear`)

- **Domain:** `[0, d3.max(salesData)]`, nicely rounded with `.nice()`
- **Range:** `[0, innerWidth]` (pixels)
- **Visual:** A thin horizontal baseline. Sales data points rendered as circles (`r=5`), x-positioned by `linearScale(value)`. Value labels below each circle. Min/max domain values annotated at both ends of the baseline.

---

## Row 2 — Band Scale (`d3.scaleBand`)

- **Domain:** `["A", "B", "C", "D", "E"]`
- **Range:** `[0, innerWidth]`
- **Padding:** `0.2`
- **Visual:** Five colored rectangles (colors from `d3.schemeCategory10[i]`). Each rect: `x = bandScale(category)`, `width = bandScale.bandwidth()`, `height = 60px`. Category labels centered below each rect. The gap between bars makes padding visible.

---

## Row 3 — Ordinal Color Scale (`d3.scaleOrdinal`)

- **Domain:** `["A", "B", "C", "D", "E"]`
- **Range:** `d3.schemeCategory10`
- **Visual:** Five evenly-spaced circles (`r=20`), each filled by `colorScale(category)`. Category label and hex color string rendered below each circle.

---

## Row 4 — Time Scale (`d3.scaleTime`)

- **Domain:** `[new Date(2024, 0, 1), new Date(2024, 11, 31)]` (full year 2024)
- **Range:** `[0, innerWidth]`
- **Visual:** A horizontal baseline line. Monthly tick marks (12 ticks) with abbreviated month labels (e.g. "Jan", "Feb"). Four highlighted dots at Jan 1, Apr 1, Jul 1, Oct 1 showing exact date → pixel mappings with value labels.

---

## Implementation Notes

- All rows live in `task3.ts` — no new files needed
- Row labels ("Linear", "Band", "Ordinal", "Time") are `<text>` elements anchored to `x = -10` (left margin), `text-anchor = "end"`
- Colors for band scale use `d3.schemeCategory10` indexed by position
- The SVG height expands from 200px to 580px
- No axes (those are Task 4) — just raw visual demos of the scale mapping
