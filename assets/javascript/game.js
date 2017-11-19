

$(document).ready(function(){

	var characters = ["WILL THE FRESH PRINCE SMITH", "PHILIP BANKS", 
	"VIVIAN BANKS", "CARLTON BANKS", "HILLARY BANKS", "ASHLEY BANKS", 
	"GEOFFREY", "NICKY BANKS", "JAZZ", "VY SMITH", "LISA WILKES", "JACKIE AMES", "DEE DEE"]
	var wins = 0;
	var validInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var win = new Audio("Assets/audio/FreshPrinceMiddle.mp3")
	var begin = new Audio("Assets/audio/FreshPrinceIntro.mp3")

	begin.play();

	//Returns random integer between 0 and max-1.
	function getRandomInt(max) {
	    return Math.floor(Math.random() * max)
	}

	//Creates an alert box
	function alertBox(message){
		$("#infoDiv").append(
			"<div class = 'alert alert-info alert-dismissable' role='alert' id=alertBox>" +
			"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
			"<span aria-hidden='true'>&times;</span></button><p>" +
				message +
			"</p></div>"
		)
		disappear("#alertBox");
	}

	//Pops-up an image of the character when guessed correctly
	function charImage(input){
		input = input.replace(/\s+/g, '') + ".jpg";//This modifies the character name to match their respective jpegs, 
		//by removing any spaces with regex and appending ".jpg"
		$("#charDiv").append(
			"<img src= 'Assets/images/" + input + "' class='img-responsive' alt='Responsive image'>"
		)
		disappear("#charDiv");
	}

	//Makes alert box/image disappear after 5 seconds
	function disappear(id){
		window.setTimeout(function(){
	    	$(id).fadeTo(500, 0).slideUp(500, function(){
	        	$(this).remove();
	    	});
		},5000)
	}

	//Letter replacement function, used to display correct letters
	String.prototype.replaceAt = function(index, letter) {
	    return this.slice(0, index) + letter + this.slice(index+letter.length);
	}

	// Start game button
	$("#startButton").button().click(function start(){

		var currentCharacter = characters[getRandomInt(characters.length)];			
		var displayCharacter = "";
		var remainingGuesses = 7;
		var alreadyGuessed = "";
		
		console.log(currentCharacter);
		//Fills displayCharacter with the appropriate number of blanks and spaces.
		for (var i = 0; i < currentCharacter.length; i++){
			if (currentCharacter[i] === " "){
				displayCharacter += " ";
			}

			else {displayCharacter += "_"}
		}

		// Displays current character being guessed.
		document.getElementById("game").innerHTML = displayCharacter;

		// Displays the remaining number of guesses.
		document.getElementById("remainingGuesses").innerHTML = remainingGuesses;

		// Displays the letters that gave already been guessed.
		document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed;

		//Displays total games won.
		document.getElementById("gamesWon").innerHTML = wins;

		document.onkeyup = function(event) {

			//correct is a counter variable, used by the for loop below
			var correct = 0;

			var userInput = String.fromCharCode(event.keyCode).toUpperCase();

			if (validInput.indexOf(userInput) === -1){
				alertBox("Invalid input, Homes!")
				console.log("Invalid")
			}

			//Filters letters that have already been guessed.
			else if (alreadyGuessed.indexOf(userInput) !==-1 || displayCharacter.indexOf(userInput) !==-1){
				alertBox("Yo, you already guessed that letter!");
				console.log("Guessed")
			}

			//Evaluates all valid guesses.
			else{
				for (var i = 0; i < currentCharacter.length; i++){
					if (userInput === currentCharacter[i]){
						displayCharacter = displayCharacter.replaceAt(i, userInput);
						document.getElementById("game").innerHTML = displayCharacter;
						correct ++;
					}
				}

				//Handles incorrect guesses.
				if (correct === 0){
					//Updates remainingGuesses and its corresponding html panel
					remainingGuesses --;
					document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
					//Updates alreadyGuessed and its corresponding html panel
					alreadyGuessed += userInput;
					document.getElementById("alreadyGuessed").innerHTML = alreadyGuessed;

				}

			}
		
			//Game over logic
			if (remainingGuesses < 1){
				document.getElementById("game").innerHTML = currentCharacter;
				alertBox("Yo Homes, smell ya later! \n GAME OVER.")
				
			}

			//User win logic
			if (displayCharacter === currentCharacter) {
				wins++;
				alertBox("You got it!");
				charImage(currentCharacter);
				win.play();
				start();
			}
		}
	})
})




