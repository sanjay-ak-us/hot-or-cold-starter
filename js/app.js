var secret;
var guessNumber = 0;
var previousGuess = 0;
var originalFeedback = 'Make your Guess!';
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
	
	//get guess color
	var color = getColor(guess);
	$('#feedback').text(color);
	previousGuess = guess;
};

//process first guess
function getColor(guess)
{
	var diff = Math.abs((secret - guess));
	if(diff == 0)
		return 'Hurray! Your guess is correct!';
	if(guessNumber == 1)
	{
		if(diff >= 50)
			return 'Ice cold: Further than 50';
		else if(diff >= 30)
			return 'Cold: Further than 30';
		else if(diff >= 20)
			return 'Warm: Within 30';
		else if(diff >= 10)
			return 'Hot: Within 20';
		else
			return 'Very Hot: Within 10';
	}
	else
	{
		var newDiff = Math.abs((secret-previousGuess)) - diff;
		if(newDiff >0)
			return 'Hotter';
		else
			return 'Colder';
	}
};

function resetGame()
{
	$('#guessList').empty();
	$('#count').text('0');
	$('#feedback').text(originalFeedback);
	guessNumber = 0;
	previousGuess = 0;
};
