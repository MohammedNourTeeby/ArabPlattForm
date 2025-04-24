"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiHeart, FiMic, FiVideo, FiBell, FiShoppingCart, FiSearch, FiUser, FiMessageCircle } from 'react-icons/fi';
import List from '../DashBoardStudent/list';
import courseData from '../../data.json';
import Link from 'next/link';
import Image from 'next/image';

const COLORS = {
  primary: '#008DCB',
  secondary: '#0D1012',
  gray: '#999999',
  accent: '#E2101E',
  white: '#FFFFFF',
  highlight: '#F9D011'
};

const slideIn = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.2 } }
};

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const exploreRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const cartRef = useRef(null);

  const { categories, exploreData, allCourses } = useMemo(() => {
    const cats = courseData.categories.map(cat => ({
      title: cat.categoryName,
      icon: cat.icon,
      sub: cat.courses.map(course => course.name)
    }));
    
    const expData = courseData.categories.map(cat => ({
      category: cat.categoryName,
      icon: cat.icon,
      subSections: [{
        title: "الدورات",
        items: cat.courses.map(course => ({
          name: course.name,
          subItems: course.modules || []
        }))
      }]
    }));
    
    const allCourses = courseData.categories.flatMap(cat => cat.courses);
    
    return { categories: cats, exploreData: expData, allCourses };
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return allCourses.filter(course =>
      course.name.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery, allCourses]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClickOutside = useCallback((e) => {
    const refs = [
      [exploreRef, setExploreOpen],
      [profileRef, setIsProfileOpen],
      [notificationsRef, setNotificationsOpen],
      [cartRef, setCartOpen]
    ];
    
    refs.forEach(([ref, setter]) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setter(false);
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const notifications = [
    { id: 1, text: 'دورة Next.js الجديدة متاحة الآن', time: 'منذ ٢ ساعة' },
    { id: 2, text: 'تمت إضافة محاضرة جديدة في React', time: 'منذ ٥ ساعات' }
  ];

  const cartItems = [
    { id: 1, name: 'دورة Next.js', price: 249.99 },
    { id: 2, name: 'دورة React', price: 179.99 }
  ];

  return (
    <header className="w-full sticky top-0 z-50 font-din-next">
      <div 
        className={`relative bg-gradient-to-b from-[${COLORS.primary}] to-[${COLORS.primary}EE] border-b transition-all duration-300 ${
          isScrolled ? 'h-20 shadow-header' : 'h-24'
        }`}
        style={{ borderColor: `${COLORS.white}15` }}
      >
        <div className="max-w-8xl mx-auto px-6 h-full flex items-center justify-between">
          
          <div className="flex items-center gap-6 rtl:space-x-reverse">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-xl hover:bg-white/10"
              style={{ color: COLORS.white }}
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={28} />
            </motion.button>

            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/الاعتماد العربي.png"
                alt="Logo"
                width={isScrolled ? 120 : 150}
                height={isScrolled ? 40 : 50}
                className="transition-all duration-300 drop-shadow-logo"
              />
            </Link>
            
            <div className="hidden md:block relative">
              <motion.button 
                className="flex items-center gap-2 px-5 py-3 rounded-xl group"
                style={{ 
                  background: `linear-gradient(145deg, ${COLORS.primary} 30%, ${COLORS.highlight}AA 100%)`,
                  boxShadow: '0 4px 20px rgba(0, 141, 203, 0.2)'
                }}
                onClick={() => setExploreOpen(!exploreOpen)}
                whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(0, 141, 203, 0.3)' }}
              >
                <span className="text-white font-medium tracking-wide">استكشاف الدورات</span>
                <motion.span 
                  animate={{ rotate: exploreOpen ? 180 : 0 }}
                  className="text-white/80 group-hover:text-white"
                >
                  <FiChevronDown size={20} />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {exploreOpen && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeIn}
                    ref={exploreRef}
                    className="absolute top-full left-0 mt-3 w-[800px] shadow-2xl rounded-2xl overflow-hidden z-[1000]"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary}AA 100%)`,
                      backdropFilter: 'blur(12px)'
                    }}
                  >
                    <div className="grid grid-cols-3 gap-6 p-4">
                      {exploreData.map((section, index) => (
                        <div 
                          key={index} 
                          className="group relative"
                          onMouseEnter={() => setActiveCategory(index)}
                          onMouseLeave={() => setActiveCategory(null)}
                        >
                          <div 
                            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
                            style={{ color: COLORS.white }}
                          >
                            <span style={{ color: COLORS.highlight }}>{section.icon}</span>
                            <span className="font-semibold">{section.category}</span>
                          </div>
                          
                          {activeCategory === index && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute left-full top-0 ml-2 w-[500px] rounded-r-2xl p-4 shadow-lg z-[1000]"
                              style={{ backgroundColor: `${COLORS.primary}E6` }}
                            >
                              {section.subSections.map((subSec, j) => (
                                <div key={j} className="mb-4">
                                  <h4 className="font-medium mb-2" style={{ color: COLORS.white }}>{subSec.title}</h4>
                                  <div className="space-y-2">
                                    {subSec.items.map((item, k) => (
                                      <div 
                                        key={k} 
                                        className="group relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                                      >
                                        <a href="#" className="flex justify-between items-center">
                                          <span style={{ color: COLORS.white }}>{item.name}</span>
                                          {item.subItems.length > 0 && (
                                            <FiChevronDown className="text-sm" style={{ color: COLORS.white }} />
                                          )}
                                        </a>
                                        
                                        {item.subItems.length > 0 && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute left-full top-0 ml-2 w-[300px] rounded-lg p-3 shadow-lg z-[1000]"
                                            style={{ backgroundColor: `${COLORS.primary}CC` }}
                                          >
                                            {item.subItems.map((subItem, l) => (
                                              <a
                                                key={l}
                                                href="#"
                                                className="block p-2 rounded-md hover:bg-white/5 transition-colors"
                                                style={{ color: COLORS.white }}
                                              >
                                                {subItem}
                                              </a>
                                            ))}
                                          </motion.div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 mx-10 max-w-4xl">
            <form className="relative w-full transform transition-all duration-200 focus-within:scale-[1.02]">
              <input
                type="text"
                placeholder="ابحث في آلاف الدورات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-lg border-2 rounded-2xl py-4 px-8 pr-14 placeholder-gray-300 focus:ring-4 transition-all"
                style={{
                  backgroundColor: `${COLORS.white}15`,
                  borderColor: `${COLORS.white}25`,
                  color: COLORS.white,
                  focusBorderColor: COLORS.highlight,
                  focusRingColor: `${COLORS.highlight}30`
                }}
              />
              <button 
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10"
                style={{ color: COLORS.white }}
              >
                <FiSearch size={22} />
              </button>
              
              {searchResults.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={scaleUp}
                  className="absolute top-full w-full mt-2 shadow-xl rounded-2xl overflow-hidden z-[1000]"
                  style={{ backgroundColor: COLORS.secondary }}
                >
                  {searchResults.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <motion.div
                        className="p-3 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-4 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {course.image && (
                          <Image
                            src={course.image}
                            alt={course.name}
                            width={40}
                            height={40}
                            className="rounded-md"
                          />
                        )}
                        <div>
                          <p className="font-medium" style={{ color: COLORS.white }}>{course.name}</p>
                          <p className="text-sm" style={{ color: COLORS.gray }}>{course.instructor}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </form>
          </div>

          <div className="flex items-center gap-5 rtl:space-x-reverse">
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl relative overflow-hidden"
                style={{ 
                  backgroundColor: `${COLORS.white}15`,
                  boxShadow: '0 2px 8px rgba(13, 16, 18, 0.1)'
                }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#008DCB] to-[#F9D011] flex items-center justify-center">
                  <span className="text-white font-medium">م</span>
                </div>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeIn}
                    ref={profileRef}
                    className="absolute top-full right-0 mt-3 w-72 shadow-2xl rounded-2xl border z-[1000]"
                    style={{
                      backgroundColor: COLORS.secondary,
                      borderColor: `${COLORS.primary}50`
                    }}
                  >
                    <List />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="./FavoritesPage">
              <motion.button 
                className="hidden md:block p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                style={{ color: COLORS.white }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHeart size={26} />
              </motion.button>
            </Link>

            <div className="relative">
              <motion.button 
                className="hidden md:block p-2.5 rounded-xl relative group"
                style={{ 
                  backgroundColor: `${COLORS.white}15`,
                  boxShadow: '0 2px 8px rgba(13, 16, 18, 0.1)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCartOpen(!cartOpen)}
              >
                <FiShoppingCart 
                  size={26} 
                  className="text-white group-hover:text-[#F9D011] transition-colors" 
                />
                {cartItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: COLORS.accent,
                      color: COLORS.white,
                      boxShadow: '0 2px 4px rgba(226, 16, 30, 0.3)'
                    }}
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    variants={fadeIn}
                    ref={cartRef}
                    className="absolute top-full right-0 mt-3 w-80 shadow-xl rounded-2xl overflow-hidden z-[1000]"
                    style={{
                      background: `linear-gradient(145deg, ${COLORS.secondary} 0%, ${COLORS.primary}30 100%)`,
                      border: `1px solid ${COLORS.primary}30`
                    }}
                  >
                    <h3 className="text-lg font-semibold mb-4 p-4" style={{ color: COLORS.white }}>
                      سلة التسوق ({cartItems.length})
                    </h3>
                    <div className="space-y-4 px-4 pb-4">
                      {cartItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between p-3 rounded-lg"
                          style={{ backgroundColor: `${COLORS.white}05` }}
                        >
                          <span style={{ color: COLORS.white }}>{item.name}</span>
                          <span style={{ color: COLORS.highlight }}>${item.price}</span>
                        </div>
                      ))}
                      <button 
                        className="w-full py-3 rounded-xl mt-4 transition-colors font-medium"
                        style={{ 
                          backgroundColor: COLORS.highlight,
                          color: COLORS.secondary,
                          boxShadow: '0 4px 14px rgba(249, 208, 17, 0.3)'
                        }}
                      >
                        اتمام الشراء
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/ChatAI">
              <motion.button 
                className="hidden md:block p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                style={{ color: COLORS.white }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMessageCircle size={26} />
              </motion.button>
            </Link>

            <div className="relative">
              <motion.button 
                className="hidden md:block p-2.5 rounded-xl relative group"
                style={{ 
                  backgroundColor: `${COLORS.white}15`,
                  boxShadow: '0 2px 8px rgba(13, 16, 18, 0.1)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <FiBell 
                  size={26} 
                  className="text-white group-hover:text-[#F9D011] transition-colors" 
                />
                <span 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full ring-2"
                  style={{ 
                    backgroundColor: COLORS.accent,
                    borderColor: COLORS.primary
                  }}
                ></span>
              </motion.button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    variants={fadeIn}
                    ref={notificationsRef}
                    className="absolute top-full right-0 mt-3 w-80 shadow-xl rounded-2xl overflow-hidden z-[1000]"
                    style={{
                      background: `linear-gradient(145deg, ${COLORS.secondary} 0%, ${COLORS.primary}30 100%)`,
                      border: `1px solid ${COLORS.primary}30`
                    }}
                  >
                    <h3 className="text-lg font-semibold mb-4 p-4" style={{ color: COLORS.white }}>الإشعارات</h3>
                    <div className="space-y-4 px-4 pb-4">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className="p-3 rounded-lg hover:bg-white/5 transition-colors"
                          style={{ backgroundColor: `${COLORS.white}05` }}
                        >
                          <p style={{ color: COLORS.white }}>{notification.text}</p>
                          <p className="text-xs mt-1" style={{ color: COLORS.gray }}>{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/AddCommints">
              <motion.button 
                className="hidden md:block p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                style={{ color: COLORS.white }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <FiMic size={20} />
                  <FiVideo size={20} />
                </div>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <nav 
        className={`hidden md:block transition-all ${
          isScrolled ? 'py-3' : 'py-4'
        } bg-gradient-to-b from-[${COLORS.secondary}EE] to-[${COLORS.secondary}]`}
        style={{ boxShadow: '0 4px 20px rgba(13, 16, 18, 0.1)' }}
      >
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex justify-center gap-10 rtl:space-x-reverse">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveCategory(index)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <motion.a 
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                  style={{ color: COLORS.primary }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span 
                    className="text-xl transition-colors"
                    style={{ color: COLORS.primary }}
                  >
                    {category.icon}
                  </span>
                  <span className="font-medium tracking-wide">{category.title}</span>
                </motion.a>

                <AnimatePresence>
                  {activeCategory === index && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fadeIn}
                      className="absolute top-full left-1/2 -translate-x-1/2 shadow-2xl rounded-2xl overflow-hidden z-[1000]"
                      style={{
                        background: `linear-gradient(145deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                        border: `1px solid ${COLORS.primary}30`
                      }}
                    >
                      <div className="grid grid-cols-2 gap-4 p-5 min-w-[400px]">
                        {category.sub.map((item, i) => (
                          <a
                            key={i}
                            href="#"
                            className="px-5 py-3 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors"
                          >
                            <span 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: COLORS.highlight }}
                            ></span>
                            <span style={{ color: COLORS.white }}>{item}</span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-lg"
              style={{ backgroundColor: `${COLORS.secondary}CC` }}
              onClick={() => setIsSidebarOpen(false)}
            />
            
            <motion.div 
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 w-96 shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="p-6 flex justify-between items-center border-b"
                style={{ borderColor: `${COLORS.white}20` }}
              >
                <h2 className="text-2xl font-bold" style={{ color: COLORS.white }}>القائمة</h2>
                <motion.button 
                  className="p-2 rounded-full hover:bg-white/10"
                  onClick={() => setIsSidebarOpen(false)}
                  whileHover={{ rotate: 90 }}
                >
                  <FiX size={28} style={{ color: COLORS.white }} />
                </motion.button>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                <div className="flex items-center gap-4 pb-6 border-b"
                  style={{ borderColor: `${COLORS.white}10` }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#008DCB] to-[#F9D011]">
                    <span className="text-2xl font-bold" style={{ color: COLORS.primary }}>م</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: COLORS.white }}>مرحبا بك!</h3>
                    <p className="text-sm" style={{ color: COLORS.gray }}>سجل الدخول للوصول الكامل</p>
                    <div className="flex gap-3 mt-3">
                      <button 
                        className="px-6 py-2 rounded-xl transition-colors font-medium"
                        style={{ 
                          backgroundColor: COLORS.highlight,
                          color: COLORS.secondary,
                          boxShadow: '0 4px 14px rgba(249, 208, 17, 0.3)'
                        }}
                      >
                        تسجيل الدخول
                      </button>
                      <button 
                        className="px-6 py-2 border rounded-xl transition-colors hover:bg-white/10"
                        style={{ 
                          borderColor: `${COLORS.white}20`, 
                          color: COLORS.white 
                        }}
                      >
                        إنشاء حساب
                      </button>
                    </div>
                  </div>
                </div>

                <form className="relative">
                  <input
                    type="text"
                    placeholder="البحث..."
                    className="w-full rounded-xl py-3 px-6 pr-12 bg-white/5 border-2 border-white/10 focus:border-[#F9D011] transition-colors"
                    style={{ color: COLORS.white }}
                  />
                  <FiSearch 
                    className="absolute left-6 top-1/2 -translate-y-1/2"
                    style={{ color: COLORS.gray }}
                  />
                </form>
                
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div 
                      key={index} 
                      className="border-b last:border-0"
                      style={{ borderColor: `${COLORS.white}10` }}
                    >
                      <button 
                        className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-white/10 transition-colors"
                        style={{ color: COLORS.white }}
                        onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl" style={{ color: COLORS.highlight }}>{category.icon}</span>
                          {category.title}
                        </div>
                        <FiChevronDown className={`transform transition-transform ${
                          activeCategory === index ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {activeCategory === index && (
                        <motion.div 
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={fadeIn}
                          className="pl-6"
                        >
                          {category.sub.map((sub, i) => (
                            <a 
                              key={i} 
                              href="#" 
                              className="block p-4 rounded-lg hover:bg-white/5 transition-colors"
                              style={{ color: `${COLORS.white}CC` }}
                            >
                              {sub}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t"
                  style={{ borderColor: `${COLORS.white}10` }}
                >
                  {[
                    { icon: <FiHeart />, text: 'المفضلة' },
                    { icon: <FiShoppingCart />, text: 'السلة' },
                    { icon: <FiBell />, text: 'الإشعارات' },
                    { icon: <FiUser />, text: 'الحساب' },
                  ].map((item, i) => (
                    <button 
                      key={i}
                      className="p-3 flex flex-col items-center gap-2 rounded-xl hover:bg-white/5 transition-colors"
                      style={{ color: `${COLORS.white}CC` }}
                    >
                      {React.cloneElement(item.icon, { size: 24 })}
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;