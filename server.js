const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/config") {
    sendJson(response, {
      supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      supabaseAnonKey:
        process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    });
    return;
  }

  if (url.pathname === "/api/location") {
    sendJson(response, readLocationFromQuery(url.searchParams) || readLocationFromHeaders(request.headers));
    return;
  }

  const filePath = resolveFile(url.pathname);

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await fs.readFile(filePath);
    const extension = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": extension === ".jpeg" ? "public, max-age=31536000" : "no-store",
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`UniPrints running at http://localhost:${port}`);
});

function resolveFile(pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const filePath = path.normalize(path.join(root, cleanPath));

  if (!filePath.startsWith(root)) {
    return null;
  }

  return filePath;
}

function sendJson(response, body) {
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function readLocationFromQuery(params) {
  const countryCode = cleanLocationPart(params.get("testCountry") || params.get("country"), 2).toUpperCase();
  if (!countryCode) {
    return null;
  }

  return {
    countryCode,
    country: cleanLocationPart(params.get("testCountryName") || params.get("countryName"), 80) || countryNameFromCode(countryCode),
    region: cleanLocationPart(params.get("testRegion") || params.get("region"), 80),
    city: cleanLocationPart(params.get("testCity") || params.get("city"), 80),
    latitude: "",
    longitude: "",
    source: "test-override",
  };
}

function readLocationFromHeaders(headers) {
  const countryCode = String(headers["x-vercel-ip-country"] || "").toUpperCase();
  const city = decodeHeader(headers["x-vercel-ip-city"]);
  const region = decodeHeader(headers["x-vercel-ip-country-region"]);

  return {
    countryCode,
    country: countryCode === "ID" ? "Indonesia" : countryCode,
    region,
    city,
    latitude: headers["x-vercel-ip-latitude"] || "",
    longitude: headers["x-vercel-ip-longitude"] || "",
    source: countryCode ? "vercel" : "local",
  };
}

function cleanLocationPart(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);
}

function countryNameFromCode(code) {
  const names = {
    ID: "Indonesia",
    US: "United States",
    GB: "United Kingdom",
    AU: "Australia",
    SG: "Singapore",
    MY: "Malaysia",
    JP: "Japan",
    KR: "South Korea",
    DE: "Germany",
    FR: "France",
    NL: "Netherlands",
    CA: "Canada",
  };
  return names[String(code || "").toUpperCase()] || String(code || "").toUpperCase();
}

function decodeHeader(value) {
  if (!value) {
    return "";
  }

  try {
    return decodeURIComponent(String(value));
  } catch {
    return String(value);
  }
}
