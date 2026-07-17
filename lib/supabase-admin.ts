import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * This client uses the SERVICE ROLE key and therefore bypasses Row Level
 * Security entirely. It must only ever be imported from server-side code:
 * Server Actions, Route Handlers, or Server Components. The "server-only"
 * import above will throw a build error if it's ever pulled into a
 * client bundle.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client is missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type TradeInquiry = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  project_details: string;
};
