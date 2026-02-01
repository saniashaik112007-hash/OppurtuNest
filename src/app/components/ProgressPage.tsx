import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, TrendingUp, BookOpen, Brain, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';

interface CourseProgress {
  subject: string;
  semester: string;
  completed: number;
  total: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
}

const progressData: CourseProgress[] = [
  { subject: 'Data Structures', semester: '1-2', completed: 12, total: 15, status: 'In Progress' },
  { subject: 'Database Management Systems', semester: '2-1', completed: 10, total: 10, status: 'Completed' },
  { subject: 'Operating Systems', semester: '2-1', completed: 8, total: 12, status: 'In Progress' },
  { subject: 'Computer Networks', semester: '2-1', completed: 5, total: 14, status: 'In Progress' },
  { subject: 'Web Technologies', semester: '2-2', completed: 15, total: 15, status: 'Completed' },
  { subject: 'Machine Learning', semester: '3-1', completed: 0, total: 16, status: 'Not Started' },
];

const activityLog = [
  { activity: 'Completed Quiz: Data Structures Fundamentals', time: '2 hours ago', type: 'quiz' },
  { activity: 'Downloaded PDF: Operating Systems Chapter 3', time: '5 hours ago', type: 'study' },
  { activity: 'Submitted Assignment: DBMS Week 5', time: '1 day ago', type: 'assignment' },
  { activity: 'Completed Quiz: Web Development Basics', time: '2 days ago', type: 'quiz' },
  { activity: 'Downloaded PDF: Computer Networks Chapter 2', time: '3 days ago', type: 'study' },
];

export function ProgressPage() {
  const navigate = useNavigate();

  const totalCompleted = progressData.reduce((sum, item) => sum + item.completed, 0);
  const totalLessons = progressData.reduce((sum, item) => sum + item.total, 0);
  const overallProgress = Math.round((totalCompleted / totalLessons) * 100);

  const completedCourses = progressData.filter(c => c.status === 'Completed').length;
  const inProgressCourses = progressData.filter(c => c.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Opportunest
              </h1>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Progress Tracker</h2>
              <p className="text-gray-600 mt-1">Monitor your learning journey</p>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{overallProgress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{completedCourses}</div>
                <div className="text-sm text-gray-600">Courses Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">{inProgressCourses}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Progress */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Course Progress</h3>
            <div className="space-y-4">
              {progressData.map((course, index) => {
                const progressPercent = Math.round((course.completed / course.total) * 100);
                const statusColors = {
                  'Completed': 'bg-green-100 text-green-700',
                  'In Progress': 'bg-blue-100 text-blue-700',
                  'Not Started': 'bg-gray-100 text-gray-700',
                };

                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-lg">{course.subject}</h4>
                          <p className="text-sm text-gray-600">Semester {course.semester}</p>
                        </div>
                      </div>
                      <span className={`${statusColors[course.status]} px-3 py-1 rounded-full text-xs font-semibold`}>
                        {course.status}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Lessons: {course.completed} / {course.total}</span>
                        <span className="font-semibold text-emerald-600">{progressPercent}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="space-y-4">
                {activityLog.map((log, index) => {
                  const icons = {
                    quiz: <Brain className="w-5 h-5 text-indigo-600" />,
                    study: <BookOpen className="w-5 h-5 text-blue-600" />,
                    assignment: <CheckCircle className="w-5 h-5 text-green-600" />,
                  };

                  return (
                    <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {icons[log.type as keyof typeof icons]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{log.activity}</p>
                        <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
