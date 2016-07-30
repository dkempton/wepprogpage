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
							window.location = 'login.html?from=shoppingcart';
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