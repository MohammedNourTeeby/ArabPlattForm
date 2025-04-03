"use client"
import React, { useState, useEffect } from 'react';

const courseCategories = [
  "تكنولوجيا",
  "إدارة الأعمال",
  "اللغات",
  "التصميم",
  "التطوير الشخصي"
];

const CourseFormModal = ({ show, onClose, course, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'تكنولوجيا',
    status: 'مسودة',
    description: '',
    students: 0
  });

  useEffect(() => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        title: '',
        category: 'تكنولوجيا',
        status: 'مسودة',
        description: '',
        students: 0
      });
    }
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    show && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-4">
            {course ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">عنوان الدورة</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">التصنيف</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  {courseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">الحالة</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="مسودة">مسودة</option>
                  <option value="منشور">منشور</option>
                  <option value="معلق">معلق</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">عدد الطلاب</label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({...formData, students: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-1">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border rounded h-32"
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded"
                onClick={onClose}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                حفظ
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CourseFormModal;