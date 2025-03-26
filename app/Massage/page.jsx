"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function page() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'مرحباً، كيف حالك؟',
      sender: 'محمد',
      time: '10:00 ص',
      sentByMe: false
    },
    {
      id: 2,
      text: 'أنا بخير، شكراً لك! ماذا عنك؟ كيف تسير أمورك اليوم؟ هل لديك أي أخبار جديدة تريد مشاركتها معي؟',
      sender: 'أحمد',
      time: '10:02 ص',
      sentByMe: true
    },
    {
      id: 3,
      text: 'كل شيء على ما يرام، أعمل حالياً على مشروع جديد لتطوير واجهات المستخدم باستخدام تقنيات حديثة مثل Next.js وTailwind CSS.',
      sender: 'محمد',
      time: '10:05 ص',
      sentByMe: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'أحمد',
      time: new Date().toLocaleTimeString('ar-EG', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      sentByMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  }, [newMessage]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col h-[800px] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl">
        <h1 className="text-2xl font-bold text-center">محادثة خاصة</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sentByMe ? 'justify-end' : 'justify-start'}`}
            role="listitem"
          >
            <div
              className={`
                max-w-2xl p-4 rounded-3xl shadow-sm transition-all duration-200
                ${
                  msg.sentByMe 
                    ? 'bg-purple-600 text-white ml-12 hover:shadow-md' 
                    : 'bg-white text-gray-800 mr-12 border border-gray-200 hover:shadow-md'
                }
                animate-fade-in-up
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${msg.sentByMe ? 'text-purple-100' : 'text-purple-600'}`}>
                  {msg.sender}
                </span>
                <span className={`text-xs ${msg.sentByMe ? 'text-purple-200' : 'text-gray-500'}`}>
                  {msg.time}
                </span>
              </div>
              <p className="text-base leading-6">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6 bg-white rounded-b-2xl">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 p-4 border border-gray-300 rounded-2xl focus:outline-none 
                     focus:ring-3 focus:ring-purple-500 focus:border-transparent
                     transition-all duration-200 placeholder-gray-400 text-base"
            placeholder="اكتب رسالتك هنا..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            aria-label="إدخال الرسالة"
          />
          <button
            className="bg-purple-600 text-white px-8 py-4 rounded-2xl hover:bg-purple-700 
                     active:bg-purple-800 transition-colors duration-200 focus:outline-none 
                     focus:ring-3 focus:ring-purple-500 focus:ring-offset-2 flex items-center"
            onClick={sendMessage}
            aria-label="إرسال الرسالة"
          >
            <span className="text-base font-medium ml-2">إرسال</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.289l7-2a1 1 0 00.62-.044l3.992-1.966a1 1 0 00-.111-1.85l-11-4.5a1 1 0 10-.738 1.848l8.682 3.556-2.906 1.433L10.894 2.553z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}