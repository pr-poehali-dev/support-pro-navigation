import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type UserRole = "admin" | "okk" | "operator";

export interface User {
  id: string;
  login: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: { login: string; password: string; user: User }[] = [
  {
    login: "admin",
    password: "admin",
    user: { id: "1", login: "admin", name: "Иванов А.С.", role: "admin" },
  },
  {
    login: "okk",
    password: "okk",
    user: { id: "2", login: "okk", name: "Петрова М.В.", role: "okk" },
  },
  {
    login: "operator",
    password: "operator",
    user: { id: "3", login: "operator", name: "Сидоров К.Н.", role: "operator" },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("sp_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username: string, password: string): boolean => {
    const found = DEMO_USERS.find(
      (u) => u.login === username && u.password === password
    );
    if (found) {
      setUser(found.user);
      localStorage.setItem("sp_user", JSON.stringify(found.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("sp_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Администратор",
  okk: "ОКК",
  operator: "Оператор",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-700 border-red-200",
  okk: "bg-amber-100 text-amber-700 border-amber-200",
  operator: "bg-blue-100 text-blue-700 border-blue-200",
};

export default AuthProvider;