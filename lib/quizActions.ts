'use server';

import { supabase } from './supabase';
import { z } from 'zod';

// Strict runtime validation schema matching your database requirements
const QuizSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters long').trim(),
  phoneNumber: z.string().min(7, 'Please enter a valid contact number').trim(),
  hairType: z.enum(['4C', '4B', '4A', '3C', '3B', '3A', '2C', '2B', '2A', '1C', '1B', '1A']),
  porosity: z.enum(['High', 'Medium', 'Low']),
  scalpIssue: z.string().min(2, 'Please select or enter a valid scalp concern').trim(),
});

// Infer the static Type from our dynamic Zod runtime schema
type QuizInput = z.infer<typeof QuizSchema>;

export async function saveQuizResults(rawInput: QuizInput) {
  try {
    // 1. Defensively validate incoming payload data on the server side
    const validatedData = QuizSchema.parse(rawInput);
    
    console.log('[Server Action] Processing relational layout for:', validatedData.phoneNumber);

    // 2. Query to see if a clinical profile already exists for this contact number
    let { data: profile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone_number', validatedData.phoneNumber)
      .maybeSingle(); // Safely handle 0 or 1 results without throwing errors

    let profileId = profile?.id;

    // 3. If no profile exists, write a new customer row first
    if (!profileId) {
      const { data: newProfile, error: profileInsertError } = await supabase
        .from('profiles')
        .insert([
          {
            full_name: validatedData.fullName,
            phone_number: validatedData.phoneNumber,
          }
        ])
        .select('id')
        .single();

      if (profileInsertError) {
        console.error('[DB Error] Profile generation failure:', profileInsertError);
        return { success: false, error: 'Failed to create customer record.' };
      }
      
      profileId = newProfile.id;
    }

    // 4. Safely map the diagnostic submission to the profile via its relational ID
    const { data: diagnosticRecord, error: diagnosticError } = await supabase
      .from('hair_diagnostics')
      .insert([
        {
          profile_id: profileId,
          hair_type: validatedData.hairType,
          porosity: validatedData.porosity,
          scalp_issue: validatedData.scalpIssue,
        }
      ])
      .select();

    if (diagnosticError) {
      console.error('[DB Error] Diagnostic mapping execution failure:', diagnosticError);
      return { success: false, error: 'Failed to securely map diagnostic records.' };
    }

    // Return exact success payload to the frontend
    return { success: true, data: diagnosticRecord };

  } catch (error: any) {
    // Catch standard validation errors thrown by Zod
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    
    // DIAGNOSTIC UPDATE: Send the exact crash reason back to the frontend UI
    console.error('[Server Exception] Critical Crash:', error);
    return { 
      success: false, 
      error: `Server Crash: ${error?.message || JSON.stringify(error)}` 
    };
  }
}