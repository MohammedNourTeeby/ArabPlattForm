'use client';

import React from 'react';
import { useBrandStore } from './WhiteLabelContext';

export default function ThemePreview() {
  const { brand } = useBrandStore();
  // نفترض أن الـ brand يحتوي على الخصائص التالية:
  // logo, primaryColor, font
  const { logo, primaryColor, font } = brand || {};

  return (
    <div className="theme-preview p-4 border rounded">
      {/* عرض المعاينة فقط إذا كانت قيمة logo موجودة وغير فارغة */}
      {logo ? (
        <img src={logo} alt="Logo Preview" className="w-32 mb-4" />
      ) : (
        <div className="w-32 h-32 flex items-center justify-center bg-gray-100 mb-4">
          <span className="text-gray-500">لا يوجد شعار</span>
        </div>
      )}
      <div>
        <p style={{ color: primaryColor, fontFamily: font }}>
          هذه معاينة للهوية البصرية الخاصة بك.
        </p>
      </div>
    </div>
  );
}
