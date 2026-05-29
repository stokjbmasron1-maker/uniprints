create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'Colorized Deck Box',
  color text not null,
  color_hex text not null,
  price_idr integer not null check (price_idr >= 0),
  price_usd integer not null default 30 check (price_usd >= 0),
  stock integer not null default 0 check (stock >= 0),
  front_image_url text not null,
  back_image_url text not null,
  description text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  whatsapp text not null,
  address text not null,
  notes text,
  items jsonb not null,
  total_idr integer not null check (total_idr >= 0),
  status text not null default 'new' check (status in ('new', 'confirmed', 'paid', 'shipped', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.products
  add column if not exists price_usd integer not null default 30 check (price_usd >= 0);

alter table public.products enable row level security;
alter table public.orders enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert on public.orders to anon, authenticated;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products
  for select
  using (is_active = true);

drop policy if exists "Public can create new orders" on public.orders;
create policy "Public can create new orders"
  on public.orders
  for insert
  with check (status = 'new');

insert into public.products
  (slug, name, category, color, color_hex, price_idr, price_usd, stock, front_image_url, back_image_url, description, sort_order, is_active)
values
  ('red-colorized-deck-box', 'Colorized Deck Box - Red', 'Colorized Deck Box', 'Red', '#c4162a', 250000, 30, 12, 'assets/red-front.jpeg', 'assets/red-back-side.jpeg', 'Finish merah glossy dengan tekstur tegas untuk display kartu favorit.', 10, true),
  ('orange-colorized-deck-box', 'Colorized Deck Box - Orange', 'Colorized Deck Box', 'Orange', '#e77817', 250000, 30, 12, 'assets/orange-front.jpeg', 'assets/orange-back-side.jpeg', 'Warna oranye terang untuk koleksi yang mudah terlihat di meja main.', 20, true),
  ('yellow-colorized-deck-box', 'Colorized Deck Box - Yellow', 'Colorized Deck Box', 'Yellow', '#f5c22a', 250000, 30, 12, 'assets/yellow-front.jpeg', 'assets/yellow-back-side.jpeg', 'Deck box kuning solid dengan tampilan cerah dan clean.', 30, true),
  ('green-colorized-deck-box', 'Colorized Deck Box - Green', 'Colorized Deck Box', 'Green', '#129c5a', 250000, 30, 12, 'assets/green-front.jpeg', 'assets/green-back-side.jpeg', 'Hijau bold untuk deck utama, side deck, atau display koleksi.', 40, true),
  ('blue-colorized-deck-box', 'Colorized Deck Box - Blue', 'Colorized Deck Box', 'Blue', '#1546e0', 250000, 30, 12, 'assets/blue-front.jpeg', 'assets/blue-back-side.jpeg', 'Biru elektrik dengan tekstur glossy yang kuat di foto maupun langsung.', 50, true),
  ('purple-colorized-deck-box', 'Colorized Deck Box - Purple', 'Colorized Deck Box', 'Purple', '#6c3ab7', 250000, 30, 12, 'assets/purple-front.jpeg', 'assets/purple-back-side.jpeg', 'Ungu solid untuk tampilan deck box yang lebih standout.', 60, true)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  color = excluded.color,
  color_hex = excluded.color_hex,
  price_idr = excluded.price_idr,
  price_usd = excluded.price_usd,
  stock = excluded.stock,
  front_image_url = excluded.front_image_url,
  back_image_url = excluded.back_image_url,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
