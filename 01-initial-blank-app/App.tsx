import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Pokemon, PokemonType } from './src/types/pokemon';
import { INITIAL_POKEMON } from './src/data/initialPokemon';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import SearchBar from './src/components/SearchBar';
import PokemonDetail from './src/components/PokemonDetail';
import PokemonList from './src/components/PokemonList';
import PokemonFormModal from './src/components/PokemonFormModal';
import DeleteConfirmModal from './src/components/DeleteConfirmModal';

function AppContent() {
  const { mode, colors, toggleTheme } = useTheme();
  const isDark = mode === 'dark';

  const [pokemonList, setPokemonList] = useState<Pokemon[]>(INITIAL_POKEMON);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [formVisible, setFormVisible] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deletingPokemon, setDeletingPokemon] = useState<Pokemon | null>(null);

  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList;
    const q = searchQuery.toLowerCase();
    return pokemonList.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [pokemonList, searchQuery]);

  const handleOpenAdd = useCallback(() => {
    setEditingPokemon(null);
    setFormVisible(true);
  }, []);

  const handleOpenEdit = useCallback((pokemon: Pokemon) => {
    setEditingPokemon(pokemon);
    setFormVisible(true);
  }, []);

  const handleSave = useCallback(
    (data: { name: string; description: string; type: PokemonType; spriteId: number }) => {
      if (editingPokemon) {
        const updated = { ...editingPokemon, ...data };
        setPokemonList((prev) =>
          prev.map((p) => (p.id === editingPokemon.id ? updated : p))
        );
        if (selectedPokemon?.id === editingPokemon.id) {
          setSelectedPokemon(updated);
        }
      } else {
        const newId = Math.max(0, ...pokemonList.map((p) => p.id)) + 1;
        setPokemonList((prev) => [...prev, { id: newId, ...data }]);
      }
      setFormVisible(false);
    },
    [editingPokemon, selectedPokemon, pokemonList]
  );

  const handleRequestDelete = useCallback((pokemon: Pokemon) => {
    setDeletingPokemon(pokemon);
    setDeleteVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deletingPokemon) return;
    setPokemonList((prev) => prev.filter((p) => p.id !== deletingPokemon.id));
    if (selectedPokemon?.id === deletingPokemon.id) setSelectedPokemon(null);
    setDeleteVisible(false);
    setDeletingPokemon(null);
  }, [deletingPokemon, selectedPokemon]);

  const handleCancelDelete = useCallback(() => {
    setDeleteVisible(false);
    setDeletingPokemon(null);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <Text style={[styles.headerTitle, { color: colors.headerTitle }]}>⚡ Pokedex</Text>
            <Text style={[styles.headerSubtitle, { color: colors.headerSubtitle }]}>
              {pokemonList.length} Pokemon registrados
            </Text>
          </View>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.7}
            accessibilityLabel={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            accessibilityRole="button"
          >
            <Text style={styles.themeToggleIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onEdit={() => handleOpenEdit(selectedPokemon)}
          onDelete={() => handleRequestDelete(selectedPokemon)}
        />
      )}

      <PokemonList
        data={filteredList}
        selectedId={selectedPokemon?.id ?? null}
        onSelect={setSelectedPokemon}
        onEdit={handleOpenEdit}
        onDelete={handleRequestDelete}
      />

      <TouchableOpacity style={styles.fab} onPress={handleOpenAdd} activeOpacity={0.8}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <PokemonFormModal
        visible={formVisible}
        editingPokemon={editingPokemon}
        onClose={() => setFormVisible(false)}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        visible={deleteVisible}
        pokemon={deletingPokemon}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 54,
    paddingBottom: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextBlock: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  themeToggleIcon: {
    fontSize: 22,
  },
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
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '300',
    marginTop: -2,
  },
});
