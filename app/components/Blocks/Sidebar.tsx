// Sidebar.tsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SidebarProps {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
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
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById("portal-root");
    if (element) {
      setPortalElement(element);
    }
  }, []);

  if (!portalElement) return null;

  return createPortal(
    <div
      className={`fixed top-0 right-0 h-full flex flex-col w-full md:w-[35rem] bg-white shadow-lg z-50 transform ${
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
      <div className="flex-none p-4 border-t border-gray-200 sticky bottom-0 bg-white">
        {footer}
      </div>
    </div>,
    portalElement
  );
};

export default Sidebar;