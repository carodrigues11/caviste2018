<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \RedBeanPHP\R as R;


// Routes
/*
$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
*/

$app->get('/api/', function (Request $request, Response $response, array $args) {
    echo "API!";
});

$app->get('/api/wines', function (Request $request, Response $response, array $args) {
    $wines = R::findAll('wine');
    return json_encode($wines,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
});

$app->get('/api/wines/search/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    
    $wines = R::find('wine','name Like ?',["%$name%"]);
    //var_dump($wines);
    return json_encode($wines,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
});

$app->get('/api/wines/{id}', function (Request $request, Response $response, array $args) {
    $wine = R::load('wine', $id);
    echo $wine;
});

$app->post('/api/wines', function (Request $request, Response $response, array $args) {
    $newWine = R::dispense('wine');
    echo $newWine;
});

$app->put('/api/wines/$id', function (Request $request, Response $response, array $args) {
    echo "Modifie les données du vin id ==10";
});

$app->delete('/api/wines/7', function (Request $request, Response $response, array $args) {
    $wine = R::trash('wine', 7);
    echo $wine;
});

$app->get('/catalogue/', function (Request $request, Response $response, array $args) {
    echo "catalogue!";
});