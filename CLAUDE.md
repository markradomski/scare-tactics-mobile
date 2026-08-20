@AGENTS.md

# Scare Tactics

An Expo (React Native) app, written from scratch in TypeScript. The main feature is
a Tinder-style swipeable deck of abrasive "accountability coach"
characters (Drill Instructor, Malcolm Tucker, Pennywise, etc.).

There is a companion Figma file (page: "Scare Tactics") with a full mobile
app prototype and a Design System page covering typography, colour, core
components (swipe card, swipe actions, coach header, persona message),
avatars, CTA buttons, patterns, textareas, and text bubbles. Treat Figma as
the source of truth for visual and component decisions — check it before
guessing at spacing, color, copy, or component structure.

## Stack

- Expo (managed workflow) + TypeScript, strict mode on. No `.js`/`.jsx` files.
- No CSS. Styling is `StyleSheet.create`, values sourced from design tokens.
- Swipeable card deck: web's Swiper library doesn't exist in React Native.
  Decide the gesture/animation approach (react-native-gesture-handler +
  react-native-reanimated is the standard choice) before building the deck —
  don't reach for a web-oriented swiper package.
- Navigation: Expo Router, file-based. Screens live in `app/`, one route file
  per screen. Don't put non-route helpers directly in `app/` — shared logic
  goes in `/components`, `/hooks`, etc. below, so Expo Router doesn't turn it
  into an accidental route.

## Commands

- `npx expo start` — start the dev server (Metro)
- `npx expo start --ios` / `--android` — launch directly in a simulator
- `npx tsc --noEmit` — typecheck
- `npx expo lint` — lint
- test: none yet

Verify UI changes on a simulator/device, not by inspecting code alone.

## Rules

- Match the Figma "Scare Tactics" page for anything visual — spacing, color,
  copy, component variants. Don't invent values.
- Don't reproduce persona voice-sample scripts or copyrighted content
  verbatim from any source. Character copy should stay original.
- Avatar assets: kebab-case filenames matching the persona's id/title.
- No `any`. Type props, state, and navigation params explicitly.

## Architecture

- Folder structure: `app/` (routes, Expo Router), `/components`,
  `/constants`, `/hooks`, `/types`
- One component per file. Named exports only.
- Every reusable Figma component gets its own file under `/components`.
- One screen per route file under `app/`; don't combine multiple screens in
  one file. Route files should stay thin — compose components from
  `/components`, keep logic in hooks, don't build screen UI inline in the
  route file.
- Keep components dumb — logic lives in hooks or at the screen level.
- Don't create state that isn't needed yet.

## Design Tokens

- Colour, spacing, and typography values live in `/constants/tokens.ts`,
  mirroring the Figma `persona` variable collection (Light/Dark modes) and
  text styles. Never hardcode hex values, pixel sizes, or font names inline
  in a component.
- Light/dark mode is resolved via a theme context wrapping `useColorScheme()`
  — this is the single source for which mode is active and which token
  values apply. Components read tokens through the theme context, not by
  branching on `useColorScheme()` directly.
- Styling is `StyleSheet.create` per component, built from token values.
  Inline style objects are only for values that must be computed at runtime
  (e.g. animated/gesture-driven positions).

## Behaviour

- Don't add dependencies without asking first.
- When unsure between two approaches, explain trade-offs before implementing.
- Ask before refactoring existing files.
