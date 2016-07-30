var items;

$(document).ready(function() {
	init();
});

function init() {
	checkout();
}

function checkout() {
	$.ajax({
		url : "modules/checkout.php",
		type : 'POST',
		data : {
			'typePost' : 'checkout'
		},
		success : function(data) {
			if (data.status == 'success') {
				var orderId = data.orderId;
				getOrder(orderId);
				alert("Order Has Been Processed.");
			} else if (data.status == 'error') {
				if (data.message == 'No Login') {
					window.location = 'login.html?from=checkout';
				} else if (data.message == 'No Items') {
					alert("There Are No Items In Your Shopping Cart. \n Go Shopping!");
					window.location = 'inventory.html';
				} else {
					alert("Failed to connect database with message:"
							+ data.message);
				}
			} else {
				alert("Failed to connect database with message:" + data);
			}
		},
		error : function(data) {
			alert(data.responseText);
		}
	});
}

function getOrder(orderId) {
	$
			.ajax({
				url : "modules/checkout.php",
				type : 'GET',
				data : {
					'typeGet' : 'order',
					'orderId' : orderId
				},
				success : function(data) {
					if (data.status == 'success') {
						getTable(data.items);
						afterLoad();
					} else if (data.status == 'error') {
						if (data.message == 'No Login') {
							window.location = 'login.html?from=shoppingcart';
						} else {
							alert("Failed to connect to shopping cart with message:"
									+ data.message);
						}
					} else {
						alert("Failed to connect to shopping cart with message:"
								+ data);
					}
				},
				error : function(data) {
					alert(data.responseText);
				}
			});
}

function getTable(itemArray) {
	items = itemArray;
	var dispElem = document.getElementById('display_area');

	var table = document.createElement('table');
	table.setAttribute('id', 'inventory_table');
	var thead = document.createElement('thead');
	table.appendChild(thead);
	var nameHead = document.createElement('th');
	nameHead.innerText = "Item Name";
	thead.appendChild(nameHead);

	var descriptHead = document.createElement('th');
	descriptHead.innerText = "Description";
	thead.appendChild(descriptHead);

	var priceHead = document.createElement('th');
	priceHead.innerText = "Price";
	thead.appendChild(priceHead);

	var numberHead = document.createElement('th');
	numberHead.innerText = "Quantity";
	thead.appendChild(numberHead);

	var itemKeys = Object.keys(itemArray);
	for (var i = 0; i < itemKeys.length; i++) {
		var rowName = 'tr_' + itemKeys[i];
		var tr = getTrElem(rowName);
		var nameTd = getTdElem(itemArray[itemKeys[i]].name, false);
		tr.appendChild(nameTd);
		var descriptTd = getTdElem(itemArray[itemKeys[i]].description, true);
		var span2 = document.createElement('div');
		span2.innerText = "(Click For Description)";
		span2.style.display = '';
		descriptTd.appendChild(span2);
		tr.appendChild(descriptTd);
		var priceTd = getTdElem('$' + itemArray[itemKeys[i]].price, false);
		tr.appendChild(priceTd);
		var quantityTd = getNumberTdElem(+itemArray[itemKeys[i]].number);
		tr.appendChild(quantityTd);
		table.appendChild(tr);
	}
	table.appendChild(getFoot());
	dispElem.appendChild(table);
}

function getFoot() {
	var foot = document.createElement('tfoot');
	var trElem = document.createElement('tr');
	var titleTd = document.createElement('td');
	titleTd.setAttribute('colspan', '3');
	titleTd.innerText = "Sum";
	trElem.appendChild(titleTd);
	var totalTd = document.createElement('td');
	var sum = 0;
	for ( var key in items) {
		sum += items[key].number * items[key].price;
	}
	totalTd.innerText = '$' + sum.toFixed(2);
	trElem.appendChild(totalTd);
	foot.appendChild(trElem);
	return foot;
}

function getTrElem(name) {
	var trElem = document.createElement('tr');
	trElem.setAttribute('id', name);
	trElem.setAttribute('class', 'informationable');
	return trElem;
}

function getTdElem(text, hidden) {
	var tdElem = document.createElement('td');
	var span = document.createElement("div");
	span.innerText = text;
	if (hidden)
		span.style.display = 'none';
	tdElem.appendChild(span);
	return tdElem;
}

function getNumberTdElem(value) {
	var tdElem = document.createElement('td');
	var input = document.createElement('input');
	input.setAttribute('type', 'number');
	input.setAttribute('min', '0');
	input.setAttribute('class', 'counts');
	input.setAttribute('value', value);
	input.setAttribute('disabled', true);

	tdElem.appendChild(input);
	return tdElem;
}

function afterLoad() {
	
		$('#inventory_table').on('click', ".informationable", function(ev) {

			var trElem = ev.target.parentElement;
			if (trElem.localName == 'tr') {
				var descTd = trElem.childNodes[1];
				var descSpan = descTd.childNodes[0];
				var descSpan2 = descTd.childNodes[1];
				if (descSpan.style.display != 'none') {
					descSpan.style.display = 'none';
				} else {
					descSpan.style.display = '';
				}
				if (descSpan2.style.display != 'none') {
					descSpan2.style.display = 'none';
				} else {
					descSpan2.style.display = '';
				}
			}
		});

		$('#inventory_table').on('click', "div", function(ev) {

			var trElem = ev.target.parentElement.parentElement;
			if (trElem.localName == 'tr') {
				var descTd = trElem.childNodes[1];
				var descSpan = descTd.childNodes[0];
				var descSpan2 = descTd.childNodes[1];
				if (descSpan.style.display != 'none') {
					descSpan.style.display = 'none';
				} else {
					descSpan.style.display = '';
				}
				if (descSpan2.style.display != 'none') {
					descSpan2.style.display = 'none';
				} else {
					descSpan2.style.display = '';
				}
			}
		});

}