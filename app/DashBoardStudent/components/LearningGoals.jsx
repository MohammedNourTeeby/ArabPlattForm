// src/components/LearningGoals.jsx
"use client"
import { useState } from 'react';
import {
  FiTool,
  FiAward,
  FiBarChart2,
  FiUsers,
  FiArrowRight,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';

// نظام الألوان المحدد
const colors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

const LearningGoals = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const cardsData = [
    {
      id: 1,
      title: 'التدريب العملي',
      description: 'قم بتطوير مهاراتك بشكل فعال باستخدام تمارين البرمجة التفاعلية والتدريبات العملية',
      icon: <FiTool className="text-2xl" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: colors.blue + '1A' }}>
            <h3 className="text-xl font-bold" style={{ color: colors.black }}>Containerization</h3>
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: colors.yellow + '33', color: colors.black }}>جديد</span>
          </div>
          
          <div className="p-6 rounded-xl" style={{ backgroundColor: colors.white, boxShadow: '0 4px 6px' + colors.gray + '1A' }}>
            <div className="flex justify-between mb-4">
              <span className="text-sm" style={{ color: colors.gray }}>التقدم الشهري</span>
              <span className="font-semibold" style={{ color: colors.blue }}>75%</span>
            </div>
            <CircularProgressbar  
              completed={75}
              height="12px"
              bgColor={colors.blue}
              baseBgColor={colors.gray + '33'}
              borderRadius="8px"
              labelAlignment="center"
              labelColor={colors.white}
              transitionDuration="1s"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.gray + '1A' }}>
              <p className="text-sm" style={{ color: colors.gray }}>أعلى درجة</p>
              <p className="text-2xl font-bold" style={{ color: colors.black }}>159</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.blue + '1A' }}>
              <p className="text-sm" style={{ color: colors.blue }}>النسبة المئوية</p>
              <p className="text-2xl font-bold" style={{ color: colors.blue }}>88%</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'إعداد الشهادة',
      description: 'استعد للحصول على شهادات معترف بها عالمياً مع اختبارات محاكاة تفاعلية',
      icon: <FiAward className="text-2xl" />,
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{ backgroundColor: colors.white, boxShadow: '0 4px 6px' + colors.gray + '1A' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.black }}>مسار الشهادة الاحترافية</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.gray }}>إكمال المحتوى</span>
                <span className="font-semibold" style={{ color: colors.blue }}>60%</span>
              </div>
              <div className="relative pt-1">
                <div className="flex h-3 rounded-full" style={{ backgroundColor: colors.gray + '33' }}>
                  <div 
                    className="rounded-full transition-all duration-500" 
                    style={{ width: '60%', backgroundColor: colors.blue }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.red + '1A' }}>
              <p className="text-sm" style={{ color: colors.red }}>الاختبارات المتبقية</p>
              <p className="text-2xl font-bold" style={{ color: colors.red }}>3</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.yellow + '1A' }}>
              <p className="text-sm" style={{ color: colors.yellow }}>المحاولات المتاحة</p>
              <p className="text-2xl font-bold" style={{ color: colors.yellow }}>∞</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'الرؤى والتحليلات',
      description: 'تتبع تقدمك بدقة مع لوحة تحليلات تفاعلية ورسومات بيانية متقدمة',
      icon: <FiBarChart2 className="text-2xl" />,
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{ backgroundColor: colors.white, boxShadow: '0 4px 6px' + colors.gray + '1A' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.black }}>الإحصائيات العامة</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.gray + '0D' }}>
                <p className="text-sm" style={{ color: colors.gray }}>الدورات المكتملة</p>
                <p className="text-2xl font-bold" style={{ color: colors.black }}>12</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.blue + '0D' }}>
                <p className="text-sm" style={{ color: colors.blue }}>متوسط النقاط</p>
                <p className="text-2xl font-bold" style={{ color: colors.blue }}>89%</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.yellow + '0D' }}>
                <p className="text-sm" style={{ color: colors.yellow }}>النشاط اليومي</p>
                <p className="text-2xl font-bold" style={{ color: colors.yellow }}>4.5h</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: colors.white, boxShadow: '0 4px 6px' + colors.gray + '1A' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm" style={{ color: colors.gray }}>توزيع المهارات</span>
              <div className="flex space-x-2">
                <button 
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  style={{ color: colors.gray }}
                >
                  <FiChevronLeft />
                </button>
                <button 
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  style={{ color: colors.gray }}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
            <div className="h-48 rounded-xl" style={{ backgroundColor: colors.gray + '1A' }} />
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'محتوى قابل للتخصيص',
      description: 'صمم مسارك التعليمي الخاص بناءً على أهدافك ومستوى مهاراتك',
      icon: <FiUsers className="text-2xl" />,
      content: (
        <div className="space-y-6">
          <div className="p-6 rounded-xl" style={{ backgroundColor: colors.white, boxShadow: '0 4px 6px' + colors.gray + '1A' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.black }}>المسار المخصص</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.gray + '0D' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.gray }}>المدة المتوقعة</span>
                  <span className="font-semibold" style={{ color: colors.blue }}>6 أشهر</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.gray + '0D' }}>
                <p className="text-sm mb-2" style={{ color: colors.gray }}>المواد المختارة</p>
                <div className="flex flex-wrap gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: colors.blue + '33', color: colors.blue }}
                  >
                    React Basics
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: colors.red + '33', color: colors.red }}
                  >
                    Next.js Advanced
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: colors.yellow + '33', color: colors.yellow }}
                  >
                    Node.js Fundamentals
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="w-full py-3 rounded-xl transition-all duration-300 font-semibold"
            style={{ 
              backgroundColor: colors.blue,
              color: colors.white,
              boxShadow: `0 4px 14px ${colors.blue}33`,
              ':hover': {
                backgroundColor: '#007AB3'
              }
            }}
          >
            بدء المسار التعليمي
          </button>
        </div>
      ),
    },
  ];

  return (
    <div 
      className="flex flex-col lg:flex-row w-full min-h-screen p-4 lg:p-8"
      style={{ backgroundColor: colors.white }}
    >
         <div className="w-full lg:hidden mb-8"> {/* للجوال فقط */}
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl font-bold text-center"
      style={{ color: colors.black }}
    >
      التعلّم يركز على أهدافك
      <div 
        className="w-16 h-1 mx-auto mt-2 rounded-full"
        style={{ backgroundColor: colors.blue }}
      />
    </motion.h2>
  </div>
      <div className="w-full lg:w-1/2 xl:w-2/5 space-y-4 lg:pr-8 mb-8 lg:mb-0">
      <motion.div 
      className="hidden lg:block mb-8" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 
        className="text-4xl font-bold leading-tight"
        style={{ color: colors.black }}
      >
        التعلّم يركز
        <br />
        <span 
          className="relative"
          style={{ color: colors.blue }}
        >
          على أهدافك
          <div 
            className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
            style={{ backgroundColor: colors.yellow }}
          />
        </span>
      </h2>
      <p 
        className="mt-4 text-lg"
        style={{ color: colors.gray }}
      >
        اختر مسارك التعليمي الذي يتوافق مع طموحاتك المهنية
      </p>
    </motion.div>
        {cardsData.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => {
              setSelectedCard(index);
              setIsDetailOpen(true);
            }}
            className={`group relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedCard === index 
                ? 'border-2 shadow-xl'
                : 'shadow-md hover:shadow-lg'
            }`}
            style={{
              backgroundColor: selectedCard === index ? colors.white : colors.white,
              borderColor: selectedCard === index ? colors.blue : 'transparent',
              boxShadow: selectedCard === index 
                ? `0 8px 24px ${colors.gray}1A` 
                : `0 4px 12px ${colors.gray}0D`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="p-3 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: selectedCard === index 
                      ? colors.blue + '33' 
                      : colors.gray + '1A',
                    color: selectedCard === index ? colors.blue : colors.gray
                  }}
                >
                  {card.icon}
                </div>
                <h3 
                  className="mr-4 text-xl font-bold"
                  style={{ color: colors.black }}
                >
                  {card.title}
                </h3>
              </div>
              <FiArrowRight 
                className={`transform transition-transform ${
                  selectedCard === index ? 'rotate-0' : 'group-hover:translate-x-1'
                }`}
                style={{ color: colors.gray }}
              />
            </div>
            <p 
              className="mt-3 leading-relaxed"
              style={{ color: colors.gray }}
            >
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="w-full lg:w-1/2 xl:w-3/5 rounded-xl overflow-hidden relative"
            style={{ 
              backgroundColor: colors.white,
              boxShadow: `0 8px 32px ${colors.gray}1A`
            }}
          >
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-full transition-colors hover:bg-gray-100"
              style={{ color: colors.gray }}
            >
              <FiX className="text-xl" />
            </button>
            
            <div className="p-6 lg:p-8 h-full overflow-y-auto">
              {cardsData[selectedCard].content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningGoals;