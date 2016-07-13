function checkCompleteness() {
	clear();
	var form = document.getElementById("inputform");
	var missingFields = [];
	if (form.id_in.value.length == 0) {
		missingFields.push("Id");
		document.getElementById("id_span").textContent = "Please enter an Id.";
	}

	if (form.first_name_in.value.length == 0) {
		missingFields.push("First Name");
		document.getElementById("first_name_span").textContent = "Please enter a first name.";
	}

	if (form.last_name_in.value.length == 0) {
		missingFields.push("Last Name");
		document.getElementById("last_name_span").textContent = "Please enter a last name.";
	}

	if (missingFields.length > 0) {
		var output = "You forgot to fill the following fields: ";
		for (i = 0; i < missingFields.length - 1; i++) {
			output = output.concat(missingFields[i], ", ");
		}
		output = output.concat(missingFields[missingFields.length - 1]);
		alert(output);
		return false;
	}

	print(form);
	form.reset();
	return false;
}

function print(form) {
	document.getElementById("id_out").textContent = "Id: " + form.id_in.value;
	document.getElementById("first_out").textContent = "First Name: "
			+ form.first_name_in.value;
	document.getElementById("last_out").textContent = "Last Name: "
			+ form.last_name_in.value;
}
function clear() {
	document.getElementById("id_span").textContent = "";
	document.getElementById("first_name_span").textContent = "";
	document.getElementById("last_name_span").textContent = "";
}