import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';

// Code-split secondary and admin pages for ultra-fast landing page performance
const ThankYou = lazy(() => import('./pages/ThankYou'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center p-8">
    <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin" />
  </div>
);

const AdminRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('admin_authenticated') === 'true' ||
      localStorage.getItem('admin_authenticated') === 'true'
    );
  });

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onBackToSite={() => {
          window.location.href = '/';
        }}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={() => {
        sessionStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_authenticated');
        setIsAuthenticated(false);
      }}
      onBackToSite={() => {
        window.location.href = '/';
      }}
    />
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPath =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/orders') ||
    location.pathname.startsWith('/login');

  if (isAdminPath) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/admin/orders" element={<AdminRoute />} />
          <Route path="/orders" element={<AdminRoute />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-bangla antialiased selection:bg-[#0068FF] selection:text-white">
      {/* Dynamic Page Content */}
      <main className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/order-success" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Scroll restoration helper */}
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
