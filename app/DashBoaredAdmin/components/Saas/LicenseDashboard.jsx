"use client"
import { useLicenseStore } from './LicenseContext';
import { 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Bar 
} from 'recharts';
export default function LicenseDashboard() {
  const { licenses, clients, totalRevenue } = useLicenseStore();

  // بيانات وهمية للرسم البياني
  const salesData = [
    { month: 'يناير', sales: licenses.filter(l => l.month === '01').length },
    { month: 'فبراير', sales: licenses.filter(l => l.month === '02').length },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card bg-base-100 p-4">
        <h3 className="text-lg font-bold">إجمالي الإيرادات</h3>
        <p className="text-3xl">${totalRevenue}</p>
      </div>
      
      <div className="col-span-2">
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#4F46E5" />
        </BarChart>
      </div>
    </div>
  );
}