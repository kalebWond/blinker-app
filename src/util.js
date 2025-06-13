export function parseSearchValue(input) {
  const knownMakes = [
    "acura", "alfa romeo", "aston martin", "audi", "bentley", "bmw", "bugatti", "buick",
    "cadillac", "chevrolet", "chrysler", "citroen", "dodge", "ferrari", "fiat", "ford",
    "genesis", "gmc", "honda", "hyundai", "infiniti", "jaguar", "jeep", "kia", "koenigsegg",
    "lamborghini", "land rover", "lexus", "lincoln", "lotus", "lucid", "maserati", "mazda",
    "mclaren", "mercedes", "mini", "mitsubishi", "nissan", "peugeot", "polestar", "porsche",
    "ram", "renault", "rivian", "rolls-royce", "saab", "saturn", "scion", "smart", "subaru",
    "suzuki", "tesla", "toyota", "volkswagen", "volvo"
  ];

  const parts = input
    .split(/[\s,]+/) // split on comma or space
    .filter(Boolean);

  let year = null;
  let make = null;
  const otherParts = [];

  for (const part of parts) {
    if (/^\d{4}$/.test(part)) {
      year = part;
    } else if (knownMakes.includes(part.toLowerCase())) {
      make = part.toLowerCase();
    } else {
      otherParts.push(part.toLowerCase());
    }
  }
  
  const model = otherParts.join(" ");
  const params = { make, model, year };
  let query = "";

  for (const key in params) {
    const value = params[key];
    if (value) {
      query += `&${key}=${value}`;
    }
  }

  return query;
}

export const API_URL = `https://www.omdbapi.com/?&apikey=75ed821b`;
