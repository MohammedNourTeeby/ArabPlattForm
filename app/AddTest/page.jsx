"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const AddTest = () => {
  const [questions, setQuestions] = useState(
    Array(10).fill().map((_, i) => ({
      id: i + 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }))
  );

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? {
        ...q,
        options: q.options.map((opt, i) => i === optionIndex ? value : opt)
      } : q
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Test Data:', questions);
    // يمكن إضافة API call هنا
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8"
      >
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-[Poppins]">
            🚀 إنشاء اختبار جديد
          </h1>
          <p className="text-gray-600">املأ الأسئلة والخيارات وحدد الإجابات الصحيحة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {questions.map((question) => (
            <motion.div 
              key={question.id}
              whileHover={{ scale: 1.01 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-semibold mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg mr-2">
                    {question.id}
                  </span>
                  السؤال
                </label>
                <textarea
                  required
                  value={question.text}
                  onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
                  placeholder="أدخل نص السؤال هنا..."
                  rows="2"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={option}
                      onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 placeholder-gray-400"
                      placeholder={`الاختيار ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuestionChange(question.id, 'correctAnswer', index)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200
                        ${question.correctAnswer === index 
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                    >
                      {question.correctAnswer === index ? '✓' : '?'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg"
          >
            💾 حفظ الاختبار
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTest;