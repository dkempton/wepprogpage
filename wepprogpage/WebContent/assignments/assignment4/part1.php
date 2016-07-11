<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<title>Forms Assignment 4.1</title>
</head>
<style>
#textinput {
	margin-left: 20px;
	<?php
	$colVal = $_POST ["fontcolor"];
switch ($colVal) {
	case "Black" :
		print 'color:black;' . "\n";
		break;
	case "Blue" :
		print 'color:blue;' . "\n";
		break;
	case "Red" :
		print 'color:red;' . "\n";
		break;
}

$fontVal = $_POST ["fontname"];
switch ($fontVal) {
	case "Times" :
		print 'font-family:Times New Roman;' . "\n";
		break;
	case "Comic" :
		print 'font-family:Comic Sans MS;' . "\n";
		break;
	case "Courier" :
		print 'font-family:Courier New;' . "\n";
		break;
}

$fontSize = $_POST ["fontsize"];
switch ($fontSize) {
	case "10pt" :
		print 'font-size:10pt;' . "\n";
		break;
	case "15pt" :
		print 'font-size:15pt;' . "\n";
		break;
	case "20pt" :
		print 'font-size:20pt;' . "\n";
		break;
	case "25pt" :
		print 'font-size:25pt;' . "\n";
		break;
}
?>
}
</style>

<body>
	<div class="content">
		<p id="textinput">
			<?php
			print $_POST ["remarks"];
			?>
		</p>
	</div>
</body>
</html>