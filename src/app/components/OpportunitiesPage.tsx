import { useParams, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Briefcase, Trophy, DollarSign, Calendar, ExternalLink, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { useState } from 'react';

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
  type: string;
}

// Mock data for different opportunity types
const mockOpportunities: Record<string, Opportunity[]> = {
  internships: [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'Tech Innovations Inc.',
      location: 'Remote',
      duration: '3 months',
      deadline: 'Feb 15, 2026',
      description: 'Work on cutting-edge React applications and collaborate with experienced developers.',
      requirements: ['React', 'TypeScript', 'Tailwind CSS'],
      type: 'Internship',
    },
    {
      id: '2',
      title: 'Data Science Intern',
      company: 'DataCore Analytics',
      location: 'Hybrid - Bangalore',
      duration: '6 months',
      deadline: 'Feb 20, 2026',
      description: 'Analyze large datasets and build machine learning models for business insights.',
      requirements: ['Python', 'Machine Learning', 'SQL'],
      type: 'Internship',
    },
    {
      id: '3',
      title: 'UX/UI Design Intern',
      company: 'Creative Studios',
      location: 'On-site - Mumbai',
      duration: '4 months',
      deadline: 'Feb 28, 2026',
      description: 'Design user-friendly interfaces and create engaging user experiences.',
      requirements: ['Figma', 'Adobe XD', 'User Research'],
      type: 'Internship',
    },
    {
      id: '4',
      title: 'Backend Developer Intern',
      company: 'CloudTech Solutions',
      location: 'Remote',
      duration: '5 months',
      deadline: 'Mar 5, 2026',
      description: 'Build scalable APIs and work with cloud infrastructure.',
      requirements: ['Node.js', 'MongoDB', 'AWS'],
      type: 'Internship',
    },
  ],
  hackathons: [
    {
      id: '1',
      title: 'AI Innovation Hackathon 2026',
      location: 'Online',
      deadline: 'Feb 10, 2026',
      participants: 500,
      prize: '₹5,00,000',
      description: 'Build innovative AI solutions to solve real-world problems. 48-hour coding marathon.',
      requirements: ['AI/ML', 'Python', 'Problem Solving'],
      type: 'Hackathon',
    },
    {
      id: '2',
      title: 'Web3 Builder Challenge',
      location: 'Delhi NCR',
      deadline: 'Feb 18, 2026',
      participants: 300,
      prize: '₹3,00,000',
      description: 'Create decentralized applications using blockchain technology.',
      requirements: ['Blockchain', 'Smart Contracts', 'React'],
      type: 'Hackathon',
    },
    {
      id: '3',
      title: 'Sustainable Tech Hackathon',
      location: 'Pune',
      deadline: 'Mar 1, 2026',
      participants: 400,
      prize: '₹4,00,000',
      description: 'Develop technology solutions for environmental sustainability.',
      requirements: ['Any Tech Stack', 'Innovation', 'Teamwork'],
      type: 'Hackathon',
    },
  ],
  scholarships: [
    {
      id: '1',
      title: 'Merit-Based Scholarship 2026',
      location: 'Pan India',
      amount: '₹50,000',
      deadline: 'Feb 25, 2026',
      description: 'Full academic year scholarship for students with excellent academic performance.',
      requirements: ['85%+ CGPA', 'Financial Need', 'Essay Submission'],
      type: 'Scholarship',
    },
    {
      id: '2',
      title: 'Women in Tech Scholarship',
      location: 'National',
      amount: '₹75,000',
      deadline: 'Mar 10, 2026',
      description: 'Supporting women pursuing careers in technology and engineering.',
      requirements: ['Female Students', 'Tech Field', 'Project Portfolio'],
      type: 'Scholarship',
    },
    {
      id: '3',
      title: 'Research Excellence Grant',
      location: 'International',
      amount: '$5,000',
      deadline: 'Mar 15, 2026',
      description: 'Funding for students conducting innovative research projects.',
      requirements: ['Research Proposal', 'Faculty Recommendation', 'Publication'],
      type: 'Scholarship',
    },
  ],
  events: [
    {
      id: '1',
      title: 'Tech Career Fair 2026',
      location: 'Bangalore',
      deadline: 'Feb 8, 2026',
      participants: 1000,
      description: 'Meet recruiters from top tech companies and explore career opportunities.',
      type: 'Event',
    },
    {
      id: '2',
      title: 'Startup Weekend Workshop',
      location: 'Online',
      deadline: 'Feb 12, 2026',
      participants: 200,
      description: 'Learn how to build and pitch your startup idea to investors.',
      type: 'Event',
    },
    {
      id: '3',
      title: 'Design Thinking Bootcamp',
      location: 'Hyderabad',
      deadline: 'Feb 22, 2026',
      participants: 150,
      description: 'Intensive 3-day workshop on human-centered design principles.',
      type: 'Event',
    },
    {
      id: '4',
      title: 'Cloud Computing Summit',
      location: 'Mumbai',
      deadline: 'Mar 5, 2026',
      participants: 500,
      description: 'Learn about the latest trends in cloud technology from industry experts.',
      type: 'Event',
    },
  ],
};

const categoryConfig: Record<string, { title: string; icon: any; color: string; bgColor: string }> = {
  internships: {
    title: 'Internships',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  hackathons: {
    title: 'Hackathons',
    icon: Trophy,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  scholarships: {
    title: 'Scholarships',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  events: {
    title: 'Events & Opportunities',
    icon: Calendar,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
};

export function OpportunitiesPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
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

  const config = category ? categoryConfig[category] : null;
  const opportunities = category ? mockOpportunities[category] || [] : [];
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
    // In a real app, this would handle the application/registration
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
    // In a real app, this would handle the form submission
    alert(`Application submitted for opportunity ${selectedOpportunity?.id}`);
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
            <div className={`${config.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">{config.title}</h2>
              <p className="text-gray-600 mt-1">{opportunities.length} opportunities available</p>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
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
                    {category === 'internships' && 'Apply Now'}
                    {category === 'hackathons' && 'Register'}
                    {category === 'scholarships' && 'Apply'}
                    {category === 'events' && 'Register'}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {opportunities.length === 0 && (
          <div className="text-center py-20">
            <div className={`${config.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-10 h-10 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No opportunities found</h3>
            <p className="text-gray-600">Check back soon for new {config.title.toLowerCase()}!</p>
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