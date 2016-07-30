<?php
session_start ();

if (! ini_get ( 'date.timezone' )) {
	date_default_timezone_set ( 'America/New_York' );
}

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
			$response_array ['status'] = 'error';
			$response_array ['message'] = 'Unrecognized Post Request.';
			return $response_array;
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
function handleGet($mysqli) {
	$response_array = array ();
	if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'order') {
		$orderId = $_GET ['orderId'];
		$joinStatement = "SELECT item_id, itemName, description, price, num_ordered FROM order_items join inventory_items on inventory_items.id = item_id WHERE order_id = '$orderId';";
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
	} else if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'order_list') {
		$userId = $_SESSION ['who_id'];
		$joinStatement = "select order_id, num_ordered, price, item_id from ( 
				SELECT order_id, item_id, num_ordered FROM order_table 
				join order_items 
				on order_items.order_id = id 
				where user_id = '$userId') as t1 
				join inventory_items on inventory_items.id = item_id;";
		if ($result = $mysqli->query ( $joinStatement )) {
			$orderArray = array ();
			while ( $row = mysqli_fetch_row ( $result ) ) {
				if (array_key_exists ( $row [0], $orderArray )) {
					$orderArray [$row [0]] += ($row [1] * $row [2]);
				} else {
					$orderArray [$row [0]] = ($row [1] * $row [2]);
				}
			}
			
			$response_array ['status'] = 'success';
			$response_array ['orders'] = $orderArray;
			return $response_array;
		} else {
			$response_array ['status'] = 'error';
			$response_array ['message'] = "Error: $mysqli->error";
			return $response_array;
		}
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Get Request.';
		return $response_array;
	}
}

header ( 'Content-type: application/json' );
echo json_encode ( $response_array );
?>