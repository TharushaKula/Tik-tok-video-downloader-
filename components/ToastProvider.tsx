"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#1a1a2e",
          color: "#e2e8f0",
          border: "1px solid rgba(139, 92, 246, 0.4)",
          borderRadius: "12px",
          fontSize: "14px",
          padding: "12px 16px",
        },
        success: {
          iconTheme: { primary: "#a78bfa", secondary: "#1a1a2e" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#1a1a2e" },
        },
      }}
    />
  );
}
