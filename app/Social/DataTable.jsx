"use client"
import { useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Search, AlertCircle } from 'lucide-react';

const statusIcons = {
  unread: <AlertCircle className="w-4 h-4 mr-1" />,
  read: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
  pending: <Clock className="w-4 h-4 mr-1 text-yellow-600" />,
  failed: <XCircle className="w-4 h-4 mr-1 text-red-600" />
};

export const columns = [
  {
    accessorKey: 'source',
    header: 'المصدر',
    cell: ({ row }) => (
      <div className="flex items-center text-primary-600 font-medium">
        {row.original.source === 'email' && <span className="mr-2">📧</span>}
        {row.original.source === 'sms' && <span className="mr-2">💬</span>}
        {row.original.source === 'whatsapp' && <span className="mr-2">📱</span>}
        {row.original.source.charAt(0).toUpperCase() + row.original.source.slice(1)}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: 'المحتوى',
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate hover:max-w-none hover:whitespace-normal">
        {row.original.content}
      </div>
    )
  },
  {
    accessorKey: 'timestamp',
    header: 'التاريخ',
    cell: ({ row }) => (
      <div className="text-gray-500 text-sm">
        {new Date(row.original.timestamp).toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => (
      <div className={`inline-flex items-center px-3 py-1 rounded-full ${
        row.original.status === 'unread' ? 'bg-red-100 text-red-800' :
        row.original.status === 'read' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {statusIcons[row.original.status]}
        <span className="text-sm">
          {row.original.status === 'unread' ? 'غير مقروء' : 
           row.original.status === 'read' ? 'مقروء' : 'مجهول'}
        </span>
      </div>
    ),
  },
];

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-right text-sm font-semibold text-gray-700"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="px-6 py-4 text-sm text-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <Search className="mx-auto h-12 w-12 mb-4 text-gray-400" />
          لا توجد بيانات متاحة
        </div>
      )}
    </motion.div>
  );
}