var loaded;

$(document).ready(function() {
	init();
});

function init() {
	loaded = false;
	getCart();
	checkLoad();
}

function getCart() {
	$
			.ajax({
				url : "modules/shoppingcart.php",
				type : 'GET',
				data : {
					'typeGet' : 'items'
				},
				success : function(data) {
					if (data.status == 'success') {
						getTable(data.items);
					} else if (data.status == 'error') {
						if (data.message == 'No Login') {
							window.location = 'login.html';
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
		var quantityTd = getTdElem(+itemArray[itemKeys[i]].number, false);
		tr.appendChild(quantityTd);
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