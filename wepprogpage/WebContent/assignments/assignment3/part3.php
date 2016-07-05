<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Dustin Kempton</title>
</head>
<body>
<?php
$restaurants = array (
		"Chama Gaucha" => 40.50,
		"Aviva by Kameel" => 15.00,
		"Bone's Restaurant" => 65.00,
		"Umi Sushi Buckhead" => 40.50,
		"Fandangles" => 30.00,
		"Capital Grille" => 60.50,
		"Canoe" => 35.50,
		"One Flew South" => 21.00,
		"Fox Bros. BBQ" => 15.00,
		"South City Kitchen Midtown" => 29.00 
);
function printRowByPrice($inArr) {
	arsort ( $inArr );
	setlocale ( LC_MONETARY, 'en_US.UTF-8' );
	foreach ( $inArr as $key => $value ) {
		echo "<tr><td> $key </td><td> " . money_format ( '%.2n', $value ) . "</td></tr>";
	}
}
;
function printRowByName($inArr) {
	ksort ( $inArr );
	setlocale ( LC_MONETARY, 'en_US.UTF-8' );
	foreach ( $inArr as $key => $value ) {
		echo "<tr><td> $key </td><td> " . money_format ( '%.2n', $value ) . "</td></tr>";
	}
}
;
?>


<table>
		<caption>10 Best Restaurants</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Average Cost</th>
			</tr>
		</thead>
		<tbody>
<?php
setlocale ( LC_MONETARY, 'en_US.UTF-8' );
foreach ( $restaurants as $key => $value ) {
	echo "<tr><td> $key </td><td> " . money_format ( '%.2n', $value ) . "</td></tr>";
}
?>
</tbody>
	</table>
	<br />


	<table>
		<caption>10 Best Restaurants By Price</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Average Cost</th>
			</tr>
		</thead>
		<tbody>
<?php
printRowByPrice ( $restaurants );
?>
</tbody>
	</table>
	<br />



	<table>
		<caption>10 Best Restaurants By Name</caption>
		<thead>
			<tr>
				<th>Name</th>
				<th>Average Cost</th>
			</tr>
		</thead>
		<tbody>
<?php
printRowByName ( $restaurants );
?>
</tbody>
	</table>
	<br />
</body>
</html>