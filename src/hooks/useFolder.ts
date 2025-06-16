import { FolderAttibutes } from "@/types/Folder";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { BASE_URL } from "@/components/common/BaseUrl";
import { toast } from "sonner";

const toQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
	.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
	.join("&");
};

export const useFolderDataGeneric = (filters: Record<string, any>) => {
  const [data, setData] = useState<FolderAttibutes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, uploadEvents} = useAuth();
  
  useEffect(() => {
	const fetchFiles = async () => {
	  try {
		setLoading(true);
		const queryString = toQueryString(filters);
		console.log(" filters", queryString);
		const response = await axios.get(`${BASE_URL}/folder/read?${queryString}`, {
		  headers: { "x-auth-token": `Bearer ${token}` },
		});
	console.log(response.data.data);
		setData(response.data.data);
	  } catch (error: any) {
		toast.error(error.response?.data?.message || "Failed to fetch file data");
	  } finally {
		setLoading(false);
	  }
	};

	fetchFiles();
  }, [JSON.stringify(filters), token, uploadEvents.folder]); // serialize filters for dependency tracking

  return { data, loading };
};
export const useFolderDataSingle = (uuid: string) => {
  const [data, setData] = useState<FolderAttibutes>();
  const [loading, setLoading] = useState<boolean>(true);
  const { token, uploadEvents} = useAuth();
  
  useEffect(() => {
	const fetchFiles = async () => {
	  try {
		setLoading(true);
		
		const response = await axios.get(`${BASE_URL}/folder/read/${uuid}`, {
		  headers: { "x-auth-token": `Bearer ${token}` },
		});
	console.log(response.data.data);
		setData(response.data.data);
	  } catch (error: any) {
		toast.error(error.response?.data?.message || "Failed to fetch file data");
	  } finally {
		setLoading(false);
	  }
	};

	fetchFiles();
  }, [ token, uploadEvents.folder]); // serialize filters for dependency tracking

  return { data, loading };
};