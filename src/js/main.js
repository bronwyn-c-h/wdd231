import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

const heroImg = document.querySelector('.hero-banner > img');
if (heroImg && parkData.images && parkData.images.length > 0) {
  heroImg.src = parkData.images[0].url;
  heroImg.alt = parkData.images[0].altText || parkData.fullName;
}
const heroBanner = document.querySelector(".hero-banner__content");
if (heroBanner) {
    heroBanner.innerHTML = parkInfoTemplate(parkData);
}

