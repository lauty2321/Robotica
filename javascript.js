

document.addEventListener('DOMContentLoaded', function () {


  /* ---------- 1. Menú móvil (hamburguesa) ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');


  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      menuBtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });


    // cerrar el menú al elegir un enlace
    nav.addEventListener('click', function (evento) {
      if (evento.target.tagName === 'A') {
        nav.classList.remove('abierto');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });


    // cerrar el menú con la tecla Escape
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && nav.classList.contains('abierto')) {
        nav.classList.remove('abierto');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }


  /* ---------- 2. Modo claro / oscuro ---------- */
  var raiz = document.documentElement;
  var temaBtn = document.getElementById('temaBtn');


  function leerTemaGuardado() {
    try {
      return localStorage.getItem('robotica-tema');
    } catch (error) {
      return null;
    }
  }


  function guardarTema(valor) {
    try {
      localStorage.setItem('robotica-tema', valor);
    } catch (error) {
      // si el navegador bloquea localStorage, el tema simplemente no se guarda
    }
  }


  function aplicarTema(tema) {
    raiz.setAttribute('data-theme', tema);
    var esOscuro = tema === 'dark';
    if (temaBtn) {
      temaBtn.textContent = esOscuro ? '☀️' : '🌙';
      temaBtn.setAttribute('aria-pressed', esOscuro ? 'true' : 'false');
      temaBtn.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
  }


  var temaInicial = leerTemaGuardado();
  if (!temaInicial) {
    var prefiereOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    temaInicial = prefiereOscuro ? 'dark' : 'light';
  }
  aplicarTema(temaInicial);


  if (temaBtn) {
    temaBtn.addEventListener('click', function () {
      var actual = raiz.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var nuevo = actual === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevo);
      guardarTema(nuevo);
    });
  }


  /* ---------- 3. Aparición suave al hacer scroll ---------- */
  var elementosRevelados = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && elementosRevelados.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });


    elementosRevelados.forEach(function (el) { observador.observe(el); });
  } else {
    // si el navegador no soporta el observer, se muestra todo directamente
    elementosRevelados.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ---------- 4. Placeholders elegantes para fotos que faltan ----------
     Todas las imágenes reales usan la clase "foto-real". Como todavía
     no existen los archivos, este bloque intercepta el error de carga
     y muestra un espacio prolijo en su lugar, sin romper el diseño.
     El día que se agregue la foto de verdad (mismo nombre de archivo),
     esto deja de activarse y se ve la imagen sin tocar nada más. */
  var iconoPlaceholder =
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.8"/>' +
    '<circle cx="9" cy="10" r="1.8" stroke="currentColor" stroke-width="1.8"/>' +
    '<path d="M4 17l6-5 4 3.5 3-2.5 3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';


  document.querySelectorAll('img.foto-real').forEach(function (img) {
    img.addEventListener('error', function () {
      var contenedor = img.closest('.marco-imagen') || img.parentElement;
      var nombreArchivo = img.getAttribute('src');
      var descripcion = img.getAttribute('alt') || 'Espacio para imagen';


      contenedor.classList.add('sin-imagen');
      contenedor.innerHTML =
        '<span class="placeholder-icono">' + iconoPlaceholder + '</span>' +
        '<span class="placeholder-texto">' + descripcion + '</span>' +
        '<span class="placeholder-archivo">' + nombreArchivo + '</span>';
    }, { once: true });
  });


  /* ---------- 5. Sección interactiva: ¿qué habilidad estás desarrollando? ---------- */
  var explicacionesHabilidad = {
    programacion: 'Programar es escribirle instrucciones claras a una máquina. Cada vez que armás una secuencia para un robot, estás practicando esta habilidad.',
    creatividad: 'La creatividad aparece cuando el camino esperado no funciona y hay que imaginar una solución distinta a la que estaba planeada.',
    logica: 'El pensamiento lógico es ordenar los pasos de un problema para llegar a un resultado, sin saltarse ninguno.',
    equipo: 'Trabajar en equipo es repartir tareas según lo que cada uno sabe hacer mejor, y juntar esas partes en un solo proyecto.',
    problemas: 'Resolver problemas es probar algo, ver qué falla, ajustar y volver a intentar, tantas veces como haga falta.'
  };


  var botonesHabilidad = document.querySelectorAll('.chip-btn[data-habilidad]');
  var respuestaHabilidad = document.getElementById('respuestaHabilidad');


  botonesHabilidad.forEach(function (boton) {
    boton.addEventListener('click', function () {
      botonesHabilidad.forEach(function (b) { b.classList.remove('activo'); b.setAttribute('aria-pressed', 'false'); });
      boton.classList.add('activo');
      boton.setAttribute('aria-pressed', 'true');


      var clave = boton.getAttribute('data-habilidad');
      if (respuestaHabilidad && explicacionesHabilidad[clave]) {
        respuestaHabilidad.textContent = explicacionesHabilidad[clave];
      }
    });
  });


  /* ---------- 6. Formulario de contacto con validación ---------- */
  var formulario = document.getElementById('formularioContacto');
  if (formulario) {
    var campoNombre = document.getElementById('nombre');
    var campoEmail = document.getElementById('email');
    var campoMensaje = document.getElementById('mensaje');
    var estadoFormulario = document.getElementById('estadoFormulario');


    function mostrarError(campo, mensajeErrorId, mensaje) {
      var errorSpan = document.getElementById(mensajeErrorId);
      var contenedorCampo = campo.closest('.campo');
      if (errorSpan) errorSpan.textContent = mensaje;
      if (contenedorCampo) {
        if (mensaje) {
          contenedorCampo.classList.add('campo--error');
        } else {
          contenedorCampo.classList.remove('campo--error');
        }
      }
    }


    function validarEmail(valor) {
      // patrón simple y suficiente para validar un formulario de contacto escolar
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }


    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var esValido = true;


      if (campoNombre.value.trim().length < 2) {
        mostrarError(campoNombre, 'errorNombre', 'Ingresá tu nombre.');
        esValido = false;
      } else {
        mostrarError(campoNombre, 'errorNombre', '');
      }


      if (!validarEmail(campoEmail.value.trim())) {
        mostrarError(campoEmail, 'errorEmail', 'Ingresá un email válido.');
        esValido = false;
      } else {
        mostrarError(campoEmail, 'errorEmail', '');
      }


      if (campoMensaje.value.trim().length < 5) {
        mostrarError(campoMensaje, 'errorMensaje', 'Contanos un poco más en el mensaje.');
        esValido = false;
      } else {
        mostrarError(campoMensaje, 'errorMensaje', '');
      }


      if (!esValido) {
        estadoFormulario.textContent = '';
        estadoFormulario.classList.remove('exito');
        return;
      }


      // Este formulario todavía no envía los datos a ningún servidor.
      // Cuando se conecte a un correo o servicio, este es el lugar
      // donde se dispararía el envío real.
      estadoFormulario.textContent = 'Listo, ' + campoNombre.value.trim() + '. Tu mensaje quedó validado y listo para enviarse.';
      estadoFormulario.classList.add('exito');
      formulario.reset();
    });
  }


});

