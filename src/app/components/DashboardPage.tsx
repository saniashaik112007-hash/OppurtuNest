import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  FileText,
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/app/components/ui/sidebar';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { SeedDataButton } from './SeedDataButton';

interface DashboardStats {
  totalOpportunities: number;
  totalCourses: number;
  completedQuizzes: number;
  assignmentsSubmitted: number;
  currentRank: number;
  totalPoints: number;
}

const menuItems = [
  {
    title: 'Main',
    items: [
      {
        title: 'Dashboard',
        icon: Home,
        url: '/dashboard',
      },
    ],
  },
  {
    title: 'Career Opportunities',
    items: [
      {
        title: 'Internships',
        icon: Briefcase,
        url: '/internships',
      },
      {
        title: 'Hackathons',
        icon: Trophy,
        url: '/hackathons',
      },
      {
        title: 'Workshops',
        icon: Sparkles,
        url: '/workshops',
      },
      {
        title: 'Events',
        icon: Calendar,
        url: '/events',
      },
    ],
  },
  {
    title: 'Learning Hub',
    items: [
      {
        title: 'Courses',
        icon: BookOpen,
        url: '/courses',
      },
      {
        title: 'Subject PDFs',
        icon: FileText,
        url: '/subjects',
      },
    ],
  },
  {
    title: 'Practice & Progress',
    items: [
      {
        title: 'Quiz Games',
        icon: Brain,
        url: '/quizzes',
      },
      {
        title: 'Assignments',
        icon: ClipboardList,
        url: '/assignments',
      },
      {
        title: 'Progress Tracker',
        icon: TrendingUp,
        url: '/progress',
      },
      {
        title: 'Leaderboard',
        icon: Award,
        url: '/leaderboard',
      },
    ],
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile, logout, loading } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOpportunities: 0,
    totalCourses: 0,
    completedQuizzes: 0,
    assignmentsSubmitted: 0,
    currentRank: 0,
    totalPoints: 0,
  });
  const [realtimeData, setRealtimeData] = useState<any>(null);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  // Real-time data fetching from Firebase
  useEffect(() => {
    if (!currentUser) return;

    // Fetch opportunities count
    const opportunitiesQuery = query(collection(db, 'opportunities'));
    const unsubscribeOpportunities = onSnapshot(
      opportunitiesQuery,
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          totalOpportunities: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error fetching opportunities:', error);
      }
    );

    // Fetch courses count
    const coursesQuery = query(collection(db, 'courses'));
    const unsubscribeCourses = onSnapshot(
      coursesQuery,
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          totalCourses: snapshot.size,
        }));
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );

    // Fetch user progress data
    if (currentUser) {
      const userProgressQuery = query(
        collection(db, 'userProgress'),
        where('userId', '==', currentUser.uid)
      );
      const unsubscribeProgress = onSnapshot(
        userProgressQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const progressData = snapshot.docs[0].data();
            setStats((prev) => ({
              ...prev,
              completedQuizzes: progressData.completedQuizzes || 0,
              assignmentsSubmitted: progressData.assignmentsSubmitted || 0,
              totalPoints: progressData.totalPoints || 0,
            }));
            setRealtimeData(progressData);
          }
        },
        (error) => {
          console.error('Error fetching user progress:', error);
        }
      );

      // Fetch leaderboard rank
      const leaderboardQuery = query(collection(db, 'leaderboard'));
      const unsubscribeLeaderboard = onSnapshot(
        leaderboardQuery,
        async (snapshot) => {
          const leaderboard = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a: any, b: any) => (b.totalPoints || 0) - (a.totalPoints || 0));
          
          const userIndex = leaderboard.findIndex((entry: any) => entry.userId === currentUser.uid);
          setStats((prev) => ({
            ...prev,
            currentRank: userIndex >= 0 ? userIndex + 1 : 0,
          }));
        },
        (error) => {
          console.error('Error fetching leaderboard:', error);
        }
      );

      return () => {
        unsubscribeOpportunities();
        unsubscribeCourses();
        unsubscribeProgress();
        unsubscribeLeaderboard();
      };
    }

    return () => {
      unsubscribeOpportunities();
      unsubscribeCourses();
    };
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading || !currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200">
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Opportunest
                </h1>
                <p className="text-xs text-gray-500">{userProfile.collegeName}</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {menuItems.map((group, groupIndex) => (
              <SidebarGroup key={groupIndex}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.url}>
                          <SidebarMenuButton
                            onClick={() => navigate(item.url)}
                            isActive={isActive}
                            tooltip={item.title}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {userProfile.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">{userProfile.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back, {userProfile.fullName.split(' ')[0]}! 👋
                  </h2>
                  <p className="text-sm text-gray-600">
                    {userProfile.course} - {userProfile.branch}
                  </p>
                </div>
              </div>
              <SeedDataButton />
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
                    <p className="text-xs text-muted-foreground">
                      Available internships, hackathons & events
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalCourses}</div>
                    <p className="text-xs text-muted-foreground">
                      Courses ready for you to explore
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Quizzes</CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.completedQuizzes}</div>
                    <p className="text-xs text-muted-foreground">
                      Quizzes you've completed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Assignments Submitted</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.assignmentsSubmitted}</div>
                    <p className="text-xs text-muted-foreground">
                      Assignments you've completed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.currentRank > 0 ? `#${stats.currentRank}` : 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your position on the leaderboard
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalPoints}</div>
                    <p className="text-xs text-muted-foreground">
                      Points earned from activities
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {menuItems
                    .flatMap((group) => group.items)
                    .filter((item) => item.url !== '/dashboard')
                    .slice(0, 8)
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <Card
                          key={item.url}
                          className="cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => navigate(item.url)}
                        >
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <Icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <CardTitle className="text-base">{item.title}</CardTitle>
                            </div>
                          </CardHeader>
                        </Card>
                      );
                    })}
                </div>
              </div>

              {/* Real-time Data Info */}
              {realtimeData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Updates</CardTitle>
                    <CardDescription>
                      Your data is being updated in real-time from Firebase
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Connected to Firebase - Data syncing live</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
