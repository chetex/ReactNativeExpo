import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { backgroundColor: colors.searchBarBackground }]}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Buscar por nombre, tipo o descripcion..."
          placeholderTextColor={colors.textDisabled}
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 ? (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Text style={[styles.clear, { color: colors.textDisabled }]}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    paddingHorizontal: 16,
    height: 48,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  clear: {
    fontSize: 18,
    paddingLeft: 8,
  },
});
