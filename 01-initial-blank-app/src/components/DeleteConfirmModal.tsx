import React from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native';
import { Pokemon, TYPE_COLORS, getSpriteUrl } from '../types/pokemon';
import { useTheme } from '../contexts/ThemeContext';

interface DeleteConfirmModalProps {
  visible: boolean;
  pokemon: Pokemon | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  visible,
  pokemon,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  const { colors } = useTheme();

  if (!pokemon) return null;

  const color = TYPE_COLORS[pokemon.type];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={[styles.overlay, { backgroundColor: colors.overlayBackground }]}>
        <View style={[styles.dialog, { backgroundColor: colors.surface }]}>
          <View style={[styles.accent, { backgroundColor: color }]} />

          <View style={styles.spriteContainer}>
            <Image
              source={{ uri: getSpriteUrl(pokemon.spriteId) }}
              style={styles.sprite}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.title, { color: colors.textPrimary }]}>Eliminar Pokemon</Text>

          <Text style={[styles.message, { color: colors.textSecondary }]}>
            Estas a punto de eliminar a{' '}
            <Text style={[styles.pokemonName, { color }]}>{pokemon.name}</Text>.
            {'\n'}Esta accion no se puede deshacer.
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[
                styles.cancelBtn,
                { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder },
              ]}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm} activeOpacity={0.7}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  dialog: {
    borderRadius: 28,
    width: '100%',
    maxWidth: 340,
    overflow: 'hidden',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  accent: {
    height: 6,
    width: '100%',
  },
  spriteContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  sprite: {
    width: 90,
    height: 90,
    opacity: 0.4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 28,
    marginTop: 8,
    marginBottom: 20,
  },
  pokemonName: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
  },
  buttons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
  },
});
