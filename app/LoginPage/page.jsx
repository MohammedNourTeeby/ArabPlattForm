'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogIn, FiUser, FiLock, FiChevronDown, FiEye, FiEyeOff } from 'react-icons/fi';

// نظام الألوان المحدد
const colors = {
  primary: '#008DCB',    // 50%
  secondary: '#F9D011',  // 15%
  dark: '#0D1012',       // 15%
  danger: '#E2101E',     // 10%
  light: '#FFFFFF',      // 10%
  neutral: '#999999'     // 10%
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roles = [
    { value: 'Student', label: 'طالب' },
    { value: 'Traier', label: 'مدرب' },
    { value: 'Admin', label: 'الإدارة' },
    { value: 'Employee', label: 'الموظف' },
    { value: 'Wakil', label: 'الوكيل' },
    { value: 'Assist', label: 'المساعد' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setError('الرجاء ملء جميع الحقول واختيار الصلاحية');
      return;
    }
    router.push(`/DashBoard${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#008DCB]/10 via-[#F9D011]/05 to-[#FFFFFF]/5 p-4 relative overflow-hidden">
      {/* تأثيرات الخلفية الديناميكية */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#008DCB]/30 to-[#F9D011]/30 blur-3xl"
      />
      
      <motion.form
        onSubmit={handleLogin}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 space-y-6 relative z-10 backdrop-blur-lg border border-white/20"
      >
        {/* شعار الموقع */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-gradient-to-r from-[#008DCB]/10 to-[#F9D011]/10"
          >
            <img 
              src="/الاعتماد العربي.png" 
              alt="شعار المنصة"
              className="h-16 w-auto object-contain"
            />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#008DCB] to-[#F9D011] bg-clip-text text-transparent">
            نظام الإعتماد العربي
          </h1>
        </div>

        {/* حقل البريد الإلكتروني */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
          <label className="block text-sm font-medium text-[#0D1012]">البريد الإلكتروني</label>
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-[#008DCB]" />
            <input
              type="email"
              placeholder="example@domain.com"
              className="w-full pl-10 pr-4 py-3 border-2 border-[#999999]/30 rounded-xl focus:outline-none focus:border-[#008DCB] focus:ring-2 focus:ring-[#008DCB]/30 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </motion.div>

        {/* حقل كلمة المرور */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
          <label className="block text-sm font-medium text-[#0D1012]">كلمة المرور</label>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-[#008DCB]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 border-2 border-[#999999]/30 rounded-xl focus:outline-none focus:border-[#008DCB] focus:ring-2 focus:ring-[#008DCB]/30 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-[#999999] hover:text-[#008DCB] transition-colors"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </motion.div>

        {/* قائمة الصلاحيات */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-1">
          <label className="block text-sm font-medium text-[#0D1012]">صلاحية الدخول</label>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-3 border-2 border-[#999999]/30 rounded-xl appearance-none bg-white focus:outline-none focus:border-[#008DCB] focus:ring-2 focus:ring-[#008DCB]/30 transition-all"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setIsDropdownOpen(false)}
            >
              <option value="">اختر صلاحية الدخول</option>
              {roles.map((r) => (
                <option key={r.value} value={r.value} className="checked:bg-[#008DCB]/10">
                  {r.label}
                </option>
              ))}
            </select>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              className="absolute top-3 right-3 pointer-events-none"
            >
              <FiChevronDown className="text-[#999999]" />
            </motion.div>
          </div>
        </motion.div>

        {/* رسالة الخطأ */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-[#E2101E]/10 text-[#E2101E] rounded-lg flex items-center gap-2 border border-[#E2101E]/20"
            >
              <FiAlertCircle className="flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* زر الدخول */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-[#008DCB] to-[#F9D011] text-white font-semibold rounded-xl shadow-lg hover:shadow-[#008DCB]/30 transition-all relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FiLogIn className="text-lg" /> دخول إلى النظام
          </span>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
        </motion.button>

        {/* روابط إضافية */}
        <div className="flex items-center justify-between text-sm text-[#999999]">
          <a href="#" className="hover:text-[#008DCB] transition-colors">
            نسيت كلمة المرور؟
          </a>
          <a href="#" className="hover:text-[#008DCB] transition-colors">
            إنشاء حساب جديد
          </a>
        </div>
      </motion.form>
    </div>
  );
}