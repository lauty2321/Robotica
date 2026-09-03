let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

document.querySelector(".next").onclick = nextSlide;
document.querySelector(".prev").onclick = prevSlide;

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
  });
});

/* Auto play */
setInterval(nextSlide, 4000);

// Variable global que guarda si el chat está abierto o cerrado.
let isOpen = false;

// Función que abre o cierra el panel del chat al hacer clic en la burbuja.
function toggleChat() {
  isOpen = !isOpen;

  const panel = document.getElementById("panel");
  const notif = document.getElementById("notif");

  panel.classList.toggle("abierto", isOpen);

  if (isOpen) {
    notif.classList.remove("visible");
    document.getElementById("input").focus();
    scrollBot();
  }
}

// Función que recibe el mensaje del usuario y devuelve una respuesta.
function responder(mensaje) {
  mensaje = mensaje.toLowerCase();

  if (mensaje.includes("hola") || mensaje.includes("buenas") || mensaje.includes("hey"))
    return "¡Hola! 🤖 Soy tu asistente de robótica. Preguntame sobre sensores, actuadores, Arduino, programación o tipos de robots.";

  if ((mensaje.includes("qué es") && mensaje.includes("robótica")) || mensaje.includes("robotica"))
    return "La robótica es la rama de la tecnología que diseña, construye y programa robots. Combina mecánica, electrónica e informática para crear máquinas autónomas o semiautónomas.";

  if (mensaje.includes("arduino uno"))
    return "El Arduino Uno es la placa más usada para aprender robótica 🔌 Tiene un chip ATmega328P a 16MHz, 14 pines digitales, 6 analógicos y se conecta por USB. ¡Es la favorita para principiantes!";

  if (mensaje.includes("pines") || mensaje.includes("pin"))
    return "El Arduino Uno tiene 3 tipos de pines ⚡ Digitales (0-13): solo HIGH o LOW. PWM (3,5,6,9,10,11): simulan voltaje variable. Analógicos (A0-A5): leen sensores como temperatura o luz.";

  if (mensaje.includes("led"))
    return "Un LED en Arduino Uno se conecta al pin positivo (+) con una resistencia de 220Ω y el negativo (-) a GND 💡 Con digitalWrite(13, HIGH) lo encendés y con LOW lo apagás.";

  if (mensaje.includes("programar") || mensaje.includes("código") || mensaje.includes("lenguaje") || mensaje.includes("programa"))
    return "Arduino se programa con C++ simplificado usando el IDE de Arduino 💻 Todo sketch tiene dos funciones: setup() que se ejecuta una vez al inicio, y loop() que se repite infinito.";

  if (mensaje.includes("brazo") || mensaje.includes("manipulador"))
    return "Los brazos robóticos tienen varios grados de libertad (DOF). Se usan en manufactura, cirugía y exploración. Su control depende de servomotores y algoritmos de cinemática inversa. 🦾";

  if (mensaje.includes("gracias"))
    return "¡De nada! La robótica es fascinante, seguí explorando. 🤖✨";

  return "No entendí bien 🤔 Podés preguntarme sobre Arduino Uno, LEDs, cómo programar, brazos robóticos o qué es la robótica.";
}

// Función que escribe el texto del bot letra por letra (efecto de tipeo).
function escribirTexto(elemento, texto) {
  let i = 0;
  let intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    scrollBot();
    if (i >= texto.length) clearInterval(intervalo);
  }, 18);
}

// Función que scrollea el chat hasta el último mensaje.
function scrollBot() {
  const chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
}

// Función principal que se ejecuta cuando el usuario aprieta "Enviar" o Enter.
function enviar() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const notif = document.getElementById("notif");

  const mensaje = input.value.trim();
  if (mensaje === "") return;

  const msgUser = document.createElement("div");
  msgUser.className = "mensaje usuario";
  msgUser.textContent = mensaje;
  chat.appendChild(msgUser);
  scrollBot();

  input.value = "";
  input.disabled = true;

  setTimeout(() => {
    const msgBot = document.createElement("div");
    msgBot.className = "mensaje bot";
    chat.appendChild(msgBot);

    const respuesta = responder(mensaje);
    escribirTexto(msgBot, respuesta);

    input.disabled = false;
    input.focus();

    if (!isOpen) {
      notif.classList.add("visible");
      notif.textContent = "1";
    }
  }, 400);
}