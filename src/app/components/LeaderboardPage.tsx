import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Award, Trophy, Medal, TrendingUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  points: number;
  quizzesCompleted: number;
  assignmentsCompleted: number;
  avatar: string;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Arjun Sharma',
    college: 'IIT Delhi',
    points: 4850,
    quizzesCompleted: 48,
    assignmentsCompleted: 35,
    avatar: 'AS',
  },
  {
    rank: 2,
    name: 'Priya Patel',
    college: 'NIT Trichy',
    points: 4620,
    quizzesCompleted: 45,
    assignmentsCompleted: 33,
    avatar: 'PP',
  },
  {
    rank: 3,
    name: 'Rahul Kumar',
    college: 'BITS Pilani',
    points: 4380,
    quizzesCompleted: 42,
    assignmentsCompleted: 31,
    avatar: 'RK',
  },
  {
    rank: 4,
    name: 'Ananya Singh',
    college: 'VIT Vellore',
    points: 4120,
    quizzesCompleted: 40,
    assignmentsCompleted: 29,
    avatar: 'AS',
  },
  {
    rank: 5,
    name: 'Vikram Reddy',
    college: 'IIIT Hyderabad',
    points: 3950,
    quizzesCompleted: 38,
    assignmentsCompleted: 28,
    avatar: 'VR',
  },
  {
    rank: 6,
    name: 'Sneha Desai',
    college: 'DTU Delhi',
    points: 3780,
    quizzesCompleted: 36,
    assignmentsCompleted: 26,
    avatar: 'SD',
  },
  {
    rank: 7,
    name: 'Aditya Verma',
    college: 'Manipal Institute',
    points: 3650,
    quizzesCompleted: 35,
    assignmentsCompleted: 25,
    avatar: 'AV',
  },
  {
    rank: 8,
    name: 'Kavya Nair',
    college: 'Anna University',
    points: 3520,
    quizzesCompleted: 34,
    assignmentsCompleted: 24,
    avatar: 'KN',
  },
  {
    rank: 9,
    name: 'Rohan Gupta',
    college: 'SRM Institute',
    points: 3400,
    quizzesCompleted: 32,
    assignmentsCompleted: 23,
    avatar: 'RG',
  },
  {
    rank: 10,
    name: 'Ishita Mehta',
    college: 'Amity University',
    points: 3280,
    quizzesCompleted: 31,
    assignmentsCompleted: 22,
    avatar: 'IM',
  },
];

// Current user (example)
const currentUser: LeaderboardEntry = {
  rank: 15,
  name: 'You',
  college: 'Your College',
  points: 2940,
  quizzesCompleted: 28,
  assignmentsCompleted: 20,
  avatar: 'YO',
};

const getRankMedal = (rank: number) => {
  if (rank === 1) return { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' };
  if (rank === 2) return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-50' };
  if (rank === 3) return { icon: Medal, color: 'text-amber-600', bg: 'bg-amber-50' };
  return { icon: Award, color: 'text-blue-500', bg: 'bg-blue-50' };
};

export function LeaderboardPage() {
  const navigate = useNavigate();

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
            <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Leaderboard</h2>
              <p className="text-gray-600 mt-1">Compete with students across the nation</p>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {leaderboardData.slice(0, 3).map((entry) => {
            const medal = getRankMedal(entry.rank);
            const MedalIcon = medal.icon;

            return (
              <div
                key={entry.rank}
                className={`bg-white rounded-3xl p-8 shadow-lg text-center ${
                  entry.rank === 1 ? 'md:order-2 md:scale-105' : entry.rank === 2 ? 'md:order-1' : 'md:order-3'
                }`}
              >
                <div className={`${medal.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <MedalIcon className={`w-8 h-8 ${medal.color}`} />
                </div>
                
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {entry.avatar}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">{entry.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{entry.college}</p>

                <div className="bg-amber-50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-amber-600 mb-1">{entry.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-lg font-bold text-gray-800">{entry.quizzesCompleted}</div>
                    <div className="text-xs text-gray-600">Quizzes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">{entry.assignmentsCompleted}</div>
                    <div className="text-xs text-gray-600">Assignments</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Your Rank */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center">
                <div className="text-2xl font-bold">#{currentUser.rank}</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Your Current Rank</h3>
                <p className="text-blue-100">Keep learning to climb higher!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">{currentUser.points}</div>
              <div className="text-blue-100">Points</div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h3 className="text-2xl font-bold text-white">All Rankings</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700">College</th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-gray-700">Points</th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-gray-700">Quizzes</th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-gray-700">Assignments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaderboardData.map((entry) => {
                  const medal = getRankMedal(entry.rank);
                  const MedalIcon = medal.icon;

                  return (
                    <tr key={entry.rank} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`${medal.bg} w-10 h-10 rounded-lg flex items-center justify-center`}>
                            {entry.rank <= 3 ? (
                              <MedalIcon className={`w-5 h-5 ${medal.color}`} />
                            ) : (
                              <span className="font-bold text-gray-700">{entry.rank}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {entry.avatar}
                          </div>
                          <span className="font-semibold text-gray-800">{entry.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-gray-600">{entry.college}</td>
                      <td className="px-8 py-5 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                          <TrendingUp className="w-4 h-4" />
                          {entry.points}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center text-gray-700 font-medium">{entry.quizzesCompleted}</td>
                      <td className="px-8 py-5 text-center text-gray-700 font-medium">{entry.assignmentsCompleted}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
