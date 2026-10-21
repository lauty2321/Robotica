const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const themeButton = document.getElementById('btn-tema');
const revealItems = document.querySelectorAll('.reveal');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const backToTop = document.querySelector('.back-to-top');
const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const detailButtons = document.querySelectorAll('[data-modal]');

function applyTheme(isLight) {
  document.body.classList.toggle('light-mode', isLight);
  document.body.classList.toggle('modo-oscuro', !isLight);
  if (themeButton) {
    themeButton.textContent = isLight ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    themeButton.setAttribute('aria-pressed', String(isLight));
  }
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem('theme');
const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

if (themeButton) {
  themeButton.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-mode');
    applyTheme(isLight);
  });
}

applyTheme(savedTheme ? savedTheme === 'light' : prefersLightMode);

const modalData = {
  perseverance: {
    title: 'Perseverance: explorando Marte',
    content: `
      <p>Perseverance llegó a Marte en febrero de 2021 y es una de las misiones más importantes de la NASA para estudiar el planeta rojo. Su diseño combina exploración, análisis geológico y recolección de muestras con una gran autonomía.</p>
      <ul>
        <li>Seis ruedas para avanzar sobre terrenos rocosos.</li>
        <li>Brazo robótico de aproximadamente 2,1 metros.</li>
        <li>Cámaras y sensores para mapear el entorno.</li>
        <li>Busca señales de vida microbiana antigua.</li>
      </ul>
    `
  },
  canadarm2: {
    title: 'Canadarm2: el brazo robótico de la ISS',
    content: `
      <p>Canadarm2 es un elemento central de la Estación Espacial Internacional. Gracias a su gran longitud y precisión, realiza tareas de manipulación y mantenimiento vitales para la vida en órbita.</p>
      <ul>
        <li>Mide aproximadamente 17 metros.</li>
        <li>Puede mover equipos y suministros.</li>
        <li>Ayuda en la operación de la estación.</li>
        <li>Captura naves de carga y transporta astronautas durante ciertas operaciones.</li>
      </ul>
    `
  },
  dextre: {
    title: 'Dextre: precisión robótica en el espacio',
    content: `
      <p>Dextre lleva la precisión robótica al siguiente nivel. Diseñado para trabajos delicados, puede intervenir en elementos de la estación sin requerir intervenciones humanas arriesgadas.</p>
      <ul>
        <li>Posee dos brazos robóticos.</li>
        <li>Manipula componentes como baterías y cámaras.</li>
        <li>Reduce la necesidad de caminatas espaciales.</li>
        <li>Permite mantenimiento exterior de la ISS.</li>
      </ul>
    `
  },
  sondas: {
    title: 'Sondas espaciales robóticas',
    content: `
      <p>Las sondas robóticas son naves que viajan a lugares remotos del sistema solar para registrar información sobre su composición, atmósfera y superficies. Son clave para la ciencia planetaria.</p>
      <ul>
        <li>Capturan imágenes detalladas.</li>
        <li>Estudian temperaturas y atmósferas.</li>
        <li>Analizan composición química y materiales.</li>
        <li>Reúnen datos científicos durante años de misión.</li>
      </ul>
    `
  }
};

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function openModal(key) {
  const item = modalData[key];
  if (!item) return;

  modalContent.innerHTML = `<h3 id="modal-title">${item.title}</h3>${item.content}`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

detailButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modal));
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target.dataset.closeModal === 'true' || event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 420) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const currentYear = new Date().getFullYear();
console.log(`Robótica Espacial · ${currentYear}`);
