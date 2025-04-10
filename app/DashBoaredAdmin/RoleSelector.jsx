export default function RoleSelector({ value, onChange }) {
    const roles = [
      { id: 'admin', name: 'مشرف' },
      { id: 'assistant', name: 'مساعد' },
      { id: 'moderator', name: 'مراقب' },
      { id: 'support', name: 'دعم فني' }
    ];
  
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded-lg w-32"
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    );
  }