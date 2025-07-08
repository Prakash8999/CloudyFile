import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	ArrowLeft,
	UploadCloud,
	MoreVertical,
	UserPlus,
	Folder as FolderIcon,
	Loader,
	Edit2
} from 'lucide-react';
import FileCard from '@/components/dashboard/FileCard';
import MediaViewer from '@/components/viewers/MediaViewer';
// import DocumentViewer from '@/components/viewers/DocumentViewer';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFolderDataSingle } from '@/hooks/useFolder';
import { dateFormat } from '@/lib/utils';
import axios from 'axios';
import { BASE_URL } from '@/components/common/BaseUrl';
import { useAuth } from '@/hooks/AuthProvider';
import UploadModal from '@/components/common/UploadModal';
import EditFolderModal from '@/components/common/EditFolderModal';

export default function FolderPage() {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
	// const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
	const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
	// const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
	const [uploadModalOpen, setUploadModalOpen] = useState(false);
	const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);

	const { token } = useAuth()

	if (!uuid) {
		return (
			<>
				<div>
					<h1>Something went wrong or Page not exist </h1>
				</div>
			</>
		)
	}

	const { data: folderData, loading } = useFolderDataSingle(uuid)

	if (!folderData) {
		return (
			<>
				<div>
					<h1>Folder does not exist</h1>
				</div>
			</>
		)
	}

	// Separate media files (images and videos) and documents
	// const mediaFiles = folderData.files.filter(file => file.fileType === 'image' || file.fileType === 'video').map(file => ({
	// 	id: file.id,
	// 	fileType: file.fileType as 'image' | 'video',
	// 	fileName: file.fileName,
	// 	thumbnailUrl: file.thumbnailUrl
	// }));


	const handleFileClick = (file: any, index: number) => {

		if (file.fileType === 'application' || file.fileType === 'document') {
			openUrl(file.id)
			return
		}



		if (file.fileType === 'image' || file.fileType === 'video' || file.fileType === 'audio') {
			setCurrentMediaIndex(index);
			setMediaViewerOpen(true);
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case 'admin':
				return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
			case 'write':
				return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
			case 'read':
				return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
			default:
				return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
		}
	};


	const getThumbnail = (fileType: string) => {
		if (fileType === 'image') {
			return "https://thumbnail-bucket-cloudyfile.s3.ap-south-1.amazonaws.com/uploads/generic/picture_12236741.png"
		}
		if (fileType === 'video') {
			return "https://thumbnail-bucket-cloudyfile.s3.ap-south-1.amazonaws.com/uploads/generic/5617bgr.jpg"
		}

	}


	const getFileUrlById = async (fileId: number): Promise<string> => {

		const response = await axios.get(`${BASE_URL}/file/read/${fileId}`, {
			headers: { "x-auth-token": `Bearer ${token}` },
		});
		const fileUrl = response.data?.data
		return fileUrl;
	};




	const openUrl = async (fileId: number) => {
		// event.preventDefault(); // Stop default anchor behavior

		try {
			const url = await getFileUrlById(fileId);
			window.open(url, '_blank'); // Open the signed URL in a new tab
		} catch (err) {
			console.error('Failed to fetch file URL:', err);
		}
	};



	return (


		<DashboardLayout title={folderData?.name}>
			<div className="space-y-6">


				{loading && <Loader className='animate-spin' />}


				<Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => navigate('/dashboard')}
									className="flex items-center gap-2"
								>
									<ArrowLeft className="h-4 w-4" />
									Back to Dashboard
								</Button>
								<div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
										<FolderIcon className="h-6 w-6 text-purple-500 dark:text-purple-400" />
									</div>
									<div>
										<CardTitle className="text-xl">{folderData.name}</CardTitle>
										<CardDescription>
											{folderData?.files?.length} files • Created {dateFormat(folderData.createdAt)} • Last modified {dateFormat(folderData.updatedAt)}
										</CardDescription>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" onClick={() => setUploadModalOpen(true)}>
									<UploadCloud className="mr-2 h-4 w-4" />
									Upload
								</Button>
								<Button variant="outline" size="sm">
									<UserPlus className="mr-2 h-4 w-4" />
									Invite
								</Button>
								<Button variant="outline" size="sm"               onClick={() => setCreateFolderModalOpen(true)}>
									<Edit2 className="mr-2 h-4 w-4" />
									Edit
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{/* <DropdownMenuItem>
											<Settings className="mr-2 h-4 w-4" />
											Folder Settings
										</DropdownMenuItem> */}
										<DropdownMenuItem>
											Share Folder
										</DropdownMenuItem>
										<DropdownMenuItem className="text-red-600">
											Delete Folder
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</CardHeader>
				</Card>

				{
					folderData?.isShared &&


					<Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="text-lg">Collaborators ({folderData.collaborators.length})</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-4">
								{folderData.collaborators.map((collaborator) => (
									<div key={collaborator.id} className="flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
										<Avatar className="h-10 w-10">
											<AvatarImage src={collaborator.profileUrl} />
											<AvatarFallback>
												{collaborator.fullName.split(' ').map(n => n[0]).join('')}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium text-sm">{collaborator.fullName}</p>
											<p className="text-xs text-muted-foreground">{collaborator.email}</p>
										</div>
										<Badge variant="outline" className={getRoleColor('admin')}>
											{collaborator.role}
										</Badge>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				}
				{/* Files */}
				<Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg">
					<CardHeader>
						<CardTitle>Files in this folder</CardTitle>
						<CardDescription>
							{folderData?.files.length} files total
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{folderData?.files.map((file, index) => (
								<FileCard
									fileId={file.id}
									type={file.fileType as 'audio' | 'application' | 'image' | 'video'}
									key={file.id}
									title={file.fileName}
									thumbnail={file.thumbnailUrl ? file.thumbnailUrl : getThumbnail(file.fileType)}
									isFavorite={file.isFavorite ? file.isFavorite : false}
									onClick={() => handleFileClick(file, index)}
								/>
							))}
						</div>
					</CardContent>
				</Card>
				<UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} folderUuid={folderData.uuid} />

				<EditFolderModal
					open={createFolderModalOpen}
					onOpenChange={setCreateFolderModalOpen}
					folderData={folderData}
				/>
			</div>

			{mediaViewerOpen &&

				<MediaViewer
					open={mediaViewerOpen}
					onOpenChange={setMediaViewerOpen}
					files={folderData.files || []}
					currentIndex={currentMediaIndex}
					onIndexChange={setCurrentMediaIndex}
				/>
			}




		</DashboardLayout>
	);
}