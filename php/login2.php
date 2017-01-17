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

try {
   $connection = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $stmt= $connection->prepare('SELECT id FROM webuser WHERE username= :username AND password= :password');
   $stmt->bindParam(':username', $username);
   $stmt->bindParam(':password', $password); 
   $stmt->execute();
   //$count=$stmt->rowCount();
   $result = $stmt->fetch();
   
   if ($result) {
	   
	   
		$tokenId    = base64_encode(mcrypt_create_iv(32));
		$issuedAt   = time();
		$notBefore  = $issuedAt + 10;             //Adding 10 seconds
		$expire     = $notBefore + 60;            // Adding 60 seconds
		$serverName = $config->get('serverName');
		
		$data = [
			'iat'  => $issuedAt,         // Issued at: time when the token was generated
			'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
			'iss'  => $servername,       // Issuer
			'nbf'  => $notBefore,        // Not before
			'exp'  => $expire,           // Expire
			'data' => [                  // Data related to the signer user
				'userId'   => $result['id'], // userid from the users table
				'userName' => $username, // User name
			]
		];
		
		$secretKey = base64_decode($config->get('jwt')->get('key'));
		$algorithm = $config->get('jwt')->get('algorithm');
		
		$jwt = JWT::encode($data, $secretKey, $algorithm);
		
		$unencodedArray = ['jwt' => $jwt];
		echo json_encode($unencodedArray);
   } else {
	   header('HTTP/1.0 401 Unauthorized');
   }
	
} catch (Exception $e) {
		header('HTTP/1.0 500 Internal Server Error');
}

?>