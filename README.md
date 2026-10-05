# Software Learning Course

A small React + TypeScript + Vite exercise: a learner reads a scenario,
picks the best answer from a set of options, submits it, and sees
correct/incorrect plus an explanation before moving on. Ends on a
completion screen with a score and a restart option.

Topic: front-end accessibility judgment calls (5 scenarios) — picked
because it's content I can write accurately and specifically without
padding, not because the exercise needed a particular subject.

## 1. Install and run

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to http://localhost:5173).

`npm run build` produces a type-checked production build in `dist/`.

## 2. Component and state decisions

**Data is separate from display.** `src/data/scenarios.ts` holds every
question, its options, the correct option ID, and its explanation — plain
data, no JSX. Swapping in a different question set means editing that one
file; no component changes.

**Three small, single-purpose components:**
- `ScenarioCard` — renders one scenario's prompt and options, reports
  `onSelect`/`onSubmit` events up. It doesn't know what happens after
  submit.
- `Feedback` — renders correct/incorrect and the explanation, shown only
  after submission. Separated from `ScenarioCard` so each component has
  exactly one job: ask the question, or report the result.
- `CompletionScreen` — score and restart, shown once the learner is past
  the last scenario.

**State lives in one place: `App`.** Four pieces — `index`,
`selectedOptionId`, `submitted`, `correctCount` — own the entire activity.
I didn't reach for Context or a reducer: the flow is linear (one scenario
at a time, one direction), and a context provider for four `useState`
calls in a single-screen app would be overhead with no real payoff. If
the activity grew branching paths, needed to persist progress across a
refresh, or needed this state shared across more than one screen, that's
the point I'd introduce one.

**Preventing answer changes after submit** is handled at two levels: the
radio inputs are `disabled` once `submitted` is true, and `handleSelect`
in `App` also no-ops if `submitted` is already true — so it's enforced in
the state logic itself, not just hidden visually.

**Accessibility:** options are real `<input type="radio">` elements
inside a `<fieldset>`/`<legend>`, so the question-to-options relationship
is explicit for screen readers and the whole thing is keyboard-operable
(Tab between options, Space to select, Tab to Submit, Enter to activate)
with no custom key handling needed. The feedback region uses
`aria-live="polite"` so it's announced automatically without moving
focus, and correct/incorrect is shown as a text label, not color alone.
Focus outlines are never suppressed.

**Mobile:** plain, mobile-first CSS, no UI library. Checked at a 375–420px
width specifically, not just resized from desktop.

## 3. What I'd improve with more time

- Keyboard focus management on "Next question" — right now it's just
  `autoFocus` on the Continue button, which works but I'd want to verify
  it against a screen reader, not just visually.
- A loading/empty state for the (currently nonexistent) case of an empty
  question set, mostly as a habit for anything that will eventually read
  from an API.
- A way to review *which* questions were missed on the completion screen,
  not just the score — I scoped it out to keep this small per the
  instructions, but it's the first thing I'd add next.
- Unit tests for the scoring logic and the "can't change answer after
  submit" behavior.

## 4. AI tool use

I used Claude (Anthropic) as a coding assistant for this exercise —
scaffolding the Vite/TS project, drafting the components and the
scenario content, and drafting this README. I reviewed every file for
correctness, ran the TypeScript build (`tsc -b`) and the Vite production
build to confirm there were no type or build errors, and manually tested
the interaction flow (selecting an option, submitting, confirming the
answer locks, keyboard-only navigation through a full run, and the
restart flow) before treating it as done. I did not use it to generate
the accessibility content's factual claims (contrast ratios, WCAG
guidance) without independently knowing them to be correct.
