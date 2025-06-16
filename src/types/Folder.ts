// types/FileAttributes.ts

import { FileAttributes } from "./FileAttributes";


interface Collaborator {
	id: number;
	email: string;
	fullName: string;
	role: string;
	profileUrl?:string
}


export interface FolderAttibutes {
	uuid: string;
	name: string;
	ownerId: number;
	filesCount: number,
	collaborators: Collaborator[],
	parentId?: number;
	isShared: boolean;
	path?: string;
	files: FileAttributes[],
	isDeleted: boolean;
	deletedAt?: string | null;
	createdAt: string;
	updatedAt: string;
}


export interface FolderUploadedState {
	folder: number; // allows adding more keys in the future without TypeScript error
}