import { useState } from "react";
import { PencilIcon, TrashIcon, ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Column {
  header: string;
  rows: string;
}

interface BasicTableProps<T> {
  columns: Column[];
  data: T[];
  onDelete: (item: T) => void;
  onRestore: (item: T) => void;
}

const BasicTable = <T extends { id: string; deletedAt?: string | null }>({
  columns,
  data,
  onDelete,
  onRestore,
}: BasicTableProps<T>) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [confirmingRowDeletionIndex, setConfirmingRowDeletionIndex] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRowIndex(selectedRowIndex === index ? null : index);
    setConfirmingRowDeletionIndex(null);
  };

  const handleDeleteClick = (item: T, index: number) => {
    setItemToDelete(item);
    setConfirmingRowDeletionIndex(index);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setConfirmingRowDeletionIndex(null);
      setItemToDelete(null);
    }
  };

  const handleRestoreClick = (item: T) => {
    onRestore(item);
  };

  return (
    <div className="overflow-x-auto relative">
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
              <tr
                key={item.id}
                className={`cursor-pointer ${
                  selectedRowIndex === index
                    ? "bg-blue-50"
                    : "hover:bg-stone-100 transition"
                }`}
                onClick={() => handleRowClick(index)}
              >
                {columns.map((column) => (
                  <td
                    key={column.rows}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      item.deletedAt
                        ? "text-stone-400 font-light"
                        : "text-stone-600"
                    }`}
                  >
                    {column.rows === "deletedAt" ? (
                      item.deletedAt ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-600">
                          Inactive
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                          Active
                        </span>
                      )
                    ) : (
                      (item as any)[column.rows]
                    )}
                  </td>
                ))}
                {selectedRowIndex === index && (
                  <div
                    className={`fixed left-1/2 transform -translate-x-1/2 bg-white border-x border-t border-stone-200 rounded-t flex ${
                      confirmingRowDeletionIndex === index
                        ? "mt-[-54px]"
                        : "mt-[-38px]"
                    }`}
                  >
                    {item.deletedAt ? (
                      <button
                        className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24"
                        aria-label="Restore"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestoreClick(item);
                        }}
                      >
                        <ArrowPathIcon className="h-5 w-5 text-green-500" />
                        <span className="text-stone-600 text-xs my-auto">
                          Restore
                        </span>
                      </button>
                    ) : confirmingRowDeletionIndex === index ? (
                      <div className="flex gap-4 p-4">
                        <p className="text-stone-600 text-xs">
                          Are you sure you want to delete this item?
                        </p>
                        <div className="flex gap-2">
                          <XMarkIcon
                            className="h-5 w-5 text-stone-500 hover:text-stone-600 transition cursor-pointer my-auto"
                            onClick={() => setConfirmingRowDeletionIndex(null)}
                          />
                          <TrashIcon
                            className="h-5 w-5 text-rose-500 hover:text-rose-600 transition cursor-pointer my-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmDelete();
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24"
                          aria-label="Edit"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <PencilIcon className="h-5 w-5 text-blue-500" />
                          <span className="text-stone-600 text-xs my-auto">
                            Edit
                          </span>
                        </button>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24"
                          aria-label="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(item, index);
                          }}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                          <span className="text-stone-600 text-xs my-auto">
                            Delete
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;