import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Sparkles, MapPin, Calendar, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SeedDataButton } from './SeedDataButton';

interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor?: string;
  location: string;
  date?: string;
  duration?: string;
  participants?: number;
  maxParticipants?: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
  price?: string;
  company?: string;
}

const mockWorkshops: Workshop[] = [
  {
    id: '1',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Learn to build complete web applications from scratch using React, Node.js, and MongoDB.',
    instructor: 'Dr. Amit Kumar',
    location: 'Online',
    date: 'Feb 10-12, 2026',
    duration: '3 days',
    participants: 85,
    maxParticipants: 100,
    level: 'Intermediate',
    topics: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Hands-on workshop covering supervised and unsupervised learning algorithms.',
    instructor: 'Prof. Priya Sharma',
    location: 'IIT Delhi',
    date: 'Feb 15-16, 2026',
    duration: '2 days',
    participants: 60,
    maxParticipants: 80,
    level: 'Beginner',
    topics: ['Python', 'Scikit-learn', 'Data Preprocessing', 'Model Evaluation'],
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Learn design thinking, prototyping, and user research methodologies.',
    instructor: 'Sarah Williams',
    location: 'Online',
    date: 'Feb 20-21, 2026',
    duration: '2 days',
    participants: 45,
    maxParticipants: 60,
    level: 'Beginner',
    topics: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  },
  {
    id: '4',
    title: 'Cloud Computing with AWS',
    description: 'Deep dive into AWS services, deployment, and cloud architecture patterns.',
    instructor: 'Rahul Verma',
    location: 'Bangalore Tech Park',
    date: 'Feb 25-27, 2026',
    duration: '3 days',
    participants: 70,
    maxParticipants: 100,
    level: 'Advanced',
    topics: ['AWS EC2', 'S3', 'Lambda', 'CloudFormation'],
  },
];

const levelColors = {
  Beginner: { bg: 'bg-green-100', text: 'text-green-700' },
  Intermediate: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Advanced: { bg: 'bg-red-100', text: 'text-red-700' },
};

export function WorkshopsPage() {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
  });

  // Real-time data fetching from Firebase
  useEffect(() => {
    setLoading(true);
    const workshopsQuery = query(
      collection(db, 'opportunities'),
      where('type', '==', 'workshop')
    );

    const unsubscribe = onSnapshot(
      workshopsQuery,
      (snapshot) => {
        const workshopsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Workshop[];
        setWorkshops(workshopsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching workshops:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleRegisterClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsRegistering(true);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Registration successful for ${selectedWorkshop?.title}!`);
    setIsRegistering(false);
    setFormData({ name: '', email: '', phone: '', college: '' });
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
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-pink-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">Workshops</h2>
              <p className="text-gray-600 mt-1">{workshops.length} hands-on learning experiences</p>
            </div>
          </div>
        </div>

        {/* Workshops Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading workshops...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {workshops.map((workshop) => {
              const levelColor = workshop.level ? levelColors[workshop.level] : levelColors.Beginner;

              return (
                <div
                  key={workshop.id}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-7 h-7 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-2xl font-bold text-gray-800">
                              {workshop.title}
                            </h3>
                            {workshop.level && (
                              <span className={`${levelColor.bg} ${levelColor.text} px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0 ml-4`}>
                                {workshop.level}
                              </span>
                            )}
                          </div>
                          {workshop.instructor && (
                            <p className="text-gray-600 font-medium mb-2">by {workshop.instructor}</p>
                          )}
                          {workshop.company && (
                            <p className="text-gray-600 font-medium mb-2">{workshop.company}</p>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {workshop.description}
                      </p>

                      {workshop.topics && workshop.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {workshop.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-2xl p-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-xs text-gray-500">Location</div>
                              <div className="font-semibold text-gray-800">{workshop.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-xs text-gray-500">Date</div>
                              <div className="font-semibold text-gray-800">{workshop.date || 'TBA'}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="text-xs text-gray-500">Duration</div>
                              <div className="font-semibold text-gray-800">{workshop.duration || 'N/A'}</div>
                            </div>
                          </div>
                        </div>

                        {workshop.participants !== undefined && workshop.maxParticipants !== undefined && (
                          <div>
                            {(() => {
                              const spotsLeft = workshop.maxParticipants - (workshop.participants || 0);
                              const progressPercent = ((workshop.participants || 0) / workshop.maxParticipants) * 100;
                              return (
                                <>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Participants: {workshop.participants} / {workshop.maxParticipants}</span>
                                    <span className={`font-semibold ${spotsLeft < 20 ? 'text-red-600' : 'text-green-600'}`}>
                                      {spotsLeft} spots left
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all"
                                      style={{ width: `${progressPercent}%` }}
                                    ></div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        )}
                        {workshop.price && (
                          <div className="mt-3">
                            <span className="text-gray-600">Price: </span>
                            <span className="font-semibold text-blue-600">{workshop.price}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => handleRegisterClick(workshop)}
                        className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Register Now
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {workshops.length === 0 && (
              <div className="text-center py-20">
                <Sparkles className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No workshops available</h3>
                <p className="text-gray-600 mb-4">Workshops will appear here once they're added.</p>
                <SeedDataButton />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Registration Dialog */}
      <Dialog open={isRegistering} onOpenChange={setIsRegistering}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Register for Workshop</DialogTitle>
            <DialogDescription>
              {selectedWorkshop?.title}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitRegistration} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@university.edu"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="college">College Name</Label>
              <Input
                id="college"
                required
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="Enter your college name"
                className="mt-1.5"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-6 rounded-xl font-semibold"
            >
              Complete Registration
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
