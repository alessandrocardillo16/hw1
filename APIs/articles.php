<?php
require_once (__DIR__ . '/../dbconfig.php');

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Errore di connessione al database']);
    exit;
}

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 8;

$query = "SELECT a.id, a.title, a.publishDate, u.name AS author_name, u.surname AS author_surname, a.description, a.imgSrc, a.likes_count
        FROM articles a
        JOIN users u ON a.author = u.id
        ORDER BY a.publishDate DESC
        LIMIT $limit OFFSET $offset";
$res = mysqli_query($conn, $query);

$articles = [];
while ($row = mysqli_fetch_assoc($res)) {
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

header('Content-Type: application/json');
echo json_encode(['articles' => $articles]);

mysqli_free_result($res);
mysqli_close($conn);
?>