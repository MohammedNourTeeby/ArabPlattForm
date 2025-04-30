// columns.jsx
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

// تعريف الأعمدة للـ DataTable
export const columns = [
  {
    accessorKey: 'source',
    header: 'المصدر',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.source === 'email' ? '📧 بريد' : row.original.source === 'sms' ? '💬 SMS' : '📱 WhatsApp'}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: 'المحتوى',
  },
  {
    accessorKey: 'timestamp',
    header: 'التاريخ',
    cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => (
      <span className={row.original.status === 'unread' ? 'text-red-500' : 'text-green-500'}>
        {row.original.status === 'unread' ? 'غير مقروء' : 'مقروء'}
      </span>
    ),
  },
];