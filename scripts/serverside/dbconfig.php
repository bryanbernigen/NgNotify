<?php
define('DB_SERVER', 'sql6.freesqldatabase.com');
define('DB_USERNAME', 'sql6527403');
define('DB_PASSWORD', 'P1cUs5qbaK');
define('DB_DATABASE', 'sql6527403');
try {
    $db = new PDO('mysql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE, DB_USERNAME, DB_PASSWORD);
} catch (Exception $th) {
    echo "Connection failed: " . $e->getMessage();
    die();
}
