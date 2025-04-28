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
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t, language } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

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

  const handleCourseHover = (course, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPreviewPosition({
      x: language === 'ar' ? rect.right + 20 : rect.left - 320,
      y: rect.top
    });
    setHoveredCourse(course);
  };

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
    <div 
      className="min-h-screen bg-gray-50"
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
    >
      {/* شريط البحث والفلاتر */}
      <div className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder={t?.courses?.searchPlaceholder}
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
                  {t?.courses?.filters}
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
                          <label className="block text-sm font-medium mb-2" style={{color: colors.secondary}}>
                            {t?.courses?.categoryLabel}
                          </label>
                          <select
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#008DCB]"
                            style={{borderColor: colors.gray}}
                            value={selectedCategory || ''}
                            onChange={(e) => setSelectedCategory(e.target.value || null)}
                          >
                            <option value="">{t?.courses?.allCategories}</option>
                            {coursesData.categories.map(category => (
                              <option key={category.categoryName} value={category.categoryName}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: colors.secondary}}>
                            {t?.courses?.sortBy}
                          </label>
                          <select
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#008DCB]"
                            style={{borderColor: colors.gray}}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="popularity">{t?.courses?.sortOptions?.popularity}</option>
                            <option value="price">{t?.courses?.sortOptions?.price}</option>
                            <option value="rating">{t?.courses?.sortOptions?.rating}</option>
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
      <div className="max-w-6xl mx-auto px-4 py-2">
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
                <span className="text-xs text-gray-500">{category.studentsCount}+ {t?.courses?.students}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="bg-transparent hover:bg-gray-200 rounded-full p-2">
              {language === 'ar' ? <FiChevronRight className="text-2xl" /> : <FiChevronLeft className="text-2xl" />}
            </button>
            <button className="bg-transparent hover:bg-gray-200 rounded-full p-2">
              {language === 'ar' ? <FiChevronLeft className="text-2xl" /> : <FiChevronRight className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-600">{t?.courses?.results}:</span>
            <span className="font-medium" style={{color: colors.primary}}>
              {sortedCourses.length} {t?.courses?.courses}
            </span>
          </div>
          <div className="relative">
            <select
              className="bg-white pl-4 pr-8 py-2.5 rounded-lg border-2 border-gray-200 appearance-none focus:outline-none focus:border-[#008DCB]"
              style={{borderColor: colors.gray}}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">{t?.courses?.sortOptions?.popularity}</option>
              <option value="price">{t?.courses?.sortOptions?.price}</option>
              <option value="rating">{t?.courses?.sortOptions?.rating}</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favorites.includes(course.id)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={() => setSelectedCourse(course)}
              onHover={(e) => handleCourseHover(course, e)}
              onHoverEnd={() => setHoveredCourse(null)}
              colors={colors}
              t={t}
              language={language}
            />
          ))}
        </div>

        {/* Preview Card on Hover */}
        <AnimatePresence>
          {hoveredCourse && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed z-50 bg-white shadow-2xl rounded-xl p-4 w-80"
              style={{
                left: `${previewPosition.x}px`,
                top: `${previewPosition.y}px`,
              }}
            >
              <h3 className="text-lg font-bold mb-2" style={{color: colors.secondary}}>
                {hoveredCourse.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{borderColor: colors.primary}}>
                  <Image
                    src={hoveredCourse.instructorImage}
                    width={32}
                    height={32}
                    alt={hoveredCourse.instructor}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm" style={{color: colors.gray}}>
                  {hoveredCourse.instructor}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <DetailItem 
                  icon={<FiClock style={{color: colors.primary}} />}
                  label={t?.courses?.duration}
                  value={`${hoveredCourse.duration} ${t?.courses?.hours}`}
                />
                <DetailItem 
                  icon={<FiPlay style={{color: colors.primary}} />}
                  label={t?.courses?.lessons}
                  value={hoveredCourse.lessons}
                />
                <DetailItem 
                  icon={<FiUsers style={{color: colors.primary}} />}
                  label={t?.courses?.students}
                  value={hoveredCourse.studentsEnrolled}
                />
                <DetailItem 
                  icon={<FiTag style={{color: colors.primary}} />}
                  label={t?.courses?.level}
                  value={hoveredCourse.level}
                />
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {hoveredCourse.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hoveredCourse.discount && (
                    <span className="text-base font-bold" style={{color: colors.danger}}>
                      ${(hoveredCourse.price * (1 - hoveredCourse.discount / 100)).toFixed(2)}
                    </span>
                  )}
                  <span className={`text-base ${hoveredCourse.discount ? 'text-gray-400 line-through' : 'text-[#008DCB]'}`}>
                    ${hoveredCourse.price.toFixed(2)}
                  </span>
                </div>
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                  style={{backgroundColor: colors.primary, color: colors.white}}
                >
                  <FiShoppingCart />
                  <span>{t?.courses?.buyNow}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {sortedCourses.length === 0 && (
          <div className="text-center py-12" style={{color: colors.gray}}>
            <div className="text-2xl mb-4">😞 {t?.courses?.noResults}</div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="hover:underline"
              style={{color: colors.primary}}
            >
              {t?.courses?.resetFilters}
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
                    label={t?.courses?.duration}
                    value={`${selectedCourse.duration} ${t?.courses?.hours}`}
                  />
                  <DetailItem 
                    icon={<FiPlay style={{color: colors.primary}} />} 
                    label={t?.courses?.lessons}
                    value={selectedCourse.lessons}
                  />
                  <DetailItem 
                    icon={<FiUsers style={{color: colors.primary}} />} 
                    label={t?.courses?.students}
                    value={selectedCourse.studentsEnrolled}
                  />
                  <DetailItem 
                    icon={<FiTag style={{color: colors.primary}} />} 
                    label={t?.courses?.level}
                    value={selectedCourse.level}
                  />
                </div>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold mb-4" style={{color: colors.secondary}}>
                    {t?.courses?.courseDetails}
                  </h3>
                  <p className="text-gray-600">
                    {selectedCourse.description || t?.courses?.defaultDescription}
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
                      {t?.courses?.subscribeNow}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

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

const CourseCard = ({ course, isFavorite, onToggleFavorite, onViewDetails, onHover, onHoverEnd, colors, t, language }) => {
  return (
    <motion.div 
      className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {course.discount && (
        <div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold"
          style={{backgroundColor: colors.danger, color: colors.white}}
        >
          {course.discount}% {t?.courses?.discount}
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
              <FiHeart 
                className="w-6 h-6"
                style={{ 
                  color: isFavorite ? colors.danger : colors.gray,
                  fill: isFavorite ? colors.danger : 'none'
                }}
              />
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
              <span>{course.duration} {t?.courses?.hoursShort}</span>
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
            <span>{t?.courses?.buyNow}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="text-[#008DCB] mb-1">{icon}</div>
    <div className="font-medium text-sm text-[#0D1012]">{label}</div>
    <div className="text-gray-600 text-sm">{value}</div>
  </div>
);

export default CoursesPage;