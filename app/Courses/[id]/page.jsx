"use client"
import { useEffect, useState } from 'react';
import AddCourseAssistant from '@/components/AddCourseAssistant';
import AssistantsList from '@/components/AssistantsList';

export default function CoursePage({ params }) {
  const [courseData, setCourseData] = useState(null);
  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    // جلب بيانات المساعدين من localStorage
    const storedAssistants = JSON.parse(
      localStorage.getItem(`course-${params.id}-assistants`) || '[]'
    );
    setAssistants(storedAssistants);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* ... الأقسام الأخرى للدورة ... */}
      
      <section className="my-8">
        {/* يظهر فقط للمستخدمين المصرح لهم */}
        <AddCourseAssistant 
          courseId={params.id} 
          currentAssistants={assistants}
        />
        
        <AssistantsList 
          courseId={params.id}
          assistants={assistants}
        />
      </section>
    </div>
  );
}