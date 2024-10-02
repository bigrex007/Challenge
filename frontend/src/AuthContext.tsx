import { createContext, useState, useEffect } from 'react';
import callAPI from './api/callAPI';

interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  notifications: boolean,
  refreshNotifications: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  loading: true,
  notifications: false,
  refreshNotifications: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);

  const refreshNotifications = () => {
    setNotifications(!notifications);
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await callAPI.get('/users/whoami');
        res.status === 200 ? setUser(res.data) : setUser(null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, notifications, refreshNotifications }}>
      {children}
    </AuthContext.Provider>
  );
};
