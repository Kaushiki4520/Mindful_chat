'use server';
/**
 * @fileOverview An AI flow to analyze a user's mood history and provide insights.
 *
 * - analyzeMoodHistory - A function that handles the mood history analysis.
 * - AnalyzeMoodHistoryInput - The input type for the analyzeMoodHistory function.
 * - AnalyzeMoodHistoryOutput - The return type for the analyzeMoodHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodEntrySchema = z.object({
    mood: z.string().describe("The user's selected mood, likely an emoji."),
    note: z.string().describe("A short note provided by the user about their mood."),
    date: z.string().describe("The date of the mood entry."),
});

const AnalyzeMoodHistoryInputSchema = z.object({
  moodHistory: z.array(MoodEntrySchema).describe('An array of past mood entries.'),
});
export type AnalyzeMoodHistoryInput = z.infer<typeof AnalyzeMoodHistoryInputSchema>;

const AnalyzeMoodHistoryOutputSchema = z.object({
  analysis: z.string().describe('A thoughtful analysis of the mood history, identifying patterns, trends, or potential triggers.'),
  tips: z.array(z.string()).describe('A list of actionable, supportive tips based on the analysis.'),
  disclaimer: z.string().describe('A clear disclaimer that this is not a medical diagnosis.'),
});
export type AnalyzeMoodHistoryOutput = z.infer<typeof AnalyzeMoodHistoryOutputSchema>;

export async function analyzeMoodHistory(input: AnalyzeMoodHistoryInput): Promise<AnalyzeMoodHistoryOutput> {
  return analyzeMoodHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMoodHistoryPrompt',
  input: {schema: AnalyzeMoodHistoryInputSchema},
  output: {schema: AnalyzeMoodHistoryOutputSchema},
  prompt: `You are a supportive AI assistant for a mental wellness app. A user has provided their mood history. Your task is to provide a gentle and insightful analysis of their logged moods.

  IMPORTANT: You are NOT a doctor. You MUST NOT provide a medical diagnosis. Your response should be framed as helpful observations and gentle suggestions.

  User's Mood History:
  {{#each moodHistory}}
  - On {{date}}, I felt {{mood}} and wrote: "{{note}}"
  {{/each}}

  Based on this history:
  1.  Provide a thoughtful 'analysis'. Look for patterns. For example: "I notice you've felt worried on days you mentioned work. It's understandable that professional stress can impact our feelings." or "It seems like you often feel happy after mentioning spending time outdoors, which is wonderful."
  2.  Provide a few actionable 'tips'. These should be supportive and directly related to the analysis. For example: "When you feel worried, a short 5-minute walk can sometimes help clear your mind." or "Perhaps scheduling some more outdoor time on weekends could be a nice way to boost your mood."
  3.  Always include the following 'disclaimer': "This is just an observation based on the moods you've shared. For a deeper understanding of your mental health, consider talking to a qualified professional."
  `,
});

const analyzeMoodHistoryFlow = ai.defineFlow(
  {
    name: 'analyzeMoodHistoryFlow',
    inputSchema: AnalyzeMoodHistoryInputSchema,
    outputSchema: AnalyzeMoodHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
