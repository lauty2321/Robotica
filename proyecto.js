const proyectos = {

    primero: {
        etiqueta: "1.º AÑO",
        titulo: "Introducción a la Robótica",
        descripcion: "Primer acercamiento al mundo de la tecnología y la robótica.",
        contenido: `
            <h3>Contenidos</h3>
            <ul>
                <li>¿Qué es la robótica?</li>
                <li>Hardware y software</li>
                <li>Componentes electrónicos</li>
                <li>Sensores</li>
                <li>Actuadores</li>
                <li>Algoritmos</li>
            </ul>

            <h3>Proyecto</h3>
            <p>
                Construcción de un circuito sencillo con LEDs
                para comprender entradas y salidas.
            </p>
        `
    },

    segundo: {
        etiqueta: "2.º AÑO",
        titulo: "Programación y Arduino",
        descripcion: "Programación aplicada a dispositivos electrónicos.",
        contenido: `
            <h3>Contenidos</h3>
            <ul>
                <li>Algoritmos</li>
                <li>PSeInt</li>
                <li>Variables</li>
                <li>Constantes</li>
                <li>Operadores</li>
                <li>Arduino</li>
                <li>Sensores y actuadores</li>
            </ul>

            <h3>Proyecto</h3>
            <p>
                Programación de LEDs utilizando Arduino.
            </p>
        `
    },

    tercero: {
        etiqueta: "3.º AÑO",
        titulo: "Sistema de Semáforo",
        descripcion: "Proyecto de automatización utilizando Arduino.",
        contenido: `
            <h3>Proyecto</h3>
            <p>
                Construcción de un semáforo electrónico
                utilizando LEDs rojo, amarillo y verde.
            </p>

            <h3>Componentes</h3>
            <ul>
                <li>Arduino Uno</li>
                <li>LED rojo</li>
                <li>LED amarillo</li>
                <li>LED verde</li>
                <li>Resistencias</li>
                <li>Protoboard</li>
            </ul>
        `
    },

    cuarto: {
        etiqueta: "4.º AÑO",
        titulo: "Automatización con Arduino",
        descripcion: "Desarrollo de sistemas automatizados.",
        contenido: `
            <h3>Contenidos</h3>
            <ul>
                <li>Sensores</li>
                <li>Servomotores</li>
                <li>Arduino</li>
                <li>Automatización</li>
                <li>Condicionales</li>
                <li>Ciclos de repetición</li>
            </ul>

            <h3>Proyecto</h3>
            <p>
                Desarrollo de una barrera automática
                utilizando un servomotor y un sensor.
            </p>
        `
    },

    quinto: {
        etiqueta: "5.º AÑO",
        titulo: "Robótica Aplicada",
        descripcion: "Integración de programación, electrónica y automatización.",
        contenido: `
            <h3>Contenidos</h3>
            <ul>
                <li>Arduino</li>
                <li>RFID</li>
                <li>Sensores</li>
                <li>Servomotores</li>
                <li>Automatización</li>
                <li>Comunicación Serial</li>
            </ul>

            <h3>Proyecto</h3>
            <p>
                Desarrollo de un sistema automatizado
                capaz de identificar una tarjeta y activar
                un mecanismo.
            </p>
        `
    },

    sexto: {
        etiqueta: "6.º AÑO - PROYECTO DESTACADO",
        titulo: "Control de Acceso con RFID y Arduino",
        descripcion:
            "Sistema de control de acceso mediante RFID, Arduino Uno y servomotor.",

        contenido: `
            <h3>Objetivo</h3>

            <p>
                Diseñar y construir un sistema de control
                de acceso utilizando tecnología RFID.
            </p>

            <h3>Componentes</h3>

            <ul>
                <li>Arduino Uno</li>
                <li>Lector RFID RC522</li>
                <li>Tarjetas RFID</li>
                <li>Llaveros RFID</li>
                <li>Servo motor SG90</li>
                <li>LED verde</li>
                <li>LED rojo</li>
                <li>Resistencias de 220 Ω</li>
                <li>Protoboard</li>
                <li>Cables Dupont</li>
            </ul>

            <h3>Librerías</h3>

            <ul>
                <li>SPI.h</li>
                <li>MFRC522.h</li>
                <li>Servo.h</li>
            </ul>

            <h3>Programación</h3>

            <ul>
                <li>Variables</li>
                <li>Funciones</li>
                <li>Condiciones</li>
                <li>Ciclos</li>
                <li>Arrays</li>
                <li>Comunicación Serial</li>
                <li>Lectura RFID</li>
            </ul>

            <h3>Funcionamiento</h3>

            <p>
                El lector RFID RC522 detecta una tarjeta
                y Arduino obtiene su UID.
            </p>

            <p>
                El programa compara el UID de la tarjeta
                con el UID autorizado.
            </p>

            <h3>Tarjeta autorizada</h3>

            <p>
                Si la tarjeta es correcta:
            </p>

            <ul>
                <li>Se enciende el LED verde.</li>
                <li>El servomotor se mueve.</li>
                <li>Se permite el acceso.</li>
            </ul>

            <h3>Tarjeta no autorizada</h3>

            <p>
                Si la tarjeta no está registrada:
            </p>

            <ul>
                <li>Se enciende el LED rojo.</li>
                <li>El servo permanece cerrado.</li>
                <li>Se deniega el acceso.</li>
            </ul>

            <h3>Consideraciones técnicas</h3>

            <ul>
                <li>El RC522 trabaja con 3.3V.</li>
                <li>Utiliza comunicación SPI.</li>
                <li>El servo SG90 permite simular la apertura.</li>
                <li>Arduino controla todo el sistema.</li>
            </ul>
        `
    }
};


/* =========================================================
   MOSTRAR PROYECTO
   ========================================================= */

function mostrarProyecto(año) {

    const proyecto = proyectos[año];

    if (!proyecto) {
        console.error("Proyecto no encontrado:", año);
        return;
    }

    const detalle = document.getElementById("detalle-proyecto");
    const etiqueta = document.getElementById("detalle-etiqueta");
    const titulo = document.getElementById("detalle-titulo");
    const descripcion =
        document.getElementById("detalle-descripcion");
    const contenido =
        document.getElementById("detalle-contenido");

    if (!detalle) return;

    etiqueta.textContent = proyecto.etiqueta;

    titulo.textContent = proyecto.titulo;

    descripcion.textContent = proyecto.descripcion;

    contenido.innerHTML = proyecto.contenido;

    detalle.classList.add("mostrar");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CERRAR PROYECTO
   ========================================================= */

function cerrarProyecto() {

    const detalle =
        document.getElementById("detalle-proyecto");

    if (!detalle) return;

    detalle.classList.remove("mostrar");

    document.body.style.overflow = "auto";
}


/* =========================================================
   CERRAR AL HACER CLICK FUERA
   ========================================================= */

const detalle =
    document.getElementById("detalle-proyecto");

if (detalle) {

    detalle.addEventListener("click", function(event) {

        if (event.target === detalle) {
            cerrarProyecto();
        }

    });
}


/* =========================================================
   CERRAR CON ESC
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        cerrarProyecto();
    }

});