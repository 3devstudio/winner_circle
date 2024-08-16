import React, { useEffect } from "react";

interface ResponseMessageProps {
  message: string | null;
  clearMessage: () => void;
  type?: "success" | "error" | "info" | "warning";
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({
  message,
  clearMessage,
  type = "success",
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!message) return null;

  const getMessageStyle = () => {
    switch (type) {
      case "success":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "error":
        return "text-rose-600 bg-rose-50 border-rose-200";
      case "info":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200";
      default:
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
    }
  };

  return (
    <div className={`mb-4 p-4 border rounded-lg text-xs ${getMessageStyle()}`}>
      {message}
    </div>
  );
};

export default ResponseMessage;
