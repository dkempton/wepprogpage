<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Dustin Kempton</title>
</head>
<body>
<?php
function isBitten() {
	$val = rand () % 2;
	if ($val == 0) {
		return false;
	} else {
		return true;
	}
}
?>


<h1>
Charlie<?php

if (isBitten ())
	echo " ate ";
else
	echo " did not eat ";
?>my lunch!
</h1>

</body>
</html>