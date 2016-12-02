<?php
header('Access-Control-Allow-Origin: *');

$servername="x";
$dbusername="x";
$dbpassword="x"; 

$donewords= $_POST['donewords'];
$skippedwords = $_POST['skippedwords'];
$username = $_POST['username1'];

try {
   $connection = new PDO("mysql:host=$servername;dbname=x", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
   
   $stmt= $connection->prepare('UPDATE webuser SET done_words= done_words + :donewords, skipped_words= skipped_words + :skippedwords  WHERE username= :username');
   $stmt->bindParam(':donewords', $donewords); 
   $stmt->bindParam(':skippedwords', $skippedwords); 
   $stmt->bindParam(':username', $username);
   $stmt->execute();
   
   echo "round words added to database";
   
} catch (PDOException $e) {
   echo "error adding round words to database" . $e->getMessage();
}
