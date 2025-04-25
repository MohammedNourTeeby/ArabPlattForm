import { Bar } from 'react-chartjs-2';

export default function FinancialCharts({ data }) {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'الإيرادات',
        data: data.map(d => d.totalIncome),
        backgroundColor: '#3B82F6',
      },
      {
        label: 'المصروفات',
        data: data.map(d => d.totalExpenses),
        backgroundColor: '#EF4444',
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">تحليل الأداء الشهري</h3>
      <Bar 
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { rtl: true, position: 'top' },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true }
          }
        }}
      />
    </div>
  );
}