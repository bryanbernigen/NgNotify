<?php
session_start();
require_once 'dbconfig.php';
$email = $_POST['emailid'];
$password = $_POST['password'];
$q = $db->query("SELECT * FROM sql6527403.user WHERE username = '$email' AND password = '$password'");
if ($q->rowCount() > 0) {
  $data = array('success' => true, 'username' => $email);
  echo json_encode($data);
} else {
  echo "Wrong username or password";
}
