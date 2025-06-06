const host = "mc-api.marketcheck.com";
const KULF = "D8OzajYWtuqBEEZrR4DafRQxabuqM0xa";
let url = `https://${host}/v2/search/car/active?api_key=${KULF}&rows=32&include_relevant_links=true`;

const searchInput = document.getElementById("search-input");
const searchResultEle = document.querySelector('.results__list');
const resultsOverlay = document.querySelector('.results__overlay');
const searchTitle = document.querySelector('.search-info__param');

let LISTINGS = [];

async function searchCars(e) {
  e.preventDefault();
  searchResultEle.innerHTML = ''
  resultsOverlay.classList.toggle('hidden')
  const params = parseSearchValue(searchInput.value);
  let query = "";
  for (const key in params) {
    const value = params[key];
    if (value) {
      query += `&${key}=${value}`;
    }
  }
  try {
    const res = await fetch(url+query);
    const data = await res.json();
    console.log(data);
    LISTINGS = data.listings;
    resultsOverlay.classList.toggle('hidden');
    searchTitle.innerHTML = `"${searchInput.value}"`
    fillResultList(LISTINGS);
    document.querySelector('main').scrollIntoView();
    // LISTINGS = fakes.listings;
    // setTimeout(() => {
    //     resultsOverlay.classList.toggle('hidden');
    //     fillResultList(LISTINGS);
    //     searchTitle.innerHTML = `"${searchInput.value}"`
    //     document.querySelector('main').scrollIntoView();
    // }, 2500);
  } catch (e) {
    console.log(e)
    alert("Oops!! Something went wrong while searching. Try again.")
    resultsOverlay.classList.toggle('hidden');
  }
}

function createResultHTML(result) {
    return `<div class="result">
              <figure class="result__img-wrapper">
                <img src="${result.media ? result.media.photo_links[0] : './assets/car.jpeg'}" alt="car-image" class="result__img">
              </figure>
              <div class="result__content">
                <div class="result__name">${result.heading || result.build.year+' '+result.build.make+' '+result.build.model+' '+result.build.trim}</div>
                <ul class="result__details">
                  <li class="detail-item">
                    <i class="fa-solid fa-gauge"></i>
                    <span>${result.miles ? result.miles?.toLocaleString()+' miles' : 'NEW'}</span></li>
                  <li class="detail-item">
                    <i class="fa-solid fa-car-side"></i>
                    <span>${result.build?.body_type}</span></li>
                  <li class="detail-item">
                    <i class="fa-solid fa-gears"></i>
                    <span>${result.build?.drivetrain}</span></li>
                  <li class="detail-item">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span><a href="${result.vdp_url}" target="_blank">At ${result.dealer?.name} dealership</a></span></li>
                </ul>
                <div class="result__price">${result.price ? '$'+result.price?.toLocaleString() : 'Follow link for price ☝️'}</div>
              </div>
            </div>`
}

function parseSearchValue(input) {
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

  return { make, model, year };
}

function filterResults(min, max) {
    console.log("Filter Results", min, max)
    if(LISTINGS.length === 0) return;
    const filtered = LISTINGS.filter(car => (min <= car.price && car.price <= max))
    fillResultList(filtered)
}

function fillResultList(listings) {
    let list = [];
    if(listings.length === 0) {
        searchResultEle.innerHTML = `<h2 class="result__not-found">Oops, We couldn't find any listings based on the provided criteria.</h2>`
        return;
    }
    for (const car of listings) {
        list.push(createResultHTML(car))
    }
    searchResultEle.innerHTML = list.join("\n");
}