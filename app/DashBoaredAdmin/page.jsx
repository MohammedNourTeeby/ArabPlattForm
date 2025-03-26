// pages/AdminDashboard.jsx
"use client"
import { useState } from 'react';
import Header from './Header';
import Sidbar from './Sidbar';
import SummaryCard from './SummaryCard';
import UsersTable from './UsersTable';

const page = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [users] = useState([
    { id: 1, name: 'محمد علي', role: 'مدرب', status: 'نشط' },
    // ... بيانات أخرى
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <Sidbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="flex-1 mr-64 p-8">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <SummaryCard
                title="إجمالي المستخدمين"
                value="2,456"
                icon="👥"
              />
              <SummaryCard title="الدورات" value="142" icon="📚" />
              <SummaryCard title="الإيرادات" value="$45,200" icon="💵" />
              <SummaryCard title="التذاكر المفتوحة" value="23" icon="🎫" />
            </div>
          )}

          {activeSection === 'users' && <UsersTable users={users} />}

          {activeSection === 'content' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">إدارة المحتوى</h3>
              {/* محتوى إدارة الدورات */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default page;