'use client';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        {/* الجزء الذي سيتغير مع كل صفحة */}
        <main className="flex-1 mr-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}