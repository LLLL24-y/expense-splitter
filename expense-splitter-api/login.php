<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password=$data['password'];
$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
if (password_verify($password, $user['password'])) {
    echo json_encode(["status" => "success", "message" => "Login successful"]);
    $_SESSION['user_id'] = $user['id'];
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}
?>