'use client';
import { useTable } from 'react-table';
import { FileText, CircleCheck, CircleX } from 'lucide-react';

const PayoutHistory = () => {
  // استبدال JSON.parse ببيانات وهمية
  const data = [
    { date: '2025-04-01', amount: 100, status: 'paid' },
    { date: '2025-04-02', amount: 150, status: 'pending' },
    // أضف المزيد من البيانات الوهمية هنا حسب الحاجة
  ];

  const columns = [
    { Header: 'التاريخ', accessor: 'date' },
    { Header: 'المبلغ', accessor: 'amount' },
    { 
      Header: 'الحالة', 
      accessor: 'status',
      Cell: ({ value }) => (
        <div className="flex items-center gap-1">
          {value === 'paid' ? (
            <CircleCheck className="text-green-500" />
          ) : (
            <CircleX className="text-red-500" />
          )}
          {value === 'paid' ? 'مكتمل' : 'معلق'}
        </div>
      )
    }
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold">سجل الصرفيات</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="p-2 text-right">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-t hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutHistory;
