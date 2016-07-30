$(function() {

	var dialog = $("#confirm-div").load('templates/logindialog.html').dialog({
		height : 350,
		width : 275,
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
		var email = $("#user_email").val();
		var email2 = $("#user_email_conf").val();

		dialog.dialog("close");
		if (pass.localeCompare(pass2) == 0) {
			if (email.localeCompare(email2) == 0) {

				$.ajax({
					url : "modules/user.php",
					type : 'POST',
					data : {
						'typePost' : 'newuser',
						'username' : $('#user_name').val(),
						'userpass' : pass,
						'useremail' : email
					},
					success : function(data) {
						if (data.status == 'success') {
							if (data.message == 'ok') {
								alert('User ' + $('#user_name').val()
										+ ' Added.');
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
				alert("Your Email Does Not Match!");
				$('#user_pass_conf').val('');
				$("#user_email_conf").val();
			}
		} else {
			alert("Your Password Does Not Match!");
			$('#user_pass_conf').val('');
			$("#user_email_conf").val();
		}
	}

	function checkUser() {
		var username = $('#user_name').val();
		var userpass = $('#user_pass').val();

		$.ajax({
			url : "modules/user.php",
			type : 'POST',
			data : {
				'typePost' : 'usercheck',
				'username' : username
			},
			success : function(data) {
				if (data.status == 'success') {
					if (data.message.localeCompare('In DB') == 0) {
						alert("User already exists, try another user.");
						$('#user_name').val('');
						$('#user_pass').val('');
						$('#user_email').val('');
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
