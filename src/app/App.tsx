import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SignupPage } from '@/app/components/SignupPage';
import { LoginPage } from '@/app/components/LoginPage';
import { ForgotPasswordPage } from '@/app/components/ForgotPasswordPage';
import { DashboardPage } from '@/app/components/DashboardPage';
import { OpportunitiesPage } from '@/app/components/OpportunitiesPage';
import { CoursesPage } from '@/app/components/CoursesPage';
import { SubjectsPage } from '@/app/components/SubjectsPage';
import { QuizzesPage } from '@/app/components/QuizzesPage';
import { ProgressPage } from '@/app/components/ProgressPage';
import { LeaderboardPage } from '@/app/components/LeaderboardPage';
import { AssignmentsPage } from '@/app/components/AssignmentsPage';
import { WorkshopsPage } from '@/app/components/WorkshopsPage';
import { QuizPage } from '@/app/components/QuizPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Component to handle root route redirect
function RootRedirect() {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      
      {/* Career Opportunities */}
      <Route
        path="/internships"
        element={
          <ProtectedRoute>
            <OpportunitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities/:category"
        element={
          <ProtectedRoute>
            <OpportunitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hackathons"
        element={
          <ProtectedRoute>
            <OpportunitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workshops"
        element={
          <ProtectedRoute>
            <WorkshopsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <OpportunitiesPage />
          </ProtectedRoute>
        }
      />
      
      {/* Learning Hub */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <SubjectsPage />
          </ProtectedRoute>
        }
      />
      
      {/* Practice & Progress */}
      <Route
        path="/quizzes"
        element={
          <ProtectedRoute>
            <QuizzesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:quizId"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <AssignmentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <ProgressPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
