import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function setHeaderInfo(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;
  document.querySelector("head > title").textContent = data.fullName;
  document.querySelector(".hero-banner > img").src = data.images[0].url;
  document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${parkData.fullName}</h1>
  <p>${parkData.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.innerHTML = html.join("");
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

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

function introTemplate(info) {
  return `
  <h2>${info.fullName}</h2>
  <p>${info.description}</p>
  `;
}

const introSection = document.querySelector('.intro');
if (introSection) {
  introSection.innerHTML = introTemplate(parkData);
}

function mediaCardTemplate(info) {
  return `
    <div class="media-card">
      <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}" class="media-card__img">
      </a>
      <h3 class="media-card__title">${info.name}</h3>
      <p>${info.description}</p>
    </div>
  `; 
}

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

const infoSection = document.querySelector('.info');
if (infoSection) {
  infoSection.innerHTML = parkInfoLinks
    .map(link => mediaCardTemplate({
      url: link.link,
      images: [{ url: link.image, altText: link.name }],
      fullName: link.name,
      description: link.description
    }))
    .join('');
}

function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

function getPhoneNumber(phoneNumbers) {
  const voice = phoneNumbers.find((phoneNumber) => phoneNumber.type === "Voice");
  return voice;
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getPhoneNumber(info.contacts.phoneNumbers);

  return `<section class="contact">
  <h3>Contact Info</h3>
  <h4>Mailing Address:</h4>
  <div><p>${mailing.line1}<p>
  <p>${mailing.city},${mailing.stateCode} ${mailing.postalCode}</p></div>
  <h4>Phone:</h4>
  <p>${voice.phoneNumber}</p>
  </section>`;
}

setHeaderInfo(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);
setFooter(parkData);

