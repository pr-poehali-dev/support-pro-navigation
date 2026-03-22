import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import { StatusProvider } from "@/lib/statuses";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import Chat from "./pages/Chat";
import Mail from "./pages/Mail";
import MyMail from "./pages/MyMail";
import Social from "./pages/Social";
import Reviews from "./pages/Reviews";
import Fraud from "./pages/Fraud";
import QualityControl from "./pages/QualityControl";
import Tasks from "./pages/Tasks";
import News from "./pages/News";
import Schedule from "./pages/Schedule";
import Knowledge from "./pages/Knowledge";
import Stats from "./pages/Stats";
import Kpi from "./pages/Kpi";
import Reports from "./pages/Reports";
import StatusReport from "./pages/StatusReport";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ReactNode } from "react";

const queryClient = new QueryClient();

function ProtectedRoute({ children, roles }: { children: ReactNode; roles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/tickets" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/tickets" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <StatusProvider>
            <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/" element={<Navigate to="/tickets" replace />} />
              <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/mail" element={<ProtectedRoute><Mail /></ProtectedRoute>} />
              <Route path="/my-mail" element={<ProtectedRoute><MyMail /></ProtectedRoute>} />
              <Route path="/social" element={<ProtectedRoute><Social /></ProtectedRoute>} />
              <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
              <Route path="/fraud" element={<ProtectedRoute roles={["admin", "okk"]}><Fraud /></ProtectedRoute>} />
              <Route path="/quality" element={<ProtectedRoute roles={["admin", "okk"]}><QualityControl /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
              <Route path="/knowledge" element={<ProtectedRoute><Knowledge /></ProtectedRoute>} />
              <Route path="/stats" element={<ProtectedRoute roles={["admin", "okk"]}><Stats /></ProtectedRoute>} />
              <Route path="/kpi" element={<ProtectedRoute roles={["admin", "okk"]}><Kpi /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute roles={["admin", "okk"]}><Reports /></ProtectedRoute>} />
              <Route path="/status-report" element={<ProtectedRoute roles={["admin"]}><StatusReport /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute roles={["admin"]}><Users /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><Admin /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute roles={["admin"]}><Settings /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StatusProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;