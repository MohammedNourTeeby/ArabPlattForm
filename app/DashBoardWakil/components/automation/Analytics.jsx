// components/Dashboard/Analytics.jsx
"use client"
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useAutomationStore } from "./useAutomationStore";

export const Analytics = () => {
  const { campaigns } = useAutomationStore();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // تحضير البيانات للرسم البياني [[1]]
    const preparedData = campaigns.reduce((acc, campaign) => {
        const date = campaign.scheduledAt.split("T")[0];
        const type = campaign.type === "sms" ? "رسائل" : "مكالمات";
      
        if (!acc[date]) acc[date] = { name: date, "رسائل": 0, "مكالمات": 0 };
      
        acc[date][type] += 1;
      
        return acc;
      }, {});
      
    
    setChartData(Object.values(preparedData));
  }, [campaigns]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* مؤشرات الأداء الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-blue-600">الرسائل المرسلة</h3>
          <p className="text-2xl font-bold">{campaigns.filter(c => c.type === "sms").length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-green-600">المكالمات الناجحة</h3>
          <p className="text-2xl font-bold">{campaigns.filter(c => c.type === "call").length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="text-yellow-600">الحملات النشطة</h3>
          <p className="text-2xl font-bold">{campaigns.length}</p>
        </div>
      </div>

      {/* الرسم البياني للاستخدام اليومي */}
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">تحليل الأداء اليومي</h3>
        <BarChart width={600} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="رسائل" fill="#4f46e5" />
          <Bar dataKey="مكالمات" fill="#22c55e" />
        </BarChart>
      </div>
    </div>
  );
};