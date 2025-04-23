'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FiStar, FiClock, FiFilter, FiEye, 
  FiMessageCircle, FiShare2, FiUser, 
  FiUsers, FiFileText, FiShoppingCart, 
  FiPercent, FiHeart, FiChevronUp, 
  FiChevronDown, FiPlay, FiVideo,
  FiBookOpen, FiDollarSign, FiTag,
  FiArrowLeft, FiInfo
} from 'react-icons/fi';
import coursesData from '../../data.json';



const CoursesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('courseFavorites') || '[]');
    setFavorites(saved);
  }, []);

  const toggleFavorite = (courseId) => {
    setFavorites(prev => {
      const next = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      localStorage.setItem('courseFavorites', JSON.stringify(next));
      return next;
    });
  };

  const filteredCourses = coursesData.categories
    .filter(category => !selectedCategory || category.categoryName === selectedCategory)
    .flatMap(category => category.courses)
    .filter(course => 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.studentsEnrolled - a.studentsEnrolled;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
      {/* شريط البحث */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="ابحث عن دورة أو مدرب..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <FiFilter className="text-lg" />
                  التصفيات
                  {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl p-4 min-w-[300px]"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">التصنيف</label>
                          <select
                            className="w-full px-3 py-2 border rounded-lg"
                            value={selectedCategory || ''}
                            onChange={(e) => setSelectedCategory(e.target.value || null)}
                          >
                            <option value="">الكل</option>
                            {coursesData.categories.map(category => (
                              <option key={category.categoryName} value={category.categoryName}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">الترتيب حسب</label>
                          <select
                            className="w-full px-3 py-2 border rounded-lg"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="popularity">الشعبية</option>
                            <option value="price">السعر</option>
                            <option value="rating">التقييم</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* الشريط الجانبي للتصنيفات */}
        <motion.div 
          className="hidden lg:block w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-purple-900 flex items-center gap-2">
              <FiBookOpen className="text-purple-600" />
              التصنيفات
            </h3>
            <div className="space-y-2">
              {coursesData.categories.map(category => (
                <button
                  key={category.categoryName}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.categoryName ? null : category.categoryName
                  )}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    selectedCategory === category.categoryName 
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.categoryName}
                  {selectedCategory === category.categoryName && (
                    <span className="ml-auto w-2 h-2 bg-purple-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* بطاقات الدورات */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-gray-600">النتائج:</span>
              <span className="font-medium text-purple-700">
                {sortedCourses.length} دورة
              </span>
            </div>
            
            <div className="relative">
              <select
                className="bg-white pl-4 pr-8 py-2.5 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-purple-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">الترتيب حسب: الشعبية</option>
                <option value="price">الترتيب حسب: السعر</option>
                <option value="rating">الترتيب حسب: التقييم</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                isFavorite={favorites.includes(course.id)}
                onToggleFavorite={toggleFavorite}
                onViewDetails={() => setSelectedCourse(course)}
              />
            ))}
          </div>

          {sortedCourses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-2xl mb-4">😞 لم نجد ما تبحث عنه</div>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="text-purple-600 hover:text-purple-700"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          )}
        </div>

        {/* تفاصيل الدورة */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 p-6 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="mb-6 text-gray-600 hover:text-purple-600"
              >
                <FiArrowLeft className="text-2xl" />
              </button>

              <div className="space-y-6">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src={selectedCourse.image}
                    alt={selectedCourse.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={selectedCourse.instructorImage}
                        width={40}
                        height={40}
                        alt={selectedCourse.instructor}
                      />
                    </div>
                    <span className="font-medium">{selectedCourse.instructor}</span>
                  </div>

                  <div className="flex items-center gap-1 ml-auto">
                    <FiStar className="text-yellow-400" />
                    <span>{selectedCourse.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DetailItem icon={<FiClock />} label="المدة" value={`${selectedCourse.duration} ساعة`} />
                  <DetailItem icon={<FiPlay />} label="الدروس" value={selectedCourse.lessons} />
                  <DetailItem icon={<FiUsers />} label="الطلاب" value={selectedCourse.studentsEnrolled} />
                  <DetailItem icon={<FiTag />} label="المستوى" value={selectedCourse.level} />
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold mb-4">تفاصيل الدورة</h3>
                  <p className="text-gray-600">
                    وصف تفصيلي للدورة التعليمية وأهدافها والمهارات التي سيتم تعلمها،
                    مع ذكر المتطلبات السابقة وأي معلومات إضافية مهمة للطالب.
                  </p>
                </div>

                <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedCourse.discount && (
                        <span className="text-red-600 text-2xl font-bold">
                          ${(selectedCourse.price * (1 - selectedCourse.discount / 100)).toFixed(2)}
                        </span>
                      )}
                      <span className={`text-2xl font-bold ${
                        selectedCourse.discount ? 'text-gray-400 line-through' : 'text-purple-600'
                      }`}>
                        ${selectedCourse.price.toFixed(2)}
                      </span>
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      <FiShoppingCart className="inline-block mr-2" />
                      اشترك الآن
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <FiChevronUp className="text-2xl" />
      </button>
    </div>
  );
};

const CourseCard = ({ course, isFavorite, onToggleFavorite, onViewDetails }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <motion.div 
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
      onHoverStart={() => setShowQuickView(true)}
      onHoverEnd={() => setShowQuickView(false)}
      whileHover={{ y: -5 }}
    >
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 rounded-2xl z-10 flex items-center justify-center"
          >
            <div className="text-center text-white p-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg mb-4"
                onClick={onViewDetails}
              >
                <FiInfo className="inline-block mr-2" />
                عرض التفاصيل
              </motion.button>
              <div className="space-y-2 text-sm">
                <p className="flex items-center justify-center gap-2">
                  <FiClock className="text-lg" />
                  المدة: {course.duration} ساعات
                </p>
                <p className="flex items-center justify-center gap-2">
                  <FiPlay className="text-lg" />
                  {course.lessons} درس
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover"
        />
        
        <div className="absolute top-3 left-3 flex gap-2">
          {course.discount && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {course.discount}% خصم
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(course.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md"
        >
          <FiHeart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2">{course.name}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={course.instructorImage}
              width={24}
              height={24}
              alt={course.instructor}
            />
          </div>
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Pill label={course.level} color="purple" />
          <Pill label={`${course.lessons} دروس`} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            {course.discount ? (
              <>
                <span className="text-red-600 font-bold">${(course.price * (1 - course.discount / 100)).toFixed(2)}</span>
                <span className="line-through text-gray-400 ml-2">${course.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-purple-600 font-bold">${course.price.toFixed(2)}</span>
            )}
          </div>
          <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg">
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Pill = ({ label, color = 'gray' }) => {
  const colors = {
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[color]}`}>
      {label}
    </span>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="text-purple-600 mb-2">{icon}</div>
    <div className="font-medium">{label}</div>
    <div className="text-gray-600">{value}</div>
  </div>
);

export default CoursesPage;