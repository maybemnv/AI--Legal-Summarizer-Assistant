import { useState, useEffect } from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
};

type ToastContextType = {
  toasts: Toast[];
  toast: (options: { title?: string; description?: string; duration?: number }) => void;
  dismissToast: (id: string) => void;
};

// Create a simple toast context without using shadcn's useToast hook
export function useToast(): ToastContextType {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, duration = 4000 }: { title?: string; description?: string; duration?: number }) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { id, title, description, duration };
    
    setToasts((prev) => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter(toast => toast.id !== id));
  };

  // Auto dismiss toasts after their duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    toasts.forEach((toast) => {
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          dismissToast(toast.id);
        }, toast.duration);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts]);

  return { toasts, toast, dismissToast };
}