import { useRouter } from 'next/router';
import LicenseForm from '@/components/SaaSLicensing/LicenseForm';

export default function ActivateLicense() {
  const router = useRouter();
  const { licenseKey } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-4">تفعيل الترخيص</h1>
        <LicenseForm initialKey={licenseKey} />
      </div>
    </div>
  );
}