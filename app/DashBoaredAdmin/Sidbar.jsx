// components/Sidebar.jsx
import React from 'react';

const sectionLabels = {
  dashboard: 'لوحة التحكم',
  users: 'إدارة المستخدمين',
  content: 'المحتوى والدورات',
  support: 'الدعم والتذاكر',
  finance: 'العمليات المالية',
  addstudent: 'إضافة متدرب جديد',
  addgroup: 'إضافة فريق إداري',
  tracker: 'تفاعل المستخدمين',
  social: ' إدارة التواصل الاجتماعي',
  payouts: 'تسوية العمولات الآلية',
  ads: 'إدارة الاعلانات',
  offers: 'إدارة العروض',
  copon: 'إدارة الخصومات',
  saas: ' ادارة التراخيص  SaaS  ',

  refunds: 'إدارة الرسوم المالية',
  promotion: 'ظهور المدرب في الصفحة الأولى',
  legal: 'سياسة و شروط المنصة',
  certif: ' إدارة الشهادات و السجلات و الافادات' ,
  email: ' إدارة النظام البريدي',
  crm: ' CRM  ',
};

const Sidebar = ({ activeSection, setActiveSection }) => {
  // الارتفاع الثابت للهيدر (يمكنك تعديله حسب التصميم المطلوب)
  const headerHeight = 64; // 4rem = 64px

  return (
    <aside className="w-64 bg-white fixed right-0 shadow-lg flex flex-col h-screen">
      {/* قسم الهيدر */}
      <div className="h-16 p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">القائمة</h2>
        {/* يمكنك إضافة زر أو أيقونة هنا لوظائف إضافية */}
      </div>

      {/* قسم التنقل القابل للتمرير */}
      <nav 
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <ul className="flex flex-col space-y-1">
          {Object.entries(sectionLabels).map(([key, label]) => (
            <li key={key}>
              <button
                onClick={() => setActiveSection(key)}
                className={`
                  w-full text-right px-4 py-2 text-sm transition-colors duration-200
                  ${activeSection === key 
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
                style={{ minHeight: '2.5rem', lineHeight: '1.25rem' }}
              >
                <span className="whitespace-nowrap block truncate">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
