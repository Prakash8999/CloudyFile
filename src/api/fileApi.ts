import { BASE_URL } from "@/components/common/BaseUrl";
import { useAuth } from "@/hooks/AuthProvider";
import axios from "axios";
import { toast } from "sonner";


export const handleDeleteClick = async (status:boolean, fileId:number) => {
	try {
		const {token, dataPost, setDataPost} = useAuth()
      await axios.patch(`${BASE_URL}/file/change-status/${fileId}`, { "isDeleted": status }, {
        headers: { "x-auth-token": `Bearer ${token}` },
      });
      setDataPost({
        file: dataPost.file + 1
      })
      toast.success(`File deleted successfully`);
    } catch (error) {
      console.log("error ", error);
      toast.error("Error to delete file");
    }
  }