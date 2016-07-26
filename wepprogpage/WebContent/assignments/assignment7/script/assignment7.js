$(document).ready(function() {

	$(".radio_pay_type").change(function() {
		var inputAreaElem = document.getElementById('input_area');
		if ($('#radio_pay_card').prop("checked")) {
			cleanInputArea()
			var cardNumElem = getCardNumElem();
			inputAreaElem.appendChild(cardNumElem);
		} else {
			cleanInputArea();
			var transElem = getWireTransferElem();
			inputAreaElem.appendChild(transElem);
		}
	});

	$(".removable li").on('dragstart', function(ev) {
		ev.originalEvent.dataTransfer.setData("text", ev.target.id);
	});

	$("#trash").on('dragover', function(ev) {
		ev.originalEvent.preventDefault();
	});

	$("#trash").on('drop', function(ev) {
		ev.originalEvent.preventDefault();
		var data = ev.originalEvent.dataTransfer.getData('text');
		var response = confirm("Are you sure you want to delete this item?");
		if (response == true)
			document.getElementById(data).remove();
	});

	$(".informationable li").on('click', function(ev) {
		var liId = ev.target.id;
		var liElem = document.getElementById(liId);
		var liChildren = liElem.childNodes;
		var idArr = liId.split("_");
		if (liChildren.length == 1) {
			$.get(idArr[1] + '.html', function(data) {
				$('#' + liId).append(data);
			});
		} else {
			while (liElem.childNodes.length > 1) {
				liElem.lastChild.remove();
			}
		}
	});
});

function init() {
	var inputAreaElem = document.getElementById('input_area');
	var cardNumElem = getCardNumElem();
	inputAreaElem.appendChild(cardNumElem);
}

function getCardNumElem() {
	var inputDiv = document.createElement('div');
	var numberLabel = document.createElement('label');
	numberLabel.setAttribute('for', 'card_num_in')
	numberLabel.innerHTML = 'Card number:';
	inputDiv.appendChild(numberLabel);

	var cardNumElem = document.createElement('input');
	cardNumElem.setAttribute('id', 'card_num_in');
	cardNumElem.setAttribute('name', 'card_num_in');
	cardNumElem.setAttribute('maxlength', 16);
	cardNumElem.setAttribute('pattern', '^(\\d+)');
	cardNumElem.setAttribute('required', 'required');
	inputDiv.appendChild(cardNumElem);

	var expireLabel = document.createElement('label');
	expireLabel.setAttribute('for', 'card_exp_in_1');
	expireLabel.innerHTML = "Expiration:";
	inputDiv.appendChild(expireLabel);

	var cardExpire1 = document.createElement('input');
	cardExpire1.setAttribute('id', 'card_exp_in_1');
	cardExpire1.setAttribute('name', 'card_exp_in_1');
	cardExpire1.setAttribute('maxlength', 2);
	cardExpire1.setAttribute('pattern', '^((1[0-2])|(0[1-9]))');
	cardExpire1.setAttribute('size', 2);
	cardExpire1.setAttribute('required', 'required');
	inputDiv.appendChild(cardExpire1);

	var expireLabel2 = document.createElement('label');
	expireLabel2.setAttribute('for', 'card_exp_in_2');
	expireLabel2.innerHTML = "/";
	inputDiv.appendChild(expireLabel2);

	var cardExpire2 = document.createElement('input');
	cardExpire2.setAttribute('id', 'card_exp_in_2');
	cardExpire2.setAttribute('name', 'card_exp_in_2');
	cardExpire2.setAttribute('maxlength', 2);
	cardExpire2.setAttribute('pattern', '^(([1-3][0-9])|(0[1-9]))');
	cardExpire2.setAttribute('size', 2);
	cardExpire2.setAttribute('required', 'required');
	inputDiv.appendChild(cardExpire2);

	var securityLabel = document.createElement('label');
	securityLabel.setAttribute('for', 'card_sec_in');
	securityLabel.innerHTML = "3-digig security number:";
	inputDiv.appendChild(securityLabel);

	var securityInput = document.createElement('input');
	securityInput.setAttribute('id', 'card_sec_in');
	securityInput.setAttribute('name', 'card_sec_in');
	securityInput.setAttribute('maxlength', 3);
	securityInput.setAttribute('pattern', '^([0-9]{3})');
	securityInput.setAttribute('size', 3);
	securityInput.setAttribute('required', 'required');
	inputDiv.appendChild(securityInput);

	return inputDiv;
}

function getWireTransferElem() {
	var inputDiv = document.createElement('div');
	inputDiv.innerHTML = "Transfer the amount $957.00, to account 0009286322.";
	return inputDiv;
}

function cleanInputArea() {
	var inputAreaElem = document.getElementById('input_area');
	while (inputAreaElem.hasChildNodes()) {
		inputAreaElem.removeChild(inputAreaElem.lastChild);
	}
}
