<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once __DIR__ . "/../db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "error" => "No input data"
    ]);
    exit;
}

/* SAFE EXTRACTION */
$orderNumber = $data["orderNumber"] ?? null;
$customer = $data["customer"] ?? null;
$mode = $data["mode"] ?? null;
$topping = $data["topping"] ?? null;
$rice = $data["rice"] ?? null;
$cupSize = $data["cup"] ?? null;
$total = $data["total"] ?? 0;
$status = $data["status"] ?? "pending";
$timestamp = $data["time"] ?? date("Y-m-d H:i:s");

if (!$customer || !$topping || !$rice) {
    echo json_encode([
        "success" => false,
        "error" => "Missing required fields"
    ]);
    exit;
}

$sql = "INSERT INTO orders
(orderNumber, customer, mode, topping, rice, cupSize, total, status, timestamp)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
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

$success = $stmt->execute();

if ($success) {

    $newId = mysqli_insert_id($conn);

    echo json_encode([
        "success" => true,
        "id" => $newId
    ]);

} else {

    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>