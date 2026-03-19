"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4 py-8"
    >
      <div className="relative w-16 h-16">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-fuchsia-500 border-l-fuchsia-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-violet-300 text-sm tracking-wide animate-pulse">
        Fetching video info…
      </p>
    </motion.div>
  );
}
