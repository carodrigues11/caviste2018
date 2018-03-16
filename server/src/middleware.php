<?php
// Application middleware
use \Tuupola\Middleware\Cors as CorsMiddleware;

// e.g: $app->add(new \Slim\Csrf\Guard);

$app->add(new CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
    "headers.allow" => ["Authorization", "If-Match", "If-Unmodified-Since"],
    "headers.expose" => ["Etag"],
    "credentials" => true,
    "cache" => 86400
]));

