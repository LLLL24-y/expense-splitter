<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';
if (isset($_SESSION['user_id'])) {
    echo json_encode(["logged_in" => true, "user_id" => $_SESSION['user_id']]);
} else {
    echo json_encode(["logged_in" => false]);
}
?>