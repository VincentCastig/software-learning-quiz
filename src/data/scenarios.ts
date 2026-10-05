export interface ScenarioOption {
  id: string;
  text: string;
}

export interface Scenario {
  id: string;
  prompt: string;
  options: ScenarioOption[];
  correctOptionId: string;
  explanation: string;
}

// Topic: front-end accessibility judgment calls. Content is mine, written
// for this exercise — not pulled from a template.
export const scenarios: Scenario[] = [
  {
    id: "s1",
    prompt:
      "A form shows a validation error only by turning the input's border red. What's the best next step?",
    options: [
      { id: "a", text: "Leave it — a red border is a clear enough signal" },
      { id: "b", text: "Make the border darker red for better contrast" },
      {
        id: "c",
        text: "Add a visible text message describing the error, associated with the input via aria-describedby",
      },
      { id: "d", text: "Replace the border color change with a shake animation" },
    ],
    correctOptionId: "c",
    explanation:
      "Color alone excludes colorblind users and communicates nothing to screen reader users. A text message tied to the field with aria-describedby fixes both: it's visible to everyone and announced by assistive tech when the field receives focus or the error appears.",
  },
  {
    id: "s2",
    prompt:
      "You're building a dropdown of 6 simple options with no custom styling needs beyond the default. What should you reach for first?",
    options: [
      { id: "a", text: "A custom-built listbox using styled <div> elements" },
      { id: "b", text: "The native <select> element" },
      { id: "c", text: "A set of radio buttons disguised as a dropdown with CSS" },
      { id: "d", text: "A third-party dropdown library, regardless of the use case" },
    ],
    correctOptionId: "b",
    explanation:
      "Native <select> gets keyboard support, screen reader behavior, and mobile-native pickers for free, with zero extra code. A custom-built version only earns its cost when you need something the native element genuinely can't do — multi-select with rich previews, for example. Reaching for native first is the right default.",
  },
  {
    id: "s3",
    prompt:
      "A designer hands you a comp with a clickable card that opens a detail page. There's no button or link styling in the design — just a card that visually invites a click. How should you implement it?",
    options: [
      { id: "a", text: "A <div> with an onClick handler, styled to match the comp exactly" },
      {
        id: "b",
        text: "An <a> (or a <button> if it's an action rather than navigation) styled to match the comp, so it's keyboard-focusable and operable without a mouse",
      },
      { id: "c", text: "A <div> with a CSS cursor: pointer, which signals interactivity sufficiently" },
      { id: "d", text: "An <img> with an onClick handler" },
    ],
    correctOptionId: "b",
    explanation:
      "Visual design and semantics are separate concerns — you can style a real <a> or <button> to look exactly like the comp's card. A <div> with onClick looks right but is invisible to keyboard users and screen readers unless you manually bolt on tabIndex, a role, and key handlers, which just reimplements a worse version of the element that already does this.",
  },
  {
    id: "s4",
    prompt:
      "You're choosing body text color against a white background and want to meet WCAG AA contrast for normal-size text. What's the target ratio?",
    options: [
      { id: "a", text: "At least 2:1" },
      { id: "b", text: "At least 3:1" },
      { id: "c", text: "At least 4.5:1" },
      { id: "d", text: "Contrast ratio doesn't apply to body text, only headings" },
    ],
    correctOptionId: "c",
    explanation:
      "WCAG AA requires at least 4.5:1 contrast for normal-size text against its background (3:1 is the threshold for large text, 18pt+ or bold 14pt+). It's a concrete number worth knowing rather than eyeballing, since a lot of common 'light gray on white' text choices fail it.",
  },
  {
    id: "s5",
    prompt:
      "An image carousel on a landing page auto-advances every 4 seconds with no visible controls. What's the main accessibility concern?",
    options: [
      { id: "a", text: "Carousels are never accessible under any circumstances" },
      { id: "b", text: "Auto-advancing content with no way to pause it can be disorienting or impossible to read in time for users with cognitive or visual processing differences, and it should offer a pause control" },
      { id: "c", text: "The images need longer alt text to fix the issue" },
      { id: "d", text: "This only matters for users on slow connections" },
    ],
    correctOptionId: "b",
    explanation:
      "WCAG specifically calls out moving, auto-updating content as something users need to be able to pause, stop, or control the timing of. Without a pause control, someone who reads slower than 4 seconds per slide — or who's using a screen reader that's still announcing the previous slide — loses content involuntarily. A visible pause/stop control, or pausing on focus/hover, addresses it.",
  },
];
