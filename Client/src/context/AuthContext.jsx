import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // Register User
  // =========================
  const register = async (userData) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/register", userData);

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration Failed";

      throw new Error(message, {
        cause: error,
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Login User
  // =========================
  const login = async (loginData) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", loginData);

      const data = res.data;

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login Failed";

      throw new Error(message, {
        cause: error,
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Logout User
  // =========================
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};