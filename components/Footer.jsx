'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiChevronLeft } from "react-icons/fi";

const Footer = () => {
  // بيانات الشعارات
  const logos = [
    { 
      name: "Nasdaq",
      src: "https://upload.wikimedia.org/wikipedia/commons/8/88/Nasdaq_Logo.svg",
      link: "https://www.nasdaq.com"
    },
    {
      name: "NetApp",
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/NetApp_Logo.svg",
      link: "https://www.netapp.com"
    },
    {
      name: "Eventbrite",
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Eventbrite_Logo.svg",
      link: "https://www.eventbrite.com"
    }
  ];

  // بيانات القوائم
  const sections = [
    {
      title: "الشهادات والاعتمادات",
      items: ['AWS Certification', 'Cisco', 'Microsoft', 'Oracle', 'CompTIA'],
      color: "purple-400"
    },
    {
      title: "التطوير البرمجي",
      items: ['JavaScript', 'Python', 'React', 'Node.js', 'Angular'],
      color: "blue-400"
    },
    {
      title: "التصميم والإعلام",
      items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'UI/UX'],
      color: "green-400"
    },
    {
      title: "البيانات والتسويق",
      items: ['Data Science', 'Big Data', 'SEO', 'Digital Marketing', 'Social Media'],
      color: "yellow-400"
    },
    {
      title: "مجالات أخرى",
      items: ['إدارة المشاريع', 'ريادة الأعمال', 'اللغات والترجمة', 'الموارد البشرية', 'المزيد ...'],
      color: "red-400"
    }
  ];

  // إعدادات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-900 to-[#1a1b1d] text-gray-300 pt-14 pb-8"
      dir="rtl"
    >
      {/* قسم الشعارات */}
      <motion.div 
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <h2 className="text-sm text-purple-400 font-semibold tracking-wide border-b border-purple-400/30 pb-1">
            شركاء النجاح العالميين
          </h2>
          
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {logos.map((logo, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative opacity-90 hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="object-contain h-8 contrast-75 hover:contrast-100 transition-all"
                  loading="lazy"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {logo.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* القوائم الرئيسية */}
      <motion.div 
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="space-y-5"
            >
              <h3 className={`text-white font-semibold text-lg flex items-center border-b border-gray-700 pb-3`}>
                <FiChevronLeft className={`text-${section.color} mr-2`} />
                {section.title}
              </h3>
              <ul className="space-y-3.5">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href="#"
                      className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors duration-200 py-1.5"
                    >
                      <span>{item}</span>
                      <FiExternalLink className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity text-sm" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* حقوق النشر */}
      <motion.div 
        variants={itemVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14"
      >
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 flex-wrap justify-center">
            {['الشروط والأحكام', 'سياسة الخصوصية', 'خريطة الموقع'].map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="relative font-medium text-gray-400 hover:text-purple-300 transition-colors
                         after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 
                         after:h-px after:bg-purple-400 hover:after:w-full after:transition-all"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()}  الإعتــمـاد العــربــي, Inc.
              <span className="block mt-1 text-xs font-light">الريادة في التعليم الرقمي العالمي</span>
            </p>
            <div className="flex gap-4 justify-center md:justify-end mt-2">
              {[1, 2, 3].map((_, idx) => (
                <span 
                  key={idx}
                  className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;