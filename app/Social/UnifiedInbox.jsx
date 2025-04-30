"use client";
import { useState, useEffect, useMemo } from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { getMessages } from './mocks/messages';
import { Button } from '@/components/ui/Buttonn';
import { 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Search, 
  CheckCircle, 
  AlertCircle,
  Filter,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// نظام الألوان المخصص
const colors = {
  primary: '#3B82F6',
  secondary: '#6366F1',
  background: '#F8FAFC',
  text: '#1E293B',
  success: '#22C55E',
  error: '#EF4444',
  accent: '#94A3B8'
};

export default function UnifiedInbox() {
  const [messages, setMessages] = useState([]);
  const [filters, setFilters] = useState({ type: 'all', status: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const mockMessages = await getMessages();
        setMessages(mockMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => 
      (filters.type === 'all' || msg.source === filters.type) &&
      (filters.status === 'all' || msg.status === filters.status) &&
      (searchTerm === '' || msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [messages, filters, searchTerm]);

  const stats = useMemo(() => ({
    total: messages.length,
    read: messages.filter(m => m.status === 'read').length,
    unread: messages.filter(m => m.status === 'unread').length
  }), [messages]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg" style={{ backgroundColor: colors.background }}>
      {/* شريط الإحصائيات */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-blue-500" />
            <div>
              <div className="text-sm text-gray-500">إجمالي الرسائل</div>
              <div className="text-2xl font-bold" style={{ color: colors.text }}>{stats.total}</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <div className="text-sm text-gray-500">المقروءة</div>
              <div className="text-2xl font-bold" style={{ color: colors.text }}>{stats.read}</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div>
              <div className="text-sm text-gray-500">غير المقروءة</div>
              <div className="text-2xl font-bold" style={{ color: colors.text }}>{stats.unread}</div>
            </div>
          </div>
        </div>
      </div>

      {/* شريط التحكم */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="flex items-center gap-2 p-2 rounded-lg border" style={{ borderColor: colors.accent }}>
            <Search className="ml-2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في الرسائل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus:outline-none"
              style={{ backgroundColor: colors.background }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
            variant={filters.status === 'all' ? 'primary' : 'secondary'}
            className="gap-2"
          >
            <Filter className="w-4 h-4" /> الكل
          </Button>
          
          <Button
            onClick={() => setFilters(prev => ({ ...prev, status: 'read' }))}
            variant={filters.status === 'read' ? 'primary' : 'secondary'}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" /> مقروءة
          </Button>
          
          <Button
            onClick={() => setFilters(prev => ({ ...prev, status: 'unread' }))}
            variant={filters.status === 'unread' ? 'primary' : 'secondary'}
            className="gap-2"
          >
            <AlertCircle className="w-4 h-4" /> غير مقروءة
          </Button>
        </div>
      </div>

      {/* فلتر النوع */}
      <div className="flex gap-2 mb-6">
        {['all', 'email', 'sms', 'whatsapp'].map(type => (
          <Button
            key={type}
            onClick={() => setFilters(prev => ({ ...prev, type }))}
            variant={filters.type === type ? 'primary' : 'secondary'}
            className="gap-2"
          >
            {type === 'email' && <Mail className="w-4 h-4" />}
            {type === 'sms' && <MessageSquare className="w-4 h-4" />}
            {type === 'whatsapp' && <Smartphone className="w-4 h-4" />}
            {{
              all: 'الكل',
              email: 'البريد',
              sms: 'SMS',
              whatsapp: 'واتساب'
            }[type]}
          </Button>
        ))}
      </div>

      {/* الجدول مع حالة التحميل */}
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DataTable 
              columns={columns} 
              data={filteredMessages} 
              className="border rounded-xl overflow-hidden shadow-sm"
            />
            
            {/* ملخص النتائج */}
            <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
              <div>
                عرض {filteredMessages.length} من {messages.length} نتيجة
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {stats.read}
                </span>
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  {stats.unread}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}