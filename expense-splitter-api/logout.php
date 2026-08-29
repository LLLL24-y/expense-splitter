<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';
session_start();
session_unset();
session_destroy();
echo json_encode(["status"=> "success", "message"=> "Logged out"]);
?>