<?php
session_start ();

define ( "MYSQL_CONN_ERROR", "Unable to connect to database." );

// Ensure reporting is setup correctly mysqli_report ( MYSQLI_REPORT_STRICT );
$response_array = array ();
$host = "localhost";
$user = "dkempton1";
$passwd = "dkempton1";
$database = "dkempton1"; // Connection to the database

if (isset ( $_SESSION ['timeout'] ) && isset ( $_SESSION ['who_id'] ) && $_SESSION ['timeout'] + 60 * 10 > time ()) {
	$_SESSION ['timeout'] = time ();
	try {
		$mysqli = new mysqli ( $host, $user, $passwd, $database );
		if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
			$response_array = handlePost ( $mysqli );
		} else if ($_SERVER ['REQUEST_METHOD'] === 'GET') {
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
} else {
	if ($_SERVER ['REQUEST_METHOD'] === 'GET') {
		try {
			$mysqli = new mysqli ( $host, $user, $passwd, $database );
			$response_array = handleGet ( $mysqli );
			$mysqli->close ();
		} catch ( Exception $e ) {
			$response_array ['status'] = 'error';
			$response_array ['message'] = $e->errorMessage ();
		}
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = "No Login";
	}
}
function handlePost($mysqli) {
}
function handleGet($mysqli) {
	$response_array = array ();
	if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'items') {
		$joinStatement = "SELECT id, itemName, description, price FROM inventory_items;";
		$itemArray = array ();
		if ($result = $mysqli->query ( $joinStatement )) {
			while ( $row = mysqli_fetch_row ( $result ) ) {
				$itemArray [$row [0]] = array ();
				$itemArray [$row [0]] ['name'] = $row [1];
				$itemArray [$row [0]] ['description'] = $row [2];
				$itemArray [$row [0]] ['price'] = $row [3];
			}
		}
		
		$response_array ['status'] = 'success';
		$response_array ['items'] = $itemArray;
		return $response_array;
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Get Request.';
		return $response_array;
	}
}
header ( 'Content-type: application/json' );
echo json_encode ( $response_array );
?>