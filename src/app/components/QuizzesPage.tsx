import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Brain, Play, Trophy, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: number;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Data Structures Fundamentals',
    description: 'Test your knowledge on arrays, linked lists, stacks, and queues',
    subject: 'Data Structures',
    questions: 15,
    duration: 20,
    difficulty: 'Easy',
    points: 100,
  },
  {
    id: '2',
    title: 'Database Management Pro',
    description: 'Advanced SQL queries, normalization, and transactions',
    subject: 'DBMS',
    questions: 20,
    duration: 30,
    difficulty: 'Hard',
    points: 200,
  },
  {
    id: '3',
    title: 'Web Development Basics',
    description: 'HTML, CSS, JavaScript fundamentals quiz',
    subject: 'Web Technologies',
    questions: 12,
    duration: 15,
    difficulty: 'Easy',
    points: 80,
  },
  {
    id: '4',
    title: 'Operating Systems Challenge',
    description: 'Processes, threads, memory management, and scheduling',
    subject: 'Operating Systems',
    questions: 18,
    duration: 25,
    difficulty: 'Medium',
    points: 150,
  },
  {
    id: '5',
    title: 'Machine Learning Quiz',
    description: 'Algorithms, models, and ML concepts',
    subject: 'Machine Learning',
    questions: 20,
    duration: 30,
    difficulty: 'Hard',
    points: 200,
  },
  {
    id: '6',
    title: 'Computer Networks Essentials',
    description: 'Protocols, OSI model, and network security',
    subject: 'Computer Networks',
    questions: 15,
    duration: 20,
    difficulty: 'Medium',
    points: 120,
  },
];

const difficultyColors = {
  Easy: { bg: 'bg-green-100', text: 'text-green-700' },
  Medium: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Hard: { bg: 'bg-red-100', text: 'text-red-700' },
};

export function QuizzesPage() {
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    // In a real app, this would navigate to the quiz taking page
    alert(`Starting ${quiz.title}! Good luck! 🎯`);
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
            <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Quiz Games</h2>
              <p className="text-gray-600 mt-1">Test your knowledge and earn points</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">24</div>
                <div className="text-sm text-gray-600">Quizzes Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">1,840</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">85%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const difficultyColor = difficultyColors[quiz.difficulty];
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center">
                    <Brain className="w-7 h-7 text-indigo-600" />
                  </div>
                  <span className={`${difficultyColor.bg} ${difficultyColor.text} px-3 py-1 rounded-full text-sm font-semibold`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {quiz.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {quiz.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Subject:</span>
                      <div className="font-semibold text-gray-800">{quiz.subject}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Points:</span>
                      <div className="font-semibold text-indigo-600">{quiz.points}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{quiz.duration} mins</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-6 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Quiz
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
