// ============================================================
// UniPrints — Premium Landing Page JS
// ============================================================

const CATEGORY = "Colorized Deck Box";
const WHATSAPP_NUMBER = "6281998190083";
const DOMESTIC_PRICE_IDR = 250000;
const INTERNATIONAL_PRICE_USD = 30;
const USD_TO_IDR_RATE = 16500;
const TEST_LOCATION_STORAGE_KEY = "uniprints-test-location";

const T = {
  id: {
    regionPrice:   "Harga Indonesia",
    notePrice:     "Checkout lokal menggunakan harga IDR.",
    locationUnknown: "Lokasi tidak diketahui",
    allowLocation:  "Mendeteksi lokasi...",
    locationBlocked:"Lokasi browser tidak aktif",
    locationOpenSettings:"Lokasi diperkirakan dari IP",
    btnBeli:        "Order",
    modalTitle:     "Detail Pemesanan",
    labelNama:      "Nama Lengkap",
    labelAlamat:    "Alamat",
    labelKota:      "Kota",
    labelProvinsi:  "Provinsi",
    labelKodePos:   "Kode Pos",
    labelNegara:    "Negara",
    labelPhone:     "No. HP / WhatsApp",
    labelCityInt:   "City",
    labelZipInt:    "Zip Code",
    placeholderJalan:"Nama jalan, RT/RW, Kelurahan, Kecamatan",
    btnKirim:       "Beli via WhatsApp",
    toastNamaWajib: "Nama lengkap wajib diisi",
    toastAlamatWajib:"Alamat wajib diisi",
    toastNegaraWajib:"Negara wajib dipilih",
    toastKotaWajib: "Kota wajib diisi",
    toastProvWajib: "Provinsi wajib diisi",
    toastKodePos:   "Kode pos harus 5 digit angka",
    gpsSuccess:     "Lokasi terdeteksi!",
    labelNamaPh:    "Masukkan nama lengkap",
    labelPhonePh:   "08xxxxxxxxxx",
    labelAlamatPhID:"Nama jalan, RT/RW, Kelurahan, Kecamatan",
    labelAlamatPhInt:"Street address, building, city",
    labelKotaPh:   "Kota",
    labelProvinsiPh:"Provinsi",
    labelKodePosPh: "5 angka",
    labelZipIntPh:  "Zip code",
    labelSelected:  "Selected",
    labelQuantity: "Quantity",
    labelTotalPrice:"Total",
    sectionRecipient:"Penerima",
    sectionShipping:"Pengiriman",
    labelTotal:    "Total Produk",
    shippingFeeNote:"Belum termasuk fee pengiriman.",
    disclaimer:   "Data Anda hanya digunakan untuk memproses pesanan via WhatsApp.",
    featuresTitle:"Kenapa UniPrints?",
    featureQuality:"Premium Quality",
    featQualityDesc:"Material berkualitas tinggi dengan finishing detail untuk perlindungan maksimal deck kartu Anda.",
    featureFast:  "Fast Production",
    featFastDesc:  "Proses produksi cepat dan langsung dikirim setelah checkout via WhatsApp.",
    featureColors: "6 Vibrant Colors",
    featColorsDesc:"Pilihan 6 warna menarik — Red, Orange, Yellow, Green, Blue, Purple — sesuai kepribadian Anda.",
    featureCheckout:"Direct Checkout",
    featCheckoutDesc:"Checkout langsung via WhatsApp — tidak ribet, langsung terhubung dengan admin untuk konfirmasi.",
    featureDelivery:"Nationwide Delivery",
    featDeliveryDesc:"Pengiriman ke seluruh Indonesia dan internasional dengan tracking lengkap.",
    featureRealtime:"Real-time Price",
    featRealtimeDesc:"Harga otomatis disesuaikan dengan lokasi Anda — domestik dalam IDR, internasional dalam USD.",
    heroEyebrow:  "Premium Print Product",
    heroSubtitle1: "Deck box premium, checkout via WhatsApp.",
    heroSubtitle2: "",
    panelTag:     "Premium Deck Box",
    locationDefault:"Indonesia",
  },
  en: {
    regionPrice:   "International price",
    notePrice:     "Orders outside Indonesia use USD pricing.",
    locationUnknown: "Location unknown",
    allowLocation: "Detecting location...",
    locationBlocked:"Browser location is disabled",
    locationOpenSettings:"Location is estimated from IP",
    btnBeli:       "Buy Now",
    modalTitle:    "Order Details",
    labelNama:     "Full Name",
    labelAlamat:   "Street Address",
    labelKota:     "City",
    labelProvinsi: "Province / State",
    labelKodePos:  "Postal Code",
    labelNegara:   "Country",
    labelPhone:    "Phone / WhatsApp",
    labelCityInt:  "City",
    labelZipInt:   "Zip Code",
    placeholderJalan:"Street address, building, city",
    btnKirim:      "Buy via WhatsApp",
    toastNamaWajib:"Full name is required",
    toastAlamatWajib:"Address is required",
    toastNegaraWajib:"Country is required",
    toastKotaWajib:"City is required",
    toastProvWajib:"Province / State is required",
    toastKodePos:  "Postal code must be 5 digits",
    gpsSuccess:    "Location detected!",
    labelNamaPh:   "Enter your full name",
    labelPhonePh:  "+1 234 5678",
    labelAlamatPhID:"Street address, building, city",
    labelAlamatPhInt:"Street address, building, city",
    labelKotaPh:  "City",
    labelProvinsiPh:"Province / State",
    labelKodePosPh:"5 digits",
    labelZipIntPh: "Zip code",
    labelSelected: "Selected",
    labelQuantity:"Quantity",
    labelTotalPrice:"Total",
    sectionRecipient:"Recipient",
    sectionShipping:"Shipping",
    labelTotal:   "Product Total",
    shippingFeeNote:"Shipping fee is not included.",
    disclaimer:   "Your data is only used to process orders via WhatsApp.",
    featuresTitle:"Why UniPrints?",
    featureQuality:"Premium Quality",
    featQualityDesc:"High-quality materials with detailed finishing for maximum protection of your card decks.",
    featureFast:  "Fast Production",
    featFastDesc: "Fast production and shipped directly after checkout via WhatsApp.",
    featureColors:"6 Vibrant Colors",
    featColorsDesc:"6 attractive colors — Red, Orange, Yellow, Green, Blue, Purple — to match your personality.",
    featureCheckout:"Direct Checkout",
    featCheckoutDesc:"Checkout directly via WhatsApp — no hassle, directly connected with admin for confirmation.",
    featureDelivery:"Nationwide Delivery",
    featDeliveryDesc:"Shipping across Indonesia and internationally with complete tracking.",
    featureRealtime:"Real-time Price",
    featRealtimeDesc:"Prices automatically adjusted based on your location — IDR for domestic, USD for international.",
    heroEyebrow:  "Premium Print Product",
    heroSubtitle1:"Premium deck box, checkout via WhatsApp.",
    heroSubtitle2:"",
    panelTag:     "Premium Deck Box",
    locationDefault:"Detecting location",
  },
};

const FALLBACK_PRODUCTS = [
  { slug: "red-colorized-deck-box",    name: "Colorized Deck Box - Red",    category: CATEGORY, color: "Red",    colorHex: "#c4162a", priceIdr: DOMESTIC_PRICE_IDR, priceUsd: INTERNATIONAL_PRICE_USD, stock: 12, frontImage: "assets/red-front.jpeg",       backImage: "assets/red-back-side.jpeg"    },
  { slug: "orange-colorized-deck-box", name: "Colorized Deck Box - Orange", category: CATEGORY, color: "Orange", colorHex: "#e77817", priceIdr: DOMESTIC_PRICE_IDR, priceUsd: INTERNATIONAL_PRICE_USD, stock: 12, frontImage: "assets/orange-front.jpeg",   backImage: "assets/orange-back-side.jpeg" },
  { slug: "yellow-colorized-deck-box", name: "Colorized Deck Box - Yellow", category: CATEGORY, color: "Yellow", colorHex: "#f5c22a", priceIdr: DOMESTIC_PRICE_IDR, priceUsd: INTERNATIONAL_PRICE_USD, stock: 12, frontImage: "assets/yellow-front.jpeg",   backImage: "assets/yellow-back-side.jpeg" },
  { slug: "green-colorized-deck-box",  name: "Colorized Deck Box - Green",  category: CATEGORY, color: "Green",  colorHex: "#129c5a", priceIdr: DOMESTIC_PRICE_IDR, priceUsd: INTERNATIONAL_PRICE_USD, stock: 12, frontImage: "assets/green-front.jpeg",    backImage: "assets/green-back-side.jpeg"  },
  { slug: "blue-colorized-deck-box",   name: "Colorized Deck Box - Blue",   category: CATEGORY, color: "Blue",   colorHex: "#1546e0", priceIdr: DOMESTIC_PRICE_IDR, priceUsd: INTERNATIONAL_PRICE_USD, stock: 12, frontImage: "assets/blue-front.jpeg",     backImage: "assets/blue-back-side.jpeg"   },
  { slug: "purple-colorized-deck-box", name: "Colorized Deck Box - Purple", category: CATEGORY, color: "Purple", colorHex: "#6c3ab7", priceIdr: DOMESTIC_PRICE_IDR, priceUsd: INTERNATIONAL_PRICE_USD, stock: 12, frontImage: "assets/purple-front.jpeg",   backImage: "assets/purple-back-side.jpeg" },
];

const state = {
  supabase: null,
  products: [...FALLBACK_PRODUCTS],
  selectedSlug: FALLBACK_PRODUCTS[0].slug,
  selectedView: "front",
  quantity: 1,
  location: { countryCode: "ID", country: "Indonesia", region: "", city: "", source: "browser-default" },
};

// Safe querySelector helper — never returns null without a clear fallback
const $ = (sel, fallback) => document.querySelector(sel) ?? fallback;

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

const lang = () => state.location.countryCode && state.location.countryCode !== "ID" ? "en" : "id";
const t   = key => T[lang()]?.[key] ?? T.id[key] ?? key;

// ── i18n ───────────────────────────────────────────────────
function applyTranslations() {
  const l = lang();

  const locEl = $("#locationText");
  if (locEl) {
    locEl.textContent = formatLocationLabel();
    locEl.style.cursor = "";
    locEl.onclick = null;
  }

  const re = $("#priceRegion");
  const no = $("#priceNote");
  if (re) re.textContent = t("regionPrice");
  if (no) no.textContent = t("notePrice");

  const btn = $("#buyButton");
  if (btn) btn.querySelector(".buy-button-label").textContent = t("btnBeli");

  const ft = $(".features-title");
  if (ft) ft.textContent = t("featuresTitle");

  const featDescs = [
    [t("featureQuality"), t("featQualityDesc")],
    [t("featureFast"),     t("featFastDesc")],
    [t("featureColors"),   t("featColorsDesc")],
    [t("featureCheckout"), t("featCheckoutDesc")],
    [t("featureDelivery"), t("featDeliveryDesc")],
    [t("featureRealtime"), t("featRealtimeDesc")],
  ];
  document.querySelectorAll(".feature-card").forEach((card, i) => {
    if (featDescs[i]) {
      const h3 = card.querySelector("h3");
      const p  = card.querySelector("p");
      if (h3) h3.textContent = featDescs[i][0];
      if (p)  p.textContent  = featDescs[i][1];
    }
  });

  const eyebrow = $(".hero-eyebrow");
  if (eyebrow) eyebrow.textContent = t("heroEyebrow");

  const subtitle = $(".hero-subtitle");
  if (subtitle) {
    subtitle.innerHTML = [t("heroSubtitle1"), t("heroSubtitle2")].filter(Boolean).join("<br />");
  }

  const panelTag = $(".panel-header-tag");
  if (panelTag) panelTag.textContent = t("panelTag");

  const selLabel = document.querySelector(".selection-row-label");
  if (selLabel) selLabel.textContent = t("labelSelected");
  const qtyLabel = document.querySelector(".quantity-label");
  if (qtyLabel) qtyLabel.textContent = t("labelQuantity");
  const totalLabel = document.querySelector(".total-label");
  if (totalLabel) totalLabel.textContent = t("labelTotalPrice");

  const mt = $("#modalTitle");
  if (mt) mt.textContent = t("modalTitle");

  const modalSections = document.querySelectorAll(".modal-section-label");
  if (modalSections[0]) modalSections[0].textContent = t("sectionRecipient");
  if (modalSections[1]) modalSections[1].textContent = t("sectionShipping");

  const labelMap = {
    "#orderFullName":   [t("labelNama"),     t("labelNamaPh")],
    "#orderPhone":      [t("labelPhone"),     t("labelPhonePh")],
    "#orderAddress":    [t("labelAlamat"),    l === "id" ? t("labelAlamatPhID") : t("labelAlamatPhInt")],
    "#orderCity":       [t("labelKota"),      t("labelKotaPh")],
    "#orderProvince":   [t("labelProvinsi"), t("labelProvinsiPh")],
    "#orderPostalCode": [t("labelKodePos"),   t("labelKodePosPh")],
    "#orderIntZip":     [t("labelZipInt"),     t("labelZipIntPh")],
  };
  Object.entries(labelMap).forEach(([sel, [label, ph]]) => {
    const el = $(sel);
    if (!el) return;
    const prevLabel = el.closest(".modal-field")?.querySelector(".modal-label");
    if (prevLabel) prevLabel.textContent = label;
    el.placeholder = ph;
  });

  const countryLabel = document.querySelector('label[for="orderCountry"]');
  if (countryLabel) countryLabel.textContent = t("labelNegara");

  const modalTotalLabel = $(".modal-total-label");
  if (modalTotalLabel) modalTotalLabel.textContent = t("labelTotal");
  const shippingNote = $("#modalShippingNote");
  if (shippingNote) shippingNote.textContent = t("shippingFeeNote");

  const submitBtn = $(".modal-submit-btn");
  if (submitBtn) submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> ${t("btnKirim")}`;

  const disclaimer = $(".modal-disclaimer");
  if (disclaimer) disclaimer.textContent = t("disclaimer");

  onCountryChange();
}

function applyTranslationsOnLocationChange() {
  applyTranslations();
  renderPrice();
}

// ── Bootstrap ──────────────────────────────────────────────
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}

async function bootstrap() {
  initParticleCanvas();
  initScrollReveal();
  initCardTilt();
  initHeaderScroll();
  bindEvents();
  initDatalists();
  render();
  await connectSupabase();
  await loadProducts();
  render();
  await detectLocation();
  applyTranslationsOnLocationChange();
}

// ── Particle Canvas ─────────────────────────────────────────
function initParticleCanvas() {
  const canvas = $("#particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  class Particle {
    constructor(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.a  = Math.random() * 0.5 + 0.08;
      this.s  = Math.random() * 1.5 + 0.5;
      this.c  = Math.random() > 0.65 ? "0, 229, 200" : "255, 255, 255";
    }
    reset() {
      this.x = Math.random() * W;
      this.y = H + 10;
      this.a = Math.random() * 0.5 + 0.08;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.a -= 0.0006;
      if (this.a <= 0 || this.y < -20) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.c}, ${this.a})`;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 80 }, () => new Particle(true));

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();

  new ResizeObserver(() => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }).observe(document.documentElement);
}

// ── Scroll Reveal ───────────────────────────────────────────
function initScrollReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  // Force panel card visible after delay
  setTimeout(() => {
    const panel = $("#panelCard");
    if (panel) { panel.classList.add("visible"); }
  }, 800);

  // Enforce color-rail rendered even if DOM not ready yet
  setTimeout(() => {
    const rail = $("#colorRail");
    if (rail && rail.children.length === 0) {
      renderColorRail();
    }
  }, 1200);
}

// ── 3D Card Tilt ───────────────────────────────────────────
function initCardTilt() {
  const card = $("#productCard");
  if (!card) return;

  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
    const ry = ((e.clientX - r.left) / r.width  - 0.5) *  14;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 500ms cubic-bezier(0.16,1,0.3,1)";
    card.style.transform = "";
    setTimeout(() => { card.style.transition = ""; }, 500);
  });
}

// ── Header scroll ───────────────────────────────────────────
function initHeaderScroll() {
  const header = $("#siteHeader");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });
}

// ── Event Binding ───────────────────────────────────────────
function bindEvents() {
  const prev = $("#prevProduct");
  const next = $("#nextProduct");
  const fv   = $("#frontView");
  const bv   = $("#backView");
  const qd   = $("#quantityDown");
  const qu   = $("#quantityUp");
  const loc  = $("#detectLocation");
  const btn  = $("#buyButton");

  if (prev) prev.addEventListener("click", () => moveSelected(-1));
  if (next) next.addEventListener("click", () => moveSelected(1));
  if (fv)   fv.addEventListener("click",  () => setView("front"));
  if (bv)   bv.addEventListener("click",  () => setView("back"));
  if (qd)   qd.addEventListener("click", () => updateQuantity(-1));
  if (qu)   qu.addEventListener("click", () => updateQuantity(1));
  if (loc)  loc.addEventListener("click", () => detectLocation());
  if (btn)  btn.addEventListener("click",  openOrderModal);
  const countrySelect = $("#orderCountry");
  if (countrySelect) countrySelect.addEventListener("change", onCountryChange);

  // Modal events
  const overlay = $("#modalOverlay");
  const cancel  = $("#modalCancel");
  const form    = $("#modalForm");
  if (overlay)  overlay.addEventListener("click", e => { if (e.target === overlay) closeOrderModal(); });
  if (cancel)   cancel.addEventListener("click",   closeOrderModal);
  if (form)     form.addEventListener("submit",    handleModalSubmit);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeOrderModal(); });
}

// ── Supabase ───────────────────────────────────────────────
async function connectSupabase() {
  const config = await readConfig();
  if (config.supabaseUrl && config.supabaseAnonKey) state.supabase = config;
}

async function readConfig() {
  if (window.UNIPRINTS_SUPABASE) return normalizeConfig(window.UNIPRINTS_SUPABASE);
  try {
    const r = await fetch("/api/config", { headers: { accept: "application/json" } });
    return r.ok ? normalizeConfig(await r.json()) : {};
  } catch { return {}; }
}

function normalizeConfig(c) {
  return {
    supabaseUrl:    c.supabaseUrl    || c.SUPABASE_URL    || c["NEXT_PUBLIC_SUPABASE_URL"]    || "",
    supabaseAnonKey: c.supabaseAnonKey || c.SUPABASE_ANON_KEY || c["NEXT_PUBLIC_SUPABASE_ANON_KEY"] || "",
  };
}

async function loadProducts() {
  if (!state.supabase) { state.products = [...FALLBACK_PRODUCTS]; return; }
  try {
    const q    = new URLSearchParams({ select: "*", category: `eq.${CATEGORY}`, is_active: "eq.true", order: "sort_order.asc" });
    const r    = await supabaseFetch(`products?${q}`);
    if (!r.ok) { state.products = [...FALLBACK_PRODUCTS]; return; }
    const data = await r.json();
    if (!data?.length) { state.products = [...FALLBACK_PRODUCTS]; return; }
    state.products = data.map(normalizeProduct);
    state.selectedSlug = state.products[0]?.slug || FALLBACK_PRODUCTS[0].slug;
  } catch {
    state.products = [...FALLBACK_PRODUCTS];
  }
}

function normalizeProduct(row) {
  return {
    id:        row.id,
    slug:      row.slug,
    name:      row.name,
    category:  row.category,
    color:     row.color,
    colorHex:  row.color_hex || "#888888",
    priceIdr:  Number(row.price_idr)   || DOMESTIC_PRICE_IDR,
    priceUsd:  Number(row.price_usd)   || INTERNATIONAL_PRICE_USD,
    stock:     Number(row.stock)        || 12,
    frontImage: row.front_image_url || row.image_url,
    backImage:  row.back_image_url  || row.image_url,
  };
}

// ── Location ───────────────────────────────────────────────
async function detectLocation() {
  const testLocation = readTestLocationOverride();
  if (testLocation) {
    applyLocation(testLocation);
    syncModalLocation(testLocation);
    return;
  }

  const inferredLocation = inferLocationFromBrowser();
  applyLocation(inferredLocation);
  syncModalLocation(inferredLocation);

  try {
    const r = await fetch("/api/location", { headers: { accept: "application/json" } });
    if (r.ok) {
      const api = await r.json();
      if (api.countryCode) {
        applyLocation(api);
        syncModalLocation(api);
      }
    }
  } catch { /* ignore */ }
}

function inferLocationFromBrowser() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const langs = navigator.languages || [navigator.language || ""];

    const idTzs    = ["Asia/Jakarta","Asia/Makassar","Asia/Jayapura","Asia/Pontianak"];
    const isIDTimezone   = idTzs.includes(tz);
    const isIDLang       = langs.some(l => l.toLowerCase().startsWith("id"));

    if (isIDTimezone || isIDLang) {
      return {
        countryCode: "ID",
        country: isoNames[tz] || "Indonesia",
        region: "", city: "",
        source: isIDTimezone ? "timezone" : "language",
      };
    }

    // Detect other common regions
    const naTzs = ["America/New_York","America/Chicago","America/Denver","America/Los_Angeles","America/Toronto","America/Vancouver"];
    const euTzs = ["Europe/London","Europe/Paris","Europe/Berlin","Europe/Amsterdam","Europe/Madrid"];

    if (naTzs.includes(tz)) return { countryCode: "US", country: "United States", source: "timezone" };
    if (euTzs.includes(tz)) {
      const names = { "Europe/London": "UK", "Europe/Paris": "France", "Europe/Berlin": "Germany" };
      return { countryCode: "GB", country: names[tz] || "Europe", source: "timezone" };
    }
    if (tz.includes("Australia")) return { countryCode: "AU", country: "Australia", source: "timezone" };

    return { countryCode: "", country: "", source: "unknown" };
  } catch {
    return { countryCode: "ID", country: "Indonesia", source: "default" };
  }
}

function readTestLocationOverride() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("clearRegion") || params.has("clearLocation") || params.has("resetRegion")) {
    sessionStorage.removeItem(TEST_LOCATION_STORAGE_KEY);
    return null;
  }

  const countryCode = cleanLocationPart(params.get("testCountry") || params.get("country"), 2).toUpperCase();
  const city = cleanLocationPart(params.get("testCity") || params.get("city"), 80);
  const region = cleanLocationPart(params.get("testRegion") || params.get("region"), 80);

  if (countryCode) {
    const override = {
      countryCode,
      country: cleanLocationPart(params.get("testCountryName") || params.get("countryName"), 80) || countryNameFromCode(countryCode),
      region,
      city,
      source: "test-override",
    };
    sessionStorage.setItem(TEST_LOCATION_STORAGE_KEY, JSON.stringify(override));
    return override;
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem(TEST_LOCATION_STORAGE_KEY) || "null");
    if (saved?.countryCode) {
      return {
        countryCode: cleanLocationPart(saved.countryCode, 2).toUpperCase(),
        country: cleanLocationPart(saved.country, 80) || countryNameFromCode(saved.countryCode),
        region: cleanLocationPart(saved.region, 80),
        city: cleanLocationPart(saved.city, 80),
        source: "test-override",
      };
    }
  } catch {
    sessionStorage.removeItem(TEST_LOCATION_STORAGE_KEY);
  }

  return null;
}

function cleanLocationPart(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);
}

function countryNameFromCode(code) {
  const countryCode = String(code || "").toUpperCase();
  const select = $("#orderCountry");
  const option = select ? Array.from(select.options).find(opt => opt.value === countryCode) : null;
  if (option) return option.textContent.trim();

  const names = {
    ID: "Indonesia",
    MY: "Malaysia",
    SG: "Singapore",
    BN: "Brunei Darussalam",
    TH: "Thailand",
    PH: "Philippines",
    VN: "Vietnam",
    US: "United States",
    CA: "Canada",
    AU: "Australia",
    NZ: "New Zealand",
    GB: "United Kingdom",
    DE: "Germany",
    FR: "France",
    NL: "Netherlands",
    JP: "Japan",
    KR: "South Korea",
    CN: "China",
    AE: "United Arab Emirates",
  };
  return names[countryCode] || countryCode;
}

function syncModalLocation(loc) {
  const countryCode = (loc.countryCode || "").toUpperCase();
  const select = $("#orderCountry");
  if (select && countryCode) {
    ensureCountryOption(select, countryCode, loc.country || countryNameFromCode(countryCode));
    select.value = countryCode;
  }

  const cityEl = $("#orderCity");
  const provinceEl = $("#orderProvince");
  if (cityEl && loc.city) cityEl.value = loc.city;
  if (provinceEl && loc.region) provinceEl.value = loc.region;
  onCountryChange();
}

function ensureCountryOption(select, countryCode, countryName) {
  if (Array.from(select.options).some(opt => opt.value === countryCode)) return;
  const option = document.createElement("option");
  option.value = countryCode;
  option.textContent = countryName || countryCode;
  select.appendChild(option);
}

// Fallback country names for Indonesian timezones
const isoNames = {
  "Asia/Jakarta":   "Indonesia",
  "Asia/Makassar":  "Indonesia",
  "Asia/Jayapura":  "Indonesia",
  "Asia/Pontianak": "Indonesia",
};

function applyLocation(loc) {
  state.location = {
    countryCode: (loc.countryCode || "").toUpperCase(),
    country: loc.country  || "",
    region:   loc.region  || "",
    city:     loc.city    || "",
    source:   loc.source  || "unknown",
  };
  const locEl = $("#locationText");
  if (locEl) locEl.textContent = formatLocationLabel();
  renderPrice();
  applyTranslationsOnLocationChange();
  if (loc.source === "gps" && (loc.city || loc.region)) {
    showToast(t("gpsSuccess"), 2000);
  }
}

// ── Core Render ─────────────────────────────────────────────
function render() {
  // Guard: ensure products are never empty
  if (!state.products?.length) state.products = [...FALLBACK_PRODUCTS];
  if (!state.selectedSlug)    state.selectedSlug = state.products[0].slug;

  renderFeatured();
  renderColorRail();
  renderPrice();
}

function renderFeatured() {
  const p = getSelectedProduct();
  if (!p) return;

  const img     = $("#featuredImage");
  const colorEl = $("#featuredColor");
  const priceEl = $("#featuredPrice");
  const csEl    = $("#captionSwatch");
  const ssEl    = $("#selectedSwatch");
  const ss2El   = $("#selectedSummary");

  if (colorEl) colorEl.textContent = p.color;
  if (csEl)    csEl.style.background   = p.colorHex;
  if (ssEl)    ssEl.style.background   = p.colorHex;
  if (ss2El)   ss2El.textContent = `${p.color} deck box`;

  const unit = getUnitPrice(p);
  if (priceEl) priceEl.textContent = formatMoney(unit.currency, unit.amount);

  if (img) {
    const newSrc = state.selectedView === "front" ? p.frontImage : p.backImage;
    if (!img.src.includes(newSrc)) {
      img.classList.remove("fade-in");
      img.classList.add("fade-out");
      setTimeout(() => {
        img.src = newSrc;
        img.alt = `${p.name} — ${state.selectedView} view`;
        img.classList.remove("fade-out");
        img.classList.add("fade-in");
      }, 280);
    } else {
      img.src = newSrc;
      img.alt = `${p.name} — ${state.selectedView} view`;
    }
  }

  $("#frontView")?.classList.toggle("is-active", state.selectedView === "front");
  $("#backView")?.classList.toggle("is-active", state.selectedView === "back");
}

function renderColorRail() {
  const rail = $("#colorRail");
  if (!rail) return;
  if (!state.products?.length) { rail.innerHTML = ""; return; }

  rail.innerHTML = state.products.map(p => `
    <button class="color-dot${p.slug === state.selectedSlug ? " is-active" : ""}"
      style="--swatch:${p.colorHex}"
      type="button" data-select="${p.slug}" aria-label="Pilih ${p.color}">
      <div class="color-dot-swatch"></div>
      <span class="color-dot-label">${p.color}</span>
    </button>
  `).join("");

  rail.querySelectorAll("[data-select]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedSlug = btn.dataset.select;
      renderFeatured();
      renderColorRail();
    });
  });
}

function renderPrice() {
  const p = getSelectedProduct();
  if (!p) return;

  const unit    = getUnitPrice(p);
  const total   = unit.amount * state.quantity;
  const unitText  = formatMoney(unit.currency, unit.amount);
  const totalText = formatMoney(unit.currency, total);

  const els = {
    unitPrice:  $("#unitPrice"),
    totalPrice: $("#totalPrice"),
    qtyValue:   $("#quantityValue"),
    regionEl:   $("#priceRegion"),
    noteEl:     $("#priceNote"),
    locEl:      $("#locationText"),
    btn:        $("#buyButton"),
  };

  const s = (el, val) => { if (el) el.textContent = val; };

  s(els.unitPrice,  unitText);
  s(els.totalPrice, totalText);
  s(els.qtyValue,   String(state.quantity));
  s(els.regionEl,   t("regionPrice"));
  s(els.noteEl,     t("notePrice"));
  s(els.locEl,      formatLocationLabel());
}

function getUnitPrice(product, shippingCountry = state.location.countryCode) {
  const p = product || getSelectedProduct();
  if (!p) return { currency: "IDR", amount: DOMESTIC_PRICE_IDR };
  const destinationCountry = String(shippingCountry || state.location.countryCode || "ID").toUpperCase();
  const internationalPriceUsd = p.priceUsd || INTERNATIONAL_PRICE_USD;

  if (destinationCountry && destinationCountry !== "ID") {
    if (isDomesticBuyer()) {
      return {
        currency: "IDR",
        amount: convertUsdToIdr(internationalPriceUsd),
        basisCurrency: "USD",
        basisAmount: internationalPriceUsd,
      };
    }
    return { currency: "USD", amount: internationalPriceUsd };
  }

  return { currency: "IDR", amount: p.priceIdr || DOMESTIC_PRICE_IDR };
}

function isDomesticBuyer() {
  return !state.location.countryCode || state.location.countryCode === "ID" || state.location.countryCode === "";
}

function convertUsdToIdr(amountUsd) {
  return Math.round((Number(amountUsd) || 0) * USD_TO_IDR_RATE);
}

function getSelectedShippingCountry() {
  return String($("#orderCountry")?.value || state.location.countryCode || "ID").toUpperCase();
}

function formatPriceBasis(unit) {
  if (!unit?.basisCurrency || !unit?.basisAmount) return "";
  return ` (${formatMoney(unit.basisCurrency, unit.basisAmount)} x Rp${USD_TO_IDR_RATE.toLocaleString("id-ID")})`;
}

function formatMoney(currency, amount) {
  const n = Number(amount) || 0;
  if (currency === "USD") return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return rupiah.format(n);
}

function formatLocationLabel() {
  if (!state.location.countryCode) return t("locationUnknown");
  const c = state.location.country || (state.location.countryCode === "ID" ? "Indonesia" : state.location.countryCode);
  const parts = [state.location.city, state.location.region, c].filter(Boolean);
  return parts.length ? parts.join(", ") : c;
}

function updateQuantity(delta) {
  const p = getSelectedProduct();
  state.quantity = Math.max(1, Math.min(p?.stock || 99, state.quantity + delta));
  renderPrice();
  updateModalContent();
}

function moveSelected(dir) {
  const idx = state.products.findIndex(p => p.slug === state.selectedSlug);
  state.selectedSlug = state.products[(idx + dir + state.products.length) % state.products.length].slug;
  renderFeatured();
  renderColorRail();
  updateModalContent();
}

function setView(view) {
  state.selectedView = view;
  renderFeatured();
}

function getSelectedProduct() {
  const p = state.products?.find(prod => prod.slug === state.selectedSlug);
  return p || state.products?.[0] || FALLBACK_PRODUCTS[0];
}

// ── Order Modal ───────────────────────────────────────────
function openOrderModal() {
  const overlay = $("#modalOverlay");
  if (!overlay) return;

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  updateModalContent();
  setTimeout(() => $("#orderFullName")?.focus(), 120);
}

function closeOrderModal() {
  const overlay = $("#modalOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

function onCountryChange() {
  updateModalContent();
}

function updateAddressFieldsForCountry() {
  const country = $("#orderCountry")?.value;
  const isID = country === "ID";
  const indoEl = $("#indoAddressFields");
  const intEl = $("#intAddressFields");
  const addrEl = $("#orderAddress");
  if (addrEl) {
    addrEl.placeholder = isID ? t("labelAlamatPhID") : t("labelAlamatPhInt");
  }
  if (indoEl) {
    indoEl.classList.toggle("hidden", !isID);
    indoEl.querySelectorAll("input, select").forEach(i => { i.required = isID; });
  }
  if (intEl) {
    intEl.classList.toggle("hidden", isID);
  }
}

function updateModalContent() {
  const p    = getSelectedProduct();
  const unit = getUnitPrice(p, getSelectedShippingCountry());
  const totalAmount = unit.amount * state.quantity;

  const s = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const st = (id, prop, val) => { const el = $(id); if (el) el.style[prop] = val; };

  if ($("#mosSwatch")) st("#mosSwatch", "background", p.colorHex);
  const mosNameEl = $("#mosName");
  if (mosNameEl) mosNameEl.innerHTML = `<span class="mos-color-name" style="color:${p.colorHex}">${p.color}</span> Colorized <span class="accent-text">Deck Box</span>`;
  s("#mosQty",   String(state.quantity));
  s("#mosPrice", formatMoney(unit.currency, unit.amount));
  s("#modalTotalPrice", formatMoney(unit.currency, totalAmount));
  updateAddressFieldsForCountry();
}

function handleModalSubmit(e) {
  e.preventDefault();
  const fd  = new FormData(e.target);

  const fullName = (fd.get("fullName") || "").toString().trim();
  const address  = (fd.get("address")  || "").toString().trim();
  const country  = (fd.get("country")  || "").toString().trim();
  const city     = (fd.get("city")     || "").toString().trim();
  const province = (fd.get("province") || "").toString().trim();
  const postalCode = (fd.get("postalCode") || "").toString().trim();
  const intZip     = (fd.get("intZip")     || "").toString().trim();
  const phone      = (fd.get("phone")      || "").toString().trim();

  if (!fullName)  { showToast(t("toastNamaWajib"), 3000); shakeField("#orderFullName"); return; }
  if (!address)   { showToast(t("toastAlamatWajib"), 3000); shakeField("#orderAddress");  return; }
  if (!country)   { showToast(t("toastNegaraWajib"), 3000); shakeField("#orderCountry");   return; }

  const isID = country === "ID";
  if (isID) {
    if (!city)     { showToast(t("toastKotaWajib"), 3000); shakeField("#orderCity");     return; }
    if (!province)  { showToast(t("toastProvWajib"), 3000); shakeField("#orderProvince"); return; }
    if (postalCode && !/^\d{5}$/.test(postalCode)) {
      showToast(t("toastKodePos"), 3000);
      shakeField("#orderPostalCode");
      return;
    }
  }

  const msg = buildOrderMessage({ fullName, address, country, city, province, postalCode, phone, intZip });
  closeOrderModal();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

function buildOrderMessage({ fullName, address, country, city, province, postalCode, phone, intZip }) {
  const p     = getSelectedProduct();
  const unit  = getUnitPrice(p, country);
  const total = formatMoney(unit.currency, unit.amount * state.quantity);
  const price = formatMoney(unit.currency, unit.amount);
  const priceBasis = formatPriceBasis(unit);
  const isID  = country === "ID";
  const countryName = $("#orderCountry")?.options?.[$("#orderCountry")?.selectedIndex]?.text || country;

  if (isID) {
    return `Halo kak, saya ingin order:

Produk    : ${p.color} Colorized Deck Box
Jumlah    : ${state.quantity}x @ ${price}
Total      : ${total}
Ongkir     : Belum termasuk, dikonfirmasi admin

Data Pemesan:
Nama       : ${fullName}
No. HP     : ${phone || "-"}
Alamat     : ${address}
Kota       : ${city}
Provinsi   : ${province}
Kode Pos   : ${postalCode || "-"}
Negara     : Indonesia`;
  }

  return `Hello, I would like to order:

Product    : ${p.color} Colorized Deck Box
Quantity   : ${state.quantity}x @ ${price}${priceBasis}
Total      : ${total}
Shipping   : Not included, confirmed by admin

Customer Details:
Full Name  : ${fullName}
Phone      : ${phone || "-"}
Address    : ${address}
City       : ${city || "-"}
Zip Code   : ${intZip || "-"}
Country    : ${countryName}`;
}

function shakeField(sel) {
  const el = $(sel);
  if (!el) return;
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
  setTimeout(() => el.classList.remove("shake"), 500);
}

const CITIES = [
  "Ambon","Balikpapan","Banda Aceh","Bandar Lampung","Bandung","Banjarmasin","Batam","Bekasi",
  "Bengkulu","Bogor","Cirebon","Denpasar","Gorontalo","Jakarta Barat","Jakarta Pusat","Jakarta Selatan",
  "Jakarta Timur","Jakarta Utara","Jambi","Jayapura","Jember","Karawang","Kediri","Kota SBI","Kupang",
  "Lhokseumawe"," Lubuklinggau","Madiun","Magelang","Malang","Manado","Mataram","Medan","Metro","Mojokerto",
  "Padang","Padang Sidempuan","Palu","Pangkal Pinang","Pekanbaru","Pekalongan","Pontianak","Probolinggo",
  "Purwakarta","Purwokerto","Salatiga","Samarinda","Semarang","Serang","Sorong","Solo","Sukabumi","Sumedang",
  "Surabaya","Surakarta","Tangerang","Tangerang Selatan","Tanjung Pinang","Tasikmalaya","Tegal","Yogyakarta",
  "Banda","Binjai","Bukittinggi","Ciamis","Cianjur","Cikarang","Cilacap","Cimaahi","Garut","Indramayu","Jakarta",
  "Jatiwangi","Jaya Pura","Kediri (Jawa Timur)","Kudus","Madium","Majalengka","Makassar","Maros","Ponorogo",
  "Situbondo","Subang","Sungai Penuh","Tahuna","Ternate","Toli-Toli","Tulungagun","Waikabubak","Wangi-Wangi",
];

const PROVINCES = [
  "Aceh","Bali","Banten","Bengkulu","DI Yogyakarta","DKI Jakarta","Gorontalo","Jambi","Jawa Barat",
  "Jawa Tengah","Jawa Timur","Kalimantan Barat","Kalimantan Selatan","Kalimantan Tengah","Kalimantan Timur",
  "Kalimantan Utara","Kepulauan Bangka Belitung","Kepulauan Riau","Lampung","Maluku","Maluku Utara","Nusa Tenggara Barat",
  "Nusa Tenggara Timur","Papua","Papua Barat","Riau","Riau Kepulauan","Sulawesi Barat","Sulawesi Selatan",
  "Sulawesi Tengah","Sulawesi Tenggara","Sulawesi Utara","Sumatera Barat","Sumatera Selatan","Sumatera Utara",
];

function initDatalists() {
  const cityList = document.getElementById("cityList");
  const provList = document.getElementById("provinceList");
  if (cityList) cityList.innerHTML = CITIES.map(c => `<option value="${c}">`).join("");
  if (provList) provList.innerHTML = PROVINCES.map(p => `<option value="${p}">`).join("");
}

// ── Utilities ──────────────────────────────────────────────
function showToast(msg, duration = 3000) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("is-visible");
  setTimeout(() => el.classList.remove("is-visible"), duration);
}
function supabaseFetch(path, opts = {}) {
  const base = state.supabase.supabaseUrl.replace(/\/$/, "");
  return fetch(`${base}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey:      state.supabase.supabaseAnonKey,
      Authorization: `Bearer ${state.supabase.supabaseAnonKey}`,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
}
