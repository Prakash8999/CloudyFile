import { FileAttributes } from "./FileAttributes";

export interface SharedFile {
  id: number;
  fileId: number;
  sharedWithUserId: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  FileAttribute: FileAttributes;
  owner: {
    id: number;
    fullName: string;
    email: string;
    profileUrl: string;
  };
}

export interface SharedFileFilters {
  rawStart?: string; // ISO string or yyyy-mm-dd
  rawEnd?: string;   // ISO string or yyyy-mm-dd
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
  matchMode?: "and" | "or";
  [key: string]: any; // other filters like role, fileId etc.
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total_count: number;
    page: number;
    total_pages: number;
    limit: number;
  };
}