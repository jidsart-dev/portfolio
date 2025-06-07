<?php
$host = 'localhost';       // Or your host
$user = 'root';            // DB username
$password = '';            // DB password
$dbname = 'your_db_name';  // Replace with your DB name

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>
