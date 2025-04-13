'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ReactDOM from 'react-dom';
import 'react-quill/dist/quill.snow.css';

// حل مؤقت لتعريف findDOMNode
if (typeof ReactDOM.findDOMNode !== 'function') {
  ReactDOM.findDOMNode = (component) => component;
}

const ReactQuill = dynamic(() =>
  import('@techenary/react-quill').then((mod) => {
    const Component = mod.default;
    const ForwardRefQuill = React.forwardRef((props, ref) => <Component {...props} ref={ref} />);
    return ForwardRefQuill;
  }), {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">جاري تحميل المحرر...</p>
        </div>
      </div>
    )
  }
);

export default function EmailEditor({ initialContent, onSave }) {
  const [content, setContent] = useState(initialContent || '');
  const [mode, setMode] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);
  const quillRef = useRef(null);

  // مزامنة المحتوى مع القيمة الأولية عند التغيير
  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  // التحقق من وجود تغييرات
  const hasChanges = content !== (initialContent || '');

  // معالج تحميل الصور
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      // هنا يمكنك إضافة رفع الصورة إلى الخادم
      const reader = new FileReader();
      reader.onload = (e) => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', e.target.result);
      };
      reader.readAsDataURL(file);
    };
  };

  // إعدادات الأدوات
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean']
      ],
      handlers: { image: imageHandler }
    },
    clipboard: { matchVisual: false }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'align',
    'color', 'background'
  ];

  // معالج الحفظ
  const handleSave = async () => {
    if (!hasChanges || !content.trim()) return;
    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      {/* أزرار التبويب */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setMode('edit')} 
          className={`px-4 py-2 rounded-t-lg ${mode === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          التحرير
        </button>
        <button 
          onClick={() => setMode('preview')} 
          className={`px-4 py-2 rounded-t-lg ${mode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          المعاينة
        </button>
      </div>

      {mode === 'edit' ? (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="h-96 mb-6 arabic-editor text-right"
          placeholder="اكتب محتوى القالب هنا..."
          dir="rtl"
        />
      ) : (
        <div 
          className="preview-content h-96 overflow-y-auto p-4 border rounded-lg" 
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* معلومات الحفظ */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          عدد الحروف: {content.length} | 
          عدد الكلمات: {content.split(/\s+/).filter(Boolean).length}
        </div>

        <button
          onClick={handleSave}
          disabled={!hasChanges || !content.trim() || isSaving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              جاري الحفظ...
            </span>
          ) : (
            '💾 حفظ القالب'
          )}
        </button>
      </div>
    </div>
  );
}