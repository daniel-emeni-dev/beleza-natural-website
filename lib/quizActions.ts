'use server';

import { supabase } from './supabase';

interface QuizData {
  fullName: string;
  phoneNumber: string;
  hairType: string;
  porosity: string;
  scalpIssue: string;
}

export async function saveQuizResults(data: QuizData) {
  try {
    console.log('[v0] Saving quiz results:', data);

    const { data: result, error } = await supabase
      .from('hair_diagnostics')
      .insert([
        {
          full_name: data.fullName,
          phone_number: data.phoneNumber,
          hair_type: data.hairType,
          porosity: data.porosity,
          scalp_issue: data.scalpIssue,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('[v0] Supabase error:', error);
      const errorMsg = error.message || 'Unknown database error';
      const errorCode = error.code || 'NO_CODE';
      const errorHint = error.hint || 'No additional information';
      throw new Error(`${errorMsg} (Code: ${errorCode}) - ${errorHint}`);
    }

    console.log('[v0] Quiz results saved successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('[v0] Error in saveQuizResults:', error);
    throw error;
  }
}
