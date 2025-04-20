// MemberDetailsModal.jsx
'use client';
import { useEffect, useState } from 'react';
import ActivityLogs from './ActivityLogs';
import { 
  ClockIcon ,CalendarIcon 
} from '@heroicons/react/24/outline';

export default function MemberDetailsModal({ member, onClose, activityLogs }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-bold">سجل نشاط: {member.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">معلومات عامة:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>آخر دخول: {new Date(member.lastLogin).toLocaleString('ar-EG')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>تاريخ الانضمام: {new Date(member.joinDate).toLocaleDateString('ar-EG')}</span>
              </div>
            </div>
          </div>

          <ActivityLogs activityLogs={activityLogs.filter(log => log.memberId === member.id)} />
        </div>
      </div>
    </div>
  );
}