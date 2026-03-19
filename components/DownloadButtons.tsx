"use client";

import { motion } from "framer-motion";
import { Download, Music } from "lucide-react";
import toast from "react-hot-toast";

interface DownloadButtonsProps {
  hdUrl: string;
  musicUrl: string;
  platform: "tiktok" | "youtube";
}

function triggerProxyDownload(
  url: string,
  type: "video" | "audio",
  platform: "tiktok" | "youtube"
) {
  const isYT = platform === "youtube";
  const params = new URLSearchParams({ url, type });
  if (isYT) params.set("platform", "youtube");

  const proxyUrl = `/api/proxy-download?${params.toString()}`;
  const filename =
    type === "audio"
      ? isYT
        ? "youtube-audio.m4a"
        : "tiktok-audio.mp3"
      : isYT
        ? "youtube-video.mp4"
        : "tiktok-video.mp4";

  const a = document.createElement("a");
  a.href = proxyUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function DownloadButtons({
  hdUrl,
  musicUrl,
  platform,
}: DownloadButtonsProps) {
  const isYT = platform === "youtube";

  function handleHD() {
    try {
      triggerProxyDownload(hdUrl, "video", platform);
      toast.success("Video download started!");
    } catch {
      toast.error("Failed to start download");
    }
  }

  function handleAudio() {
    try {
      triggerProxyDownload(musicUrl, "audio", platform);
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
        {isYT ? "Download Audio" : "Download MP3"}
      </motion.button>
    </div>
  );
}
