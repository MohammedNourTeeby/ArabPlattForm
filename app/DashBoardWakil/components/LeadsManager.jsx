// components/agent/Leads/LeadsManager.jsx
'use client';
import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, TagIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

// بيانات افتراضية
const initialLeads = [
  {
    id: 1,
    name: 'محمد أحمد',
    email: 'mohamed@example.com',
    phone: '+966512345678',
    stage: 'مهتم',
    tags: ['دورات برمجة', 'ميزانية محددة'],
    notes: [],
    lastContact: '2024-03-15'
  },
  {
    id: 2,
    name: 'فاطمة سالم',
    email: 'fatima@example.com',
    phone: '+966511112222',
    stage: 'متابعة',
    tags: ['ورش تصميم', 'عروض خاصة'],
    notes: ['طلب معلومات إضافية عن الباقات'],
    lastContact: '2024-03-20'
  }
];

const stageColors = {
  مهتم: 'bg-blue-100 text-blue-800',
  متابعة: 'bg-yellow-100 text-yellow-800',
  مفاوضات: 'bg-purple-100 text-purple-800',
  مغلق: 'bg-green-100 text-green-800'
};

const LeadRow = ({ lead, onTagUpdate, onNoteAdd }) => {
  const [newNote, setNewNote] = useState('');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* معلومات العميل */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{lead.name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <PhoneIcon className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{lead.phone}</span>
          </div>
        </div>

        {/* المرحلة والتاجات */}
        <div className="flex flex-col items-end gap-3">
          <span className={`px-3 py-1 rounded-full text-sm ${stageColors[lead.stage]}`}>
            {lead.stage}
          </span>
          
          <div className="flex flex-wrap gap-2">
            {lead.tags.map((tag, index) => (
              <span 
                key={index}
                className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-600"
              >
                <TagIcon className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* الملاحظات والإجراءات */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">الملاحظات</h4>
          <div className="flex gap-3">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-600 hover:text-blue-600">
                <TagIcon className="w-5 h-5" />
                <span className="mr-1 text-sm">إضافة تاج</span>
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border focus:outline-none">
                  {['دورات جديدة', 'عميل VIP', 'متابعة أسبوعية'].map((tag) => (
                    <Menu.Item key={tag}>
                      <button
                        onClick={() => onTagUpdate(lead.id, tag)}
                        className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {tag}
                      </button>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <button 
              className="flex items-center text-gray-600 hover:text-green-600"
              onClick={() => window.open(`mailto:${lead.email}?subject=عرض خاص`, '_blank')}
            >
              <EnvelopeIcon className="w-5 h-5" />
              <span className="mr-1 text-sm">إرسال عرض</span>
            </button>
          </div>
        </div>

        {/* حقل إضافة ملاحظة */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="أضف ملاحظة جديدة..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (newNote.trim()) {
                onNoteAdd(lead.id, newNote);
                setNewNote('');
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            حفظ
          </button>
        </div>

        {/* قائمة الملاحظات */}
        <div className="mt-4 space-y-2">
          {lead.notes.map((note, index) => (
            <div key={index} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
              <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400 mt-1" />
              <p className="text-gray-600 text-sm">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function LeadsManager() {
  const [leads, setLeads] = useState(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');

  // التصحيح هنا: إزالة الأقواس الزائدة
  const handleTagAdd = (leadId, tag) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, tags: Array.from(new Set([...lead.tags, tag])) } // إضافة Array.from
        : lead
    ));
  };

  const handleNoteAdd = (leadId, note) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, notes: [...lead.notes, note] } 
        : lead
    ));
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">إدارة العملاء المحتملين</h2>
        
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="ابحث عن عميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredLeads.map(lead => (
          <LeadRow
            key={lead.id}
            lead={lead}
            onTagUpdate={handleTagAdd}
            onNoteAdd={handleNoteAdd}
          />
        ))}
      </div>
    </div>
  );
}