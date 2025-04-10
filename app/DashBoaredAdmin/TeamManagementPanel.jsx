'use client';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import TeamMemberCard from './TeamMemberCard';
import RoleSelector from './RoleSelector';

const initialTeam = [
  { id: '1', name: 'محمد نور', role: 'مشرف', permissions: ['edit', 'delete'] },
  { id: '2', name: 'أحمد علي', role: 'مساعد', permissions: ['view'] }
];

export default function TeamManagementPanel() {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [newMember, setNewMember] = useState({ name: '', role: 'مساعد' });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(teamMembers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTeamMembers(items);
  };

  const addMember = () => {
    if (!newMember.name) return;
    
    setTeamMembers([...teamMembers, {
      id: crypto.randomUUID(),
      ...newMember,
      permissions: []
    }]);
    
    setNewMember({ name: '', role: 'مساعد' });
  };

  const updatePermissions = (memberId, permission, checked) => {
    setTeamMembers(teamMembers.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          permissions: checked 
            ? [...member.permissions, permission] 
            : member.permissions.filter(p => p !== permission)
        };
      }
      return member;
    }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">إدارة الفريق الإداري</h2>
      
      {/* إضافة عضو جديد */}
      <div className="mb-8 flex gap-4 items-center">
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
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* قائمة الأعضاء مع Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="teamMembers">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  onUpdatePermissions={updatePermissions}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}