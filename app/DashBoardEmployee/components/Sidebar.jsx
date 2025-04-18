import React, { useState } from 'react';

const categories = [
  {
    title: 'الرئيسية',
    items: [
      { key: 'dashboard', label: 'لوحة التحكم' }
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
    title: 'العمليات',
    items: [
      { key: 'content', label: 'العمليات المالية' }
    ]
  },
  {
    title: 'الاتصالات',
    items: [
      { key: 'user', label: 'نظام التواصل الداخلي' },
      { key: 'voip', label :'إدارة المكالمات VOIP' }
    ]
  },
 
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [expanded, setExpanded] = useState([]);
  const primaryColor = '#2563EB';
  
  return (
    <aside className="w-72 bg-white fixed right-0 top-20 h-screen shadow-xl rounded-l-3xl"
      style={{ 
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
      }}
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
        <p className="text-xs text-gray-500 mt-1">
          الدعم الفني: 0910867474 [[1]]
        </p>
      </div>
      
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-50">
        <ul className="p-4 space-y-4">
          {categories.map(category => (
            <li key={category.title} className="group">
              {/* Category Header */}
              <button 
                onClick={() => setExpanded(prev => 
                  prev.includes(category.title) 
                    ? prev.filter(t => t !== category.title) 
                    : [...prev, category.title]
                )}
                className={`
                  w-full flex justify-between items-center px-4 py-3 
                  rounded-lg transition-all duration-300
                  ${expanded.includes(category.title) 
                    ? 'text-blue-600 bg-blue-100' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <span className="font-semibold text-sm lg:text-base">{category.title}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 
                    ${expanded.includes(category.title) ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </button>

              {/* Submenu Items */}
              <ul className={`mt-2 space-y-2 overflow-hidden transition-all duration-500
                ${expanded.includes(category.title) ? 'max-h-60' : 'max-h-0'}
              `}>
                {category.items.map(item => (
                  <li key={item.key}>
                    <button
                      onClick={() => setActiveSection(item.key)}
                      className={`
                        w-full text-right px-6 py-3 rounded-lg transition-all duration-200
                        ${activeSection === item.key 
                          ? `bg-${primaryColor} text-white shadow-md` 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
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