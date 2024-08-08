//imports

interface Column {
  header: string;
  rows: string;
}

interface BasicTableProps<T> {
  columns: Column[];
  data: T[];
}

const BasicTable = <T,>({ columns, data }: BasicTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-200 border border-stone-200">
        <thead className="bg-stone-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className="min-w-[10rem] px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-sm text-stone-500"
              >
                No results found.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-stone-100">
                {columns.map((column) => (
                  <td
                    key={column.rows}
                    className="px-6 py-4 whitespace-nowrap text-sm text-stone-500"
                  >
                    {(item as any)[column.rows]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
