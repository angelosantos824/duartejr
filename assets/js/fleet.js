import { COMPANY_CONFIG } from './config.js';
import { VEHICLES } from './data/vehicles.js';

function createVehicleCard(vehicle) {
  const div = document.createElement('article');
  div.className = 'card vehicle-card';
  div.innerHTML = `
    <img src="${vehicle.image}" alt="${vehicle.name}">
    <div class="card-body">
      <p class="eyebrow">${vehicle.categoryLabel}</p>
      <h3>${vehicle.name}</h3>
      <p>Capacidade para ate ${vehicle.passengers} passageiros.</p>
      <ul class="vehicle-features">
        <li>${vehicle.airConditioning ? 'Ar-condicionado' : 'Ventilacao natural'}</li>
        <li>${vehicle.luggage ? 'Espaco para bagagem' : 'Bagagem sob consulta'}</li>
      </ul>
      <button class="btn btn-secondary" data-id="${vehicle.id}" type="button">Ver detalhes</button>
    </div>
  `;
  return div;
}

function renderFleet(list) {
  const root = document.getElementById('fleet-list');
  if (!root) return;
  root.innerHTML = '';
  list.filter((vehicle) => vehicle.active).forEach((vehicle) => {
    root.appendChild(createVehicleCard(vehicle));
  });
}

function setActiveFilter(activeButton) {
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.classList.toggle('btn-secondary', button === activeButton);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFleet(VEHICLES);

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      setActiveFilter(button);
      renderFleet(filter === 'all' ? VEHICLES : VEHICLES.filter((vehicle) => vehicle.category === filter));
    });
  });

  document.body.addEventListener('click', (event) => {
    const el = event.target.closest('[data-id]');
    if (!el) return;
    event.preventDefault();
    const vehicle = VEHICLES.find((item) => item.id === Number(el.getAttribute('data-id')));
    if (vehicle) openVehicleModal(vehicle);
  });
});

function openVehicleModal(vehicle) {
  let modal = document.getElementById('vehicle-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'vehicle-modal';
    modal.className = 'modal';
    modal.setAttribute('aria-hidden', 'true');
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-label="Detalhes do veiculo">
      <button class="modal-close" aria-label="Fechar">x</button>
      <div class="modal-body">
        <img src="${vehicle.image}" alt="${vehicle.name}">
        <p class="eyebrow">${vehicle.categoryLabel}</p>
        <h3>${vehicle.name}</h3>
        <p>Capacidade para ate ${vehicle.passengers} passageiros, com ${vehicle.airConditioning ? 'ar-condicionado' : 'ventilacao natural'} e ${vehicle.luggage ? 'espaco para bagagem' : 'bagagem sob consulta'}.</p>
        <div class="modal-actions">
          <button class="btn btn-primary" type="button" id="modal-wa">Solicitar orcamento</button>
          <button class="btn" id="modal-close-2">Fechar</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  modal.querySelectorAll('.modal-close, #modal-close-2').forEach((button) => {
    button.addEventListener('click', closeModal);
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', handleEsc);

  const waBtn = modal.querySelector('#modal-wa');
  waBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const msg = `Ola! Visitei o site da Duarte JR e gostaria de solicitar um orcamento para o veiculo: ${vehicle.name}`;
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappPrimary}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(event) {
    if (event.key === 'Escape') closeModal();
  }
}
