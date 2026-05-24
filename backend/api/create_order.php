<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include __DIR__ . "/../db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "error" => "No JSON data received"
    ]);
    exit;
}

$orderNumber = $data["orderNumber"] ?? "";
$customer = $data["customer"] ?? "";
$mode = $data["mode"] ?? "";
$topping = $data["topping"] ?? "";
$rice = $data["rice"] ?? "";
$cupSize = $data["cup"] ?? "";
$total = $data["total"] ?? 0;
$status = $data["status"] ?? "pending";
$timestamp = date("Y-m-d H:i:s");

$sql = "INSERT INTO orders
(orderNumber, customer, mode, topping, rice, cupSize, total, status, timestamp)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param(
    $stmt,
    "ssssssdss",
    $orderNumber,
    $customer,
    $mode,
    $topping,
    $rice,
    $cupSize,
    $total,
    $status,
    $timestamp
);

$success = mysqli_stmt_execute($stmt);

if ($success) {

    $newId = mysqli_insert_id($conn);

    echo json_encode([
        "success" => true,
        "id" => $newId
    ]);

} else {

    echo json_encode([
        "success" => false,
        "error" => mysqli_stmt_error($stmt)
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>