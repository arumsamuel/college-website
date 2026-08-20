import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext({
  student: null,
  token: null,
  loading: true,
  signin: async () => {},
  signup: async () => {},
  signout: () => {},
  refreshStudent: async () => {}
});

export const DEMO_CREDENTIALS = {
  email: 'demo@student.college.edu',
  password: 'demo1234'
};

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('college-token') || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(Boolean(token));

  // Restore session on mount
  useEffect(() => {
    if (!token) return;
    api
      .get('/students/me')
      .then(s => setStudent(s))
      .catch(() => {
        localStorage.removeItem('college-token');
        setToken(null);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persist(t) {
    try {
      localStorage.setItem('college-token', t || '');
      if (!t) localStorage.removeItem('college-token');
    } catch (e) {}
    setToken(t || null);
  }

  async function signin(email, password) {
    const data = await api.post('/auth/signin', { email, password });
    persist(data.token);
    setStudent(data.student);
    return data.student;
  }

  async function signup(payload) {
    const data = await api.post('/auth/signup', payload);
    persist(data.token);
    setStudent(data.student);
    return data.student;
  }

  async function refreshStudent() {
    if (!token) return null;
    const s = await api.get('/students/me');
    setStudent(s);
    return s;
  }

  function signout() {
    persist(null);
    setStudent(null);
  }

  return (
    <AuthContext.Provider value={{ student, token, loading, signin, signup, signout, refreshStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
