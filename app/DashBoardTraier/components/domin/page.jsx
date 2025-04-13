"use client"
import { useIntegratedStore } from './IntegratedContext';
import TemplateSelector from './TemplateSelector';
import DomainManager from './DomainManager';

export default function DomainPageBuilder() {
  const { currentPage, currentDomain } = useIntegratedStore();

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      {/* قسم إدارة الدومين */}
      <div>
        <h2 className="text-xl mb-4">إدارة الدومين</h2>
        <DomainManager />
      </div>

      {/* قسم تصميم الصفحة */}
      <div>
        <h2 className="text-xl mb-4">تصميم الصفحة التسويقية</h2>
        <TemplateSelector />
      </div>
    </div>
  );
}