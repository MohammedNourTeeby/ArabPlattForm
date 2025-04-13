'use client';

import React, { useState } from 'react';

const templates = [
  {
    id: 'template1',
    name: 'قالب ١',
    description: 'هذا هو القالب الأول الذي يتميز بتصميم بسيط وأنيق.',
    thumbnail: '/images/template1.jpg', // تأكد من وجود الصورة في المسار الصحيح
  },
  {
    id: 'template2',
    name: 'قالب ٢',
    description: 'هذا القالب يحتوي على تصميم متقدم مع ميزات إضافية.',
    thumbnail: '/images/template2.jpg',
  },
  {
    id: 'template3',
    name: 'قالب ٣',
    description: 'قالب مثالي لإنشاء صفحات هبوط.',
    thumbnail: '/images/template3.jpg',
  },
];

export default function TemplateSelector({ onSelect }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (template) => {
    setSelectedTemplate(template.id);
    if (onSelect) {
      onSelect(template);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">اختر قالب</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template)}
            className={`cursor-pointer border p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
              selectedTemplate === template.id ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{template.name}</h3>
            <p className="text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
