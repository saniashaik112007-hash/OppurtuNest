import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SeedDataButton } from './SeedDataButton';

interface Course {
  id: string;
  name: string;
  branches: string[];
  duration?: string;
  description?: string;
}

export function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Real-time data fetching from Firebase
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'courses'),
      (snapshot) => {
        const coursesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Course[];
        setCourses(coursesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleBranchClick = (courseId: string, branch: string) => {
    navigate(`/subjects?course=${courseId}&branch=${encodeURIComponent(branch)}`);
  };

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  const courseColors = [
    { color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
    { color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
    { color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50' },
    { color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-50' },
  ];

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
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Available Courses</h2>
          <p className="text-lg text-gray-600">
            {loading ? 'Loading...' : `Explore ${courses.length} courses and their branches`}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const colors = courseColors[index % courseColors.length];
              const isSelected = selectedCourse === course.id;
              
              return (
                <div
                  key={course.id}
                  className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    isSelected ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className={`${colors.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <BookOpen className={`w-7 h-7 bg-gradient-to-r ${colors.color} bg-clip-text text-transparent`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
                  
                  {course.description && (
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  )}
                  
                  {course.duration && (
                    <p className="text-xs text-gray-500 mb-4">Duration: {course.duration}</p>
                  )}

                  {isSelected && course.branches && course.branches.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Branches:</p>
                      <div className="space-y-2">
                        {course.branches.map((branch, branchIndex) => (
                          <button
                            key={branchIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBranchClick(course.id, branch);
                            }}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                          >
                            <span className="text-sm text-gray-700">{branch}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isSelected && course.branches && (
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-600">
                        {course.branches.length} branch{course.branches.length !== 1 ? 'es' : ''}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && courses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses available</h3>
            <p className="text-gray-600 mb-4">Courses will appear here once they're added.</p>
            <SeedDataButton />
          </div>
        )}
      </main>
    </div>
  );
}
