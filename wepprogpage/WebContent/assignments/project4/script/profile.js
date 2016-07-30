$(document).ready(function() {
	setCartCount();
	getUserInfo();
	getOrders();

	$('#order-div').dialog({
		width : 650,
		autoOpen : false,
		show : {
			effect : "blind",
			duration : 1000
		},
		hide : {
			effect : "explode",
			duration : 1000
		}
	});
});

function getUserInfo() {
	$
			.ajax({
				url : "modules/user.php",
				type : 'GET',
				data : {
					'typeGet' : 'userinfo'
				},
				success : function(data) {
					if (data.status == 'success') {
						var userName = data.userName;
						var userEmail = data.userEmail;
						writeUserInfo(userName, userEmail);
					} else if (data.status == 'error') {
						if (data.message.localeCompare('No Login') == 0) {
							window.location = 'login.html?from=profile';
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

function writeUserInfo(userName, userEmail) {
	var dispElem = document.getElementById('user_area');
	var div = document.createElement('div');
	div.innerText = "User: " + userName;
	dispElem.appendChild(div);
	var div2 = document.createElement('div');
	div2.innerText = "Email: " + userEmail;
	dispElem.appendChild(div2);
}

function getOrders() {
	$
			.ajax({
				url : "modules/profile.php",
				type : 'GET',
				data : {
					'typeGet' : 'order_list'
				},
				success : function(data) {
					if (data.status == 'success') {
						var ordersList = data.orders;
						writeOrdersTable(ordersList);
					} else if (data.status == 'error') {
						if (data.message.localeCompare('No Login') == 0) {
							window.location = 'login.html?from=profile';
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

function setupActionListener() {
	$('#orders_table').on('click', ".informationable", function(ev) {

		var trElem = ev.target.parentElement;
		if (trElem.localName == 'tr') {
			var trId = trElem.id;
			var idSplit = trId.split('_');
			getOrder(idSplit[1]);
		}
	});

	$('#orders_table').on('click', "div", function(ev) {

		var trElem = ev.target.parentElement.parentElement;
		if (trElem.localName == 'tr') {
			var trId = trElem.id;
			var idSplit = trId.split('_');
			getOrder(idSplit[1]);
		}
	});
}

function getOrder(orderId) {
	$
			.ajax({
				url : "modules/profile.php",
				type : 'GET',
				data : {
					'typeGet' : 'order',
					'orderId' : orderId
				},
				success : function(data) {
					if (data.status == 'success') {
						var itemsList = data.items;
						removeOrderDisplayTable();
						writeOrderDisplayTable(itemsList);
						afterLoad();
						$('#order-div').dialog("open");
					} else if (data.status == 'error') {
						if (data.message.localeCompare('No Login') == 0) {
							window.location = 'login.html?from=profile';
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

function writeOrdersTable(ordersList) {

	var dispElem = document.getElementById('order_area');

	var table = document.createElement('table');
	table.setAttribute('id', 'orders_table');
	var thead = document.createElement('thead');
	table.appendChild(thead);
	var nameHead = document.createElement('th');
	nameHead.innerText = "Order Number";
	thead.appendChild(nameHead);

	var priceHead = document.createElement('th');
	priceHead.innerText = "Price";
	thead.appendChild(priceHead);

	var itemKeys = Object.keys(ordersList);
	for (var i = 0; i < itemKeys.length; i++) {
		var rowName = 'tr_' + itemKeys[i];
		var tr = getTrElem(rowName);
		var nameTd = getTdElem(itemKeys[i], false);
		tr.appendChild(nameTd);

		var priceTd = getTdElem('$' + ordersList[itemKeys[i]], false);
		tr.appendChild(priceTd);

		table.appendChild(tr);
	}
	dispElem.appendChild(table);
	setupActionListener();
}

function getTrElem(name) {
	var trElem = document.createElement('tr');
	trElem.setAttribute('id', name);
	trElem.setAttribute('class', 'informationable');
	return trElem;
}

function getTdElem(text) {
	var tdElem = document.createElement('td');
	var span = document.createElement("div");
	span.innerText = text;
	tdElem.appendChild(span);
	return tdElem;
}

function removeOrderDisplayTable() {
	var dispElem = document.getElementById('order-div');
	while (dispElem.hasChildNodes()) {
		dispElem.removeChild(dispElem.lastChild);
	}
}

function writeOrderDisplayTable(itemArray) {

	var dispElem = document.getElementById('order-div');

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
	table.appendChild(getFoot(itemArray));
	dispElem.appendChild(table);
}

function getFoot(items) {
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