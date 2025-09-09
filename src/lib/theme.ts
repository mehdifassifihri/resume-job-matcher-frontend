export type Theme = 'dark' | 'light'

export interface ThemeTokens {
  primary: string
  accent: string
  background: string
  surface: string
  'surface-alt': string
  border: string
  'text-primary': string
  'text-secondary': string
  success: string
  warning: string
  danger: string
  info: string
}

export const themes: Record<Theme, ThemeTokens> = {
  dark: {
    primary: '#7C3AED',
    accent: '#06B6D4',
    background: '#0B1020',
    surface: '#111827',
    'surface-alt': '#0F172A',
    border: '#1F2937',
    'text-primary': '#FFFFFF',
    'text-secondary': '#94A3B8',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8'
  },
  light: {
    primary: '#7C3AED',
    accent: '#06B6D4',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    'surface-alt': '#F1F5F9',
    border: '#E2E8F0',
    'text-primary': '#0F172A',
    'text-secondary': '#64748B',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#38BDF8'
  }
}

export function getThemeTokens(theme: Theme): ThemeTokens {
  return themes[theme]
}

export function applyTheme(theme: Theme) {
  const tokens = getThemeTokens(theme)
  const root = document.documentElement
  
  // Appliquer les tokens CSS personnalisés
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  
  // Appliquer la classe de thème pour Tailwind CSS
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
}

