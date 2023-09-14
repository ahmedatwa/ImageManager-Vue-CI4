<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */


$routes->get('/', 'Home::index');

$routes->group('api', ['namespace' => 'App\Api'], static function ($routes) {
    $routes->post('filemanager/doDelete', 'FilemanagerResource::doDelete');
    $routes->post('filemanager/folder', 'FilemanagerResource::createFolder');
    $routes->post('filemanager/upload', 'FilemanagerResource::upload');
    $routes->get('filemanager', 'FilemanagerResource::index');
    $routes->get('filemanager/list', 'FilemanagerResource::list');
});
