// Obtém referências para os elementos HTML relevantes
const temaBox = document.getElementById("temaBox");
const perguntaDiv = document.getElementById("pergunta");
const alternativasDiv = document.getElementById("alternativas");
const resultadoDiv = document.getElementById("resultado");
const proximaPerguntaBtn = document.getElementById("proximaPergunta");

// Divs das vidas
const bossLivesTela = document.getElementById("boss-lives");
const bossLivesText = document.getElementById("boss-lives-text");
const playerLivesTela = document.getElementById("player-lives");

// Variáveis para armazenar informações do quiz
let perguntas = [];
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
function sortearETrocarTema() {
    fetch(`perguntas_${temaSorteado}.json`)
        .then((response) => response.json())
        .then((data) => {
            perguntas = data;
            perguntasRespondidas = [];
            pontuacao = 0;
            tentativasRestantes = 3; // Reinicia o número de tentativas
            proximaPerguntaBtn.disabled = false; // Habilita o botão para a próxima pergunta
            sortearEExibirPergunta();
        });
}

// Função para sortear e exibir uma pergunta
function sortearEExibirPergunta() {
    if (perguntas.length > 0 && tentativasRestantes > 0 && perguntasRespondidas.length < numeroPerguntas) {
        const indiceSorteado = Math.floor(Math.random() * perguntas.length);
        const perguntaSorteada = perguntas.splice(indiceSorteado, 1)[0];
        perguntasRespondidas.push(perguntaSorteada);

        // Exibe a pergunta e as alternativas
        perguntaDiv.textContent = perguntaSorteada.pergunta;
        alternativasDiv.innerHTML = "";

        const alternativas = perguntaSorteada.alternativas;

        for (let i = 0; i < alternativas.length; i++) {
            // Cria botões para cada alternativa
            const alternativa = document.createElement("button");
            alternativa.textContent = String.fromCharCode(65 + i) + ") " + alternativas[i];
            alternativa.addEventListener("click", () => verificarResposta(alternativa.textContent, perguntaSorteada.resposta));
            alternativasDiv.appendChild(alternativa);
        }

        resultadoDiv.textContent = "";
    } else {
        if (perguntasRespondidas.length === numeroPerguntas) {
            mostrarResultado(pontuacao >= perguntasCorretasParaVitoria);
        } else {
            sortearETrocarTema(); // Sorteia um novo tema antes de exibir a próxima pergunta
            sortearEExibirPergunta(); // Exibe a próxima pergunta
        }

        // Desabilita o botão para a próxima pergunta após o resultado final
        proximaPerguntaBtn.disabled = true;
    }
}

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

// Função para iniciar o quiz ao clicar no botão "Iniciar Quiz"
function iniciarQuiz() {
    let pontuacao = 0;
    let numeroPerguntas = 10; // Defina o número desejado de perguntas
    let perguntasCorretasParaVitoria = 10; // Agora são necessárias todas as perguntas corretas para ganhar
    let tentativasRestantes = 3; // Defina o número de tentativas permitidas
    let temaSorteado = "";  // Adiciona uma variável para armazenar o tema sorteado
    let bossLives = 10;
    sortearETrocarTema();
}

// Obtém referência e adiciona um evento de clique para o botão "Iniciar Quiz"
const iniciarQuizBtn = document.getElementById("iniciarQuiz");


// Obtém referência e adiciona um evento de clique para o botão "Próxima Pergunta"

