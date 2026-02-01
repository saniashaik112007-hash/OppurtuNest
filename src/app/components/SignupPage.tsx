import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';

interface SignupFormData {
  fullName: string;
  email: string;
  course: string;
  branch: string;
  skills: string;
  interests: string;
  collegeName: string;
  collegeLocation: string;
}

export function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    course: '',
    branch: '',
    skills: '',
    interests: '',
    collegeName: '',
    collegeLocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage to simulate profile storage
    localStorage.setItem('studentProfile', JSON.stringify(formData));
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Opportunest
          </h1>
          <p className="text-gray-600 mt-2">Your complete learning & career platform</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Your Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@university.edu"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                name="course"
                type="text"
                required
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g., B.Tech, M.Sc"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                name="branch"
                type="text"
                required
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="skills">
                Skills <span className="text-gray-400 text-sm">(optional)</span>
              </Label>
              <Textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Python, React, Machine Learning"
                className="mt-1.5 resize-none"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="interests">Interests</Label>
              <Textarea
                id="interests"
                name="interests"
                required
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g., Web Development, AI/ML, Design"
                className="mt-1.5 resize-none"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                name="collegeName"
                type="text"
                required
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter your college name"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="collegeLocation">College Location</Label>
              <Input
                id="collegeLocation"
                name="collegeLocation"
                type="text"
                required
                value={formData.collegeLocation}
                onChange={handleChange}
                placeholder="Enter your college location"
                className="mt-1.5"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Create Profile
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Join thousands of students finding their perfect opportunities
          </p>
        </div>
      </div>
    </div>
  );
}