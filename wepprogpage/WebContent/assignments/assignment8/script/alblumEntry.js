function submitMe() {

	$.ajax({
		url : "backend.php",
		type : 'POST',
		data : {
			'typePost' : 'alblum',
			'artistName' : $('#artist_name').val(),
			'alblumName' : $('#alblum_name').val()
		},
		success : function(data) {
			if (data.status == 'success') {
				processSuccess(data);
			} else if (data.status == 'error') {
				alert('Fialed to insert with message: ' + data.message);
			} else {
				alert(data);
			}
		},
		error : function(data) {
			alert(data.responseText);
		}
	});

}

function processSuccess(data) {
	if (data.message == 'ok') {

		alert('Insertion Success of alblum: ' + $('#alblum_name').val()
				+ '\n Of Artist: ' + $('#artist_name').val());
		$('#artist_name').val('');
		$('#alblum_name').val('');

		$('#artist_name').focus();
	} else {
		alert('Fialed to insert with message: ' + data.message);
	}

}