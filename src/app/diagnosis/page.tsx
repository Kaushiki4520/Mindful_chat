'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getSymptomAnalysis } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { DiagnoseSymptomsOutput } from '@/ai/flows/diagnose-symptoms';

const formSchema = z.object({
  symptoms: z.string().min(20, 'Please describe your symptoms in a bit more detail.').max(2000),
});

export default function DiagnosisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnoseSymptomsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getSymptomAnalysis(values.symptoms);
      setAnalysisResult(result);
    } catch (e) {
      setError('An error occurred while analyzing your symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Symptom Checker</CardTitle>
            <CardDescription>
              Describe how you've been feeling, and our AI assistant will provide some general, non-diagnostic insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Symptoms</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="For example: 'For the past few weeks, I've been feeling constantly on edge, my heart races, and it's hard to concentrate at work...'"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Analyze My Symptoms
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {analysisResult && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" />
                Analysis Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Thoughts</h3>
                <p className="text-muted-foreground">{analysisResult.analysis}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Potential Areas to Explore</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {analysisResult.possibleConditions.map((condition, i) => (
                    <li key={i}>{condition}</li>
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
      </div>
    </div>
  );
}
