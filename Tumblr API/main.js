const title = document.getElementById('title');
const form= document.getElementById('query-form');
const query= document.getElementById('query');
const data=document.getElementById('list-data')
const choice= document.getElementById('buttons')
const replay= document.getElementById('replay')
const correctScore= document.getElementById('correct-guesses')
const wrongScore= document.getElementById('wrong-guesses')
const wordList=['Cheetah', 'Snail', 'Cockatoo', 'Bee', 'Deer', 'Dolphin', 'Duck', 'Frog', 'Kangaroo', 'Lion', 'Owl', 'Porcupine', 'Pronghorn', 'Quoll', 'Raccoon', 'Sheep', 'Squirrel ', 'Potoroo', 'Hummingbird', 'Dog', 'Chicken', 'Duck']
let listOfButton= [];
let win=0
let lose=0

function startGame(){
	resetGame ()
	let wordToGuess= wordList[Math.floor(Math.random()*wordList.length)];
	createOptions(wordToGuess);
	getPhotos(wordToGuess);


	for (let i = 0; i <listOfButton.length; i++) {
		let buttons=document.createElement('button');
		buttons.innerHTML=listOfButton[i];
		buttons.classList.add ('btn');
		buttons.classList.add ('btn-primary');
		buttons.classList.add ('mx-2');
		buttons.classList.add ('my-4');
		choice.appendChild(buttons);
	}

	choice.onclick= function(event){
		if (event.target.innerHTML==wordToGuess){
			title.innerHTML='Congrats, You Win!!!';
			title.classList.add('color')
			win+=1
			correctScore.innerHTML=win
		}
		else{
			title.innerHTML='Sorry the correct answer is '+ wordToGuess + '. Please try again!!!';
			title.classList.add('color')
			lose+=1
			wrongScore.innerHTML=lose
		}
		choice.classList.add ('hidden');
		replay.classList.remove ('hidden');
	}
}

function createOptions(tagName){
	listOfButton.push(tagName);

	for (let i = 0; i <3; i++) {
		let otherOption= wordList[Math.floor(Math.random()*wordList.length)];
		if (otherOption==tagName || listOfButton.includes(otherOption)){
			i-=1;
			continue;
		}
		else{
			listOfButton.push(otherOption);
		}
	}
	listOfButton.sort();
}

function getPhotos (tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=v9MytfIJeEer8WEFzi1M8kNJMrvN5GUV7CN5thDPb5zFDARopu')
		.then(function(response){
			return response.json();
		})
		.then(function(result){

			data.innerHTML= "";

			const items=result.response;
			let masonry;

			for (var i = 0; i<result.response.length; i++) {
				const item= items[i];
				
				if (item.photos !=undefined) {
					const altSizes= item.photos[0].alt_sizes;
					const imgSrc= altSizes[altSizes.length-3].url;

					const img =document.createElement('img')
					img.src=imgSrc
					img.onload =function(){
						masonry.layout();
					}
					const li= document.createElement('li');
					li.appendChild(img);

					data.appendChild(li);
				}
			}
		masonry = new Masonry( data, { itemSelector: 'li', percentPosition: true});
		masonry.layout();
		})
}

function resetGame (){
	title.innerHTML='Guess the tag';
	listOfButton=[];
	choice.innerHTML="";
	title.classList.remove('color')
	replay.classList.add ('hidden');
	choice.classList.remove('hidden');
}

startGame()

// form.onsubmit=function(event){
// 	event.preventDefault();

// 	const queryTerm= query.value;
// 	getPhotos(queryTerm);
// }