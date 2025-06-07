<?php
require_once (__DIR__ . '/../dbconfig.php');
require_once (__DIR__ . '/auth.php');
header('Content-Type: application/json');

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection error']);
    exit();
}

if(!$user_id = checkAuth()){
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 8;

if ($user_id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid user_id']);
    exit();
}

$query = "SELECT articles.*, users.id AS utente, users.name as author_name, users.surname as author_surname
          FROM articles JOIN users ON articles.author = users.id
          WHERE articles.author = $user_id
          ORDER BY articles.publishDate DESC
          LIMIT $limit OFFSET $offset";
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));


    $articles = [];
    while ($row = mysqli_fetch_assoc($result)) {
    $articles[] = [
        'id' => $row['id'],
        'title' => $row['title'],
        'publishDate' => $row['publishDate'],
        'author' => $row['author_name'] . ' ' .$row['author_surname'],
        'description' => $row['description'],
        'imgSrc' => $row['imgSrc'],
        'likes_count' => $row['likes_count'] ?? 0
    ];
}

echo json_encode(['articles' => $articles]);

$conn->close();
?>