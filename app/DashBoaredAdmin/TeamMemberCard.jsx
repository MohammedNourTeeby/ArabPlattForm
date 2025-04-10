import { Draggable } from '@hello-pangea/dnd'; // 1. تصحيح اسم الاستيراد
import { TrashIcon } from '@heroicons/react/24/outline';
import PermissionsEditor from './PermissionsEditor';

export default function TeamMemberCard({ 
  member, 
  index, 
  onUpdatePermissions,
  onDelete // 3. إضافة prop جديد للحذف
}) {
  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد من حذف العضو؟')) {
      onDelete(member.id); // 4. إضافة منطق الحذف
    }
  };

  return (
    <Draggable draggableId={member.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 border rounded-lg bg-white ${
            snapshot.isDragging 
              ? 'shadow-lg transform rotate-2' // 5. تحسينات بصرية أثناء السحب
              : 'shadow-sm hover:shadow-md'
          } transition-all duration-200 mb-2`}
        >
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{member.name}</h3>
              <span className="text-gray-500 text-sm">{member.role}</span>
            </div>
            
            <PermissionsEditor
              permissions={member.permissions}
              onChange={(permission, checked) => 
                onUpdatePermissions(member.id, permission, checked)
              }
            />

            <button
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              onClick={handleDelete} // 6. استخدام دالة الحذف
              aria-label="حذف العضو"
            >
              <TrashIcon className="w-5 h-5" />
              <span className="sr-only">حذف العضو</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}