<?php
//This Script only check Email Address and add it to email-list.txt

$email = trim($_POST['email']);

// Email address validation - works with php 5.2+
function is_email_valid($email) {
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}  

if ( isset($email) && is_email_valid($email) ) {
	file_put_contents("email-list.txt", "$email\r\n", FILE_APPEND);
}



?>