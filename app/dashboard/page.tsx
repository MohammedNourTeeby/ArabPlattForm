// src/app/dashboard/page.tsx
"use client";
import ProtectedRoute from '@/components/ProtectedRoute';
import AuthButtons from '@/components/AuthButtons';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">مرحبا في حسابك!</h1>
        <AuthButtons />
      </div>
    </ProtectedRoute>
  );
}