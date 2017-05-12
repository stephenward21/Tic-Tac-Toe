// Clicking on box should result in the box being "X'd" or "O'd"
// If it's "X" turn put and X, if "O's" turn put an O.
// need to check and see if someone has won.
// Initialize whose turn it is. 1 = X;

var whoseTurn = 1;
var player1Squares = [];
var player2Squares = [];
var computerSquares = [];
var takenSquares = [];
// var squareVals = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
var winningCombos = [

	['A1', 'B1', 'C1'],
	['A2', 'B2', 'C2'],
	['A3', 'B3', 'C3'],
	['A1', 'A2', 'A3'],
	['B1', 'B2', 'B3'],
	['C1', 'C2', 'C3'],
	['A1', 'B2', 'C3'],
	['A3', 'B2', 'C1'],

];

var gameOva = false;
var onePlayerGame = true;
var computerGame = true;
// var twoPlayerGame = false;

var player1Win = 0;
var player2Win = 0;

var numberOfPlayersMessageElement = document.getElementById("numberOfPlayers");

function vsComputer(){
	onePlayerGame = true;
	numberOfPlayersMessageElement.innerHTML = "You've chosen the Computer";
	console.log("One player");
}

function twoPlayer(){
	onePlayerGame = false;
	numberOfPlayersMessageElement.innerHTML = "You've got the human";
	console.log("Two players");
}


var squares = document.getElementsByClassName("square");  // the getElementsByClassName will create an array of everything with square class
for (i = 0; i < squares.length; i++){
	squares[i].addEventListener('click', function(event) {
		// console.log("user clicked on square");
		if(!gameOva){
			markSquare(this);
		}
	});
}


function markSquare(currentSquare){
	console.log(currentSquare.id)
	var squareResult = ""
	
	if ((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log('this square is taken');
		squareResult = "Sorry this square has been taken"
	}else if(gameOva){
		squareResult = "Someone has won the game!"

	}else if (whoseTurn == 1) {
		currentSquare.innerHTML = "X";
		whoseTurn = 2;
		player1Squares.push(currentSquare.id)
		takenSquares.push(currentSquare.id)
		checkWin(player1Squares, 1);
		if(onePlayerGame){
			computerMove(currentSquare);
		}
		
	}else{
		console.log("this ran")
		currentSquare.innerHTML = "O";
		whoseTurn = 1;
		squareResult = ''
		player2Squares.push(currentSquare.id)
		checkWin(player2Squares, 2);
		
	};
	// checkWin();
	var messageElement = document.getElementById('message');
	messageElement.innerHTML = squareResult;
}

function computerMove(currentSquare){
	squareFound = false;
	rand = Math.floor(Math.random() * 9);
	while (squareFound == false) {
		rand = Math.floor(Math.random() * 9);
		if ((squares[rand].innerHTML != "X") && (squares[rand].innerHTML != "O")) {
			squareFound = true;
			markSquare(squares[rand]);
			player2Squares.push(squares[rand]);
			takenSquares.push(currentSquare.id);
		}else if (takenSquares.length == squares.length){
			break;
		}
	}
}



// function computerMove(currentSquare){
// 	var randomSquare = squares[Math.floor(Math.random() * squares.length)]
// 	console.log(randomSquare, "this is the random square")
// 	if ((randomSquare.innerHTML != "X") && (randomSquare.innerHTML !=  "O")){
// 		randomSquare.innerHTML == "O"
// 		// whoseTurn = 1;
// 		computerSquares.push(randomSquare.id)
// 		console.log(randomSquare.innerHTML, "this is the random square");

// 	} 
// 	markSquare(randomSquare);
	

	// squareFound = false;
	// While(!squareFound){
	// 	randomSquare = Math.random() * 8;
	// 	if (squares[rand].innerHTML != "X"){
	// 		squaresFound = true;
	// 		markSquare(squares[randomSquare]);
	// 	}
	

	// find a random square
	// see if that square is empty
	// if it is, send it to square
	// if it's not, keep looking




function checkWin(currentPlayerSquares, whoJustWent){
	for (i = 0; i < winningCombos.length; i++){
		var squareCount = 0;
		for (j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if (currentPlayerSquares.indexOf(winningSquare) > -1){
				squareCount++;
			}
		}
		if(squareCount == 3){
			console.log("Player " + whoJustWent + " won the game!");
			gameOver(whoJustWent, winningCombos[i]);
			break;
		

		}
	}
}


function gameOver(whoJustWon, winningCombos){
	var messageElement = document.getElementById('message');
	var message = "Congratulations to player " + whoJustWon + ". You won with " + winningCombos;
	// document.getElementById('message').innerHTML = message;
	messageElement.innerHTML = message;

	for (i = 0; i < winningCombos.length; i++){
		document.getElementById(winningCombos[i]).className += ' winning-square';
	}
	gameOva = true;
}

function reset(){
	var squares = document.getElementsByClassName('square');
	for (let i = 0; i < squares.length; i++){
		squares[i].innerHTML = "&nbsp;";
		squares[i].className = "square";
		gameOva = false;
		// markSquare();


	}
	
		
} 







