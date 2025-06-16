import { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
	FolderPlus,
	FileImage,
	FileVideo,
	FileText,
	Music,
	UserPlus,
	X,
	Check
} from 'lucide-react';
import { toast } from 'sonner';
import { useFileDataGeneric } from '@/hooks/useFileData';
import { formatFileSize } from '@/lib/utils';
import { FileAttributes } from '@/types/FileAttributes';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import { useAuth } from '@/hooks/AuthProvider';

interface CreateFolderModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

interface FileItem {
	id: string;
	name: string;
	type: 'image' | 'video' | 'document' | 'audio';
	thumbnail?: string;
	size: string;
}

interface Collaborator {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	role: 'read' | 'write' | 'admin';
}

export default function CreateFolderModal({ open, onOpenChange }: CreateFolderModalProps) {
	const [folderName, setFolderName] = useState('');
	const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
	const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
	const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	// const [availableFiles , setFiles] = useState<FileAttributes[]> ([])

	// Mock files data
	//   const availableFiles: FileItem[] = [
	//     {
	//       id: '1',
	//       name: 'Jerusalem.jpg',
	//       type: 'image',
	//       thumbnail: 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
	//       size: '2.4 MB'
	//     },
	//     {
	//       id: '2',
	//       name: 'Barcelona.jpg',
	//       type: 'image',
	//       thumbnail: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
	//       size: '3.1 MB'
	//     },
	//     {
	//       id: '3',
	//       name: 'Project Proposal.pdf',
	//       type: 'document',
	//       size: '1.8 MB'
	//     },
	//     {
	//       id: '4',
	//       name: 'Barcelona Trip.mp4',
	//       type: 'video',
	//       thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
	//       size: '45.2 MB'
	//     },
	//     {
	//       id: '5',
	//       name: 'Meeting Recording.mp3',
	//       type: 'audio',
	//       size: '12.5 MB'
	//     },
	//     {
	//       id: '6',
	//       name: 'Financial Report.pdf',
	//       type: 'document',
	//       size: '2.1 MB'
	//     }
	//   ];
	// useEffect(() => {

	// 	const { data: availableFiles } = useFileDataGeneric({ "isDeleted": false, "isArchived": false}, open)
	// 	setFiles(availableFiles)
	// }, [open])
	const { data: availableFiles } = useFileDataGeneric({ "isDeleted": false, "isArchived": false }, open)
	const { token } = useAuth()
	console.log("open ", open);
	const getFileIcon = (type: string) => {
		switch (type) {
			case 'image':
				return <FileImage className="h-4 w-4 text-purple-500" />;
			case 'video':
				return <FileVideo className="h-4 w-4 text-blue-500" />;
			case 'document':
				return <FileText className="h-4 w-4 text-orange-500" />;
			case 'audio':
				return <Music className="h-4 w-4 text-pink-500" />;
			default:
				return <FileText className="h-4 w-4 text-gray-500" />;
		}
	};

	const toggleFileSelection = (fileId: string) => {
		setSelectedFiles(prev =>
			prev.includes(fileId)
				? prev.filter(id => id !== fileId)
				: [...prev, fileId]
		);
	};

	const addCollaborator = () => {
		if (!newCollaboratorEmail) {
			toast.error('Please enter an email address');
			return;
		}

		const newCollaborator: Collaborator = {
			id: Date.now().toString(),
			name: newCollaboratorEmail.split('@')[0],
			email: newCollaboratorEmail,
			role: 'read'
		};

		setCollaborators(prev => [...prev, newCollaborator]);
		setNewCollaboratorEmail('');
		toast.success('Collaborator added successfully');
	};

	const updateCollaboratorRole = (collaboratorId: string, role: 'read' | 'write' | 'admin') => {
		setCollaborators(prev =>
			prev.map(collab =>
				collab.id === collaboratorId ? { ...collab, role } : collab
			)
		);
	};

	const removeCollaborator = (collaboratorId: string) => {
		setCollaborators(prev => prev.filter(collab => collab.id !== collaboratorId));
	};

	const { triggerUploadEvent } = useAuth()

	const handleCreateFolder = async () => {
		if (!folderName.trim()) {
			toast.error('Please enter a folder name');
			return;
		}

		setIsCreating(true);
		try {
			const insertResponse = await axios.post(`${BASE_URL}/folder/insert`, {
				name: folderName,
				fileIds: selectedFiles.map(Number),

			}, {
				headers: {
					'Content-Type': 'application/json',
					"x-auth-token": `Bearer ${token}`
				}
			})
			setIsCreating(false);
			toast.success(`Folder "${folderName}" created successfully ${selectedFiles && selectedFiles.length > 0 ? "with " + selectedFiles.length + " files." : "."}   `);
			setFolderName('');
			triggerUploadEvent('folder')
			console.log("insert Response", insertResponse);
			setSelectedFiles([]);
			onOpenChange(false);

		} catch (error: any) {
			console.log(error);
			setIsCreating(false);
			toast.error(error.message);

		}

	};






	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FolderPlus className="h-5 w-5" />
						Create New Folder
					</DialogTitle>
					<DialogDescription>
						Create a new folder, add files, and invite collaborators to work together.
					</DialogDescription>
				</DialogHeader>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
					{/* Left Side - Folder Details */}
					<div className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="folderName">Folder Name</Label>
							<Input
								id="folderName"
								placeholder="Enter folder name..."
								value={folderName}
								onChange={(e) => setFolderName(e.target.value)}
							/>
						</div>

						<div className="space-y-4">
							<Label>Collaborators</Label>

							<div className="flex gap-2">
								<Input
									placeholder="Enter email address..."
									value={newCollaboratorEmail}
									onChange={(e) => setNewCollaboratorEmail(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
								/>
								<Button onClick={addCollaborator} size="sm">
									<UserPlus className="h-4 w-4" />
								</Button>
							</div>

							{collaborators.length > 0 && (
								<ScrollArea className="h-40 border rounded-lg p-3">
									<div className="space-y-3">
										{collaborators.map((collaborator) => (
											<div key={collaborator.id} className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<Avatar className="h-8 w-8">
														<AvatarImage src={collaborator.avatar} />
														<AvatarFallback className="text-xs">
															{collaborator.name.charAt(0).toUpperCase()}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="text-sm font-medium">{collaborator.name}</p>
														<p className="text-xs text-muted-foreground">{collaborator.email}</p>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<Select
														value={collaborator.role}
														onValueChange={(role: 'read' | 'write' | 'admin') =>
															updateCollaboratorRole(collaborator.id, role)
														}
													>
														<SelectTrigger className="w-24 h-8">
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="read">Read</SelectItem>
															<SelectItem value="write">Write</SelectItem>
															<SelectItem value="admin">Admin</SelectItem>
														</SelectContent>
													</Select>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => removeCollaborator(collaborator.id)}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
											</div>
										))}
									</div>
								</ScrollArea>
							)}
						</div>
					</div>

					{/* Right Side - File Selection */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label>Select Files ({selectedFiles.length} selected)</Label>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setSelectedFiles([])}
								disabled={selectedFiles.length === 0}
							>
								Clear All
							</Button>
						</div>

						<ScrollArea className="h-80 border rounded-lg p-3">
							<div className="space-y-2 p-2">
								{availableFiles.map((file) => (
									<Card
										key={file.id}
										className={`cursor-pointer transition-all ${selectedFiles.includes(file.id.toString())
											? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/30'
											: 'hover:bg-gray-50 dark:hover:bg-gray-800'
											}`}
										onClick={() => toggleFileSelection(file.id.toString())}
									>
										<CardContent className="p-3">
											<div className="flex items-center gap-3">
												<div className="relative">
													{file.thumbnailUrl ? (
														<img
															src={file.thumbnailUrl}
															alt={file.fileName}
															className="w-12 h-12 object-cover rounded"
														/>
													) : (
														<div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
															{getFileIcon(file.fileType)}
														</div>
													)}
													{selectedFiles.includes(file.id.toString()) && (
														<div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
															<Check className="h-3 w-3 text-white" />
														</div>
													)}
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium truncate">{file.fileName}</p>
													<p className="text-xs text-muted-foreground">{formatFileSize(file.fileSize)}</p>
												</div>
												<Badge variant="outline" className="text-xs">
													{file.fileType}
												</Badge>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>

				<Separator />

				<div className="flex justify-between items-center">
					<div className="text-sm text-muted-foreground">
						{selectedFiles.length} files selected • {collaborators.length} collaborators
					</div>
					<div className="flex gap-2">
						<Button variant="outline" onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button
							onClick={handleCreateFolder}
							disabled={isCreating || !folderName.trim()}
						>
							{isCreating ? 'Creating...' : 'Create Folder'}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}