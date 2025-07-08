import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/components/common/BaseUrl';
import { Music, FileText, Download, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// enum fileType {
// 	image = "image",
// 	video = "video",
// 	document = "document",
// 	application = "application",
// 	audio = "audio",
// }

export default function PublicView() {
	const { fileId } = useParams<{ fileId: string }>();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("t") || "";

	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [fileType, setFileType] = useState("");
	const [fileName, setFileName] = useState("");
	const [loading, setLoading] = useState<boolean>(true);
	const [isPlaying, setIsPlaying] = useState(false);

	// const videoRef = useRef<HTMLVideoElement>(null);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getFileData = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					`${BASE_URL}/file/read-public-link/${fileId}?token=${token}`
				);
				// assume res.data.url contains the signed or public URL
				console.log("res.data ", res.data)
				setFileType(res.data?.data?.fileType)

				setFileName(res.data?.data?.fileName)
				setFileUrl(res.data?.data?.signedUrl)
				if (res.data?.data?.fileType === "document" || res.data?.data?.fileType === "application") {
					window.open(res.data?.data?.signedUrl)
				}
				// setVideoUrl(res.data.url);
			} catch (err: any) {
				console.error(err);
				setError(err.response?.data?.message || "Failed to load video");
			} finally {
				setLoading(false);
			}
		};

		if (fileId && token) {
			getFileData();
		} else {
			setError("Missing file ID or token");
			setLoading(false);
		}
	}, [fileId, token]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
				<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl">
					<CardContent className="p-8 flex flex-col items-center gap-4">
						<Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
						<div className="text-center">
							<h3 className="text-lg font-semibold mb-2">Loading your file...</h3>
							<p className="text-sm text-muted-foreground">Please wait while we prepare your content</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center p-4">
				<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-red-200 dark:border-red-800 shadow-xl max-w-md w-full">
					<CardContent className="p-8 text-center">
						<div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
							<ExternalLink className="h-8 w-8 text-red-600 dark:text-red-400" />
						</div>
						<h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
							Unable to Load File
						</h3>
						<p className="text-sm text-muted-foreground mb-4">{error}</p>
						<Button 
							variant="outline" 
							onClick={() => window.location.reload()}
							className="border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
						>
							Try Again
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
			{/* Header */}
			<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="17 8 12 3 7 8" />
									<line x1="12" y1="3" x2="12" y2="15" />
								</svg>
							</div>
							<div>
								<h1 className="text-xl font-bold">Cloudyfile</h1>
								<p className="text-xs text-muted-foreground">Shared File</p>
							</div>
						</div>
						
						{fileUrl && (
							<Button variant="outline" size="sm" asChild>
								<a href={fileUrl} download={fileName} target="_blank" rel="noopener noreferrer">
									<Download className="mr-2 h-4 w-4" />
									Download
								</a>
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-80px)]">
				{fileType === "image" && fileUrl ? (
					<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden max-w-6xl w-full">
						<CardContent className="p-0">
							<div className="bg-white/90 dark:bg-gray-900/90 p-4 border-b border-gray-200 dark:border-gray-800">
								<h2 className="font-semibold truncate">{fileName}</h2>
								<p className="text-sm text-muted-foreground">Image File</p>
							</div>
							<div className="p-4 bg-gray-50 dark:bg-gray-800/50">
								<img
									src={fileUrl}
									alt={fileName}
									className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-md"
								/>
							</div>
						</CardContent>
					</Card>
				) : fileType === "video" && fileUrl ? (
					<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden max-w-6xl w-full">
						<CardContent className="p-0">
							<div className="bg-white/90 dark:bg-gray-900/90 p-4 border-b border-gray-200 dark:border-gray-800">
								<h2 className="font-semibold truncate">{fileName}</h2>
								<p className="text-sm text-muted-foreground">Video File</p>
							</div>
							<div className="p-4 bg-black">
								<video
									src={fileUrl}
									className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
									controls
									autoPlay
									onPlay={() => setIsPlaying(true)}
									onPause={() => setIsPlaying(false)}
								/>
							</div>
						</CardContent>
					</Card>
				) : fileType === "audio" && fileUrl ? (
					<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl max-w-2xl w-full">
						<CardContent className="p-8">
							<div className="flex flex-col items-center gap-6">
								{/* Audio Icon */}
								<div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
									<Music className="w-12 h-12 text-white" />
								</div>

								{/* File Info */}
								<div className="text-center">
									<h2 className="text-xl font-semibold mb-2 truncate max-w-md">
										{fileName || 'Unknown audio'}
									</h2>
									<p className="text-sm text-muted-foreground">Audio File</p>
								</div>

								{/* Audio Player */}
								<div className="w-full max-w-md">
									<audio
										src={fileUrl}
										className="w-full rounded-lg shadow-md"
										controls
										onPlay={() => setIsPlaying(true)}
										onPause={() => setIsPlaying(false)}
									/>
								</div>

								{/* Playback Status */}
								<div className="flex items-center gap-2">
									<div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
									<p className="text-sm text-muted-foreground">
										{isPlaying ? 'Playing...' : 'Paused'}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				) : fileType === "application" && fileUrl ? (
					<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl max-w-md w-full">
						<CardContent className="p-8 text-center">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
								<FileText className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-lg font-semibold mb-2">Document Opened</h3>
							<p className="text-sm text-muted-foreground mb-4">
								The document has been opened in a new tab for viewing.
							</p>
							<div className="space-y-2">
								<p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">
									{fileName}
								</p>
								<Button variant="outline" size="sm" asChild>
									<a href={fileUrl} target="_blank" rel="noopener noreferrer">
										<ExternalLink className="mr-2 h-4 w-4" />
										Open Again
									</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				) : (
					<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-xl max-w-md w-full">
						<CardContent className="p-8 text-center">
							<div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
								<FileText className="h-8 w-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold mb-2">File Not Available</h3>
							<p className="text-sm text-muted-foreground">
								The requested file could not be displayed.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}