import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CaseInfo from './pages/CaseInfo';
import UploadEvidence from './pages/UploadEvidence';
import ScenePhotos from './pages/ScenePhotos';
import CrimePrediction from './pages/CrimePrediction';
import Reconstruction from './pages/Reconstruction';
import Reports from './pages/Reports';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-primary">
      <div className="text-center">
        <div className="text-2xl text-cyan mb-4">🔒</div>
        <p className="text-cyan font-mono">Authenticating...</p>
      </div>
    </div>;
  }
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const router = createBrowserRouter(
  [
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/auth', element: <Navigate to="/login" replace /> },
    { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/cases', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/case-info', element: <ProtectedRoute><CaseInfo /></ProtectedRoute> },
    { path: '/upload-evidence', element: <ProtectedRoute><UploadEvidence /></ProtectedRoute> },
    { path: '/scene-photos', element: <ProtectedRoute><ScenePhotos /></ProtectedRoute> },
    { path: '/prediction', element: <ProtectedRoute><CrimePrediction /></ProtectedRoute> },
    { path: '/reconstruction', element: <ProtectedRoute><Reconstruction /></ProtectedRoute> },
    { path: '/reports', element: <ProtectedRoute><Reports /></ProtectedRoute> },
    { path: '*', element: <Navigate to="/dashboard" /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
)

function AppRoutes() {
  return (
    <RouterProvider router={router} />
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
