var tableSize = 25;
var generation = 1;
var run = false;

function init() {
	var gameDispElem = document.getElementById('display_area');
	var table = getTable();
	gameDispElem.appendChild(table);
	updateGenAndCountDisplay(0);
}
function changTable(selectElem) {
	if (run) {
		reset();
	}

	var num = parseInt(selectElem.value);
	tableSize = num;
	cleanGameElem();
	var table = getTable();
	var gameDispElem = document.getElementById('display_area');
	gameDispElem.appendChild(table);
	updateGenAndCountDisplay(0);
}

function cleanGameElem() {
	var gameDispElem = document.getElementById('display_area');
	while (gameDispElem.hasChildNodes()) {
		gameDispElem.removeChild(gameDispElem.lastChild);
	}
}

function start() {
	if (!run) {
		run = true;
		nextGen(1);
		setTimeout(tick, 1000);
	}
}

function stop() {
	run = false;
}

function tick() {
	if (run) {
		nextGen(1);
		setTimeout(tick, 1000);
	}
}

function getTdElem(name) {
	var tdElem = document.createElement('td');
	tdElem.setAttribute('id', name);
	tdElem.setAttribute('onclick', 'flipLive(this)')
	tdElem.style.height = (500 / tableSize) + 'px';
	tdElem.style.width = (500 / tableSize) + 'px';
	return tdElem;
}

function getTrElem(name) {
	var trElem = document.createElement('tr');
	trElem.setAttribute('id', name);
	return trElem;
}

function getTable() {
	var table = document.createElement('table');
	table.setAttribute('id', 'game_table');
	for (var i = 1; i <= tableSize; i++) {
		var rowName = 'tr_' + i;
		var tr = getTrElem(rowName);
		for (var j = 1; j <= tableSize; j++) {
			var tdName = 'td_' + i + '_' + j;
			var td = getTdElem(tdName);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	return table;
}

function flipLive(td) {
	var background = td.style.background;
	if (background === 'green') {
		td.style.background = '#DCDCDC';
	} else {
		td.style.background = 'green';
	}
	updateGenAndCountDisplay(countLive(document.getElementsByTagName('td')));
}

function nextGen(numSkip) {
	var curState = new Array(tableSize);
	for (var i = 0; i < tableSize; i++) {
		curState[i] = new Array(tableSize);
		for (var j = 0; j < tableSize; j++)
			curState[i][j] = 0;
	}

	var tdList = document.getElementsByTagName('td');
	for (var i = 0; i < tdList.length; i++) {
		var td = tdList[i];
		var id = td.getAttribute('id');
		var idSplit = id.split('_');
		var row = parseInt(idSplit[1]);
		var col = parseInt(idSplit[2]);

		var background = td.style.background;
		if (background === 'green') {
			curState[row - 1][col - 1] = 1;
		}
	}

	for (var i = 0; i < tdList.length; i++) {
		var td = tdList[i];
		var id = td.getAttribute('id');
		var idSplit = id.split('_');
		var row = parseInt(idSplit[1]);
		var col = parseInt(idSplit[2]);

		var neighborCount = getNeighborCount(row - 1, col - 1, curState);
		var background = td.style.background;
		if (background === 'green' && neighborCount < 2) {
			td.style.background = '#DCDCDC';
		} else if (background === 'green' && neighborCount > 3) {
			td.style.background = '#DCDCDC';
		} else if (background !== 'green' && neighborCount == 3) {
			td.style.background = 'green';
		}
	}

	generation++;
	numSkip--;
	if (numSkip > 0) {
		nextGen(numSkip);
	} else {
		var numLive = countLive(tdList);
		if (numLive == 0 & run)
			run = false;
		updateGenAndCountDisplay(numLive);
	}
}

function randomPop() {
	var randPop = Math.random() * (tableSize * tableSize);
	reset();
	for (var i = 0; i < randPop; i++) {
		var x = Math.ceil(Math.random() * tableSize);
		var y = Math.ceil(Math.random() * tableSize);

		var tdElem = document.getElementById('td_' + x + '_' + y);
		var background = tdElem.style.background;
		if (background === 'green') {
			i--;
		} else {
			tdElem.style.background = 'green';
		}
	}
	updateGenAndCountDisplay(countLive(document.getElementsByTagName('td')));
}

function reset() {
	run = false;
	var tdList = document.getElementsByTagName('td');
	for (var i = 0; i < tdList.length; i++) {
		var td = tdList[i];
		td.style.background = '#DCDCDC';
	}
	generation = 1;
	updateGenAndCountDisplay(0);
}

function countLive(tdList) {
	var liveCount = 0;
	for (var i = 0; i < tdList.length; i++) {
		var td = tdList[i];
		var background = td.style.background;
		if (background === 'green')
			liveCount++;
	}
	return liveCount;
}

function updateGenAndCountDisplay(count) {
	var countHeader = document.getElementById('count_h');
	countHeader.innerHTML = "Live count: " + count;

	var generationHeader = document.getElementById('generation_h');
	generationHeader.innerHTML = "Generation: " + generation;
}

function getNeighborCount(x, y, curState) {
	var count = 0;
	count += neighbor1Check(x, y, curState);
	count += neighbor2Check(x, y, curState);
	count += neighbor3Check(x, y, curState);
	count += neighbor4Check(x, y, curState);
	count += neighbor5Check(x, y, curState);
	count += neighbor6Check(x, y, curState);
	count += neighbor7Check(x, y, curState);
	count += neighbor8Check(x, y, curState);
	return count;
}

function neighbor1Check(x, y, curState) {
	if (x - 1 > -1) {
		if (y - 1 > -1) {
			return curState[x - 1][y - 1];
		}
	}
	return 0;
}
function neighbor2Check(x, y, curState) {
	if (x - 1 > -1) {
		return curState[x - 1][y];
	}
	return 0;
}
function neighbor3Check(x, y, curState) {
	if (x - 1 > -1) {
		if (y + 1 < curState[0].length) {
			return curState[x - 1][y + 1];
		}
	}
	return 0;
}
function neighbor4Check(x, y, curState) {
	if (y + 1 < curState[0].length) {
		return curState[x][y + 1];
	}
	return 0;
}
function neighbor5Check(x, y, curState) {
	if (x + 1 < curState.length) {
		if (y + 1 < curState[0].length) {
			return curState[x + 1][y + 1];
		}
	}
	return 0;
}
function neighbor6Check(x, y, curState) {
	if (x + 1 < curState.length) {
		return curState[x + 1][y];
	}
	return 0;
}
function neighbor7Check(x, y, curState) {
	if (x + 1 < curState.length) {
		if (y - 1 > -1) {
			return curState[x + 1][y - 1];
		}
	}
	return 0;
}
function neighbor8Check(x, y, curState) {
	if (y - 1 < -1) {
		return curState[x][y - 1];
	}
	return 0;
}