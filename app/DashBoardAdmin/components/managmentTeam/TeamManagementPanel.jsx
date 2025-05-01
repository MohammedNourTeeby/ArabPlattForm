'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  ArrowsUpDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import MemberDetailsModal from './MemberDetailsModal';
import TeamMemberCard from './TeamMemberCard';
import RoleSelector from './RoleSelector';

// نظام الألوان حسب المواصفات
const theme = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

const initialTeam = [
  { 
    id: '1', 
    name: 'محمد نور', 
    role: 'admin',
    permissions: ['edit', 'delete'],
    lastLogin: '2024-02-15T08:30:00',
    activity: [],
    avatar: '/avatars/1.png'
  },
  // ... أعضاء إضافيين
];

export default function TeamManagementPanel() {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [newMember, setNewMember] = useState({ name: '', role: 'assistant' });
  const [filters, setFilters] = useState({ role: '', search: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(teamMembers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTeamMembers(items);

    logActivity('reorder', reorderedItem.id, 'إعادة ترتيب الأعضاء');
  };

  const logActivity = (actionType, memberId, details) => {
    setActivityLogs([...activityLogs, {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      actionType,
      memberId,
      details
    }]);
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesRole = !filters.role || member.role === filters.role;
    const matchesSearch = member.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleDeleteMember = (memberId) => {
    setTeamMembers(teamMembers.filter(m => m.id !== memberId));
    logActivity('delete', memberId, 'حذف العضو');
  };

  const updateMember = (memberId, updates) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === memberId ? { ...m, ...updates } : m
    ));
    logActivity('update', memberId, 'تحديث بيانات العضو');
  };

  const addMember = async () => {
    if (newMember.name.trim()) {
      setIsAdding(true);
      // محاكاة اتصال API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMemberObj = {
        id: crypto.randomUUID(),
        ...newMember,
        permissions: [],
        lastLogin: new Date().toISOString(),
        activity: [],
        avatar: `/avatars/default.png`
      };
      
      setTeamMembers([...teamMembers, newMemberObj]);
      setNewMember({ name: '', role: 'assistant' });
      logActivity('add', newMemberObj.id, 'إضافة عضو جديد');
      setIsAdding(false);
    }
  };

  return (
    <div className="p-8 rounded-xl shadow-xl" style={{ backgroundColor: theme.white }}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: theme.blue + '15' }}>
            <UserPlusIcon className="w-7 h-7" style={{ color: theme.blue }} />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: theme.black }}>
            إدارة الفريق الإداري
          </h2>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ابحث عن أعضاء..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: theme.gray,
                color: theme.black,
                focusRing: `${theme.blue}33`
              }}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
            <MagnifyingGlassIcon 
              className="w-5 h-5 absolute left-3 top-2.5" 
              style={{ color: theme.gray }}
            />
          </div>

          <select
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value})}
            className="py-2 pl-3 pr-8 rounded-lg border appearance-none bg-no-repeat"
            style={{
              borderColor: theme.gray,
              color: theme.black,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999999'%3E%3Cpath d='M12 15l-5-5h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.5rem'
            }}
          >
            <option value="">جميع الأدوار</option>
            <option value="admin">مشرف</option>
            <option value="assistant">مساعد</option>
          </select>
        </div>
      </div>

      {/* Add Member Section */}
      <motion.div 
        className="mb-8 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="اسم العضو الجديد"
            className="w-full pl-4 pr-12 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: theme.gray,
              color: theme.black,
              focusRing: `${theme.blue}33`
            }}
            value={newMember.name}
            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
          />
          {newMember.name && (
            <button 
              onClick={() => setNewMember({...newMember, name: ''})}
              className="absolute right-3 top-2.5 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" style={{ color: theme.gray }} />
            </button>
          )}
        </div>

        <RoleSelector
          value={newMember.role}
          onChange={(role) => setNewMember({...newMember, role})}
        />

        <motion.button 
          onClick={addMember}
          whileTap={{ scale: 0.95 }}
          disabled={isAdding}
          className="px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 justify-center transition-colors"
          style={{
            backgroundColor: isAdding ? theme.gray : theme.blue,
            color: theme.white
          }}
        >
          {isAdding ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
          {isAdding ? 'جاري الإضافة...' : 'إضافة عضو'}
        </motion.button>
      </motion.div>

      {/* Members List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="teamMembers">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-3"
            >
              <AnimatePresence>
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    layout
                  >
                    <TeamMemberCard
                      member={member}
                      index={index}
                      onDelete={() => handleDeleteMember(member.id)}
                      onUpdate={updateMember}
                      onViewDetails={() => setSelectedMember(member)}
                      theme={theme}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {provided.placeholder}

              {filteredMembers.length === 0 && (
                <div className="text-center py-12 rounded-xl" style={{ backgroundColor: theme.white }}>
                  <div className="mx-auto h-24 w-24 mb-4" style={{ color: theme.gray }}>
                    <UserGroupIcon className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium" style={{ color: theme.black }}>
                    لا يوجد أعضاء متطابقون مع البحث
                  </h3>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Member Details Modal */}
      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          activityLogs={activityLogs}
          theme={theme}
        />
      )}

      {/* Drag Handle Hint */}
      <div className="mt-6 flex items-center gap-2 text-sm" style={{ color: theme.gray }}>
        <ArrowsUpDownIcon className="w-4 h-4" />
        <span>اسحب العناصر لإعادة الترتيب</span>
      </div>
    </div>
  );
}