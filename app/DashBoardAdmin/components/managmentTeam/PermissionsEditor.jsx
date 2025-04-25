// PermissionsEditor.jsx
export default function PermissionsEditor({ permissions, onChange }) {
  const allPermissions = [
    { id: 'view', label: 'عرض المحتوى', icon: '👁️' },
    { id: 'edit', label: 'التعديل', icon: '✏️' },
    { id: 'delete', label: 'الحذف', icon: '🗑️' },
    { id: 'publish', label: 'النشر', icon: '📢' },
    { id: 'query', label: 'استعلام', icon: '🔍' },
    { id: 'manage_users', label: 'إدارة المستخدمين', icon: '👥' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mr-4">
      {allPermissions.map((perm) => (
        <label key={perm.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
          <input
            type="checkbox"
            checked={permissions.includes(perm.id)}
            onChange={(e) => onChange(perm.id, e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">
            <span className="mr-1">{perm.icon}</span>
            {perm.label}
          </span>
        </label>
      ))}
    </div>
  );
}