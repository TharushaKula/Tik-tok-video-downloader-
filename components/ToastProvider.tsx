"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      gutter={8}
      toastOptions={{
        duration: 3500,
        style: {
          background: "rgb(var(--c-raised))",
          color: "rgb(var(--c-ink-1))",
          border: "1px solid rgb(var(--c-veil) / 0.1)",
          borderRadius: "12px",
          fontSize: "13.5px",
          padding: "10px 14px",
          boxShadow: "0 8px 30px rgb(var(--c-veil) / 0.14)",
        },
        success: {
          iconTheme: {
            primary: "rgb(var(--c-ok))",
            secondary: "rgb(var(--c-raised))",
          },
        },
        error: {
          iconTheme: {
            primary: "rgb(var(--c-danger))",
            secondary: "rgb(var(--c-raised))",
          },
        },
      }}
    />
  );
}
