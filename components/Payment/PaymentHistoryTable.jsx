'use client';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import PaymentStatusBadge from './PaymentStatusBadge';

// بيانات وهمية للتعاملات (تظهر في سجل الدفع)
const dummyTransactions = [
  { id: 1, amount: 100, method: 'بطاقة ائتمان', status: 'completed', date: '2023-04-10' },
  { id: 2, amount: 50, method: 'Apple Pay', status: 'pending', date: '2023-04-11' },
];

const PaymentHistoryTable = () => {
  // استخدام بيانات وهمية بدلاً من قراءة من الذاكرة الخارجية
  const data = useMemo(() => dummyTransactions, []);

  const columns = useMemo(
    () => [
      { Header: 'المبلغ', accessor: 'amount' },
      { Header: 'الطريقة', accessor: 'method' },
      {
        Header: 'الحالة',
        accessor: 'status',
        Cell: ({ value }) => <PaymentStatusBadge status={value} />,
      },
      { Header: 'التاريخ', accessor: 'date' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table {...getTableProps()} className="w-full">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-right font-medium text-gray-500"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-6 py-4 text-gray-700">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
