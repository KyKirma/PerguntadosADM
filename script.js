// Inicializa variáveis para controlar as telas
const homeScreen = document.getElementById('home-screen');
const challengeScreen = document.getElementById('challenge-screen');
const instructionsScreen = document.getElementById('instructions-screen')
const bossScreen = document.getElementById('boss-screen');
const victoryScreen = document.getElementById('victory-screen');
const defeatScreen = document.getElementById('defeat-screen');

// Inicializa variáveis para controlar botões
const playButton = document.getElementById('play-button');
const scoreButton = document.getElementById('score-button');
const continueButton = document.getElementById('continue-button');
const startButton = document.getElementById('start-button');
const returnButton = document.getElementById('return-button');
const tryAgainButton = document.getElementById('try-again-button');

// Inicializa os Audios
const audio = document.getElementById("audio");
const audioButton = document.getElementById('mute_button')

// Função para mostrar uma tela específica
function showScreen(screen) {
  const screens = [homeScreen, challengeScreen, instructionsScreen, bossScreen, victoryScreen, defeatScreen];
  screens.forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// Adiciona event listeners para os botões
playButton.addEventListener('click', () => showScreen(challengeScreen));
continueButton.addEventListener('click', () => showScreen(instructionsScreen));
startButton.addEventListener('click', () => showScreen(bossScreen));
returnButton.addEventListener('click', () => showScreen(homeScreen));
tryAgainButton.addEventListener('click', () => showScreen(homeScreen));
scoreButton.addEventListener('click', () => {
  // Aqui você deve implementar a funcionalidade para mostrar o score
  alert('Funcionalidade de score ainda não implementada.');
});

// Inicialmente mostra a tela inicial
showScreen(homeScreen);

  playButton.addEventListener('click', () => {
    audio.play();
  });
  