// components/Sidebar.jsx
import React from 'react';

const sectionLabels = {
  dashboard: 'لوحة التحكم',
  finance: ' الدعم الفني',
  content: ' العمليات المالية',
  support: 'المهام التشغيلية',
  user: ' نظام التواصل الداخلي',

};

const Sidbar = ({ activeSection, setActiveSection }) => (
  <div className="w-64 bg-white h-screen fixed right-0 shadow-lg">
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
    </div>
    <nav className="mt-6">
      {Object.keys(sectionLabels).map(section => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`w-full text-right px-6 py-3 hover:bg-gray-100 ${
            activeSection === section ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          {sectionLabels[section]}
        </button>
      ))}
    </nav>
  </div>
);

export default Sidbar;