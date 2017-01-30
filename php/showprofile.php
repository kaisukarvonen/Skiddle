<?php

require_once('/home/scocta5/bin/composer/vendor/autoload.php');

use Zend\Config\Config;
use Zend\Config\Factory;
use Zend\Http\PhpEnvironment\Request;
use Firebase\JWT\JWT;

	//echo '<pre>'; print_r(apache_request_headers()); echo '</pre>';
	
	//$jwt = $_POST['jwt'];
	$jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0ODU3ODE5MTksImp0aSI6IjlaM2ZNZEt5RnZwVWtRb0ZGR1VUclBBbTVuelp2V3ZVUWhRcllIekZyS2c9IiwiaXNzIjoibG9jYWxob3N0IiwibmJmIjoxNDg1NzgxOTI5LCJleHAiOjE0ODU3ODIzMjksImRhdGEiOnsidXNlcklkIjoiNiIsInVzZXJOYW1lIjoia2F5dHRhamEifX0.pmm277ca1iHKZUN4JMSDqtnTZUyDFDyxv71INaqpckl2gdwMtrB5aWxXXnroD5Z7M1zFALAEhulpF4GaIL7SVA';
	
	if (isset($jwt) && !empty($jwt)) {
		try {
				$config = Factory::fromFile('config.php', true);
				$secretKey = base64_decode($config->get('jwt')->get('key'));
				$algorithm = $config->get('jwt')->get('algorithm');
                $token = JWT::decode($jwt, $secretKey, $algorithm);
				
		} catch (Exception $e) {
                header('HTTP/1.0 401 Unauthorized - Token invalid');
				echo 'Token invalid: ',$jwt;
				
        }
	} else {
		header('HTTP/1.0 400 Bad Request - Token not found');
        echo 'Token not found in request - token: ',$jwt;
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