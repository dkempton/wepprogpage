<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="css/calendar.css" />
<title>Forms Assignment 4.2</title>
</head>
<body>
<?php
if (! ini_get ( 'date.timezone' )) {
	date_default_timezone_set ( 'America/New_York' );
}
$hours_to_show = 12;
function get_hour_string($datetime) {
	return date_format ( $datetime, 'g A' );
}

?>

	<div class="content">
		<table id="event_table">
			<caption>Calendar</caption>
			<thead>
				<tr>
					<th>Time</th>
					<th>Slacker</th>
					<th>Workaholic</th>
					<th>Normal Person</th>
				</tr>
			</thead>
			<tbody>
		
		<?php
		$date = new DateTime ();
		for($i = 0; $i < $hours_to_show; $i ++) {
			echo "<tr><th>" . get_hour_string ( $date ) . "</th><td>Free</td><td>In Meeting</td><td>";
			if ($date->format ( 'H' ) > 18 || $date->format ( 'H' ) < 7) {
				echo "At home";
			} else {
				echo "Working";
			}
			echo "</td></tr>";
			$date->add ( new DateInterval ( "PT1H" ) );
		}
		?>
		</tbody>
		</table>
	</div>
</body>
</html>