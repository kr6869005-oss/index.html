// ========== DATOS DE LOS COFRES ==========
const cofres = [
    {
        id: 0,
        imagen: 'atardecer.jpg',
        mensaje: 'mi amor... aun recuerdo cuando me dedicaste esta linda y hermosa cancion, me haces sentir tan bien todos los dias, desde el primer dia me has hecho el hombre mas feliz del mundo, quiero que seamos felices con el otro por siempre mi amor',
        cancion: 'Melendi - Tu jardín con enanitos (audio).mp3',
        minijuego: 'secuencia'
    },
    {
        id: 1,
        imagen: 'lago.jpg',
        mensaje: 'Mi esposita, me tienes tan loquito, tan bobo, de verdad por ti soy capaz de ir hasta el fin del mundo, tú con nuestros bebes eres lo que mas feliz me hace en esta vida, te amo tanto.  ',
        cancion: 'solamente.mp3',
        minijuego: 'quiz'
    },
    {
        id: 2,
        imagen: 'primera.jpg',
        mensaje: 'Como eres tan perfecta y linda.? Ya dimelo... No puedo soportar ni un segundo sin ti, no se como le haces para tenerme tan enamorado, por mas que pasen los meses, semanas, dias; el amor que siento por ti no deja de crecer cada vez mas.',
        cancion: 'micolor.mp3',
        minijuego: 'memoria'
    },
    {
        id: 3,
        imagen: 'snk.jpg',
        mensaje: 'Mi niña... Tenemo que volver a ver snk prontito, aun recuerdo cuando te quedaste mimidita mientras lo veiamos.. Jskks me dio tanta ternura, te comería toda la boquita si te hubiera tenido al fentre',
        cancion: 'vino.mp3',
        minijuego: 'arrastrar'
    },
    {
        id: 4,
        imagen: 'pijama.jpg',
        mensaje: 'Si supiera todo lo que pasa por mi mente cuando te veo, mami, tantas bellas cositas que me haces sentir, se sienten tan lindo estas bellas maripositas cada vez que te veo.',
        cancion: 'theway.mp3',
        minijuego: 'codigo'
    }
];
const titulosCanciones = {
    0: "🎵 Melendi - Tu jardín con enanitos",
    1: "🎵 Pablo Alborán - Solamente Tú",
    2: "🎵 Bürdel King - Mi color preferido eres tú",
    3: "🎵 Taburete - Vino y Cemento",
    4: "🎵 Michael Jackson - The Way You Make Me Feel "
};
// ========== PREGUNTAS DEL QUIZ (COFRE 2) ==========
const preguntasQuiz = [
    {
        pregunta: '¿En cuántas semanas te enamoré?',
        opciones: [
            '3 semanas',
            '2 semanas',
            '4 semanas',
            '1 semana'
        ],
        respuestaCorrecta: 1 // 0 = A, 1 = B, 2 = C, 3 = D (Respuesta B)
    },
    {
        pregunta: '¿Cuál es mi equipo favorito de fútbol?',
        opciones: [
            'Barcelona',
            'Chelsea',
            'Real Madrid',
            'Manchester City'
        ],
        respuestaCorrecta: 2 // 0 = A, 1 = B, 2 = C, 3 = D (Respuesta C)
    },
    {
        pregunta: '¿Cuál es mi personaje favorito de One piece?',
        opciones: [
            'Zoro',
            'Corazón',
            'Shanks',
            'Brook'
        ],
        respuestaCorrecta: 1 // 0 = A, 1 = B, 2 = C, 3 = D (Respuesta B)
    }
];
// ========== PARES PARA JUEGO DE MEMORIA (COFRE 3) ==========
const paresMemoria = [
    { id: 1, emoji: '💕', pareja: 1 },
    { id: 2, emoji: '💕', pareja: 1 },
    { id: 3, emoji: '🌹', pareja: 2 },
    { id: 4, emoji: '🌹', pareja: 2 },
    { id: 5, emoji: '💍', pareja: 3 },
    { id: 6, emoji: '💍', pareja: 3 },
    { id: 7, emoji: '✨', pareja: 4 },
    { id: 8, emoji: '✨', pareja: 4 },
    { id: 9, emoji: '🌙', pareja: 5 },
    { id: 10, emoji: '🌙', pareja: 5 },
    { id: 11, emoji: '💫', pareja: 6 },
    { id: 12, emoji: '💫', pareja: 6 }
];

// ========== PALABRAS PARA ARRASTRAR (COFRE 4) ==========
const palabrasArrastrar = [
    {
        instruccion: 'Ordena las palabras para formar la frase correcta (hay una palabra intrusa 👀)',
        palabras: [
            'Siempre',
            'Sere',
            'Tu',
            'Bebe',
            'Sopi'
        ],
        // Al dejar solo del 0 al 3, el juego ignorará la posición de la palabra 4 ("Sopi")
        orden_correcto: [0, 1, 2, 3]
    }
];



let cofresAbiertos = [];

// ========== VARIABLES DEL MINI-JUEGO SECUENCIA ==========
let secuenciaJuego = [];
let secuenciaUsuario = [];
let nivelActual = 1;
let juegoActivo = true;

// ========== VARIABLES DEL QUIZ ==========
let preguntaActualQuiz = 0;
let respuestasCorrectasQuiz = 0;

// ========== VARIABLES DEL JUEGO DE MEMORIA ==========
let cartasMemoria = [];
let cartaBocaArriba1 = null;
let cartaBocaArriba2 = null;
let paresEncontrados = 0;
let bloqueado = false;

// ========== VARIABLES DEL JUEGO DE ARRASTRAR ==========
let palabrasActuales = [];
let palabrasOrdenadas = [];

// ========== VARIABLES DEL CÓDIGO ==========
let intentosCodigo = 0;
let codigoIngresado = '';

// ========== FUNCIONES PRINCIPALES ==========

function abrirCofre(id) {
    if (cofresAbiertos.includes(id)) {
        mostrarCofre(id);
        return;
    }

    const minijuego = cofres[id].minijuego;
    mostrarMinijuego(minijuego, id);
}

function mostrarMinijuego(tipo, idCofre) {
    const modal = document.getElementById('modal-juego');
    const contenedor = document.getElementById('contenedor-minijuego');

    modal.classList.add('activo');

    switch (tipo) {
        case 'secuencia':
            contenedor.innerHTML = crearSecuenciaMusical();
            setTimeout(iniciarSecuenciaMusical, 500);
            break;
        case 'quiz':
            contenedor.innerHTML = crearQuiz();
            break;
        case 'memoria':
            contenedor.innerHTML = crearMemoria();
            setTimeout(iniciarMemoria, 500);
            break;
        case 'arrastrar':
            contenedor.innerHTML = crearArrastrar();
            setTimeout(iniciarArrastrar, 500);
            break;
        case 'codigo':
            contenedor.innerHTML = crearCodigo();
            setTimeout(iniciarCodigo, 500);
            break;
    }

    modal.dataset.cofrePendiente = idCofre;
}

function cerrarModal() {
    document.getElementById('modal-juego').classList.remove('activo');
    juegoActivo = false;
}

function completarMinijuego() {
    const modal = document.getElementById('modal-juego');
    const idCofre = parseInt(modal.dataset.cofrePendiente);

    if (!cofresAbiertos.includes(idCofre)) {
        cofresAbiertos.push(idCofre);
    }

    cerrarModal();
    mostrarCofre(idCofre);
}

function mostrarCofre(id) {
    const cofre = cofres[id];

    document.getElementById('pantalla-inicial').classList.remove('activa');
    document.getElementById('pantalla-cofre-abierto').classList.add('activa');

    document.getElementById('imagen-cofre').src = cofre.imagen;
    document.getElementById('mensaje-cofre').textContent = cofre.mensaje;
    document.getElementById('audio-cofre').src = cofre.cancion;

    // ---> AGREGA ESTAS LÍNEAS AQUÍ <---
    const tituloEl = document.getElementById('titulo-cancion');
    if (tituloEl) {
        tituloEl.textContent = titulosCanciones[id] || "🎵 Tu Canción";
    }
    // ----------------------------------

    document.getElementById(`cofre-${id}`).classList.add('abierto');
    actualizarContador();

    if (cofresAbiertos.length === 5) {
        setTimeout(irAlFinal, 130000);
    }
}
function actualizarContador() {
    document.getElementById('contador').textContent = cofresAbiertos.length;
}

function volverAlJuego() {
    document.getElementById('pantalla-cofre-abierto').classList.remove('activa');
    document.getElementById('pantalla-inicial').classList.add('activa');
}

function irAlFinal() {
    // 1. Esto apaga la canción del cofre 5 para que no moleste
    document.getElementById('audio-cofre').pause();

    // 2. Esto cambia a la escena épica (lo que ya tenías)
    document.getElementById('pantalla-cofre-abierto').classList.remove('activa');
    document.getElementById('pantalla-final').classList.add('activa');
}

function reiniciarJuego() {
    cofresAbiertos = [];
    document.getElementById('pantalla-final').classList.remove('activa');
    document.getElementById('pantalla-inicial').classList.add('activa');
    document.getElementById('contador').textContent = '0';

    for (let i = 0; i < 5; i++) {
        document.getElementById(`cofre-${i}`).classList.remove('abierto');
    }
}

// ========== MINI-JUEGO 1: SECUENCIA MUSICAL ROMÁNTICA ==========

function crearSecuenciaMusical() {
    return `
        <div style="text-align: center; color: #ff69b4;">
            <h2 style="margin-bottom: 20px;">🎵 Secuencia Musical del Amor 🎵</h2>
            <p style="color: #c0f0fc; margin-bottom: 30px; font-size: 1.1em;">Observa la secuencia de botones y repítela sin fallar. Cada ronda será más difícil.</p>
            
            <div style="margin: 30px 0;">
                <p style="color: #ffd700; font-size: 1.3em; font-weight: bold;">Nivel: <span id="nivel-actual">1</span> / 5</p>
                <p id="estado-juego" style="color: #c0f0fc; margin-top: 10px; font-size: 1em;">🎬 Observa la secuencia...</p>
            </div>

            <!-- BOTONES ROMÁNTICOS -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 40px 0; max-width: 400px; margin-left: auto; margin-right: auto;">
                <button id="boton-rosa" class="boton-secuencia-musica" onclick="clickBotonSecuencia('rosa')" style="padding: 40px; font-size: 2em; background: #ff1493; border: 3px solid #ff69b4; border-radius: 15px; cursor: pointer; transition: all 0.2s; color: white; font-weight: bold;">💕</button>
                <button id="boton-morado" class="boton-secuencia-musica" onclick="clickBotonSecuencia('morado')" style="padding: 40px; font-size: 2em; background: #8a2be2; border: 3px solid #ba55d3; border-radius: 15px; cursor: pointer; transition: all 0.2s; color: white; font-weight: bold;">💜</button>
                <button id="boton-cyan" class="boton-secuencia-musica" onclick="clickBotonSecuencia('cyan')" style="padding: 40px; font-size: 2em; background: #00bfff; border: 3px solid #00ced1; border-radius: 15px; cursor: pointer; transition: all 0.2s; color: white; font-weight: bold;">💎</button>
                <button id="boton-oro" class="boton-secuencia-musica" onclick="clickBotonSecuencia('oro')" style="padding: 40px; font-size: 2em; background: #ffd700; border: 3px solid #ffed4e; border-radius: 15px; cursor: pointer; transition: all 0.2s; color: #000; font-weight: bold;">✨</button>
            </div>

            <p id="mensaje-secuencia-musica" style="color: #00ff00; margin-top: 30px; font-size: 1.2em; font-weight: bold;"></p>
        </div>
    `;
}

function iniciarSecuenciaMusical() {
    secuenciaJuego = [];
    secuenciaUsuario = [];
    nivelActual = 1;
    juegoActivo = true;
    agregarPasoSecuencia();
}

function agregarPasoSecuencia() {
    const colores = ['rosa', 'morado', 'cyan', 'oro'];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    secuenciaJuego.push(colorAleatorio);
    secuenciaUsuario = [];

    document.getElementById('nivel-actual').textContent = secuenciaJuego.length;
    document.getElementById('estado-juego').textContent = '🎬 Observa la secuencia...';
    document.getElementById('estado-juego').style.color = '#c0f0fc';
    document.getElementById('mensaje-secuencia-musica').textContent = '';

    juegoActivo = false;

    reproducirSecuencia();
}

function reproducirSecuencia() {
    let delay = 600;

    secuenciaJuego.forEach((color, index) => {
        setTimeout(() => {
            iluminarBoton(color);
            reproducirSonido(color);
        }, delay * (index + 1));
    });

    setTimeout(() => {
        juegoActivo = true;
        document.getElementById('estado-juego').textContent = '👉 ¡Tu turno! Repite la secuencia';
        document.getElementById('estado-juego').style.color = '#ffd700';
    }, delay * (secuenciaJuego.length + 1));
}

function iluminarBoton(color) {
    const boton = document.getElementById(`boton-${color}`);
    boton.style.transform = 'scale(1.1)';
    boton.style.boxShadow = `0 0 30px ${obtenerColorRGB(color)}`;

    setTimeout(() => {
        boton.style.transform = 'scale(1)';
        boton.style.boxShadow = 'none';
    }, 300);
}

function reproducirSonido(color) {
    const contexto = new (window.AudioContext || window.webkitAudioContext)();
    const notas = {
        rosa: 523.25,
        morado: 587.33,
        cyan: 659.25,
        oro: 783.99
    };

    const frecuencia = notas[color];
    const oscilador = contexto.createOscillator();
    const ganancia = contexto.createGain();

    oscilador.connect(ganancia);
    ganancia.connect(contexto.destination);

    oscilador.frequency.value = frecuencia;
    oscilador.type = 'sine';

    ganancia.gain.setValueAtTime(0.3, contexto.currentTime);
    ganancia.gain.exponentialRampToValueAtTime(0.01, contexto.currentTime + 0.3);

    oscilador.start(contexto.currentTime);
    oscilador.stop(contexto.currentTime + 0.3);
}

function obtenerColorRGB(color) {
    const colores = {
        rosa: '#ff1493',
        morado: '#8a2be2',
        cyan: '#00bfff',
        oro: '#ffd700'
    };
    return colores[color];
}

function clickBotonSecuencia(color) {
    if (!juegoActivo) return;

    iluminarBoton(color);
    reproducirSonido(color);

    secuenciaUsuario.push(color);

    const indiceActual = secuenciaUsuario.length - 1;

    if (secuenciaUsuario[indiceActual] !== secuenciaJuego[indiceActual]) {
        juegoActivo = false;
        document.getElementById('estado-juego').textContent = '❌ ¡Secuencia incorrecta! Intenta de nuevo...';
        document.getElementById('estado-juego').style.color = '#ff6b6b';
        document.getElementById('mensaje-secuencia-musica').textContent = 'Comenzando de nuevo...';

        setTimeout(() => {
            iniciarSecuenciaMusical();
        }, 2000);
        return;
    }

    if (secuenciaUsuario.length === secuenciaJuego.length) {
        if (secuenciaJuego.length === 5) {
            juegoActivo = false;
            document.getElementById('estado-juego').textContent = '🎉 ¡GANASTE! ¡Completaste todos los niveles!';
            document.getElementById('estado-juego').style.color = '#00ff00';
            document.getElementById('mensaje-secuencia-musica').textContent = '✨ El cofre se abrirá... ✨';

            setTimeout(completarMinijuego, 2000);
        } else {
            document.getElementById('estado-juego').textContent = '✅ ¡Bien! Siguiente nivel...';
            document.getElementById('estado-juego').style.color = '#00ff00';
            document.getElementById('mensaje-secuencia-musica').textContent = '▶️ Espera el siguiente nivel...';

            setTimeout(agregarPasoSecuencia, 1500);
        }
    }
}

// ========== MINI-JUEGO 2: QUIZ ==========
function crearQuiz() {
    preguntaActualQuiz = 0;
    respuestasCorrectasQuiz = 0;
    return mostrarPreguntaQuiz();
}

function mostrarPreguntaQuiz() {
    if (preguntaActualQuiz >= preguntasQuiz.length) {
        return finalizarQuiz();
    }

    const pregunta = preguntasQuiz[preguntaActualQuiz];
    const numero = preguntaActualQuiz + 1;

    let opcionesHTML = pregunta.opciones.map((opcion, index) => {
        const letras = ['A', 'B', 'C', 'D'];
        return `
            <button onclick="responderQuiz(${index})" style="
                display: block;
                width: 100%;
                padding: 15px;
                margin: 10px 0;
                background: #8a2be2;
                color: white;
                border: 2px solid #ba55d3;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1em;
                transition: all 0.3s;
            " onmouseover="this.style.background='#ba55d3'" onmouseout="this.style.background='#8a2be2'">
                <strong>${letras[index]})</strong> ${opcion}
            </button>
        `;
    }).join('');

    return `
        <div style="text-align: center; color: #ff69b4;">
            <h2 style="margin-bottom: 20px;">❓ Preguntas del Corazón ❓</h2>
            
            <div style="margin: 20px 0;">
                <p style="color: #ffd700; font-size: 1.3em; font-weight: bold;">Pregunta ${numero} de ${preguntasQuiz.length}</p>
                <p style="color: #c0f0fc; font-size: 1.1em; margin: 20px 0; line-height: 1.6;">${pregunta.pregunta}</p>
            </div>

            <div style="margin-top: 30px;">
                ${opcionesHTML}
            </div>

            <p id="mensaje-quiz" style="color: #ffd700; margin-top: 20px; font-size: 1em;"></p>
        </div>
    `;
}

function responderQuiz(indiceRespuesta) {
    const pregunta = preguntasQuiz[preguntaActualQuiz];
    const esCorrecta = indiceRespuesta === pregunta.respuestaCorrecta;

    const mensajeElement = document.getElementById('mensaje-quiz');

    if (esCorrecta) {
        respuestasCorrectasQuiz++;
        mensajeElement.textContent = '✅ ¡Correcto!';
        mensajeElement.style.color = '#00ff00';
    } else {
        mensajeElement.textContent = '❌ ¡Incorrecto!';
        mensajeElement.style.color = '#ff6b6b';
    }

    document.querySelectorAll('button[onclick*="responderQuiz"]').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });

    preguntaActualQuiz++;

    setTimeout(() => {
        const contenedor = document.getElementById('contenedor-minijuego');
        contenedor.innerHTML = mostrarPreguntaQuiz();
    }, 1500);
}

function finalizarQuiz() {
    const porcentaje = (respuestasCorrectasQuiz / preguntasQuiz.length) * 100;
    let mensaje = '';

    if (porcentaje === 100) {
        mensaje = '🎉 ¡regalitoo! 🎉';
    } else if (porcentaje >= 66) {
        mensaje = '✨ ¡Muy bien! Demostraste que me conoces ✨';
    } else if (porcentaje >= 33) {
        mensaje = '💭 Bien, pero hay algunas cosas que debes recordar 💭';
    } else {
        mensaje = '😅 Oops, necesitamos pasar más tiempo juntos 😅';
    }

    setTimeout(() => {
        completarMinijuego();
    }, 2000);

    return `
        <div style="text-align: center; color: #ff69b4;">
            <h2 style="margin-bottom: 20px;">📊 Resultados 📊</h2>
            <p style="color: #ffd700; font-size: 2em; font-weight: bold; margin: 20px 0;">${respuestasCorrectasQuiz} / ${preguntasQuiz.length} correctas</p>
            <p style="color: #ffd700; font-size: 1.5em; font-weight: bold;">${porcentaje.toFixed(0)}%</p>
            <p style="color: #c0f0fc; font-size: 1.2em; margin-top: 30px; line-height: 1.6;">${mensaje}</p>
            
            <img src="regalito.jpg" alt="¡Bebe buenitaa!" style="max-width: 200px; border-radius: 12px; margin-top: 20px; border: 2px solid #ba55d3;">

            <p style="color: #ff69b4; margin-top: 30px; font-style: italic;">✨ El cofre se abrirá... ✨</p>
        </div>
    `;
}
// ========== MINI-JUEGO 3: JUEGO DE MEMORIA ==========

function crearMemoria() {
    return `
        <div style="text-align: center; color: #ff69b4;">
            <h2 style="margin-bottom: 20px;">🧠 Juego de Memoria del Amor 🧠</h2>
            <p style="color: #c0f0fc; margin-bottom: 30px; font-size: 1.1em;">Encuentra todas las parejas de emojis románticos</p>
            
            <div style="margin: 20px 0;">
                <p style="color: #ffd700; font-size: 1.3em; font-weight: bold;">Parejas encontradas: <span id="parejas-encontradas">0</span> / 6</p>
            </div>

            <div id="tablero-memoria" style="
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 30px auto;
                max-width: 350px;
            "></div>

            <p id="mensaje-memoria" style="color: #c0f0fc; margin-top: 20px; font-size: 1em;"></p>
        </div>
    `;
}

function iniciarMemoria() {
    cartasMemoria = [...paresMemoria].sort(() => Math.random() - 0.5);
    paresEncontrados = 0;
    cartaBocaArriba1 = null;
    cartaBocaArriba2 = null;
    bloqueado = false;

    const tablero = document.getElementById('tablero-memoria');
    tablero.innerHTML = '';

    cartasMemoria.forEach((carta, index) => {
        const cartaDiv = document.createElement('div');
        cartaDiv.id = `carta-${index}`;
        cartaDiv.style.cssText = `
            padding: 20px;
            background: linear-gradient(135deg, #8a2be2, #ba55d3);
            border: 2px solid #ff69b4;
            border-radius: 10px;
            cursor: pointer;
            font-size: 2em;
            text-align: center;
            transition: all 0.3s;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60px;
        `;
        cartaDiv.textContent = '?';
        cartaDiv.onclick = () => girarCarta(index);
        tablero.appendChild(cartaDiv);
    });

    document.getElementById('mensaje-memoria').textContent = '👇 Haz clic para girar las cartas';
}

function girarCarta(indice) {
    if (bloqueado) return;

    const cartaDiv = document.getElementById(`carta-${indice}`);
    const carta = cartasMemoria[indice];

    if (cartaDiv.classList.contains('girada')) return;
    if (cartaBocaArriba1?.indice === indice) return;
    if (cartaBocaArriba2?.indice === indice) return;

    cartaDiv.textContent = carta.emoji;
    cartaDiv.classList.add('girada');
    cartaDiv.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';

    if (!cartaBocaArriba1) {
        cartaBocaArriba1 = { indice, pareja: carta.pareja };
    } else if (!cartaBocaArriba2) {
        cartaBocaArriba2 = { indice, pareja: carta.pareja };
        verificarPareja();
    }
}

function verificarPareja() {
    bloqueado = true;

    if (cartaBocaArriba1.pareja === cartaBocaArriba2.pareja) {
        paresEncontrados++;
        document.getElementById('parejas-encontradas').textContent = paresEncontrados;

        if (paresEncontrados === 6) {
            document.getElementById('mensaje-memoria').textContent = '🎉 ¡GANASTE! ¡Encontraste todas las parejas! 🎉';
            document.getElementById('mensaje-memoria').style.color = '#00ff00';

            setTimeout(() => {
                completarMinijuego();
            }, 2000);
        }

        cartaBocaArriba1 = null;
        cartaBocaArriba2 = null;
        bloqueado = false;
    } else {
        document.getElementById('mensaje-memoria').textContent = '❌ No coinciden, intenta de nuevo';
        document.getElementById('mensaje-memoria').style.color = '#ff6b6b';

        setTimeout(() => {
            document.getElementById(`carta-${cartaBocaArriba1.indice}`).textContent = '?';
            document.getElementById(`carta-${cartaBocaArriba1.indice}`).classList.remove('girada');
            document.getElementById(`carta-${cartaBocaArriba1.indice}`).style.background = 'linear-gradient(135deg, #8a2be2, #ba55d3)';

            document.getElementById(`carta-${cartaBocaArriba2.indice}`).textContent = '?';
            document.getElementById(`carta-${cartaBocaArriba2.indice}`).classList.remove('girada');
            document.getElementById(`carta-${cartaBocaArriba2.indice}`).style.background = 'linear-gradient(135deg, #8a2be2, #ba55d3)';

            cartaBocaArriba1 = null;
            cartaBocaArriba2 = null;
            bloqueado = false;
            document.getElementById('mensaje-memoria').textContent = '👇 Intenta de nuevo';
            document.getElementById('mensaje-memoria').style.color = '#c0f0fc';
        }, 1000);
    }
}

// ========== MINI-JUEGO 4: ARRASTRAR PALABRAS ==========

function crearArrastrar() {
    return `
        <div style="text-align: center; color: #ff69b4;">
            <h2 style="margin-bottom: 20px;">✍️ Arrastrar Palabras del Amor ✍️</h2>
            <p style="color: #c0f0fc; margin-bottom: 30px; font-size: 1.1em;" id="instruccion-arrastrar"></p>
            
            <!-- ZONA DE RESPUESTA -->
            <div id="zona-respuesta" style="
                background: rgba(138, 43, 226, 0.3);
                border: 2px dashed #ff69b4;
                border-radius: 10px;
                padding: 20px;
                margin: 30px 0;
                min-height: 80px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                align-items: center;
                justify-content: center;
            "></div>

            <!-- PALABRAS PARA ARRASTRAR -->
            <div id="palabras-contenedor" style="
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                margin: 30px 0;
            "></div>

            <p id="mensaje-arrastrar" style="color: #c0f0fc; margin-top: 20px; font-size: 1em;"></p>
            <button id="btn-verificar" onclick="verificarArrastrar()" style="
                background: #ff69b4;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1em;
                margin-top: 20px;
                transition: all 0.3s;
            " onmouseover="this.style.background='#ff1493'" onmouseout="this.style.background='#ff69b4'">
                ✅ Verificar Respuesta
            </button>
        </div>
    `;
}

function iniciarArrastrar() {
    const datos = palabrasArrastrar[0];
    document.getElementById('instruccion-arrastrar').textContent = datos.instruccion;

    palabrasActuales = [...datos.palabras].sort(() => Math.random() - 0.5);
    palabrasOrdenadas = [];

    const contenedor = document.getElementById('palabras-contenedor');
    palabrasActuales.forEach((palabra, index) => {
        const boton = document.createElement('button');
        boton.textContent = palabra;
        boton.id = `palabra-${index}`;
        boton.style.cssText = `
            background: #8a2be2;
            color: white;
            border: 2px solid #ba55d3;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
            font-weight: bold;
        `;
        boton.onclick = () => agregarPalabra(index, palabra, boton);
        boton.onmouseover = function () { this.style.background = '#ba55d3'; };
        boton.onmouseout = function () { this.style.background = '#8a2be2'; };
        contenedor.appendChild(boton);
    });

    document.getElementById('mensaje-arrastrar').textContent = '👇 Haz clic en las palabras en el orden correcto';
}

function agregarPalabra(indice, palabra, boton) {
    palabrasOrdenadas.push({ indice, palabra });

    const zonaRespuesta = document.getElementById('zona-respuesta');
    const item = document.createElement('div');
    item.style.cssText = `
        background: #ff69b4;
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
    `;
    item.innerHTML = `
        ${palabra}
        <button onclick="quitarPalabra(${palabrasOrdenadas.length - 1})" style="
            background: #ff1493;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            cursor: pointer;
            font-size: 12px;
        ">✕</button>
    `;
    zonaRespuesta.appendChild(item);

    boton.disabled = true;
    boton.style.opacity = '0.5';
    boton.style.cursor = 'not-allowed';
}

function quitarPalabra(indice) {
    const palabraRemovida = palabrasOrdenadas[indice];
    const boton = document.getElementById(`palabra-${palabraRemovida.indice}`);
    boton.disabled = false;
    boton.style.opacity = '1';
    boton.style.cursor = 'pointer';

    palabrasOrdenadas.splice(indice, 1);

    const zonaRespuesta = document.getElementById('zona-respuesta');
    zonaRespuesta.innerHTML = '';
    palabrasOrdenadas.forEach((item, idx) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = `
            background: #ff69b4;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: bold;
        `;
        itemDiv.innerHTML = `
            ${item.palabra}
            <button onclick="quitarPalabra(${idx})" style="
                background: #ff1493;
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                cursor: pointer;
                font-size: 12px;
            ">✕</button>
        `;
        zonaRespuesta.appendChild(itemDiv);
    });
}

function verificarArrastrar() {
    // Definimos cuáles son las palabras exactas que deben estar en la zona de respuesta
    const fraseCorrecta = ["Siempre", "Sere", "Tu", "Bebe"];

    // Verificamos si la cantidad de palabras es la correcta
    if (palabrasOrdenadas.length !== fraseCorrecta.length) {
        document.getElementById('mensaje-arrastrar').textContent = '⚠️ Forma la frase solo con las palabras necesarias (¡deja la intrusa por fuera!)';
        document.getElementById('mensaje-arrastrar').style.color = '#ff6b6b';
        return;
    }

    // Comparamos palabra por palabra el texto seleccionado
    let esCorrecta = true;
    for (let i = 0; i < fraseCorrecta.length; i++) {
        if (palabrasOrdenadas[i].palabra !== fraseCorrecta[i]) {
            esCorrecta = false;
            break;
        }
    }

    if (esCorrecta) {
        document.getElementById('mensaje-arrastrar').textContent = '🎉 ¡CORRECTO! ¡La frase es perfecta! 🎉';
        document.getElementById('mensaje-arrastrar').style.color = '#00ff00';
        document.getElementById('btn-verificar').disabled = true;

        setTimeout(() => {
            completarMinijuego();
        }, 2000);
    } else {
        document.getElementById('mensaje-arrastrar').textContent = '❌ Orden incorrecto, intenta de nuevo';
        document.getElementById('mensaje-arrastrar').style.color = '#ff6b6b';
    }
}

// ========== MINI-JUEGO 5: CÓDIGO DE DESBLOQUEO ==========

// ========== CONFIGURACIÓN DEL COFRE 5 ==========
// (Aquí puedes cambiar la palabra clave cuando la decidas)
const codigoDesbloqueo = {
    codigo: '20/09/2024', // <-- Palabras clave o código secreto por defecto
    intentos_maximos: 3,
    instruccion: 'Ingresa la palabra secreta para desbloquear el cofre'
};

// Variable para llevar la cuenta de errores cometidos


function crearCodigo() {
    return `
        <div style="text-align: center; color: #ff69b4;">
            <h2 style="margin-bottom: 20px;">🔐 Código de Desbloqueo 🔐</h2>
            <p style="color: #c0f0fc; margin-bottom: 30px; font-size: 1.1em;" id="instruccion-codigo"></p>
            
            <div style="margin: 30px 0;">
                <p style="color: #ffd700; font-size: 1.3em; font-weight: bold;">Intentos restantes: <span id="intentos-restantes">3</span></p>
            </div>

            <!-- CAMPO DE ENTRADA -->
            <input id="input-codigo" type="text" placeholder="Ingresa el código aquí..." style="
                width: 300px;
                padding: 15px;
                font-size: 1.1em;
                border: 2px solid #ff69b4;
                border-radius: 8px;
                background: rgba(138, 43, 226, 0.2);
                color: white;
                text-align: center;
                margin: 20px 0;
            " />

            <br/>

            <button id="btn-verificar-codigo" onclick="verificarCodigo()" style="
                background: #ff69b4;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1em;
                margin-top: 20px;
                transition: all 0.3s;
            " onmouseover="this.style.background='#ff1493'" onmouseout="this.style.background='#ff69b4'">
                🔓 Verificar Código
            </button>

            <p id="mensaje-codigo" style="color: #c0f0fc; margin-top: 20px; font-size: 1em;"></p>
        </div>
    `;
}

function iniciarCodigo() {
    // Resetear variables cada vez que se abre el cofre
    intentosCodigo = 0;

    const instruccionEl = document.getElementById('instruccion-codigo');
    const intentosEl = document.getElementById('intentos-restantes');
    const mensajeEl = document.getElementById('mensaje-codigo');
    const inputEl = document.getElementById('input-codigo');

    if (instruccionEl) instruccionEl.textContent = codigoDesbloqueo.instruccion;
    if (intentosEl) intentosEl.textContent = codigoDesbloqueo.intentos_maximos;
    if (mensajeEl) mensajeEl.textContent = '👇 Ingresa el código secreto';

    if (inputEl) {
        inputEl.value = '';
        inputEl.disabled = false;

        // Permitir Enter para verificar
        inputEl.onkeypress = (e) => {
            if (e.key === 'Enter') {
                verificarCodigo();
            }
        };
        inputEl.focus();
    }
}

function verificarCodigo() {
    const inputCodigo = document.getElementById('input-codigo');
    if (!inputCodigo) return;

    const codigoIngresado = inputCodigo.value.trim().toUpperCase(); // Convertimos a mayúsculas para evitar errores por tipografía

    if (codigoIngresado === '') {
        document.getElementById('mensaje-codigo').textContent = '⚠️ Por favor, ingresa el código';
        document.getElementById('mensaje-codigo').style.color = '#ff6b6b';
        return;
    }

    // Comparamos el código ingresado con el correcto (también en mayúsculas)
    if (codigoIngresado === codigoDesbloqueo.codigo.toUpperCase()) {
        // ¡CORRECTO!
        document.getElementById('mensaje-codigo').textContent = '🎉 ¡CÓDIGO CORRECTO! ¡Lo hiciste! 🎉';
        document.getElementById('mensaje-codigo').style.color = '#00ff00';
        inputCodigo.disabled = true;

        setTimeout(() => {
            completarMinijuego();
        }, 2000);
    } else {
        // INCORRECTO: Sumamos un error y calculamos los que le quedan
        intentosCodigo++;
        const intentosRestantes = codigoDesbloqueo.intentos_maximos - intentosCodigo;

        document.getElementById('intentos-restantes').textContent = intentosRestantes;

        if (intentosRestantes <= 0) {
            document.getElementById('mensaje-codigo').textContent = '❌ Se acabaron los intentos. El código era: ' + codigoDesbloqueo.codigo;
            document.getElementById('mensaje-codigo').style.color = '#ff6b6b';
            inputCodigo.disabled = true;
            const btnVerificar = document.getElementById('btn-verificar-codigo');
            if (btnVerificar) btnVerificar.disabled = true;
        } else {
            document.getElementById('mensaje-codigo').textContent = `❌ Código incorrecto. Te quedan ${intentosRestantes} intento(s)`;
            document.getElementById('mensaje-codigo').style.color = '#ff6b6b';
            inputCodigo.value = '';
            inputCodigo.focus();
        }
    }
}