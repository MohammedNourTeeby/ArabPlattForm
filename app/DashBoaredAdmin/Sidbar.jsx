import React, { useState } from 'react';

const categories = [
  {
    title: 'الرئيسية',
    items: [{ key: 'dashboard', label: 'لوحة التحكم' }]
  },
  {
    title: 'إدارة المستخدمين',
    items: [
      { key: 'users', label: 'إدارة المستخدمين' },
      { key: 'addstudent', label: 'إضافة متدرب جديد' },
      { key: 'addgroup', label: 'إضافة فريق إداري' },
      { key: 'tracker', label: 'تفاعل المستخدمين' }
    ]
  },
  {
    title: 'العمليات المالية',
    items: [
      { key: 'finance', label: 'العمليات المالية' },
      { key: 'payouts', label: 'تسوية العمولات الآلية' },
      { key: 'refunds', label: 'إدارة الرسوم المالية' },
      { key: 'copon', label: 'إدارة الخصومات' },
      { key: 'offers', label: 'إدارة العروض' }
    ]
  },
  {
    title: 'المحتوى والتسويق',
    items: [
      { key: 'content', label: 'المحتوى والدورات' },
      { key: 'certif', label: 'إدارة الشهادات' },
      { key: 'promotion', label: 'ظهور المدرب في الصفحة الأولى' },
      { key: 'ads', label: 'إدارة الاعلانات' }
    ]
  },
  {
    title: 'الدعم والمنصة',
    items: [
      { key: 'support', label: 'الدعم والتذاكر' },
      { key: 'email', label: 'إدارة النظام البريدي' },
      { key: 'crm', label: 'CRM' },
      { key: 'saas', label: 'ادارة التراخيص SaaS' },
      { key: 'social', label: 'إدارة التواصل الاجتماعي' },
      { key: 'legal', label: 'سياسة و شروط المنصة' }
    ]
  },
   {
      title: 'التقارير',
      items: [
        { key: 'report', label: ' نظام التقارير ' },
      ]
    }
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const primaryColor = '#2563EB'; // لون أساسي من Tailwind [[10]]
  const secondaryColor = '#BFDBFE';
  const bgColor = '#F8FAFC';
  const textColor = '#1E293B';

  return (
    <aside className="w-72 bg-white fixed right-0 top-10 shadow-xl rounded-l-3xl h-screen"
      style={{ 
        background: `linear-gradient(180deg, ${bgColor} 0%, #FFFFFF 100%)`,
        transition: 'width 0.3s ease-in-out'
      }}
    >
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-200 scrollbar-track-gray-50">
        <ul className="flex flex-col space-y-4 px-4 pt-6">
          {categories.map(category => (
            <li key={category.title} className="group">
              {/* Header مع تأثيرات حركية */}
              <button
                onClick={() => setExpandedCategories(prev => 
                  prev.includes(category.title) 
                    ? prev.filter(t => t !== category.title) 
                    : [...prev, category.title]
                )}
                className={`
                  w-full flex justify-between items-center px-4 py-3 
                  rounded-lg transition-all duration-300
                  ${expandedCategories.includes(category.title) 
                    ? `text-${primaryColor} bg-${secondaryColor}` 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                style={{
                  boxShadow: expandedCategories.includes(category.title) 
                    ? `0 2px 4px rgba(37, 99, 235, 0.2)` 
                    : 'none'
                }}
              >
                <span className="font-semibold text-sm lg:text-base">{category.title}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 
                    ${expandedCategories.includes(category.title) ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </button>

              {/* قائمة منسدلة مع تحسينات تفاعلية */}
              <ul className={`mt-2 space-y-2 overflow-hidden transition-all duration-500
                ${expandedCategories.includes(category.title) ? 'max-h-60' : 'max-h-0'}
              `}>
                {category.items.map(item => (
                  <li key={item.key} 
                    onMouseEnter={() => setHoveredItem(item.key)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => setActiveSection(item.key)}
                      className={`
                        w-full text-right px-6 py-3 rounded-lg transition-all duration-200
                        ${activeSection === item.key 
                          ? `bg-${primaryColor} text-white shadow-md` 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                        ${hoveredItem === item.key && !activeSection && 'bg-gray-100'}
                      `}
                      style={{
                        transform: activeSection === item.key ? 'translateX(8px)' : 'none',
                        transition: 'transform 0.2s ease-out'
                      }}
                    >
                      <span className="block truncate text-sm lg:text-base">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;