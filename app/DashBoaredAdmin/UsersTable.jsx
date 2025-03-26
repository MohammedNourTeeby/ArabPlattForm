// components/UsersTable.jsx
import React from 'react';

const UsersTable = ({ users }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="p-6 flex justify-between items-center">
      <h3 className="text-lg font-semibold">إدارة المستخدمين</h3>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        إضافة مستخدم
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right">الاسم</th>
            <th className="px-6 py-3 text-right">الدور</th>
            <th className="px-6 py-3 text-right">الحالة</th>
            <th className="px-6 py-3 text-right">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  تعديل
                </button>
                <button className="text-red-600 hover:text-red-800">
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UsersTable;