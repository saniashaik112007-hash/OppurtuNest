import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { seedFirebaseData } from '@/lib/firebaseData';
import { toast } from 'sonner';
import { Database } from 'lucide-react';

export function SeedDataButton() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const success = await seedFirebaseData();
      if (success) {
        toast.success('Firebase data seeded successfully!');
      } else {
        toast.error('Failed to seed data. Check console for errors.');
      }
    } catch (error) {
      console.error('Seeding error:', error);
      toast.error('Error seeding data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSeed}
      disabled={loading}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Database className="w-4 h-4" />
      {loading ? 'Seeding Data...' : 'Seed Firebase Data'}
    </Button>
  );
}

