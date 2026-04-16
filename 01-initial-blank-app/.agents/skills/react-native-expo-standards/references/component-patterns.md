# Component Patterns

## Three Component Categories

### 1. Orchestrator Components

Own all application state and CRUD logic. Pass data and callbacks to children.

```tsx
// App.tsx — orchestrator pattern
export default function App() {
  const [items, setItems] = useState<Item[]>(INITIAL_DATA);
  const [selected, setSelected] = useState<Item | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState<Item | null>(null);

  // Derived state
  const filtered = useMemo(() => { /* filter logic */ }, [items, query]);

  // CRUD handlers with useCallback
  const handleSave = useCallback((data: ItemData) => { /* ... */ }, [deps]);
  const handleDelete = useCallback(() => { /* ... */ }, [deps]);

  return (
    <View>
      <SearchBar value={query} onChangeText={setQuery} />
      {selected && <ItemDetail item={selected} onEdit={...} onDelete={...} />}
      <ItemList data={filtered} onSelect={setSelected} onEdit={...} onDelete={...} />
      <FormModal visible={formVisible} editing={editing} onSave={handleSave} onClose={...} />
      <DeleteModal visible={deleteVisible} item={deleting} onConfirm={handleDelete} onCancel={...} />
    </View>
  );
}
```

**Rules:**
- One orchestrator per screen/feature
- All `useState` lives here
- All mutation logic lives here
- Wrap handlers in `useCallback`
- Derive filtered/computed data with `useMemo`

### 2. Presentational Components

Pure props → JSX. No state. No side effects.

```tsx
interface ItemCardProps {
  item: Item;
  isSelected: boolean;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ItemCard({ item, isSelected, onPress, onEdit, onDelete }: ItemCardProps) {
  const color = TYPE_COLORS[item.type];
  return (
    <Pressable
      style={[styles.card, { borderLeftColor: color }, isSelected && styles.selected]}
      onPress={onPress}
    >
      {/* render content */}
    </Pressable>
  );
}
```

**Rules:**
- Explicit `interface` for all props (not inline)
- Destructure props in function signature
- Derive visual values from props (colors, styles) — no state
- Use `Pressable`, never `TouchableOpacity`
- Export as default

### 3. Form Modal Components

Exception: may hold local form state synced from props via `useEffect`.

```tsx
interface FormModalProps {
  visible: boolean;
  editingItem: Item | null;
  onClose: () => void;
  onSave: (data: ItemFormData) => void;
}

export default function FormModal({ visible, editingItem, onClose, onSave }: FormModalProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  // Sync form state from editing prop
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDesc(editingItem.description);
    } else {
      setName('');
      setDesc('');
    }
  }, [editingItem, visible]);

  const handleSave = () => {
    if (!name.trim()) { Alert.alert('Error', 'Name required'); return; }
    onSave({ name: name.trim(), description: desc.trim() });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* form fields + buttons */}
    </Modal>
  );
}
```

**Rules:**
- Local state ONLY for form fields
- `useEffect` syncs from `editingItem` prop when modal opens
- Validation happens locally, save delegates to parent via `onSave`
- Reset form when `editingItem` is null (add mode)

## Props Interface Design

**Standard callback naming:**

| Action | Prop Name | Type |
|--------|-----------|------|
| Tap item | `onPress` | `() => void` |
| Select for detail | `onSelect` | `(item: T) => void` |
| Edit action | `onEdit` | `(item: T) => void` or `() => void` |
| Delete action | `onDelete` | `(item: T) => void` or `() => void` |
| Save form | `onSave` | `(data: FormData) => void` |
| Close modal | `onClose` | `() => void` |
| Cancel action | `onCancel` | `() => void` |
| Confirm action | `onConfirm` | `() => void` |
| Text change | `onChangeText` | `(text: string) => void` |

**When to use `(item: T) => void` vs `() => void`:**
- List components receive `(item: T) => void` — they bind item in renderItem
- Detail/modal components receive `() => void` — parent already knows which item

## List Component Pattern

Wrap `FlatList` with domain-specific props:

```tsx
interface ListProps {
  data: Item[];
  selectedId: number | null;
  onSelect: (item: Item) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function ItemList({ data, selectedId, onSelect, onEdit, onDelete }: ListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ItemCard
          item={item}
          isSelected={selectedId === item.id}
          onPress={() => onSelect(item)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      )}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<EmptyState />}
    />
  );
}
```

## Compound Component Pattern

For reusable UI elements with flexible composition:

```tsx
function Button({ children }: { children: React.ReactNode }) {
  return <Pressable style={styles.btn}>{children}</Pressable>;
}

function ButtonText({ children }: { children: React.ReactNode }) {
  return <Text style={styles.btnText}>{children}</Text>;
}

function ButtonIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Usage
<Button>
  <ButtonIcon><SaveIcon /></ButtonIcon>
  <ButtonText>Save</ButtonText>
</Button>
```

Prefer compound components over polymorphic `children: string | ReactNode` props.

## Delete Confirmation Modal Pattern

Always use custom Material Design dialog, never native `Alert.alert`:

```tsx
interface DeleteConfirmProps {
  visible: boolean;
  item: Item | null;
  onCancel: () => void;
  onConfirm: () => void;
}
```

**Required visual elements:**
- Centered dialog with `borderRadius: 28`
- Colored accent bar at top (item's type color)
- Item image/icon (faded, `opacity: 0.4`)
- Bold title
- Warning message with item name highlighted
- Divider line
- Two buttons: gray Cancel (left) + red Confirm (right)
- `animationType="fade"` (not "slide")
