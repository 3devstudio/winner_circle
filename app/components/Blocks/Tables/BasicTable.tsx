import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import Input from "~/components/Inputs/Input";
import Select from "~/components/Inputs/Select";
import Textarea from "~/components/Inputs/Textarea";
import { Tooltip } from "@mui/material";

interface Column {
  header: string;
  accessor: string;
  dataType?:
    | "text"
    | "tel"
    | "select"
    | "radio"
    | "checkbox"
    | "longText"
    | "date"
    | "number"
    | "email";
}

interface BasicTableProps<T> {
  columns: Column[];
  data: T[];
  onEdit: (id: string, accessor: string, value: any) => void;
  onUpdate: (id: string, updatedItem: T) => void;
  onDelete: (item: T) => void;
  onRestore: (item: T) => void;
}

const BasicTable = <T extends { id: string; deletedAt?: string | null }>({
  columns,
  data,
  onEdit,
  onUpdate,
  onDelete,
  onRestore,
}: BasicTableProps<T>) => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [confirmingRowDeletionId, setConfirmingRowDeletionId] = useState<string | null>(null);
  const [confirmingRowRestorationId, setConfirmingRowRestorationId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSwitchingFocus, setIsSwitchingFocus] = useState(false);
  const [rowActionState, setRowActionState] = useState<{ [key: string]: "edit" | "delete" | "restore" | null }>({});

  // Rendering
  const handleRowClick = (id: string) => {
    if (editingRowId !== null && editingRowId !== id) {
      if (!isDirty) {
        setEditingRowId(null);
        setRowActionState((prev) => ({ ...prev, [editingRowId]: null }));
      }
    }

    setSelectedRowId(selectedRowId === id ? null : id);
    setConfirmingRowDeletionId(null);
    setConfirmingRowRestorationId(null);
  };

  const renderCellValue = (column: Column, value: any) => {
    if (column.dataType === "checkbox") {
      return value ? (
        <CheckCircleIcon className="h-5 w-5 text-primary" />
      ) : (
        <MinusIcon className="h-5 w-5 text-gray-500" />
      );
    }
    return value;
  };

  // Edit Row
  const handleEditClick = (id: string) => {
    setEditingRowId(id);
    setIsDirty(false);
    setRowActionState((prev) => ({ ...prev, [id]: "edit" }));
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setIsDirty(false);
  };

  const handleSaveEdit = () => {
    if (editingRowId !== null) {
      const updatedItem = data.find((item) => item.id === editingRowId);
      if (updatedItem) {
        onUpdate(editingRowId, updatedItem);
      }
      setEditingRowId(null);
      setIsDirty(false);
    }
  };

  const renderInput = (
    dataType: Column["dataType"],
    value: any,
    accessor: string,
  ) => {
    const handleInputClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    switch (dataType) {
      case "text":
      case "tel":
      case "date":
        return (
          <Input
            type={dataType}
            value={dataType === "date" ? formatDateForInput(value) : value}
            onChange={(e) => handleInputChange(e, accessor, e.target.value)}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(editingRowId!)}
            onClick={handleInputClick}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            onSelect={(value) => handleInputChange(undefined, accessor, value)}
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
            ]}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(editingRowId!)}
            onClick={handleInputClick}
          />
        );
      case "longText":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(e, accessor, e.target.value)}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(editingRowId!)}
            onClick={handleInputClick}
          />
        );
      case "checkbox":
        return (
          <Input
            type="checkbox"
            checked={value} // Use `checked` instead of `value`
            onChange={(e) => handleInputChange(e, accessor, e.target.checked)}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(editingRowId!)}
            onClick={handleInputClick}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(e, accessor, e.target.value)}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus(editingRowId!)}
            onClick={handleInputClick}
          />
        );
      default:
        return (
          <Tooltip title="You cannot edit this cell.">
            <span>{value}</span>
          </Tooltip>
        );
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | undefined,
    accessor: string,
    newValue: any,
  ) => {
    if (editingRowId !== null) {
      setIsDirty(true);
      onEdit(editingRowId, accessor, newValue);
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    if (isSwitchingFocus) {
      setIsSwitchingFocus(false);
      return;
    }

    if (!isDirty) {
      setEditingRowId(null);
    }

    setEditingRowId(null);
    setIsDirty(false);
  };

  const handleInputFocus = (id: string) => {
    setIsSwitchingFocus(true);
    setEditingRowId(id);
  };

  // Delete Row
  const handleDeleteClick = (item: T, id: string) => {
    setItemToDelete(item);
    setConfirmingRowDeletionId(id);
    setConfirmingRowRestorationId(null);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setConfirmingRowDeletionId(null);
      setItemToDelete(null);
      setRowActionState((prev) => ({ ...prev, [selectedRowId!]: null }));
    }
  };

  const cancelDelete = () => {
    setConfirmingRowDeletionId(null);
    setItemToDelete(null);
  };

  // Restore Row
  const handleRestoreClick = (id: string) => {
    setConfirmingRowRestorationId(id);
    setConfirmingRowDeletionId(null);
  };

  const confirmRestore = () => {
    if (confirmingRowRestorationId !== null) {
      const itemToRestore = data.find((item) => item.id === confirmingRowRestorationId);
      if (itemToRestore) {
        onRestore(itemToRestore);
      }
      setConfirmingRowRestorationId(null);
      setRowActionState((prev) => ({
        ...prev,
        [confirmingRowRestorationId]: null,
      }));
    }
  };

  const cancelRestore = () => {
    setConfirmingRowRestorationId(null);
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
            data.map((item) => (
              <tr
                key={item.id}
                className={`cursor-pointer ${
                  editingRowId === item.id
                    ? "bg-blue-50"
                    : confirmingRowDeletionId === item.id
                    ? "bg-rose-50"
                    : confirmingRowRestorationId === item.id
                    ? "bg-emerald-50"
                    : selectedRowId === item.id
                    ? "bg-stone-100"
                    : "hover:bg-stone-50 transition"
                }`}
                onClick={() => handleRowClick(item.id)}
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      item.deletedAt
                        ? "text-stone-400 font-light"
                        : "text-stone-600"
                    }`}
                  >
                    {editingRowId === item.id
                      ? renderInput(
                          column.dataType,
                          (item as any)[column.accessor],
                          column.accessor,
                        )
                      : renderCellValue(column, (item as any)[column.accessor])}
                  </td>
                ))}
                {selectedRowId === item.id && (
                  <td
                    className={`fixed left-1/2 transform -translate-x-1/2 border-x border-t border-stone-200 rounded-t flex ${
                      editingRowId === item.id
                        ? "mt-[-38px] bg-blue-50"
                        : confirmingRowDeletionId === item.id
                        ? "mt-[-45px] bg-rose-50"
                        : confirmingRowRestorationId === item.id
                        ? "mt-[-45px] bg-emerald-50"
                        : "mt-[-38px] bg-stone-100"
                    }`}
                  >
                    {editingRowId === item.id ? (
                      <>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24"
                          aria-label="Cancel"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                        >
                          <XMarkIcon className="h-5 w-5 text-stone-500" />
                          <span className="text-stone-600 text-xs my-auto">
                            Cancel
                          </span>
                        </button>
                        <button
                          className={`p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24 ${
                            isDirty
                              ? "cursor-pointer"
                              : "cursor-not-allowed opacity-50"
                          }`}
                          aria-label="Save"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isDirty) handleSaveEdit();
                          }}
                          disabled={!isDirty}
                        >
                          <CheckIcon
                            className={`h-5 w-5 ${
                              isDirty ? "text-green-500" : "text-stone-400"
                            }`}
                          />
                          <span
                            className={`text-xs my-auto ${
                              isDirty ? "text-stone-600" : "text-stone-400"
                            }`}
                          >
                            Save
                          </span>
                        </button>
                      </>
                    ) : confirmingRowRestorationId === item.id ? (
                      <div className="p-2 flex justify-center gap-10">
                        <span className="text-xs text-emerald-600 font-semibold my-auto">
                          Confirm restore?
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="p-1 text-stone-600 hover:bg-stone-100 rounded-md transition"
                            aria-label="Cancel"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelRestore();
                            }}
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="p-1 text-stone-600 hover:text-emerald-600 hover:bg-emerald-100 rounded-md transition"
                            aria-label="Confirm"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmRestore();
                            }}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ) : confirmingRowDeletionId === item.id ? (
                      <div className="p-2 flex justify-center gap-10">
                        <span className="text-xs text-rose-600 font-semibold my-auto">
                          Confirm delete?
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="p-1 text-stone-600 hover:bg-stone-100 rounded-md transition"
                            aria-label="Cancel"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelDelete();
                            }}
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="p-1 text-stone-600 hover:text-rose-600 hover:bg-rose-100 rounded-md transition"
                            aria-label="Confirm"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmDelete();
                            }}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ) : item.deletedAt ? (
                      <button
                        className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24"
                        aria-label="Restore"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestoreClick(item.id);
                        }}
                      >
                        <ArrowPathIcon className="h-5 w-5 text-green-500" />
                        <span className="text-stone-600 text-xs my-auto">
                          Restore
                        </span>
                      </button>
                    ) : (
                      <>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-24"
                          aria-label="Edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(item.id);
                          }}
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
                            handleDeleteClick(item, item.id);
                          }}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                          <span className="text-stone-600 text-xs my-auto">
                            Delete
                          </span>
                        </button>
                      </>
                    )}
                  </td>
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