'use client';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CommissionStats from './CommissionStats';
import ReferralLinkGenerator from './ReferralLinkGenerator';

Chart.register(...registerables);

const AffiliateDashboard = () => {
  const [stats, setStats] = useState({
    totalEarned: 0,
    pending: 150,
    conversions: 12
  });

  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
    datasets: [{
      label: 'الأرباح الشهرية',
      data: [120, 190, 300, 250, 400],
      borderColor: '#3B82F6',
      tension: 0.4
    }]
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">الإجمالي</h3>
          <p className="text-3xl font-bold">{stats.totalEarned} ر.س</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">في الانتظار</h3>
          <p className="text-3xl font-bold">{stats.pending} ر.س</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">التحويلات</h3>
          <p className="text-3xl font-bold">{stats.conversions}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">مخطط الأرباح</h2>
        <Line data={chartData} />
      </div>

      <ReferralLinkGenerator />
      <CommissionStats />
    </div>
  );
};

export default AffiliateDashboard;