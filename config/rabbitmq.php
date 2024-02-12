<?php

return [
    'host'     => env('RABBITMQ_HOST', 'rabbitmq'),
    'port'     => env('RABBITMQ_PORT', 5672),
    'user'     => env('RABBITMQ_DEFAULT_USER', 'user'),
    'password' => env('RABBITMQ_DEFAULT_PASS', 'password'),
];
