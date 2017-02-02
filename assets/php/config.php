<?php
return array(
    'jwt' => array(
        'key'       => base64_encode(openssl_random_pseudo_bytes(64)),     // Key for signing the JWT's, I suggest generate it with base64_encode(openssl_random_pseudo_bytes(64))
        'algorithm' => 'HS512' // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        ),
    'database' => array(
        'username'     => 'scocta5_prosper', // Database username
        'password' => 'g3st1m44r8', // Database password
        'servername'     => 'localhost', // Database host
        'dbname'     => 'scocta5_database1', // Database schema name
    ),
    'servername' => 'scoctail.com',
);

?>
