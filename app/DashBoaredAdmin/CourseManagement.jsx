"use client "
import React, { useState } from 'react';
import CourseFormModal from './CourseFormModal';

const courseStatuses = [
  { value: 'all', label: 'جميع الحالات' },
  { value: 'منشور', label: 'منشور' },
  { value: 'معلق', label: 'معلق' },
  { value: 'مسودة', label: 'مسودة' }
];

const CourseManagement = ({ courses, onUpdate, onDelete }) => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(course => 
    selectedStatus === 'all' ? true : course.status === selectedStatus
  );

  const handleStatusChange = (courseId, newStatus) => {
    const updated = courses.map(course => 
      course.id === courseId ? { ...course, status: newStatus } : course
    );
    onUpdate(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة الدورات</h3>
        <div className="flex items-center space-x-4">
          <select
            className="p-2 border rounded"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {courseStatuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setSelectedCourse(null);
              setShowForm(true);
            }}
          >
            إضافة دورة
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right">العنوان</th>
              <th className="px-6 py-3 text-right">التصنيف</th>
              <th className="px-6 py-3 text-right">الحالة</th>
              <th className="px-6 py-3 text-right">الطلاب</th>
              <th className="px-6 py-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCourses.map(course => (
              <tr key={course.id}>
                <td className="px-6 py-4">{course.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {course.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    course.status === 'منشور' ? 'bg-green-100 text-green-800' :
                    course.status === 'معلق' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">{course.students} طالب</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowForm(true);
                    }}
                  >
                    تعديل
                  </button>
                  <button
                    className="text-yellow-600 hover:text-yellow-800"
                    onClick={() => handleStatusChange(course.id, 'معلق')}
                  >
                    تعليق
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      if(window.confirm('هل أنت متأكد من حذف هذه الدورة؟')) {
                        onDelete(course.id);
                      }
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CourseFormModal
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
        onSubmit={(courseData) => {
          if (courseData.id) {
            const updated = courses.map(c => c.id === courseData.id ? courseData : c);
            onUpdate(updated);
          } else {
            onUpdate([...courses, { ...courseData, id: Date.now() }]);
          }
        }}
      />
    </div>
  );
};

export default CourseManagement;