# Pokédex 🐾

A modern **React Native** Pokédex built with **Expo**, featuring a bottom-sheet type filter, animated grid, and a data-fetching layer that actually handles loading, error, and cache states. With Tailwind (NativeWind) + a typed API client.

> **Stack:** Expo 51 · React Native 0.74 · expo-router · NativeWind · TanStack Query · urql (GraphQL) · Zustand · zod · reanimated · gorhom bottom-sheet · flash-list · expo-image · Lottie

## Why this project

This is my proof that I can build a *mobile-native* experience in the React ecosystem — not just a web page that happens to run on a phone. It's type-graph-QL against a real API, with a bottom sheet that filters Pokémon by type, animated pressables, and a FlashList that stays smooth on a grid of hundreds of entries.

## Highlights

- **expo-router** — file-based routing, typed links.
- **NativeWind + Tailwind** — utility styling on native, so the styling approach matches a modern web app.
- **TanStack Query** — server-state with caching, loading/error states, and revalidation. No hand-rolled `useEffect` data fetching.
- **urql (GraphQL)** — a typed query layer; the app talks to a GraphQL backend rather than ad-hoc REST.
- ****Zustand** — minimal client state where local identity matters.
- **gorhom bottom-sheet** — a bottom sheet with a `type-selection-sheet` that filters the whole list — a genuinely nice UX pattern.
- **@shopify/flash-list** — virtualized, performant grid even at hundreds of items.
- **reanimated** — smooth animations (`animated-pressable`, transitions).
- **expo-image** — optimized/placeholder-aware image loading.
- **Lottie + expo-sqlite + async-storage** — motion, persistence, and caching.

## Architecture

```
app/                 # expo-router routes (+layout, +not-found, index)
components/
├── primitives/      # slot, types
├── sheets/          # bottom-sheet-modal, type-selection-sheet
├── ui/              # button, input, text
├── poke-card        # grid card
├── type-badge
├── loader
└── animated-pressable
```

## Getting started

```bash
npm install
npx expo start
```

Requires Node 20+. Run in Expo Go or a simulator. Works on Android, iOS, and web (`react-native-web`).

## What it demonstrates

- Modern React Native (Expo 51, expo-router, NativeWind)
- Real server-state management (TanStack Query + GraphQL)
- Performance on lists (FlashList) and motion (reanimated)
- A polished, sheet-driven interaction model

---

*Built by [Alisson "SkyLissh" Hernandez] — React Native, TypeScript, and cross-platform mobile. This is a personal portfolio project.*
