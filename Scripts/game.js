// Divs das vidas
const bossLivesTela = document.getElementById("boss-lives");
const bossLivesText = document.getElementById("boss-lives-text");
const playerLivesTela = document.getElementById("player-lives");

// Variáveis para armazenar informações do quiz

let perguntasRespondidas = [];
let pontuacao = 0;
let numeroPerguntas = 10; // Defina o número desejado de perguntas
let tentativasRestantes = 3; // Defina o número de tentativas permitidas
let bossLives = 10;
let alternativa;


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

        const alternativas = pergunta.alternativas;

        for (let i = 0; i < alternativas.length; i++) {
            // Cria botões para cada alternativa
            alternativa = document.createElement("button");
            alternativa.innerHTML = String.fromCharCode(65 + i) + ") " + alternativas[i];
            alternativa.addEventListener("click", () => {
                alternativa.checked = true;
                for (let j = 0; j < alternativas.length; j++) {
                    if (i !== j) {
                        alternativas[j].checked = false;
                    }
                }
            });
            questionAlternatives.appendChild(alternativa);
        }

        questionButton.addEventListener("click", () => {
            if(alternativa.textContent.charAt(0) === pergunta.resposta){
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
    });
}




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