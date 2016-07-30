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
	$response_array ['status'] = 'error';
	$response_array ['message'] = "No Login";
}
function handlePost($mysqli) {
	$response_array = array ();
	if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'additem') {
		$userId = $_SESSION ['who_id'];
		$itemId = $_POST ['itmeId'];
		$selectItemStatement = "SELECT * FROM shoppingcart WHERE user_id = '$userId' AND item_id = '$itemId';";
		$result = $mysqli->query ( $selectItemStatement );
		if ($result->num_rows == 0) {
			$insertCartItemStatement = "INSERT INTO shoppingcart (user_id, item_id, number) VALUES ('$userId', '$itemId','1');";
			if ($result2 = $mysqli->query ( $insertCartItemStatement )) {
				$response_array ['status'] = 'success';
			} else {
				$response_array ['status'] = 'error';
				$response_array ['message'] = "Failed to Insert Item into cart.";
			}
			return $response_array;
		} else {
			$row = $result->fetch_object ();
			$count = $row->number + 1;
			$updateCartItemStatement = "UPDATE shoppingcart SET number='$count' WHERE user_id='$userId' AND item_id='$itemId';";
			if ($result2 = $mysqli->query ( $updateCartItemStatement )) {
				$response_array ['status'] = 'success';
			} else {
				$response_array ['status'] = 'error';
				$response_array ['message'] = "Failed to update Item in cart.";
			}
			return $response_array;
		}
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Post Request.';
		return $response_array;
	}
}
function handleGet($mysqli) {
	$response_array = array ();
	if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'items') {
		$who_id = $_SESSION ['who_id'];
		$joinStatement = "SELECT item_id, itemName, description, price, number FROM shoppingcart join inventory_items on inventory_items.id = item_id WHERE user_id = '$who_id';";
		$itemArray = array ();
		if ($result = $mysqli->query ( $joinStatement )) {
			while ( $row = mysqli_fetch_row ( $result ) ) {
				$itemArray [$row [0]] = array ();
				$itemArray [$row [0]] ['name'] = $row [1];
				$itemArray [$row [0]] ['description'] = $row [2];
				$itemArray [$row [0]] ['price'] = $row [3];
				$itemArray [$row [0]] ['number'] = $row [4];
			}
		}
		
		$response_array ['status'] = 'success';
		$response_array ['items'] = $itemArray;
		return $response_array;
	} else if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'count') {
		$who_id = $_SESSION ['who_id'];
		$selectItemsStatement = "SELECT item_id FROM shoppingcart WHERE user_id = '$who_id';";
		$count = 0;
		if ($result = $mysqli->query ( $selectItemsStatement )) {
			$count = $result->num_rows;
		}
		
		$response_array ['status'] = 'success';
		$response_array ['count'] = $count;
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