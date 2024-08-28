import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode; // New prop for footer
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  content,
  footer,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full flex flex-col w-full md:w-[35rem] bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex-none">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close Sidebar">
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      {/* Sidebar Content Area */}
      <div className="overflow-y-auto flex-1">{content}</div>
      {/* Sidebar Footer Area */}
      <div className="flex-none p-4 border-t border-gray-200 flex justify-end gap-2 sticky bottom-0 bg-white">
        {footer}
      </div>
    </div>
  );
};

export default Sidebar;
