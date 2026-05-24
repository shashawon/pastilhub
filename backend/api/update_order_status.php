<?php

header("Content-Type: application/json");

include __DIR__ . "/../db.php";
if (!isset($conn) && isset($connection)) {
    $conn = $connection;
}

if (!isset($conn)) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection not established"
    ]);
    exit;
}
$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? 0;
$status = $data["status"] ?? "pending";

$sql = "UPDATE orders SET status = ? WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "si", $status, $id);

$success = mysqli_stmt_execute($stmt);

echo json_encode([
    "success" => $success
]);