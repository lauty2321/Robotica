// ── CARRUSEL ───────────────────────────────────────────────────
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(index) {
  if (slides.length === 0) return; // Por si no hay slides

  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[slideIndex].classList.add('active');
  if(dots[slideIndex]) dots[slideIndex].classList.add('active');
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => { slideIndex++; showSlide(slideIndex); });
  prevBtn.addEventListener('click', () => { slideIndex--; showSlide(slideIndex); });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { slideIndex = i; showSlide(slideIndex); });
});

// Auto-play del carrusel (cambia de imagen cada 4 segundos)
if (slides.length > 0) {
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 4000);
}


// ── CHATBOT ────────────────────────────────────────────────────
function toggleChat() {
  const panel = document.getElementById('panel');
  if(panel) panel.classList.toggle('abierto');
}

function enviar() {
  const input = document.getElementById('input');
  const chat = document.getElementById('chat');
  
  if (!input || !chat) return;

  const texto = input.value.trim();
  
  if (texto !== '') {
    // Mensaje del usuario
    chat.innerHTML += `<div class="mensaje usuario">${texto}</div>`;
    input.value = '';
    
    // Auto-scroll hacia abajo
    chat.scrollTop = chat.scrollHeight;

    // Respuesta simulada del bot
    setTimeout(() => {
      chat.innerHTML += `<div class="mensaje bot">¡Qué interesante! Estoy aquí para ayudarte a aprender más sobre robótica. 🤖</div>`;
      chat.scrollTop = chat.scrollHeight;
    }, 1000);
  }
}


// ── FUNCIONALIDAD: MODO OSCURO / CLARO ─────────────────────────
const btnTema = document.getElementById('btn-tema');

if (btnTema) {
  btnTema.addEventListener('click', () => {
    // Al hacer clic, le agregamos o quitamos la clase "modo-oscuro" a toda la página (body)
    document.body.classList.toggle('modo-oscuro');
    
    // Cambiamos el texto y el emoji del botón dependiendo de si está oscuro o claro
    if (document.body.classList.contains('modo-oscuro')) {
      btnTema.innerHTML = '☀️ Modo Claro';
    } else {
      btnTema.innerHTML = '🌙 Modo Oscuro';
    }
  });
}

// Formulario de contacto: muestra una confirmacion sin recargar la pagina.
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const nombre = formData.get('nombre');

    contactStatus.textContent = `Gracias, ${nombre}. Recibimos tu mensaje y te responderemos pronto.`;
    contactStatus.classList.add('visible');
    contactForm.reset();
  });
}


// ── MENÚ HAMBURGUESA, MODALES Y NAVEGACIÓN ESPACIAL ──────────────
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const revealItems = document.querySelectorAll('.reveal');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const backToTop = document.querySelector('.back-to-top');
const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const detailButtons = document.querySelectorAll('[data-modal]');

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
  if (!navMenu || !navToggle) return;
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu && navToggle) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

if (revealItems.length > 0) {
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
}

function openModal(key) {
  if (!modal || !modalContent) return;
  const item = modalData[key];
  if (!item) return;

  modalContent.innerHTML = `<h3 id="modal-title">${item.title}</h3>${item.content}`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

detailButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modal));
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target.dataset.closeModal === 'true' || event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
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
  if (backToTop) {
    if (window.scrollY > 420) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const currentYear = new Date().getFullYear();
console.log(`Sitio Web Robótica · ${currentYear}`);