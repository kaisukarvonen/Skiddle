<?php
header('Access-Control-Allow-Origin: *');


$servername="localhost";
$dbusername="x";
$dbpassword="x"; 

$username=$_POST['username1'];
$password= sha1($_POST['password1']);

try {
   $connection = new PDO("mysql:host=$servername;dbname=x", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $stmt= $connection->prepare('SELECT id FROM webuser WHERE username= :username AND password= :password');
   $stmt->bindParam(':username', $username);
   $stmt->bindParam(':password', $password); 
   $stmt->execute();
   $count=$stmt->rowCount();
   
   if (($count) == 1) {
     echo "loginSuccessfull";
   } else {
     echo "noMatchError";
   }
   
} catch (PDOException $e) {
   echo "connectionError" . $e->getMessage();
}
   






?>