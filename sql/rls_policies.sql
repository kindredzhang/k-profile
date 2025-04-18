-- Enable Row Level Security on photos table
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to photos
CREATE POLICY "Public can read photos" 
ON photos
FOR SELECT 
TO anon
USING (true);

-- Allow authenticated users to insert photos
CREATE POLICY "Authenticated users can insert photos" 
ON photos
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update and delete photos
CREATE POLICY "Authenticated users can update and delete photos" 
ON photos
FOR ALL 
TO authenticated
USING (true);
