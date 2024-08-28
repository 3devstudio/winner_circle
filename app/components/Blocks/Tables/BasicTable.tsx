import { useState, useEffect } from "react";
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
import Button from "~/components/Buttons/Button";
import { Tooltip } from "@mui/material";
import Sidebar from "~/components/Blocks/Sidebar";
import AddHorse from "~/components/Pages/Frontend/Home/AddHorse";
import { toast } from 'react-toastify';

// Define the interface for a column in the table.
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
    | "email"
    | "modal";
}

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
}

// Define the properties for the BasicTable component.
interface BasicTableProps<T> {
  columns: Column[];
  data: T[];
  onEdit: (id: string, accessor: string, value: any) => void;
  onUpdate: (id: string, updatedItem: T) => void;
  onDelete: (item: T) => void;
  onRestore: (item: T) => void;
}

interface TableRow {
  id: string;
  deletedAt?: string | null;
  originalHorses?: Horse[];
}

// The BasicTable component.
const BasicTable = <T extends TableRow>({
  columns,
  data,
  onEdit,
  onUpdate,
  onDelete,
  onRestore,
}: BasicTableProps<T>) => {
  // State for handling various actions.
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [confirmingRowDeletionId, setConfirmingRowDeletionId] = useState<string | null>(null);
  const [confirmingRowRestorationId, setConfirmingRowRestorationId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [rowActionState, setRowActionState] = useState<{ [key: string]: "edit" | "delete" | "restore" | null }>({});

  // States to hold the current editing item data and initial data for comparison
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [initialEditingItem, setInitialEditingItem] = useState<T | null>(null);

  // Function to render the cell value.
  const renderCellValue = (column: Column, value: any) => {
    if (column.accessor === "deletedAt") {
      return value ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-600">
          Inactive
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">
          Active
        </span>
      );
    }

    if (column.dataType === "checkbox") {
      return value ? (
        <CheckCircleIcon className="h-5 w-5 text-primary" />
      ) : (
        <MinusIcon className="h-5 w-5 text-gray-500" />
      );
    }
    return value;
  };

  // Handle row click to set selected row ID
  const handleRowClick = (id: string) => {
    setSelectedRowId(selectedRowId === id ? null : id);
  };

  // Handle the Edit button click.
  const handleEditClick = (id: string) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setEditingItem({ ...item } as T); // Type assertion for editing
      setInitialEditingItem({ ...item } as T); // Type assertion for comparison
      setEditingRowId(id);
      setIsSidebarOpen(true);
      setIsDirty(false);
      setRowActionState((prev) => ({ ...prev, [id]: "edit" }));
    }
  };

  // Handle the Save button click in the sidebar.
  const handleSaveEdit = async () => {
    if (editingRowId !== null && editingItem !== null) {
      try {
        await onUpdate(editingRowId, editingItem); // Assuming onUpdate returns a promise
        setEditingRowId(null);
        setIsSidebarOpen(false); // Close the sidebar
        setIsDirty(false);
      } catch (error) {
        // Handle error
        console.error("Failed to save changes", error);
      }
    }
  };

  // Function to update the local editing item state and check if data is dirty
  const handleEditChange = (accessor: string, value: any) => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        [accessor]: value,
      };
      setEditingItem(updatedItem);
      setIsDirty(!isEqual(updatedItem, initialEditingItem!));
    }
  };

  // Utility function to check if two objects are equal
  const isEqual = (obj1: T, obj2: T) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  // Function to handle changes from the AddHorse component
  const handleHorseChange = (updatedHorses: Horse[]) => {
    handleEditChange('originalHorses', updatedHorses); // Update the horses in the local editing item state
  };

  // Function to confirm deletion
  const confirmDelete = (item: T) => {
    setConfirmingRowDeletionId(item.id);
    setItemToDelete(item);
  };

  // Function to execute delete action
  const handleDelete = (item: T) => {
    onDelete(item);
    setConfirmingRowDeletionId(null);
    setItemToDelete(null);
    toast.success("Row deleted successfully.");
  };

  // Function to confirm restoration
  const confirmRestore = (item: T) => {
    setConfirmingRowRestorationId(item.id);
  };

  // Function to execute restore action
  const handleRestore = (item: T) => {
    onRestore(item);
    setConfirmingRowRestorationId(null);
    setSelectedRowId(null);
    toast.success("Row restored successfully.");
};

  // Function to render inputs based on the column data type.
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
  
    if (accessor === 'horses') {
      const horsesArray = Array.isArray(value) ? value : (editingItem?.originalHorses || []);
      return (
        <AddHorse
          horses={horsesArray}
          onAddHorse={handleHorseChange}
          errors={{}}
        />
      );
    }

    switch (dataType) {
      case "text":
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleEditChange(accessor, e.target.value)}
            onClick={handleInputClick}
          />
        );
      case "email":
        return (
          <Input
            type="email"
            value={value}
            onChange={(e) => handleEditChange(accessor, e.target.value)}
            onClick={handleInputClick}
          />
        );
      case "tel":
        return (
          <Input
            type="tel"
            value={value}
            onChange={(e) => handleEditChange(accessor, e.target.value)}
            onClick={handleInputClick}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={formatDateForInput(value)}
            onChange={(e) => handleEditChange(accessor, e.target.value)}
            onClick={handleInputClick}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            onSelect={(value) => handleEditChange(accessor, value)}
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
            ]}
            onClick={handleInputClick}
          />
        );
      case "longText":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleEditChange(accessor, e.target.value)}
            onClick={handleInputClick}
          />
        );
      case "checkbox":
        return (
          <Input
            type="checkbox"
            checked={value}
            onChange={(e) => handleEditChange(accessor, e.target.checked)}
            onClick={handleInputClick}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleEditChange(accessor, e.target.value)}
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

  // Render inputs for editing.
  const renderEditForm = (item: T) => (
    <div className="p-4">
      {columns.map((column) => (
        <div key={column.accessor} className="mb-4 overflow-auto max-h-full">
          <div className="p-1">
            <label className="block text-sm font-medium text-gray-700">
              {column.header}
            </label>
            {renderInput(
              column.dataType,
              (item as any)[column.accessor],
              column.accessor,
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Render footer buttons for the sidebar
  const renderSidebarFooter = () => (
    <>
      <Button onClick={() => setIsSidebarOpen(false)} className="py-2">
        Cancel
      </Button>
      <Button
        primary
        onClick={handleSaveEdit}
        disabled={!isDirty}
        className="py-2"
      >
        Save
      </Button>
    </>
  );

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full divide-y divide-stone-200 border border-stone-200">
        {/* Render table headers */}
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
        {/* Render table body */}
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
                {/* Render table cells */}
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      item.deletedAt
                        ? "text-stone-400 font-light"
                        : "text-stone-600"
                    }`}
                  >
                    {renderCellValue(column, (item as any)[column.accessor])}
                  </td>
                ))}
                {/* Render action buttons */}
                {selectedRowId === item.id && (
                  <td className="fixed left-1/2 transform -translate-x-1/2 border-x border-t border-stone-200 rounded-t flex mt-[-38px] bg-stone-100">
                    {confirmingRowDeletionId === item.id ? (
                      <>
                        <span className="text-stone-600 text-xs my-auto px-2">
                          Are you sure you want to delete?
                        </span>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-10"
                          aria-label="Cancel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmingRowDeletionId(null);
                          }}
                        >
                          <XMarkIcon className="h-5 w-5 text-gray-500" />
                        </button>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-10"
                          aria-label="Confirm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item);
                          }}
                        >
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        </button>
                      </>
                    ) : confirmingRowRestorationId === item.id ? (
                      <>
                        <span className="text-stone-600 text-xs my-auto px-2">
                          Are you sure you want to restore?
                        </span>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-10"
                          aria-label="Cancel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmingRowRestorationId(null);
                          }}
                        >
                          <XMarkIcon className="h-5 w-5 text-gray-500" />
                        </button>
                        <button
                          className="p-2 flex justify-center gap-1 hover:bg-stone-100 transition w-10"
                          aria-label="Confirm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(item);
                          }}
                        >
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        </button>
                      </>
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
                          <span className="text-stone-600 text-xs my-auto">Edit</span>
                        </button>
                        {item.deletedAt ? (
                          <button
                            className="p-2 flex justify-center gap-1 hover:bg-emerald-100 transition w-24"
                            aria-label="Restore"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmRestore(item);
                            }}
                          >
                            <ArrowPathIcon className="h-5 w-5 text-emerald-500" />
                            <span className="text-stone-600 text-xs my-auto">
                              Restore
                            </span>
                          </button>
                        ) : (
                          <button
                            className="p-2 flex justify-center gap-1 hover:bg-rose-100 transition w-24"
                            aria-label="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmDelete(item);
                            }}
                          >
                            <TrashIcon className="h-5 w-5 text-rose-500" />
                            <span className="text-stone-600 text-xs my-auto">
                              Delete
                            </span>
                          </button>
                        )}
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Sidebar component for editing */}
      {editingRowId && (
        <Sidebar
          title="Edit Row"
          content={renderEditForm(editingItem!)} // Pass the local editing item
          footer={renderSidebarFooter()} // Pass the footer content
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default BasicTable;