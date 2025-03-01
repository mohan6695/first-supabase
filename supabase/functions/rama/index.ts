// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import {createClient} from "@supabase/supabase-js"
console.log("Hello from Functions!")


const supabase = createClient(
  Deno.env.get("https://hmpljnowqbipwnjscptb.supabase.co")!,
  Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtcGxqbm93cWJpcHduanNjcHRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzM5ODIzNCwiZXhwIjoyMDUyOTc0MjM0fQ.1HN9-2uiYwaLT59tkwvzGSCT3qn_3Ac6Jqh6B3URK6s")!,);


Deno.serve(async (req) => {
  const { data:post_text, error} = await supabase.from("posts").select("post_text")
  const data = {
    message: `Hello ${post_text?.post_text}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/rama' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
