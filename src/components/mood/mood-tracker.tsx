'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, parseISO, startOfToday } from 'date-fns';
import { AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { analyzeMoodHistoryAction } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { AnalyzeMoodHistoryOutput } from '@/ai/flows/analyze-mood-history';

const formSchema = z.object({
  note: z.string().max(500, 'Note must be 500 characters or less.').optional(),
});

type MoodEntry = {
  mood: string;
  note: string;
  date: string; // ISO 8601 format
};

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '🙂', label: 'Content' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😟', label: 'Worried' },
  { emoji: '😠', label: 'Angry' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeMoodHistoryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('moodHistory');
      if (storedHistory) {
        const history: MoodEntry[] = JSON.parse(storedHistory);
        setMoodHistory(history);
        const today = startOfToday();
        const hasLogged = history.some(entry => new Date(entry.date).toDateString() === today.toDateString());
        setHasLoggedToday(hasLogged);
      }
    } catch (e) {
      console.error("Could not parse mood history from localStorage", e);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { note: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedMood) {
      form.setError('root', { message: 'Please select a mood.' });
      return;
    }
    const newEntry: MoodEntry = {
      mood: selectedMood,
      note: values.note || '',
      date: new Date().toISOString(),
    };
    const updatedHistory = [newEntry, ...moodHistory];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    setHasLoggedToday(true);
    form.reset();
    setSelectedMood(null);
  };
  
  const handleGetAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const historyForAnalysis = moodHistory.map(h => ({ ...h, mood: `${h.mood} (${moods.find(m => m.emoji === h.mood)?.label})`}));

    try {
      const result = await analyzeMoodHistoryAction(historyForAnalysis);
      setAnalysisResult(result);
    } catch (e) {
        setError('An error occurred while analyzing your mood history. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      {!hasLoggedToday ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormLabel>How are you feeling today?</FormLabel>
              <div className="flex justify-around p-4 mt-2 rounded-lg bg-muted/50">
                {moods.map(({ emoji, label }) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setSelectedMood(emoji)}
                    className={`text-4xl p-2 rounded-full transition-transform transform hover:scale-125 ${selectedMood === emoji ? 'bg-primary/20 scale-125' : ''}`}
                    aria-label={label}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.root.message}</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add a note (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What's on your mind?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Save Today's Mood</Button>
          </form>
        </Form>
      ) : (
        <div className="text-center p-6 bg-secondary rounded-lg">
          <p className="font-semibold text-secondary-foreground">You've already logged your mood today. Great job!</p>
          <p className="text-sm text-muted-foreground mt-1">Come back tomorrow to track again.</p>
        </div>
      )}

      {moodHistory.length > 0 && (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold font-headline">Your Mood History</h3>
                {moodHistory.length >= 3 && (
                    <Button variant="outline" onClick={handleGetAnalysis} disabled={isLoading}>
                         {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                        Analyze My Moods
                    </Button>
                )}
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Analysis Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {analysisResult && (
                <Card className="mt-6 bg-background/70">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="text-accent" />
                        Mood Analysis
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Our Observations</h3>
                        <p className="text-muted-foreground">{analysisResult.analysis}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Suggestions for You</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {analysisResult.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                        ))}
                        </ul>
                    </div>
                    </CardContent>
                    <CardFooter>
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Important Disclaimer</AlertTitle>
                            <AlertDescription>{analysisResult.disclaimer}</AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>
            )}


            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {moodHistory.map((entry) => (
                    <div key={entry.date} className="p-4 border rounded-lg flex items-start gap-4">
                        <span className="text-3xl mt-1">{entry.mood}</span>
                        <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">{format(parseISO(entry.date), 'MMMM d, yyyy')}</p>
                            <p className="text-muted-foreground text-sm">{entry.note || "No note added."}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
