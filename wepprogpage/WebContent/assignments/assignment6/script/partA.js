function payrollPopup() {

	var count = 1;
	var value = 0;
	var valueArr = [];
	while (value != -1) {
		value = prompt("Enter the hours worked for employee: " + count);
		if (value.trim() && value > -1) {
			valueArr.push(value);
			count++;
		}
	}

	if (valueArr.length < 1) {
		var conf = confirm("You didn't enter any hours for employees, are you sure you wan to quit.");
		if (!conf)
			payrollPopup();
	} else {
		document.getElementById("enter_button").style.visibility = "hidden";
		drawTable(valueArr);
	}

}

function drawTable(valueArr) {
	var displayArea = document.getElementById("display_area");
	// create table, header, and row in header.
	var tbl = document.createElement('table');
	var thead = document.createElement('thead');
	var tr = document.createElement('tr');

	// create column heading 1, and add to the header row
	var col1Head = document.createElement('th');
	col1Head.innerHTML = "Employee Number";
	tr.appendChild(col1Head);

	// create column heading 2, and add to the header row
	var col2Head = document.createElement('th');
	col2Head.innerHTML = "Hours";
	tr.appendChild(col2Head);

	// create column heading 3, and add to the header row
	var col3Head = document.createElement('th');
	col3Head.innerHTML = "Pay this Week";
	tr.appendChild(col3Head);

	// append the row to the header, and append the header to the table.
	thead.appendChild(tr);
	tbl.appendChild(thead);

	// crete body for table
	var tbody = document.createElement('tbody');

	// Add the employee information.
	var total = 0;
	for (var j = 0; j < valueArr.length; j++) {
		var tr = document.createElement('tr');

		var employeeNumber = j + 1;
		var hours = valueArr[j];
		var pay = calculatePay(hours);
		total += pay;

		var empTd = document.createElement('td');
		empTd.innerHTML = employeeNumber;
		tr.appendChild(empTd);

		var hourTd = document.createElement('td');
		hourTd.innerHTML = hours;
		tr.appendChild(hourTd);

		var payTd = document.createElement('td');
		payTd.innerHTML = pay;
		tr.appendChild(payTd);

		tbody.appendChild(tr);
	}

	// add tbody to table
	tbl.appendChild(tbody);

	// create tfoot
	var tfoot = document.createElement('tfoot');
	var footTr = document.createElement('tr');

	var sumTd = document.createElement('td');
	sumTd.setAttribute('colSpan', '2');
	sumTd.innerHTML = "Sum";
	footTr.appendChild(sumTd);

	var sumValTd = document.createElement('td');
	sumValTd.innerHTML = total;
	footTr.appendChild(sumValTd);

	// append foot to table
	tfoot.appendChild(footTr);
	tbl.appendChild(tfoot);

	// add table to the display area.
	displayArea.appendChild(tbl);
}

function calculatePay(hours) {
	if (hours < 41) {
		return 15 * hours;
	} else {
		var pay = 40 * 15;
		pay += ((hours - 40) * (15 * 1.5));
		return pay;
	}
}