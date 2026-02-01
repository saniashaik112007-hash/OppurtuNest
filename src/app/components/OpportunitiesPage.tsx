import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Briefcase, Trophy, DollarSign, Calendar, ExternalLink, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SeedDataButton } from './SeedDataButton';

interface Opportunity {
  id: string;
  title: string;
  company?: string;
  location: string;
  duration?: string;
  deadline: string;
  description: string;
  requirements?: string[];
  participants?: number;
  prize?: string;
  amount?: string;
  salary?: string;
  type: string;
  date?: string;
  instructor?: string;
  price?: string;
  attendees?: string;
  teamSize?: string;
}

const categoryConfig: Record<string, { title: string; icon: any; color: string; bgColor: string; type: string }> = {
  internships: {
    title: 'Internships',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    type: 'internship',
  },
  hackathons: {
    title: 'Hackathons',
    icon: Trophy,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    type: 'hackathon',
  },
  workshops: {
    title: 'Workshops',
    icon: Calendar,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    type: 'workshop',
  },
  events: {
    title: 'Events & Opportunities',
    icon: Calendar,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    type: 'event',
  },
};

export function OpportunitiesPage() {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    resume: '',
    coverLetter: '',
  });

  // Determine category from URL path
  const currentCategory = category || 
    (location.pathname.includes('internships') ? 'internships' :
     location.pathname.includes('hackathons') ? 'hackathons' :
     location.pathname.includes('workshops') ? 'workshops' :
     location.pathname.includes('events') ? 'events' : 'internships');

  const config = categoryConfig[currentCategory];

  // Real-time data fetching from Firebase
  useEffect(() => {
    if (!config) return;

    setLoading(true);
    const opportunitiesQuery = query(
      collection(db, 'opportunities'),
      where('type', '==', config.type)
    );

    const unsubscribe = onSnapshot(
      opportunitiesQuery,
      (snapshot) => {
        const opps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Opportunity[];
        setOpportunities(opps);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching opportunities:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [config?.type]);

  const Icon = config?.icon || Briefcase;

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Category not found</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleAction = (opportunityId: string) => {
    const opportunity = opportunities.find((op) => op.id === opportunityId);
    if (opportunity) {
      setSelectedOpportunity(opportunity);
      setIsApplying(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0].name,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedOpportunity?.title}`);
    setIsApplying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
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
            <div className={`${config.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">{config.title}</h2>
              <p className="text-gray-600 mt-1">
                {loading ? 'Loading...' : `${opportunities.length} opportunities available`}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading opportunities...</p>
          </div>
        )}

        {/* Opportunities List */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${config.bgColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {opportunity.title}
                        </h3>
                        {opportunity.company && (
                          <p className="text-lg text-gray-600 font-medium mb-2">{opportunity.company}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {opportunity.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{opportunity.location}</span>
                      </div>
                      {opportunity.duration && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{opportunity.duration}</span>
                        </div>
                      )}
                      {opportunity.participants && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{opportunity.participants} participants</span>
                        </div>
                      )}
                      {opportunity.date && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{opportunity.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Requirements/Skills */}
                    {opportunity.requirements && opportunity.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.requirements.map((req, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {opportunity.prize && (
                        <div>
                          <span className="text-gray-500">Prize Pool: </span>
                          <span className="font-semibold text-green-600">{opportunity.prize}</span>
                        </div>
                      )}
                      {opportunity.amount && (
                        <div>
                          <span className="text-gray-500">Amount: </span>
                          <span className="font-semibold text-green-600">{opportunity.amount}</span>
                        </div>
                      )}
                      {opportunity.salary && (
                        <div>
                          <span className="text-gray-500">Salary: </span>
                          <span className="font-semibold text-green-600">{opportunity.salary}</span>
                        </div>
                      )}
                      {opportunity.price && (
                        <div>
                          <span className="text-gray-500">Price: </span>
                          <span className="font-semibold text-blue-600">{opportunity.price}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Deadline: </span>
                        <span className="font-semibold text-red-600">{opportunity.deadline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="lg:pt-0 flex-shrink-0">
                    <Button
                      onClick={() => handleAction(opportunity.id)}
                      className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
                    >
                      {currentCategory === 'internships' && 'Apply Now'}
                      {currentCategory === 'hackathons' && 'Register'}
                      {currentCategory === 'workshops' && 'Register'}
                      {currentCategory === 'events' && 'Register'}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && opportunities.length === 0 && (
          <div className="text-center py-20">
            <div className={`${config.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-10 h-10 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No opportunities found</h3>
            <p className="text-gray-600 mb-4">Check back soon for new {config.title.toLowerCase()}!</p>
            <SeedDataButton />
          </div>
        )}
      </main>

      {/* Application Form Dialog */}
      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for {selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to apply for this opportunity.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="college">College/University</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="resume">Resume</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

