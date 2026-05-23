<?php

header("Content-Type: application/json");

// include the database connection file (relative to this script)
require_once __DIR__ . "/../db.php";

// ensure $conn is available
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