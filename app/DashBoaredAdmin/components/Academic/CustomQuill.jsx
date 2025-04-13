'use client';
import dynamic from 'next/dynamic';
import { forwardRef, useRef, useImperativeHandle } from 'react';

const ReactQuill = dynamic(() => import('@techenary/react-quill'), { ssr: false });

const CustomQuill = forwardRef((props, ref) => {
  const quillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
    getRoot: () => quillRef.current,
  }));

  return <ReactQuill {...props} ref={quillRef} />;
});

export default CustomQuill;
