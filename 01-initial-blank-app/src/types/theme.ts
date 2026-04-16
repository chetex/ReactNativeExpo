export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  divider: string;
  inputBackground: string;
  inputBorder: string;
  selectedCard: string;
  headerBackground: string;
  headerTitle: string;
  headerSubtitle: string;
  overlayBackground: string;
  searchBarBackground: string;
}

export const LIGHT_THEME: ThemeColors = {
  background: '#ECEFF1',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#616161',
  textTertiary: '#757575',
  textDisabled: '#999999',
  divider: '#E0E0E0',
  inputBackground: '#F5F5F5',
  inputBorder: '#E0E0E0',
  selectedCard: '#FFF8E1',
  headerBackground: '#D32F2F',
  headerTitle: '#FFFFFF',
  headerSubtitle: '#FFCDD2',
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  searchBarBackground: '#FFFFFF',
};

export const DARK_THEME: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  surfaceElevated: '#2C2C2C',
  textPrimary: '#E0E0E0',
  textSecondary: '#AAAAAA',
  textTertiary: '#888888',
  textDisabled: '#666666',
  divider: '#333333',
  inputBackground: '#2C2C2C',
  inputBorder: '#444444',
  selectedCard: '#3E3520',
  headerBackground: '#8B1A1A',
  headerTitle: '#FFFFFF',
  headerSubtitle: '#FFCDD2',
  overlayBackground: 'rgba(0, 0, 0, 0.7)',
  searchBarBackground: '#2C2C2C',
};
