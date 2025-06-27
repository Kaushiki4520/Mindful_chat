import MoodTracker from '@/components/mood/mood-tracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MoodTrackerPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Daily Mood Tracker</CardTitle>
            <CardDescription>
                Track your mood each day to better understand your emotional patterns. Your data is saved securely in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MoodTracker />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
