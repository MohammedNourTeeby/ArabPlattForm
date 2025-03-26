import React from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import Link from 'next/link';

const Page = ({ favoriteCourses = [], toggleFavorite = () => {} }) => {
  // التحقق من أن favoriteCourses موجود وهو مصفوفة
  const courses = Array.isArray(favoriteCourses) ? favoriteCourses : [];
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">الدورات المفضلة</span>
            <span className="block text-indigo-600 mt-2">
              {courses.length} {courses.length === 1 ? 'دورة' : 'دورات'}
            </span>
          </h1>
        </div>

        {/* حالة عدم وجود مفضلات */}
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100">
              <FiHeart className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">لا توجد دورات مفضلة</h3>
            <p className="mt-2 text-gray-600">
              قم بإضافة دورات إلى المفضلة بالضغط على أيقونة القلب في بطاقات الدورات
            </p>
            <div className="mt-8">
              <Link
                href="./Courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                تصفح جميع الدورات
                <svg
                  className="ml-3 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={course.image || '/default-course.jpg'}
                    alt={course.name || 'دورة بدون عنوان'}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(course.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={course.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                  >
                    <FiHeart
                      className={`w-6 h-6 ${course.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {course.level || 'غير محدد'}
                    </span>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{course.rating || 0}</span>
                    </div>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900">{course.name || 'دورة بدون عنوان'}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-2">{course.description || 'لا يوجد وصف متاح'}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">{course.price || 0} ر.س</span>
                    <Link
                      href={`/courses/${course.id || '#'}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      عرض التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;