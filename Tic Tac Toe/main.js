const inputFields = document.getElementsByClassName('td-game');
const player1= 'O';
const player2= 'X';
const textAlert= document.getElementById('title');
const p1Score= document.getElementById('player-1');
const p2Score= document.getElementById('player-2');
const drawScore= document.getElementById('draw');
let numMoves= 0;
let p1Win=0;
let p2Win=0;
let draw=0;


for (let i = 0; i< inputFields.length; i++) {
	const input= inputFields[i];
	input.onclick= function(){
		
		if (input.innerHTML=="" && !checkWin()){
			input.innerHTML= dataInput();
			let p1= 'Player 1 Won!!!';
			let p2= 'Player 2 Won!!!';
			let tieGame= 'Game Draw!!!';
			let symbol=dataInput();
			
			if (checkWin()){
				if (symbol==player1) {
					p1Win+=1;
					p1Score.innerHTML=p1Win;
					textAlert.innerHTML=p1;
					textAlert.classList.add('color')
				}
				else {
					p2Win+=1;
					p2Score.innerHTML=p2Win;
					textAlert.innerHTML=p2;
					textAlert.classList.add('color')
				}
			}
			else if (checkTie()) {
				draw+=1;
				drawScore.innerHTML=draw;
				textAlert.innerHTML=tieGame;
				textAlert.classList.add('color')
			}
			numMoves++
		}
	}
}

function dataInput (){
	
	if (numMoves%2==0){
		return 'O';
	} 
	else {
		return 'X';
	}
}

function checkWin(){
	
	const winningCombo= [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
	];
	
	for (let i = 0; i <winningCombo.length; i++) {
		const condition =winningCombo[i];
		
		if (inputFields[condition[0]].innerHTML==inputFields[condition[1]].innerHTML && inputFields[condition[0]].innerHTML==inputFields[condition[2]].innerHTML && inputFields[condition[1]].innerHTML==inputFields[condition[2]].innerHTML && inputFields[condition[0]].innerHTML!=""){
			return true;
		}
	}
		return false;
}

function checkTie() {
	
	if(!checkWin() && numMoves == 8) {
		return true;
	} 
	else {
		return false;
	}
}


function resetGame(){
	
	let title="Tic Tac Toe"
	
	for (let i = 0; i< inputFields.length; i++) {
		inputFields[i].innerHTML="";
		numMoves=0;
		textAlert.innerHTML=title;
		textAlert.classList.remove('color')
	}
}

