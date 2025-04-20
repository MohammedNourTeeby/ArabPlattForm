// components/ActivityLogs.jsx
'use client';
import { useEffect, useState } from 'react';
import { 
  ClockIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

const actionIcons = {
  edit: <PencilIcon className="w-4 h-4 text-blue-500" />,
  delete: <TrashIcon className="w-4 h-4 text-red-500" />,
  login: <ArrowRightOnRectangleIcon className="w-4 h-4 text-green-500" />,
  logout: <ArrowLeftOnRectangleIcon className="w-4 h-4 text-gray-500" />,
  default: <ClockIcon className="w-4 h-4 text-purple-500" />
};

export default function ActivityLogs({ activityLogs }) {
  const [groupedLogs, setGroupedLogs] = useState({});

  useEffect(() => {
    const grouped = activityLogs.reduce((acc, log) => {
      const date = new Date(log.timestamp).toLocaleDateString('ar-EG');
      if (!acc[date]) acc[date] = [];
      acc[date].push(log);
      return acc;
    }, {});

    setGroupedLogs(grouped);
  }, [activityLogs]);

  const getActionLabel = (actionType) => {
    const labels = {
      edit: 'تعديل بيانات',
      delete: 'حذف عنصر',
      login: 'دخول إلى النظام',
      logout: 'خروج من النظام',
      create: 'إنشاء عنصر جديد',
      update: 'تحديث الإعدادات'
    };
    return labels[actionType] || 'إجراء غير معروف';
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedLogs).map(([date, logs]) => (
        <div key={date} className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-medium">{date}</span>
          </div>

          <div className="space-y-3">
            {logs.map((log) => {
              const time = new Date(log.timestamp).toLocaleTimeString('ar-EG', {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="mt-1">
                    {actionIcons[log.actionType] || actionIcons.default}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">
                        {getActionLabel(log.actionType)}
                      </span>
                      <span className="text-xs text-gray-500">{time}</span>
                    </div>
                    
                    {log.details && (
                      <p className="text-xs text-gray-600 mt-1">
                        التفاصيل: {log.details}
                      </p>
                    )}
                    
                    {log.target && (
                      <div className="text-xs text-gray-500 mt-1">
                        على: <span className="font-medium">{log.target}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}