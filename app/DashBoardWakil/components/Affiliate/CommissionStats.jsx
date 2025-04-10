'use client';
import { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const CommissionStats = () => {
  // تثبيت البيانات باستخدام useMemo
  const data = useMemo(
    () => [
      { id: 1, amount: 150, status: 'مصادق', date: '2024-03-15' },
      { id: 2, amount: 200, status: 'معلق', date: '2024-03-16' }
    ],
    []
  );

  const columnHelper = createColumnHelper();

  // تعريف الأعمدة باستخدام createColumnHelper
  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: 'المبلغ',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'الحالة',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('date', {
        header: 'التاريخ',
        cell: info => info.getValue(),
      })
    ],
    []
  );

  // إنشاء الجدول باستخدام useReactTable
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">تفاصيل العمولات</h2>
      <table className="w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionStats;