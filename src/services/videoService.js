import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xhndpxroeuzjioecdmhk.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhobmRweHJvZXV6amlvZWNkbWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTkxODMsImV4cCI6MTk4Mzc3NTE4M30.9XcmT9DW-044lnaUO9oc7VMwJ0ZRUyRrAmsXTZFgXfU"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
            .select("*")
            
        }
    }
}