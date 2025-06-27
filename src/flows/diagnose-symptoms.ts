'use server';
/**
 * @fileOverview An AI flow to provide a general analysis of described symptoms.
 *
 * - diagnoseSymptoms - A function that handles the symptom analysis process.
 * - DiagnoseSymptomsInput - The input type for the diagnoseSymptoms function.
 * - DiagnoseSymptomsOutput - The return type for the diagnoseSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseSymptomsInputSchema = z.object({
  symptoms: z.string().describe('A description of the symptoms the user is experiencing.'),
});
export type DiagnoseSymptomsInput = z.infer<typeof DiagnoseSymptomsInputSchema>;

const DiagnoseSymptomsOutputSchema = z.object({
  analysis: z.string().describe('A thoughtful analysis of the provided symptoms, identifying potential areas of concern.'),
  possibleConditions: z.array(z.string()).describe('A list of potential, non-clinical terms or conditions related to the symptoms.'),
  disclaimer: z.string().describe('A clear disclaimer that this is not a medical diagnosis.'),
});
export type DiagnoseSymptomsOutput = z.infer<typeof DiagnoseSymptomsOutputSchema>;

export async function diagnoseSymptoms(input: DiagnoseSymptomsInput): Promise<DiagnoseSymptomsOutput> {
  return diagnoseSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseSymptomsPrompt',
  input: {schema: DiagnoseSymptomsInputSchema},
  output: {schema: DiagnoseSymptomsOutputSchema},
  prompt: `You are a helpful AI assistant for a mental wellness app. A user has provided a description of their symptoms. Your task is to provide a supportive and informative analysis.

  IMPORTANT: You are NOT a doctor. You MUST NOT provide a medical diagnosis. Your response should be framed as helpful information and gentle suggestions.

  User-described symptoms:
  "{{{symptoms}}}"

  Based on these symptoms:
  1.  Provide a thoughtful 'analysis'. It should validate the user's feelings and explain in simple terms what might be going on (e.g., "It sounds like you're dealing with a lot of stress and worry, which can be very draining.").
  2.  Identify a few 'possibleConditions' in simple terms (e.g., "High Stress Levels", "Symptoms of Burnout", "Anxious Feelings"). Do not use clinical diagnostic terms like "Generalized Anxiety Disorder".
  3.  Always include the following 'disclaimer': "This is not a medical diagnosis. It's important to consult with a healthcare professional for an accurate diagnosis and treatment plan. This analysis is for informational purposes only."
  `,
});

const diagnoseSymptomsFlow = ai.defineFlow(
  {
    name: 'diagnoseSymptomsFlow',
    inputSchema: DiagnoseSymptomsInputSchema,
    outputSchema: DiagnoseSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
