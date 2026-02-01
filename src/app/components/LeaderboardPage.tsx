import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Award, Trophy, Medal, TrendingUp } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { SeedDataButton } from './SeedDataButton';
import { Card, CardContent } from '@/app/components/ui/card';

interface LeaderboardEntry {
  id: string;
  userId: string;
  userName?: string;
  college?: string;
  totalPoints: number;
  completedQuizzes?: number;
  assignmentsCompleted?: number;
}

export function LeaderboardPage() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Real-time data fetching from Firebase
  useEffect(() => {
    setLoading(true);
    const leaderboardQuery = query(
      collection(db, 'leaderboard'),
      orderBy('totalPoints', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      leaderboardQuery,
      (snapshot) => {
        const entries = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          rank: index + 1,
          ...doc.data(),
        })) as (LeaderboardEntry & { rank: number })[];
        
        setLeaderboard(entries);
        
        // Find user's rank
        if (currentUser) {
          const userEntry = entries.find((entry) => entry.userId === currentUser.uid);
          setUserRank(userEntry ? userEntry.rank : null);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Award className="w-5 h-5 text-gray-400" />;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-50 border-yellow-200';
    if (rank === 2) return 'bg-gray-50 border-gray-200';
    if (rank === 3) return 'bg-amber-50 border-amber-200';
    return 'bg-white border-gray-200';
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
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Leaderboard</h2>
          <p className="text-lg text-gray-600">
            {loading ? 'Loading...' : `Top ${leaderboard.length} performers`}
            {userRank && ` • Your Rank: #${userRank}`}
          </p>
        </div>

        {/* User Rank Card */}
        {userRank && userRank > 3 && (
          <Card className="mb-6 border-blue-500 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-blue-600">#{userRank}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{userProfile?.fullName}</div>
                    <div className="text-sm text-gray-600">{userProfile?.collegeName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {leaderboard.find((e) => e.userId === currentUser?.uid)?.totalPoints || 0}
                  </div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              const isCurrentUser = entry.userId === currentUser?.uid;
              
              return (
                <Card
                  key={entry.id}
                  className={`${getRankColor(rank)} ${isCurrentUser ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center justify-center w-12">
                          {getRankIcon(rank)}
                        </div>
                        <div className="text-2xl font-bold text-gray-700 w-12">#{rank}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-lg">
                            {entry.userName || `User ${entry.userId.slice(0, 8)}`}
                            {isCurrentUser && (
                              <span className="ml-2 text-blue-600 text-sm">(You)</span>
                            )}
                          </div>
                          {entry.college && (
                            <div className="text-sm text-gray-600">{entry.college}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        {entry.completedQuizzes !== undefined && (
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-700">
                              {entry.completedQuizzes}
                            </div>
                            <div className="text-xs text-gray-500">Quizzes</div>
                          </div>
                        )}
                        {entry.assignmentsCompleted !== undefined && (
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-700">
                              {entry.assignmentsCompleted}
                            </div>
                            <div className="text-xs text-gray-500">Assignments</div>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-600">
                            {entry.totalPoints}
                          </div>
                          <div className="text-xs text-gray-500">Points</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && leaderboard.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No leaderboard data</h3>
            <p className="text-gray-600 mb-4">Leaderboard will appear once users start earning points.</p>
            <SeedDataButton />
          </div>
        )}

        {/* Real-time Indicator */}
        {!loading && leaderboard.length > 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Connected to Firebase - Leaderboard updates in real-time</span>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
