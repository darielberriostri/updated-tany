/*
  # Create Lead Submissions Table

  1. New Tables
    - `lead_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `full_name` (text) - Full name of the contact
      - `business_email` (text) - Business email address
      - `phone_number` (text) - Contact phone number
      - `website_url` (text, nullable) - Optional website URL
      - `company_name` (text) - Name of the company
      - `timeline` (text) - Project timeline preference
      - `message` (text, nullable) - Optional message from the contact
      - `created_at` (timestamptz) - Timestamp of submission
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `lead_submissions` table
    - Add policy for inserting lead submissions (public access for form submissions)
    - Add policy for authenticated users to view submissions
*/

CREATE TABLE IF NOT EXISTS lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_email text NOT NULL,
  phone_number text NOT NULL,
  website_url text,
  company_name text NOT NULL,
  timeline text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON lead_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON lead_submissions
  FOR SELECT
  TO authenticated
  USING (true);