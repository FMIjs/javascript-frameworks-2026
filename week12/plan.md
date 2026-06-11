# D3 Basics — Advanced JavaScript Course

> Goal: Understand the *mental model* behind D3 before worrying about chart types.
> Every "aha!" moment in D3 traces back to the same 5 ideas below.

---

## The 5 Core Ideas

| # | Concept | One-liner |
|---|---------|-----------|
| 1 | **Selections** | Wrap DOM elements so you can manipulate them declaratively |
| 2 | **Data Join (enter / update / exit)** | D3 is a *sync engine* — keep the DOM aligned with your data |
| 3 | **Scales** | Pure functions that map a data domain → a visual range |
| 4 | **Axes & the Margin Convention** | Turn scales into readable axes; give them breathing room |
| 5 | **Transitions & Events** | Animate and respond to user input without re-rendering everything |

---

## Project Structure

```
d3-basics/
├── plan.md
├── task1/ ← Selections & DOM Manipulation
│ ├── task1.ts
│ └── task1-helper.ts
├── task2/ ← Data Join (enter / update / exit)
│ ├── task2.ts
│ └── task2-helper.ts
├── task3/ ← Scales (linear, band, ordinal, time)
│ ├── task3.ts
│ └── task3-helper.ts
├── task4/ ← Axes + Margin Convention → Bar Chart
│ ├── task4.ts
│ └── task4-helper.ts
└── task5/ ← Transitions & Events → Live-updating Chart
├── task5.ts
└── task5-helper.ts
```

---

## Task Breakdown

### Task 1 — Selections & DOM Manipulation
**The question answered:** How does D3 talk to the DOM?

- `d3.select` vs `d3.selectAll`
- Method chaining (`.attr`, `.style`, `.text`, `.classed`)
- Appending and removing elements
- Understanding that selections are *lazy* wrappers, not live queries
- The `(d, i)` callback pattern — every accessor gets `(datum, index, nodes)`

**Deliverable:** A function that takes an array of strings and renders
them as `<li>` elements inside a `<ul>`, with alternating colours via `.classed`.

---

### Task 2 — The Data Join (enter / update / exit)
**The question answered:** How does D3 stay in sync when data changes?

- `selection.data(array)` — binding data to elements
- The three sub-selections: **enter**, **update**, **exit**
- `.join("element")` — the modern shorthand
- `.join(enter, update, exit)` — explicit control
- Key functions: why index-as-identity breaks on sort/insert
- The golden rule: *D3 is a sync layer, not a drawing API*

**Deliverable:** A set of coloured circles bound to a number array.
Clicking a button adds/removes items and the DOM updates correctly
(new circles appear, removed ones disappear, survivors stay put).

---

### Task 3 — Scales
**The question answered:** How do you map data values to pixels (or colours)?

- `d3.scaleLinear()` — continuous → continuous (numbers → pixels)
- `d3.scaleBand()` — ordinal → continuous (categories → bar positions)
- `d3.scaleOrdinal()` — ordinal → ordinal (category → colour)
- `d3.scaleTime()` — Date → continuous
- `.domain()` / `.range()` — the two halves of every scale
- `.nice()` — round domain edges for cleaner axes
- `.clamp(true)` — prevent out-of-range output
- `d3.extent`, `d3.min`, `d3.max` — computing domains from data

**Deliverable:** A helper module that exports pre-built scales for a
sales dataset, and a task file that probes each scale with sample inputs
and logs the results — no SVG yet, just understanding the math.

---

### Task 4 — Axes + Margin Convention → First Real Chart
**The question answered:** How do you turn scales into a readable chart?

- The margin convention: `{ top, right, bottom, left }` →
  `innerWidth = width - left - right`
- Creating an `<svg>` and a translated `<g>` root group
- `d3.axisBottom(scale)` / `d3.axisLeft(scale)`
- Calling an axis on a selection: `g.call(axis)`
- Customising ticks: `.ticks()`, `.tickFormat()`, `.tickSize()`
- Putting it all together: a fully-labelled **bar chart** from the
  sales dataset

**Deliverable:** A complete, runnable bar chart SVG with both axes,
bar labels, and the margin convention applied correctly.

---

### Task 5 — Transitions & Events → Live-Updating Chart
**The question answered:** How do you animate changes and react to clicks?

- `selection.transition().duration(ms).ease(d3.easeCubicOut)`
- Animating attribute changes (height, opacity, colour)
- Staggered entry: `.delay((d, i) => i * 50)`
- Interrupting transitions cleanly
- `selection.on("click", handler)` / `"pointerenter"` / `"pointerleave"`
- Building a tooltip using an HTML `<div>` overlay
- The update loop: clicking a button re-binds new data →
  the join + transition handles everything

**Deliverable:** The bar chart from Task 4, extended with:
  1. Animated entry (bars grow from the baseline)
  2. A button that swaps the dataset (bars animate to new heights)
  3. A hover tooltip showing the exact value

---

## Key Mental Models to Hammer Home

### Selections are not the DOM
A selection is a thin wrapper. Calling `.attr()` on it *immediately*
mutates the real DOM. There is no virtual DOM, no diffing, no batching.

### Data join = synchronisation, not drawing