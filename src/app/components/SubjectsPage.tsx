import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowLeft, FileText, Download, BookOpen } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SeedDataButton } from './SeedDataButton';

interface Subject {
  name: string;
  pdfUrl: string;
}

interface SemesterData {
  id: string;
  semester: string;
  course?: string;
  branch?: string;
  subjects: Subject[];
}

export function SubjectsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [subjects, setSubjects] = useState<SemesterData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const course = searchParams.get('course') || '';
  const branch = searchParams.get('branch') || '';

  // Real-time data fetching from Firebase
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'subjects'),
      (snapshot) => {
        const subjectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SemesterData[];
        setSubjects(subjectsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching subjects:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDownload = (subject: Subject) => {
    if (subject.pdfUrl && subject.pdfUrl !== '#') {
      window.open(subject.pdfUrl, '_blank');
    } else {
      alert(`Downloading ${subject.name} PDF...`);
    }
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
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Subject PDFs</h2>
          {course && branch && (
            <p className="text-lg text-gray-600">
              {course} - {branch}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${subjects.length} semester groups available`}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading subjects...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {subjects.map((semester) => (
              <div key={semester.id} className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-100 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Semester {semester.semester}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {semester.subjects && semester.subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate">
                              {subject.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownload(subject)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && subjects.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No subjects available</h3>
            <p className="text-gray-600 mb-4">Subject PDFs will appear here once they're added.</p>
            <SeedDataButton />
          </div>
        )}
      </main>
    </div>
  );
}
