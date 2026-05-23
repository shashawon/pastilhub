<?php

header("Content-Type: application/json");

// Attempt to include the database connection. Try local then parent directory.
require_once __DIR__ . "/../db.php";
if (!isset($conn)) {
    if (file_exists(__DIR__ . '/../db.php')) {
        require_once __DIR__ . '/../db.php';
    }
}

if (!isset($conn)) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection not found"]);
    exit;
}

$sql = "SELECT * FROM toppings";

$result = mysqli_query($conn, $sql);
if ($result === false) {
    http_response_code(500);
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$data = [];

while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

?>