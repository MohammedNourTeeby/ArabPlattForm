'use client';
import { Suspense } from 'react';
import AddTestPage from '@/components/AddTestPage';

export default function AddTest() {
  return (
    <Suspense fallback="جارٍ التحميل...">
      <AddTestPage />
    </Suspense>
  );
}