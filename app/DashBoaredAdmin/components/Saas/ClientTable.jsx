import { useLicenseStore } from './LicenseContext';
export default function ClientTable() {
    const { clients } = useLicenseStore();
  
    return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>اسم المركز</th>
              <th>حالة الترخيص</th>
              <th>تاريخ الانتهاء</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>
                  <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {client.status}
                  </span>
                </td>
                <td>{client.expiryDate}</td>
                <td>
                  <button 
                    className="btn btn-xs btn-info"
                    onClick={() => router.push(`/client/${client.id}`)}
                  >
                    التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }