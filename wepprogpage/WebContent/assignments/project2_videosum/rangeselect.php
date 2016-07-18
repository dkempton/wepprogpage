<?php
function getDays() {
	for($i = 1; $i < 32; $i ++) {
		echo "<option value=$i>$i</option>";
	}
}
function getMonths() {
	echo '<option value="01">January</option>';
	echo '<option value="02">February</option>';
	echo '<option value="03">March</option>';
	echo '<option value="04">April</option>';
	echo '<option value="05">May</option>';
	echo '<option value="06">June</option>';
	echo '<option value="07">July</option>';
	echo '<option value="08">August</option>';
	echo '<option value="09">September</option>';
	echo '<option value="10">October</option>';
	echo '<option value="11">November</option>';
	echo '<option value="12">December</option>';
}
function getYears() {
	for($i = 2012; $i < 2015; $i ++) {
		echo "<option value=$i>$i</option>";
	}
}

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/selection.css" />
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
<link rel="icon" href="images/favicon.ico" />
</head>

<body>
	<div class="content">
		<object id="headdiv" type="text/html" data="templates/head_page.htm">
		</object>

		<form action="display.php" method="post">

			<h1 id="content_title">Range Selection.</h1>
			<div id="entry_area">
				<p>Select the date range and the wavelength you wish to summarize.
					Then select the number of clustering iterations to run on that
					range, and the number of clusters to protentially produce at each.</p>
				<br />
				<div class="_select">
					<label class="_label" for="start_year_in">Start Date:</label><select
						id="start_year_in" name="start_year_in" tabindex="1" autofocus>
						<option value="null">Select Year</option>
						<?php getYears();?>
					</select> <select id="start_month_in" name="start_month_in"
						tabindex="2">
						<option value="null">Select Month</option>
						<?php getMonths();?>
					</select> <select id="start_day_in" name="start_day_in"
						tabindex="3">
						<option value="null">Select Day</option>
						<?php getDays();?>
					</select>
				</div>

				<div class="_select">
					<label class="_label" for="end_year_in">End Date:</label><select
						id="end_year_in" name="end_year_in" tabindex="4">
						<option value="null">Select Year</option>
						<?php getYears();?>
					</select> <select id="end_month_in" name="end_month_in"
						tabindex="5">
						<option value="null">Select Month</option>
						<?php getMonths();?>
					</select> <select id="end_day_in" name="end_day_in" tabindex="6">
						<option value="null">Select Day</option>
						<?php getDays();?>
					</select>
				</div>

				<div class="_select">
					<label class="_label" for="waveselect">Wavelength:</label><select
						id="waveleselect" name="wavelength" tabindex="7">
						<option value="null">Select Wavelength</option>
						<option value="94">94</option>
						<option value="131">131</option>
						<option value="171">171</option>
						<option value="193">193</option>
						<option value="211">211</option>
						<option value="304">304</option>
						<option value="335">335</option>
						<option value="1600">1600</option>
						<option value="1700">1700</option>
					</select>
				</div>

				<div class="_select">
					<label class="_label" for="depthselect">Clustering Iterations:</label>
					<select id="depthselect" name="depth" tabindex="8">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</div>

				<div class="_select">
					<label class="_label" for="clusterselect">Clusters per Iteration:</label>
					<select id="clusterselect" name="clusters" tabindex="9">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
					</select>
				</div>

			</div>


			<input type="submit" class="submit" tabindex="10" value="Submit" />
		</form>


		<div class="foot_div">
			<hr />
			<object id="footdiv" type="text/html"
				data="templates/footer_page.html"></object>
		</div>
	</div>

</body>
</html>