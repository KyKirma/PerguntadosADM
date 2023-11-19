
// Inicializa variáveis para controlar as telas
const gameContainer = document.getElementById('game-container');
const homeScreen = document.getElementById('home-screen');
const challengeScreen = document.getElementById('challenge-screen');
const instructionsScreen = document.getElementById('instructions-screen')
const bossScreen = document.getElementById('boss-screen');
const victoryScreen = document.getElementById('victory-screen');
const defeatScreen = document.getElementById('defeat-screen');
const questionScreen = document.getElementById('question-screen');

// Inicializa variáveis para controlar botões
const playButton = document.getElementById('play-button');
const scoreScreen = document.getElementById('score-screen');
const scoreButton = document.getElementById('score-button');
const continueButton = document.getElementById('continue-button');
const startButton = document.getElementById('start-button');
const returnButton = document.getElementById('return-button');
const tryAgainButton = document.getElementById('try-again-button');
const questionButton = document.getElementById('question-button');

// Inicializa os sprites
const bossImage = document.getElementById('boss-image');

// Inicializa as perguntas
const questionLabel = document.getElementById('question-label');
const questionAlternatives = document.getElementById('question-alternatives');

// Inicializa os Audios
const audio = document.getElementById("audio");


// Função para mostrar uma tela específica
function showScreen(screen) {
  const screens = [homeScreen, challengeScreen, instructionsScreen, bossScreen,questionScreen, victoryScreen, defeatScreen];
  screens.forEach(s => s.classList.remove('active'));
  screen.classList.add('active');

  setBackgroundImage(screen);
}

//Função que gera um boss aleatório
function setBossImage(){
  let x = Math.floor(Math.random() * 4) + 1;
  switch(x){
    case 1:
      bossImage.style.backgroundImage = "url('./Images/Boss1.jpeg')";
      break;
    case 2:
      bossImage.style.backgroundImage = "url('./Images/Boss2.jpeg')";
      break;
    case 3:
      bossImage.style.backgroundImage = "url('./Images/Boss3.jpeg')";
      break;
    case 4:
      bossImage.style.backgroundImage = "url('./Images/Boss4.jpeg')";
      break;
    default:

  }
}

//Controle de Background
let setBackgroundImage = (screen) => {
  switch (screen) {
    case bossScreen:
      gameContainer.style.backgroundImage = "url('./Images/BossBackground.png')";
      break;
    default:
      gameContainer.style.backgroundImage = "url('./Images/MainBackground.jpg')";
  }
};

// Adiciona event listeners para os botões
playButton.addEventListener('click', () => showScreen(challengeScreen));
continueButton.addEventListener('click', () => showScreen(instructionsScreen));
startButton.addEventListener('click', () => {
  showScreen(bossScreen);
  setBossImage();
  atualizarVidas(10, 3);});
returnButton.addEventListener('click', () => showScreen(homeScreen));
tryAgainButton.addEventListener('click', () => showScreen(homeScreen));
scoreButton.addEventListener('click', () => {


// Função para exibir as pontuações
function mostrarPontuacoes() {
  const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];
  const listaPontuacoes = document.getElementById('score-list');
  
  // Limpa a lista de pontuações existente
  listaPontuacoes.innerHTML = '';

  // Ordena as pontuações em ordem decrescente
  pontuacoes.sort((a, b) => b.pontuacao - a.pontuacao);

  // Cria e adiciona cada pontuação como um item da lista
  pontuacoes.forEach(pontuacao => {
    const elementoPontuacao = document.createElement('li');
    elementoPontuacao.textContent = `${pontuacao.nome}: ${pontuacao.pontuacao}`;
    listaPontuacoes.appendChild(elementoPontuacao);
  });
}

// Função para salvar a pontuação no localStorage
function salvarPontuacao(nomeJogador, pontuacaoFinal) {
  let pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];
  pontuacoes.push({ nome: nomeJogador, pontuacao: pontuacaoFinal });
  localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));
}

// Adiciona o event listener ao botão de pontuação
scoreButton.addEventListener('click', () => {
  showScreen(scoreScreen);
  mostrarPontuacoes();
});

// Tela de pontuação
const scoreScreen = document.getElementById('score-screen');

// Adiciona o event listener ao botão de pontuação
scoreButton.addEventListener('click', () => {
  showScreen(scoreScreen);
  mostrarPontuacoes();
});

// Função para exibir as pontuações
function mostrarPontuacoes() {
  const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes')) || [];

  // Verifica se não há pontuações salvas e exibe um alerta
  if (pontuacoes.length === 0) {
    alert("Ainda não há pontuações disponíveis. Você é o primeiro jogador!");
    return; // Retorna cedo para não tentar mostrar pontuações
  }

  const listaPontuacoes = document.getElementById('score-list');
  listaPontuacoes.innerHTML = ''; // Limpa a lista de pontuações existente

  // Ordena e exibe as pontuações
  pontuacoes.sort((a, b) => b.pontuacao - a.pontuacao);
  pontuacoes.forEach(pontuacao => {
    const elementoPontuacao = document.createElement('li');
    elementoPontuacao.textContent = `${pontuacao.nome}: ${pontuacao.pontuacao}`;
    listaPontuacoes.appendChild(elementoPontuacao);
  });
}


// Função showScreen
function showScreen(screen) {
  const screens = [homeScreen, challengeScreen, instructionsScreen, bossScreen, questionScreen, victoryScreen, defeatScreen, scoreScreen];
  
  screens.forEach(s => s.classList.remove('active'));
  screen.classList.add('active');

  setBackgroundImage(screen);
}



});

// Inicialmente mostra a tela inicial
showScreen(homeScreen);

playButton.addEventListener('click', () => {
    audio.play();
  });
  
