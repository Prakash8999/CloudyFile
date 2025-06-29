import { BASE_URL } from "@/components/common/BaseUrl";
import { PaginatedResponse, SharedFile, SharedFileFilters } from "@/types/ShareFiles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

// Hook
export const useSharedFiles = (initialFilters: SharedFileFilters = {}) => {
	const [files, setFiles] = useState<SharedFile[]>([]);
	const [meta, setMeta] = useState<PaginatedResponse<SharedFile>["meta"] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<SharedFileFilters>(initialFilters);
	const { token } = useAuth();

	const fetchFiles = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(`${BASE_URL}/share-file/get-shared-files`, {
				params: filters,
				headers: { "x-auth-token": `Bearer ${token}` },

			});
			console.log("Fetched shared files:", response.data);
			setFiles(response.data.data);
			setMeta(response.data.meta);
		} catch (err: any) {
			console.error("Failed to fetch shared files:", err?.response?.data || err.message);
			setError(err?.response?.data?.message || "Something went wrong");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchFiles();
	}, [filters]);

	return {
		files,
		meta,
		loading,
		error,
		filters,
		setFilters,
		refetch: fetchFiles,
	};
};