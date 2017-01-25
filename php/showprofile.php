<?php

require_once('/home/scocta5/bin/composer/vendor/autoload.php');

use Zend\Config\Config;
use Zend\Config\Factory;
use Zend\Http\PhpEnvironment\Request;
use Firebase\JWT\JWT;

$request = new Request();
	
	
	$headers = apache_request_headers();
	foreach ($headers as $header => $value) {
		echo "$header: $value <br />\n"; //Authorization is empty??
	}
	
	
	/*
	$authHeader = $request->getHeader('authorization');


	if($authHeader) {
		list($jwt) = sscanf( $authHeader->toString(), 'Authorization: Bearer %s');
		
		if($jwt) {
			try {
				$config = Factory::fromFile('config.php', true);
				$secretKey = base64_decode($config->get('jwt')->get('key'));
                $token = JWT::decode($jwt, $secretKey, [$config->get('jwt')->get('algorithm')]);
				
			} catch (Exception $e) {
                header('HTTP/1.0 401 Unauthorized');
            }
        } else {
            header('HTTP/1.0 400 Bad Request');
			echo "No token was able to be extracted from the authorization header";
		}
    } else {
        header('HTTP/1.0 400 Bad Request - Token not found');
        echo 'Token not found in request'; //this
    }*/

?>