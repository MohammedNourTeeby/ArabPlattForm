"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressStepper from "./ProgressStepper";
import StepContent from "./StepContent";
import SectionHeader from "./SectionHeader";
import InputField from "./InputField";

const COLORS = {
  primary: "#008DCB",
  secondary: "#0D1012",
  muted: "#999999",
  danger: "#E2101E",
  background: "#FFFFFF",
  accent: "#F9D011",
};

const STEPS = [
  { id: 1, title: "المعلومات الأساسية", icon: "FiBook" },
  { id: 2, title: "صورة الغلاف", icon: "FiImage" },
  { id: 3, title: "الأهداف التعليمية", icon: "FiTarget" },
  { id: 4, title: "المتطلبات", icon: "FiList" },
  { id: 5, title: "الفئة المستهدفة", icon: "FiUsers" },
  { id: 6, title: "التسعير", icon: "FiDollarSign" },
  { id: 7, title: "تعليمات الوصول", icon: "FiLock" },
  { id: 8, title: "المرفقات", icon: "FiPaperclip" },
  { id: 9, title: "المحتوى", icon: "FiFilm" },
];

const AddCourseComponent = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    track: null,
    coverImage: null,
    learningObjectives: "",
    requirements: "",
    targetAudience: "",
    price: 0,
    isFree: true,
    attachments: [],
    videos: [],
    newVideo: { title: "", file: null, duration: "" },
    hasEntryTest: false,
    accessInstructions: "",
  });
  
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tracks?populate=*`
        );
        setTracks(data.data);
      } catch (error) {
        setError("فشل في تحميل الفئات التعليمية");
      } finally {
        setIsLoadingTracks(false);
      }
    };
    fetchTracks();
  }, []);

  const validateStep = (step) => {
    switch (step) {
      case 1: return !!formData.courseName && !!formData.track?.id;
      case 2: return !!formData.coverImage;
      case 3: return !!formData.learningObjectives.trim();
      case 4: return !!formData.requirements;
      case 5: return !!formData.targetAudience;
      case 6: return formData.isFree || formData.price > 0;
      case 7: return !!formData.accessInstructions.trim();
      default: return true;
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setError("الملفات المسموحة: PDF, DOC, DOCX, JPG, PNG");
      return;
    }
    
    const maxSize = 5 * 1024 * 1024;
    const largeFiles = files.filter(file => file.size > maxSize);
    if (largeFiles.length > 0) {
      setError("الحجم الأقصى للملف الواحد 5MB");
      return;
    }
    
    const formDataUpload = new FormData();
    files.forEach(file => formDataUpload.append("files", file));
    
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (data && data.length > 0) {
        setFormData(prev => ({
          ...prev,
          attachments: [
            ...prev.attachments,
            ...data.map(file => ({ id: file.id })),
          ],
        }));
      } else {
        throw new Error("فشل في رفع الملفات");
      }
    } catch (error) {
      let errorMessage = "فشل في رفع الملفات";
      if (error.response) {
        switch (error.response.status) {
          case 401: errorMessage = "غير مصرح بالرفع، يرجى تسجيل الدخول"; break;
          case 413: errorMessage = "الحجم الكلي للملفات يتجاوز الحد المسموح"; break;
          case 400: errorMessage = "نوع الملف غير مدعوم"; break;
          default: errorMessage = error.response.data?.error?.message || errorMessage;
        }
      }
      setError(errorMessage);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("نوع الصورة غير مدعوم. يُسمح بـ JPEG, PNG, أو WEBP");
      return;
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("الحجم الأقصى للصورة 5MB");
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("files", file);
    
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`,
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (data && data.length > 0) {
        setFormData(prev => ({ ...prev, coverImage: data[0].id }));
        
        const reader = new FileReader();
        reader.onload = (e) => setCoverImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } catch (error) {
      let errorMessage = "فشل في رفع صورة الغلاف";
      if (error.response) {
        switch (error.response.status) {
          case 401: errorMessage = "غير مصرح برفع الصور، يرجى تسجيل الدخول"; break;
          case 413: errorMessage = "الصورة تتجاوز الحجم المسموح"; break;
          default: errorMessage = error.response.data?.error?.message || errorMessage;
        }
      }
      setError(errorMessage);
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const uploadVideo = async (file) => {
    const videoFormData = new FormData();
    videoFormData.append('files', file);
    videoFormData.append('fileInfo', JSON.stringify({
      alternativeText: `فيديو: ${file.name}`,
      caption: formData.newVideo.duration
    }));
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload`,
      videoFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data[0].id;
  };

  const handleAddVideo = async () => {
    if (!formData.newVideo.file || !formData.newVideo.title) return;
    try {
      setIsUploading(true);
      const videoId = await uploadVideo(formData.newVideo.file);
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, {
          title: prev.newVideo.title,
          duration: prev.newVideo.duration,
          videoFile: videoId
        }],
        newVideo: { title: '', file: null, duration: '' }
      }));
    } catch (error) {
      setError('فشل في رفع الفيديو: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const getUserIdFromJwt = (jwt) => {
    try {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '_').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.id;
    } catch (e) {
      return null;
    }
  };

  const validateAllSteps = () => STEPS.every(step => validateStep(step.id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setError('يرجى تسجيل الدخول أولاً');
      setIsSubmitting(false);
      return;
    }
    try {
      const userId = getUserIdFromJwt(jwt);
      const payload = {
        data: {
          courseName: formData.courseName,
          learningObjectives: formData.learningObjectives,
          requirements: formData.requirements,
          targetAudience: formData.targetAudience,
          price: formData.price,
          isFree: formData.isFree,
          accessInstructions: formData.accessInstructions,
          hasEntryTest: formData.hasEntryTest,
          track: formData.track.id,
          attachments: formData.attachments.map(f => f.id),
          users_permissions_user: userId,
          videos: formData.videos.map(video => ({
            title: video.title,
            duration: video.duration,
            videoFile: video.videoFile
          })),
          coverImage: formData.coverImage
        }
      };
      
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`, payload, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json"
        }
      });
      
      alert('تم إنشاء الدورة بنجاح!');
      setFormData({
        courseName: '',
        track: null,
        coverImage: null,
        learningObjectives: '',
        requirements: '',
        targetAudience: '',
        price: 0,
        isFree: true,
        accessInstructions: '',
        hasEntryTest: false,
        attachments: [],
        videos: [],
        newVideo: { title: '', file: null, duration: '' },
      });
      setCoverImagePreview(null);
      setActiveStep(1);
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.error?.details?.errors?.[0]?.message || 
                          'حدث خطأ في الإرسال';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8" style={{ background: COLORS.background }}>
      <div className="rounded-2xl overflow-hidden" style={{
        boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
        border: `1px solid ${COLORS.muted}20`,
      }}>
        <ProgressStepper 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
          STEPS={STEPS} 
          COLORS={COLORS} 
          validateStep={validateStep}
        />
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 rounded-lg flex items-center gap-3" style={{
                background: `${COLORS.danger}10`,
                color: COLORS.danger,
              }}>
                <FiInfo className="text-xl" />
                {error}
              </div>
            )}
            
            <StepContent 
              activeStep={activeStep}
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              tracks={tracks}
              isLoadingTracks={isLoadingTracks}
              coverImagePreview={coverImagePreview}
              setCoverImagePreview={setCoverImagePreview}
              handleCoverImageUpload={handleCoverImageUpload}
              handleFileUpload={handleFileUpload}
              handleAddVideo={handleAddVideo}
              isUploading={isUploading}
              COLORS={COLORS}
            />
          </div>
          
          <div className="p-6 border-t" style={{ borderColor: `${COLORS.muted}20` }}>
            <div className="flex justify-between items-center">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep(prev => prev - 1)}
                  className="px-6 py-2.5 rounded-lg flex items-center gap-2"
                  style={{
                    background: `${COLORS.muted}10`,
                    color: COLORS.secondary,
                  }}
                >
                  <FiArrowLeft />
                  السابق
                </button>
              )}
              
              {activeStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-2.5 rounded-lg flex items-center gap-2"
                  style={{
                    background: COLORS.primary,
                    color: COLORS.background,
                    boxShadow: `0 4px 12px ${COLORS.primary}30`,
                  }}
                  disabled={!validateStep(activeStep)}
                >
                  التالي
                  <FiArrowLeft className="transform rotate-180" />
                </button>
              ) : (
                <div className="ml-auto flex gap-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-lg flex items-center gap-2"
                    style={{
                      background: COLORS.accent,
                      color: COLORS.secondary,
                      boxShadow: `0 4px 12px ${COLORS.accent}30`,
                    }}
                    disabled={isSubmitting || !validateAllSteps()}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال للمراجعة"}
                    <FiSave />
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseComponent;