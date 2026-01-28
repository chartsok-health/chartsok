'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import { I18nProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/AuthContext';

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
