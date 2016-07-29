<?php
define ( "MYSQL_CONN_ERROR", "Unable to connect to database." );

// Ensure reporting is setup correctly
mysqli_report ( MYSQLI_REPORT_STRICT );

$response_array = array ();
$host = "localhost";
$user = "dkempton1";
$passwd = "dkempton1";
$database = "dkempton1";

// Connection to the database
try {
	$mysqli = new mysqli ( $host, $user, $passwd, $database );
	
	if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
		$response_array = handlePost ( $mysqli );
	} elseif ($_SERVER ['REQUEST_METHOD'] === 'GET') {
		$response_array = handleGet ( $mysqli );
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Request.';
	}
	$mysqli->close ();
} catch ( Exception $e ) {
	$response_array ['status'] = 'error';
	$response_array ['message'] = $e->errorMessage ();
}
function handlePost($mysqli) {
	$response_array = array ();
	if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'artist') {
		$artistName = $_POST ['name'];
		$insertArtistStatement = "INSERT INTO artists (artist_name) value ('$artistName');";
		if (! $result = $mysqli->query ( $insertArtistStatement )) {
			$response_array ['status'] = 'error';
			$response_array ['message'] = "Error: $mysqli->error";
			return $response_array;
		}
		$response_array ['status'] = 'success';
		$response_array ['message'] = 'ok';
		return $response_array;
	} else if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'alblum') {
		
		$artistName = $_POST ['artistName'];
		$alblumName = $_POST ['alblumName'];
		$selectIdStatement = "SELECT id FROM artists where artist_name = '$artistName';";
		$result = $mysqli->query ( $selectIdStatement );
		if ($result->num_rows == 0) {
			$response_array ['status'] = 'error';
			$response_array ['message'] = "Database does not contain artist $artistName.";
			return $response_array;
		} else {
			$row = $result->fetch_object ();
			$insertAlblumStatement = "INSERT INTO alblum (artist_id, name) VALUES ('$row->id','$alblumName');";
			if (! $result = $mysqli->query ( $insertAlblumStatement )) {
				$response_array ['status'] = 'error';
				$response_array ['message'] = "Error: $mysqli->error";
				return $response_array;
			}
			$response_array ['status'] = 'success';
			$response_array ['message'] = 'ok';
			return $response_array;
		}
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Post Request.';
		return $response_array;
	}
}
function handleGet($mysqli) {
	$joinStatement = "SELECT artist_name, name FROM alblum JOIN artists ON artists.id = alblum.artist_id;";
	
	$artistArray = array ();
	if ($result = $mysqli->query ( $joinStatement )) {
		// fetch rows
		while ( $row = mysqli_fetch_row ( $result ) ) {
			if (array_key_exists ( $row [0], $artistArray )) {
				array_push ( $artistArray [$row [0]], $row [1] );
			} else {
				$artistArray [$row [0]] = array ();
				array_push ( $artistArray [$row [0]], $row [1] );
			}
		}
	}
	
	$response_array = array ();
	$response_array ['status'] = 'success';
	$response_array ['message'] = 'ok';
	$response_array ['alblums'] = $artistArray;
	return $response_array;
}

header ( 'Content-type: application/json' );
echo json_encode ( $response_array );
?>