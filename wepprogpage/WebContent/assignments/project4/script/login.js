function submitMe() {
	checkUser();
}

function checkUser() {
	var username = $('#user_name').val();
	var userpass = $('#user_pass').val();
	$.ajax({
		url : "user.php",
		type : 'POST',
		data : {
			'typePost' : 'usercheck',
			'username' : username,
			'userpass' : userpass
		},
		success : function(data) {
			if (data.status == 'success') {
				if (data.message == 'ok') {
					$('#user_name').val('');
					$('#user_pass').val('');
					window.location = 'displayAlblums.html';
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
