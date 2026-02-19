
-- Create favorites table
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Unique constraint to prevent duplicates
ALTER TABLE public.favorites ADD CONSTRAINT favorites_user_product_unique UNIQUE (user_id, product_id);

-- Enable RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);
