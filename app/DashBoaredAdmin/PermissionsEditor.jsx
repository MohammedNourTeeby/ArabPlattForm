export default function PermissionsEditor({ permissions, onChange }) {
    const allPermissions = [
      { id: 'view', label: 'عرض المحتوى' },
      { id: 'edit', label: 'التعديل' },
      { id: 'delete', label: 'الحذف' },
      { id: 'publish', label: 'النشر' }
    ];
  
    return (
      <div className="flex gap-4 mr-4">
        {allPermissions.map((perm) => (
          <label key={perm.id} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={permissions.includes(perm.id)}
              onChange={(e) => onChange(perm.id, e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">{perm.label}</span>
          </label>
        ))}
      </div>
    );
  }