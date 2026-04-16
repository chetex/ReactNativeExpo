# Styling Guide — Material Design for React Native

## Color System

### Application Colors

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#D32F2F` | Header, FAB, save buttons |
| Primary Light | `#FFCDD2` | Subtitle text on primary |
| Background | `#ECEFF1` | Screen background |
| Surface | `#FFFFFF` | Cards, modals, inputs |
| Text Primary | `#212121` | Headings, names |
| Text Secondary | `#616161` | Descriptions, labels |
| Text Tertiary | `#757575` | Card descriptions |
| Text Disabled | `#999999` | Placeholders, empty state |
| Divider | `#E0E0E0` | Borders, input outlines |
| Input Background | `#F5F5F5` | Text input fill |
| Selected Card | `#FFF8E1` | Highlighted list item |
| Edit Action | `#1976D2` | Edit buttons |
| Delete Action | `#D32F2F` | Delete buttons |

### Type/Category Color Maps

Define category colors as typed records:

```typescript
export const TYPE_COLORS: Record<CategoryType, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  // ...
};
```

Use consistently across: card left borders, badges, detail accents, modal accent bars, badge backgrounds.

## Border Radius Standards

| Element | Radius |
|---------|--------|
| Cards | `12` |
| Detail cards | `16` |
| Modals (centered) | `28` |
| Modals (bottom-sheet) | `24` (top only) |
| Input fields | `12` |
| Buttons (pill) | `20` |
| Type badges (large) | `12` |
| Type badges (small) | `8` |
| Search bar | `28` |
| FAB | `28` (half of 56) |
| Type selector pills | `16` |

**Always add `borderCurve: 'continuous'`** alongside borderRadius for iOS smooth corners.

## Shadow/Elevation

**Use CSS `boxShadow` syntax (modern):**

```tsx
// Cards
{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)' }

// Elevated cards / detail panels
{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)' }

// FAB
{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)' }

// Modals
{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)' }
```

**Legacy fallback (if boxShadow unavailable):**

```tsx
// Light elevation (cards)
elevation: 2,
shadowColor: '#000',
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.12,
shadowRadius: 3,

// Medium elevation (detail panels)
elevation: 3,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.15,
shadowRadius: 4,

// High elevation (FAB)
elevation: 6,
shadowColor: '#000',
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.3,
shadowRadius: 6,
```

## Spacing System

**Use `gap` for spacing between siblings. Use `padding` for insets.**

```tsx
// Parent handles spacing
<View style={{ padding: 16, gap: 12 }}>
  <Text>First</Text>
  <Text>Second</Text>
</View>
```

| Context | Value |
|---------|-------|
| Screen horizontal padding | `16-20` |
| Card internal padding | `12-16` |
| Modal internal padding | `24` |
| List item gap | `10` |
| Button row gap | `8-12` |
| Type grid gap | `6` |
| Content bottom padding (above FAB) | `100` |
| Header paddingTop (status bar) | `54` |

## Typography

**Hierarchy through weight and color, not size:**

```tsx
// Primary heading
{ fontSize: 28, fontWeight: 'bold', color: '#FFF' }      // Header title

// Section heading
{ fontSize: 22, fontWeight: 'bold', color: '#212121' }    // Detail name, modal title

// Card title
{ fontSize: 16, fontWeight: 'bold', color: '#212121' }    // List item name

// Body text
{ fontSize: 15, color: '#333' }                           // Input text, modal body

// Description
{ fontSize: 13, color: '#616161', lineHeight: 18 }        // Detail description

// Small text
{ fontSize: 12, color: '#757575', lineHeight: 16 }        // Card description

// Badge text
{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 }  // Type badges

// Subtitle
{ fontSize: 14, color: '#FFCDD2' }                        // Header subtitle
```

**Limit font size range.** Prefer 11-28px range. Use weight (600/bold) and grayscale colors for hierarchy.

## Component-Specific Styles

### Cards
```tsx
card: {
  flexDirection: 'row',
  backgroundColor: '#FFF',
  borderRadius: 12,
  padding: 12,
  borderLeftWidth: 5,
  borderLeftColor: typeColor,  // dynamic
  alignItems: 'center',
  // + shadow
}
```

### FAB (Floating Action Button)
```tsx
fab: {
  position: 'absolute',
  right: 20,
  bottom: 30,
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#D32F2F',
  alignItems: 'center',
  justifyContent: 'center',
  // + high shadow
}
```

### Bottom-Sheet Modal
```tsx
overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }
content: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' }
```

### Centered Dialog Modal
```tsx
overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 32 }
dialog: { backgroundColor: '#FFF', borderRadius: 28, width: '100%', maxWidth: 340, overflow: 'hidden' }
```

### Search Bar
```tsx
bar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 28, paddingHorizontal: 16, height: 48 }
```

### Type Badge
```tsx
badge: { alignSelf: 'flex-start', paddingHorizontal: 8-10, paddingVertical: 2-3, borderRadius: 8-12, backgroundColor: typeColor }
text: { color: '#FFF', fontSize: 10-11, fontWeight: '600', textTransform: 'capitalize' }
```

### Input Fields
```tsx
input: { backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#333', borderWidth: 1, borderColor: '#E0E0E0' }
```

## Gradients

Use native CSS gradient syntax, not third-party libraries:

```tsx
<View style={{ experimental_backgroundImage: 'linear-gradient(to bottom, #000, #fff)' }} />
```
