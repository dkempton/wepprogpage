<?php
session_start ();
define ( "MYSQL_CONN_ERROR", "Unable to connect to database." );

// Ensure reporting is setup correctly mysqli_report ( MYSQLI_REPORT_STRICT );
$response_array = array ();
$host = "localhost";
$user = "dkempton1";
$passwd = "dkempton1";
$database = "dkempton1"; // Connection to the database
try {
	$mysqli = new mysqli ( $host, $user, $passwd, $database );
	if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
		$response_array = handlePost ( $mysqli );
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
	if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'usercheck') {
		$userName = $_POST ['username'];
		$userPass = $_POST ['userpass'];
		$selectUserStatement = "SELECT * FROM users WHERE username='$userName';";
		$result = $mysqli->query ( $selectUserStatement );
		if ($result->num_rows == 0) {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "Not In DB";
			return $response_array;
		} else {
			$row = $result->fetch_object ();
			$passFromDb = $row->passwd;
			$passEncoded = md5 ( $userPass );
			if ($passFromDb === $passEncoded) {
				$response_array ['status'] = 'success';
				$response_array ['message'] = "ok";
				$_SESSION ['who_id'] = $row->id;
				$_SESSION ['timeout'] = time ();
				return $response_array;
			} else {
				$response_array ['status'] = 'success';
				$response_array ['message'] = "Wrong Password";
				return $response_array;
			}
		}
	} else if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'newuser') {
		$userName = $_POST ['username'];
		$userPass = $_POST ['userpass'];
		$passEncoded = md5 ( $userPass );
		
		$insertUserStatement = "INSERT INTO users (username, passwd) VALUES ('$userName', '$passEncoded');";
		if (! $result = $mysqli->query ( $insertUserStatement )) {
			$response_array ['status'] = 'error';
			$response_array ['message'] = "Error: $mysqli->error";
			return $response_array;
		} else {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "ok";
			return $response_array;
		}
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Post Request.';
		return $response_array;
	}
}

header ( 'Content-type: application/json' );
echo json_encode ( $response_array );
?>
