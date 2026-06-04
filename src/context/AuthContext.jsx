import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('officer');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('officer');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (badge, password) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const authToken = data.token || `token_${data.profile?.id || Date.now()}`;
      setToken(authToken);
      setUser(data.profile || data.user);

      // Persist to localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('officer', JSON.stringify(data.profile || data.user));

      return { success: true, token: authToken, user: data.profile || data.user };
    } catch (err) {
      const errorMessage = err.message || 'Failed to connect to server';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const register = useCallback(async (userData) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      const authToken = data.token || `token_${data.profile?.id || Date.now()}`;
      setToken(authToken);
      setUser(data.profile || data.user);

      // Persist to localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('officer', JSON.stringify(data.profile || data.user));

      return { success: true, token: authToken, user: data.profile || data.user };
    } catch (err) {
      const errorMessage = err.message || 'Failed to connect to server';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('officer');
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
