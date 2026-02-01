import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowLeft, FileText, Download, BookOpen } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Subject {
  name: string;
  code: string;
  credits: number;
  pdfUrl: string;
}

interface SemesterData {
  semester: string;
  subjects: Subject[];
}

// Mock data for semester-wise subjects
const semesterData: SemesterData[] = [
  {
    semester: '1-1 (First Year, First Semester)',
    subjects: [
      { name: 'Mathematics-I', code: 'MATH101', credits: 4, pdfUrl: '#' },
      { name: 'Physics', code: 'PHY101', credits: 4, pdfUrl: '#' },
      { name: 'Chemistry', code: 'CHEM101', credits: 4, pdfUrl: '#' },
      { name: 'Engineering Drawing', code: 'ENG101', credits: 3, pdfUrl: '#' },
      { name: 'Basic Electrical Engineering', code: 'EEE101', credits: 4, pdfUrl: '#' },
    ],
  },
  {
    semester: '1-2 (First Year, Second Semester)',
    subjects: [
      { name: 'Mathematics-II', code: 'MATH102', credits: 4, pdfUrl: '#' },
      { name: 'Data Structures', code: 'CS102', credits: 4, pdfUrl: '#' },
      { name: 'Computer Programming', code: 'CS101', credits: 4, pdfUrl: '#' },
      { name: 'Engineering Mechanics', code: 'MECH101', credits: 4, pdfUrl: '#' },
      { name: 'Environmental Science', code: 'ENV101', credits: 3, pdfUrl: '#' },
    ],
  },
  {
    semester: '2-1 (Second Year, First Semester)',
    subjects: [
      { name: 'Database Management Systems', code: 'CS201', credits: 4, pdfUrl: '#' },
      { name: 'Operating Systems', code: 'CS202', credits: 4, pdfUrl: '#' },
      { name: 'Computer Networks', code: 'CS203', credits: 4, pdfUrl: '#' },
      { name: 'Object Oriented Programming', code: 'CS204', credits: 4, pdfUrl: '#' },
      { name: 'Discrete Mathematics', code: 'MATH201', credits: 3, pdfUrl: '#' },
    ],
  },
  {
    semester: '2-2 (Second Year, Second Semester)',
    subjects: [
      { name: 'Web Technologies', code: 'CS205', credits: 4, pdfUrl: '#' },
      { name: 'Software Engineering', code: 'CS206', credits: 4, pdfUrl: '#' },
      { name: 'Theory of Computation', code: 'CS207', credits: 3, pdfUrl: '#' },
      { name: 'Microprocessors', code: 'ECE201', credits: 4, pdfUrl: '#' },
      { name: 'Probability & Statistics', code: 'MATH202', credits: 4, pdfUrl: '#' },
    ],
  },
  {
    semester: '3-1 (Third Year, First Semester)',
    subjects: [
      { name: 'Machine Learning', code: 'CS301', credits: 4, pdfUrl: '#' },
      { name: 'Compiler Design', code: 'CS302', credits: 4, pdfUrl: '#' },
      { name: 'Computer Graphics', code: 'CS303', credits: 3, pdfUrl: '#' },
      { name: 'Cloud Computing', code: 'CS304', credits: 4, pdfUrl: '#' },
      { name: 'Cryptography', code: 'CS305', credits: 3, pdfUrl: '#' },
    ],
  },
  {
    semester: '3-2 (Third Year, Second Semester)',
    subjects: [
      { name: 'Artificial Intelligence', code: 'CS306', credits: 4, pdfUrl: '#' },
      { name: 'Data Mining', code: 'CS307', credits: 4, pdfUrl: '#' },
      { name: 'Mobile Application Development', code: 'CS308', credits: 4, pdfUrl: '#' },
      { name: 'Cyber Security', code: 'CS309', credits: 3, pdfUrl: '#' },
      { name: 'Big Data Analytics', code: 'CS310', credits: 4, pdfUrl: '#' },
    ],
  },
  {
    semester: '4-1 (Fourth Year, First Semester)',
    subjects: [
      { name: 'Deep Learning', code: 'CS401', credits: 4, pdfUrl: '#' },
      { name: 'Natural Language Processing', code: 'CS402', credits: 3, pdfUrl: '#' },
      { name: 'Blockchain Technology', code: 'CS403', credits: 3, pdfUrl: '#' },
      { name: 'Internet of Things', code: 'CS404', credits: 4, pdfUrl: '#' },
      { name: 'Project Work', code: 'CS405', credits: 6, pdfUrl: '#' },
    ],
  },
];

export function SubjectsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const course = searchParams.get('course') || 'Unknown Course';
  const branch = searchParams.get('branch') || 'Unknown Branch';

  const handleDownload = (subject: Subject) => {
    // In a real app, this would trigger PDF download
    alert(`Downloading ${subject.name} PDF...`);
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
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full"
              onClick={() => navigate('/courses')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-teal-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-teal-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Subject Materials</h2>
              <p className="text-gray-600 mt-1">{branch}</p>
            </div>
          </div>
        </div>

        {/* Semesters */}
        <div className="space-y-8">
          {semesterData.map((semesterInfo, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {semesterInfo.semester}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {semesterInfo.subjects.map((subject, subIndex) => (
                  <div
                    key={subIndex}
                    className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
                        <FileText className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {subject.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600">
                            Code: {subject.code}
                          </span>
                          <span className="text-sm text-gray-600">
                            Credits: {subject.credits}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleDownload(subject)}
                      className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
