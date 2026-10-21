import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/api/v1`;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/get-note");
      if (response.data.success) {
        setUser({ authenticated: true });
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/user/login", { email, password });
      if (response.data.success) {
        setUser({ authenticated: true, email });
        toast.success("Login successful!");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (fullname, email, password) => {
    try {
      const response = await axios.post("/user/register", {
        fullname,
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get("/user/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
