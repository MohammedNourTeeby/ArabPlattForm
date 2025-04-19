"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, Check, X, Type, List, ToggleRight } from 'lucide-react';

const AddTest = () => {
  const [questions, setQuestions] = useState([{
    id: 1,
    type: 'multiple-choice',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    blankAnswer: '',
    trueFalseAnswer: true
  }]);

  const questionTypes = [
    { value: 'multiple-choice', label: 'اختيار متعدد', icon: <List className="w-4 h-4" /> },
    { value: 'fill-blank', label: 'املأ الفراغ', icon: <Type className="w-4 h-4" /> },
    { value: 'true-false', label: 'صح/خطأ', icon: <ToggleRight className="w-4 h-4" /> }
  ];

  const addQuestion = (type) => {
    setQuestions(prev => [...prev, {
      id: prev.length + 1,
      type,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      blankAnswer: '',
      trueFalseAnswer: true
    }]);
  };

  const removeQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

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

  const QuestionInput = ({ question }) => (
    <div className="space-y-6">
      <div className="flex gap-3 items-start">
        <select
          value={question.type}
          onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
          className="w-40 px-3 py-2 border-2 border-purple-200 rounded-xl bg-white text-purple-600 font-semibold"
        >
          {questionTypes.map((type) => (
            <option key={type.value} value={type.value} className="flex items-center gap-2">
              {type.label}
            </option>
          ))}
        </select>
        
        <button
          type="button"
          onClick={() => removeQuestion(question.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-lg mr-2">
            {question.id}
          </span>
          نص السؤال
        </label>
        <textarea
          required
          value={question.text}
          onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 transition-all resize-none"
          placeholder="أدخل نص السؤال هنا..."
          rows="2"
        />
      </div>
    </div>
  );

  const MultipleChoiceOptions = ({ question }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {question.options.map((option, index) => (
        <div key={index} className="flex items-center gap-3">
          <input
            type="text"
            required
            value={option}
            onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 transition-all"
            placeholder={`الاختيار ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => handleQuestionChange(question.id, 'correctAnswer', index)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all
              ${question.correctAnswer === index 
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
          >
            {question.correctAnswer === index ? <Check /> : index + 1}
          </button>
        </div>
      ))}
    </div>
  );

  const FillBlankOption = ({ question }) => (
    <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
      <label className="block text-yellow-800 font-semibold mb-2">الإجابة الصحيحة:</label>
      <input
        type="text"
        required
        value={question.blankAnswer}
        onChange={(e) => handleQuestionChange(question.id, 'blankAnswer', e.target.value)}
        className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        placeholder="أدخل الإجابة الصحيحة..."
      />
    </div>
  );

  const TrueFalseOption = ({ question }) => (
    <div className="flex gap-4 justify-center">
      {[true, false].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleQuestionChange(question.id, 'trueFalseAnswer', value)}
          className={`px-8 py-3 rounded-xl text-lg font-semibold flex items-center gap-2 transition-all
            ${question.trueFalseAnswer === value
              ? 'bg-green-500 text-white shadow-lg'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          {value ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          {value ? 'صح' : 'خطأ'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <PlusCircle className="w-12 h-12 text-blue-600" />
              إنشاء اختبار متكامل
            </h1>
            <p className="text-gray-600 text-lg">صمم اختبارك باحترافية مع أنواع متعددة من الأسئلة</p>
          </div>

          <AnimatePresence>
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all"
              >
                <QuestionInput question={question} />
                
                {question.type === 'multiple-choice' && <MultipleChoiceOptions question={question} />}
                {question.type === 'fill-blank' && <FillBlankOption question={question} />}
                {question.type === 'true-false' && <TrueFalseOption question={question} />}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 mt-8">
            {questionTypes.map((type) => (
              <motion.button
                key={type.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => addQuestion(type.value)}
                className="px-6 py-3 bg-blue-100 text-blue-600 rounded-xl flex items-center gap-2 hover:bg-blue-200"
              >
                {type.icon}
                {type.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          حفظ الاختبار النهائي
        </motion.button>
      </div>
    </div>
  );
};

export default AddTest;