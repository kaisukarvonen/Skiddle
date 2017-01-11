<?php
require_once('.../.../.../.../vendor/autoload.php');

$servername="localhost";
$dbusername="x";
$dbpassword="x"; 
$dbname="x";

$username=$_POST['username1'];
$password= sha1($_POST['password1']);

try {
   $connection = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
   $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   $stmt= $connection->prepare('SELECT id FROM webuser WHERE username= :username AND password= :password');
   $stmt->bindParam(':username', $username);
   $stmt->bindParam(':password', $password); 
   $stmt->execute();
   $count=$stmt->rowCount();
   
   if (($count) == 1) {
     $validCredentials = true;
   } else {
     echo "noMatchError";
   }
   
} catch (PDOException $e) {
   echo "connectionError" . $e->getMessage();
}

$config = Factory::fromFile('config.php', true);


if ($validCredentials) {
	
	$tokenId    = base64_encode(mcrypt_create_iv(32));
    $issuedAt   = time();
    $notBefore  = $issuedAt + 10;             //Adding 10 seconds
    $expire     = $notBefore + 60;            // Adding 60 seconds
    $serverName = $config->get('serverName');
	
	$data = [
        'iat'  => $issuedAt,         // Issued at: time when the token was generated
        'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,       // Issuer
        'nbf'  => $notBefore,        // Not before
        'exp'  => $expire,           // Expire
        'data' => [                  // Data related to the signer user
            'userId'   => $rs['id'], // userid from the users table
            'userName' => $username, // User name
        ]
    ];
	
}



?>