"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiUser, FiMessageCircle } from 'react-icons/fi';
import List from './list';
import Link from 'next/link';

// ألوان التصميم الرئيسية
const colors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasNotifications] = useState(true);
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);

  // تأثيرات الحركة المحسنة
  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
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
    <header className="sticky top-0 z-50 bg-white shadow-sm" 
            style={{ backgroundColor: colors.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16 gap-4 rtl:space-x-reverse">
          
          {/* زر الدردشة مع تأثيرات متقدمة */}
          <Link href="/ChatAI" className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-lg transition-all"
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray}`
              }}
            >
              <FiMessageCircle 
                size={26} 
                className="hover:text-blue-600 transition-colors"
                style={{ color: colors.blue }}
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" 
                    style={{ backgroundColor: colors.yellow }} />
            </motion.div>
          </Link>

          {/* زر الإشعارات مع تصميم متطور */}
          <Link href="/Navigation">
            <motion.button 
              className="relative p-2 rounded-lg group"
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray}`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBell 
                size={26} 
                className="transition-colors group-hover:text-blue-600"
                style={{ color: colors.blue }}
              />
              {hasNotifications && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: colors.red }} />
              )}
            </motion.button>
          </Link>

          {/* قسم الملف الشخصي مع تفاصيل تصميمية */}
          <div className="relative" 
               ref={profileButtonRef}
               onMouseEnter={() => setIsProfileOpen(true)}
               onMouseLeave={() => setIsProfileOpen(false)}>
            <motion.button
              className="p-2 rounded-lg group transition-all"
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray}`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FiUser 
                size={26} 
                className="transition-colors group-hover:text-blue-600"
                style={{ color: colors.blue }}
              />
            </motion.button>

            {/* القائمة المنسدلة مع تصميم متكامل */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  ref={profileRef}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-2 w-48 origin-top-right"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.gray}`,
                    borderRadius: '12px',
                    boxShadow: `0 8px 24px rgba(${colors.black}, 0.1)`
                  }}
                >
                  <List 
                    colors={colors} 
                    onClose={() => setIsProfileOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}