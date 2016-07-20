var magicNumber;
var guessLimit;

function getNewNum() {
	magicNumber = Math.floor((Math.random() * 100) + 1);
	guessLimit = 20;
	var elem = document.getElementById('limitcount');
	elem.innerHTML = "";
	elem.style.color = "black";
}

function checkNum() {
	if (guessLimit > 1) {

		var inElem = document.getElementById('num_in');
		var value = inElem.value;
		inElem.value = "";
		inElem.focus();
		if (value == null || value == "") {
			document.getElementById('response').innerHTML = "You wasted a guess. Go again.";
			decreaseGuessLimit();
			return;
		}

		value = parseInt(value);
		if (value > magicNumber) {
			document.getElementById('response').innerHTML = "The Number "
					+ value + " too high, try again.";
			decreaseGuessLimit();
		} else if (value < magicNumber) {
			document.getElementById('response').innerHTML = "The Number "
					+ value + " is too low, try again.";
			decreaseGuessLimit();

		} else {
			document.getElementById('response').innerHTML = "You gessed the number, it was "
					+ value + ".  New game try again.";
			getNewNum();
		}
	} else {
		getNewNum();
	}

}

function decreaseGuessLimit() {
	guessLimit--;
	var elem = document.getElementById('limitcount');
	elem.innerHTML = "You have " + guessLimit + " more guesses left to go.";

	if (guessLimit <= 10 && guessLimit > 5) {
		elem.style.color = "orange";
	} else if (guessLimit <= 5) {
		elem.style.color = "red";
	}

}
