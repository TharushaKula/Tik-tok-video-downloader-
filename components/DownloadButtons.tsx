"use client";

import { motion } from "framer-motion";
import { Download, Music } from "lucide-react";
import toast from "react-hot-toast";

interface DownloadButtonsProps {
  hdUrl: string;
  musicUrl: string;
}

function triggerProxyDownload(url: string, type: "video" | "audio") {
  const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&type=${type}`;
  const a = document.createElement("a");
  a.href = proxyUrl;
  a.download = type === "audio" ? "tiktok-audio.mp3" : "tiktok-video.mp4";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function DownloadButtons({ hdUrl, musicUrl }: DownloadButtonsProps) {
  function handleHD() {
    try {
      triggerProxyDownload(hdUrl, "video");
      toast.success("HD video download started!");
    } catch {
      toast.error("Failed to start download");
    }
  }

  function handleAudio() {
    try {
      triggerProxyDownload(musicUrl, "audio");
      toast.success("Audio download started!");
    } catch {
      toast.error("Failed to start download");
    }
  }

  return (
    <div className="flex gap-3 w-full flex-wrap">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleHD}
        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl
          bg-gradient-to-r from-violet-600 to-purple-600
          hover:from-violet-500 hover:to-purple-500
          text-white font-semibold text-sm shadow-lg shadow-violet-900/40 transition-all"
      >
        <Download size={16} />
        Download HD
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleAudio}
        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl
          bg-gradient-to-r from-fuchsia-700 to-pink-700
          hover:from-fuchsia-600 hover:to-pink-600
          text-white font-semibold text-sm shadow-lg shadow-fuchsia-900/40 transition-all"
      >
        <Music size={16} />
        Download MP3
      </motion.button>
    </div>
  );
}
