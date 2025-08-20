import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import Dashboard from './pages/Dashboard';
import EditNote from './pages/EditNote';
import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/create-note" 
              element={
                <ProtectedRoute>
                  <CreateNote />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-note/:id" 
              element={
                <ProtectedRoute>
                  <EditNote />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;