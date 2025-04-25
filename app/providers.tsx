// app/providers.tsx
'use client';
import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { MediaRecorderProvider } from '@/contexts/MediaRecorderContext';
import { LicenseProvider } from './DashBoardAdmin/components/Saas/LicenseContext';
import { ConfirmProvider } from './DashBoardAdmin/components/Saas/ConfirmContext';


export function Providers({ children }: { children: ReactNode }) {
  return (
      <MantineProvider  >
        
        <MediaRecorderProvider><LicenseProvider><ConfirmProvider>{children}</ConfirmProvider></LicenseProvider></MediaRecorderProvider>
      </MantineProvider>
  );
}
