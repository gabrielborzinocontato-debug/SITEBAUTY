-- Add address and contact columns to the orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS shipping_full_name TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_phone TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_cep TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_rua TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_numero TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_cidade TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_estado TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS shipping_cpf TEXT NOT NULL DEFAULT '';

-- Optional: Update RLS policies if needed (already broad for authenticated users)
