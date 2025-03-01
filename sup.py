from supabase import Client 

SUPABASE_URL = "https://hmpljnowqbipwnjscptb.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtcGxqbm93cWJpcHduanNjcHRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzM5ODIzNCwiZXhwIjoyMDUyOTc0MjM0fQ.1HN9-2uiYwaLT59tkwvzGSCT3qn_3Ac6Jqh6B3URK6s"
supabase: Client = Client(SUPABASE_URL, SUPABASE_KEY)

results = supabase.table("posts").select("*").execute()
print(results)