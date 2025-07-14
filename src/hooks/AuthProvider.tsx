// AuthContext.tsx
import { BASE_URL } from "@/components/common/BaseUrl";
import { UploadState } from "@/types/FileAttributes";
import { UploadEvents } from "@/types/generics";
import axios from "axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from "sonner";

// Define the shape of the user object
interface User {
  id: number;
  email: string;
  fullName?: string;
  role?: string;
  provider?: string;
  twoFa: boolean,
  timeZone?: string,
  profileUrl?: string,
  company?: string
  // Add more user fields as needed
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string;
  setToken: (token: string) => void;
  dataPost: UploadState;
  setDataPost: (dataPost: UploadState) => void;
  uploadEvents: UploadEvents;
  triggerUploadEvent: (type: keyof UploadEvents) => void; // ✅ this is correct now
}

// Create the context with an initial empty value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const [dataPost, setDataPost] = useState<UploadState>({
    file: 0,
  });
  const [tokenError, setTokenError] = useState(false)
  const location = useLocation();
  const [uploadEvents, setUploadEvents] = useState<UploadEvents>({
    file: 0,
    folder: 0,
    archive: 0,
    shared: 0,
  });


  const triggerUploadEvent = (type: keyof UploadEvents) => {
    setUploadEvents(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const navigate = useNavigate()
  // const token = localStorage.getItem("token") || ""
  const currentPath = location.pathname;

  useEffect(() => {
    const isPublicView = currentPath.startsWith("/view-file/");

    if (!token && !isPublicView) {
      if (currentPath !== '/') navigate('/');
      return;
    }

    // Don't navigate again if already on correct path
  }, [token, currentPath, navigate]);



  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/read`, {
        headers: { "x-auth-token": `Bearer ${token}` }
      });

      const data = response?.data;
      setUser(data?.data);
    } catch (error: any) {
      console.error("Error fetching user data:", error);

      if (error.response && error.response.status === 401) {
        // only show this if user manually refreshed or tried login
        if (user) {
          toast.error("Session expired. Please log in again.");
        }
        setTokenError(true);  // but don't immediately wipe token
      } else {
        toast.error("Failed to fetch user data.");
      }
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     fetchUserData();
  //   }
  // }, [token]);
  useEffect(() => {
    if (token) {
      fetchUserData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);


  // const regenToken = async () => {
  //   try {
  //      const oldtoken = localStorage.getItem("token") || ""
  //      console.log("old token ", oldtoken)
  //     const newToken = await axios.get(`${BASE_URL}/user/regen`,
  //       {
  //       withCredentials:true,
  //       headers: { "x-auth-token": `Bearer ${oldtoken}`,
  //       },


  //     })

  //     console.log(newToken)


  //   } catch (error) {
  //     toast.error("Something went wrong")
  //   }
  // }

  // useEffect(() => {
  //   regenToken()
  // }, [])


  useEffect(() => {
    const isPublicView = currentPath.startsWith("/view-file/");
    if (tokenError && !isPublicView && currentPath !== '/' && !user) {
      setToken("");
      localStorage.removeItem('token');
      navigate('/');
      toast.error("Please relogin");
    }
  }, [tokenError, currentPath, user]);

  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken, dataPost, setDataPost, uploadEvents, triggerUploadEvent }}>
      {!loading && children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
