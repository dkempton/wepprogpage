<?php
if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
	$user_name = $_POST ['user_name'];
	if (strcmp ( $user_name, "dustin" ) == 0) {
		header ( 'Location: rangeselect.php' );
	}
} else {
	if ($_GET ['confirm'] == 'Cancel') {
		header ( 'Location: index.html' );
	} else {
		header ( 'Location: rangeselect.php' );
	}
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
<link rel="icon" href="images/favicon.ico" />
</head>

<body>
	<div class="content">
		<object id="headdiv" type="text/html" data="templates/head_page.htm">
		</object>

		<form action="<?php $_SERVER['PHP_SELF'] ?>" method="GET">
			<div>

				<h1 id="content_title">Confirm User.</h1>
				<div id="entry_area">
					<p>
						<strong> </strong>
					</p>
					<p>
						<strong>User name <?php echo $user_name?> is a new user.</strong>
						<br> <br> <strong>Are you sure you wish to use this name?</strong>

					</p>

					<p>
						<input type="submit" name="confirm" class="submit" tabindex="2"
							value="Submit" /> <input type="submit" name="confirm"
							class="submit" tabindex="1" value="Cancel" autofocus />
					</p>

				</div>

			</div>
		</form>


		<div class="foot_div">
			<hr />
			<object id="footdiv" type="text/html"
				data="templates/footer_page.html"></object>
		</div>
	</div>

</body>
</html>