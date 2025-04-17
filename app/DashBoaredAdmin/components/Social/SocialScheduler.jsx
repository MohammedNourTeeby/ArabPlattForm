"use client"
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { platforms } from './mocks/platforms';

const SocialScheduler = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [publishDate, setPublishDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    // إرسال البيانات إلى الـ API الوهمي
    console.log('منشور جديد:', { postContent, selectedPlatforms, publishDate });
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="اكتب منشورك هنا..."
          className="w-full p-3 border rounded"
          rows={4}
        />
        <div className="flex gap-4">
          {platforms.map((platform) => (
            <div key={platform.id}>
              <input
                type="checkbox"
                id={platform.name}
                checked={selectedPlatforms.includes(platform.name)}
                onChange={(e) => {
                  setSelectedPlatforms(
                    e.target.checked
                      ? [...selectedPlatforms, platform.name]
                      : selectedPlatforms.filter((p) => p !== platform.name)
                  );
                }}
              />
              <label htmlFor={platform.name} className="ml-2">
                {platform.icon} {platform.name}
              </label>
            </div>
          ))}
        </div>
        <DatePicker
          selected={publishDate}
          onChange={(date) => setPublishDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 border rounded"
        />
        <button type="submit" className="btn btn-primary">
          جدولة المنشور
        </button>
      </form>
    </div>
  );
};

export default SocialScheduler;