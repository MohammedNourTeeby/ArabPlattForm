"use client"
import React from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaChartLine, FaRocket, FaUsers, FaRegClock, FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

// الألوان المحددة
const colors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

const trending = {
  highlight: {
    title: 'هي مهارة ChatGPT رائعة',
    linkText: 'شاهد ChatGPT دورات',
    learners: '4,408,320 متعلماً',
    icon: <FaRocket className="w-12 h-12" style={{ color: colors.yellow }} />
  },
  categories: [
    {
      title: 'عمل',
      icon: <FaChartLine className="mr-2" style={{ color: colors.blue }} />,
      items: [
        { text: 'شهادة إدارة المشاريع الاحترافية (PMP)', link: '#', learners: '2,588,082 متعلماً', trending: true },
        { text: 'مايكروسوفت باور بي آي', link: '#', learners: '4,674,377 متعلماً', new: true },
        { text: 'إدارة المشاريع', link: '#', learners: '4,009,801 متعلماً' },
      ],
    },
    {
      title: 'تصميم',
      icon: <FaBookOpen className="mr-2" style={{ color: colors.blue }} />,
      items: [
        { text: 'الخلّاط', link: '#', learners: '2,925,380 متعلماً' },
        { text: 'التصميم الجرافيكي', link: '#', learners: '4,507,425 متعلماً' },
        { text: 'تصميم تجربة المستخدم (UX)', link: '#', learners: '2,075,677 متعلماً' },
      ],
    },
    {
      title: 'تطوير',
      icon: <FaRocket className="mr-2" style={{ color: colors.blue }} />,
      items: [
        { text: 'بايثون', link: '#', learners: '47,975,610 متعلماً' },
        { text: 'تطوير الويب', link: '#', learners: '14,047,591 متعلماً' },
        { text: 'علم البيانات', link: '#', learners: '7,820,933 متعلماً' },
      ],
    },
  ],
};

const caseStudy = {
  company: 'Booz | Allen | Hamilton',
  heading: 'شركة بوز آلن هاملتون تُطلق العنان للاحتفاظ بالمواهب وزيادة الإنتاجية من خلال رفع المهارات',
  stats: [
    { value: '93%', label: 'معدل الاحتفاظ بين الموظفين المشاركين' },
    { value: '65%', label: 'لاحظ عدد من المتعلمين تأثيراً إيجابياً على إنتاجيتهم' },
  ],
  imageSrc: '/images/case-study.jpg',
  imageAlt: 'Case Study',
  linkText: 'اقرأ القصة كاملة',
  linkHref: '#',
};

const PopularAndCaseStudy = () => (
  <section className="py-20" style={{ backgroundColor: colors.white }} dir="rtl">
    <div className="max-w-7xl mx-auto px-4 xl:px-0">
      {/* Trending Now Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8" style={{ color: colors.black }}>
          الأكثر رواجاً الآن
          <span className="block w-32 h-1 mt-2" style={{ backgroundColor: colors.blue }}></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Highlight Card */}
          <div className="col-span-1 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
               style={{ backgroundColor: colors.blue }}>
            <div style={{ color: colors.white }}>
              {trending.highlight.icon}
              <h3 className="text-xl font-semibold mb-4">{trending.highlight.title}</h3>
              <a href="#" className="inline-flex items-center font-medium hover:opacity-90">
                <span>{trending.highlight.linkText}</span>
                <FaArrowLeft className="mr-3" />
              </a>
              <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: colors.black }}>
                <p className="text-sm flex items-center">
                  <FaUsers className="ml-2" style={{ color: colors.yellow }} />
                  {trending.highlight.learners}
                </p>
              </div>
            </div>
          </div>

          {/* Categories */}
          {trending.categories.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                 style={{ backgroundColor: colors.white, border: `1px solid ${colors.gray}` }}>
              <h4 className="text-lg font-semibold mb-6 flex items-center" style={{ color: colors.blue }}>
                {cat.icon}
                {cat.title}
              </h4>
              <ul className="space-y-6">
                {cat.items.map((item, i) => (
                  <li key={i} className="group">
                    <a href={item.link} className="block p-3 rounded-lg transition-all hover:bg-opacity-10"
                       style={{ backgroundColor: item.trending ? colors.yellow + '20' : item.new ? colors.red + '20' : 'transparent' }}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium" style={{ color: colors.black }}>
                          {item.text}
                          {item.trending && (
                            <span className="ml-2 px-2 py-1 text-xs rounded-full" 
                                  style={{ backgroundColor: colors.yellow + '30', color: colors.black }}>
                              ترند
                            </span>
                          )}
                          {item.new && (
                            <span className="ml-2 px-2 py-1 text-xs rounded-full" 
                                  style={{ backgroundColor: colors.red + '30', color: colors.black }}>
                              جديد
                            </span>
                          )}
                        </span>
                        <FaArrowLeft className="text-sm" style={{ color: colors.gray }} />
                      </div>
                      <p className="text-xs mt-2 flex items-center" style={{ color: colors.gray }}>
                        <FaRegClock className="ml-1" />
                        {item.learners}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Case Study Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: colors.blue }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10">
          <div className="text-white relative z-10">
            <p className="text-sm mb-4 flex items-center" style={{ color: colors.yellow }}>
              <FaChartLine className="ml-2" />
              {caseStudy.company}
            </p>
            <h3 className="text-3xl font-bold mb-6 leading-tight">{caseStudy.heading}</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {caseStudy.stats.map((s, i) => (
                <div key={i} className="p-6 rounded-xl" style={{ backgroundColor: colors.black + '30' }}>
                  <p className="text-4xl font-bold mb-2" style={{ color: i === 0 ? colors.red : colors.yellow }}>
                    {s.value}
                  </p>
                  <p className="text-sm" style={{ color: colors.white + 'CC' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <a href={caseStudy.linkHref} 
               className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all group"
               style={{ 
                 backgroundColor: colors.white,
                 color: colors.blue,
                 hover: { backgroundColor: colors.white + 'E0' }
               }}>
              <span>{caseStudy.linkText}</span>
              <FaArrowLeft className="mr-3 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src={caseStudy.imageSrc} 
              alt={caseStudy.imageAlt} 
              layout="fill" 
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0" style={{ 
              background: `linear-gradient(45deg, ${colors.blue} 10%, transparent 70%)` 
            }} />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PopularAndCaseStudy;