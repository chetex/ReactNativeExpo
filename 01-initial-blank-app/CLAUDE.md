# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npx expo start       # Start dev server (press i=iOS, a=Android, w=Web)
npx tsc --noEmit     # Type check (no lint or test tooling configured)
```

No test runner, linter, or formatter is configured.

## Project Structure

```
01-initial-blank-app/
├── index.ts                              # Expo entry point — registerRootComponent(App)
├── App.tsx                               # Root component — all state + CRUD logic orchestrator
├── app.json                              # Expo config (name, splash, icons, orientation)
├── tsconfig.json                         # Extends expo/tsconfig.base, strict: true
├── package.json                          # Dependencies: expo ~54, react 19.1, RN 0.81.5
├── package-lock.json                     # Lockfile
├── README.md                             # English docs: features, architecture, install guide
├── CLAUDE.md                             # This file
├── .gitignore                            # Standard Expo ignores
├── assets/                               # Static assets (Expo defaults)
│   ├── adaptive-icon.png                 # Android adaptive icon
│   ├── icon.png                          # App icon
│   ├── splash-icon.png                   # Splash screen icon
│   └── favicon.png                       # Web favicon
└── src/                                  # Application source code
    ├── types/
    │   └── pokemon.ts                    # Shared types + constants
    │                                     #   - Pokemon interface (id, name, description, type, spriteId)
    │                                     #   - PokemonType union (15 types)
    │                                     #   - TYPE_COLORS record (type → hex color)
    │                                     #   - POKEMON_TYPES array
    │                                     #   - getSpriteUrl(spriteId) → PokeAPI artwork URL
    ├── data/
    │   └── initialPokemon.ts             # Seed data — 15 Pokemon with Spanish descriptions
    │                                     #   Pikachu, Charmander, Squirtle, Bulbasaur, Jigglypuff,
    │                                     #   Gengar, Machop, Eevee, Dragonite, Abra, Geodude,
    │                                     #   Caterpie, Nidoran, Sandshrew, Lapras
    └── components/
        ├── SearchBar.tsx                 # Pill-shaped search input with clear button
        │                                 #   Props: value, onChangeText
        │                                 #   Filters by name, type, or description
        ├── PokemonCard.tsx               # List item — sprite + name + type badge + description
        │                                 #   Props: pokemon, isSelected, onPress, onEdit, onDelete
        │                                 #   Type-colored left border, yellow highlight when selected
        ├── PokemonList.tsx               # FlatList wrapper with empty state
        │                                 #   Props: data, selectedId, onSelect, onEdit, onDelete
        │                                 #   Renders PokemonCard for each item
        ├── PokemonDetail.tsx             # Selected Pokemon panel — large artwork + info + actions
        │                                 #   Props: pokemon, onEdit, onDelete
        │                                 #   Shows 110x110 sprite, type badge, full description
        ├── PokemonFormModal.tsx           # Bottom-sheet modal for add/edit
        │                                 #   Props: visible, editingPokemon, onClose, onSave
        │                                 #   Fields: name, description, spriteId (with preview), type grid
        │                                 #   Uses useEffect to sync form state with editingPokemon
        └── DeleteConfirmModal.tsx         # Material Design centered dialog for delete confirmation
                                          #   Props: visible, pokemon, onCancel, onConfirm
                                          #   Shows faded sprite, type-colored accent bar, warning text
                                          #   Replaced native Alert.alert for better UX
```

## Architecture

Pokedex CRUD app — React Native 0.81.5 + Expo 54 + TypeScript (strict mode).

**Entry flow:** `index.ts` → `registerRootComponent(App)` → `App.tsx`

**App.tsx** is the single state owner. All CRUD logic lives here. Child components are presentational — they receive data and emit callbacks via props.

### Data Flow

```
App.tsx (state: pokemonList, selectedPokemon, formVisible, deleteVisible)
│
├── SearchBar           ← value, onChangeText
├── PokemonDetail       ← pokemon, onEdit, onDelete
├── PokemonList
│   └── PokemonCard     ← pokemon, isSelected, onPress, onEdit, onDelete
├── PokemonFormModal    ← visible, editingPokemon, onClose, onSave
└── DeleteConfirmModal  ← visible, pokemon, onCancel, onConfirm
```

### Key Architectural Patterns

- No navigation library — single screen with conditional detail panel
- No external UI library — Material Design styling via raw `StyleSheet` (shadows, elevation, border radius)
- No state management library — `useState` + `useCallback` + prop drilling
- Pokemon images loaded from PokeAPI sprites (GitHub-hosted, no local assets)
- All UI text is in Spanish
- 15 Pokemon types with canonical colors used consistently across cards, badges, and modals
- Delete flow uses custom Material Design modal instead of native `Alert.alert`

### Design System

- **Primary color:** `#D32F2F` (Pokeball red) — header, FAB, save buttons
- **Background:** `#ECEFF1` (light gray)
- **Cards:** white `#FFF`, rounded 12px, elevation shadows, type-colored left border (5-6px)
- **Type colors:** defined in `src/types/pokemon.ts` TYPE_COLORS record
- **Modals:** form = bottom-sheet (slide), delete = centered dialog (fade), both with 24-28px border radius
