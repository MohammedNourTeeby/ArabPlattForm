// app/providers.tsx
'use client';
import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { MediaRecorderProvider } from '@/contexts/MediaRecorderContext';
import { LicenseProvider } from './DashBoardAdmin/components/Saas/LicenseContext';
import { ConfirmProvider } from './DashBoardAdmin/components/Saas/ConfirmContext';
import { LanguageProvider } from '@/contexts/LanguageContext'


export function Providers({ children }: { children: ReactNode }) {
  return (
      <MantineProvider  >
        
        <MediaRecorderProvider><LicenseProvider><ConfirmProvider>
        <LanguageProvider>

          {children}
          </LanguageProvider>

          </ConfirmProvider></LicenseProvider></MediaRecorderProvider>
      </MantineProvider>
  );
}
