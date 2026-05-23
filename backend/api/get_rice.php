<?php

header("Content-Type: application/json");

// try including db.php from current or parent directory
if (file_exists(__DIR__ . '/db.php')) {
    include __DIR__ . '/db.php';
} elseif (file_exists(__DIR__ . '/../db.php')) {
    include __DIR__ . '/../db.php';
}

// If $conn is still not set, attempt a fallback connection
if (!isset($conn) || !($conn instanceof mysqli)) {
    $conn = mysqli_connect('localhost', 'root', '', 'pastilhub');
    if (!$conn) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}

$sql = "SELECT * FROM rice_options";

$result = mysqli_query($conn, $sql);
if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => mysqli_error($conn)]);
    exit;
}

$data = [];
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

?>