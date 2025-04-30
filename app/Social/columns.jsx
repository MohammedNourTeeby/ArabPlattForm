import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

export const columns = [
  {
    accessorKey: 'source',
    header: 'المصدر',
    cell: ({ row }) => (
      <div className="capitalize flex items-center">
        {row.original.source === 'email' ? '📧 بريد' : 
         row.original.source === 'sms' ? '💬 SMS' : 
         row.original.source === 'whatsapp' ? '📱 WhatsApp' : '❓ غير معروف'}
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
      <span className={`inline-block px-2 py-1 rounded-full text-white ${
        row.original.status === 'unread' ? 'bg-red-500' : 'bg-green-500'
      }`}>
        {row.original.status === 'unread' ? 'غير مقروء' : 'مقروء'}
      </span>
    ),
  },
];