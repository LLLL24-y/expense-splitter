<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$group_name = $data['group_name'];
$user_id = $data['user_id'];

$stmt = $conn->prepare("INSERT INTO groups (name, created_by) VALUES (?, ?)");
$stmt->bind_param("si", $group_name, $user_id);

if ($stmt->execute()) {
    $new_group_id = $conn->insert_id;

    $stmt2 = $conn->prepare("INSERT INTO group_members (group_id, user_id) VALUES (?, ?)");
    $stmt2->bind_param("ii", $new_group_id, $user_id);
    $stmt2->execute();

    echo json_encode(["status" => "success", "message" => "Group created", "group_id" => $new_group_id]);
} else {
    echo json_encode(["status" => "error", "message" => "Group creation failed"]);
}
?>