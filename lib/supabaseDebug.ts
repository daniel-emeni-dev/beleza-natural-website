'use server';

export async function testSupabaseConnection() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('[v0] Supabase Connection Debug:');
  console.log('[v0] URL:', url ? `✓ Set (${url.substring(0, 20)}...)` : '✗ Missing');
  console.log('[v0] Key:', key ? `✓ Set (${key.substring(0, 20)}...)` : '✗ Missing');

  if (!url || !key) {
    throw new Error('Supabase environment variables are not properly configured');
  }

  try {
    // Try to fetch the Supabase health endpoint
    const response = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': key
      }
    });

    console.log('[v0] Supabase connection test status:', response.status);
    return {
      status: 'connected',
      statusCode: response.status,
      url: url
    };
  } catch (error: any) {
    console.error('[v0] Connection test failed:', error.message);
    return {
      status: 'error',
      error: error.message,
      url: url
    };
  }
}
