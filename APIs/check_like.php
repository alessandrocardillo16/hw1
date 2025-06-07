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
    echo json_encode(['success' => true, 'liked' => true, 'authenticated' => true]);
} else {
    echo json_encode(['success' => true, 'liked' => false, 'authenticated' => true]);
}


mysqli_close($conn);
?>