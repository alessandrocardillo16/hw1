<?php
header('Content-Type: application/json');
require_once(__DIR__ . '/../dbconfig.php');
require_once(__DIR__ . '/auth.php');

if (checkAuth() == 0) {
    echo json_encode(['success' => false, 'authenticated' => false, 'error' => 'Utente non autenticato']);
    exit;
}

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
if (!$conn) {
    echo json_encode(['success' => false, 'error' => 'Connessione al database fallita']);
    exit;
}
$userId = $_SESSION['_user_id'];
$articleId = isset($_POST['article_id']) ? intval($_POST['article_id']) : 0;

if ($articleId <= 0) {
    echo json_encode(['success' => false, 'error' => 'ID articolo non valido']);
    exit;
}

$checkSql = "SELECT id FROM likes WHERE userId = $userId AND articleId = $articleId";
$checkResult = mysqli_query($conn, $checkSql);

if ($checkResult === false) {
    echo json_encode(['success' => false, 'error' => 'Errore SQL: ' . mysqli_error($conn)]);
    exit;
}

if (mysqli_num_rows($checkResult) > 0) {
    $deleteSql = "DELETE FROM likes WHERE userId = $userId AND articleId = $articleId";
    mysqli_query($conn, $deleteSql);

    $countSql = "SELECT likes_count FROM articles WHERE id = $articleId";
    $countResult = mysqli_query($conn, $countSql);
    $row = mysqli_fetch_assoc($countResult);
    $likes_count = $row ? $row['likes_count'] : 0;

    echo json_encode(['success' => true, 'liked' => false, 'authenticated' => true, 'likes_count' => $likes_count]);
    exit;
}

$insertSql = "INSERT INTO likes (userId, articleId) VALUES ($userId, $articleId)";
if (mysqli_query($conn, $insertSql)) {
    $countSql = "SELECT likes_count FROM articles WHERE id = $articleId";
    $countResult = mysqli_query($conn, $countSql);
    $row = mysqli_fetch_assoc($countResult);
    $likes_count = $row ? $row['likes_count'] : 0;

    echo json_encode(['success' => true, 'liked' => true, 'authenticated' => true, 'likes_count' => $likes_count]);
} else {
    echo json_encode(['success' => false, 'liked' => false, 'authenticated' => true, 'error' => 'Errore durante l\'inserimento del like']);
}

mysqli_close($conn);
?>