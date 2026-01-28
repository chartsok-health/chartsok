'use client';

import { AuthProvider } from '@/lib/AuthContext';
import { I18nProvider } from '@/lib/i18n';

export default function Providers({ children }) {
  return (
    <I18nProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </I18nProvider>
  );
}
