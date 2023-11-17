
// Inicializa variáveis para controlar as telas
const gameContainer = document.getElementById('game-container');
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

// Inicializa os sprites
const bossImage = document.getElementById('boss-image');

// Inicializa os Audios
const audio = document.getElementById("audio");


// Função para mostrar uma tela específica
function showScreen(screen) {
  const screens = [homeScreen, challengeScreen, instructionsScreen, bossScreen, victoryScreen, defeatScreen];
  screens.forEach(s => s.classList.remove('active'));
  screen.classList.add('active');

  setBackgroundImage(screen);
}

//Função que gera um boss aleatório
function setBossImage(){
  let x = Math.floor(Math.random() * 4) + 1;
  console.log(x);
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
  // Aqui você deve implementar a funcionalidade para mostrar o score
  alert('Funcionalidade de score ainda não implementada.');
});

// Inicialmente mostra a tela inicial
showScreen(homeScreen);

playButton.addEventListener('click', () => {
    audio.play();
  });
  
