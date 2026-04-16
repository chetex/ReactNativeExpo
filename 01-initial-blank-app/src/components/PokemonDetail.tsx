import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Pokemon, TYPE_COLORS, getSpriteUrl } from '../types/pokemon';
import { useTheme } from '../contexts/ThemeContext';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PokemonDetail({ pokemon, onEdit, onDelete }: PokemonDetailProps) {
  const { colors } = useTheme();
  const color = TYPE_COLORS[pokemon.type];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderLeftColor: color },
      ]}
    >
      <Image
        source={{ uri: getSpriteUrl(pokemon.spriteId) }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{pokemon.name}</Text>
        <View style={[styles.typeBadge, { backgroundColor: color }]}>
          <Text style={styles.typeText}>{pokemon.type.toUpperCase()}</Text>
        </View>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>{pokemon.description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#1976D2' }]}
            onPress={onEdit}
          >
            <Text style={styles.actionBtnText}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#D32F2F' }]}
            onPress={onDelete}
          >
            <Text style={styles.actionBtnText}>🗑 Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  typeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  desc: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
});
