<?php
if (! ini_get ( 'date.timezone' )) {
	date_default_timezone_set ( 'America/New_York' );
}

if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
	$start_year_in = $_POST ['start_year_in'];
	$start_month_in = $_POST ['start_month_in'];
	$start_day_in = $_POST ['start_day_in'];
	$end_year_in = $_POST ['end_year_in'];
	$end_month_in = $_POST ['end_month_in'];
	$end_day_in = $_POST ['end_day_in'];
	$wavelength = $_POST ['wavelength'];
	$depth = $_POST ['depth'];
	$clusters = $_POST ['clusters'];
	$startDateTime = new DateTime ( "$start_year_in-$start_month_in-$start_day_in" . 'T00:00:00' );
	$endDateTime = new DateTime ( "$end_year_in-$end_month_in-$end_day_in" . 'T23:59:00' );
	$interval = date_diff ( $startDateTime, $endDateTime );
	$intervalSeconds = dateIntervalToSeconds ( $interval );
	$intervalSeconds = $intervalSeconds / intval ( $clusters );
	
	$dispStep = 650 / (intval ( $clusters ) + 1);
	$dispStart = $dispStep - 128;
}
function dateIntervalToSeconds($dateInterval) {
	$reference = new DateTime ( 'now' );
	$endTime = new DateTime ( 'now' );
	$endTime->add ( $dateInterval );
	$value = $endTime->getTimestamp () - $reference->getTimestamp ();
	
	return $value;
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/display.css" />
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
<link rel="icon" href="images/favicon.ico" />
<title>Display</title>
</head>

<body>
	<div class="content">
		<object id="headdiv" type="text/html" data="templates/head_page.htm">
		</object>


		<div>
			<table id="displaytable">
				<tr class="imgrow">
					<td>
						<?php
						
						for($i = 0; $i < intval ( $clusters ); $i ++) {
							$pos = $dispStart + ($i * $dispStep);
							$startDateTime->modify ( '+' . intval ( $intervalSeconds ) . ' second' );
							$startString = $startDateTime->format ( 'Y-m-d' ) . 'T' . $startDateTime->format ( 'H:i:s' );
							echo '<div class="disp" style="left:' . $pos . 'px;">';
							echo '<input type="image" class="dispImg" ';
							echo 'src="http://vidapp.dmlab.cs.gsu.edu/crowdSourceLabeling/image.asp/' . $wavelength . '/time/' . $startString . '" ';
							echo 'alt="' . $startString . '" />';
							echo "</div>";
						}
						?>
					</td>
				</tr>

			</table>
		</div>


		<hr />
		<object id="footdiv" type="text/html"
			data="templates/footer_page.html"></object>
	</div>

</body>
</html>