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
function handlePost($mysqli) {
	$response_array = array ();
	if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'userlogin') {
		$userName = mysqli_real_escape_string ( $mysqli, $_POST ['username'] );
		$userPass = mysqli_real_escape_string ( $mysqli, $_POST ['userpass'] );
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
	} else if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'usercheck') {
		$userName = mysqli_real_escape_string ( $mysqli, $_POST ['username'] );
		
		$selectUserStatement = "SELECT * FROM users WHERE username='$userName';";
		$result = $mysqli->query ( $selectUserStatement );
		if ($result->num_rows == 0) {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "Not In DB";
			return $response_array;
		} else {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "In DB";
			return $response_array;
		}
	} else if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'newuser') {
		$userName = mysqli_real_escape_string ( $mysqli, $_POST ['username'] );
		$userPass = mysqli_real_escape_string ( $mysqli, $_POST ['userpass'] );
		$userEmail = mysqli_real_escape_string ( $mysqli, $_POST ['useremail'] );
		$passEncoded = md5 ( $userPass );
		
		$insertUserStatement = "INSERT INTO users (username, passwd, email) VALUES ('$userName', '$passEncoded','$userEmail');";
		if (! $result = $mysqli->query ( $insertUserStatement )) {
			$response_array ['status'] = 'error';
			$response_array ['message'] = "Error: $mysqli->error";
			return $response_array;
		} else {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "ok";
			return $response_array;
		}
	} else if (isset ( $_POST ['typePost'] ) && $_POST ['typePost'] === 'logout') {
		if (isset ( $_SESSION ['who_id'] ))
			unset ( $_SESSION ['who_id'] );
		if (isset ( $_SESSION ['timeout'] ))
			unset ( $_SESSION ['timeout'] );
		$response_array ['status'] = 'success';
		return $response_array;
	} else {
		$response_array ['status'] = 'error';
		$response_array ['message'] = 'Unrecognized Post Request.';
		return $response_array;
	}
}
function handleGet($mysqli) {
	$response_array = array ();
	if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'loggedin') {
		if (isset ( $_SESSION ['timeout'] ) && $_SESSION ['timeout'] + 60 * 10 > time ()) {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "ok";
			$_SESSION ['timeout'] = time ();
		} else {
			$response_array ['status'] = 'success';
			$response_array ['message'] = "no";
		}
		return $response_array;
	} else if (isset ( $_GET ['typeGet'] ) && $_GET ['typeGet'] === 'userinfo') {
		if (isset ( $_SESSION ['timeout'] ) && $_SESSION ['timeout'] + 60 * 10 > time ()) {
			$_SESSION ['timeout'] = time ();
			$userId = $_SESSION ['who_id'];
			$selectUserStatement = "SELECT * FROM users WHERE id='$userId';";
			if ($result = $mysqli->query ( $selectUserStatement )) {
				$row = mysqli_fetch_row ( $result );
				$response_array ['status'] = 'success';
				$response_array ['userName'] = $row [1];
				$response_array ['userEmail'] = $row [3];
			} else {
				$response_array ['status'] = 'error';
				$response_array ['message'] = 'Failed to get user info.';
			}
		} else {
			$response_array ['status'] = 'error';
			$response_array ['message'] = "No Login";
		}
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
