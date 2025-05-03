import React, { useState } from 'react';

const categories = [
  {
    title: 'الرئيسية',
    items: [{ key: 'dashboard', label: 'لوحة التحكم' }]
  },
  {
    title: 'إدارة المستخدمين',
    items: [
      { key: 'addstudent', label: 'إضافة متدرب جديد' },
      { key: 'tracker', label: 'تفاعل المستخدمين' }
    ]
  },
  
  {
    title: 'المحتوى ',
    items: [
      { key: 'content', label: 'المحتوى والدورات' },
      { key: 'certif', label: 'إدارة الشهادات' },
     
    ]
  },
  {
    title: 'الدعم والمنصة',
    items: [
      { key: 'support', label: 'الدعم والتذاكر' },
      { key: 'email', label: 'إدارة النظام البريدي' },
      { key: 'crm', label: 'CRM' },
      { key: 'saas', label: 'ادارة التراخيص SaaS' },
      { key: 'legal', label: 'سياسة و شروط المنصة' },
    
    ]
  },
  {
      title: 'الدعم الفني',
      items: [
        { key: 'finance', label: 'الدعم الفني' },
        { key: 'support', label: 'المهام التشغيلية' }
      ]
    },
    {
        title: 'الاتصالات',
        items: [
          { key: 'user', label: 'نظام التواصل الداخلي' },
          { key: 'voip', label :'إدارة المكالمات VOIP' }
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
  
  const primaryColor = '#2563EB';
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
                <span className="font-semibold text-sm lg:text-base flex items-center gap-2">
                  {category.title}
                  {category.items.length > 4 && (
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {category.items.length}
                    </span>
                  )}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 
                    ${expandedCategories.includes(category.title) ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </button>

              <ul 
                className={`mt-2 space-y-2 overflow-hidden transition-all duration-500
                  ${expandedCategories.includes(category.title) 
                    ? 'max-h-[500px] overflow-y-auto' 
                    : 'max-h-0'
                  }`}
                style={{
                  maxHeight: expandedCategories.includes(category.title) 
                    ? `${category.items.length * 56}px` 
                    : '0px',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
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