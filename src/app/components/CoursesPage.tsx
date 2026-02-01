import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

const courses = [
  {
    id: 'btech',
    name: 'B.Tech (Bachelor of Technology)',
    branches: [
      'Computer Science Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electronics & Communication',
      'Information Technology',
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    branches: [
      'B.Pharmacy',
      'D.Pharmacy',
      'PharmD',
    ],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'bsc',
    name: 'B.Sc (Bachelor of Science)',
    branches: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Computer Science',
      'Biology',
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'bba',
    name: 'BBA (Bachelor of Business Administration)',
    branches: [
      'Marketing',
      'Finance',
      'Human Resources',
      'International Business',
    ],
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'bca',
    name: 'BCA (Bachelor of Computer Applications)',
    branches: [
      'Software Development',
      'Data Science',
      'Web Development',
    ],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 'bcom',
    name: 'B.Com (Bachelor of Commerce)',
    branches: [
      'Accounting',
      'Banking',
      'Finance',
      'Taxation',
    ],
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
  },
];

export function CoursesPage() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleBranchClick = (courseId: string, branch: string) => {
    navigate(`/subjects?course=${courseId}&branch=${encodeURIComponent(branch)}`);
  };

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

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
            <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Courses</h2>
              <p className="text-gray-600 mt-1">Select your course to access study materials</p>
            </div>
          </div>
        </div>

        {!selectedCourse ? (
          /* Course Selection Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                <div className={`${course.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-5`}>
                  <BookOpen className={`w-8 h-8 bg-gradient-to-r ${course.color} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {course.name}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {course.branches.length} specializations available
                </p>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 transition-opacity -z-10`}></div>
              </button>
            ))}
          </div>
        ) : (
          /* Branch Selection */
          <div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>

            <div className={`${selectedCourseData?.bgColor} rounded-3xl p-8 mb-8`}>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedCourseData?.name}
              </h3>
              <p className="text-gray-600">
                Select your branch/specialization to access semester-wise materials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {selectedCourseData?.branches.map((branch, index) => (
                <button
                  key={index}
                  onClick={() => handleBranchClick(selectedCourse, branch)}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${selectedCourseData.bgColor} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <BookOpen className={`w-6 h-6 bg-gradient-to-r ${selectedCourseData.color} bg-clip-text text-transparent`} />
                    </div>
                    <span className="font-semibold text-gray-800">{branch}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
