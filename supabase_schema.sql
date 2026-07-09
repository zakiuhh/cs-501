-- 1. DROP ALL OLD TABLES IN THE PUBLIC SCHEMA
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

-- 2. CREATE CERTIFICATES TABLE
CREATE TABLE public.certificates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  course TEXT NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- 4. CREATE POLICIES FOR ANONYMOUS ACCESS
CREATE POLICY "Allow public read access"
ON public.certificates
FOR SELECT
USING (true);

CREATE POLICY "Allow public insert access"
ON public.certificates
FOR INSERT
WITH CHECK (true);
