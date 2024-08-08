// SuccessMessage.tsx
import React, { useEffect } from 'react';

interface SuccessMessageProps {
  message: string | null;
  clearMessage: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, clearMessage }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-200 rounded-md">
      {message}
    </div>
  );
};

export default SuccessMessage;