import CertificateGenerator from './CertificateGenerator';
import CertificateList from './CertificateList';

export default function CertificatesDashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">إدارة الشهادات</h1>
      </div>
      
      <div className="grid gap-8">
        <CertificateGenerator />
        <CertificateList />
      </div>
    </div>
  );
}