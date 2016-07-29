<?php
echo "<html><body><p>";
// Connect to the database
$mysqli = new mysqli ( 'localhost', 'dkempton1', 'dkempton1', 'dkempton1' );

if ($mysqli->connect_errno) {
	
	echo "Could not connect to the database.";
	echo "Error number $mysqli->connect_errn occured.";
}

$dropUsersTableStatement = "DROP TABLE IF EXISTS `users`;";

$createUsersTableStatement = "CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `passwd` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ;";

// Drop users table
if (! $result = $mysqli->query ( $dropUsersTableStatement )) {
	echo "Failed execute Query: Drop Users Table.";
	echo "Error: $mysqli->error";
	return;
}
// Create users table
if (! $result = $mysqli->query ( $createUsersTableStatement )) {
	echo "Failed execute Query: Create Users Table";
	echo "Error: $mysqli->error";
	return;
}

$dropInventoryTableStatment = "DROP TABLE IF EXISTS `inventory_items`;";

$createInventoryTableStatement = "CREATE TABLE `inventory_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(45) NOT NULL,
  `description` mediumtext NOT NULL,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
);";

// Drop users table
if (! $result = $mysqli->query ( $dropInventoryTableStatment )) {
	echo "Failed execute Query: Drop Inventory Table.";
	echo "Error: $mysqli->error";
	return;
}
// Create users table
if (! $result = $mysqli->query ( $createInventoryTableStatement )) {
	echo "Failed execute Query: Create Inventory Table";
	echo "Error: $mysqli->error";
	return;
}

echo "</p></body></html>";
?>