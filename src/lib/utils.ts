import { useFileStats } from '@/hooks/useFileData';
import { FileAttributes } from '@/types/FileAttributes';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/utils/fileUtils.ts

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  } else if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${bytes} Bytes`;
  }
}



export function dateFormat(date: string): string {
  return dayjs(date).format('MMMM D, YYYY HH:mm')
}

// type FileAttributes = {
//   fileType: string;
//   fileSize: number;
//   // add other props if needed
// };

export const fileTypeStorage = (files: FileAttributes[], fileType?: string): number => {
  if (!files || files.length === 0) return 0;

  const filteredFiles = fileType
    ? files.filter(file => file.fileType === fileType)
    : files;

  const totalSize = filteredFiles.reduce((total, file) => {
    return total + file.fileSize;
  }, 0);

  return totalSize;
};
