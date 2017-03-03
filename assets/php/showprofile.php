<?php

require_once('/home/scocta5/bin/composer/vendor/autoload.php');

use Zend\Config\Config;
use Zend\Config\Factory;
use Firebase\JWT\JWT;

	//echo '<pre>'; print_r(apache_request_headers()); echo '</pre>';
	
	$jwt=$_POST['authToken'];
	
	$config = Factory::fromFile('config.php', true);
	
	if (isset($jwt)) {
		try {
				$secretKey = base64_decode($config->get('jwt')->get('key'));
				$algorithm = $config->get('jwt')->get('algorithm');
				
				//decoding doesn't work??
                $decoded = JWT::decode($jwt, $secretKey, $algorithm);
				echo json_encode($decoded);
				
		} catch (Exception $e) {
            header('HTTP/1.0 401 Unauthorized - Token invalid');
				
        }
	} else {
		header('HTTP/1.0 400 Bad Request - Token not found');
	}
	
	
	/*
	$request = new Request();
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