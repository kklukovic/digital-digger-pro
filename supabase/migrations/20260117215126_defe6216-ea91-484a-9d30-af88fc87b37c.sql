-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;

-- Create a restrictive SELECT policy (no direct user access - only service_role can read)
-- This ensures leads are only accessible server-side (edge functions, admin tools)
CREATE POLICY "No direct user access to leads"
ON public.leads
FOR SELECT
USING (false);

-- Add explicit UPDATE policy to prevent modifications
CREATE POLICY "No updates allowed on leads"
ON public.leads
FOR UPDATE
USING (false);

-- Add explicit DELETE policy to prevent deletions
CREATE POLICY "No deletions allowed on leads"
ON public.leads
FOR DELETE
USING (false);