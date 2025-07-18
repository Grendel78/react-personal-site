-- Create contact submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    client_ip TEXT,
    user_agent TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS (Row Level Security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy - only service role can access (for admin purposes)
CREATE POLICY "Only service role can access contact submissions" 
ON contact_submissions 
FOR ALL 
TO service_role 
USING (true);

-- Create index for performance
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);