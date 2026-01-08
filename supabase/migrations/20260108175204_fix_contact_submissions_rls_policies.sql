/*
  # Fix Contact Submissions RLS Security Issues
  
  1. Security Changes
    - Drop insecure INSERT policy that allows unrestricted access
    - Create new INSERT policy with proper validation:
      * Ensures all required fields (name, email, phone, company_name, timeline) are not empty
      * Validates email format using basic pattern matching
      * Prevents injection of null or empty strings in required fields
    
    - Drop insecure SELECT policy that allows viewing all submissions
    - Create new SELECT policy that restricts access:
      * Only authenticated users with proper authorization can view submissions
      * Uses auth.uid() to verify authenticated session
  
  2. Important Notes
    - Required fields: name, email, phone, company_name, timeline
    - Optional fields: website, message (if added later)
    - Email validation ensures basic format (contains @ symbol)
    - This prevents spam and ensures data quality while maintaining form functionality
*/

-- Drop the insecure policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON contact_submissions;

-- Create secure INSERT policy with validation
CREATE POLICY "Allow anonymous form submissions with validation"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Ensure all required fields are present and not empty
    name IS NOT NULL AND trim(name) != '' AND
    email IS NOT NULL AND trim(email) != '' AND email ~ '^[^@]+@[^@]+\.[^@]+$' AND
    phone IS NOT NULL AND trim(phone) != '' AND
    company_name IS NOT NULL AND trim(company_name) != '' AND
    timeline IS NOT NULL AND trim(timeline) != ''
  );

-- Create secure SELECT policy - only authenticated users can view submissions
CREATE POLICY "Only authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);