document.addEventListener("DOMContentLoaded", function () {
  const slides = document.getElementById("slides");
  const dots = document.querySelectorAll(".dot");
  const musica = document.getElementById("musica");
  const botaoMusica = document.getElementById("botaoMusica");
  const botaoEfeitos = document.getElementById("botaoEfeitos");
  const areaPetalas = document.getElementById("petalas");
  const areaCoracoes = document.getElementById("coracoes");
  const textoDigitando = document.getElementById("textoDigitando");

  let slideAtual = 0;
  let efeitosAtivos = true;
  let intervaloSlider = null;
  let intervaloEfeitos = null;

  const frase = "Feito com carinho, delicadeza e um toque de magia 💜";
  const totalSlides = dots.length;

  function atualizarSlider(indice) {
    slideAtual = indice;
    slides.style.transform = "translateX(-" + (indice * 100) + "%)";

    dots.forEach(function (dot, i) {
      if (i === indice) {
        dot.classList.add("ativo");
      } else {
        dot.classList.remove("ativo");
      }
    });
  }

  function proximoSlide() {
    slideAtual = (slideAtual + 1) % totalSlides;
    atualizarSlider(slideAtual);
  }

  function iniciarSlider() {
    if (intervaloSlider) {
      clearInterval(intervaloSlider);
    }
    intervaloSlider = setInterval(proximoSlide, 4000);
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      const indice = Number(dot.getAttribute("data-slide"));
      atualizarSlider(indice);
      iniciarSlider();
    });
  });

  function criarPetala() {
    const petala = document.createElement("span");
    petala.className = "petala";

    const tamanho = Math.random() * 12 + 10;
    const esquerda = Math.random() * window.innerWidth;
    const duracao = Math.random() * 3 + 6;

    petala.style.left = esquerda + "px";
    petala.style.width = tamanho + "px";
    petala.style.height = tamanho * 1.25 + "px";
    petala.style.animationDuration = duracao + "s";

    areaPetalas.appendChild(petala);

    setTimeout(function () {
      petala.remove();
    }, duracao * 1000);
  }

  function criarCoracao() {
    const coracao = document.createElement("span");
    coracao.className = "coracao";

    const tamanho = Math.random() * 10 + 10;
    const esquerda = Math.random() * window.innerWidth;
    const duracao = Math.random() * 3 + 5;

    coracao.style.left = esquerda + "px";
    coracao.style.width = tamanho + "px";
    coracao.style.height = tamanho + "px";
    coracao.style.animationDuration = duracao + "s";

    areaCoracoes.appendChild(coracao);

    setTimeout(function () {
      coracao.remove();
    }, duracao * 1000);
  }

  function iniciarEfeitos() {
    if (intervaloEfeitos) {
      clearInterval(intervaloEfeitos);
    }

    intervaloEfeitos = setInterval(function () {
      if (efeitosAtivos) {
        criarPetala();
        if (Math.random() > 0.5) {
          criarCoracao();
        }
      }
    }, 500);
  }

  botaoEfeitos.addEventListener("click", function () {
    efeitosAtivos = !efeitosAtivos;
    botaoEfeitos.textContent = efeitosAtivos ? "🌸 Pausar efeitos" : "🌸 Ativar efeitos";
  });

  botaoMusica.addEventListener("click", function () {
    if (musica.paused) {
      musica.play()
        .then(function () {
          botaoMusica.textContent = "⏸ Pausar música";
        })
        .catch(function () {
          alert("O navegador bloqueou a música. Clique no botão novamente.");
        });
    } else {
      musica.pause();
      botaoMusica.textContent = "▶ Ativar música";
    }
  });

  function digitarTexto(texto, elemento, velocidade) {
    let i = 0;
    elemento.textContent = "";

    const intervalo = setInterval(function () {
      elemento.textContent += texto.charAt(i);
      i++;

      if (i >= texto.length) {
        clearInterval(intervalo);
      }
    }, velocidade);
  }

  atualizarSlider(0);
  iniciarSlider();
  iniciarEfeitos();
  digitarTexto(frase, textoDigitando, 40);
});