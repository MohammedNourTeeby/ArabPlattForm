import React from 'react';
import { FaUser, FaUsers, FaBuilding, FaCheck, FaArrowRight, FaCrown, FaRocket, FaStar } from 'react-icons/fa';

// نظام الألوان المحدد
const colors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

const plans = [
  {
    title: 'الخطة الشخصية',
    subtitle: 'للأفراد الطموحين',
    icon: <FaUser className="text-[#008DCB]" size={28} />,
    price: 'البدء من 15.00 يورو',
    period: 'شهرياً',
    button: 'ابدأ التجربة المجانية',
    features: [
      'وصول كامل لأكثر من 12,000 دورة',
      'شهادات معتمدة دولياً',
      'توصيات ذكية بالذكاء الاصطناعي',
      'تمارين برمجة تفاعلية',
      'دعم فني 24/7'
    ],
    badge: null,
    borderColor: `border-[${colors.blue}]`,
    gradient: `from-[${colors.white}]/20 to-[${colors.white}]`,
    buttonStyle: `bg-[${colors.blue}] hover:bg-[#0075a9]`
  },
  {
    title: 'خطة الفريق',
    subtitle: 'للفرق المبتكرة',
    icon: <FaUsers className="text-[#008DCB]" size={32} />,
    price: '28.00 يورو',
    period: 'شهرياً لكل عضو',
    button: 'تجربة فريق مجانية',
    features: [
      'كل مزايا الخطة الشخصية',
      'إدارة فريق مركزية',
      'تقارير أداء مفصلة',
      'تدريب جماعي مخصص',
      'منصة تعاونية للفريق',
      'خصومات للفرق الكبيرة'
    ],
    badge: <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F9D011] text-[#0D1012] px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 border-2 border-[#0D1012]/10">
      <FaStar className="text-[#E2101E]" /> الأكثر طلباً
    </div>,
    borderColor: `border-[${colors.yellow}]`,
    gradient: `from-[${colors.white}] to-[${colors.white}]`,
    buttonStyle: `bg-[${colors.red}] hover:bg-[#c40f1a]`
  },
  {
    title: 'خطة المؤسسة',
    subtitle: 'للشركات الكبرى',
    icon: <FaBuilding className="text-[${colors.blue}]" size={36} />,
    price: 'حلول مؤسسية شاملة',
    period: 'خطط مخصصة',
    button: 'طلب عرض خاص',
    features: [
      'وصول غير محدود لـ27,000+ دورة',
      'منصة تعليمية مخصصة',
      'إحصائيات وتحليلات متقدمة',
      'تكامل مع أنظمة الشركة',
      'دعم مميز برتبة مدير',
      'تدريب مباشر مع خبراء',
      'تقييمات موظفين تلقائية',
      'تحديثات أسبوعية'
    ],
    badge: <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[${colors.blue}] text-[${colors.white}] px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 border-2 border-[${colors.white}]/20">
      <FaRocket className="text-[${colors.yellow}]" /> حلول متقدمة
    </div>,
    borderColor: `border-[${colors.blue}]/30`,
    gradient: `from-[${colors.white}] to-[${colors.white}]`,
    buttonStyle: `bg-[${colors.black}] hover:bg-[${colors.black}]/90`
  },
];

const PricingPlans = () => {
  return (
    <section 
      className="py-16 bg-[${colors.white}]" 
      dir="rtl"
      style={{ backgroundColor: colors.white }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 relative" style={{ color: colors.black }}>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(45deg, ${colors.blue}, ${colors.red})` }}>
              خطط التسعير المميزة
            </span>
            <FaCrown className="absolute -top-2 left-1/2 transform -translate-x-1/2" style={{ color: colors.yellow }} />
          </h2>
          <p className="text-xl mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: colors.gray }}>
            اختر الخطة التي تناسب طموحاتك وتمكن فريقك من تحقيق الإنجازات الاستثنائية
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative group transform hover:scale-105 transition-all duration-300 rounded-xl shadow-xl overflow-hidden ${plan.borderColor}`}
              style={{ 
                borderTopWidth: '4px',
                boxShadow: `0 10px 30px ${colors.gray}20`
              }}
            >
              {plan.badge}
              
              <div className={`bg-gradient-to-b ${plan.gradient} p-8 h-full`}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: colors.black }}>{plan.title}</h3>
                    <p className="mt-2" style={{ color: colors.gray }}>{plan.subtitle}</p>
                  </div>
                  <div 
                    className="p-4 rounded-full shadow-lg"
                    style={{ 
                      backgroundColor: colors.white,
                      border: `2px solid ${colors.gray}20`
                    }}
                  >
                    {plan.icon}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.blue }}>
                    {plan.price}
                  </div>
                  <div className="font-medium" style={{ color: colors.gray }}>
                    {plan.period}
                  </div>
                </div>

                <button 
                  className={`w-full ${plan.buttonStyle} text-white py-4 px-6 rounded-lg font-semibold transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2`}
                  style={{ 
                    backgroundColor: plan.buttonStyle.includes('blue') ? colors.blue : 
                                    plan.buttonStyle.includes('red') ? colors.red : colors.black
                  }}
                >
                  <span>{plan.button}</span>
                  <FaArrowRight className="animate-pulse group-hover:animate-none group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 pt-8 border-t" style={{ borderColor: colors.gray + '30' }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: colors.black }}>المزايا الأساسية:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feat, i) => (
                      <li 
                        key={i} 
                        className="flex items-start text-right"
                        style={{ color: colors.gray }}
                      >
                        <FaCheck className="flex-shrink-0 ml-3 mt-1" style={{ color: colors.red }} />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p 
            className="text-lg flex items-center justify-center gap-2"
            style={{ color: colors.gray }}
          >
            <span className="text-xl" style={{ color: colors.red }}>🔒</span>
            جميع الخطط تشمل ضمان استرداد الأموال خلال 30 يومًا
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;