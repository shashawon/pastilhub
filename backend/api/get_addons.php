<?php

header("Content-Type: application/json");

require_once __DIR__ . "/../db.php";

// ensure $conn is available
if (!isset($conn) || $conn === null) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection not available"]);
    exit;
}

$sql = "SELECT * FROM add_ons";

$result = mysqli_query($conn, $sql);

$data = [];

while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

?>