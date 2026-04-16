# Project Structure Conventions

## Standard Directory Layout

```
project-root/
├── App.tsx                         # Root orchestrator component
├── index.ts                        # Expo entry: registerRootComponent(App)
├── app.json                        # Expo config (name, splash, icons, orientation)
├── tsconfig.json                   # TypeScript config (extends expo/tsconfig.base, strict: true)
├── package.json                    # Dependencies and scripts
├── CLAUDE.md                       # Claude Code project guidance
├── README.md                       # Project documentation (English)
├── .gitignore                      # Standard Expo ignores
├── assets/                         # Static assets managed by Expo
│   ├── icon.png                    # App icon
│   ├── adaptive-icon.png           # Android adaptive icon
│   ├── splash-icon.png             # Splash screen
│   └── favicon.png                 # Web favicon
└── src/                            # All application source code
    ├── types/                      # Shared TypeScript definitions
    │   └── [domain].ts             # Types, constants, color maps, utility functions
    ├── data/                       # Static/seed data
    │   └── [domain]Data.ts         # Initial datasets, mock data
    └── components/                 # Presentational React components
        ├── [Feature]Card.tsx       # List item cards
        ├── [Feature]List.tsx       # FlatList wrappers
        ├── [Feature]Detail.tsx     # Detail/preview panels
        ├── [Feature]FormModal.tsx  # Add/edit bottom-sheet modals
        └── [Confirm]Modal.tsx      # Confirmation dialogs
```

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Types file | `[domain].ts` | `pokemon.ts`, `recipe.ts` |
| Data file | `[domain]Data.ts` or `initial[Domain].ts` | `initialPokemon.ts` |
| Card component | `[Domain]Card.tsx` | `PokemonCard.tsx` |
| List component | `[Domain]List.tsx` | `PokemonList.tsx` |
| Detail component | `[Domain]Detail.tsx` | `PokemonDetail.tsx` |
| Form modal | `[Domain]FormModal.tsx` | `PokemonFormModal.tsx` |
| Confirm modal | `[Action]ConfirmModal.tsx` | `DeleteConfirmModal.tsx` |
| Search component | `SearchBar.tsx` | `SearchBar.tsx` |

## Types File Structure

Every domain types file follows this pattern:

```typescript
// 1. Main interface
export interface Pokemon {
  id: number;
  name: string;
  description: string;
  type: PokemonType;
  spriteId: number;
}

// 2. Union types for categories
export type PokemonType = 'fire' | 'water' | 'grass' | /* ... */;

// 3. Color/style maps
export const TYPE_COLORS: Record<PokemonType, string> = {
  fire: '#F08030',
  water: '#6890F0',
  // ...
};

// 4. Derived arrays from maps
export const POKEMON_TYPES: PokemonType[] = Object.keys(TYPE_COLORS) as PokemonType[];

// 5. Utility functions
export const getSpriteUrl = (spriteId: number) =>
  `https://example.com/sprites/${spriteId}.png`;
```

**Rules:**
- One types file per domain/feature
- Export everything — consumed by all components
- Color maps use `Record<UnionType, string>` for type safety
- Derive arrays from maps to keep single source of truth
- Utility functions live here if they depend on domain types

## Data File Structure

```typescript
import { Pokemon } from '../types/pokemon';

export const INITIAL_POKEMON: Pokemon[] = [
  { id: 1, name: 'Pikachu', /* ... */ },
  // ...
];
```

**Rules:**
- Import types from `../types/`
- Export as `const` array with explicit type annotation
- Use descriptive variable names: `INITIAL_[DOMAIN]`
- IDs must be unique within dataset

## When to Add New Directories

| Need | Location | When |
|------|----------|------|
| API calls | `src/services/` | When integrating external APIs |
| Custom hooks | `src/hooks/` | When logic reused across 2+ components |
| Navigation | `src/navigation/` | When adding multi-screen routing |
| Contexts | `src/contexts/` | When prop drilling exceeds 3 levels |
| Utils | `src/utils/` | When non-domain utility functions needed |
| Constants | `src/constants/` | When app-wide constants grow beyond types files |

**Do NOT create these directories preemptively.** Only add when the need is concrete.

## Package.json Standards

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

**tsconfig.json:**
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

Always enable `strict: true`. No exceptions.
