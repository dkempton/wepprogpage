var params;
function submitMe() {
	params = getUrlVars();
	checkUser();
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function checkUser() {
	var username = $('#user_name').val();
	var userpass = $('#user_pass').val();
	$.ajax({
		url : "modules/user.php",
		type : 'POST',
		data : {
			'typePost' : 'userlogin',
			'username' : username,
			'userpass' : userpass
		},
		success : function(data) {
			if (data.status == 'success') {
				if (data.message == 'ok') {
					$('#user_name').val('');
					$('#user_pass').val('');
					if (params.length > 0 && 'from' in params) {
						if (params['from'] == 'inventory') {
							window.location = 'inventory.html?itemAdd='
									+ params['item'];
						} else if (params['from'] == 'shoppingcart') {
							window.location = 'shoppingcart.html';
						} else if (params['from'] == 'checkout') {
							window.location = 'checkout.html';
						} else if (params['from'] == 'profile') {
							window.location = 'profile.html';
						} else {
							window.location = 'menu.html';
						}
					} else {
						window.location = 'menu.html';
					}
				} else {
					$('#user_name').val('');
					$('#user_pass').val('');
					alert("Your username password combination was incorrect.");
				}
			} else if (data.status == 'error') {
				$('#user_name').val('');
				$('#user_pass').val('');
				alert('Fialed to add user with message: ' + data.message);
			} else {
				$('#user_name').val('');
				$('#user_pass').val('');
				alert(data);
			}
		},
		error : function(data) {
			$('#user_name').val('');
			$('#user_pass').val('');
			alert(data.responseText);
		}
	});
}
