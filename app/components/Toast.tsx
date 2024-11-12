import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Nasconde il toast dopo 3 secondi
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`fixed bottom-[80px] right-1 p-4 rounded-lg shadow-lg text-white w-80 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white font-bold">
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
