var newGameBtn = document.getElementById('js-newGameButton');
var newGameElem = document.getElementById('NewGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');
var winnerOrlosser = document.getElementById('js-winner');

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock')});
pickPaper.addEventListener('click', function() { playerPick('paper')});
pickScissors.addEventListener('click', function() { playerPick('scissors')});

var gameState = 'notStarted'; //started //ended

var	player = {
		name: '',
		score: 0
	};

var	computer = {
		score: 0,
	};

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}


function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię.', 'imię gracza');
	if(player.name){
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();

	playerNameElem.innerHTML = player.name;
	}
}

newGame();

function getComputerPick () {
	var possiblePicks = ['rock','paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

	if(playerPick == computerPick) {
		winnerIs = 'none';
	} else if (
		(computerPick == 'rock' && playerPick == 'scissors') ||
		(computerPick == 'scissors' && playerPick == 'paper') ||
		(computerPick == 'paper' && playerPick == 'rock')) {
		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = 'Wygrana!';
		playerPointsElem.innerHTML = player.score++;
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = 'Wygrana!';
		computerPointsElem.innerHTML = computer.score++;
	}

	if(player.score == 10) {
		
		gameState = 'ended';
		setGameElements();

		setwinner ('Victoriaaaa ! :-)');

	} else if (computer.score == 10) {
		
		gameState = 'ended';
		setGameElements();
		setwinner ('Looser :-(');
	}
}

function setwinner (param) {
	var h1 = document.createElement('h1');
	var text = document.createTextNode(param);
	h1.appendChild(text);
	winnerOrlosser.appendChild(h1);
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
}

newGameBtn.addEventListener('click', function() {
	newGame();
	winnerOrlosser.removeChild(winnerOrlosser.querySelector('h1'));
});

