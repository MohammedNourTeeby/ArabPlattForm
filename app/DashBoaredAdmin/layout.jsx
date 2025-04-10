'use client';
import Sidbar from './Sidbar';

export default function AdminLayout({ children }) {
  // التحقق من الصلاحية عند التحميل
 

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidbar />
      <main className="flex-1 p-8 rtl:mr-64 ltr:ml-64">
        {children}
      </main>
    </div>
  );
}