
'use server';
import { diagnoseSymptoms, type DiagnoseSymptomsOutput } from '@/ai/flows/diagnose-symptoms';
import { analyzeMoodHistory, type AnalyzeMoodHistoryInput, type AnalyzeMoodHistoryOutput } from '@/ai/flows/analyze-mood-history';


export async function getSymptomAnalysis(symptoms: string): Promise<DiagnoseSymptomsOutput> {
    const result = await diagnoseSymptoms({ symptoms });
    return result;
}

export async function analyzeMoodHistoryAction(moodHistory: AnalyzeMoodHistoryInput['moodHistory']): Promise<AnalyzeMoodHistoryOutput> {
    const result = await analyzeMoodHistory({ moodHistory });
    return result;
}
