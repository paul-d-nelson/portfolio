<?php

	// Only process POST reqeusts.
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		// Get the form fields and remove whitespace.
		$name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
		$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
		$message = trim($_POST["message"]);
		if(isset($_POST['g-recaptcha-response'])){
			$captcha=$_POST['g-recaptcha-response'];
		}

		if(!$captcha){
			http_response_code(400);
			echo "Please check the captcha form.";
			exit;
		}

		$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LdMNxcTAAAAAOhcTYVlbBn3LHSKr8X7O1aZtaj8&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);

		if($response.success==false)
		{
			// Set a 400 (bad request) response code and exit.
			http_response_code(400);
			echo "You seem to be a spammer.";
			exit;
		}

		// Check that data was sent to the mailer.
		if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
			// Set a 400 (bad request) response code and exit.
			http_response_code(400);
			echo "Oops! There was a problem with your submission. Please complete the form and try again.";
			exit;
		}

		// Set the recipient email address.
		// FIXME: Update this to your desired email address.
		$recipient = "pauljimmyclarence@gmail.com";

		// Set the email subject.
		$subject = "New contact from $name";

		// Build the email content.
		$email_content = "Name: $name\n";
		$email_content .= "Email: $email\n\n";
		$email_content .= "Message:\n$message\n";

		// Build the email headers.
		// ERROR: This seems to prevent the email from being recieved
		// $email_headers = "From: $name <$email>";

		// Send the email.
		if (mail($recipient, $subject, $email_content, $email_headers)) {
			// Set a 200 (okay) response code.
			http_response_code(200);
			echo "Thank You! Your message has been sent.";
		} else {
			// Set a 500 (internal server error) response code.
			http_response_code(500);
			echo "Oops! Something went wrong and we couldn't send your message.";
		}

	} else {
		// Not a POST request, set a 403 (forbidden) response code.
		http_response_code(403);
		echo "There was a problem with your submission, please try again.";
	}