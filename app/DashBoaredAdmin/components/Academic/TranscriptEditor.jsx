'use client';
import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function TranscriptEditor({ template = 'default', content, onChange }) {
  const quillRef = useRef(null);

  useEffect(() => {
    // أي إعدادات إضافية يمكن إضافتها هنا
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ],
          clipboard: {
            matchVisual: false
          }
        }}
        formats={['header', 'bold', 'italic', 'underline', 'list']}
        className="h-[500px] [&_.ql-editor]:text-right [&_.ql-editor]:rtl"
      />
    </div>
  );
}
