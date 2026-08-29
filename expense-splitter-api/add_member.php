<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$group_id = $data['group_id'];
$user_id = $data['user_id'];
$stmt=$conn->prepare("INSERT INTO group_members(group_id,user_id) VALUEs(?,?)");
$stmt->bind_param("ii",$group_id,$user_id);
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Member added"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add member"]);
}
?>