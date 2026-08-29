<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require 'db.php';

$group_id = $_GET['group_id'];
$stmt = $conn->prepare("SELECT paid_by, SUM(amount) as total_paid FROM expenses WHERE group_id = ? GROUP BY paid_by");
$stmt->bind_param("i", $group_id);
$stmt->execute();
$result = $stmt->get_result();
$paid = $result->fetch_all(MYSQLI_ASSOC);

$stmt2 = $conn->prepare("SELECT expense_splits.user_id, SUM(expense_splits.share_amount) as total_owed
    FROM expense_splits
    JOIN expenses ON expense_splits.expense_id = expenses.id
    WHERE expenses.group_id = ?
    GROUP BY expense_splits.user_id");
$stmt2->bind_param("i", $group_id);
$stmt2->execute();
$result2 = $stmt2->get_result();
$owed = $result2->fetch_all(MYSQLI_ASSOC);

$balances = [];

foreach ($paid as $p) {
    $balances[$p['paid_by']]['paid'] = $p['total_paid'];
}

foreach ($owed as $o) {
    $balances[$o['user_id']]['owed'] = $o['total_owed'];
}

$final = [];
foreach ($balances as $user_id => $b) {
    $paid_amt = isset($b['paid']) ? $b['paid'] : 0;
    $owed_amt = isset($b['owed']) ? $b['owed'] : 0;
    $final[] = [
        "user_id" => $user_id,
        "balance" => $paid_amt - $owed_amt
    ];
}

echo json_encode(["balances" => $final]);
?>