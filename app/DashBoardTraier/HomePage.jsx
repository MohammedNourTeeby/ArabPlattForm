"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiPlayCircle, FiVideo, FiUsers, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const HomePage = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/20 p-8 font-din-next">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* العنوان الرئيسي مع تحسينات الحركة */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            لوحة المدرب <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">المتقدمة</span>
          </h1>
          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <FiPlayCircle className="text-xl" />
              <span className="font-medium">الدروس التعليمية</span>
            </motion.button>
          </div>
        </motion.div>

        {/* بطاقة الإنشاء الرئيسية مع تأثيرات Parallax */}
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <div className="p-10 text-white relative z-10">
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="relative z-20 max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-6 leading-tight"
              >
                ابدأ رحلتك في إنشاء
                <br />
                <span className="text-4xl">دورة تدريبية مذهلة</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-purple-100 mb-8 leading-relaxed"
              >
                سواء كنت مُعلّمًا محترفًا أو مبتدئًا، نوفر لك الأدوات الذكية والموارد اللازمة 
                لتصميم تجربة تعليمية فريدة تلامس آفاق الإبداع.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="./AddCourse"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold
                           flex items-center gap-3 hover:bg-opacity-90 transition-all
                           shadow-lg hover:shadow-xl active:scale-95"
                >
                  <FiPlus className="text-2xl" />
                  بدء دورة جديدة
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl
                            flex items-center gap-3 hover:bg-white/10 transition-all
                            backdrop-blur-sm active:scale-95"
                >
                  <FiPlayCircle className="text-2xl" />
                  عرض النموذج التفاعلي
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* قسم الموارد مع تأثيرات Scroll */}
        <div className="space-y-8">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold text-gray-900 text-center mb-12"
          >
            مواردنا <span className="text-purple-600">الاستثنائية</span> لنجاحك
          </motion.h3>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <FiVideo />,
                color: 'purple',
                title: 'إتقان صناعة الفيديو',
                content: 'أدلة متقدمة في إنتاج المحتوى المرئي، تقنيات إضاءة متطورة، وأسرار تحرير فيديو احترافي.',
                link: '/resources/creation'
              },
              {
                icon: <FiPlayCircle />,
                color: 'blue',
                title: 'نظام التحميل الذكي',
                content: 'منصة تحميل بدقة 4K، تحليلات أداء فورية، وتحسين تلقائي لجودة المحتوى.',
                link: '/resources/video'
              },
              {
                icon: <FiUsers />,
                color: 'green',
                title: 'بناء الإمبراطورية',
                content: 'استراتيجيات تسويقية ذكية، أدوات تحليل الجمهور، ونماذج تفاعل مبتكرة.',
                link: '/resources/audience'
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className={`bg-white rounded-2xl p-8 hover:shadow-2xl transition-all
                          duration-300 group relative overflow-hidden hover:-translate-y-2
                          border border-transparent hover:border-${card.color}-100`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}-100/10 to-transparent`} />
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 bg-${card.color}-100 rounded-2xl flex items-center justify-center mb-6`}
                  >
                    {React.cloneElement(card.icon, { 
                      className: `text-${card.color}-600 text-3xl transition-transform`
                    })}
                  </motion.div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {card.content}
                  </p>
                  <Link 
                    href={card.link}
                    className="inline-flex items-center gap-2 text-${card.color}-600 hover:text-${card.color}-700
                            font-medium group-hover:translate-x-2 transition-transform"
                  >
                    ابدأ الرحلة
                    <FiArrowRight className="text-lg" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* قسم الدعم مع تأثيرات الظل */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gray-900 rounded-2xl p-10 text-center text-white mt-16
                  shadow-2xl hover:shadow-3xl transition-all duration-500"
        >
          <h3 className="text-2xl font-bold mb-4">الدعم الفني المميز</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            فريق دعم فني متخصص على مدار الساعة، استشارات إنتاج محتوى مجانية، 
            وتحليلات أداء مفصلة لضمان تفوقك الدائم.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg
                      font-semibold hover:bg-opacity-90 transition-all
                      flex items-center gap-2 mx-auto"
          >
            <FiPlus className="text-xl" />
            انضم لبرنامج الخبراء
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;