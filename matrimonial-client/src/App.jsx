import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';
import AdminPanel from './components/AdminPanel';
import SessionPulse from './components/SessionPulse';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Membership = lazy(() => import('./pages/Membership'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const CommunityDetails = lazy(() => import('./pages/CommunityDetails'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));

const AppContent = () => {
  const { isLoading: isContentLoading } = useContent();
  const [isShortcutAdminOpen, setIsShortcutAdminOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect if current URL is /admin or /admin/...
  const isAdminRoute = location.pathname.toLowerCase() === '/admin' || location.pathname.toLowerCase().startsWith('/admin/');
  
  // Admin panel is open if user navigated to /admin OR pressed shortcut (Ctrl+G or Cmd+G)
  const isAdminOpen = isAdminRoute || isShortcutAdminOpen;

  const handleCloseAdmin = () => {
    setIsShortcutAdminOpen(false);
    if (isAdminRoute) {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Support Ctrl+G (Windows/Linux) and Cmd+G (Mac metaKey)
      if ((event.ctrlKey || event.metaKey) && (event.key === 'g' || event.key === 'G')) {
        event.preventDefault();
        if (isAdminRoute) {
          navigate('/');
        } else {
          setIsShortcutAdminOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminRoute, navigate]);

  return (
    <div className="w-full max-w-full overflow-x-hidden relative flex flex-col min-h-screen">
      <LoadingScreen 
        isContentLoading={isContentLoading} 
        onLoadComplete={() => setIsPageLoading(false)} 
      />
      <Navbar />
      <AdminPanel isOpen={isAdminOpen} onClose={handleCloseAdmin} />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><LoadingScreen isContentLoading={true} /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<div className="min-h-screen bg-slate-900" />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community/:name" element={<CommunityDetails />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookie" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/refund" element={<RefundPolicy />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppButton />
      <SessionPulse />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </Router>
  );
}

export default App;
