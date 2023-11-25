
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
const audioVictory = document.getElementById("audioVictory");
const audioDefeat = document.getElementById("audioDefeat");

audio.play();
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
    case defeatScreen:
      gameContainer.style.backgroundImage = "url('./Images/DefeatBackground.jpg')";
      audio.pause();
      audioDefeat.play();
      break;
    case victoryScreen:
      gameContainer.style.backgroundImage = "url('./Images/VictoryBackground.jpg')";
      audio.pause();
      audioVictory.play();
      break;
    case questionScreen:
      let tema = questionLabel.className;
      switch(tema){
        case "areasfuncionais":
          gameContainer.style.backgroundImage = "url('./Images/areasfuncionaisBackground.png')";
          break;
        case "controle":
          gameContainer.style.backgroundImage = "url('./Images/controleBackground.png')";
          break;
        case "lideranca":
          gameContainer.style.backgroundImage = "url('./Images/liderancaBackground.png')";
          break;
        case "organizacao":
          gameContainer.style.backgroundImage = "url('./Images/organizacaoBackground.png')";
          break;
        case "planejamento":
          gameContainer.style.backgroundImage = "url('./Images/planejamentoBackground.png')";
          break;
        default:
          gameContainer.style.backgroundImage = "url('./Images/MainBackground.jpg')";
      }
      break;
    default:
      audio.play();
      audioDefeat.pause();
      audioVictory.pause();
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

// Inicialmente mostra a tela inicial
showScreen(homeScreen);

audio.play();