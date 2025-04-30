"use client";
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Link2, 
  Calendar, 
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Plus,
  Share2
} from 'lucide-react';
import Notification from '@/components/ui/Notification';

// نظام الألوان المخصص
const colors = {
  primary: '#2563EB',
  secondary: '#4F46E5',
  success: '#22C55E',
  error: '#EF4444',
  background: '#F8FAFC',
  text: '#1E293B',
  accent: '#94A3B8'
};

const PlatformCard = ({ platform, selected, onClick, connectedAccounts }) => {
  const platformData = {
    facebook: {
      icon: <Facebook className="w-5 h-5 text-[#1877F2]" />,
      name: 'فيسبوك',
      color: '#1877F2'
    },
    instagram: {
      icon: <Instagram className="w-5 h-5 text-[#E1306C]" />,
      name: 'إنستغرام',
      color: '#E1306C'
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
        selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {platformData[platform].icon}
        <div>
          <h3 className="font-medium text-gray-800">{platformData[platform].name}</h3>
          <p className="text-sm text-gray-500">
            {connectedAccounts.length} حساب متصل
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function SocialScheduler() {
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [publishDate, setPublishDate] = useState(new Date());
  const [notification, setNotification] = useState(null);
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: [{ id: '789', name: 'الصفحة الرسمية' }],
    instagram: [{ id: '101', username: 'الحساب_الرسمي' }]
  });
  const [isConnecting, setIsConnecting] = useState(false);

  // محاكاة اتصال حساب جديد
  const connectAccount = async (platform) => {
    setIsConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newAccount = {
        id: Date.now(),
        name: `حساب جديد ${platform === 'facebook' ? '📘' : '📸'}`
      };
      
      setConnectedAccounts(prev => ({
        ...prev,
        [platform]: [...prev[platform], newAccount]
      }));
      
      setNotification({
        message: `تم ربط حساب ${platform === 'facebook' ? 'فيسبوك' : 'إنستغرام'} بنجاح`,
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: `فشل في ربط الحساب`,
        type: 'error'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      setNotification({ message: 'يرجى إدخال محتوى المنشور', type: 'error' });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      setNotification({ message: 'يرجى اختيار منصة واحدة على الأقل', type: 'error' });
      return;
    }

    try {
      setNotification({ message: 'جاري جدولة المنشور...', type: 'loading' });
      
      // محاكاة عملية الجدولة
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setNotification({
        message: 'تم جدولة المنشور بنجاح 🎉',
        type: 'success'
      });
      
      // إعادة تعيين الحقول
      setPostContent('');
      setSelectedPlatforms([]);
      setPublishDate(new Date());
    } catch (error) {
      setNotification({
        message: 'حدث خطأ أثناء الجدولة',
        type: 'error'
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl" style={{ backgroundColor: colors.background }}>
      <AnimatePresence>
        {notification && (
          <Notification 
            {...notification} 
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* محتوى المنشور */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: colors.text }}>
            محتوى المنشور
          </label>
          <motion.div
            whileFocus={{ boxShadow: `0 0 0 3px ${colors.primary}20` }}
            className="border rounded-xl overflow-hidden"
            style={{ borderColor: colors.accent }}
          >
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="✍️ اكتب منشورك هنا..."
              className="w-full p-4 focus:outline-none min-h-[200px] resize-none"
              style={{ backgroundColor: colors.background }}
              maxLength={500}
            />
            <div className="border-t p-3 flex items-center justify-between" style={{ borderColor: colors.accent }}>
              <div className="flex gap-2">
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                  📷
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
                  🔗
                </button>
              </div>
              <span className="text-sm" style={{ color: colors.accent }}>
                {postContent.length}/500
              </span>
            </div>
          </motion.div>
        </div>

        {/* اختيار المنصات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-4" style={{ color: colors.text }}>
              اختر المنصات
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {['facebook', 'instagram'].map((platform) => (
                <PlatformCard
                  key={platform}
                  platform={platform}
                  selected={selectedPlatforms.includes(platform)}
                  onClick={() => {
                    setSelectedPlatforms(prev =>
                      prev.includes(platform)
                        ? prev.filter(p => p !== platform)
                        : [...prev, platform]
                    )
                  }}
                  connectedAccounts={connectedAccounts[platform]}
                />
              ))}
            </div>
          </div>

          {/* إعدادات النشر */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4" style={{ color: colors.text }}>
                إعدادات النشر
              </h3>
              
              {/* وقت النشر */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: colors.background }}>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  وقت النشر
                </label>
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-500" />
                  <DatePicker
                    selected={publishDate}
                    onChange={setPublishDate}
                    showTimeSelect
                    dateFormat="yyyy/MM/dd HH:mm"
                    className="w-full p-2 rounded-lg border focus:ring-2"
                    style={{ 
                      borderColor: colors.accent,
                      focusBorderColor: colors.primary
                    }}
                  />
                </div>
              </div>

              {/* الحسابات المتصلة */}
              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: colors.background }}>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  الحسابات المحددة
                </label>
                <div className="space-y-3">
                  {selectedPlatforms.map((platform) => (
                    <div key={platform} className="flex items-center gap-2">
                      {platform === 'facebook' ? (
                        <Facebook className="text-[#1877F2]" />
                      ) : (
                        <Instagram className="text-[#E1306C]" />
                      )}
                      <select 
                        className="w-full p-2 rounded-lg border"
                        style={{ 
                          borderColor: colors.accent,
                          backgroundColor: colors.background
                        }}
                      >
                        {connectedAccounts[platform].map(acc => (
                          <option key={acc.id}>
                            {acc.name || acc.username}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 text-white font-medium rounded-xl flex items-center justify-center gap-2"
            style={{ backgroundColor: colors.primary }}
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                جدولة المنشور
              </>
            )}
          </motion.button>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => connectAccount('facebook')}
              className="flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 hover:bg-gray-50"
              style={{ borderColor: colors.accent }}
              disabled={isConnecting}
            >
              <Share2 className="w-5 h-5 text-[#1877F2]" />
              <span style={{ color: colors.text }}>ربط حساب فيسبوك</span>
            </button>
            
            <button
              type="button"
              onClick={() => connectAccount('instagram')}
              className="flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 hover:bg-gray-50"
              style={{ borderColor: colors.accent }}
              disabled={isConnecting}
            >
              <Share2 className="w-5 h-5 text-[#E1306C]" />
              <span style={{ color: colors.text }}>ربط حساب إنستغرام</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}