<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$group_id = $data['group_id'];
$paid_by = $data['paid_by'];
$amount = $data['amount'];
$description = $data['description'];
$member_ids = $data['member_ids'];
$stmt = $conn->prepare("INSERT INTO expenses (group_id, paid_by, amount, description) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iids", $group_id, $paid_by, $amount, $description);
$stmt->execute();
$expense_id = $conn->insert_id;
$share_amount = $amount / count($member_ids);
foreach ($member_ids as $member_id) {
    $stmt2 = $conn->prepare("INSERT INTO expense_splits (expense_id, user_id, share_amount) VALUES (?, ?, ?)");
    $stmt2->bind_param("iid", $expense_id, $member_id, $share_amount);
    $stmt2->execute();
}
echo json_encode(["status" => "success", "message" => "Expense added and split"]);
?>