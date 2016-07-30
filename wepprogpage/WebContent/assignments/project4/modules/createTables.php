<?php
echo "<html><body><p>";
// Connect to the database
$mysqli = new mysqli ( 'localhost', 'dkempton1', 'dkempton1', 'dkempton1' );

if ($mysqli->connect_errno) {
	echo "Could not connect to the database.";
	echo "Error number $mysqli->connect_errn occured.";
}

$dropOrderItemsTableStatement = "DROP TABLE IF EXISTS `order_items`;";
// Drop Order Items table
if (! $result = $mysqli->query ( $dropOrderItemsTableStatement )) {
	echo "Failed execute Query: Drop Order Items Table.";
	echo "Error: $mysqli->error";
	return;
}

$dropOrderTableStatement = "DROP TABLE IF EXISTS `order`;";
// Drop Order table
if (! $result = $mysqli->query ( $dropOrderTableStatement )) {
	echo "Failed execute Query: Drop Order Table.";
	echo "Error: $mysqli->error";
	return;
}

$dropShoppingCartTableStatement = "DROP TABLE IF EXISTS `shoppingcart`;";
// Drop Shopping Cart table
if (! $result = $mysqli->query ( $dropShoppingCartTableStatement )) {
	echo "Failed execute Query: Drop Shopping Cart Table.";
	echo "Error: $mysqli->error";
	return;
}

$dropUsersTableStatement = "DROP TABLE IF EXISTS `users`;";
// Drop users table
if (! $result = $mysqli->query ( $dropUsersTableStatement )) {
	echo "Failed execute Query: Drop Users Table.";
	echo "Error: $mysqli->error";
	return;
}

$createUsersTableStatement = "CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `passwd` char(32) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ;";
// Create users table
if (! $result = $mysqli->query ( $createUsersTableStatement )) {
	echo "Failed execute Query: Create Users Table";
	echo "Error: $mysqli->error";
	return;
}

$dropInventoryTableStatment = "DROP TABLE IF EXISTS `inventory_items`;";
// Drop inventory table
if (! $result = $mysqli->query ( $dropInventoryTableStatment )) {
	echo "Failed execute Query: Drop Inventory Table.";
	echo "Error: $mysqli->error";
	return;
}

$createInventoryTableStatement = "CREATE TABLE `inventory_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(45) NOT NULL,
  `description` mediumtext NOT NULL,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
);";
// Create inventory table
if (! $result = $mysqli->query ( $createInventoryTableStatement )) {
	echo "Failed execute Query: Create Inventory Table";
	echo "Error: $mysqli->error";
	return;
}

$createShoppingCartStatement = "CREATE TABLE `shoppingcart` (
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  KEY `shopping_user_idx` (`user_id`),
  KEY `shopping_item_fk_idx` (`item_id`),
  CONSTRAINT `shopping_item_fk` FOREIGN KEY (`item_id`) REFERENCES `inventory_items` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `shopping_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION ) ;";

// Create shoppingcart table
if (! $result = $mysqli->query ( $createShoppingCartStatement )) {
	echo "Failed execute Query: Create Shopping Cart Table";
	echo "Error: $mysqli->error";
	return;
}

$createOrderStatement = "CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_order_idx` (`user_id`),
  CONSTRAINT `order_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION );";

// Create Order table
if (! $result = $mysqli->query ( $createOrderStatement )) {
	echo "Failed execute Query: Create Order Table";
	echo "Error: $mysqli->error";
	return;
}

$createOrderItemsStatement = "CREATE TABLE `order_items` (
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `num_ordered` int(11) NOT NULL,
  KEY `order_items_id_fk_idx` (`order_id`),
  KEY `order_items_id_fk_idx1` (`item_id`),
  CONSTRAINT `order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `order_items_id_fk` FOREIGN KEY (`item_id`) REFERENCES `inventory_items` (`id`) ON UPDATE NO ACTION );";

// Create Order table
if (! $result = $mysqli->query ( $createOrderItemsStatement )) {
	echo "Failed execute Query: Create Order Items Table";
	echo "Error: $mysqli->error";
	return;
}

for($i = 0; $i < 10; $i ++) {
	$name = "Name Number " . ($i * 13 + 1);
	$desc = "Item Descritpion " . ($i * 13 + 1) . ".\n  A bunch of other text to fill up the table. \n That way we see it resize when we toggle the description on and off.";
	$price = 9.95 * ($i * 3) - ($i + 5) + 9.95;
	$descEscaped = mysqli_real_escape_string ( $mysqli, $desc );
	$insertItemStatement = "INSERT INTO inventory_items (itemName, description, price) VALUES ('$name', '$descEscaped','$price');";
	if (! $result = $mysqli->query ( $insertItemStatement )) {
		echo "Failed execute Query: Create Order Items Table";
		echo "Error: $mysqli->error";
		return;
	}
}

echo "</p></body></html>";
?>