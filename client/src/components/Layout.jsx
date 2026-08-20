import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AnnouncementsTicker from './AnnouncementsTicker';
import QuickLinks from './QuickLinks';
import SearchBar from './SearchBar';
import { TranslatorToggle } from './Translator';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/academics', label: 'Academics' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/news', label: 'News & Events' },
  { to: '/contact', label: 'Contact' }
];

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { student } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <AnnouncementsTicker />
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="header-top">
          <span>🎓 Excellence in Education</span> &nbsp;&middot;&nbsp; <span>60+ Programs</span> &nbsp;&middot;&nbsp; <span>#1 in Student Satisfaction</span>
        </div>
        <div className="header-main">
          <Link to="/" className="logo" aria-label="College home">
            <div className="logo-icon">🎓</div>
            <div>
              COLLEGE
              <span className="logo-sub">EXCELLENCE IN EDUCATION</span>
            </div>
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            &#9776;
          </button>

          <nav id="mainNav" className={`desktop-nav ${mobileOpen ? 'open' : ''}`} aria-label="Primary">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <SearchBar />
            <TranslatorToggle />
            <Link to={student ? '/portal/dashboard' : '/portal/signin'} className="btn btn-gold btn-sm">
              {student ? 'Portal' : 'Sign In'}
            </Link>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <QuickLinks />

      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🎓 COLLEGE</h3>
            <p>Excellence in education since 1952. A premier institution offering 60+ undergraduate programs, vibrant student life, and a thriving community.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/about">About</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/academics">Academics</Link>
            <Link to="/student-life">Student Life</Link>
            <Link to="/news">News & Events</Link>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/staff-directory">Staff Directory</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/library">Library</Link>
            <Link to="/board">Board of Governance</Link>
            <Link to="/support-services">Support Services</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:info@college.edu">info@college.edu</a>
            <a href="tel:+15550102000">+1 (555) 010-2000</a>
            <a href="/contact">100 University Avenue</a>
            <Link to="/portal/signin">Student Portal</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 College. All rights reserved.</span>
          <a href="/privacy">Privacy</a>
          <a href="/sitemap">Sitemap</a>
          <a href="/accessibility">Accessibility</a>
          <a href="/contact">Webmaster</a>
        </div>
      </footer>
    </>
  );
}
