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
  FiArrowLeft, FiInfo, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import coursesData from '../../data.json';

const colors = {
  primary: '#008DCB',
  secondary: '#0D1012',
  accent: '#F9D011',
  danger: '#E2101E',
  gray: '#999999',
  lightGray: '#F5F5F5',
  white: '#FFFFFF'
};

const CoursesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('courseFavorites') || '[]');
    setFavorites(saved);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-gray-50">
      {/* شريط البحث والفلاتر */}
      <div className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="ابحث عن دورة أو مدرب..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#008DCB] bg-white text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: showFilters ? colors.primary : colors.lightGray,
                    color: showFilters ? colors.white : colors.secondary
                  }}
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
                          <label className="block text-sm font-medium mb-2" style={{color: colors.secondary}}>التصنيف</label>
                          <select
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#008DCB]"
                            style={{borderColor: colors.gray}}
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
                          <label className="block text-sm font-medium mb-2" style={{color: colors.secondary}}>الترتيب حسب</label>
                          <select
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#008DCB]"
                            style={{borderColor: colors.gray}}
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

      {/* فئات الدورات مع أزرار التنقل */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide w-full">
            {coursesData.categories.map(category => (
              <button
                key={category.categoryName}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.categoryName ? null : category.categoryName
                )}
                className={`flex-shrink-0 px-6 py-3 rounded-full mx-2 transition-colors ${
                  selectedCategory === category.categoryName 
                    ? 'bg-[#008DCB] text-white'
                    : 'bg-[#F5F5F5] text-[#0D1012] hover:bg-[#008DCB]/20'
                }`}
              >
                <span className="block text-sm font-medium">{category.categoryName}</span>
                <span className="text-xs text-gray-500">({category.studentsCount}+ students)</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="bg-transparent hover:bg-gray-200 rounded-full p-2">
              <FiChevronLeft className="text-2xl" />
            </button>
            <button className="bg-transparent hover:bg-gray-200 rounded-full p-2">
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-gray-600">النتائج:</span>
            <span className="font-medium" style={{color: colors.primary}}>
              {sortedCourses.length} دورة
            </span>
          </div>
          <div className="relative">
            <select
              className="bg-white pl-4 pr-8 py-2.5 rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:border-[#008DCB]"
              style={{borderColor: colors.gray}}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favorites.includes(course.id)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={() => setSelectedCourse(course)}
              colors={colors}
            />
          ))}
        </div>
        {sortedCourses.length === 0 && (
          <div className="text-center py-12" style={{color: colors.gray}}>
            <div className="text-2xl mb-4">😞 لم نجد ما تبحث عنه</div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="hover:underline"
              style={{color: colors.primary}}
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
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
                className="mb-6 hover:text-[#008DCB] transition-colors"
                style={{color: colors.secondary}}
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
                <h2 className="text-2xl font-bold" style={{color: colors.secondary}}>
                  {selectedCourse.name}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{borderColor: colors.primary}}>
                      <Image
                        src={selectedCourse.instructorImage}
                        width={40}
                        height={40}
                        alt={selectedCourse.instructor}
                      />
                    </div>
                    <span className="font-medium" style={{color: colors.secondary}}>
                      {selectedCourse.instructor}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto" style={{color: colors.accent}}>
                    <FiStar className="text-lg" />
                    <span>{selectedCourse.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DetailItem 
                    icon={<FiClock style={{color: colors.primary}} />} 
                    label="المدة" 
                    value={`${selectedCourse.duration} ساعة`}
                  />
                  <DetailItem 
                    icon={<FiPlay style={{color: colors.primary}} />} 
                    label="الدروس" 
                    value={selectedCourse.lessons}
                  />
                  <DetailItem 
                    icon={<FiUsers style={{color: colors.primary}} />} 
                    label="الطلاب" 
                    value={selectedCourse.studentsEnrolled}
                  />
                  <DetailItem 
                    icon={<FiTag style={{color: colors.primary}} />} 
                    label="المستوى" 
                    value={selectedCourse.level}
                  />
                </div>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold mb-4" style={{color: colors.secondary}}>تفاصيل الدورة</h3>
                  <p className="text-gray-600">
                    {selectedCourse.description || 'وصف تفصيلي للدورة التعليمية وأهدافها والمهارات التي سيتم تعلمها، مع ذكر المتطلبات السابقة وأي معلومات إضافية مهمة للطالب.'}
                  </p>
                </div>
                <div className="sticky bottom-0 bg-white pt-6 border-t" style={{borderColor: colors.lightGray}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedCourse.discount && (
                        <span className="text-2xl font-bold" style={{color: colors.danger}}>
                          ${(selectedCourse.price * (1 - selectedCourse.discount / 100)).toFixed(2)}
                        </span>
                      )}
                      <span className={`text-2xl font-bold ${
                        selectedCourse.discount ? 'text-gray-400 line-through' : 'text-[#008DCB]'
                      }`}>
                        ${selectedCourse.price.toFixed(2)}
                      </span>
                    </div>
                    <button 
                      className="flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                      style={{backgroundColor: colors.primary, color: colors.white}}
                    >
                      <FiShoppingCart />
                      اشترك الآن
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* زر العودة للأعلى */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        style={{backgroundColor: colors.primary, color: colors.white}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiChevronUp className="text-2xl" />
      </motion.button>
    </div>
  );
};

const CourseCard = ({ course, isFavorite, onToggleFavorite, onViewDetails, colors }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  
  return (
    <motion.div 
      className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
      onHoverStart={() => setShowQuickView(true)}
      onHoverEnd={() => setShowQuickView(false)}
    >
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 rounded-lg z-10 flex items-center justify-center"
          >
            <div className="text-center text-white p-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white px-6 py-2 rounded-lg mb-4"
                style={{color: colors.primary}}
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
      
      {course.discount && (
        <div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold"
          style={{backgroundColor: colors.danger, color: colors.white}}
        >
          {course.discount}% خصم
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-end p-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{borderColor: colors.primary}}>
            <Image
              src={course.instructorImage}
              width={64}
              height={64}
              alt={course.instructor}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold" style={{color: colors.secondary}}>
            {course.name}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(course.id);
            }}
            className="p-1 hover:scale-110 transition-transform"
          >
            <FiHeart className={`w-6 h-6 ${
              isFavorite 
                ? `text-[${colors.danger}] fill-[${colors.danger}]` 
                : `text-[${colors.gray}]`
            }`}/>
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{borderColor: colors.primary}}>
            <Image
              src={course.instructorImage}
              width={32}
              height={32}
              alt={course.instructor}
              className="object-cover"
            />
          </div>
          <span className="text-sm" style={{color: colors.gray}}>
            {course.instructor}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1" style={{color: colors.accent}}>
            <FiStar className="text-lg" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm" style={{color: colors.gray}}>
              <FiUsers />
              <span>{course.studentsEnrolled}</span>
            </div>
            <div className="flex items-center gap-1 text-sm" style={{color: colors.gray}}>
              <FiClock />
              <span>{course.duration} س</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            {course.discount ? (
              <>
                <span className="text-xl font-bold" style={{color: colors.primary}}>
                  ${(course.price * (1 - course.discount / 100)).toFixed(2)}
                </span>
                <span className="line-through text-sm" style={{color: colors.gray}}>
                  ${course.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold" style={{color: colors.primary}}>
                ${course.price.toFixed(2)}
              </span>
            )}
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            style={{backgroundColor: colors.primary, color: colors.white}}
          >
            <FiShoppingCart />
            <span>اشتري الآن</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="text-[#008DCB] mb-2">{icon}</div>
    <div className="font-medium text-[#0D1012]">{label}</div>
    <div className="text-gray-600">{value}</div>
  </div>
);

export default CoursesPage;