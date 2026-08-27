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
          background: "#15151c",
          color: "#e2e8f0",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          fontSize: "13.5px",
          padding: "10px 14px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.45)",
        },
        success: {
          iconTheme: { primary: "#34d399", secondary: "#15151c" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#15151c" },
        },
      }}
    />
  );
}
