import { useLicenseStore } from './LicenseContext';
import { mockLicenses } from './mockLicenses';

export default function AdminLicenseTable() {
  const { licenses, deactivateLicense } = useLicenseStore();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>المفتاح</th>
            <th>الحالة</th>
            <th>تاريخ الانتهاء</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license.id}>
              <td>{license.key}</td>
              <td>
                <span className={`badge ${license.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {license.status}
                </span>
              </td>
              <td>{license.expirationDate}</td>
              <td>
                <button 
                  onClick={() => deactivateLicense(license.id)} 
                  className="btn btn-xs btn-error"
                >
                  إلغاء التفعيل
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}