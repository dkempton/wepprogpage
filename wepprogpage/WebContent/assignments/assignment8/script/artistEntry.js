function submitMe() {

	$.ajax({
		url : "backend.php",
		type : 'POST',
		data : {
			'typePost' : 'artist',
			'name' : $('#artist_name').val()
		},
		success : function(data) {
			if (data.status == 'success')
				processSuccess(data);
		}
	});

}

function processSuccess(data) {
	alert(data.message);
}