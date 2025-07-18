import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting: store recent submissions in memory (in production, use Redis)
const recentSubmissions = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const submissions = recentSubmissions.get(ip) || [];
  
  // Remove submissions older than 1 hour
  const recentSubmissions_filtered = submissions.filter(time => now - time < 60 * 60 * 1000);
  
  // Allow max 3 submissions per hour
  if (recentSubmissions_filtered.length >= 3) {
    return true;
  }
  
  // Update the submissions
  recentSubmissions_filtered.push(now);
  recentSubmissions.set(ip, recentSubmissions_filtered);
  
  return false;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const containsSpam = (text: string): boolean => {
  const spamKeywords = [
    'buy now', 'click here', 'free money', 'get rich quick',
    'limited time', 'make money fast', 'no obligation',
    'risk free', 'satisfaction guaranteed', 'special promotion'
  ];
  
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { firstName, lastName, email, subject, message, timestamp, userAgent } = await req.json()

    // Validation
    if (!firstName?.trim()) {
      return new Response(
        JSON.stringify({ error: 'First name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!email?.trim() || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!message?.trim() || message.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Message must be at least 10 characters long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Spam detection
    if (containsSpam(message) || containsSpam(subject || '')) {
      return new Response(
        JSON.stringify({ error: 'Message rejected by spam filter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store the contact submission in database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        subject: subject || '',
        message: message,
        client_ip: clientIP,
        user_agent: userAgent,
        submitted_at: timestamp
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send email notification (you'll need to set up your email service)
    const emailBody = `
New contact form submission:

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject || 'No subject'}

Message:
${message}

Submitted at: ${timestamp}
IP: ${clientIP}
User Agent: ${userAgent}
    `

    // You can integrate with Resend, SendGrid, or other email services here
    // For now, we'll just log it
    console.log('New contact submission:', emailBody)

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})