// ============================================================
// UniPrints — Premium Landing Page JS
// ============================================================

const CATEGORY = "Colorized Deck Box";
const WHATSAPP_NUMBER = "6281998190083";
const DOMESTIC_PRICE_IDR = 250000;
const INTERNATIONAL_PRICE_USD = 30;
const TEST_LOCATION_STORAGE_KEY = "uniprints-test-location";

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
async function detectLocation(options = {}) {
  const testLocation = readTestLocationOverride();
  if (testLocation) {
    applyLocation(testLocation);
    syncModalLocation(testLocation);
    return;
  }

  // Always set browser-inferred location first (synchronous, instant)
  applyLocation(inferLocationFromBrowser());

  // Then try API (async, may fail locally)
  try {
    const r = await fetch("/api/location", { headers: { accept: "application/json" } });
    if (r.ok) {
      const api = await r.json();
      if (api.countryCode) applyLocation(api);
    }
  } catch { /* fallback sudah dipakai */ }

  // Try GPS if available — always show toast before requesting
  if (navigator.geolocation) {
    showToast("Izinkan lokasi untuk hasil akurat...", 6000);
    if (options.forcePrecise) await detectPreciseByGPS();
    else detectPreciseByGPS();
  }
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

function detectPreciseByGPS() {
  return new Promise(resolve => {
    if (!navigator.geolocation) { resolve(); return; }
    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const u = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
          u.searchParams.set("latitude",  pos.coords.latitude);
          u.searchParams.set("longitude", pos.coords.longitude);
          u.searchParams.set("localityLanguage", "en");
          const r = await fetch(u);
          const d = r.ok ? await r.json() : {};
          applyLocation({
            countryCode: d.countryCode || inferCountryFromCoords(pos.coords.latitude, pos.coords.longitude),
            country: d.countryName || "",
            region:  d.principalSubdivision || "",
            city:    d.city || d.locality || "",
            source:  "gps",
          });
        } catch { applyLocation({ countryCode: inferCountryFromCoords(pos.coords.latitude, pos.coords.longitude), source: "coordinates" }); }
        resolve();
      },
      err => {
        // Permission denied → show a clickable prompt in the location pill
        if (err.code === err.PERMISSION_DENIED) {
          showToast("Lokasi diblokir — klik untuk aktifkan", 5000);
          const locEl = $("#locationText");
          if (locEl) locEl.textContent = "Klik untuk aktifkan lokasi";
          locEl.style.cursor = "pointer";
          locEl.onclick = () => {
            // Open browser location settings / prompt
            showToast("Izinkan akses lokasi di browser Anda", 5000);
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(() => {}, () => {}, { enableHighAccuracy: true, timeout: 8000 });
            }
          };
        }
        resolve();
      },
      { enableHighAccuracy: true, maximumAge: 600000, timeout: 8000 }
    );
  });
}

function inferCountryFromCoords(lat, lon) {
  return lat >= -11.2 && lat <= 6.3 && lon >= 94.6 && lon <= 141.1 ? "ID" : "";
}

function applyLocation(loc) {
  state.location = {
    countryCode: (loc.countryCode || "").toUpperCase(),
    country: loc.country  || "",
    region:   loc.region  || "",
    city:     loc.city    || "",
    source:   loc.source  || "unknown",
  };
  // Immediately update location text in UI
  const locEl = $("#locationText");
  if (locEl) locEl.textContent = formatLocationLabel();
  renderPrice();
  // Show success toast when GPS gives us city/region
  if (loc.source === "gps" && (loc.city || loc.region)) {
    showToast("Location detected!", 2000);
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
  const domestic = isDomesticBuyer();
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
  s(els.regionEl,   domestic ? "Indonesia price" : "International price");
  s(els.noteEl,     domestic ? "Local checkout uses Indonesian pricing." : "Outside Indonesia uses USD pricing.");
  s(els.locEl,      formatLocationLabel());
}

function getUnitPrice(product) {
  const p = product || getSelectedProduct();
  if (!p) return { currency: "IDR", amount: DOMESTIC_PRICE_IDR };
  return isDomesticBuyer()
    ? { currency: "IDR", amount: p.priceIdr || DOMESTIC_PRICE_IDR }
    : { currency: "USD", amount: p.priceUsd || INTERNATIONAL_PRICE_USD };
}

function isDomesticBuyer() {
  return !state.location.countryCode || state.location.countryCode === "ID" || state.location.countryCode === "";
}

function formatMoney(currency, amount) {
  const n = Number(amount) || 0;
  if (currency === "USD") return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  return rupiah.format(n);
}

function formatLocationLabel() {
  if (!state.location.countryCode) return "Lokasi tidak diketahui";
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

  // If GPS hasn't been detected yet, ask for location permission first
  if (state.location.source !== "gps" && state.location.source !== "test-override" && navigator.geolocation) {
    showToast("Izinkan lokasi untuk harga akurat...", 5000);
    detectPreciseByGPS().then(() => {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      updateModalContent();
      renderPrice();
      setTimeout(() => $("#orderFullName")?.focus(), 120);
    });
    return;
  }

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
  const country = $("#orderCountry")?.value;
  const isID = country === "ID";
  const indoEl = $("#indoAddressFields");
  const intEl = $("#intAddressFields");
  const addrEl = $("#orderAddress");
  if (addrEl) {
    addrEl.placeholder = isID
      ? "Nama jalan, RT/RW, Kelurahan, Kecamatan"
      : "Street address, building, city";
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
  const unit = getUnitPrice(p);
  const totalAmount = unit.amount * state.quantity;

  const s = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const st = (id, prop, val) => { const el = $(id); if (el) el.style[prop] = val; };

  if ($("#mosSwatch")) st("#mosSwatch", "background", p.colorHex);
  const mosNameEl = $("#mosName");
  if (mosNameEl) mosNameEl.innerHTML = `<span class="mos-color-name" style="color:${p.colorHex}">${p.color}</span> Colorized <span class="accent-text">Deck Box</span>`;
  s("#mosQty",   String(state.quantity));
  s("#mosPrice", formatMoney(unit.currency, unit.amount));
  s("#modalTotalPrice", formatMoney(unit.currency, totalAmount));
  onCountryChange();
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

  if (!fullName)  { showToast("Nama lengkap wajib diisi", 3000); shakeField("#orderFullName"); return; }
  if (!address)   { showToast("Alamat wajib diisi", 3000); shakeField("#orderAddress");  return; }
  if (!country)   { showToast("Negara wajib dipilih", 3000); shakeField("#orderCountry");   return; }

  const isID = country === "ID";
  if (isID) {
    if (!city)     { showToast("Kota wajib diisi", 3000); shakeField("#orderCity");     return; }
    if (!province)  { showToast("Provinsi wajib diisi", 3000); shakeField("#orderProvince"); return; }
    if (postalCode && !/^\d{5}$/.test(postalCode)) {
      showToast("Kode pos harus 5 digit angka", 3000);
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
  const unit  = getUnitPrice(p);
  const total = formatMoney(unit.currency, unit.amount * state.quantity);
  const price = formatMoney(unit.currency, unit.amount);
  const isID  = country === "ID";
  const countryName = $("#orderCountry")?.options?.[$("#orderCountry")?.selectedIndex]?.text || country;

  if (isID) {
    return `Halo kak, saya ingin order:

Produk    : ${p.color} Colorized Deck Box
Jumlah    : ${state.quantity}x @ ${price}
Total      : ${total}

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
Quantity   : ${state.quantity}x @ ${price}
Total      : ${total}

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
