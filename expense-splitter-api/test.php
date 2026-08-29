<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';

$response = [
    "status" => "error",
    "message" => "Hello from PHP"
];

echo json_encode($response);
?>