"use client"
import { useState, useCallback } from "react";
import { Draggable } from '@hello-pangea/dnd';
import PermissionsEditor from './PermissionsEditor';
import RoleSelector from './RoleSelector';
import {
  PencilSquareIcon,
  TrashIcon,
  DocumentChartBarIcon,
  CheckIcon,
  XMarkIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/solid';

// تعريف الثيم اللوني
const theme = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

export default function TeamMemberCard({ 
  member, 
  index,
  onUpdate, 
  onDelete, 
  onViewDetails 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(member);

  const handleSave = useCallback(() => {
    onUpdate(member.id, editData);
    setIsEditing(false);
  }, [editData, member.id, onUpdate]);

  const handlePermissionChange = useCallback((perm, checked) => {
    onUpdate(member.id, {
      permissions: checked 
        ? [...member.permissions, perm] 
        : member.permissions.filter(p => p !== perm)
    });
  }, [member.permissions, onUpdate, member.id]);

  return (
    <Draggable draggableId={member.id} index={index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef} 
          {...provided.draggableProps}
          className={`mb-3 transition-all ${snapshot.isDragging ? 'shadow-xl' : 'shadow-md'}`}
        >
          <div 
            className="p-4 rounded-lg border transition-all"
            style={{
              backgroundColor: theme.white,
              borderColor: theme.gray + '30',
              transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
              boxShadow: snapshot.isDragging 
                ? `0 4px 20px ${theme.blue}20` 
                : `0 2px 8px ${theme.gray}15`
            }}
          >
            {/* Header Section */}
            <div className="flex items-start gap-3">
              {/* Drag Handle */}
              <div 
                {...provided.dragHandleProps}
                className="p-1.5 rounded-md hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                style={{ color: theme.gray }}
              >
                <ArrowsUpDownIcon className="w-5 h-5" />
              </div>

              {/* Member Info */}
              <div className="flex-1">
                {isEditing ? (
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="text-lg font-semibold p-1 border-b w-full focus:outline-none"
                    style={{
                      color: theme.black,
                      borderColor: theme.blue
                    }}
                  />
                ) : (
                  <div>
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: theme.black }}
                    >
                      {member.name}
                    </h3>
                    <p 
                      className="text-sm mt-1"
                      style={{ color: theme.gray }}
                    >
                      آخر دخول: {new Date(member.lastLogin).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <RoleSelector
                  value={isEditing ? editData.role : member.role}
                  onChange={(role) => setEditData({...editData, role})}
                  disabled={!isEditing}
                  theme={theme}
                />

                <button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: isEditing ? theme.blue + '20' : 'transparent',
                    color: isEditing ? theme.blue : theme.gray
                  }}
                  aria-label={isEditing ? 'حفظ التعديلات' : 'تعديل'}
                >
                  {isEditing ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <PencilSquareIcon className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={onViewDetails}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{
                    color: theme.blue,
                    backgroundColor: theme.blue + '10'
                  }}
                  aria-label="عرض التفاصيل"
                >
                  <DocumentChartBarIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={onDelete}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{
                    color: theme.red,
                    backgroundColor: theme.red + '10'
                  }}
                  aria-label="حذف العضو"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Permissions Section */}
            <div className="mt-4 pl-9">
              <PermissionsEditor
                permissions={member.permissions}
                onChange={handlePermissionChange}
                theme={theme}
              />
            </div>

            {/* Editing Mode Alert */}
            {isEditing && (
              <div 
                className="mt-4 p-2 rounded-md flex items-center gap-2 text-sm"
                style={{
                  backgroundColor: theme.yellow + '15',
                  color: theme.yellow
                }}
              >
                <XMarkIcon className="w-4 h-4" />
                <span>وضع التعديل نشط - التغييرات غير محفوظة بعد</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}