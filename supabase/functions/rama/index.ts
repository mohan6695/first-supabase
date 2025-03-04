// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import {createClient} from "@supabase/supabase-js"
console.log("Hello from Functions!")


const supabase = createClient(
  Deno.env.get("https://hmpljnowqbipwnjscptb.supabase.co")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,);


Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ msg: "Missing authorization header" }), {
      status: 401,
    });
  }

  const jwtToken = authHeader.split(" ")[1];

  // Verify the token (optional, Supabase does this automatically for RLS)
  const { data: user, error } = await supabase.auth.getUser(jwtToken);
  if (error) {
    return new Response(JSON.stringify({ msg: "Invalid token" }), {
      status: 401,
    });
  }


  const { data:post_text, error} = await supabase.from("posts").select("post_text")
  const data = {
    message: `Hello ${post_text?.[0]?.post_text}!`,
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
