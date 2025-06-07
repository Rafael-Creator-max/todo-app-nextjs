// src/supabase-client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'supabase-service-key'

export const supabase = createClient(supabaseUrl, supabaseServiceKey)
