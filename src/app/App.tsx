import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignupPage } from '@/app/components/SignupPage';
import { DashboardPage } from '@/app/components/DashboardPage';
import { OpportunitiesPage } from '@/app/components/OpportunitiesPage';
import { CoursesPage } from '@/app/components/CoursesPage';
import { SubjectsPage } from '@/app/components/SubjectsPage';
import { QuizzesPage } from '@/app/components/QuizzesPage';
import { ProgressPage } from '@/app/components/ProgressPage';
import { LeaderboardPage } from '@/app/components/LeaderboardPage';
import { AssignmentsPage } from '@/app/components/AssignmentsPage';
import { WorkshopsPage } from '@/app/components/WorkshopsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Career Opportunities */}
        <Route path="/internships" element={<OpportunitiesPage />} />
        <Route path="/opportunities/:category" element={<OpportunitiesPage />} />
        <Route path="/hackathons" element={<OpportunitiesPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/events" element={<OpportunitiesPage />} />
        
        {/* Learning Hub */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        
        {/* Practice & Progress */}
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
