var loaded;

$(document).ready(function() {
	init();
});

function setCartCount() {
	$
			.ajax({
				url : "modules/shoppingcart.php",
				type : 'GET',
				data : {
					'typeGet' : 'count'
				},
				success : function(data) {
					if (data.status == 'success') {
						$('#cart').children('span')
								.text("(" + data.count + ")");
					} else if (data.status == 'error') {
						if (data.message.localeCompare('No Login') == 0) {
							$('#cart').children('span').text("(0)");
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

function addItemToCart(itemId) {
	$
			.ajax({
				url : "modules/shoppingcart.php",
				type : 'POST',
				data : {
					'typePost' : 'additem',
					'itmeId' : itemId
				},
				success : function(data) {
					if (data.status == 'success') {
						setCartCount();
					} else if (data.status == 'error') {
						if (data.message.localeCompare('No Login') == 0) {
							window.location = 'login.html?to=shoppingcart&from=inventory&id='
									+ itemId;
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

function init() {
	loaded = false;
	getInventory();
	setCartCount();
	checkLoad();
}

function checkLoad() {
	if (!loaded) {
		setTimeout(function() {
			checkLoad();
		}, 950);
	} else {

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

		$('.add_span').on('click', function(ev) {
			var trId = ev.target.parentElement.parentElement.id;
			var idSplit = trId.split('_');
			addItemToCart(idSplit[1]);
		});

	}
}

function cartProcess() {
	$
			.ajax({
				url : "modules/user.php",
				type : 'GET',
				data : {
					'typeGet' : 'loggedin'
				},
				success : function(data) {
					if (data.status == 'success') {
						if (data.message.localeCompare("ok") == 0) {
							window.location = 'shoppingcart.html'
						} else {
							window.location = 'login.html';
						}
					} else if (data.status == 'error') {
						alert("Failed to connect to shopping cart with message:"
								+ data.message);
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

function getInventory() {
	$.ajax({
		url : "modules/inventory.php",
		type : 'GET',
		data : {
			'typeGet' : 'items'
		},
		success : function(data) {
			if (data.status == 'success') {
				getTable(data.items);
			} else if (data.status == 'error') {
				alert("Failed to connect to inventory with message:"
						+ data.message);
			} else {
				alert("Failed to connect to inventory with message:" + data);
			}
		},
		error : function(data) {
			alert(data.responseText);
		}
	});
}

function getTable(itemArray) {
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
		var addSpan = document.createElement('span');
		addSpan.setAttribute('class', 'add_span');
		addSpan.innerText = "(add to cart)";
		priceTd.appendChild(addSpan);
		tr.appendChild(priceTd);
		table.appendChild(tr);
	}
	dispElem.appendChild(table);
	loaded = true;
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