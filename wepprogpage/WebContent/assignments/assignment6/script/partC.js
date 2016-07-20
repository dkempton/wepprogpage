var numFlipped;
var timeLeft;
var win;

function init() {
	var gameDispElem = document.getElementById('game_display_area');
	gameDispElem.style.display = 'none';
	var initDispElem = document.getElementById('init_display_area');
	initDispElem.style.display = 'block';
	cleanGameElem();
}

function start() {

	// hide the selection section
	var initDispElem = document.getElementById('init_display_area');
	initDispElem.style.display = 'none';

	// show the game section.
	var gameDispElem = document.getElementById('game_display_area');
	gameDispElem.style.display = 'block';
	var timeDiv = document.createElement('div');
	timeDiv.setAttribute('id', "time");
	gameDispElem.appendChild(timeDiv);

	var photoSelectElem = document.getElementById('photoselect');
	var numPhoto = parseInt(photoSelectElem.options[photoSelectElem.selectedIndex].value);

	var timeSelectElem = document.getElementById('mem_time');
	var secToMem = parseInt(timeSelectElem.options[timeSelectElem.selectedIndex].value);

	var table = getTable(numPhoto);
	gameDispElem.appendChild(table);

	setTimeout(flipAll, secToMem * 1000);

	if (numPhoto == 8) {
		timeLeft = 120;
	} else if (numPhoto == 10) {
		timeLeft = 150;
	} else {
		timeLeft = 180;
	}

	timeDiv.innerHTML = "You have " + timeLeft + " seconds left.";
	win = false;
	setTimeout(timerTick, 1000);
}

function cleanGameElem() {
	var gameDispElem = document.getElementById('game_display_area');
	while (gameDispElem.hasChildNodes()) {
		gameDispElem.removeChild(gameDispElem.lastChild);
	}
}

function getRandomImgs(numPhoto) {
	// array to hold the image names.
	var imgNames = new Array(numPhoto);

	// array to hold index values
	var idxArr = Array.apply(null, {
		length : numPhoto
	}).map(Number.call, Number);

	var nameList = Array.apply(null, {
		length : 13
	}).map(function(element, index) {
		return index + 1
	});

	for (var i = 0; i < numPhoto / 2; i++) {
		var tmpIdx = Math.floor((Math.random() * nameList.length));
		var name = nameList[tmpIdx];
		nameList.splice(tmpIdx, 1);
		name = "landscape" + name + ".jpg";

		var idx1 = Math.floor((Math.random() * idxArr.length));
		var idx2 = idxArr[idx1];

		imgNames[idx2] = name;
		idxArr.splice(idx1, 1);

		idx1 = Math.floor((Math.random() * idxArr.length));
		idx2 = idxArr[idx1];

		imgNames[idx2] = name;
		idxArr.splice(idx1, 1);
	}

	return imgNames;
}

function getImgElem(name, id, visable) {

	var img = document.createElement('img');
	img.setAttribute('src', 'images/' + name);
	img.setAttribute('alt', name);
	img.setAttribute('id', id);
	img.setAttribute('onclick', 'flipImg(this)')
	if (visable == true) {
		return img;
	} else {
		img.style.display = 'none';
		return img;
	}
}

function getTdElem(name) {
	var tdElem = document.createElement('td');
	tdElem.setAttribute('id', name);
	return tdElem;
}

function getTrElem() {
	var trElem = document.createElement('tr');
	return trElem;
}

function getTable(numImages) {

	var tableElem = document.createElement('table');
	tableElem.setAttribute('id', 'game_table')

	var nameArr = getRandomImgs(numImages);
	if (numImages == 8) {
		var row1 = getTrElem();
		var row2 = getTrElem();

		for (var i = 0; i < 4; i++) {
			var img1 = getImgElem(nameArr[i * 2], 'img' + (i * 2), true);
			var img1_1 = getImgElem("cardback.jpg", 'img' + (i * 2) + '_1',
					false);
			var img2 = getImgElem(nameArr[i * 2 + 1], 'img' + (i * 2 + 1), true);
			var img2_1 = getImgElem("cardback.jpg", 'img' + (i * 2 + 1) + '_1',
					false);

			var td1 = getTdElem('td' + i * 2);
			td1.appendChild(img1);
			td1.appendChild(img1_1);
			var td2 = getTdElem('td' + i * 2 + 1);
			td2.appendChild(img2);
			td2.appendChild(img2_1);

			row1.appendChild(td1);
			row2.appendChild(td2);
		}

		tableElem.appendChild(row1);
		tableElem.appendChild(row2);

	} else if (numImages == 10) {
		var row1 = getTrElem();
		var row2 = getTrElem();

		for (var i = 0; i < 5; i++) {
			var img1 = getImgElem(nameArr[i * 2], 'img' + (i * 2), true);
			var img1_1 = getImgElem("cardback.jpg", 'img' + (i * 2) + '_1',
					false);
			var img2 = getImgElem(nameArr[i * 2 + 1], 'img' + (i * 2 + 1), true);
			var img2_1 = getImgElem("cardback.jpg", 'img' + (i * 2 + 1) + '_1',
					false);

			var td1 = getTdElem('td' + i * 2);
			td1.appendChild(img1);
			td1.appendChild(img1_1);
			var td2 = getTdElem('td' + i * 2 + 1);
			td2.appendChild(img2);
			td2.appendChild(img2_1);

			row1.appendChild(td1);
			row2.appendChild(td2);
		}

		tableElem.appendChild(row1);
		tableElem.appendChild(row2);

	} else if (numImages == 12) {
		var row1 = getTrElem();
		var row2 = getTrElem();
		var row3 = getTrElem();

		for (var i = 0; i < 4; i++) {
			var img1 = getImgElem(nameArr[i * 3], 'img' + (i * 3), true);
			var img1_1 = getImgElem("cardback.jpg", 'img' + (i * 3) + '_1',
					false);
			var img2 = getImgElem(nameArr[i * 3 + 1], 'img' + (i * 3 + 1), true);
			var img2_1 = getImgElem("cardback.jpg", 'img' + (i * 3 + 1) + '_1',
					false);
			var img3 = getImgElem(nameArr[i * 3 + 2], 'img' + (i * 3 + 2), true);
			var img3_1 = getImgElem("cardback.jpg", 'img' + (i * 3 + 2) + '_1',
					false);

			var td1 = getTdElem('td' + i * 3);
			td1.appendChild(img1);
			td1.appendChild(img1_1);
			var td2 = getTdElem('td' + i * 3 + 1);
			td2.appendChild(img2);
			td2.appendChild(img2_1);
			var td3 = getTdElem('td' + i * 3 + 1);
			td3.appendChild(img3);
			td3.appendChild(img3_1);

			row1.appendChild(td1);
			row2.appendChild(td2);
			row3.appendChild(td3);
		}

		tableElem.appendChild(row1);
		tableElem.appendChild(row2);
		tableElem.appendChild(row3);
	}
	return tableElem;
}

function flipImg(img) {
	var id = img.getAttribute('id');
	var idSplit = id.split('_');
	if (idSplit.length > 1) {
		document.getElementById(idSplit[0]).style.display = 'block';
		numFlipped++;
	} else {
		document.getElementById(id + '_1').style.display = 'block';
	}
	img.style.display = 'none';

	if (numFlipped > 1) {
		numFlipped = 0;
		setTimeout(checkMatch, 500);
	}

}

function flipAll() {
	var list = document.getElementsByTagName('img');
	for (var i = 0; i < list.length; i++) {
		var img = list[i];
		var id = img.getAttribute('id');
		var idSplit = id.split('_');
		if (idSplit.length > 1) {
			img.style.display = 'block';
		} else {
			img.style.display = 'none';
		}
	}
	numFlipped = 0;
}

function checkMatch() {
	var list = document.getElementsByTagName('img');
	var ansList = [];
	for (var i = 0; i < list.length; i++) {
		var img = list[i];
		var id = img.getAttribute('id');
		var idSplit = id.split('_');
		if (idSplit.length == 1 && img.style.display == 'block') {
			ansList.push(img);
		}
	}

	if (ansList[0].getAttribute('src') == ansList[1].getAttribute('src')) {

		var par1 = ansList[0].parentElement;
		while (par1.hasChildNodes()) {
			par1.removeChild(par1.lastChild);
		}

		var par2 = ansList[1].parentElement;
		while (par2.hasChildNodes()) {
			par2.removeChild(par2.lastChild);
		}

		if (list.length == 0)
			win();

	} else {
		flipImg(ansList[0]);
		flipImg(ansList[1]);
	}

}

function win() {
	cleanGameElem();
	var gameDispElem = document.getElementById('game_display_area');
	var div = document.createElement('div');
	div.innerHTML = "You Win!!!";
	div.setAttribute('id', "win");
	gameDispElem.appendChild(div);

	var button = document.createElement('button');
	button.setAttribute('class', 'action_button');
	button.setAttribute('onclick', 'init()');
	button.innerHTML = "New Game";
	gameDispElem.appendChild(button);
	win = true;
}

function lose() {
	cleanGameElem();
	var gameDispElem = document.getElementById('game_display_area');
	var div = document.createElement('div');
	div.innerHTML = "You Lost.";
	div.setAttribute('id', "win");
	gameDispElem.appendChild(div);

	var button = document.createElement('button');
	button.setAttribute('class', 'action_button');
	button.setAttribute('onclick', 'init()');
	button.innerHTML = "New Game";
	gameDispElem.appendChild(button);
}

function timerTick() {
	timeLeft--;
	if (timeLeft < 1 && !win) {
		lose();
	} else if (!win) {
		var timeDiv = document.getElementById('time');
		timeDiv.innerHTML = "You have " + timeLeft + " seconds left.";
		setTimeout(timerTick, 1000);
	}
}