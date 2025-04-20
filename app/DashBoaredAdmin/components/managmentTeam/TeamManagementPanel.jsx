// TeamManagementPanel.jsx
'use client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import MemberDetailsModal from './MemberDetailsModal';
import TeamMemberCard from './TeamMemberCard';
import RoleSelector from './RoleSelector';

const initialTeam = [
  { 
    id: '1', 
    name: 'محمد نور', 
    role: 'admin',
    permissions: ['edit', 'delete'],
    lastLogin: '2024-02-15T08:30:00',
    activity: []
  },
  // ... يمكن إضافة المزيد من الأعضاء هنا
];

export default function TeamManagementPanel() {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [newMember, setNewMember] = useState({ name: '', role: 'assistant' });
  const [filters, setFilters] = useState({ role: '', search: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);

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

  const addMember = () => {
    if (newMember.name.trim()) {
      const newMemberObj = {
        id: crypto.randomUUID(),
        ...newMember,
        permissions: [],
        lastLogin: new Date().toISOString(),
        activity: []
      };
      setTeamMembers([...teamMembers, newMemberObj]);
      setNewMember({ name: '', role: 'assistant' });
      logActivity('add', newMemberObj.id, 'إضافة عضو جديد');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الفريق الإداري</h2>
        
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="بحث بالأعضاء..."
            className="p-2 border rounded-lg"
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          <select
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value})}
            className="p-2 border rounded-lg"
          >
            <option value="">جميع الأدوار</option>
            <option value="admin">مشرف</option>
            <option value="assistant">مساعد</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="اسم العضو الجديد"
          className="p-2 border rounded-lg flex-1"
          value={newMember.name}
          onChange={(e) => setNewMember({...newMember, name: e.target.value})}
        />
        <RoleSelector
          value={newMember.role}
          onChange={(role) => setNewMember({...newMember, role})}
        />
        <button 
          onClick={addMember}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          إضافة عضو
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="teamMembers">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  onDelete={() => handleDeleteMember(member.id)}
                  onUpdate={updateMember}
                  onViewDetails={() => setSelectedMember(member)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          activityLogs={activityLogs}
        />
      )}
    </div>
  );
}