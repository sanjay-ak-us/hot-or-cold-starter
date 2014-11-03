var secret;
var guessNumber = 0;

$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
	
	//start the game when new game is clicked
	$('.new').on('click', newGame);

	/*----------- When page is loaded for the first time, start new game
	by calling the click event on 'new game' ---------*/
	if(secret == undefined)
			$('.new').click();
	
	//respond to guess event
	$('#guessButton').on('click', hotOrCold);

});

/*
Start a new game!
*/
function newGame(){
	secret = Math.floor(Math.random()*100);
	guessNumber = 0;
	resetGame();
};

/*
Check if the guessed number is hot or cold
*/
function hotOrCold(){
	var guess = $('#userGuess').val();
	if(isNaN(guess))
	{
		alert('Please enter a number');
		$('#userGuess').val('');
		return false;
	}
	guess = +guess;
	guessNumber++;
	//alert(secret +' : '+guess +' : '+guessNumber);
	//update the guess# count
	$('#count').text(guessNumber);
	$('#userGuess').val('');
	//get guess color: HOT if guess is greater than secret number
	var color = 'COLD';
	if((guess - secret) > 0)
		color = 'HOT';
	else if((guess - secret) == 0)
	{
		color = 'CORRECT';
		alert('Hurray! You guess was correct');
	}
	var guessTemp = "<li>"+guess+": "+color+"</li>";
	//alert(guessTemp);
	$('#guessList').append($(guessTemp));
	//reset the game
	if(color == 'CORRECT')
		newGame();
};

function resetGame()
{
	$('#guessList').empty();
	$('#count').text(guessNumber);
};