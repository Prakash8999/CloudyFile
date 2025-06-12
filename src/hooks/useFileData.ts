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
        const response = await axios.get(`${BASE_URL}/file/read?fileType=${fileType}`, {
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