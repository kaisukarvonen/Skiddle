<?php
require_once('/home/scocta5/bin/composer/vendor/autoload.php');

use Zend\Config\Factory;
use Zend\Http\PhpEnvironment\Request;
use Firebase\JWT\JWT;

$username=$_POST['username1'];
$password= sha1($_POST['password1']);

$config = Factory::fromFile('config.php', true);

$servername=$config->get("database")->get("servername");
$dbusername=$config->get("database")->get("username");
$dbpassword=$config->get("database")->get("password");
$dbname=$config->get("database")->get("dbname");

$explained= $_POST['explainedWords'];
$mimicked= $_POST['mimickedWords'];
$location= $_POST['locationWords'];
$skipped = $_POST['skippedWords'];
$username = $_POST['username1'];

try {
   $connection = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
   
   $stmt= $connection->prepare('UPDATE webuser SET explained_words=explained_words + :explained, mimicked_words=mimicked_words + :mimicked, location_words=location_words + :location, skipped_words= skipped_words + :skipped  WHERE username= :username');
   $stmt->bindParam(':explained', $explained); 
   $stmt->bindParam(':mimicked', $mimicked); 
   $stmt->bindParam(':location', $location); 
   $stmt->bindParam(':skipped', $skipped); 
   $stmt->bindParam(':username', $username);
   $stmt->execute();
   
   echo "User's round words added to database";
   
} catch (PDOException $e) {
   header('HTTP/1.0 500 Internal Server Error');
   echo "Error adding user's round words to database" . $e->getMessage();
}
