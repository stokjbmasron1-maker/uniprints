module.exports = function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  const url = new URL(request.url || "", "https://uniprints.local");
  response.status(200).json(readLocationFromQuery(url.searchParams) || readLocationFromHeaders(request.headers));
};

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
    source: countryCode ? "vercel" : "unknown",
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
