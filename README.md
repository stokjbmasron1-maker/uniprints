# UniPrints

Single-product storefront untuk jualan `Colorized Deck Box`, siap deploy ke Vercel dan tersambung ke Supabase REST API.

Nomor WhatsApp checkout: `6281998190083`.

## Struktur

- `index.html`, `styles.css`, `app.js`, `icons.js`: UI produk, pilihan warna, jumlah, deteksi lokasi, dan WhatsApp checkout.
- `assets/`: logo dan foto produk dari folder WhatsApp.
- `api/config.js`: endpoint Vercel untuk membaca env Supabase.
- `api/location.js`: endpoint Vercel untuk membaca geo header pengunjung.
- `supabase/schema.sql`: schema, RLS policy, dan seed produk.
- `server.js`: server lokal tanpa dependency.

## Jalankan lokal

```bash
npm run dev
```

Buka `http://localhost:4173`.

Tanpa env Supabase, website berjalan dengan data produk lokal dan checkout tetap direct ke WhatsApp.

## Test region sementara

Pakai query URL ini untuk simulasi lokasi tanpa VPN. Override tersimpan sementara di tab browser lewat `sessionStorage`.
Kalau dev server memakai port lain, misalnya `4174`, ganti port di contoh URL.

```text
http://localhost:4173/?country=US&region=California&city=Los%20Angeles
http://localhost:4173/?country=ID&region=DKI%20Jakarta&city=Jakarta
http://localhost:4173/?clearRegion=1
```

Selama override aktif, harga, pilihan negara checkout, dan format WhatsApp mengikuti negara test tersebut.

Harga default:

- Indonesia: `Rp250.000`
- Luar Indonesia: `$30`

Format WhatsApp:

- Indonesia: `Halo kak, Saya ingin membeli "nama product" sebanyak "jumlah product" Lokasi saya : "lokasi"`
- Luar Indonesia: `Hello, I would like to buy "product name" quantity "quantity". My location: "location"`

## Setup Supabase

1. Buat project Supabase.
2. Buka SQL Editor.
3. Jalankan isi `supabase/schema.sql`.
4. Ambil `Project URL` dan `anon public key` dari Project Settings > API.

RLS sudah aktif:

- Produk hanya bisa dibaca publik saat `is_active = true`.
- Order publik hanya bisa dibuat dengan status `new`.

## Deploy Vercel

Set environment variable di Vercel:

```text
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

Lalu deploy folder ini. Vercel akan menyajikan file statis dan endpoint `/api/config`.

## Ubah harga atau stok

Edit data di Supabase table `products`, terutama kolom:

- `price_idr`
- `price_usd`
- `stock`
- `is_active`

Seed awal memakai harga `250000` dan `30` USD per warna.
