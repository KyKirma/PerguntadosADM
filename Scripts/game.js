// Divs das vidas
const bossLivesTela = document.getElementById("boss-lives");
const bossLivesText = document.getElementById("boss-lives-text");
const playerLivesTela = document.getElementById("player-lives");

// Variáveis para armazenar informações do quiz

let perguntasRespondidas = [];

//Função que repagina a vida das entidades
function atualizarVidas(bossLives, PlayerLives){
    //Vida do boss
    bossLivesText.textContent = "Cachorros restantes: " + bossLives;
    for (let i = 0; i < bossLives; i++) {
        bossLivesTela.appendChild(document.createElement("img"));
        bossLivesTela.lastElementChild.src = "./Images/Cachorros.png";
    }
    //Vida do player
    for (let i = 0; i < PlayerLives; i++) {
        playerLivesTela.appendChild(document.createElement("img"));
        playerLivesTela.lastElementChild.src = "./Images/Coracao.png";
    }

}

// Função para sortear um tema e carregar perguntas correspondentes
function pergunta(temaSorteado) {
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
            const alternativa = document.createElement("button");
            alternativa.textContent = String.fromCharCode(65 + i) + ") " + alternativas[i];
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
    });
}

// Função para sortear e exibir uma pergunta


// Função para verificar a resposta selecionada pelo usuário
function verificarResposta(respostaSelecionada, respostaCorreta) {
    proximaPerguntaBtn.disabled = true; // Desabilita o botão enquanto exibe o feedback

    if (respostaSelecionada.charAt(0) === respostaCorreta) {
        // Feedback para resposta correta
        resultadoDiv.textContent = "Resposta correta!";
        pontuacao++;
    } else {
        // Feedback para resposta incorreta e atualização do número de tentativas restantes
        resultadoDiv.textContent = "Resposta incorreta.";
        tentativasRestantes--;

        // Finaliza o quiz se o número de tentativas restantes atingir zero
        if (tentativasRestantes === 0) {
            mostrarResultado(false); // O jogador perdeu
            return;
        }
    }

    // Verifica se atingiu o limite de perguntas
    if (perguntasRespondidas.length === numeroPerguntas) {
        mostrarResultado(pontuacao >= perguntasCorretasParaVitoria);
        return;
    }

    // Habilita o botão para a próxima pergunta após exibir o feedback
    proximaPerguntaBtn.disabled = false;
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
    let pontuacao = 0;
    let numeroPerguntas = 10; // Defina o número desejado de perguntas
    let perguntasCorretasParaVitoria = 10; // Agora são necessárias todas as perguntas corretas para ganhar
    let tentativasRestantes = 3; // Defina o número de tentativas permitidas
    let temaSorteado = "";  // Adiciona uma variável para armazenar o tema sorteado
    let bossLives = 10;
    pergunta();
}