import { createClient } from '@supabase/supabase-js';

// Import the Supabase client

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create a Supabase client instance
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;