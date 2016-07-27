<?php

// Connect to the database
$mysqli = new mysqli ( 'localhost', 'dkempton1', 'dkempton1', 'dkempton1' );

if ($mysqli->connect_errno) {
	
	echo "Could not connect to the database.";
	echo "Error number $mysqli->connect_errn occured.";
}

$createArtitsStatement = "CREATE TABLE `artists` ( 
		`id` int(11) NOT NULL AUTO_INCREMENT, 
		`artist_name` varchar(45) NOT NULL, PRIMARY KEY (`id`));";

if (! $result = $mysqli->query ( $createArtitsStatement )) {
	echo "Failed to create artist table.";
	echo "Error: $mysqli->error";
} else {
	$createAlblumStatement = "CREATE TABLE `artists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`));";
	
	if (! $result2 = $mysqli->query ( $createAlblumStatement )) {
		echo "Failed to create alblum table.";
		echo "Error: $mysqli->error";
	}
}

?>

