import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdmissionsPage from './pages/AdmissionsPage';
import AcademicsPage from './pages/AcademicsPage';
import StudentLifePage from './pages/StudentLifePage';
import NewsEventsPage from './pages/NewsEventsPage';
import ContactPage from './pages/ContactPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage';
import CalendarPage from './pages/CalendarPage';
import LibraryPage from './pages/LibraryPage';
import BoardPage from './pages/BoardPage';
import SupportServicesPage from './pages/SupportServicesPage';
import PortalSignupPage from './pages/PortalSignupPage';
import PortalSigninPage from './pages/PortalSigninPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import SearchPage from './pages/SearchPage';

function ProtectedRoute({ children }) {
  const { student, loading } = useAuth();
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" role="status" aria-label="Loading"><span className="sr-only">Loading...</span></div>
      </div>
    );
  }
  if (!student) return <Navigate to="/portal/signin" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/student-life" element={<StudentLifePage />} />
          <Route path="/news" element={<NewsEventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/staff-directory" element={<StaffDirectoryPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/support-services" element={<SupportServicesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/portal/signup" element={<PortalSignupPage />} />
          <Route path="/portal/signin" element={<PortalSigninPage />} />
          <Route path="/portal/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/portal/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <ChatWidget />
    </>
  );
}
