import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Index from '@/pages/Index';
import Users from '@/pages/Users';
import UserDetail from '@/pages/UserDetail';
import Match from '@/pages/Match';
import Chat from '@/pages/Chat';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  {/* 公开路由 */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* 受保护的路由 */}
                  <Route path="/users" element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  } />
                  <Route path="/users/:id" element={
                    <ProtectedRoute>
                      <UserDetail />
                    </ProtectedRoute>
                  } />
                  <Route path="/match" element={
                    <ProtectedRoute>
                      <Match />
                    </ProtectedRoute>
                  } />
                  <Route path="/chat" element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              
              {/* Footer */}
              <footer className="bg-white border-t border-gray-200 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center text-gray-600">
                    <p>&copy; 2024 LinkUp. 连接优秀人才，创造无限可能。</p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
