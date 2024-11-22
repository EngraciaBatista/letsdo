import React, { createContext, useContext, useState } from "react";
import { signin, signup, authenticate, isAuthenticated } from "../http/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(isAuthenticated());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await signin({ email, password });
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        authenticate(data, () => setUser(isAuthenticated()));
        setError("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await signup({ email, password });
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        authenticate(data, () => setUser(isAuthenticated()));
        setError("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("jwt"); // Ensure you clear token or session info
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
