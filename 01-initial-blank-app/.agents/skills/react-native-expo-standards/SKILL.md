---
name: react-native-expo-standards
description: "Standards and best practices for React Native + Expo + TypeScript projects. This skill should be used when creating new RN/Expo apps, adding features, refactoring components, or reviewing code quality. Combines Vercel's 35+ performance rules with proven component architecture patterns from production apps. Covers project structure, component design, styling, state management, list performance, and Material Design implementation."
license: MIT
progressive_disclosure:
  entry_point:
    summary: "Enforce React Native + Expo + TypeScript standards across project structure, components, styling, state, and performance"
    when_to_use: "When creating, extending, or refactoring React Native Expo apps. Activate on new component creation, CRUD features, list views, modal dialogs, or styling decisions."
    quick_start: "1. Follow project structure conventions 2. Apply component architecture (orchestrator + presentational) 3. Use correct styling patterns 4. Apply state management rules 5. Optimize lists and rendering"
  references:
    - project-structure.md
    - component-patterns.md
    - styling-guide.md
    - performance-rules.md
    - crud-architecture.md
---

# React Native Expo Standards

## Overview

Enforce consistent, performant React Native + Expo + TypeScript patterns across all projects. Combines Vercel's performance optimization rules (35+ rules, 13 categories) with battle-tested component architecture patterns from CRUD applications using Material Design.

## When to Use This Skill

Activate when:
- Creating new React Native Expo project or feature
- Adding components, screens, or CRUD operations
- Building list views or modal dialogs
- Making styling decisions (colors, shadows, spacing)
- Refactoring existing components
- Reviewing code for performance or architecture issues

## Core Principles

1. **Orchestrator + Presentational** — Root component owns state, children receive props and emit callbacks
2. **Type-First** — Shared types, constants, and helpers in `src/types/`. Import everywhere.
3. **Pressable over Touchable** — Never use `TouchableOpacity`/`TouchableHighlight`. Use `Pressable`.
4. **Custom modals over native alerts** — Material Design dialogs for destructive actions, not `Alert.alert`
5. **Derive, don't store** — State is minimal truth. Compute everything else.
6. **Ternary over &&** — Never `{value && <Component />}` with potentially falsy values. Use ternary or `!!`.
7. **gap over margin** — Use `gap` on parent, not `marginBottom` on children
8. **Virtualize all lists** — `FlatList` minimum. `FlashList`/`LegendList` for large datasets.

## Project Structure Convention

```
project-root/
├── App.tsx                    # Orchestrator — state + CRUD logic + composition
├── index.ts                   # registerRootComponent(App)
├── app.json                   # Expo configuration
├── tsconfig.json              # extends expo/tsconfig.base, strict: true
└── src/
    ├── types/                 # Shared types, constants, color maps, helpers
    ├── data/                  # Seed data, mock data, static datasets
    └── components/            # Presentational components (props in, callbacks out)
```

→ [Complete structure conventions](./references/project-structure.md)

## Component Architecture

**Three component categories:**

| Category | State? | Location | Example |
|----------|--------|----------|---------|
| Orchestrator | Yes — owns all state | `App.tsx` or screen file | `App` |
| Presentational | No — props only | `src/components/` | `PokemonCard` |
| Form Modal | Local form state only | `src/components/` | `PokemonFormModal` |

**Props pattern:** Data flows down, events flow up via callbacks.

```tsx
// Presentational — pure props
interface CardProps {
  item: Item;
  isSelected: boolean;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
```

→ [Complete component patterns](./references/component-patterns.md)

## Styling Standards

**Material Design essentials:**
- `borderRadius: 12-28` for cards/modals, `borderCurve: 'continuous'`
- `boxShadow` CSS syntax over legacy `shadowColor`/`elevation`
- `gap` for spacing, `padding` for insets
- Type-based color systems with `Record<Type, string>` maps
- Consistent font weight hierarchy over font size variation

→ [Complete styling guide](./references/styling-guide.md)

## Performance Rules (Critical)

**CRITICAL — prevents crashes:**
- Never `{value && <JSX />}` with string/number — use ternary
- Always wrap strings in `<Text>`

**HIGH — list performance:**
- Virtualize all lists (FlatList/FlashList/LegendList)
- Hoist callbacks with `useCallback`, no inline functions in renderItem
- Stable `keyExtractor` returning strings
- Memoize expensive list items with `React.memo`

**MEDIUM — state:**
- Minimal state, derive everything else with `useMemo`
- Use dispatch updaters: `setState(prev => ...)` for dependent state
- State represents ground truth, not visual values

→ [Complete performance rules](./references/performance-rules.md)

## CRUD Architecture

Standard pattern for data management features:

| Operation | UI Element | Pattern |
|-----------|-----------|---------|
| Create | FAB → bottom-sheet modal | `onSave` callback to orchestrator |
| Read | FlatList + detail panel | Selected item state in orchestrator |
| Update | Same modal, `editingItem` prop | `useEffect` syncs form from prop |
| Delete | Centered Material dialog | Separate `deleteVisible` + `deletingItem` state |

→ [Complete CRUD architecture](./references/crud-architecture.md)

## Quick Reference — Do / Don't

| Don't | Do |
|-------|-----|
| `TouchableOpacity` | `Pressable` |
| `Alert.alert` for destructive ops | Custom Material Design modal |
| `{count && <Text />}` | `{count ? <Text /> : null}` |
| `shadowColor`/`elevation` | `boxShadow: '0 2px 8px rgba(0,0,0,0.1)'` |
| `marginBottom` on children | `gap` on parent |
| Inline objects in `renderItem` | Extract to component with `React.memo` |
| Multiple font sizes for hierarchy | Weight + color variation |
| `ScrollView` + `.map()` | `FlatList` / `FlashList` |
| State for derived values | `useMemo` / direct computation |
| `useState` in presentational | Props + callbacks from orchestrator |

## Navigation

### Structure & Setup
- **[Project Structure](./references/project-structure.md)** — Directory conventions, file naming, type organization. Load when starting new project or adding modules.

### Components
- **[Component Patterns](./references/component-patterns.md)** — Orchestrator/presentational split, props design, modal patterns, compound components. Load when creating components.

### Visual Design
- **[Styling Guide](./references/styling-guide.md)** — Material Design implementation, color systems, shadow/elevation, spacing, typography. Load when styling components.

### Performance
- **[Performance Rules](./references/performance-rules.md)** — Rendering safety, list optimization, state patterns, animation best practices. Load when optimizing or reviewing code.

### Data Management
- **[CRUD Architecture](./references/crud-architecture.md)** — Full create/read/update/delete pattern, modal flows, state shape, delete confirmation. Load when building data features.

## Key Reminders

- **Types shared globally** — `src/types/` is single source for interfaces, constants, helpers
- **One orchestrator per screen** — Holds all state, passes props down
- **Custom modals always** — No native alerts for user-facing confirmations
- **Pressable everywhere** — Legacy Touchable components are banned
- **Ternary for conditionals** — Falsy `&&` causes production crashes in RN
- **gap not margin** — Cleaner layouts, fewer styles
- **Derive don't store** — If computable from state, compute it

## Red Flags — STOP

STOP when:
- "Let me add TouchableOpacity" → Use Pressable
- "I'll use Alert.alert for delete" → Build Material Design modal
- `{items.length && <List />}` → Crashes when length is 0
- Putting CRUD state in child components → Move to orchestrator
- `ScrollView` + `.map()` for data lists → Use FlatList
- Inline style objects in renderItem → Extract + memoize
- `shadowColor` + `shadowOffset` → Use boxShadow CSS string
- Multiple useState for values derivable from one state → useMemo

**ALL of these mean: STOP. Apply the correct pattern.**
