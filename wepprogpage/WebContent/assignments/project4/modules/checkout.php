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
	if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'checkout') {
		$userId = $_SESSION ['who_id'];
		$selectItemStatement = "SELECT * FROM shoppingcart WHERE user_id = '$userId';";
		$result = $mysqli->query ( $selectItemStatement );
		if ($result->num_rows > 0) {
			$rows = array ();
			while ( $row = $result->fetch_assoc () ) {
				array_push ( $rows, $row );
			}
			$nowDate = date('Y-m-d H:i:s');
			$insertOrderStatement = "INSERT INTO order_table ( user_id, order_date ) VALUES ('$userId', '$nowDate');";
			if ($result2 = $mysqli->query ( $insertOrderStatement )) {
				$orderId = $mysqli->insert_id;
				for($i = 0; $i < count ( $rows ); $i ++) {
					$row = $rows [$i];
					$itemId = $row ['item_id'];
					$itemCount = $row ['number'];
					$insertOrderItemStatement = "INSERT INTO order_items (order_id, item_id, num_ordered) VALUES ('$orderId','$itemId','$itemCount');";
					if (! $result3 = $mysqli->query ( $insertOrderItemStatement )) {
						$response_array ['status'] = 'error';
						$response_array ['message'] = "Error: $mysqli->error";;
						return $response_array;
					}
				}
				
				for($i = 0; $i < count ( $rows ); $i ++) {
					$row = $rows [$i];
					$itemId = $row ['item_id'];
					$updateCartItemStatement = "DELETE FROM shoppingcart WHERE user_id='$userId' AND item_id='$itemId';";
					if (! $result3 = $mysqli->query ( $updateCartItemStatement )) {
						$response_array ['status'] = 'error';
						$response_array ['message'] = "Error: $mysqli->error";;
						return $response_array;
					}
				}
				$response_array ['status'] = 'success';
				$response_array ['orderId'] = $orderId;
				return $response_array;
			} else {
				$response_array ['status'] = 'error';
				$response_array ['message'] = "Error: $mysqli->error";
				return $response_array;
			}
		} else {
			$response_array ['status'] = 'error';
			$response_array ['message'] = 'No Items';
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
	if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'order') {
		$orderId = $_GET['orderId'];
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
	}else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Get Request.';
		return $response_array;
	}
}

header ( 'Content-type: application/json' );
echo json_encode ( $response_array );
?>