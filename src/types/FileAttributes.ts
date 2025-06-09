// types/FileAttributes.ts

export interface FileAttributes {
 id: number;
  userId: number;
  fileName: string;
  fileUid: string;
  dimensions?: string | null;
  thumbnailUrl?: string | null;
  thumbnailKey?: string | null;
  s3Key: string;
  fileSize: number;
  fileType: string;
  fileExtension: string;
  isArchived: boolean;
  isFavorite?: boolean | null;
  isDeleted: boolean;
  deletedAt?: string | null;
  mimeType?: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: string[] | null;
  caption?: string | null;
  embeddingVector?: string | null;
}


export interface FileUploadedState {
  file: number; // allows adding more keys in the future without TypeScript error
}