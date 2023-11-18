// Divs das vidas
const bossLivesTela = document.getElementById("boss-lives");
const bossLivesText = document.getElementById("boss-lives-text");
const playerLivesTela = document.getElementById("player-lives");


// Botões das alternativas
const altButton1 = document.getElementById("alt1");
const altButton2 = document.getElementById("alt2");
const altButton3 = document.getElementById("alt3");
const altButton4 = document.getElementById("alt4");

// Variáveis para armazenar informações do quiz
let perguntasRespondidas = [];
let pontuacao = 0;
let numeroPerguntas = 10; // Defina o número desejado de perguntas
let tentativasRestantes = 3; // Defina o número de tentativas permitidas
let bossLives = 10;
let alternativa;
let pergunta;


//Função que repagina a vida das entidades
function atualizarVidas(bossLives, PlayerLives) {
    // Vida do boss
    bossLivesText.textContent = "Cachorros restantes: " + bossLives;
    bossLivesTela.textContent = "";
    for (let i = 0; i < bossLives; i++) {
      const bossLifeImage = document.createElement("img");
      bossLifeImage.src = "./Images/Cachorros.png";
      bossLivesTela.appendChild(bossLifeImage);
    }
  
    // Vida do player
    playerLivesTela.textContent = "";
    for (let i = 0; i < PlayerLives; i++) {
      const playerLifeImage = document.createElement("img");
      playerLifeImage.src = "./Images/Coracao.png";
      playerLivesTela.appendChild(playerLifeImage);
    }
  }

// Função para sortear um tema e carregar perguntas correspondentes
function atualizarPergunta(temaSorteado) {
    questionLabel.textContent = "";
    questionAlternatives.textContent = "";

    fetch(`./Scripts/Banco/perguntas_${temaSorteado}.json`)
        .then((response) => response.json())
        .then((data) => {
            perguntas = data;
            const randomIndex = Math.floor(Math.random() * perguntas.length);
            pergunta = perguntas[randomIndex];
            console.log(pergunta)
            perguntasRespondidas.push(pergunta);
        // Exibe a pergunta e as alternativas
        questionLabel.textContent = pergunta.pergunta;

        let alternativas = pergunta.alternativas;

        for (let i = 0; i < alternativas.length; i++) {
            // Adiciona o botão à div correta
            switch (i) {
                case 0:
                    altButton1.textContent = String.fromCharCode(65 + i) + ") " + alternativas[i];
                    break;
                case 1:
                    altButton2.textContent = String.fromCharCode(65 + i) + ") " + alternativas[i];
                    break;
                case 2:
                    altButton3.textContent = String.fromCharCode(65 + i) + ") " + alternativas[i];
                    break;
                case 3:
                    altButton4.textContent = String.fromCharCode(65 + i) + ") " + alternativas[i];
                    break;
            }
        }
    });
}


questionButton.addEventListener("click", () => {
    // Verifica se a alternativa marcada é a resposta correta
    if (alternativa.innerText.charAt(0) === pergunta.resposta) {
        pontuacao++;
        bossLives--;
        console.log(pontuacao);
        console.log(bossLives);
    } else {
        tentativasRestantes--;
        console.log(tentativasRestantes);
    }

    showScreen(bossScreen);
    atualizarVidas(bossLives, tentativasRestantes);
});

function handleClick(event) {
    // Obtém o botão que foi clicado
    const button = event.target;
  
    button.checked = true;
    button.style.backgroundColor = "#7fffd4";
    button.style.color = "#ffffff";

    for (let i = 1; i < 5; i++) {
      const otherButton = document.getElementById("alt" + i);
      if (button !== otherButton) {
        otherButton.checked = false;
        otherButton.style.backgroundColor = "#ffffff";
        otherButton.style.color = "#15ab7c";
      }
    }
  }
  
  // Associa o evento click ao botão
  altButton1.addEventListener("click", handleClick);
  altButton2.addEventListener("click", handleClick);
  altButton3.addEventListener("click", handleClick);
  altButton4.addEventListener("click", handleClick);

// Função para mostrar o resultado final do quiz
function mostrarResultado(vitoria) {
    perguntaDiv.textContent = vitoria ? "Você ganhou o Quiz!" : "Você perdeu o Quiz!";
    alternativasDiv.innerHTML = "";
    resultadoDiv.textContent = vitoria ? `Pontuação: ${pontuacao} de ${numeroPerguntas}` : "Você não atingiu a pontuação mínima.";

    // Desabilita o botão para a próxima pergunta após o resultado final
    proximaPerguntaBtn.disabled = true;
}

// Função para iniciar o quiz
function iniciarQuiz() {
    
}