<?php

// Connect to the database
$mysqli = new mysqli ( 'localhost', 'dkempton1', 'dkempton1', 'dkempton1' );

if ($mysqli->connect_errno) {
	
	echo "Could not connect to the database.";
	echo "Error number $mysqli->connect_errn occured.";
}

$dropArtistsStatement = "DROP TABLE IF EXISTS `artists`;";
$dropAlblumStatement = "DROP TABLE IF EXISTS `alblum`;";

$createArtitsStatement = "CREATE TABLE `artists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)) ;";

// Drop the tables first
if (! $result2 = $mysqli->query ( $dropAlblumStatement )) {
	echo "Failed to drop alblum table.";
	echo "Error: $mysqli->error";
	return;
}

if (! $result = $mysqli->query ( $dropArtistsStatement )) {
	echo "Failed to drop artist table.";
	echo "Error: $mysqli->error";
	
	return;
}

// Now we can try to create them.
if (! $result = $mysqli->query ( $createArtitsStatement )) {
	echo "Failed to create artist table.";
	echo "Error: $mysqli->error";
	
	return;
} else {
	$createAlblumStatement = "CREATE TABLE `alblum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artist_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alblum_artist_id_idx` (`artist_id`),
  CONSTRAINT `fk_alblum_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
	
	if (! $result2 = $mysqli->query ( $createAlblumStatement )) {
		echo "Failed to create alblum table.";
		echo "Error: $mysqli->error";
		return;
	}
	echo "Done";
}

?>

