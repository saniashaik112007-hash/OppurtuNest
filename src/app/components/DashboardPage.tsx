import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Calendar,
  BookOpen,
  Brain,
  ClipboardList,
  TrendingUp,
  Award,
  User,
  Sparkles,
  FileText
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface StudentProfile {
  fullName: string;
  email: string;
  course: string;
  branch: string;
  collegeName: string;
  collegeLocation: string;
}

const sections = [
  {
    title: 'Career Opportunities',
    description: 'Explore internships, hackathons, and events',
    cards: [
      {
        id: 'internships',
        title: 'Internships',
        description: 'Find internships at top companies',
        icon: Briefcase,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
      },
      {
        id: 'hackathons',
        title: 'Hackathons',
        description: 'Compete and showcase your skills',
        icon: Trophy,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600',
      },
      {
        id: 'workshops',
        title: 'Workshops',
        description: 'Hands-on learning experiences',
        icon: Sparkles,
        color: 'from-pink-500 to-pink-600',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-600',
      },
      {
        id: 'events',
        title: 'Events',
        description: 'Conferences, seminars & meetups',
        icon: Calendar,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
      },
    ],
  },
  {
    title: 'Learning Hub',
    description: 'Access courses, subjects, and study materials',
    cards: [
      {
        id: 'courses',
        title: 'Courses',
        description: 'B.Tech, Pharmacy & more',
        icon: BookOpen,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
      },
      {
        id: 'subjects',
        title: 'Subject PDFs',
        description: 'All semesters (1-1 to 4-1)',
        icon: FileText,
        color: 'from-teal-500 to-teal-600',
        bgColor: 'bg-teal-50',
        textColor: 'text-teal-600',
      },
    ],
  },
  {
    title: 'Practice & Progress',
    description: 'Track your learning and compete with peers',
    cards: [
      {
        id: 'quizzes',
        title: 'Quiz Games',
        description: 'Test your knowledge & have fun',
        icon: Brain,
        color: 'from-indigo-500 to-indigo-600',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-600',
      },
      {
        id: 'assignments',
        title: 'Weekly Assignments',
        description: 'Practice problems for your course',
        icon: ClipboardList,
        color: 'from-cyan-500 to-cyan-600',
        bgColor: 'bg-cyan-50',
        textColor: 'text-cyan-600',
      },
      {
        id: 'progress',
        title: 'Progress Tracker',
        description: 'Monitor your learning journey',
        icon: TrendingUp,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-600',
      },
      {
        id: 'leaderboard',
        title: 'Leaderboard',
        description: 'See your rank & compete',
        icon: Award,
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-600',
      },
    ],
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('studentProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleCardClick = (cardId: string) => {
    navigate(`/${cardId}`);
  };

  if (!profile) {
    return null;
  }

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
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Opportunest
                </h1>
                <p className="text-xs text-gray-500">{profile.collegeName}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full"
              onClick={() => navigate('/')}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{profile.fullName}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {profile.fullName.split(' ')[0]}! 👋
          </h2>
          <p className="text-lg text-gray-600">
            {profile.course} - {profile.branch}
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{section.title}</h3>
              <p className="text-gray-600">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {section.cards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left"
                  >
                    <div className={`${card.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${card.textColor}`} />
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {card.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600">
                      {card.description}
                    </p>

                    {/* Gradient border effect on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity -z-10`}></div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
