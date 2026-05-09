# Project rules

## No single-letter identifier names

Never use single-letter parameter or variable names, even in short lambdas. This includes the common conventions you might be tempted to keep:

- `state` instead of `s` (selectors, reducers, machine selectors)
- `event` instead of `e` (event handlers, machine actions)
- `todo` / `item` / `user` instead of `t` / `i` / `u` (iteratees in `.map`, `.filter`, `.find`, etc.)
- `error` instead of `err`, `request` instead of `req`, `response` instead of `res`

**Why:** house style — readability over keystrokes. Even when scope is tiny, full names make the intent obvious without relying on type inference, IDE hover, or convention recall.

**How to apply:** when writing or editing any `.ts` / `.tsx` file in this project, expand single-letter parameters in arrow functions, callbacks, and selectors to their full noun form. The only exceptions are well-established mathematical or coordinate names (`x`, `y`, `z` for coordinates; `i`, `j` only inside numeric `for` loops where no semantic name fits). When in doubt, use the longer name.

## XState: don't promote derived predicates to FSM states

State nodes are for **modes that change which events are valid or which phase the user is in**. They are not for any predicate that can be computed from context. If a condition is a pure function of `context` (e.g. `todos.length === 0`, `draft.trim() === ''`, `selectedItems.size > 0`), keep it as a derivation in the component or as a guard on a transition — do not add a corresponding state node.

**Why:** adding a state node for a derivable condition creates two sources of truth (the data and the FSM node) that can desync, which is exactly the failure mode FSMs exist to prevent. The state graph should make invalid states unrepresentable; redundant nodes do the opposite.

**How to apply:** before adding a state node, ask "does this change what events are valid, or only what the user sees?" If only what they see, derive it in the component (`todos.length === 0 ? <empty/> : <list/>`). State nodes are reserved for things like `idle`/`editing`, `loading`/`loaded`/`error`, `submitting`/`done` — phases that gate behavior, not predicates over data. When emptiness genuinely gates a transition (e.g. a `retry` event only valid while empty), use a `guard` on the transition rather than a separate state node.
