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