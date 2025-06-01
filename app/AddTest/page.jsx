'use client';
import { Suspense } from 'react';
import AddTest from '@/components/AddTest';

export default function AddTest() {
  return (
    <Suspense fallback="جارٍ التحميل...">
      <AddTest />
    </Suspense>
  );
}