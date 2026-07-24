import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const KEY = "rb-auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const login = async ({ email, name }) => {
    await new Promise((r) => setTimeout(r, 900));
    const u = { id: "u_" + Math.random().toString(36).slice(2, 8), name: name || email.split("@")[0], email, avatar: null };
    setUser(u);
    return u;
  };

  const register = async ({ email, name }) => {
    await new Promise((r) => setTimeout(r, 900));
    const u = { id: "u_" + Math.random().toString(36).slice(2, 8), name, email, avatar: null };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);
  const updateUser = (patch) => setUser((u) => (u ? { ...u, ...patch } : u));

  return <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
