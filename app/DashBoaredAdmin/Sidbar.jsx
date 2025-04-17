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
  payouts: 'تسوية العمولات الآلية',
  ads: 'إدارة الاعلانات',
  offers: 'إدارة العروض',
  copon: 'إدارة الخصومات',
  refunds: 'إدارة الرسوم المالية',
  promotion: 'ظهور المدرب في الصفحة الأولى',
  legal: 'سياسة و شروط المنصة',
  certif: 'إدارة الشهادات',
  email: ' إدارة النظام البريدي',
  crm: ' CRM  ',
  saas: ' ادارة التراخيص  SaaS  ',
  social: ' إدارة التواصل الاجتماعي',
 };

const Sidebar = ({ activeSection, setActiveSection }) => {
  const headerHeight = 64;

  return (
    <aside className="w-64 bg-white fixed right-0 top-10 shadow-lg flex flex-col h-screen">
     
      <nav
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ 
          height: `calc(100vh - ${headerHeight}px - 1rem)`,
          maxHeight: 'calc(100vh - 4rem)'
        }}
      >
        <ul
          className="flex flex-col space-y-1 px-2"
          style={{
            columnCount: Object.keys(sectionLabels).length > 8 ? 2 : 1,
            columnGap: '1.5rem',
            columnWidth: '12rem',
          }}
        >
          {Object.entries(sectionLabels).map(([key, label]) => (
            <li key={key} style={{ breakInside: 'avoid' }}>
              <button
                onClick={() => setActiveSection(key)}
                className={`
                  w-full text-right px-4 py-2 text-sm transition-colors duration-200
                  ${activeSection === key 
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                style={{ 
                  minHeight: '2.75rem',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                <span className="block truncate max-w-full">
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