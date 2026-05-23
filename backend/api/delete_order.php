<?php

header("Content-Type: application/json");

include __DIR__ . "/../db.php";

if (!isset($conn)) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection not initialized"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? 0;

$sql = "DELETE FROM orders WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "i", $id);

$success = mysqli_stmt_execute($stmt);

echo json_encode([
    "success" => $success
]);