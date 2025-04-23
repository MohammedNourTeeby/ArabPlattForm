"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiHeart, FiMic, FiVideo, FiBell, FiShoppingCart, FiSearch, FiUser, FiMessageCircle } from 'react-icons/fi';
import List from '../DashBoardStudent/list';
import courseData from '../../data.json';
import Link from 'next/link';
import Image from 'next/image';

const slideIn = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.2 } }
};

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
    <header className="w-full sticky top-0 z-50">
      <div className={`bg-gradient-to-r from-purple-800 to-blue-900 border-b border-purple-900 transition-all duration-300 ${isScrolled ? 'h-20 shadow-xl' : 'h-24'}`}>
        <div className="max-w-8xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* الجانب الأيسر */}
          <div className="flex items-center gap-6 rtl:space-x-reverse">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-full text-white hover:bg-white/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={28} />
            </motion.button>

            <motion.a 
              href="/" 
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300"
              whileHover={{ scale: 1.02 }}
            >
              الإعتــمـاد العــربــي
            </motion.a>
            
            {/* زر الاستكشاف المعدل */}
            <div className="hidden md:block relative">
              <motion.button 
                className="flex items-center gap-2 text-white px-5 py-3 rounded-xl hover:bg-white/10 transition-colors"
                onClick={() => setExploreOpen(!exploreOpen)}
                whileHover={{ scale: 1.02 }}
              >
                <span>استكشاف الدورات</span>
                <motion.span animate={{ rotate: exploreOpen ? 180 : 0 }}>
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
                    className="absolute top-full left-0 mt-3 w-[800px] bg-purple-900 shadow-2xl rounded-2xl p-4 z-[1000]"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {exploreData.map((section, index) => (
                        <div 
                          key={index} 
                          className="group relative"
                          onMouseEnter={() => setActiveCategory(index)}
                          onMouseLeave={() => setActiveCategory(null)}
                        >
                          <div className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl cursor-pointer">
                            <span className="text-purple-300">{section.icon}</span>
                            <span className="font-semibold">{section.category}</span>
                          </div>
                          
                          {activeCategory === index && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute left-full top-0 ml-2 w-[500px] bg-purple-800 rounded-r-2xl p-4 shadow-lg z-[1000]"
                            >
                              {section.subSections.map((subSec, j) => (
                                <div key={j} className="mb-4">
                                  <h4 className="text-white font-medium mb-2">{subSec.title}</h4>
                                  <div className="space-y-2">
                                    {subSec.items.map((item, k) => (
                                      <div 
                                        key={k} 
                                        className="group relative p-2 hover:bg-white/5 rounded-lg"
                                      >
                                        <a href="#" className="flex justify-between items-center">
                                          <span>{item.name}</span>
                                          {item.subItems.length > 0 && (
                                            <FiChevronDown className="text-sm" />
                                          )}
                                        </a>
                                        
                                        {item.subItems.length > 0 && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute left-full top-0 ml-2 w-[300px] bg-purple-700 rounded-lg p-3 shadow-lg z-[1000]"
                                          >
                                            {item.subItems.map((subItem, l) => (
                                              <a
                                                key={l}
                                                href="#"
                                                className="block p-2 hover:bg-white/5 rounded-md"
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

          {/* شريط البحث */}
          <div className="hidden md:flex items-center flex-1 mx-10 max-w-4xl">
            <form className="relative w-full group">
              <input
                type="text"
                placeholder="ابحث في آلاف الدورات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-lg border-2 border-transparent rounded-2xl py-4 px-8 pr-14 text-white placeholder-gray-300 
                  focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all"
              />
              <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                <FiSearch size={22} />
              </button>
              
              {searchResults.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeIn}
                  className="absolute top-full w-full mt-2 bg-purple-900 shadow-xl rounded-2xl p-4 z-[1000]"
                >
                  {searchResults.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <motion.div
                        className="p-3 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-4"
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
                          <p className="text-white font-medium">{course.name}</p>
                          <p className="text-sm text-white/60">{course.instructor}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </form>
          </div>

          {/* الأيقونات الجانبية */}
          <div className="flex items-center gap-5 rtl:space-x-reverse">
            {/* زر المستخدم المعدل */}
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <FiUser size={26} />
              </motion.button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeIn}
                    ref={profileRef}
                    className="absolute top-full right-0 mt-3 w-72 bg-purple-900 shadow-2xl rounded-2xl p-4 z-[1000]"
                  >
                    <List />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="./FavoritesPage">
              <motion.button 
                className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHeart size={26} />
              </motion.button>
            </Link>

            <div className="relative">
              <motion.button 
                className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCartOpen(!cartOpen)}
              >
                <FiShoppingCart size={26} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-400 text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {cartOpen && (
                  <motion.div
                    variants={fadeIn}
                    ref={cartRef}
                    className="absolute top-full right-0 mt-3 w-80 bg-purple-900 shadow-xl rounded-2xl p-4 z-[1000]"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">سلة التسوق ({cartItems.length})</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg">
                          <span className="text-white/80">{item.name}</span>
                          <span className="text-purple-300">${item.price}</span>
                        </div>
                      ))}
                      <button className="w-full bg-purple-500 hover:bg-purple-400 text-white py-3 rounded-xl mt-4 transition-colors">
                        اتمام الشراء
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/ChatAI">
              <motion.button 
                className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMessageCircle size={26} />
              </motion.button>
            </Link>

            <div className="relative">
              <motion.button 
                className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <FiBell size={26} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ring-2 ring-purple-900"></span>
              </motion.button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    variants={fadeIn}
                    ref={notificationsRef}
                    className="absolute top-full right-0 mt-3 w-80 bg-purple-900 shadow-xl rounded-2xl p-4 z-[1000]"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">الإشعارات</h3>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-3 hover:bg-white/5 rounded-lg">
                          <p className="text-white/80">{notification.text}</p>
                          <p className="text-xs text-white/50 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/AddCommints">
              <motion.button 
                className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white relative"
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

      <nav className={`bg-purple-900/95 hidden md:block transition-all ${isScrolled ? 'py-3' : 'py-4'}`}>
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
                  className="flex items-center gap-2 px-5 py-2.5 text-purple-100 hover:text-white rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.title}</span>
                </motion.a>

                <AnimatePresence>
                  {activeCategory === index && (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fadeIn}
                      className="absolute top-full left-1/2 -translate-x-1/2 bg-purple-800 shadow-2xl rounded-2xl p-5 min-w-[400px] z-[1000]"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {category.sub.map((item, i) => (
                          <a
                            key={i}
                            href="#"
                            className="px-5 py-3 hover:bg-white/5 rounded-lg flex items-center gap-3"
                          >
                            <span className="w-2 h-2 bg-purple-300 rounded-full"></span>
                            {item}
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
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            
            <motion.div 
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 z-50 w-96 bg-purple-900 shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-purple-800">
                <h2 className="text-2xl font-bold text-white">القائمة</h2>
                <motion.button 
                  className="p-2 text-white hover:bg-white/10 rounded-full"
                  onClick={() => setIsSidebarOpen(false)}
                  whileHover={{ rotate: 90 }}
                >
                  <FiX size={28} />
                </motion.button>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                  <div className="w-16 h-16 rounded-full bg-purple-300 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-900">م</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">مرحبا بك!</h3>
                    <p className="text-white/60">سجل الدخول للوصول الكامل</p>
                    <div className="flex gap-3 mt-3">
                      <button className="px-6 py-2 bg-purple-500 rounded-xl text-white hover:bg-purple-400">
                        تسجيل الدخول
                      </button>
                      <button className="px-6 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10">
                        إنشاء حساب
                      </button>
                    </div>
                  </div>
                </div>

                <form className="relative">
                  <input
                    type="text"
                    placeholder="البحث..."
                    className="w-full bg-white/5 border-2 border-transparent rounded-xl py-3 px-6 text-white placeholder-gray-400 
                      focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30"
                  />
                  <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                </form>
                
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={index} className="border-b border-purple-800 last:border-0">
                      <button 
                        className="w-full flex justify-between items-center p-4 text-white hover:bg-white/5 rounded-xl"
                        onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category.icon}</span>
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
                              className="block p-4 text-purple-200 hover:text-white hover:bg-white/5 rounded-lg"
                            >
                              {sub}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <button className="p-3 flex flex-col items-center gap-2 hover:bg-white/5 rounded-xl text-white/80 hover:text-white">
                    <FiHeart size={24} />
                    <span>المفضلة</span>
                  </button>
                  <button className="p-3 flex flex-col items-center gap-2 hover:bg-white/5 rounded-xl text-white/80 hover:text-white">
                    <FiShoppingCart size={24} />
                    <span>السلة</span>
                  </button>
                  <button className="p-3 flex flex-col items-center gap-2 hover:bg-white/5 rounded-xl text-white/80 hover:text-white">
                    <FiBell size={24} />
                    <span>الإشعارات</span>
                  </button>
                  <button className="p-3 flex flex-col items-center gap-2 hover:bg-white/5 rounded-xl text-white/80 hover:text-white">
                    <FiUser size={24} />
                    <span>الحساب</span>
                  </button>
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