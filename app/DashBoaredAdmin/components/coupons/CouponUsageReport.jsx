'use client';
import { useMemo } from 'react';
import { useTable } from 'react-table';

const CouponUsageReport = ({ coupons }) => {
  // تجهيز البيانات مع حقول وهمية مثل عدد الاستخدامات والمتبقي
  const data = useMemo(() => {
    return coupons.map(c => ({
      ...c,
      uses: c.uses || 0, // قيمة افتراضية لعدد الاستخدامات
      remaining: c.maxUses - (c.uses || 0),
      validUntil: new Date(c.validUntil).toLocaleString()
    }));
  }, [coupons]);

  const columns = useMemo(() => [
    { Header: 'الكود', accessor: 'code' },
    { Header: 'الخصم', accessor: 'discount' },
    { Header: 'المستخدم', accessor: 'uses' },
    { Header: 'المتبقي', accessor: 'remaining' },
    { Header: 'الصلاحية', accessor: 'validUntil' }
  ], []);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">تقرير استخدام القسائم</h2>
      
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map(headerGroup => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest}>
                {headerGroup.headers.map(column => {
                  const { key: colKey, ...restColProps } = column.getHeaderProps();
                  return (
                    <th key={colKey} {...restColProps} className="p-3 bg-gray-50 text-right">
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
            const { key: rowKey, ...restRowProps } = row.getRowProps();
            return (
              <tr key={rowKey} {...restRowProps} className="hover:bg-gray-50">
                {row.cells.map(cell => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps();
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

export default CouponUsageReport;
