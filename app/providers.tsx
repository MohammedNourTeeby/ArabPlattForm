// app/providers.tsx
'use client';
import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { MediaRecorderProvider } from '@/contexts/MediaRecorderContext';



export function Providers({ children }: { children: ReactNode }) {
  return (
      <MantineProvider  >
        <MediaRecorderProvider>{children}</MediaRecorderProvider>
      </MantineProvider>
  );
}
