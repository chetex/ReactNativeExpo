import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Pokemon, PokemonType, TYPE_COLORS, POKEMON_TYPES, getSpriteUrl } from '../types/pokemon';
import { useTheme } from '../contexts/ThemeContext';

interface PokemonFormModalProps {
  visible: boolean;
  editingPokemon: Pokemon | null;
  onClose: () => void;
  onSave: (data: { name: string; description: string; type: PokemonType; spriteId: number }) => void;
}

export default function PokemonFormModal({
  visible,
  editingPokemon,
  onClose,
  onSave,
}: PokemonFormModalProps) {
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<PokemonType>('normal');
  const [spriteId, setSpriteId] = useState('');

  useEffect(() => {
    if (editingPokemon) {
      setName(editingPokemon.name);
      setDesc(editingPokemon.description);
      setType(editingPokemon.type);
      setSpriteId(String(editingPokemon.spriteId));
    } else {
      setName('');
      setDesc('');
      setType('normal');
      setSpriteId('');
    }
  }, [editingPokemon, visible]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    if (!desc.trim()) {
      Alert.alert('Error', 'La descripcion es obligatoria');
      return;
    }
    const parsedSpriteId = parseInt(spriteId, 10) || Math.floor(Math.random() * 898) + 1;
    onSave({
      name: name.trim(),
      description: desc.trim(),
      type,
      spriteId: parsedSpriteId,
    });
  };

  const inputStyle = {
    backgroundColor: colors.inputBackground,
    color: colors.textPrimary,
    borderColor: colors.inputBorder,
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.overlay, { backgroundColor: colors.overlayBackground }]}
      >
        <View style={[styles.content, { backgroundColor: colors.surface }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {editingPokemon ? '✏️ Editar Pokemon' : '➕ Nuevo Pokemon'}
            </Text>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Nombre</Text>
            <TextInput
              style={[styles.input, inputStyle]}
              placeholder="Nombre del Pokemon"
              placeholderTextColor={colors.textDisabled}
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>Descripcion</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline, inputStyle]}
              placeholder="Descripcion del Pokemon"
              placeholderTextColor={colors.textDisabled}
              value={desc}
              onChangeText={setDesc}
              multiline
              numberOfLines={3}
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>Sprite ID (PokeAPI)</Text>
            <TextInput
              style={[styles.input, inputStyle]}
              placeholder="Ej: 25 para Pikachu (vacio = aleatorio)"
              placeholderTextColor={colors.textDisabled}
              value={spriteId}
              onChangeText={setSpriteId}
              keyboardType="numeric"
            />

            {spriteId ? (
              <Image
                source={{ uri: getSpriteUrl(parseInt(spriteId, 10) || 1) }}
                style={styles.preview}
                resizeMode="contain"
              />
            ) : null}

            <Text style={[styles.label, { color: colors.textSecondary }]}>Tipo</Text>
            <View style={styles.typeGrid}>
              {POKEMON_TYPES.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.typeOption,
                    { backgroundColor: TYPE_COLORS[t] },
                    type === t && {
                      opacity: 1,
                      borderWidth: 2,
                      borderColor: isDark ? '#FFF' : '#212121',
                    },
                  ]}
                  onPress={() => setType(t)}
                >
                  <Text style={[styles.typeText, type === t && styles.typeTextSelected]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    borderWidth: 1,
                  },
                ]}
                onPress={onClose}
              >
                <Text style={[styles.btnCancelText, { color: colors.textSecondary }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={handleSave}>
                <Text style={styles.btnSaveText}>
                  {editingPokemon ? 'Guardar cambios' : 'Anadir Pokemon'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  preview: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 8,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  typeOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    opacity: 0.5,
  },
  typeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  typeTextSelected: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnCancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
  btnSave: {
    backgroundColor: '#D32F2F',
    elevation: 2,
  },
  btnSaveText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
