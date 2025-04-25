"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Upload, CircleDollarSign } from 'lucide-react';

const AdCampaignManager = ({ courses, onCreateCampaign }) => {
  const [formData, setFormData] = useState({
    courseId: '',
    budget: '',
    startDate: new Date(),
    endDate: new Date(),
    bannerImage: null
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, bannerImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...formData,
      id: Date.now(),
      status: 'pending'
    };
    onCreateCampaign(newCampaign);
    setFormData({
      courseId: '',
      budget: '',
      startDate: new Date(),
      endDate: new Date(),
      bannerImage: null
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <CircleDollarSign className="w-6 h-6" />
        إنشاء حملة إعلانية
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>اختر الدورة</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              required
            >
              <option value="">-- اختر دورة --</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label>الميزانية (ر.س)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>تاريخ البداية</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              className="w-full p-2 border rounded"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          
          <div>
            <label>تاريخ النهاية</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              className="w-full p-2 border rounded"
              dateFormat="dd/MM/yyyy"
              minDate={formData.startDate}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">رفع بانر إعلاني</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-600">انقر لرفع الصورة</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {formData.bannerImage && (
              <img 
                src={formData.bannerImage} 
                alt="Banner Preview" 
                className="mt-4 h-32 object-cover rounded"
              />
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          نشر الحملة
        </button>
      </form>
    </div>
  );
};
export default AdCampaignManager;