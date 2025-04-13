"use client"
import LicenseDashboard from './LicenseDashboard';
import ClientTable from './ClientTable';

export default function LicenseManager() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">لوحة تحكم SaaS</h1>
      <LicenseDashboard />
      <ClientTable />
    </div>
  );
}