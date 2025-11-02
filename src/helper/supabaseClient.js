import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://xxcylkqktrxygovtvxjr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4Y3lsa3FrdHJ4eWdvdnR2eGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjQ2OTUsImV4cCI6MjA3NzU0MDY5NX0.M-l_Am7nNAdpAws5ToEizHD4rXCSlKfydPYHT6Zqp7M"

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;