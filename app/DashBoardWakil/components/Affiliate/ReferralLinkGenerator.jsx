'use client';
import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ReferralLinkGenerator = () => {
  const [customPath, setCustomPath] = useState('');
  const baseUrl = 'https://yourplatform.com/ref';

  const generateLink = () => {
    const refCode = crypto.randomUUID().substr(0, 8);
    return `${baseUrl}/${customPath || refCode}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateLink());
      Swal.fire({
        icon: 'success',
        title: 'تم النسخ!',
        text: 'الرابط جاهز للمشاركة'
      });
    } catch (error) {
      Swal.fire('خطأ', 'تعذر النسخ', 'error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">إنشاء رابط إحالة</h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="مسار مخصص (اختياري)"
          className="flex-1 p-2 border rounded-lg"
          value={customPath}
          onChange={(e) => setCustomPath(e.target.value)}
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Copy size={16} /> نسخ
        </button>
      </div>
      
      <div className="p-3 bg-gray-100 rounded-lg break-all text-sm">
        {generateLink()}
      </div>
    </div>
  );
};

export default ReferralLinkGenerator;