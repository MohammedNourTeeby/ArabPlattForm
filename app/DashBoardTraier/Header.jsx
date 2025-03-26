"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiUser } from 'react-icons/fi';
import List from './list';
import Link from 'next/link';
import { FiMessageCircle } from 'react-icons/fi'; // Feather Icons
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'; // Heroicons v2

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);

  // تأثيرات الحركة
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && 
          profileRef.current && 
          !profileRef.current.contains(event.target) && 
          !profileButtonRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <div className="flex mr-7 justify-end gap-5 rtl:space-x-reverse">
      
      {/* زر الإشعارات المطور */}
                  <Link href="/Navigation">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 relative bg-white/5 backdrop-blur-sm rounded-xl hover:bg-purple-50 transition-colors"
        aria-label="الإشعارات"
      >
        <FiBell size={26} className="text-purple-600" />
        {hasNotifications && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full ring-2 ring-white" />
        )}
      </motion.button>
</Link>


      {/* قسم الملف الشخصي المطور */}
      <div 
        className="relative"
        ref={profileButtonRef}
        onMouseEnter={() => setIsProfileOpen(true)}
        onMouseLeave={() => setIsProfileOpen(false)}
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-purple-50 transition-colors"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          aria-label="الملف الشخصي"
        >
          <FiUser size={26} className="text-purple-600" />
        </motion.button>
        
        
        {/* القائمة المنسدلة مع التحسينات */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ duration: 0.2 }}
              ref={profileRef}
              className="absolute top-full right-0 mt-3 z-50"
            >
              <List />
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
       {/* زر الدعم الجديد */}
       <Link href="/ChatAI">
              <motion.button 
                className="hidden md:block p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-purple-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMessageCircle size={26} />
              </motion.button>
            </Link>
      
    </div>
  );
}