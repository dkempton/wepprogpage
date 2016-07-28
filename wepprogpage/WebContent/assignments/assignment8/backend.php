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
		$response_array ['status'] = 'success';
		$response_array ['message'] = handlePost ();
	} elseif ($_SERVER ['REQUEST_METHOD'] === 'GET') {
		
		$response_array ['status'] = 'success';
		$response_array ['alblums'] = handleGet ();
	} else {
		$response_array ['status'] = 'error';
	}
} catch ( mysqli_sql_exception $e ) {
	$response_array ['status'] = 'error';
	$response_array ['message'] = $e->errorMessage ();
}
function handlePost() {
	if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'artist') {
		return 'artist';
	} else {
		return 'not-artist';
	}
}
function handleGet() {
	$artistArray = array ();
	$artistArray ['David Guetta'] = array (
			'Nothing but the Best' 
	);
	$artistArray ['Usher'] = array (
			'More' 
	);
	return $artistArray;
}

header ( 'Content-type: application/json' );
echo json_encode ( $response_array );
?>