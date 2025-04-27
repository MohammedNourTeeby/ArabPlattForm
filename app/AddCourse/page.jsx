"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FiUserPlus, 
  FiPaperclip, 
  FiX, 
  FiFilm, 
  FiYoutube,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiPlus,
  FiEdit3,
  FiLock,
  FiArrowLeft,
  FiSave
} from "react-icons/fi";

// نظام الألوان المحدد
const COLORS = {
  primary: '#008DCB',    // أزرق 10%
  secondary: '#0D1012',  // أسود 5%
  muted: '#999999',      // رمادي 20%
  danger: '#E2101E',     // أحمر 7%
  background: '#FFFFFF', // أبيض 50%
  accent: '#F9D011'      // أصفر 8%
};

const AddCourseComponent = () => {
  // البيانات الافتراضية
  const DEFAULT_TRACKS = [
    { id: 1, trackName: "تطوير الويب" },
    { id: 2, trackName: "علوم البيانات" },
    { id: 3, trackName: "التسويق الرقمي" },
  ];

  const DEFAULT_COURSES = [
    {
      id: 1,
      courseName: "أساسيات البرمجة",
      track: "تطوير الويب",
      price: 0,
      description: "مدخل إلى عالم البرمجة للمبتدئين",
      accessInstructions: "لا يوجد متطلبات مسبقة",
      isFree: true,
      createdAt: new Date().toLocaleDateString("ar-EG"),
      attachments: [],
      videos: [],
      hasEntryTest: false
    },
  ];

  // الحالات
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [tracksState] = useState(DEFAULT_TRACKS);
  const [formData, setFormData] = useState({
    courseName: "",
    track: "",
    price: "",
    description: "",
    accessInstructions: "",
    isFree: true,
    attachments: [],
    entryTest: null,
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', duration: '' });
  const [hasEntryTest, setHasEntryTest] = useState(false);
  const [activeSection, setActiveSection] = useState(1);

  // معالجة الفيديو
  const isValidYoutubeUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(url);
  
  const handleAddVideo = useCallback(() => {
    if (newVideo.title && isValidYoutubeUrl(newVideo.url)) {
      setVideos([...videos, { 
        ...newVideo, 
        id: Date.now(),
        duration: newVideo.duration || '00:00'
      }]);
      setNewVideo({ title: '', url: '', duration: '' });
    }
  }, [newVideo, videos]);

  const handleRemoveVideo = useCallback((id) => {
    setVideos(videos.filter(video => video.id !== id));
  }, [videos]);

  // التحويلات العامة
  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  // معالجة النموذج
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = await Promise.all(files.map(convertToBase64).map((data, i) => ({
      name: files[i].name,
      type: files[i].type,
      size: files[i].size,
      data
    })));
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseName || !formData.track || !formData.description) {
      setError("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    const newCourse = {
      id: editId || Date.now(),
      ...formData,
      price: formData.isFree ? 0 : Number(formData.price),
      createdAt: new Date().toLocaleDateString("ar-EG"),
      videos,
      hasEntryTest
    };

    setCourses(prev => editId ? prev.map(c => c.id === editId ? newCourse : c) : [...prev, newCourse]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      courseName: "",
      track: "",
      price: "",
      description: "",
      accessInstructions: "",
      isFree: true,
      attachments: [],
      entryTest: null,
    });
    setVideos([]);
    setHasEntryTest(false);
    setEditId(null);
    setError("");
    setActiveSection(1);
  };

  const handleDelete = (id) => {
    if (confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      setCourses(prev => prev.filter(course => course.id !== id));
    }
  };

  const handleEdit = (course) => {
    setFormData({
      courseName: course.courseName,
      track: course.track,
      price: course.price,
      description: course.description,
      accessInstructions: course.accessInstructions,
      isFree: course.isFree,
      attachments: course.attachments,
      entryTest: course.entryTest
    });
    setVideos(course.videos || []);
    setHasEntryTest(course.hasEntryTest || false);
    setEditId(course.id);
  };

  // مكونات الواجهة
  const ProgressStepper = () => (
    <div className="flex justify-between mb-8 relative px-6 pt-6">
      {[1, 2, 3].map((sectionId) => (
        <div key={sectionId} className="flex flex-col items-center w-1/3 cursor-pointer" 
             onClick={() => setActiveSection(sectionId)}>
          <motion.div
            className="flex items-center justify-center rounded-full transition-all mb-2"
            style={{
              width: '3rem',
              height: '3rem',
              background: activeSection >= sectionId ? COLORS.primary : `${COLORS.muted}20`,
              color: activeSection >= sectionId ? COLORS.background : COLORS.muted
            }}
          >
            {sectionId === 1 && <FiEdit3 />}
            {sectionId === 2 && <FiFilm />}
            {sectionId === 3 && <FiClipboard />}
          </motion.div>
          <span className={`text-sm font-medium ${activeSection >= sectionId ? 'text-[#0D1012]' : 'text-[#999999]'}`}>
            {sectionId === 1 && 'المعلومات الأساسية'}
            {sectionId === 2 && 'المحتوى التعليمي'}
            {sectionId === 3 && 'المتطلبات'}
          </span>
        </div>
      ))}
    </div>
  );

  const VideoSection = () => (
    <motion.div 
      className="p-6 mx-6 mb-6 rounded-xl"
      style={{ 
        background: COLORS.background,
        border: `1px solid ${COLORS.muted}20`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
        <FiFilm className="text-xl" />
        سلسلة مقاطع الفيديو
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>عنوان الفيديو *</label>
          <input
            type="text"
            value={newVideo.title}
            onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
            className="w-full p-2.5 rounded-lg border"
            style={{ borderColor: `${COLORS.muted}40` }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>رابط اليوتيوب *</label>
          <div className="relative">
            <input
              type="url"
              value={newVideo.url}
              onChange={(e) => setNewVideo({...newVideo, url: e.target.value})}
              className="w-full p-2.5 rounded-lg border pr-10"
              style={{ borderColor: `${COLORS.muted}40` }}
            />
            <FiYoutube className="absolute right-3 top-3.5" style={{ color: COLORS.muted }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>المدة (دقيقة)</label>
          <input
            type="text"
            value={newVideo.duration}
            onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
            placeholder="15:30"
            className="w-full p-2.5 rounded-lg border"
            style={{ borderColor: `${COLORS.muted}40` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddVideo}
        disabled={!newVideo.title || !isValidYoutubeUrl(newVideo.url)}
        className="px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
        style={{ 
          background: COLORS.primary,
          color: COLORS.background,
          opacity: (!newVideo.title || !isValidYoutubeUrl(newVideo.url)) ? 0.5 : 1
        }}
      >
        <FiPlus />
        إضافة فيديو
      </button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg"
            style={{
              background: COLORS.background,
              border: `1px solid ${COLORS.muted}20`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium" style={{ color: COLORS.secondary }}>
                {video.title}
              </h4>
              <button
                onClick={() => handleRemoveVideo(video.id)}
                style={{ color: COLORS.danger }}
              >
                <FiX />
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: COLORS.muted }}>
              <span className="flex items-center gap-1">
                <FiClock /> {video.duration}
              </span>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
                style={{ color: COLORS.primary }}
              >
                <FiYoutube /> معاينة الرابط
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const EntryTestSection = () => (
    <motion.div 
      className="p-6 mx-6 mb-6 rounded-xl"
      style={{ 
        background: COLORS.background,
        border: `1px solid ${COLORS.muted}20`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: COLORS.primary }}>
          <FiClipboard className="text-xl" />
          اختبار تحديد المستوى
        </h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={hasEntryTest}
              onChange={(e) => setHasEntryTest(e.target.checked)}
              className="sr-only"
            />
            <div 
              className="w-12 h-6 rounded-full transition-colors"
              style={{ background: hasEntryTest ? COLORS.primary : `${COLORS.muted}40` }}
            >
              <div 
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform"
                style={{ transform: hasEntryTest ? 'translateX(26px)' : 'translateX(2px)' }}
              />
            </div>
          </div>
          <span className="text-sm" style={{ color: COLORS.secondary }}>مطلوب للدخول</span>
        </label>
      </div>

      {hasEntryTest && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg flex items-center gap-4"
          style={{ 
            background: `${COLORS.primary}10`,
            border: `1px dashed ${COLORS.primary}30`
          }}
        >
          <div className="flex-1">
            <p className="text-sm mb-2" style={{ color: COLORS.secondary }}>
              {formData.entryTest 
                ? "تم تكوين الاختبار بنجاح"
                : "لم يتم إضافة اختبار بعد"}
            </p>
            <div className="flex items-center gap-2 text-sm">
              {formData.entryTest ? (
                <FiCheckCircle style={{ color: COLORS.primary }} />
              ) : (
                <FiLock style={{ color: COLORS.accent }} />
              )}
              <span style={{ color: COLORS.muted }}>
                {formData.entryTest 
                  ? "سيتم تطبيق الاختبار على جميع المتعلمين"
                  : "اضغط على زر إنشاء اختبار لبدء الإعداد"}
              </span>
            </div>
          </div>
          <Link href="/AddTest">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 rounded-lg flex items-center gap-2"
              style={{
                background: formData.entryTest ? COLORS.accent : COLORS.primary,
                color: COLORS.background
              }}
            >
              <FiEdit3 />
              {formData.entryTest ? 'تعديل الاختبار' : 'إنشاء اختبار'}
            </motion.button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8" style={{ background: `${COLORS.muted}08` }}>
      <motion.div 
        className="rounded-2xl overflow-hidden"
        style={{ 
          background: COLORS.background,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <ProgressStepper />

        <AnimatePresence mode="wait">
          {activeSection === 1 && (
            <motion.div
              key="basic-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6"
            >
              {error && (
                <div className="mb-4 p-3 rounded-lg" style={{ background: `${COLORS.danger}15`, color: COLORS.danger }}>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                    اسم الدورة *
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:ring-2"
                    style={{ 
                      borderColor: `${COLORS.muted}40`,
                      focusBorderColor: COLORS.primary,
                      focusRingColor: `${COLORS.primary}20`
                    }}
                    required
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                      المسار التعليمي *
                    </label>
                    <select
                      name="track"
                      value={formData.track}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border focus:ring-2"
                      style={{ 
                        borderColor: `${COLORS.muted}40`,
                        focusBorderColor: COLORS.primary
                      }}
                      required
                    >
                      <option value="">اختر المسار</option>
                      {tracksState.map((track) => (
                        <option key={track.id} value={track.trackName}>
                          {track.trackName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Link href="./AddEduGat">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      className="p-3 rounded-lg flex items-center gap-2"
                      style={{ 
                        background: COLORS.accent,
                        color: COLORS.secondary
                      }}
                    >
                      <FiPlus />
                      <span className="hidden sm:inline">مسار جديد</span>
                    </motion.button>
                  </Link>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                    نوع الدورة *
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={() => setFormData(prev => ({ ...prev, isFree: true, price: "" }))}
                        className="form-radio"
                        style={{ color: COLORS.primary }}
                      />
                      <span style={{ color: COLORS.secondary }}>مجانية</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isFree"
                        checked={!formData.isFree}
                        onChange={() => setFormData(prev => ({ ...prev, isFree: false }))}
                        className="form-radio"
                        style={{ color: COLORS.primary }}
                      />
                      <span style={{ color: COLORS.secondary }}>مدفوعة</span>
                    </label>
                  </div>

                  {!formData.isFree && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                        السعر ($) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full pl-8 pr-3 py-3 rounded-lg border"
                          style={{ 
                            borderColor: `${COLORS.muted}40`,
                            focusBorderColor: COLORS.primary
                          }}
                          min="1"
                          required
                          step="0.01"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.muted }}>
                          $
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                    الوصف *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:ring-2"
                    style={{ 
                      borderColor: `${COLORS.muted}40`,
                      focusBorderColor: COLORS.primary
                    }}
                    rows="4"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                    متطلبات الدخول
                  </label>
                  <textarea
                    name="accessInstructions"
                    value={formData.accessInstructions}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border focus:ring-2"
                    style={{ 
                      borderColor: `${COLORS.muted}40`,
                      focusBorderColor: COLORS.primary
                    }}
                    rows="3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.secondary }}>
                    الملفات المرفقة
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-emerald-500 transition-colors"
                           style={{ borderColor: `${COLORS.muted}40` }}>
                      <FiPaperclip style={{ color: COLORS.muted }} />
                      <span className="text-sm" style={{ color: COLORS.secondary }}>اختر ملفات</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png"
                        disabled={formData.attachments.length >= 5}
                      />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center rounded-lg px-3 py-2"
                             style={{ background: `${COLORS.muted}10` }}>
                          <span className="text-sm mr-2" style={{ color: COLORS.secondary }}>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            style={{ color: COLORS.danger }}
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 2 && <VideoSection />}
          {activeSection === 3 && <EntryTestSection />}
        </AnimatePresence>

        <div className="flex justify-between p-6 border-t" style={{ borderColor: `${COLORS.muted}20` }}>
          {activeSection > 1 && (
            <button
              type="button"
              onClick={() => setActiveSection(prev => prev - 1)}
              className="px-6 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ 
                background: `${COLORS.muted}15`,
                color: COLORS.secondary
              }}
            >
              <FiArrowLeft />
              السابق
            </button>
          )}
          
          {activeSection < 3 ? (
            <button
              type="button"
              onClick={() => setActiveSection(prev => prev + 1)}
              className="ml-auto px-6 py-2.5 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
              style={{ 
                background: COLORS.primary,
                color: COLORS.background
              }}
            >
              التالي
              <FiArrowLeft className="transform rotate-180" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="ml-auto px-6 py-2.5 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
              style={{ 
                background: COLORS.primary,
                color: COLORS.background
              }}
            >
              <FiSave />
              {editId ? 'تحديث الدورة' : 'حفظ الدورة'}
            </button>
          )}
        </div>
      </motion.div>

      {/* جدول الدورات */}
      <motion.div 
        className="rounded-2xl overflow-hidden mt-8"
        style={{ 
          background: COLORS.background,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}
      >
        <table className="min-w-full">
          <thead style={{ background: `${COLORS.muted}10` }}>
            <tr>
              {['اسم الدورة', 'المسار', 'السعر', 'تاريخ الإضافة', 'الإجراءات'].map((header) => (
                <th 
                  key={header}
                  className="p-4 text-sm font-medium text-right"
                  style={{ color: COLORS.secondary }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr 
                key={course.id}
                className="border-t"
                style={{ borderColor: `${COLORS.muted}20` }}
              >
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium" style={{ color: COLORS.secondary }}>
                        {course.courseName}
                      </div>
                      <div className="text-sm line-clamp-2" style={{ color: COLORS.muted }}>
                        {course.description}
                      </div>
                      {course.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {course.attachments.map((file, index) => (
                            <a
                              key={index}
                              href={file.data}
                              download={file.name}
                              className="flex items-center text-sm hover:underline"
                              style={{ color: COLORS.primary }}
                            >
                              <FiPaperclip className="mr-1" />
                              {file.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm" style={{ color: COLORS.secondary }}>
                    {course.track}
                  </div>
                </td>
                <td className="p-4">
                  {course.isFree ? (
                    <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full"
                          style={{ background: `${COLORS.primary}15`, color: COLORS.primary }}>
                      مجانية
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full"
                          style={{ background: `${COLORS.accent}15`, color: COLORS.accent }}>
                      ${Number(course.price).toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm" style={{ color: COLORS.muted }}>
                  {course.createdAt}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(course)}
                      className="p-2 rounded-lg"
                      style={{ background: `${COLORS.primary}15`, color: COLORS.primary }}
                      title="تعديل"
                    >
                      <FiEdit3 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(course.id)}
                      className="p-2 rounded-lg"
                      style={{ background: `${COLORS.danger}15`, color: COLORS.danger }}
                      title="حذف"
                    >
                      <FiX className="w-5 h-5" />
                    </motion.button>
                    <Link href="./AddTest">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-lg cursor-pointer"
                        style={{ background: `${COLORS.accent}15`, color: COLORS.accent }}
                        title="إضافة اختبار"
                      >
                        <FiClipboard className="w-5 h-5" />
                      </motion.div>
                    </Link>
                    <Link href={`/DashBoardTraier/my-courses/${course.id}/addAssist`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-lg cursor-pointer"
                        style={{ background: `${COLORS.primary}15`, color: COLORS.primary }}
                        title="إضافة مساعد"
                      >
                        <FiUserPlus className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AddCourseComponent;