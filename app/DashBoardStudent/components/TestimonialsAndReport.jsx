import React from 'react';
import { FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    quote: 'تم تصنيف معظم الدورات التدريبية عبر Udemy عبر الإنترنت و برامج الشهادات شعبية لتعلم كيفية البرمجة وفقًا لاستطلاعات المطورين لعام 2023 الذي أجرته StackOverflow.',
    author: 'تم جمع 37,076 ردًا',
    logoSrc: 'https://cvstation.sa/images/blogs/ahm-almharat-alothyfy-almtlob-llngah-fy-ay-aaml-dc9a60ea-99ac-4aab-8911-b039f2a41146.png',
    logoAlt: 'stackoverflow',
    linkText: 'عرض دورات تطوير الويب',
    linkHref: '#'
  },
  {
    quote: 'منصة تحول حقيقية Udemy لقد كان دليلاً رائعًا بالنسبة لي بينما كنت أتعلم Dimensional إلى الحياة ثلاثية الأبعاد.',
    author: 'المؤسس المشارك التقني والمدير التقني في Dimensional',
    logoSrc: '/images/author2.jpg',
    logoAlt: 'ألفين ليم',
    linkText: 'هذه iOS و Swift شاهد دورة',
    linkHref: '#'
  },
  {
    quote: 'منحتني القدرة على التوسع. تعلمت بالضبط ما أحتاجه في الحياة العملية. ساعدني ذلك على إثبات جدارتي للحصول على وظيفة جديدة.',
    author: 'مدير حساب الشركاء في Amazon Web Services',
    logoSrc: '/images/author3.jpg',
    logoAlt: 'ويلام أ. واشنطن',
    linkText: 'هذه AWS عرض دورة',
    linkHref: '#'
  },
  {
    quote: 'تمكن موظفو الأعمال من Udemy، بفضل الجمع بين معًا المهارات التكنولوجية والاستشارية، لمساعدتهم في دفع حياتهم المهنية إلى الأمام.',
    author: 'رئيس تطوير القدرات، أمريكا الشمالية في Publicis Sapient',
    logoSrc: '/images/author4.jpg',
    logoAlt: 'إيان ستيفنز',
    linkText: 'اقرأ القصة كاملة',
    linkHref: '#'
  }
];

const images = [
  'https://3rd-partner.com/wp-content/uploads/2024/04/2_%D9%85%D9%82%D8%A7%D8%A8%D9%84%D8%A7%D8%AA-%D9%85%D8%B9-%D8%AE%D8%A8%D8%B1%D8%A7%D8%A1-%D9%81%D9%8A-%D9%85%D8%AC%D8%A7%D9%84-%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%84%D9%88%D8%AC%D8%B3%D8%AA%D9%8A%D8%A9-400x400.png',
  'https://www.new-educ.com/wp-content/uploads/2022/05/learn-life-skills-660x330.jpg',
  'https://zamn.app/wp-content/uploads/2023/12/%D8%AA%D8%AE%D8%B7%D9%8A%D8%B7_%D8%A7%D9%84%D9%82%D9%88%D9%89_%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D9%84%D8%A9-2048x614.png'
];

const TestimonialsAndReport = () => (
  <div className="font-sans">
    {/* قسم الشهادات */}
    <section className="py-16 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <h2 className="text-3xl font-bold mb-8 text-[#0D1012]">
          <span className="bg-[#F9D011] px-2 rounded-md">انظر</span> إلى ما يحققه الآخرون من خلال التعلم
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="relative border-2 border-[#999999]/20 rounded-xl bg-white p-6 
              shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#008DCB]/30
              group hover:scale-[1.02]"
            >
              <div className="absolute top-6 left-6 text-[#008DCB]/30">
                <FaQuoteLeft className="text-4xl" />
              </div>
              
              <p className="text-[#0D1012]/90 mb-6 leading-relaxed text-lg min-h-[120px]">
                {t.quote}
              </p>
              
              <div className="flex items-center mb-6">
                <div className="relative w-14 h-14 border-2 border-[#F9D011] rounded-full overflow-hidden">
                  <img 
                    src={t.logoSrc} 
                    alt={t.logoAlt} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <p className="mr-4 text-sm text-[#999999]">{t.author}</p>
              </div>
              
              <a 
                href={t.linkHref} 
                className="inline-flex items-center group text-[#008DCB] hover:text-[#E2101E] transition-colors"
              >
                <span className="font-semibold">{t.linkText}</span>
                <FaArrowRight className="mr-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* قسم التقرير */}
    <section className="py-20 bg-gradient-to-b from-[#008DCB]/5 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 text-right space-y-6">
          <h2 className="text-4xl font-bold text-[#0D1012] leading-tight">
            أهم الاتجاهات لمستقبل العمل 
            <span className="block text-[#008DCB] mt-2">تقرير 2025</span>
          </h2>
          
          <p className="text-lg text-[#999999] leading-relaxed">
            صدر الآن تقريرنا العالمي لاتجاهات التعلم والمهارات لعام 2025. 
            <span className="block mt-2">اكتشف كيفية بناء المهارات لمواكبة التغيير.</span>
          </p>
          
          <a 
            href="#" 
            className="inline-flex items-center px-8 py-4 bg-[#E2101E] text-white rounded-xl
            hover:bg-[#0D1012] transform hover:-translate-y-1 transition-all duration-300
            shadow-lg hover:shadow-xl"
          >
            <span className="ml-2 font-semibold">احصل على التقرير</span>
            <FaArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="lg:w-1/2 relative w-full h-96">
          {images.map((src, i) => (
            <div
              key={i}
              className={`absolute w-3/4 shadow-2xl rounded-2xl overflow-hidden 
              border-4 border-white transform transition-all duration-500 hover:z-10
              ${i === 0 
                ? 'top-0 left-1/4 -rotate-6 hover:-rotate-3' 
                : i === 1 
                ? 'top-8 left-0 rotate-3 hover:rotate-6' 
                : 'top-16 left-1/3 rotate-12 hover:rotate-9'}`}
            >
              <div className="relative h-72">
                <img
                  src={src}
                  alt={`report-${i}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1012]/40 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default TestimonialsAndReport;