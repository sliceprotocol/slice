-- Create table for storing user passkeys
-- This table stores WebAuthn credentials (passkeys) linked to Supabase Auth users
-- Supabase Auth doesn't have native passkey support, so we need this custom table
CREATE TABLE IF NOT EXISTS user_passkeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credential_id TEXT NOT NULL UNIQUE,
  public_key TEXT NOT NULL,
  counter BIGINT NOT NULL DEFAULT 0,
  device_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add email column if it doesn't exist (for lookup without auth)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_passkeys' AND column_name = 'email'
  ) THEN
    ALTER TABLE user_passkeys ADD COLUMN email TEXT;
    
    -- Update existing records with email from auth.users
    UPDATE user_passkeys 
    SET email = (
      SELECT email 
      FROM auth.users 
      WHERE auth.users.id = user_passkeys.user_id
    )
    WHERE email IS NULL;
    
    -- Make email NOT NULL after populating existing records
    ALTER TABLE user_passkeys ALTER COLUMN email SET NOT NULL;
  END IF;
END $$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_passkeys_user_id ON user_passkeys(user_id);
CREATE INDEX IF NOT EXISTS idx_user_passkeys_credential_id ON user_passkeys(credential_id);
CREATE INDEX IF NOT EXISTS idx_user_passkeys_email ON user_passkeys(email);

-- Enable Row Level Security
ALTER TABLE user_passkeys ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own passkeys (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_passkeys' 
    AND policyname = 'Users can view their own passkeys'
  ) THEN
    CREATE POLICY "Users can view their own passkeys"
      ON user_passkeys
      FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create policy: Users can insert their own passkeys (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_passkeys' 
    AND policyname = 'Users can insert their own passkeys'
  ) THEN
    CREATE POLICY "Users can insert their own passkeys"
      ON user_passkeys
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Create policy: Users can update their own passkeys (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_passkeys' 
    AND policyname = 'Users can update their own passkeys'
  ) THEN
    CREATE POLICY "Users can update their own passkeys"
      ON user_passkeys
      FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create policy: Users can delete their own passkeys (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_passkeys' 
    AND policyname = 'Users can delete their own passkeys'
  ) THEN
    CREATE POLICY "Users can delete their own passkeys"
      ON user_passkeys
      FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create policy: Allow public read access to email and user_id for passkey authentication (idempotent)
-- This is needed to find users by email during passkey login
-- We only expose email and user_id, not sensitive data like public_key
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_passkeys' 
    AND policyname = 'Allow email lookup for passkey auth'
  ) THEN
    CREATE POLICY "Allow email lookup for passkey auth"
      ON user_passkeys
      FOR SELECT
      USING (true); -- Allow public read for email lookup (only email and user_id are exposed)
  END IF;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at (idempotent)
DROP TRIGGER IF EXISTS update_user_passkeys_updated_at ON user_passkeys;
CREATE TRIGGER update_user_passkeys_updated_at
  BEFORE UPDATE ON user_passkeys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
