// AuthContext.tsx
import { BASE_URL } from "@/components/common/BaseUrl";
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
}

// Create the context with an initial empty value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  const [tokenError, setTokenError] = useState(false)
  const location = useLocation();



  const navigate = useNavigate()
  // const token = localStorage.getItem("token") || ""
  const currentPath = location.pathname;

  useEffect(() => {
    if (!token) {
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
      console.log(data);
      setUser(data?.data);
  
    } catch (error:any) {
      console.error("Error fetching user data:", error);
  
      // Check for 401 Unauthorized or token-related issues
      if (error.response && error.response.status === 401) {
        // Token is likely invalid or expired
        toast.error("Session expired. Please log in again.");
        setTokenError(true); // Optional: use this to redirect or handle globally
      } else {
        toast.error("Failed to fetch user data.");
      }
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchUserData();
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
    if (tokenError && currentPath !== '/') {

      localStorage.removeItem('token')
      navigate('/')
      toast.error("Please relogin")
    }
  }, [tokenError])


  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken }}>
      {children}
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
