import React from "react";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

type ToastAction =
  | "error"
  | "warning"
  | "success"
  | "info"
  | "muted"
  | undefined;

export const useGlobalToast = () => {
  const toast = useToast();
  const [toastId, setToastId] = React.useState<number | null>(null);

  const showNewToast = (title: string, desc?: string, action?: ToastAction) => {
    const newId = Math.random();
    setToastId(newId);

    toast.show({
      id: String(newId),
      placement: "top",
      duration: 2000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action={action} variant="solid">
            <ToastTitle className="text-lg underline">{title}</ToastTitle>
            {desc && <ToastDescription>{desc}</ToastDescription>}
          </Toast>
        );
      },
    });
  };

  const handleToast = (title: string, desc?: string, action?: ToastAction) => {
    // Only show a new toast if a toast with this toastId isn't already active
    if (toastId === null || !toast.isActive(String(toastId))) {
      showNewToast(title, desc, action);
    }
  };

  return { handleToast };
};
