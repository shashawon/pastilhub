<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . "/../db.php";

$sql = "SELECT * FROM orders ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn)
    ]);
    exit;
}

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

echo json_encode($orders);

mysqli_close($conn);

?>