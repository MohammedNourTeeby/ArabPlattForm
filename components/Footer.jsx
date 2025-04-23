'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FiExternalLink, FiChevronLeft, FiAward, FiCode, FiPenTool, 
  FiDatabase, FiBarChart2, FiFacebook, FiTwitter, FiLinkedin, FiInstagram 
} from "react-icons/fi";

const Footer = () => {
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

  const sections = [
    {
      title: "الشهادات والاعتمادات",
      items: ['AWS Certification', 'Cisco', 'Microsoft', 'Oracle', 'CompTIA'],
      color: "purple-400",
      icon: <FiAward className="text-purple-400" />
    },
    {
      title: "التطوير البرمجي",
      items: ['JavaScript', 'Python', 'React', 'Node.js', 'Angular'],
      color: "blue-400",
      icon: <FiCode className="text-blue-400" />
    },
    {
      title: "التصميم والإعلام",
      items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'UI/UX'],
      color: "green-400",
      icon: <FiPenTool className="text-green-400" />
    },
    {
      title: "البيانات والتسويق",
      items: ['Data Science', 'Big Data', 'SEO', 'Digital Marketing', 'Social Media'],
      color: "yellow-400",
      icon: <FiDatabase className="text-yellow-400" />
    },
    {
      title: "مجالات أخرى",
      items: ['إدارة المشاريع', 'ريادة الأعمال', 'اللغات والترجمة', 'الموارد البشرية', 'المزيد ...'],
      color: "red-400",
      icon: <FiBarChart2 className="text-red-400" />
    }
  ];

  const socialMedia = [
    { icon: <FiFacebook className="text-[#1877F2]"/>, link: "#" },
    { icon: <FiTwitter className="text-[#1DA1F2]"/>, link: "#" },
    { icon: <FiLinkedin className="text-[#0A66C2]"/>, link: "#" },
    { icon: <FiInstagram className="text-[#E1306C]"/>, link: "#" }
  ];

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="bg-gradient-to-b from-gray-900 to-[#1a1b1d] text-gray-300 pt-14 pb-8"
      dir="rtl"
    >
      {/* قسم الشعارات */}
      <motion.div 
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <h2 className="text-sm text-purple-400 font-semibold tracking-wide border-b border-purple-400/30 pb-1 flex items-center">
            <FiAward className="mr-2" /> شركاء النجاح العالميين
          </h2>
          
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {logos.map((logo, index) => (
              <motion.a
                key={index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative opacity-90 hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.1)" }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="object-contain h-8 contrast-75 hover:contrast-100 transition-all"
                  loading="lazy"
                />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-2 py-1 rounded-md mt-2">
                  {logo.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* القوائم الرئيسية */}
      <motion.div 
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="space-y-5"
            >
              <h3 className={`text-white font-semibold text-lg flex items-center border-b border-gray-700 pb-3`}>
                {section.icon}
                <span className={`ml-3 bg-gradient-to-r from-${section.color} to-${section.color}/70 bg-clip-text text-transparent`}>
                  {section.title}
                </span>
              </h3>
              <ul className="space-y-3.5">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href="#"
                      className="flex items-center justify-between group text-gray-400 hover:text-white transition-colors duration-200 py-1.5 relative pl-8"
                    >
                      <FiExternalLink className="absolute left-0 text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                      <FiChevronLeft className="text-gray-500 group-hover:text-white transition-colors" />
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
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
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
          
          <div className="flex flex-col items-center md:items-end space-y-4 mt-4 md:mt-0">
            <div className="text-sm text-gray-500 text-center md:text-right">
              © {new Date().getFullYear()} الإعتــمـاد العــربــي, Inc.
              <span className="block mt-1 text-xs font-light">الريادة في التعليم الرقمي العالمي</span>
            </div>
            
            <div className="flex gap-6">
              {socialMedia.map((media, index) => (
                <motion.a
                  key={index}
                  href={media.link}
                  target="_blank"
                  className="text-xl p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {media.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;