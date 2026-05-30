const WHATSAPP_NUMBER = "6281998190083";
const DOMESTIC_PRICE_IDR = 250000;
const INTERNATIONAL_PRICE_USD = 30;
const USD_TO_IDR_RATE = 16500;

const products = [
  { color: "Red", slug: "red", hex: "#c4162a", front: "assets/red-front.jpeg", back: "assets/red-back-side.jpeg", stock: 12 },
  { color: "Orange", slug: "orange", hex: "#e77817", front: "assets/orange-front.jpeg", back: "assets/orange-back-side.jpeg", stock: 12 },
  { color: "Yellow", slug: "yellow", hex: "#f5c22a", front: "assets/yellow-front.jpeg", back: "assets/yellow-back-side.jpeg", stock: 12 },
  { color: "Green", slug: "green", hex: "#129c5a", front: "assets/green-front.jpeg", back: "assets/green-back-side.jpeg", stock: 12 },
  { color: "Blue", slug: "blue", hex: "#1546e0", front: "assets/blue-front.jpeg", back: "assets/blue-back-side.jpeg", stock: 12 },
  { color: "Purple", slug: "purple", hex: "#6c3ab7", front: "assets/purple-front.jpeg", back: "assets/purple-back-side.jpeg", stock: 12 },
];

const state = {
  query: "",
  color: "all",
  view: "both",
  sort: "default",
  selectedSlug: "red",
  quantity: 1,
  location: { countryCode: "ID", country: "Indonesia", region: "", city: "", source: "default" },
};

const $ = selector => document.querySelector(selector);
const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

function formatMoney(currency, amount) {
  const n = Number(amount) || 0;
  return currency === "USD"
    ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    : rupiah.format(n);
}

function isDomesticBuyer() {
  return !state.location.countryCode || state.location.countryCode === "ID";
}

function getUnitPrice(shippingCountry = state.location.countryCode) {
  const destination = String(shippingCountry || "ID").toUpperCase();
  if (destination !== "ID") {
    if (isDomesticBuyer()) {
      return {
        currency: "IDR",
        amount: Math.round(INTERNATIONAL_PRICE_USD * USD_TO_IDR_RATE),
        basisCurrency: "USD",
        basisAmount: INTERNATIONAL_PRICE_USD,
      };
    }
    return { currency: "USD", amount: INTERNATIONAL_PRICE_USD };
  }
  return { currency: "IDR", amount: DOMESTIC_PRICE_IDR };
}

function getPriceBasis(unit) {
  if (!unit.basisCurrency) return "";
  return ` (${formatMoney(unit.basisCurrency, unit.basisAmount)} x Rp${USD_TO_IDR_RATE.toLocaleString("id-ID")})`;
}

function formatLocationLabel() {
  const c = state.location.country || state.location.countryCode || "Indonesia";
  return [state.location.city, state.location.region, c].filter(Boolean).join(", ");
}

function selectedProduct() {
  return products.find(product => product.slug === state.selectedSlug) || products[0];
}

function filteredProducts() {
  const q = state.query.trim().toLowerCase();
  let result = products.filter(product => {
    const matchesColor = state.color === "all" || product.slug === state.color;
    const haystack = `${product.color} colorized deck box`.toLowerCase();
    return matchesColor && (!q || haystack.includes(q));
  });

  if (state.sort === "name") {
    result = [...result].sort((a, b) => a.color.localeCompare(b.color));
  }
  if (state.sort === "price") {
    result = [...result].sort((a, b) => getUnitPrice().amount - getUnitPrice().amount || a.color.localeCompare(b.color));
  }
  return result;
}

function renderFilters() {
  const list = $("#colorFilters");
  if (!list) return;
  const items = [{ color: "All", slug: "all", hex: "#f3c75f", count: products.length }, ...products.map(product => ({ ...product, count: 1 }))];
  list.innerHTML = items.map(item => `
    <button class="color-filter${state.color === item.slug ? " is-active" : ""}" type="button" data-color="${item.slug}" style="--swatch:${item.hex}">
      <span class="color-filter-swatch"></span>
      <span>${item.color}</span>
      <span class="color-filter-count">${item.count}</span>
    </button>
  `).join("");
  list.querySelectorAll("[data-color]").forEach(button => {
    button.addEventListener("click", () => {
      state.color = button.dataset.color;
      render();
    });
  });
}

function renderCatalog() {
  const grid = $("#catalogGrid");
  const empty = $("#emptyState");
  const result = filteredProducts();
  const unit = getUnitPrice();
  const priceText = formatMoney(unit.currency, unit.amount);

  $("#resultCount").textContent = String(result.length);
  $("#toolbarCount").textContent = `${result.length} product${result.length === 1 ? "" : "s"}`;
  empty.hidden = result.length > 0;

  grid.innerHTML = result.map(product => `
    <article class="archive-card" data-view="${state.view}" style="--swatch:${product.hex}">
      <span class="card-rune" aria-hidden="true"></span>
      <div class="card-media">
        <div class="media-both">
          <img class="media-front" src="${product.front}" alt="${product.color} deck box front" loading="lazy" />
          <img class="media-back" src="${product.back}" alt="${product.color} deck box back" loading="lazy" />
        </div>
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h2>${product.color} Deck Box</h2>
          <span class="color-token"></span>
        </div>
        <p class="card-subtitle">Front and back archive view</p>
        <div class="card-price-row">
          <strong>${priceText}</strong>
          <span>${product.stock} stock</span>
        </div>
        <div class="card-actions">
          <button class="inspect-button" type="button" data-open="${product.slug}">Inspect</button>
          <button class="quick-button" type="button" data-order="${product.slug}" aria-label="Order ${product.color}">WA</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => openDetail(button.dataset.open));
  });
  grid.querySelectorAll("[data-order]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedSlug = button.dataset.order;
      sendWhatsApp();
    });
  });
}

function renderDetail() {
  const product = selectedProduct();
  const country = $("#orderCountry")?.value || state.location.countryCode || "ID";
  const unit = getUnitPrice(country);
  const total = unit.amount * state.quantity;

  document.documentElement.style.setProperty("--detail-swatch", product.hex);
  $("#detailTitle").textContent = `${product.color} Deck Box`;
  $("#detailDescription").textContent = `${product.color} colorway with front and back finish. Unit weight 200g.`;
  $("#detailFront").src = product.front;
  $("#detailFront").alt = `${product.color} deck box front`;
  $("#detailBack").src = product.back;
  $("#detailBack").alt = `${product.color} deck box back`;
  $("#detailPrice").textContent = formatMoney(unit.currency, unit.amount);
  $("#detailStock").textContent = String(product.stock);
  $("#qtyValue").textContent = String(state.quantity);
  $("#detailTotal").textContent = formatMoney(unit.currency, total);
}

function render() {
  renderFilters();
  renderCatalog();
  renderDetail();
}

function openDetail(slug) {
  state.selectedSlug = slug;
  state.quantity = 1;
  const country = $("#orderCountry");
  if (country && state.location.countryCode) country.value = state.location.countryCode;
  renderDetail();
  const overlay = $("#detailOverlay");
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  const overlay = $("#detailOverlay");
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function sendWhatsApp() {
  const product = selectedProduct();
  const countrySelect = $("#orderCountry");
  const country = countrySelect?.value || state.location.countryCode || "ID";
  const countryName = countrySelect?.selectedOptions?.[0]?.textContent || country;
  const unit = getUnitPrice(country);
  const price = formatMoney(unit.currency, unit.amount);
  const total = formatMoney(unit.currency, unit.amount * state.quantity);
  const weight = `${state.quantity * 200}g`;
  const msg = `Halo kak, saya ingin order:

Produk    : ${product.color} Colorized Deck Box
Jumlah    : ${state.quantity}x @ ${price}${getPriceBasis(unit)}
Berat     : ${weight}
Total     : ${total}
Ongkir    : Belum termasuk, dikonfirmasi admin
Negara    : ${countryName}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

async function detectLocation() {
  try {
    const response = await fetch("/api/location", { headers: { accept: "application/json" } });
    if (!response.ok) return;
    const location = await response.json();
    if (!location?.countryCode) return;
    state.location = {
      countryCode: String(location.countryCode || "ID").toUpperCase(),
      country: location.country || "",
      region: location.region || "",
      city: location.city || "",
      source: location.source || "vercel",
    };
    $("#locationText").textContent = formatLocationLabel();
    const country = $("#orderCountry");
    if (country && Array.from(country.options).some(option => option.value === state.location.countryCode)) {
      country.value = state.location.countryCode;
    }
    render();
  } catch {
    $("#locationText").textContent = "Indonesia";
  }
}

function initCanvas() {
  const canvas = $("#archiveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const nodes = Array.from({ length: 48 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
  }));

  function loop() {
    ctx.clearRect(0, 0, width, height);
    nodes.forEach((node, index) => {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 229, 200, 0.28)";
      ctx.fill();

      for (let j = index + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(243, 199, 95, ${0.1 * (1 - distance / 150)})`;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(loop);
  }

  loop();
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });
}

function bindEvents() {
  $("#searchInput").addEventListener("input", event => {
    state.query = event.target.value;
    renderCatalog();
  });
  $("#resetFilters").addEventListener("click", () => {
    state.query = "";
    state.color = "all";
    state.view = "both";
    state.sort = "default";
    $("#searchInput").value = "";
    $("#sortSelect").value = "default";
    document.querySelectorAll("[data-view]").forEach(button => button.classList.toggle("is-active", button.dataset.view === "both"));
    render();
  });
  $("#sortSelect").addEventListener("change", event => {
    state.sort = event.target.value;
    renderCatalog();
  });
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll("[data-view]").forEach(item => item.classList.toggle("is-active", item === button));
      renderCatalog();
    });
  });
  $("#detailClose").addEventListener("click", closeDetail);
  $("#detailOverlay").addEventListener("click", event => {
    if (event.target.id === "detailOverlay") closeDetail();
  });
  $("#qtyDown").addEventListener("click", () => {
    state.quantity = Math.max(1, state.quantity - 1);
    renderDetail();
  });
  $("#qtyUp").addEventListener("click", () => {
    state.quantity = Math.min(selectedProduct().stock, state.quantity + 1);
    renderDetail();
  });
  $("#orderCountry").addEventListener("change", renderDetail);
  $("#whatsappButton").addEventListener("click", sendWhatsApp);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeDetail();
  });
}

initCanvas();
bindEvents();
render();
detectLocation();
