"use client"

import { useState, useEffect } from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { getMessages } from './mocks/messages';

const UnifiedInbox = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // جلب البيانات الوهمية
    setMessages(getMessages());
  }, []);

  // فلترة الرسائل حسب المصدر
  const filteredMessages = messages.filter((msg) => 
    filter === 'all' || msg.source === filter
  );

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setFilter('all')} className="btn btn-primary">
          الكل
        </button>
        <button onClick={() => setFilter('email')} className="btn btn-secondary">
          البريد
        </button>
        <button onClick={() => setFilter('sms')} className="btn btn-accent">
          SMS
        </button>
        <button onClick={() => setFilter('whatsapp')} className="btn btn-success">
          WhatsApp
        </button>
      </div>
      <DataTable columns={columns} data={filteredMessages} />
    </div>
  );
};

export default UnifiedInbox;