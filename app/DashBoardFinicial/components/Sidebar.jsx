import React, { useState, useEffect } from 'react'; // أضفنا useEffect هنا

const categories = [
  {
    title: 'الرئيسية',
    items: [
      { key: 'dashboard', label: 'لوحة التحكم' }
    ]
  },
  {
    title: 'العمليات المالية',
    items: [
      { key: 'myfinance', label: 'العمليات المالية' },
      { key: 'payouts', label: 'تسوية العمولات الآلية' },
      { key: 'refunds', label: 'إدارة الرسوم المالية' },
      { key: 'copon', label: 'إدارة الخصومات' },
      { key: 'offers', label: 'إدارة العروض' }
    ]
  },
  
  {
    title: 'العمليات',
    items: [
      { key: 'content', label: 'العمليات المالية' }
    ]
  },
  
 
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [expanded, setExpanded] = useState(categories.map(c => c.title)); // جميع الأقسام مفتوحة افتراضيًا
  const primaryColor = '#2563EB';
  
  // مؤشرات التمرير
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowTopShadow(scrollTop > 0);
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight);
  };

  useEffect(() => {
    const container = document.querySelector('.sidebar-nav');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <aside className="w-72 bg-white fixed right-0 top-20 bottom-0 shadow-xl rounded-l-3xl flex flex-col"
      style={{ 
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
      }}
    >
      {/* Header مع الظلال */}
      <div className="p-6 border-b border-gray-100 relative z-10">
        <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
        <p className="text-xs text-gray-500 mt-1">
          الدعم الفني: 0910867474 [[1]]
        </p>
      </div>

      {/* ظلال التمرير */}
      <div className={`absolute top-20 left-0 right-0 h-4 bg-gradient-to-b from-white transition-opacity duration-300 ${showTopShadow ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white transition-opacity duration-300 ${showBottomShadow ? 'opacity-100' : 'opacity-0'}`} />

      {/* محتوى القائمة مع التمرير */}
      <nav 
        className="sidebar-nav flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-50 relative"
        onScroll={handleScroll}
      >
        <ul className="p-4 space-y-4">
          {categories.map((category) => (
            <li key={category.title} className="group">
              {/* رأس القسم */}
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
                    ? 'text-blue-600 bg-blue-50' 
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

              {/* العناصر الفرعية */}
              <ul className={`mt-2 space-y-2 overflow-hidden transition-all duration-500
                ${expanded.includes(category.title) ? 'max-h-[500px]' : 'max-h-0'}
              `}>
                {category.items.map(item => (
                  <li key={item.key} className="relative">
                    <button
                      onClick={() => setActiveSection(item.key)}
                      className={`
                        w-full text-right px-6 py-3 rounded-lg transition-all duration-200
                        flex items-center justify-between
                        ${activeSection === item.key 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span className="block truncate text-sm lg:text-base">
                        {item.label}
                      </span>
                      
                      {/* مؤشر النشاط */}
                      {activeSection === item.key && (
                        <span className="w-2 h-2 bg-white rounded-full ml-2" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* عدد الأقسام */}
      <div className="p-4 border-t border-gray-100 text-xs text-gray-500">
        عدد الأقسام: {categories.length}
      </div>
    </aside>
  );
};

export default Sidebar;