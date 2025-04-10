"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseEditor from './CourseEditor';
import ContentSorter from './ContentSorter';
import CourseCard from './CourseCard';
import coursesData from '../../../data.json';

const Page = () => {
  const [courses, setCourses] = useState(coursesData);
  const [favorites, setFavorites] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // تحميل المفضلة من localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('courseFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // حفظ المفضلة في localStorage
  const toggleFavorite = (courseId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      localStorage.setItem('courseFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // حفظ التغييرات على الدورة
  const handleSaveCourse = (updatedCourse) => {
    if (updatedCourse.id) {
      setCourses(prev => ({
        ...prev,
        categories: prev.categories.map(cat => ({
          ...cat,
          courses: cat.courses.map(c => 
            c.id === updatedCourse.id ? updatedCourse : c
          )
        }))
      }));
    } else {
      const newCourse = { ...updatedCourse, id: crypto.randomUUID() };
      setCourses(prev => ({
        ...prev,
        categories: prev.categories.map(cat => 
          cat.categoryName === newCourse.category
            ? { ...cat, courses: [...cat.courses, newCourse] }
            : cat
        )
      }));
    }
    setShowEditor(false);
  };

  // حذف الدورة
  const handleDelete = (courseId) => {
    setCourses(prev => ({
      ...prev,
      categories: prev.categories.map(cat => ({
        ...cat,
        courses: cat.courses.filter(c => c.id !== courseId)
      }))
    }));
  };

  // إعادة ترتيب المحتوى
  const handleReorder = (categoryName, newCourses) => {
    setCourses(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.categoryName === categoryName
          ? { ...cat, courses: newCourses }
          : cat
      )
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowEditor(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + إنشاء دورة جديدة
        </button>
      </div>

      {courses.categories.map((category, idx) => (
        <motion.section 
          key={category.categoryName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-4 border-b-2 border-purple-100 pb-4">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              {category.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {category.categoryName}
            </h2>
          </div>
          
          <ContentSorter
            items={category.courses}
            onReorder={(newCourses) => handleReorder(category.categoryName, newCourses)}
          >
            {(course) => (
              <CourseCard 
                key={course.id}
                course={course}
                isFavorite={favorites.includes(course.id)}
                onToggleFavorite={toggleFavorite}
                onEdit={() => {
                  setEditingCourse(course);
                  setShowEditor(true);
                }}
                onDelete={handleDelete}
              />
            )}
          </ContentSorter>
        </motion.section>
      ))}

      <AnimatePresence>
        {showEditor && (
          <CourseEditor
            courseToEdit={editingCourse}
            categories={courses.categories}
            onSave={handleSaveCourse}
            onClose={() => setShowEditor(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;