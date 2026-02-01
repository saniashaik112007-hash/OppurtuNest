import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ClipboardList, Calendar, Upload, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  points: number;
  status: 'Pending' | 'Submitted' | 'Graded';
  score?: number;
  week: number;
}

const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    subject: 'Data Structures',
    description: 'Implement a Binary Search Tree with insert, delete, and search operations.',
    dueDate: 'Feb 5, 2026',
    points: 100,
    status: 'Pending',
    week: 1,
  },
  {
    id: '2',
    title: 'SQL Query Optimization',
    subject: 'DBMS',
    description: 'Optimize given SQL queries and explain the improvements made.',
    dueDate: 'Feb 6, 2026',
    points: 80,
    status: 'Pending',
    week: 1,
  },
  {
    id: '3',
    title: 'Process Scheduling Algorithms',
    subject: 'Operating Systems',
    description: 'Compare FCFS, SJF, and Round Robin scheduling algorithms.',
    dueDate: 'Feb 8, 2026',
    points: 90,
    status: 'Submitted',
    week: 1,
  },
  {
    id: '4',
    title: 'Responsive Web Design',
    subject: 'Web Technologies',
    description: 'Create a responsive portfolio website using HTML, CSS, and JavaScript.',
    dueDate: 'Jan 28, 2026',
    points: 100,
    status: 'Graded',
    score: 95,
    week: 4,
  },
  {
    id: '5',
    title: 'Network Protocol Analysis',
    subject: 'Computer Networks',
    description: 'Analyze TCP/IP protocol stack and create a detailed report.',
    dueDate: 'Jan 25, 2026',
    points: 85,
    status: 'Graded',
    score: 80,
    week: 3,
  },
  {
    id: '6',
    title: 'Linear Regression Model',
    subject: 'Machine Learning',
    description: 'Build a linear regression model from scratch using Python.',
    dueDate: 'Feb 10, 2026',
    points: 120,
    status: 'Pending',
    week: 2,
  },
];

const statusConfig = {
  Pending: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
  Submitted: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Upload },
  Graded: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
};

export function AssignmentsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Submitted' | 'Graded'>('All');

  const filteredAssignments = filter === 'All' 
    ? assignments 
    : assignments.filter(a => a.status === filter);

  const handleSubmit = (assignmentId: string) => {
    alert(`Opening submission form for assignment ${assignmentId}`);
  };

  const pendingCount = assignments.filter(a => a.status === 'Pending').length;
  const submittedCount = assignments.filter(a => a.status === 'Submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'Graded').length;

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
            <div className="bg-cyan-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <ClipboardList className="w-7 h-7 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Weekly Assignments</h2>
              <p className="text-gray-600 mt-1">Complete assignments to boost your learning</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{pendingCount}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{submittedCount}</div>
                <div className="text-sm text-gray-600">Submitted</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{gradedCount}</div>
                <div className="text-sm text-gray-600">Graded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {(['All', 'Pending', 'Submitted', 'Graded'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredAssignments.map((assignment) => {
            const config = statusConfig[assignment.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-cyan-50 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <ClipboardList className="w-7 h-7 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {assignment.title}
                          </h3>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-medium text-gray-600">
                              {assignment.subject}
                            </span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-600">Week {assignment.week}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`${config.bg} ${config.text} px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 flex-shrink-0`}>
                        <StatusIcon className="w-4 h-4" />
                        {assignment.status}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {assignment.description}
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Due Date</div>
                            <div className="font-semibold text-gray-800">{assignment.dueDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-gray-500">Points</div>
                            <div className="font-semibold text-cyan-600">{assignment.points}</div>
                          </div>
                        </div>
                        {assignment.status === 'Graded' && assignment.score !== undefined && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-gray-500">Score</div>
                              <div className="font-semibold text-green-600">{assignment.score}/{assignment.points}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {assignment.status === 'Pending' && (
                      <Button
                        onClick={() => handleSubmit(assignment.id)}
                        className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        Submit Assignment
                      </Button>
                    )}
                    {assignment.status === 'Submitted' && (
                      <div className="text-center bg-blue-50 px-6 py-4 rounded-xl">
                        <Upload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-blue-700">Awaiting Review</p>
                      </div>
                    )}
                    {assignment.status === 'Graded' && (
                      <div className="text-center bg-green-50 px-6 py-4 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-green-700">Completed</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-cyan-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-10 h-10 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No assignments found</h3>
            <p className="text-gray-600">No {filter.toLowerCase()} assignments at the moment</p>
          </div>
        )}
      </main>
    </div>
  );
}
