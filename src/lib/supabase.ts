import { createClient } from '@/utils/supabase/client';

// This is a client-side Supabase instance that can be used in client components
const supabase = createClient();
export { supabase };
