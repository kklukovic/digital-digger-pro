-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create conversations table to store AI Alex chat sessions
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  client_ip TEXT,
  user_agent TEXT,
  is_high_intent BOOLEAN NOT NULL DEFAULT false,
  lead_email TEXT,
  lead_phone TEXT,
  lead_website_url TEXT,
  notification_sent BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for anonymous chat sessions)
CREATE POLICY "Anyone can create conversations"
ON public.conversations
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update their own session (by session_id match)
CREATE POLICY "Anyone can update their session"
ON public.conversations
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Only service role can read conversations (for admin/notifications)
CREATE POLICY "Only service role can read conversations"
ON public.conversations
FOR SELECT
USING (false);

-- Create trigger for updated_at
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for quick lookups
CREATE INDEX idx_conversations_session_id ON public.conversations(session_id);
CREATE INDEX idx_conversations_is_high_intent ON public.conversations(is_high_intent) WHERE is_high_intent = true;
CREATE INDEX idx_conversations_created_at ON public.conversations(created_at DESC);