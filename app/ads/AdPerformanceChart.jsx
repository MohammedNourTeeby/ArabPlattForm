import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';

// تسجيل المكونات المطلوبة يدويًا
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const AdPerformanceChart = ({ data }) => {
  // تحويل التواريخ إلى نصوص باللغة العربية
  const chartLabels = data.map(d => new Date(d.date).toLocaleDateString('ar-SA'));

  // بيانات الرسم البياني
  const chartData = {
    labels: chartLabels,
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

  // خيارات الرسم البياني
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        rtl: true // دعم الوضع من اليمين إلى اليسار
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Noto Sans Arabic' // خط عربي للمحور الأفقي
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