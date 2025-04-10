'use client';
import { useMemo } from 'react';
import { useTable } from 'react-table';
import OfferBadge from './OfferBadge';

const ActiveOffersList = () => {
  // بيانات وهمية ثابتة باستخدام useMemo
  const data = useMemo(() => [
    {
      code: 'OFFER123',
      value: '20%',
      startDate: '2025-04-01',
      endDate: '2025-04-15',
    },
    {
      code: 'SPRING50',
      value: '50%',
      startDate: '2025-04-05',
      endDate: '2025-04-20',
    },
  ], []);

  // تعريف الأعمدة باستخدام useMemo لتثبيتها بين الرندر
  const columns = useMemo(() => [
    { Header: 'الكود', accessor: 'code' },
    { Header: 'القيمة', accessor: 'value' },
    { 
      Header: 'الحالة', 
      Cell: ({ row }) => (
        <OfferBadge 
          start={row.original.startDate} 
          end={row.original.endDate} 
        />
      ) 
    },
    { 
      Header: 'الفترة', 
      Cell: ({ row }) => {
        const start = new Date(row.original.startDate).toLocaleDateString();
        const end = new Date(row.original.endDate).toLocaleDateString();
        return `${start} - ${end}`;
      }
    }
  ], []);

  // إنشاء instance للجدول
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">العروض النشطة</h2>
      
      <table {...getTableProps()} className="w-full">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => {
            // فصل خاصية key عن باقي الخصائص لتجنب تمريرها باستخدام spread
            const headerGroupProps = headerGroup.getHeaderGroupProps();
            const { key, ...restHeaderGroupProps } = headerGroupProps;
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map(column => {
                  const headerProps = column.getHeaderProps();
                  const { key: colKey, ...restHeaderProps } = headerProps;
                  return (
                    <th key={colKey} {...restHeaderProps} className="p-3 text-right">
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            const { key: rowKey, ...restRowProps } = rowProps;
            return (
              <tr key={rowKey} {...restRowProps} className="hover:bg-gray-50">
                {row.cells.map(cell => {
                  const cellProps = cell.getCellProps();
                  const { key: cellKey, ...restCellProps } = cellProps;
                  return (
                    <td key={cellKey} {...restCellProps} className="p-3 border-t">
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

export default ActiveOffersList;
