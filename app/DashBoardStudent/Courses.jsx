"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import coursesData from '../../data.json';


const Courses = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {coursesData.categories.map((category, idx) => (
        <motion.section 
          key={category.categoryName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-4 border-b-2 border-purple-100 pb-4">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              {category.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {category.categoryName}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discountedPrice = course.discount 
    ? course.price - (course.price * course.discount / 100)
    : null;

  return (
    <motion.div 
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Badges Container */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {course.discount && (
          <div className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">
            {course.discount}% خصم
          </div>
        )}
        {course.certificate && (
          <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
            شهادة
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30" />
      </div>

      {/* Main Content */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-3">
          {course.name}
        </h3>
        
        {/* Price Section */}
        <div className="flex items-center gap-3 mb-4">
          {discountedPrice ? (
            <>
              <span className="text-2xl font-bold text-red-600">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-400">
                ${course.price}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              ${course.price}
            </span>
          )}
        </div>

        {/* Course Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <StarRating rating={course.rating} />
            <span className="font-medium">{course.rating}</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <span className="flex items-center gap-1">
            <ClockIcon />
            {course.duration}
          </span>
          <div className="w-px h-4 bg-gray-300" />
          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-sm">
            {course.level}
          </span>
        </div>
      </div>

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="font-bold text-xl text-gray-900 mb-4">تفاصيل الدورة</h4>
            <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <DetailItem label="المدرب" value={course.instructor} />
              {course.studentsEnrolled && (
                <DetailItem 
                  label="الطلاب" 
                  value={course.studentsEnrolled.toLocaleString()} 
                />
              )}
              {course.language && (
                <DetailItem label="اللغة" value={course.language} />
              )}
              {course.projects && (
                <DetailItem label="المشاريع" value={course.projects} />
              )}
            </div>

            {course.prerequisites && (
              <div className="mb-6">
                <h5 className="text-gray-500 font-medium mb-3">المتطلبات المسبقة:</h5>
                <ul className="space-y-2">
                  {course.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`w-full py-3 rounded-xl font-semibold transition-all
                ${course.certificate 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
            >
              {course.certificate ? 'سجل واحصل على الشهادة' : 'سجل الآن'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper Components
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {i < fullStars || (i === fullStars && hasHalfStar) ? (
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          ) : (
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          )}
        </svg>
      ))}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="text-gray-500 text-sm">{label}</div>
    <div className="font-medium text-gray-900">{value}</div>
  </div>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg className={`w-4 h-4 ${className}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default Courses;