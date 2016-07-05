<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Dustin Kempton</title>
</head>
<body>




<?php
$month = array (
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December' 
);
?>

<h1>Part 1.</h1>
	<ol>
<?php
for($i = 0; $i < count ( $month ); $i ++) {
	echo "<li>" . $month [$i] . "</li>";
}
?>
</ol>
	<br />
	<h1>Part 2.</h1>
	<ol>
<?php
sort ( $month );
for($i = 0; $i < count ( $month ); $i ++) {
	echo "<li>" . $month [$i] . "</li>";
}
?>
</ol>
	<br />
	
<?php
$month2 = array (
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December' 
);
?>
<h1>Part 3.1.</h1>
	<ol>
<?php
foreach ( $month2 as $value ) {
	echo "<li>" . $value . "</li>";
}
?>
</ol>
	<br />
	<h1>Part 3.2.</h1>
	<ol>
<?php
sort ( $month2 );
foreach ( $month2 as $value ) {
	echo "<li>" . $value . "</li>";
}
?>
</ol>
	<br />

</body>
</html>