/* ═══════════════════════════════════════════════════════════════
   RMAsm · Robótica Mano Amiga
   1. Modo oscuro   2. Menú móvil   3. Carrusel de imágenes
   4. Carrusel de cards con tiempo de espera   5. Chatbot
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
    menuNav.classList.toggle('abierto');
    hamburguesa.innerHTML = menuNav.classList.contains('abierto') ? '✕' : '☰';
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

/* ════════════ 4. CARRUSEL DE CARDS CON TIEMPO DE ESPERA ════════════
   Las cards se desplazan solas, pero con una pausa larga (7 segundos)
   para que se alcancen a leer. Además se frena cuando el mouse entra
   al carrusel, cuando se usa el teclado dentro, o con el botón Pausar.
   ══════════════════════════════════════════════════════════════════ */

const ESPERA = 7000;            // tiempo de lectura entre cada movimiento (ms)

const track      = document.getElementById('cards-track');
const zona       = document.getElementById('cards-carrusel');
const contDots   = document.getElementById('cards-dots');
const barraTiempo= document.getElementById('barra-tiempo');
const btnPausa   = document.getElementById('cards-pausa');
const cPrev      = document.getElementById('cards-prev');
const cNext      = document.getElementById('cards-next');

if (track) {
  const cards = Array.from(track.children);
  let pos = 0;           // índice de la card que está primera a la izquierda
  let pausado = false;   // pausa manual con el botón
  let congelado = false; // pausa temporal (mouse encima / pestaña oculta)
  let t0 = null;         // marca de tiempo del ciclo actual
  let transcurrido = 0;  // tiempo acumulado del ciclo (para reanudar donde quedó)

  // Cuántas cards entran a la vista según el ancho de pantalla
  function visibles() {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 980) return 2;
    return 3;
  }

  function maxPos() { return Math.max(0, cards.length - visibles()); }

  // Mueve el track y marca el dot correspondiente
  function irA(i) {
    pos = i;
    if (pos > maxPos()) pos = 0;
    if (pos < 0) pos = maxPos();

    const card = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const paso = card.getBoundingClientRect().width + gap;

    track.style.transform = `translateX(-${pos * paso}px)`;

    contDots.querySelectorAll('.cards-dot').forEach((d, k) => {
      d.classList.toggle('active', k === pos);
    });

    reiniciarReloj();
  }

  // Construye los puntitos de navegación
  function armarDots() {
    contDots.innerHTML = '';
    for (let i = 0; i <= maxPos(); i++) {
      const b = document.createElement('button');
      b.className = 'cards-dot' + (i === pos ? ' active' : '');
      b.setAttribute('aria-label', 'Ir al grupo ' + (i + 1));
      b.addEventListener('click', () => irA(i));
      contDots.appendChild(b);
    }
  }

  /* ── Reloj del carrusel ──
     En vez de un setInterval seco, usamos requestAnimationFrame para
     poder pintar la barra de progreso y congelar el conteo cuando hace
     falta, sin que el usuario pierda el tiempo que ya había esperado. */
  function reiniciarReloj() { transcurrido = 0; t0 = performance.now(); }

  function tic(ahora) {
    if (t0 === null) t0 = ahora;

    if (pausado || congelado) {
      t0 = ahora - transcurrido;     // congela el conteo donde estaba
    } else {
      transcurrido = ahora - t0;
      if (transcurrido >= ESPERA) { irA(pos + 1); }
    }

    if (barraTiempo) {
      const pct = Math.min(100, (transcurrido / ESPERA) * 100);
      barraTiempo.style.width = pct + '%';
      barraTiempo.style.opacity = (pausado || congelado) ? 0.35 : 1;
    }

    requestAnimationFrame(tic);
  }

  // Frena al pasar el mouse o al navegar con teclado dentro del carrusel
  zona.addEventListener('mouseenter', () => { congelado = true; });
  zona.addEventListener('mouseleave', () => { congelado = false; });
  zona.addEventListener('focusin',  () => { congelado = true; });
  zona.addEventListener('focusout', () => { congelado = false; });

  // Frena también si el usuario se va a otra pestaña
  document.addEventListener('visibilitychange', () => { congelado = document.hidden; });

  // Flechas
  if (cNext) cNext.addEventListener('click', () => irA(pos + 1));
  if (cPrev) cPrev.addEventListener('click', () => irA(pos - 1));

  // Botón pausar / reanudar
  if (btnPausa) {
    btnPausa.addEventListener('click', () => {
      pausado = !pausado;
      btnPausa.innerHTML = pausado
        ? '<i class="fa-solid fa-play"></i> Reanudar'
        : '<i class="fa-solid fa-pause"></i> Pausar';
    });
  }

  // Arrastre con el dedo en celulares
  let xInicio = null;
  zona.addEventListener('touchstart', e => { xInicio = e.touches[0].clientX; }, { passive: true });
  zona.addEventListener('touchend', e => {
    if (xInicio === null) return;
    const dif = xInicio - e.changedTouches[0].clientX;
    if (Math.abs(dif) > 50) irA(dif > 0 ? pos + 1 : pos - 1);
    xInicio = null;
  });

  // Recalcula todo si cambia el tamaño de la ventana
  let temporizadorResize;
  window.addEventListener('resize', () => {
    clearTimeout(temporizadorResize);
    temporizadorResize = setTimeout(() => { armarDots(); irA(Math.min(pos, maxPos())); }, 150);
  });

  // Arranque
  armarDots();
  irA(0);
  requestAnimationFrame(tic);
}

/* ════════════ 5. CHATBOT ════════════ */
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
