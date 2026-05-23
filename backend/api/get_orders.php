<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . "/../db.php";

$sql = "SELECT * FROM orders ORDER BY id DESC";

$result = mysqli_query($conn, $sql);

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = [
        "id" => (int)$row["id"],
        "orderNumber" => $row["orderNumber"],
        "customer" => $row["customer"],
        "mode" => $row["mode"],
        "topping" => $row["topping"],
        "rice" => $row["rice"],
        "cup" => $row["cupSize"],
        "total" => $row["total"],
        "status" => $row["status"],
        "time" => $row["timestamp"]
    ];
}

echo json_encode($orders);

mysqli_close($conn);
?>