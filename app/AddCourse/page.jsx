'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AddCourseComponent = ({ tracks = [] }) => {
  // بيانات افتراضية للمسارات والدورات
  const DEFAULT_TRACKS = [
    { id: 1, trackName: 'تطوير الويب' },
    { id: 2, trackName: 'علوم البيانات' },
    { id: 3, trackName: 'التسويق الرقمي' }
  ];

  const DEFAULT_COURSES = [
    {
      id: 1,
      courseName: 'أساسيات البرمجة',
      track: 'تطوير الويب',
      price: 0,
      description: 'مدخل إلى عالم البرمجة للمبتدئين',
      accessInstructions: 'لا يوجد متطلبات مسبقة',
      isFree: true,
      createdAt: new Date().toLocaleDateString('ar-EG')
    }
  ];

  // تعريف الحالات (state)
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [tracksState] = useState(tracks.length > 0 ? tracks : DEFAULT_TRACKS);
  const [formData, setFormData] = useState({
    courseName: '',
    track: '',
    price: '',
    description: '',
    accessInstructions: '',
    isFree: true
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  // معالجة تغيير الحقول
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.courseName || !formData.track || !formData.description) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const newCourse = {
      id: editId || Date.now(),
      ...formData,
      price: formData.isFree ? 0 : Number(formData.price),
      createdAt: new Date().toLocaleDateString('ar-EG')
    };

    if (editId) {
      setCourses(courses.map(c => (c.id === editId ? newCourse : c)));
    } else {
      setCourses([...courses, newCourse]);
    }

    resetForm();
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setFormData({
      courseName: '',
      track: '',
      price: '',
      description: '',
      accessInstructions: '',
      isFree: true
    });
    setEditId(null);
    setError('');
  };

  // حذف دورة
  const handleDelete = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // تعديل دورة
  const handleEdit = (course) => {
    setFormData({
      courseName: course.courseName,
      track: course.track,
      price: course.price,
      description: course.description,
      accessInstructions: course.accessInstructions,
      isFree: course.isFree
    });
    setEditId(course.id);
  };

  // متغيرات التحريك باستخدام framer-motion
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* نموذج الإضافة/التعديل */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editId ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* حقل اسم الدورة */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم الدورة *</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* حقل المسار */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">المسار التعليمي *</label>
              <select
                name="track"
                value={formData.track}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">اختر المسار</option>
                {tracksState.map(track => (
                  <option key={track.id} value={track.trackName}>
                    {track.trackName}
                  </option>
                ))}
              </select>
            </div>
            
            <Link href="./AddEduGat" passHref legacyBehavior>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                title="إضافة مسار جديد"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">مسار جديد</span>
              </motion.button>
            </Link>
          </div>

          {/* حقل نوع الدورة والسعر */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع الدورة *</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={() => setFormData(prev => ({ ...prev, isFree: true, price: '' }))}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>مجانية</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isFree"
                  checked={!formData.isFree}
                  onChange={() => setFormData(prev => ({ ...prev, isFree: false }))}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>مدفوعة</span>
              </label>
            </div>

            {!formData.isFree && (
              <div className="mt-3 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  السعر ($) *
                  <span className="text-xs text-gray-500 ml-2">(المبلغ بالدولار الأمريكي)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="1"
                    required={!formData.isFree}
                    step="0.01"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                </div>
              </div>
            )}
          </div>

          {/* حقل الوصف */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">الوصف *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows="4"
              required
            />
          </div>

          {/* حقل متطلبات الدخول */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">متطلبات الدخول</label>
            <textarea
              name="accessInstructions"
              value={formData.accessInstructions}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows="3"
            />
          </div>

          {/* أزرار التحكم */}
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
            >
              إعادة تعيين
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              {editId ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  تحديث الدورة
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة الدورة
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* قائمة الدورات */}
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الدورة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المسار</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الإضافة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.length > 0 ? (
                courses.map(course => (
                  <motion.tr
                    key={course.id}
                    variants={rowVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.courseName}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{course.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.track}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.isFree ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          مجانية
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          ${course.price.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(course)}
                          className="text-emerald-600 hover:text-emerald-800 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100"
                          title="تعديل"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg bg-red-50 hover:bg-red-100"
                          title="حذف"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                        <Link href="./AddTest" passHref legacyBehavior>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer"
                            title="إضافة اختبار"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          </motion.div>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    لا توجد دورات متاحة حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCourseComponent;
