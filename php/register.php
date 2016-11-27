<?php
header('Access-Control-Allow-Origin: *');

$servername="localhost";
$dbusername="x";
$dbpassword="x"; 

$username=$_POST['username1']; // Fetching Values from URL.
$email=$_POST['email1'];
$password= sha1($_POST['password1']);

try {
   $connection = new PDO("mysql:host=$servername;dbname=x", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
   $stmt= $connection->prepare('SELECT id FROM webuser WHERE username= :username');
   $stmt->bindParam(':username', $username);
   $stmt->execute();
   $count=$stmt->rowCount();
   
   if (($count) == 0) {
      $insert = $connection->prepare('INSERT into webuser(username, email, password) values (:username, :email, :password)');
      $insert->bindParam(':username', $username);
      $insert->bindParam(':email', $email);
      $insert->bindParam(':password', $password);
      $insert->execute();
      echo "registerSuccessfull";
   } else {
      echo "usernameTaken";
   }
} catch (PDOException $e) {
   echo "connectionError" . $e->getMessage();
}
?>