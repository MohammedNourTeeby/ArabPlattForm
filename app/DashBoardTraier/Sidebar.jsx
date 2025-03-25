"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiVideo,
  FiMessageSquare,
  FiTool,
  FiLayers,
  FiArchive,
  FiChevronRight,
} from "react-icons/fi";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = [
    { name: "الدورات", icon: <FiVideo size={24} />, link: "/courses" },
    { name: "تواصل", icon: <FiMessageSquare size={24} />, link: "/contact" },
    { name: "أداة", icon: <FiTool size={24} />, link: "/tool" },
    { name: "أدوات", icon: <FiLayers size={24} />, link: "/tools" },
    { name: "موارد", icon: <FiArchive size={24} />, link: "/resources" },
  ];

  const sidebarVariants = {
    collapsed: { width: 64 },
    expanded: { width: 240 },
  };

  const itemVariants = {
    collapsed: { opacity: 0, x: -20 },
    expanded: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`
        h-screen flex flex-col
        bg-gradient-to-b from-purple-900/95 to-gray-900/95
        backdrop-blur-lg
        shadow-2xl
        border-r border-purple-700/30
        rounded-r-3xl
        overflow-hidden
      `}
    >
      {/* الشعار */}
      <motion.div 
        className="flex items-center p-4 border-b border-purple-700/30"
        whileHover={{ scale: 1.02 }}
      >
        <div className="bg-purple-700 w-9 h-9 flex items-center justify-center rounded-xl shadow-lg">
          <span className="font-bold text-white">AR</span>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={{
                collapsed: { opacity: 0, x: -10 },
                expanded: { opacity: 1, x: 0 },
              }}
              className="text-xl font-bold ml-3 text-white/90"
            >
               الإعتــمـاد العــربــي
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* عناصر القائمة */}
      <nav className="flex-1 flex flex-col p-2 mt-2">
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            onMouseDown={() => setActiveItem(index)}
            className={`
              relative flex items-center gap-3 p-3 mb-1
              rounded-xl
              transition-all duration-200
              ${activeItem === index 
                ? "bg-purple-700/50 text-white shadow-inner" 
                : "hover:bg-purple-800/30"}
            `}
            whileHover={{ x: 5 }}
          >
            <span className="text-purple-300">{item.icon}</span>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={itemVariants}
                  className="text-base font-medium flex-1"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>

            {!isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 
                  bg-gray-800 text-white text-sm py-1.5 px-3 rounded-lg 
                  shadow-lg pointer-events-none whitespace-nowrap
                  border border-purple-700/30"
              >
                {item.name}
                <FiChevronRight className="absolute right-full top-1/2 -translate-y-1/2 
                  text-gray-800 -mr-1.5" />
              </motion.span>
            )}

            {activeItem === index && (
              <motion.div 
                className="absolute -left-1 w-1 h-6 bg-purple-400 rounded-full"
                layoutId="activeIndicator"
              />
            )}
          </motion.a>
        ))}
      </nav>

      {/* حقوق النشر */}
      <motion.div 
        className="p-4 text-xs text-gray-300/80 border-t border-purple-700/30"
        variants={{
          collapsed: { opacity: 0 },
          expanded: { opacity: 1 }
        }}
      >
        {isExpanded ? "© 2025 Udemy. All rights reserved" : "© 2025"}
      </motion.div>
    </motion.div>
  );
}