import { COMPANY_CONFIG } from './config.js';

function openWhatsApp(number, message) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const required = Array.from(form.querySelectorAll('[required]'));
    const valid = required.every((input) => input.value && input.value.trim().length > 0);
    if (!valid) {
      alert('Preencha os campos obrigatorios.');
      return;
    }

    const data = {
      nome: form.querySelector('[name="name"]').value,
      telefone: form.querySelector('[name="phone"]').value || '',
      email: form.querySelector('[name="email"]').value || '',
      saida: form.querySelector('[name="from"]').value || '',
      destino: form.querySelector('[name="to"]').value || '',
      ida: form.querySelector('[name="date-depart"]').value || '',
      retorno: form.querySelector('[name="date-return"]').value || '',
      passageiros: form.querySelector('[name="passengers"]').value || '',
      veiculo: form.querySelector('[name="vehicle-type"]').value || '',
      servico: form.querySelector('[name="service-type"]').value || '',
      observacoes: form.querySelector('[name="obs"]').value || ''
    };

    const message = `Ola! Gostaria de solicitar um orcamento com a Duarte JR.\nNome: ${data.nome}\nTelefone: ${data.telefone}\nE-mail: ${data.email}\nLocal de saida: ${data.saida}\nDestino: ${data.destino}\nData de ida: ${data.ida}\nData de retorno: ${data.retorno}\nQuantidade de passageiros: ${data.passageiros}\nTipo de veiculo: ${data.veiculo}\nTipo de servico: ${data.servico}\nObservacoes: ${data.observacoes}`;

    openWhatsApp(COMPANY_CONFIG.whatsappPrimary, message);
  });
});
