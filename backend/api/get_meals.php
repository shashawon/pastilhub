<?php

header("Content-Type: application/json");

require_once __DIR__ . "/../db.php";

if (!isset($conn) || !$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection not found"]);
    exit;
}

$sql = "SELECT * FROM meals";

$result = mysqli_query($conn, $sql);
if ($result === false) {
    http_response_code(500);
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$meals = [];
while($row = mysqli_fetch_assoc($result)) {
    $meals[] = $row;
}

echo json_encode($meals);

?>