import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import Videos from '@/pages/dashboard/videos';
import Photos from '@/pages/dashboard/photos';
import Documents from '@/pages/dashboard/documents';
import Audios from '@/pages/dashboard/audios';
import Analytics from '@/pages/dashboard/analytics';
import Favorites from '@/pages/dashboard/favorites';
import Archive from '@/pages/dashboard/archive';
import Recycle from '@/pages/dashboard/recycle';
import Settings from '@/pages/dashboard/settings';
import Profile from '@/pages/dashboard/profile';
import Landing from '@/pages/landing';
import Shared from '@/pages/dashboard/shared';

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from '@/components/theme/theme-provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from './hooks/AuthProvider';
import FolderPage from './pages/dashboard/folder';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <ThemeProvider defaultTheme="light" storageKey="cloudyfile-theme">
        <AuthProvider>

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/videos" element={<Videos />} />
            <Route path="/dashboard/photos" element={<Photos />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/audios" element={<Audios />} />
            <Route path="/dashboard/shared" element={<Shared />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/favorites" element={<Favorites />} />
            <Route path="/dashboard/archive" element={<Archive />} />
            <Route path="/dashboard/recycle" element={<Recycle />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/folder/:uuid" element={<FolderPage />} />

          </Routes>
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </GoogleOAuthProvider>

  );
}

export default App;