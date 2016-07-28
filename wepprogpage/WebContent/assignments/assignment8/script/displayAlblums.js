function init() {
	$.ajax({
		url : "backend.php",
		type : 'GET',
		data : [],
		success : function(data) {
			if (data.status == 'success')
				processSuccess(data);
		}
	});

}

function processSuccess(data) {
	var dispAreaElem = document.getElementById('display_area');
	var ulElem = document.createElement('ul');

	// create table, .
	var tbl = document.createElement('table');
	tbl.setAttribute('class', 'disp_table');
	dispAreaElem.appendChild(tbl);

	// create header
	var thead = document.createElement('thead');
	tbl.appendChild(thead);
	var tr = document.createElement('tr');
	thead.appendChild(tr);
	// create column heading 1, and add to the header row
	var col1Head = document.createElement('th');
	col1Head.innerHTML = "Artist Name";
	tr.appendChild(col1Head);

	// create column heading 2, and add to the header row
	var col2Head = document.createElement('th');
	col2Head.innerHTML = "Alblums";
	tr.appendChild(col2Head);

	var keyArr = Object.keys(data.alblums);
	for (var i = 0; i < keyArr.length; i++) {
		// create row
		var trElem = document.createElement('tr');
		tbl.appendChild(trElem);
		// first column is artist name
		var tdElem1 = document.createElement('td');
		tdElem1.innerHTML = keyArr[i];
		trElem.appendChild(tdElem1);

		// second column is alblums
		var tdElem2 = document.createElement('td');
		trElem.appendChild(tdElem2);
		var ulElem = document.createElement('ul');
		tdElem2.appendChild(ulElem);
		var alblums = data.alblums[keyArr[i]];
		for (var j = 0; j < alblums.length; j++) {
			var liElem = document.createElement('li');
			liElem.innerHTML = alblums[j];
			ulElem.appendChild(liElem);
		}
	}
}
