"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const WelcomeMessage = () => {
  const slides = [
    {
      image:
        "https://media.istockphoto.com/id/1446806057/es/foto/joven-estudiante-feliz-usando-computadora-port%C3%A1til-viendo-webinar-escribiendo-en-casa.jpg?s=612x612&w=0&k=20&c=eAEreJw-5Uerr2vDkFTQLgPGacbdZZDq7xpqrSTJ71A=",
      title: "مدعوم من المجتمع",
      description:
        "تعرف على أفضل الأدوات والمصادر من خلال مجتمعنا التعليمي النشط والمتفاعل",
    },
    {
      image:
        "https://media.istockphoto.com/id/1490133656/es/foto/mujer-joven-usando-un-port%C3%A1til-mientras-trabaja-desde-casa.jpg?s=612x612&w=0&k=20&c=e9B2HwTUxZMLkNIQdE88e5eFOBBPZJK-zDDb53W9CxE=",
      title: "ابدأ التعلم الآن",
      description:
        "دروس تفاعلية ومحتوى مميز لمستويات مختلفة من الخبرة مع متابعة شخصية",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // تبديل تلقائي كل 7 ثواني
  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-12 min-h-[70vh]">
      {/* قسم الرأس */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center gap-4 mb-12"
      >
        <div className="relative group">
          <div className="absolute -top-2 -left-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg w-16 h-16 -z-10 transform group-hover:rotate-12 transition-all duration-300" />
          <Image
            src="data:image/jpeg;base64,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"
            alt="صورة المستخدم"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-xl"
            priority
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            مرحباً بعودتك،{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              محمد نور
            </span>
          </h2>
          <p className="text-gray-600 text-lg">استكشف دروسك الجديدة اليوم!</p>
        </div>
      </motion.div>

      {/* السلايدر الرئيسي */}
      <div className="relative w-full group">
        {/* أزرار التنقل */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="الشريحة السابقة"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="الشريحة التالية"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* الشرائح المتحركة */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl overflow-hidden shadow-xl">
              {/* الصورة */}
              <div className="relative w-full md:w-1/2 h-96 md:h-[500px]">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={currentSlide === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
              </div>

              {/* المحتوى النصي */}
              <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* نقاط التنقل */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-purple-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`انتقل إلى الشريحة ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;