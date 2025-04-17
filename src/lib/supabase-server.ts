import { createClient } from '@/utils/supabase/server';

// This function should only be used in Server Components or API Routes
export async function getServerSupabase() {
  return await createClient();
}
