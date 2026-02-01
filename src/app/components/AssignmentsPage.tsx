import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, ClipboardList, Calendar, FileText, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SeedDataButton } from './SeedDataButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';

interface Assignment {
  id: string;
  title: string;
  description: string;
  course?: string;
  dueDate: string;
  points: number;
  difficulty?: string;
}

export function AssignmentsPage() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time data fetching from Firebase
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'assignments'),
      (snapshot) => {
        const assignmentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Assignment[];
        setAssignments(assignmentsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewAssignment = (assignmentId: string) => {
    navigate(`/assignment/${assignmentId}`);
  };

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
            <div className="flex items-center gap-3">
              <SeedDataButton />
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Weekly Assignments</h2>
          <p className="text-lg text-gray-600">
            {loading ? 'Loading...' : `${assignments.length} assignments available`}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading assignments...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-cyan-100 p-3 rounded-xl">
                      <ClipboardList className="w-6 h-6 text-cyan-600" />
                    </div>
                    {assignment.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(assignment.difficulty)}`}>
                        {assignment.difficulty}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {assignment.course && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Course</span>
                        <span className="font-semibold">{assignment.course}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due Date
                      </span>
                      <span className="font-semibold text-red-600">{assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Points
                      </span>
                      <span className="font-semibold text-cyan-600">{assignment.points}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleViewAssignment(assignment.id)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                  >
                    View Assignment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && assignments.length === 0 && (
          <div className="text-center py-20">
            <ClipboardList className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No assignments available</h3>
            <p className="text-gray-600 mb-4">Assignments will appear here once they're added.</p>
            <SeedDataButton />
          </div>
        )}
      </main>
    </div>
  );
}
