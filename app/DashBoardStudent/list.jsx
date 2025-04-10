"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiBell, FiMessageSquare, FiSettings, FiCreditCard, FiClock, FiDollarSign, FiGlobe, FiUser, FiEdit, FiHelpCircle, FiLogOut, FiBriefcase } from 'react-icons/fi';

const List = () => {
  const menuVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-purple-50 to-white shadow-xl rounded-2xl p-6 border border-purple-100 overflow-y-auto max-h-[750px] backdrop-blur-sm">
      {/* قسم معلومات المستخدم */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={menuVariants}
        className="pb-6 border-b border-purple-200 mb-6"
      >
        <h3 className="font-bold text-purple-900 text-right text-lg mb-1">د. محمد نور طبيب</h3>
        <p className="text-purple-600 text-sm text-right">mohammednourteby@g...</p>
      </motion.div>

      {/* القائمة الرئيسية */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={menuVariants}
        className="space-y-4 text-right"
      >
        {/* القسم التعليمي */}
        <Link href="./Courses" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>تعليمي</span>
          <FiShoppingCart className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="#" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>عربة التسوق الخاصة بي</span>
          <FiShoppingCart className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="./FavoritesPage" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>قائمة الرغبات</span>
          <FiHeart className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="./DashBoardTraier" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>لوحة معلومات المدرب</span>
          <FiBriefcase className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        {/* فاصل */}
        <div className="border-t border-purple-100 my-5"></div>

        {/* الإشعارات والرسائل */}
        <Link href="./Navigation" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>إشعارات</span>
          <FiBell className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="./Massage" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>رسائل</span>
          <FiMessageSquare className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        {/* فاصل */}
        <div className="border-t border-purple-100 my-5"></div>

        {/* إعدادات الحساب */}
        <Link href="./AccountSettings" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>إعدادات الحساب</span>
          <FiSettings className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="./Payment" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>طرق الدفع</span>
          <FiCreditCard className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="./Subscription" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>الاشتراكات</span>
          <FiClock className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="#" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>رصيد </span>
          <FiDollarSign className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="#" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>سجل الشراء</span>
          <FiCreditCard className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        {/* فاصل */}
        <div className="border-t border-purple-100 my-5"></div>

        {/* اللغة */}
        <div className="flex justify-between items-center text-purple-800 p-3 bg-purple-50 rounded-xl">
          <div className="flex items-center gap-2">
            <FiGlobe className="text-purple-600" />
            <span>اللغة</span>
          </div>
          <span className="text-purple-500">الإنجليزية</span>
        </div>

        {/* الملف الشخصي */}
        <Link href="./ProfileSettings " className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>الملف الشخصي العام</span>
          <FiUser className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link href="./ProfileSettings " className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>تعديل الملف الشخصي</span>
          <FiEdit className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        {/* فاصل */}
        <div className="border-t border-purple-100 my-5"></div>

        {/* المساعدة وتسجيل الخروج */}
        <Link href="./Help" className="flex items-center justify-end gap-3 text-purple-800 hover:bg-purple-50 p-3 rounded-xl transition-all group">
          <span>المساعدة والدعم</span>
          <FiHelpCircle className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-end gap-3 text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all"
        >
          <span>تسجيل الخروج</span>
          <FiLogOut className="text-red-500" />
        </motion.button>

        {/* قسم بوديمي للأعمال */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white"
        >
          <div className="flex items-center gap-3">
            <FiBriefcase className="text-2xl" />
            <div>
              <h4 className="font-bold text-lg">              الإعتــمـاد العــربــي
              للأعمال</h4>
              <p className="text-sm opacity-90 mt-1">جلب التعلم إلى شركتك</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default List;