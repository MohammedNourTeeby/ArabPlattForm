"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiChevronUp, FiBell, FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi';
import List from '../DashBoardStudent/list';
import courseData from '../../data.json';

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
  
  const exploreRef = useRef(null);
  const profileRef = useRef(null);

  // تحويل البيانات مع memoization
  const { categories, exploreData } = useMemo(() => {
    const cats = courseData.categories.map(cat => ({
      title: cat.categoryName,
      sub: cat.courses.map(course => course.name)
    }));
    
    const expData = courseData.categories.map(cat => ({
      category: cat.categoryName,
      icon: cat.icon,
      subSections: [{
        title: "الدورات",
        items: cat.courses.map(course => ({
          name: course.name,
          subItems: course.modules || [] // إضافة محتويات الدورة
        }))
      }]
    }));
    
    return { categories: cats, exploreData: expData };
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClickOutside = useCallback((e) => {
    if (exploreOpen && exploreRef.current && !exploreRef.current.contains(e.target)) {
      setExploreOpen(false);
    }
    if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
  }, [exploreOpen, isProfileOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* تحسين التدرج اللوني */}
      <div className={`bg-gradient-to-r from-purple-800 to-blue-900 border-b border-purple-900 transition-all duration-300 ${isScrolled ? 'h-20 shadow-xl' : 'h-24'}`}>
        <div className="max-w-8xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* الجزء الأيسر */}
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
            
            {/* زر الاستكشاف المطور */}
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
                    className="absolute top-full left-0 mt-3 w-[800px] bg-purple-900 shadow-2xl rounded-2xl p-4 z-50"
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
                          
                          {/* القائمة المتداخلة */}
                          {activeCategory === index && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute left-full top-0 ml-2 w-[500px] h-full bg-purple-800 rounded-r-2xl p-4 shadow-lg"
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
                                        
                                        {/* المستوى الثالث */}
                                        {item.subItems.length > 0 && (
                                          <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute left-full top-0 ml-2 w-[300px] bg-purple-700 rounded-lg p-3 shadow-lg"
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

          {/* بقية المكونات بدون تغيير */}
          <div className="hidden md:flex items-center flex-1 mx-10 max-w-4xl">
            <form className="relative w-full group">
              <input
                type="text"
                placeholder="ابحث في آلاف الدورات..."
                className="w-full bg-white/10 backdrop-blur-lg border-2 border-transparent rounded-2xl py-4 px-8 pr-14 text-white placeholder-gray-300 
                  focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 transition-all"
              />
              <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                <FiSearch size={22} />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-5 rtl:space-x-reverse">
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <FiUser size={26} />
              </motion.button>
              
              {isProfileOpen && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeIn}
                  ref={profileRef}
                  className="absolute top-full right-0 mt-3 w-72 bg-purple-900 shadow-2xl rounded-2xl p-4 z-50"
                >
                  <List />
                </motion.div>
              )}
            </div>

            <motion.button 
              className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingCart size={26} />
            </motion.button>
            
            <motion.button 
              className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBell size={26} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full ring-2 ring-purple-900"></span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* شريط التصنيفات */}
      <nav className={`bg-purple-900/95 backdrop-blur-sm hidden md:block ${isScrolled ? 'py-3' : 'py-4'}`}>
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
                  <span>{category.title}</span>
                  <FiChevronDown size={18} />
                </motion.a>

                {activeCategory === index && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeIn}
                    className="absolute top-full left-1/2 -translate-x-1/2 bg-purple-800 shadow-2xl rounded-2xl p-5 min-w-[400px] z-50"
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
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* القائمة الجانبية */}
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
                        <span>{category.title}</span>
                        <FiChevronDown />
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;