import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Filler } from 'chart.js';
ChartJS.register(Filler);

const AdPerformanceChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString('ar-SA')),
    datasets: [
      {
        label: 'الزيارات',
        data: data.map(d => d.views),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'التحويلات',
        data: data.map(d => d.conversions),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        rtl: true
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Noto Sans Arabic'
          }
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">أداء الحملة</h3>
      <Line data={chartData} options={options} height={100} />
    </div>
  );
};
export default AdPerformanceChart;