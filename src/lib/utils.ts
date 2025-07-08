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
export const fileTypeLength = (files: FileAttributes[], fileType?: string): number => {
  if (!files || files.length === 0) return 0;

  const filteredFiles = fileType
    ? files.filter(file => file.fileType === fileType)
    : files;

  const totalLength = filteredFiles.length;

  return totalLength;
};





export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const calculateStorageUsage = (files: FileAttributes[]) => {
  if (!files || !Array.isArray(files)) return { used: 0, total: 5 * 1024 * 1024 * 1024 }; // 5GB default
  
  const totalUsed = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);
  const totalStorage = 5 * 1024 * 1024 * 1024; // 5GB in bytes
  
  return {
    used: totalUsed,
    total: totalStorage,
    percentage: (totalUsed / totalStorage) * 100
  };
};

export const groupFilesByMonth = (files: any[]) => {
  if (!files || !Array.isArray(files)) return [];
  
  const monthlyData: { [key: string]: { uploads: number, month: string, year: number } } = {};
  
  files.forEach(file => {
    const date = new Date(file.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        uploads: 0,
        month: monthName,
        year: date.getFullYear()
      };
    }
    
    monthlyData[monthKey].uploads++;
  });
  
  return Object.values(monthlyData).sort((a, b) => {
    const aDate = new Date(a.year, 0);
    const bDate = new Date(b.year, 0);
    return aDate.getTime() - bDate.getTime();
  });
};

export const groupFilesByYear = (files: any[]) => {
  if (!files || !Array.isArray(files)) return [];
  
  const yearlyData: { [key: string]: { uploads: number, year: number } } = {};
  
  files.forEach(file => {
    const date = new Date(file.createdAt);
    const year = date.getFullYear();
    
    if (!yearlyData[year]) {
      yearlyData[year] = {
        uploads: 0,
        year: year
      };
    }
    
    yearlyData[year].uploads++;
  });
  
  return Object.values(yearlyData).sort((a, b) => a.year - b.year);
};

export const getWeeklyActivity = (files: any[]) => {
  if (!files || !Array.isArray(files)) return [];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = weekDays.map(day => ({
    name: day,
    uploads: 0,
    downloads: 0, // This would need to come from a separate API
    shares: 0     // This would need to come from a separate API
  }));
  
  // Get files from the last 7 days
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  files.forEach(file => {
    const fileDate = new Date(file.createdAt);
    if (fileDate >= lastWeek) {
      const dayIndex = fileDate.getDay();
      weeklyData[dayIndex].uploads++;
    }
  });
  
  return weeklyData;
};

export const getStorageByFileType = (files: any[]) => {
  if (!files || !Array.isArray(files)) return [];
  
  const typeData: { [key: string]: { size: number, count: number } } = {};
  
  files.forEach(file => {
    const type = file.fileType || 'other';
    if (!typeData[type]) {
      typeData[type] = { size: 0, count: 0 };
    }
    typeData[type].size += file.fileSize || 0;
    typeData[type].count++;
  });
  
  return Object.entries(typeData).map(([type, data]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    size: data.size,
    count: data.count,
    sizeFormatted: formatBytes(data.size)
  }));
};

export const getRecentActivity = (files: any[]) => {
  if (!files || !Array.isArray(files)) return [];
  
  return files
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
    .map(file => ({
      id: file.id,
      fileName: file.fileName,
      fileType: file.fileType,
      createdAt: file.createdAt,
      fileSize: file.fileSize,
      action: 'uploaded'
    }));
};
