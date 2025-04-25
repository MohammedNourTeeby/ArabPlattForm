// TeamMemberCard.jsx
"use client"
import { useState } from "react";
import { Draggable } from '@hello-pangea/dnd';
import PermissionsEditor from './PermissionsEditor';
import RoleSelector from './RoleSelector';

export default function TeamMemberCard({ 
  member, 
  index, // تم استقبال index كخاصية بشكل صحيح
  onUpdate, 
  onDelete, 
  onViewDetails 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(member);

  const handleSave = () => {
    onUpdate(member.id, editData);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={member.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="p-4 border rounded-lg bg-white mb-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div {...provided.dragHandleProps} className="cursor-move">↕️</div>
              
              {isEditing ? (
                <input
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="flex-1 mx-2 p-1 border-b"
                />
              ) : (
                <div className="flex-1">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">
                    آخر دخول: {new Date(member.lastLogin).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="flex gap-2 items-center">
                <RoleSelector
                  value={isEditing ? editData.role : member.role}
                  onChange={(role) => setEditData({...editData, role})}
                  disabled={!isEditing}
                />

                <button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  {isEditing ? '💾' : '✏️'}
                </button>

                <button
                  onClick={onViewDetails}
                  className="p-2 hover:bg-blue-50 text-blue-500 rounded"
                >
                  📊
                </button>

                <button
                  onClick={onDelete}
                  className="p-2 hover:bg-red-50 text-red-500 rounded"
                >
                  🗑️
                </button>
              </div>
            </div>

            <PermissionsEditor
              permissions={member.permissions}
              onChange={(perm, checked) => 
                onUpdate(member.id, {
                  permissions: checked 
                    ? [...member.permissions, perm] 
                    : member.permissions.filter(p => p !== perm)
                })
              }
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}