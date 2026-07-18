import './navigation.js';
import { COMPANY_CONFIG } from './config.js';
import { SERVICES } from './data/services.js';
import { VEHICLES } from './data/vehicles.js';
import { COMPANY_CONTENT } from './data/company-content.js';

export const COMPANY_WHATSAPP = COMPANY_CONFIG.whatsappPrimary;

function whatsappUrl(message = '') {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${COMPANY_CONFIG.whatsappPrimary}${text}`;
}

function setContactText(el, text) {
  const icon = el.querySelector('.footer-icon');
  if (!icon) {
    el.textContent = text;
    return;
  }

  let label = el.querySelector('.footer-contact-text');
  if (!label) {
    label = document.createElement('span');
    label.className = 'footer-contact-text';
    el.appendChild(label);
  }
  label.textContent = text;
}

function populateSiteData() {
  document.querySelectorAll('[data-company-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-company-name]').forEach((el) => {
    el.textContent = COMPANY_CONFIG.name;
  });

  document.querySelectorAll('[data-company-city]').forEach((el) => {
    el.textContent = COMPANY_CONFIG.city;
  });

  document.querySelectorAll('[data-company-state]').forEach((el) => {
    el.textContent = COMPANY_CONFIG.state;
  });

  document.querySelectorAll('[data-company-address]').forEach((el) => {
    el.textContent = COMPANY_CONFIG.address;
  });

  document.querySelectorAll('[data-wa-primary]').forEach((el) => {
    setContactText(el, COMPANY_CONFIG.phonePrimaryDisplay);
    if (el.tagName === 'A') el.href = `https://wa.me/${COMPANY_CONFIG.whatsappPrimary}`;
  });

  document.querySelectorAll('[data-wa-secondary]').forEach((el) => {
    setContactText(el, COMPANY_CONFIG.phoneSecondaryDisplay);
    if (el.tagName === 'A') el.href = `https://wa.me/${COMPANY_CONFIG.whatsappSecondary}`;
  });

  document.querySelectorAll('[data-whatsapp-link]').forEach((el) => {
    el.href = whatsappUrl('Ola! Visitei o site da Duarte JR e gostaria de solicitar um orcamento.');
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.querySelectorAll('[data-company-email]').forEach((el) => {
    setContactText(el, COMPANY_CONFIG.email);
    if (el.tagName === 'A') el.href = `mailto:${COMPANY_CONFIG.email}`;
  });

  document.querySelectorAll('[data-company-instagram]').forEach((el) => {
    el.textContent = `@${COMPANY_CONFIG.instagram}`;
    if (el.tagName === 'A') {
      el.href = COMPANY_CONFIG.instagramUrl;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
  });

  const mapsBtn = document.getElementById('open-google-maps');
  if (mapsBtn) {
    const q = encodeURIComponent(COMPANY_CONFIG.address);
    mapsBtn.href = `https://www.google.com/maps/search/?api=1&query=${q}`;
    mapsBtn.target = '_blank';
    mapsBtn.rel = 'noopener noreferrer';
  }
}

function renderServices() {
  const root = document.getElementById('services-cards');
  if (!root) return;
  root.innerHTML = '';
  SERVICES.forEach((service) => {
    const card = document.createElement('article');
    card.className = 'card service-card';
    card.innerHTML = `
      <div class="service-icon" aria-hidden="true">${service.title.slice(0, 1)}</div>
      <div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <a class="text-link" href="aluguel.html">Solicitar atendimento</a>
      </div>
    `;
    root.appendChild(card);
  });
}

function renderFleetPreview() {
  const root = document.getElementById('fleet-preview');
  if (!root) return;
  root.innerHTML = '';
  VEHICLES.filter((vehicle) => vehicle.active).slice(0, 3).forEach((vehicle) => {
    const card = document.createElement('article');
    card.className = 'card vehicle-card';
    card.innerHTML = `
      <img src="${vehicle.image}" alt="${vehicle.name}">
      <div class="card-body">
        <p class="eyebrow">${vehicle.categoryLabel}</p>
        <h3>${vehicle.name}</h3>
        <p>Capacidade para ate ${vehicle.passengers} passageiros.</p>
        <a class="btn btn-secondary" href="frota.html">Ver detalhes</a>
      </div>
    `;
    root.appendChild(card);
  });
}

function populateContent() {
  document.querySelectorAll('[data-content="hero-title"]').forEach((el) => { el.textContent = COMPANY_CONTENT.hero.title; });
  document.querySelectorAll('[data-content="hero-description"]').forEach((el) => { el.textContent = COMPANY_CONTENT.hero.description; });
  document.querySelectorAll('[data-content="hero-secondary"]').forEach((el) => { el.textContent = COMPANY_CONTENT.hero.secondary; });
  document.querySelectorAll('[data-content="hero-highlight"]').forEach((el) => { el.textContent = COMPANY_CONTENT.hero.highlight; });
  document.querySelectorAll('[data-content="service-area-title"]').forEach((el) => { el.textContent = COMPANY_CONTENT.serviceArea.title; });
  document.querySelectorAll('[data-content="service-area-description"]').forEach((el) => { el.textContent = COMPANY_CONTENT.serviceArea.description; });
}

function slowCompanyVideo() {
  document.querySelectorAll('.company-video').forEach((video) => {
    video.playbackRate = 0.75;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateSiteData();
  populateContent();
  renderServices();
  renderFleetPreview();
  slowCompanyVideo();
});
