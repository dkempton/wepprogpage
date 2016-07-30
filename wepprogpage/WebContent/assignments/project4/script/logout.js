function logout() {
	$.ajax({
		url : "modules/user.php",
		type : 'POST',
		data : {
			'typePost' : 'logout'
		},
		success : function(data) {
			if (data.status == 'success') {
				window.location = 'menu.html';
			} else if (data.status == 'error') {
				if (data.message.localeCompare('No Login') == 0) {
					window.location = 'menu.html';
				} else {
					alert("Failed to connect to user with message:"
							+ data.message);
				}
			} else {
				alert("Failed to connect to user with message:" + data);
			}
		},
		error : function(data) {
			alert(data.responseText);
		}
	});
}