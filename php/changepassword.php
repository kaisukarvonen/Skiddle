<?php
header('Access-Control-Allow-Origin: *');

$servername="localhost";
$dbusername="x";
$dbpassword="x"; 

$password= sha1($_POST['password1']);
$username = $_POST['username1'];

try {
   $connection = new PDO("mysql:host=$servername;dbname=x", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
   
   $stmt= $connection->prepare('UPDATE webuser SET password= :password WHERE username= :username');
   $stmt->bindParam(':password', $password); 
   $stmt->bindParam(':username', $username);
   $stmt->execute();
   
   echo "passwordChanged";
   
} catch (PDOException $e) {
   echo "passwordChangeError" . $e->getMessage();
}