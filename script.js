const weatherTemp = document.getElementById("weather-temp");
const weatherStatus = document.getElementById("weather-status");

navigator.geolocation.getCurrentPosition(
  async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;

    const response = await fetch(url);
    const data = await response.json();
    
    const locationResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const locationData = await locationResponse.json();

    weatherTemp.textContent = `${data.current.temperature_2m}°C`;
    weatherStatus.textContent =
      locationData.address.city ||
      locationData.address.town ||
      locationData.address.village;
  },
  () => {
    weatherStatus.textContent = "Location denied";
  }
);

const currencyRate = document.getElementById("currency-rate");

async function loadCurrency() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");

    const data = await response.json();
    const rate = Math.round(data.rates.IDR);

    currencyRate.textContent = `$1 = ${rate.toLocaleString("id-ID")} IDR`;
  } catch (error) {
    currencyRate.textContent = "Currency unavailable";
    console.error(error);
  }
}

loadCurrency();

const clock = document.getElementById("clock");
const dateText = document.getElementById("date");

function updateClock() {
  const now = new Date();

  clock.textContent = now.toLocaleTimeString("en-US");

  dateText.textContent = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

updateClock();
setInterval(updateClock, 1000);
