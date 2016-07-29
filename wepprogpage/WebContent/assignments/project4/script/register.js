$(function() {

	var dialog = $("#confirm-div").load('templates/logindialog.html').dialog({
		height : 250,
		width : 250,
		autoOpen : false,
		buttons : [ {
			text : "Submit",
			click : adduser,
			type : "submit"
		}, {
			text : "Cancel",
			click : function() {
				$(this).dialog("close");
			}
		} ]
	});

	$("#create-user").button().on("click", function() {
		checkUser();
	});

	function adduser() {
		var pass = $("#user_pass").val();
		var pass2 = $("#user_pass_conf").val();

		dialog.dialog("close");
		if (pass.localeCompare(pass2) == 0) {
			$.ajax({
				url : "user.php",
				type : 'POST',
				data : {
					'typePost' : 'newuser',
					'username' : $('#user_name').val(),
					'userpass' : pass
				},
				success : function(data) {
					if (data.status == 'success') {
						if (data.message == 'ok') {
							alert('User ' + $('#user_name').val() + ' Added.');
							$('#user_name').val('');
							$('#user_pass').val('');
							$('#user_pass_conf').val('');

							$('#user_name').val('').focus();
							window.location = 'login.html';
						} else {
							alert('Fialed to insert with message: '
									+ data.message);
						}
					} else if (data.status == 'error') {
						alert('Fialed to add user with message: '
								+ data.message);
					} else {
						alert(data);
					}
				},
				error : function(data) {
					alert(data.responseText);
				}
			});

		} else {
			alert("Your Password Does Not Match!");
			$('#user_pass_conf').val('');
		}
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
						alert("User already exists, try another user.");
					} else if (data.message == 'Wrong Password') {
						$('#user_name').val('');
						$('#user_pass').val('');
						alert("User already exists, try another user.");
					} else if (data.message.localeCompare('Not In DB') == 0) {
						dialog.dialog("open");
					}
				} else if (data.status == 'error') {
					alert('Fialed to add user with message: ' + data.message);
				} else {
					alert(data);
				}
			},
			error : function(data) {
				alert(data.responseText);
			}
		});
	}
});
