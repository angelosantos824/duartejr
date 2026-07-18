import { COMPANY_CONFIG } from './config.js';

function openWhatsAppWithMessage(number, message) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const required = Array.from(form.querySelectorAll('[required]'));
    const valid = required.every((input) => input.value && input.value.trim().length > 0);
    if (!valid) {
      alert('Preencha os campos obrigatorios.');
      return;
    }

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]')?.value || '';
    const message = form.querySelector('[name="message"]').value;

    const text = `Ola! Visitei o site da Duarte JR e gostaria de mais informacoes.\nNome: ${name}\nE-mail: ${email}\nMensagem: ${message}`;
    openWhatsAppWithMessage(COMPANY_CONFIG.whatsappPrimary, text);
  });
});
