// src/hooks/useFileData.ts

import { useEffect, useState } from "react";
import axios from "axios";
import { FileAttributes } from "@/types/FileAttributes";
import { useAuth } from "./AuthProvider";
import { BASE_URL } from "@/components/common/BaseUrl";
import { toast } from "sonner";



interface FileFilters {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
  [key: string]: any;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total_count: number;
    page: number;
    total_pages: number;
    limit: number;
  };
}

export const useFileData = (fileType: string, initialFilters: FileFilters = {}) => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<FileAttributes>["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FileFilters>({
    page: 1,
    limit: 10,
    sort_by: "id",
    sort_order: "DESC",
    ...initialFilters,
  });

  const { token, dataPost } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/file/read`, {
          params: { fileType, isArchived: false, ...filters },
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        setData(response.data.data);
        setMeta(response.data.meta);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
        setError(error.response?.data?.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [fileType, token, dataPost.file, filters]);

  return { data, meta, loading, error, filters, setFilters };
};



export const useFileDataById = (id: number, enabled = true, shared = false) => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();
  console.log("enabled", enabled);
  useEffect(() => {
    if (!id || !enabled) return;

    const fetchFiles = async () => {
      try {
        setLoading(true);
        const url = shared
          ? `${BASE_URL}/share-file/get-shared-files-url/${id}`
          : `${BASE_URL}/file/read/${id}`;




        const response = await axios.get(url, {
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
  }, [id, token, shared]);

  return { data, loading, enabled };

}


export const useFileDataStatus = (statusType: 'favorite' | 'archived' | 'deleted', initialFilters: FileFilters = {}) => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost } = useAuth();
  const [meta, setMeta] = useState<PaginatedResponse<FileAttributes>["meta"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FileFilters>({
    page: 1,
    limit: 10,
    sort_by: "id",
    sort_order: "DESC",
    ...initialFilters,
  });


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
          params  : {...filters},
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        // setDataPost({
        //   file: dataPost.file + 1
        // })


        setData(response.data.data);
        setMeta(response.data.meta);

      } catch (error: any) {
        setError(error.response?.data?.message || "Error");

        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [statusType, token, dataPost.file, filters]);

  return { data, loading, filters, setFilters, meta, error };
};



export const useDeleteFile = () => {
  const { token, dataPost, setDataPost } = useAuth();
  const [loadingId, setLoadingId] = useState<number | null>(null);


  const updateStatus = async (key_name: string, status: boolean, fileId: number) => {
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

export const useFileDataGeneric = (filters: Record<string, any>, fetch: boolean) => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (!fetch) return;
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
  }, [JSON.stringify(filters), token, dataPost.file, fetch]); // serialize filters for dependency tracking

  return { data, loading };
};






export const useFileDataLatest = (rawStart?: string, rawEnd?: string) => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const params: any = { isArchived: false };
        if (rawStart && rawEnd) {
          params.rawStart = rawStart;
          params.rawEnd = rawEnd;
        }
        const response = await axios.get(`${BASE_URL}/file/read-latest`, {
          headers: { "x-auth-token": `Bearer ${token}` },
          params: params,
        });
        setData(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    // fetchFiles();
    fetchFiles();

  }, [token, dataPost.file, rawStart, rawEnd]);

  return { data, loading };
}








export const useFileStats = () => {
  const [data, setData] = useState<FileAttributes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, dataPost } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/stats`, {
          headers: { "x-auth-token": `Bearer ${token}` },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch file data");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token, dataPost.file]);

  return { data, loading };
}



export const usePermanentlyDeleteFile = () => {
  const { token, dataPost, setDataPost } = useAuth();
  const [isLoading, setIsLoading] = useState(false);


  const deleteFile = async (fileIds: number[]) => {
    try {
      setIsLoading(true)
      const deleteResponse = await axios.post(
        `${BASE_URL}/file/delete-permanently`,
        {
          ids: fileIds
        },

        {

          headers: { "x-auth-token": `Bearer ${token}` },

        },

      );
      setDataPost({ file: dataPost.file + 1 });
      setIsLoading(false)
      console.log(" File deleted", deleteResponse.data);
      toast.success(deleteResponse.data.message || "File deleted successfully");
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      toast.error("Error changing file status");
    }
  };

  return { deleteFile, isLoading };
};
