<?php

require_once('/home/scocta5/bin/composer/vendor/autoload.php');

use Zend\Config\Config;
use Zend\Config\Factory;
use Zend\Http\PhpEnvironment\Request;
use Firebase\JWT\JWT;

$request = new Request();

if($request->isGet()) {
	$authHeader = $request->getHeader('Authorization');
	
	
	if($authHeader) {
		
	}
}