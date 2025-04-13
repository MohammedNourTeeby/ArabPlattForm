import BrandForm from './BrandForm';
import ThemePreview from './ThemePreview';

export default function BrandingPage() {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">تخصيص الهوية البصرية</h1>
        <BrandForm />
      </div>
      <div>
        <h2 className="text-xl mb-4">المعاينة المباشرة</h2>
        <ThemePreview />
      </div>
    </div>
  );
}