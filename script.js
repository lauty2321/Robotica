/* ═══════════════════════════════════════════════════════════════
   RMAsm · Robótica Mano Amiga
   1. Modo oscuro   2. Menú móvil   3. Carrusel de imágenes   4. Chatbot
   ═══════════════════════════════════════════════════════════════ */

/* ════════════ 1. MODO OSCURO / CLARO ════════════ */
const btnTema = document.getElementById('btn-tema');

function aplicarTema(oscuro) {
  document.body.classList.toggle('modo-oscuro', oscuro);
  if (btnTema) btnTema.innerHTML = oscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
  try { localStorage.setItem('rmasm-tema', oscuro ? 'oscuro' : 'claro'); } catch (e) {}
}

// Recupera la preferencia guardada (o la del sistema si no hay nada guardado).
(function iniciarTema() {
  let guardado = null;
  try { guardado = localStorage.getItem('rmasm-tema'); } catch (e) {}
  if (guardado) {
    aplicarTema(guardado === 'oscuro');
  } else {
    aplicarTema(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
})();

if (btnTema) {
  btnTema.addEventListener('click', () => {
    aplicarTema(!document.body.classList.contains('modo-oscuro'));
  });
}

/* ════════════ 2. MENÚ HAMBURGUESA (MÓVIL) ════════════ */
const hamburguesa = document.getElementById('hamburguesa');
const menuNav = document.getElementById('menu-nav');

if (hamburguesa && menuNav) {
  hamburguesa.addEventListener('click', () => {
    const abierto = menuNav.classList.toggle('abierto');
    hamburguesa.innerHTML = abierto ? '✕' : '☰';
    hamburguesa.setAttribute('aria-expanded', abierto);
    hamburguesa.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });
}

/* ════════════ 3. CARRUSEL DE IMÁGENES ════════════ */
let index = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots .dot');

function showSlide(i) {
  if (!slides.length) return;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[i].classList.add('active');
  if (dots[i]) dots[i].classList.add('active');
}

function nextSlide() { index = (index + 1) % slides.length; showSlide(index); }
function prevSlide() { index = (index - 1 + slides.length) % slides.length; showSlide(index); }

const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
if (btnNext) btnNext.onclick = nextSlide;
if (btnPrev) btnPrev.onclick = prevSlide;

dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; showSlide(index); }));

if (slides.length) setInterval(nextSlide, 5000);

/* ════════════ 4. CHATBOT ════════════ */
let isOpen = false;

function toggleChat() {
  isOpen = !isOpen;
  const panel = document.getElementById('panel');
  const notif = document.getElementById('notif');
  if (!panel) return;

  panel.classList.toggle('abierto', isOpen);

  if (isOpen) {
    if (notif) notif.classList.remove('visible');
    document.getElementById('input').focus();
    scrollBot();
  }
}

function responder(mensaje) {
  mensaje = mensaje.toLowerCase();

  if (mensaje.includes('hola') || mensaje.includes('buenas') || mensaje.includes('hey'))
    return '¡Hola! 🤖 Soy el asistente de RMAsm. Preguntame sobre sensores, actuadores, Arduino, programación o tipos de robots.';

  if (mensaje.includes('rmasm') || mensaje.includes('mano amiga') || mensaje.includes('quienes') || mensaje.includes('quiénes') || mensaje.includes('nosotros'))
    return 'RMAsm es Robótica Mano Amiga 🤝 Un equipo del Departamento de Sistemas donde el que sabe le da una mano al que recién arranca. Armamos robots de verdad, no solo teoría.';

  if ((mensaje.includes('qué es') && mensaje.includes('robótica')) || mensaje.includes('robotica'))
    return 'La robótica es la rama de la tecnología que diseña, construye y programa robots. Combina mecánica, electrónica e informática para crear máquinas autónomas o semiautónomas.';

  if (mensaje.includes('arduino'))
    return 'El Arduino Uno es la placa más usada para aprender robótica 🔌 Chip ATmega328P a 16MHz, 14 pines digitales, 6 analógicos y conexión USB. La favorita para principiantes.';

  if (mensaje.includes('pines') || mensaje.includes('pin'))
    return 'El Arduino Uno tiene 3 tipos de pines ⚡ Digitales (0-13): HIGH o LOW. PWM (3,5,6,9,10,11): simulan voltaje variable. Analógicos (A0-A5): leen sensores de temperatura o luz.';

  if (mensaje.includes('led'))
    return 'Un LED se conecta al pin positivo (+) con una resistencia de 220Ω y el negativo (-) a GND 💡 Con digitalWrite(13, HIGH) lo encendés y con LOW lo apagás.';

  if (mensaje.includes('sensor'))
    return 'Los sensores son los sentidos del robot 👁️ Los más usados: ultrasónico HC-SR04 (distancia), LDR (luz), DHT11 (temperatura y humedad) e infrarrojo (seguidor de línea).';

  if (mensaje.includes('programar') || mensaje.includes('código') || mensaje.includes('lenguaje') || mensaje.includes('programa'))
    return 'Arduino se programa con C++ simplificado en su propio IDE 💻 Todo sketch tiene dos funciones: setup() se ejecuta una vez al inicio y loop() se repite infinitamente.';

  if (mensaje.includes('brazo') || mensaje.includes('manipulador'))
    return 'Los brazos robóticos tienen varios grados de libertad (DOF). Se usan en manufactura, cirugía y exploración. Su control depende de servomotores y cinemática inversa. 🦾';

  if (mensaje.includes('modo oscuro') || mensaje.includes('tema'))
    return 'Podés cambiar entre modo claro y oscuro con el botón 🌙 que está arriba a la derecha, en el menú. Se guarda tu preferencia para la próxima visita.';

  if (mensaje.includes('contacto') || mensaje.includes('sumarme') || mensaje.includes('anotar'))
    return 'Entrá a la sección Contacto del menú y completá el formulario 📬 No hace falta saber nada previo, solo tener ganas.';

  if (mensaje.includes('gracias'))
    return '¡De nada! La robótica es fascinante, seguí explorando. 🤖✨';

  return 'No entendí bien 🤔 Podés preguntarme sobre RMAsm, Arduino, LEDs, sensores, cómo programar o brazos robóticos.';
}

function escribirTexto(elemento, texto) {
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    scrollBot();
    if (i >= texto.length) clearInterval(intervalo);
  }, 16);
}

function scrollBot() {
  const chat = document.getElementById('chat');
  if (chat) chat.scrollTop = chat.scrollHeight;
}

function enviar() {
  const input = document.getElementById('input');
  const chat = document.getElementById('chat');
  const notif = document.getElementById('notif');
  if (!input || !chat) return;

  const mensaje = input.value.trim();
  if (mensaje === '') return;

  const msgUser = document.createElement('div');
  msgUser.className = 'mensaje usuario';
  msgUser.textContent = mensaje;
  chat.appendChild(msgUser);
  scrollBot();

  input.value = '';
  input.disabled = true;

  setTimeout(() => {
    const msgBot = document.createElement('div');
    msgBot.className = 'mensaje bot';
    chat.appendChild(msgBot);

    escribirTexto(msgBot, responder(mensaje));

    input.disabled = false;
    input.focus();

    if (!isOpen && notif) {
      notif.classList.add('visible');
      notif.textContent = '1';
    }
  }, 400);
}


/* Encoge la cabecera y el logo al desplazarse por la página. */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const actualizarNav = () => nav.classList.toggle('nav-compacta', window.scrollY > 40);
  actualizarNav();
  window.addEventListener('scroll', actualizarNav, { passive: true });
})();
