import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Pokemon, TYPE_COLORS, getSpriteUrl } from '../types/pokemon';
import { useTheme } from '../contexts/ThemeContext';

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PokemonCard({
  pokemon,
  isSelected,
  onPress,
  onEdit,
  onDelete,
}: PokemonCardProps) {
  const { colors } = useTheme();
  const color = TYPE_COLORS[pokemon.type];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderLeftColor: color },
        isSelected && { backgroundColor: colors.selectedCard, elevation: 4 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: getSpriteUrl(pokemon.spriteId) }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{pokemon.name}</Text>
        <View style={[styles.typeBadge, { backgroundColor: color }]}>
          <Text style={styles.typeText}>{pokemon.type}</Text>
        </View>
        <Text style={[styles.desc, { color: colors.textTertiary }]} numberOfLines={2}>
          {pokemon.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
          <Text style={styles.actionIcon}>🗑</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  typeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  desc: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  actionBtn: {
    padding: 6,
  },
  actionIcon: {
    fontSize: 18,
  },
});
