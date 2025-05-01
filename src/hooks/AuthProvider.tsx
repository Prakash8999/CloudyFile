// AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { toast } from "sonner";

// Define the shape of the user object
interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  provider?: string;
  // Add more user fields as needed
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string;
  // setToken: (token: string) => void;
}

// Create the context with an initial empty value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  // const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const [tokenError, setTokenError] = useState(false)
  const location = useLocation();

  const navigate = useNavigate()
const token = localStorage.getItem("token") || ""
  const currentPath = location.pathname;

  useEffect(() => {
    if (!token) {
      if (currentPath !== '/') navigate('/');
      return;
    }
  
    
    // Don't navigate again if already on correct path
  }, [token, currentPath, navigate]);
  

  useEffect(() => {
    if (tokenError) {
      
      localStorage.removeItem('token')
      navigate('/')
      toast.error("Please relogin")
    }
  }, [tokenError])


  return (
    <AuthContext.Provider value={{ token, user, setUser }}>
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
