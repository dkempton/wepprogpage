function submitMe() {

	$.ajax({
		url : "backend.php",
		type : 'POST',
		data : {
			'typePost' : 'artist',
			'name' : $('#artist_name').val()
		},
		success : function(data) {
			if (data.status == 'success') {
				processSuccess(data);
			} else if (data.status == 'error') {
				alert('Fialed to insert with message: ' + data.message);
			} else {
				alert(data);
			}
		}
	});

}

function processSuccess(data) {
	if (data.message == 'ok') {
		alert('Insertion Success of Artist: ' + $('#artist_name').val());
		$('#artist_name').val('');
		$('#artist_name').focus();
	} else {
		alert('Fialed to insert with message: ' + data.message);
	}

}