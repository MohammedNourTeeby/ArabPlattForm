import React from 'react';
import { FiUpload, FiPaperclip, FiX, FiFilm, FiVideo, FiPlus, 
         FiBook, FiTarget, FiList, FiUsers, FiDollarSign, FiGift, 
         FiLock, FiInfo, FiClock, FiImage } from "react-icons/fi";
import SectionHeader from './SectionHeader';
import InputField from './InputField';
import Link from 'next/link';

const StepContent = ({ 
  activeStep, 
  formData, 
  setFormData, 
  setError, 
  tracks, 
  isLoadingTracks,
  coverImagePreview,
  setCoverImagePreview,
  handleCoverImageUpload,
  handleFileUpload,
  handleAddVideo,
  isUploading,
  COLORS
}) => {
  switch (activeStep) {
    case 1:
      return (
        <div className="p-6">
          <SectionHeader
            title="المعلومات الأساسية"
            description="أدخل التفاصيل الأساسية للدورة التعليمية"
            icon={<FiBook className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="اسم الدورة"
              isRequired
              name="courseName"
              value={formData.courseName}
              onUpdate={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
            >
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary"
              />
            </InputField>
            
            <InputField
              label="الفئة التعليمية"
              isRequired
              name="track"
              value={formData.track?.id || ""}
              onUpdate={(name, value) => {
                const trackId = parseInt(value);
                if (isNaN(trackId)) {
                  setFormData({ ...formData, track: null });
                  return;
                }
                const selectedTrack = tracks.find(t => t.id === trackId);
                if (selectedTrack) {
                  setFormData({
                    ...formData,
                    track: {
                      id: selectedTrack.id,
                      name: selectedTrack.name || selectedTrack.attributes?.name,
                    },
                  });
                } else {
                  setFormData({ ...formData, track: null });
                }
              }}
            >
              <select
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary"
              >
                <option value="">اختر الفئة</option>
                {tracks.map(track => (
                  <option key={track.id} value={track.id}>
                    {track.name || track.attributes?.name}
                  </option>
                ))}
              </select>
            </InputField>

            <div className="mt-4">
              <Link href="/AddEduGat" passHref>
                <div
                  className="p-3 rounded-lg flex items-center justify-center cursor-pointer"
                  style={{
                    background: COLORS.primary,
                    color: COLORS.background,
                    minWidth: "3rem"
                  }}
                  title="إضافة فئة جديدة"
                  role="button"
                >
                  <FiPlus className="text-xl" />
                  <span className="ml-2">فئة جديدة</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="p-6">
          <SectionHeader
            title="صورة الغلاف"
            description="قم برفع صورة غلاف للدورة التعليمية"
            icon={<FiImage className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <div className="space-y-4">
            <label
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed cursor-pointer hover:border-primary transition-colors"
              style={{ borderColor: `${COLORS.muted}40` }}
            >
              <FiUpload className="text-muted" />
              <span className="text-sm">
                اختر صورة أو اسحبها هنا (JPEG, PNG, WEBP)
              </span>
              <input
                type="file"
                onChange={handleCoverImageUpload}
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
              />
            </label>
            
            {coverImagePreview && (
              <div className="relative mt-4">
                <img
                  src={coverImagePreview}
                  alt="معاينة صورة الغلاف"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setCoverImagePreview(null);
                    setFormData(prev => ({ ...prev, coverImage: null }));
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-danger text-white"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="p-6">
          <SectionHeader
            title="الأهداف التعليمية"
            description="أدخل الأهداف التعليمية الرئيسية للدورة"
            icon={<FiTarget className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <InputField
            label="الأهداف التعليمية"
            isRequired
            name="learningObjectives"
            value={formData.learningObjectives}
            onUpdate={(name, value) => setFormData({ ...formData, [name]: value })}
          >
            <textarea
              className="w-full p-3 rounded-lg border border-gray-200 h-40"
              placeholder="ادخل الأهداف التعليمية الرئيسية للدورة، كل هدف في سطر منفصل"
            />
          </InputField>
        </div>
      );
    case 4:
      return (
        <div className="p-6">
          <SectionHeader
            title="المتطلبات الأساسية"
            description="حدد المعرفة أو المهارات المطلوبة مسبقاً"
            icon={<FiList className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <InputField
            label="المتطلبات الأساسية"
            isRequired
            name="requirements"
            value={formData.requirements}
            onUpdate={(name, value) => setFormData({ ...formData, [name]: value })}
          >
            <textarea
              className="w-full p-3 rounded-lg border border-gray-200 h-40"
              placeholder="مثال: معرفة أساسيات البرمجة، مهارات استخدام الحاسوب..."
            />
          </InputField>
        </div>
      );
    case 5:
      return (
        <div className="p-6">
          <SectionHeader
            title="الفئة المستهدفة"
            description="صف الفئة التي ستستفيد أكثر من هذه الدورة"
            icon={<FiUsers className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <InputField
            label="الفئة المستهدفة"
            isRequired
            name="targetAudience"
            value={formData.targetAudience}
            onUpdate={(name, value) => setFormData({ ...formData, [name]: value })}
          >
            <textarea
              className="w-full p-3 rounded-lg border border-gray-200 h-40"
              placeholder="مثال: المبتدئين في البرمجة، محترفي التسويق الرقمي..."
            />
          </InputField>
        </div>
      );
    case 6:
      return (
        <div className="p-6">
          <SectionHeader
            title="تسعير الدورة"
            description="حدد نوع الدورة والسعر المناسب"
            icon={<FiDollarSign className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: `${COLORS.muted}08` }}>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg cursor-pointer transition-all flex-1 text-center ${
                    formData.isFree ? "bg-primary text-white" : "bg-gray-100"
                  }`}
                  onClick={() => setFormData({ ...formData, isFree: true })}
                >
                  <FiGift className="inline-block mb-1" /> مجانية
                </div>
                <div
                  className={`p-3 rounded-lg cursor-pointer transition-all flex-1 text-center ${
                    !formData.isFree ? "bg-accent text-secondary" : "bg-gray-100"
                  }`}
                  onClick={() => setFormData({ ...formData, isFree: false })}
                >
                  <FiDollarSign className="inline-block mb-1" /> مدفوعة
                </div>
              </div>
              {!formData.isFree && (
                <InputField
                  label="سعر الدورة (USD)"
                  isRequired
                  name="price"
                  value={formData.price}
                  onUpdate={(name, value) => setFormData({ ...formData, [name]: parseFloat(value) || 0 })}
                >
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-3 py-3 rounded-lg border border-gray-200"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      $
                    </span>
                  </div>
                </InputField>
              )}
            </div>
            <div className="p-4 rounded-xl" style={{ background: `${COLORS.primary}08` }}>
              <div className="flex items-center gap-3 mb-2">
                <FiInfo className="text-primary" />
                <span className="font-medium">نصائح التسعير</span>
              </div>
              <p className="text-sm text-muted">
                - اختر سعراً يعكس قيمة المحتوى المقدم
                <br />
                - يمكنك إضافة عروض ترويجية لاحقاً
                <br />- السعر القياسي للدورات المشابهة: $20 - $200
              </p>
            </div>
          </div>
        </div>
      );
    case 7:
      return (
        <div className="p-6">
          <SectionHeader
            title="تعليمات الوصول"
            description="أدخل تعليمات الوصول إلى الدورة"
            icon={<FiLock className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <InputField
            label="تعليمات الوصول"
            isRequired
            name="accessInstructions"
            value={formData.accessInstructions}
            onUpdate={(name, value) => setFormData({ ...formData, [name]: value })}
          >
            <textarea
              className="w-full p-3 rounded-lg border border-gray-200 h-40"
              placeholder="مثال: سيتم إرسال رابط الوصول عبر البريد الإلكتروني بعد التسجيل..."
            />
          </InputField>
        </div>
      );
    case 8:
      return (
        <div className="p-6">
          <SectionHeader
            title="المرفقات"
            description="قم برفع أي ملفات داعمة للدورة"
            icon={<FiPaperclip className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <div className="space-y-4">
            <label
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed cursor-pointer hover:border-primary transition-colors"
              style={{ borderColor: `${COLORS.muted}40` }}
            >
              <FiUpload className="text-muted" />
              <span className="text-sm">
                اختر ملفات أو اسحبها هنا (PDF, DOC, صور)
              </span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg flex items-center justify-between"
                  style={{ background: `${COLORS.muted}08` }}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FiPaperclip className="text-muted" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      attachments: prev.attachments.filter((_, i) => i !== index)
                    }))}
                    className="text-danger hover:text-danger-dark"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 9:
      return (
        <div className="p-6">
          <SectionHeader
            title="المحتوى التعليمي"
            description="قم برفع الفيديوهات التعليمية للدورة"
            icon={<FiFilm className="text-white text-xl" />}
            COLORS={COLORS}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ background: `${COLORS.muted}08` }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiVideo className="text-primary" />
                إضافة فيديو جديد
              </h3>
              <div className="space-y-4">
                <InputField
                  label="عنوان الفيديو"
                  isRequired
                  name="videoTitle"
                  value={formData.newVideo.title}
                  onUpdate={(name, value) => setFormData(prev => ({
                    ...prev,
                    newVideo: { ...prev.newVideo, title: value }
                  }))}
                >
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-200"
                  />
                </InputField>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">
                      رفع ملف الفيديو
                    </label>
                    <span className="text-danger">*</span>
                  </div>
                  <label
                    className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed cursor-pointer hover:border-primary transition-colors"
                    style={{ borderColor: `${COLORS.muted}40` }}
                  >
                    <FiUpload className="text-muted" />
                    <span className="text-sm truncate">
                      {formData.newVideo.fileName || "اختر ملف فيديو"}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData(prev => ({
                            ...prev,
                            newVideo: {
                              ...prev.newVideo,
                              file: file,
                              fileName: file.name,
                            },
                          }));
                        }
                      }}
                    />
                  </label>
                </div>
                <button
                  onClick={handleAddVideo}
                  className="w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all"
                  style={{
                    background: COLORS.primary,
                    color: COLORS.background,
                    opacity: !formData.newVideo.title || !formData.newVideo.file ? 0.6 : 1,
                  }}
                  disabled={!formData.newVideo.title || !formData.newVideo.file || isUploading}
                >
                  <FiPlus />
                  {isUploading ? "جاري الرفع..." : "إضافة الفيديو"}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {formData.videos.map((video, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg flex items-start gap-4"
                  style={{
                    background: COLORS.background,
                    border: `1px solid ${COLORS.muted}20`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                    <FiVideo className="text-xl text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{video.title}</h4>
                      <button
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          videos: prev.videos.filter((_, i) => i !== index),
                        }))}
                        className="text-danger hover:text-danger-dark"
                      >
                        <FiX />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <FiClock /> {video.duration || "00:00"}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiFilm /> {video.fileName || `فيديو #${index + 1}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;