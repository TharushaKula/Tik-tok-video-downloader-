export interface DownloadOption {
  label: string;
  url: string;
  format: string;
  quality?: string;
  isAudio?: boolean;
  isProxy?: boolean;
}

export interface VideoInfo {
  platform: 'tiktok';
  title: string;
  author: string;
  authorAvatar?: string;
  thumbnail: string;
  duration?: number;
  downloads: DownloadOption[];
  stats?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  };
}
