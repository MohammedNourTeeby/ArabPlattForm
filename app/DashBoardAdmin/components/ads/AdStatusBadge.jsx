const AdStatusBadge = ({ status }) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800'
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
        {status === 'active' ? 'نشط' : status === 'pending' ? 'قيد المراجعة' : 'منتهي'}
      </span>
    );
  };
  
  export default AdStatusBadge;