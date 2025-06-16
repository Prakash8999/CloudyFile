// src/hooks/useFileData.ts

import { useEffect, useState } from "react";
import axios from "axios";
import { FileAttributes } from "@/types/FileAttributes";
import { useAuth } from "./AuthProvider";
import { BASE_URL } from "@/components/common/BaseUrl";
import { toast } from "sonner";



export const useFileData = (fileType: string) => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/file/read?fileType=${fileType}&isArchived=${false}`, {
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        setData(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [fileType, token, dataPost.file]);

  return { data, loading };
}



export const useFileDataById = (id: number, enabled = true) => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();
  console.log("enabled", enabled);
  useEffect(() => {
    if (!id || !enabled) return;

    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/file/read/${id}`, {
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        setData(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [id, token]);

  return { data, loading, enabled };

}


export const useFileDataStatus = (statusType: 'favorite' | 'archived' | 'deleted') => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost, setDataPost } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);

        // ✅ Build query params based on statusType
        let query = "";

        if (statusType === "favorite") {
          query = `isFavorite=true&isArchived=false&isDeleted=false`;
        } else if (statusType === "archived") {
          query = `isArchived=true&isDeleted=false`;
        } else if (statusType === "deleted") {
          query = `isDeleted=true`;
        }

        const response = await axios.get(`${BASE_URL}/file/read?${query}`, {
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        // setDataPost({
        //   file: dataPost.file + 1
        // })


        setData(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [statusType, token, dataPost.file]);

  return { data, loading };
};



export const useDeleteFile = () => {
  const { token, dataPost, setDataPost } = useAuth();
  const [loadingId, setLoadingId] = useState<number | null>(null);


  const updateStatus = async (key_name:string, status: boolean, fileId: number) => {
    try {
      setLoadingId(fileId)
      await axios.patch(
        `${BASE_URL}/file/change-status/${fileId}`,
        { [key_name]: status },
        {
          headers: { "x-auth-token": `Bearer ${token}` },
        }
      );
      setDataPost({ file: dataPost.file + 1 });
      setLoadingId(null)
      toast.success("File status changed successfully");
    } catch (error) {
      console.error(error);
      setLoadingId(null)
      toast.error("Error changing file status");
    }
  };

  return { updateStatus, loadingId };
};



const toQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};

export const useFileDataGeneric = (filters: Record<string, any>, fetch : boolean) => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost } = useAuth();
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!fetch ) return;
        setLoading(true);
        const queryString = toQueryString(filters);
        console.log(" filters", queryString);
        const response = await axios.get(`${BASE_URL}/file/read?${queryString}`, {
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        setData(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [JSON.stringify(filters), token, dataPost.file,fetch]); // serialize filters for dependency tracking

  return { data, loading };
};