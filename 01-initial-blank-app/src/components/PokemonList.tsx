import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { useTheme } from '../contexts/ThemeContext';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  data: Pokemon[];
  selectedId: number | null;
  onSelect: (pokemon: Pokemon) => void;
  onEdit: (pokemon: Pokemon) => void;
  onDelete: (pokemon: Pokemon) => void;
}

export default function PokemonList({
  data,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: PokemonListProps) {
  const { colors } = useTheme();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          isSelected={selectedId === item.id}
          onPress={() => onSelect(item)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      )}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>🔎</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No se encontraron Pokemon
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
