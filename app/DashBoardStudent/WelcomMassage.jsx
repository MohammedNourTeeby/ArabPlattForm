"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiSettings, FiCheckCircle, FiUsers, FiClock, FiBookOpen, FiX } from "react-icons/fi";

const WelcomeMessage = () => {
  const slides = [
    {
      image: "https://media.istockphoto.com/id/1446806057/es/foto/joven-estudiante-feliz-usando-computadora-port%C3%A1til-viendo-webinar-escribiendo-en-casa.jpg?s=612x612&w=0&k=20&c=eAEreJw-5Uerr2vDkFTQLgPGacbdZZDq7xpqrSTJ71A=",
      title: "مدعوم من المجتمع",
      description: "تعرف على أفضل الأدوات والمصادر من خلال مجتمعنا التعليمي النشط والمتفاعل",
      cta: "استكشف الموارد",
      icon: <FiUsers className="text-purple-500 mr-2" />
    },
    {
      image: "https://media.istockphoto.com/id/1490133656/es/foto/mujer-joven-usando-un-port%C3%A1til-mientras-trabaja-desde-casa.jpg?s=612x612&w=0&k=20&c=e9B2HwTUxZMLkNIQdE88e5eFOBBPZJK-zDDb53W9CxE=",
      title: "ابدأ التعلم الآن",
      description: "دروس تفاعلية ومحتوى مميز لمستويات مختلفة من الخبرة مع متابعة شخصية",
      cta: "تصفح الدروس",
      icon: <FiBookOpen className="text-blue-500 mr-2" />
    },
  ];

  const features = [
    {
      icon: <FiUsers className="text-purple-600 w-12 h-12 mb-4" />,
      title: "مجتمع تفاعلي",
      description: "تفاعل مع متعلمين آخرين وشارك خبراتك"
    },
    {
      icon: <FiCheckCircle className="text-green-600 w-12 h-12 mb-4" />,
      title: "تمارين عملية",
      description: "تدرب على مشاريع حقيقية مع تقييم فوري"
    },
    {
      icon: <FiClock className="text-orange-600 w-12 h-12 mb-4" />,
      title: "تتبع التقدم",
      description: "احصل على تقارير تفصيلية عن تقدمك التعليمي"
    },
    {
      icon: <FiSettings className="text-blue-600 w-12 h-12 mb-4" />,
      title: "تخصيص كامل",
      description: "صمم مسارك التعليمي حسب احتياجاتك"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showFeatures, setShowFeatures] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-12 min-h-[70vh] relative overflow-hidden">
      
      {/* خلفية ديناميكية مع تأثيرات متقدمة */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-blue-100/80 backdrop-blur-xl"></div>
        <div className="absolute inset-0 opacity-10 bg-slate-500 mix-blend-overlay"></div>
      </div>

      {/* رأس الصفحة مع تحسينات التصميم */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex items-center gap-6 mb-8 md:mb-12 relative group"
      >
        <div className="relative flex-shrink-0">
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform perspective-[1000px] hover:rotate-[-3deg] hover:scale-105 transition-all duration-300"
            whileHover={{ rotateY: 10 }}
          >
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/017/202/446/small/animated-man-comes-up-with-idea-video.jpg"
              alt="صورة المستخدم"
              width={100}
              height={100}
              className="w-24 h-24 object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhESMIAAAAABJRU5ErkJggg=="
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 mix-blend-overlay rounded-2xl" />
        </div>
        
        <div className="flex flex-col space-y-2">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            مرحبًا بعودتك،
            <br />
            <span className="inline-block relative">
              محمد نور
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            لديك 3 دروس جديدة تنتظرك اليوم! 🚀
          </motion.p>
        </div>
      </motion.div>

      {/* سلايدر رئيسي مع تحسينات متقدمة */}
      <div className="relative w-full max-w-6xl group">
        {/* أزرار التنقل */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transform hover:-translate-x-1 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowLeft className="w-8 h-8 text-purple-600 drop-shadow-lg" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/90 backdrop-blur-lg shadow-xl hover:shadow-2xl transform hover:translate-x-1 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowRight className="w-8 h-8 text-purple-600 drop-shadow-lg" />
        </motion.button>

        {/* شرائح المحتوى */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.3 }
            }}
            className="relative w-full h-full"
          >
            <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              {/* قسم الصورة */}
              <div className="relative w-full md:w-1/2 h-80 md:h-[450px]">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhESMIAAAAABJRU5ErkJggg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* قسم المحتوى */}
              <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 mb-4">
                    {slides[currentSlide].icon}
                    <span className="text-sm font-semibold text-purple-600">
                      جديد اليوم
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {slides[currentSlide].title}
                  </h3>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-lg"
                  onClick={() => setShowFeatures(true)}
                >
                  {slides[currentSlide].icon}
                  {slides[currentSlide].cta}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* مؤشر التقدم */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                currentSlide === index 
                  ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500"
                  : "w-4 bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`الشريحة ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* نافذة الميزات */}
      <AnimatePresence>
        {showFeatures && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative"
            >
              <button
                onClick={() => setShowFeatures(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600" />
              </button>

              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ميزات المنصة
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-white transition-colors border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      {feature.icon}
                      <h4 className="text-xl font-semibold mb-2 text-gray-800">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setShowFeatures(false)}
                >
                  بدء الاستخدام
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeMessage;