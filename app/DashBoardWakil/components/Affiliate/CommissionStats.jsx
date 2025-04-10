'use client';
import { useMemo } from 'react';
import { useTable } from 'react-table';

const CommissionStats = () => {
  // تثبيت البيانات باستخدام useMemo
  const data = useMemo(
    () => [
      { id: 1, amount: 150, status: 'مصادق', date: '2024-03-15' },
      { id: 2, amount: 200, status: 'معلق', date: '2024-03-16' }
    ],
    []
  );

  // تثبيت تعريفات الأعمدة باستخدام useMemo
  const columns = useMemo(
    () => [
      { Header: 'المبلغ', accessor: 'amount' },
      { Header: 'الحالة', accessor: 'status' },
      { Header: 'التاريخ', accessor: 'date' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">تفاصيل العمولات</h2>
      <table {...getTableProps()} className="w-full">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => {
            const headerGroupProps = headerGroup.getHeaderGroupProps();
            return (
              <tr {...headerGroupProps} key={headerGroupProps.key}>
                {headerGroup.headers.map(column => {
                  const headerProps = column.getHeaderProps();
                  return (
                    <th
                      {...headerProps}
                      key={headerProps.key}
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map(row => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <tr {...rowProps} key={rowProps.key}>
                {row.cells.map(cell => {
                  const cellProps = cell.getCellProps();
                  return (
                    <td
                      {...cellProps}
                      key={cellProps.key}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommissionStats;
