<!DOCTYPE html>
<html lang="en">
<head>
    
    <?php 
    require_once(__DIR__ . '/../../APIs/auth.php') ?>

    <title>D&D Beyond</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="D&D Beyond is a digital toolset and game companion for Dungeons & Dragons tabletop roleplaying game.">
    <link rel="icon" href="/hw1/icons/favicon.png" type="image/png">

    <link rel="stylesheet" href="/hw1/pages/header-footer.css">
    <link rel="stylesheet" href="/hw1/pages/article/article.css">
    <link rel="stylesheet" href="/hw1/pages/general.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet">
    
    <script src="/hw1/pages/header.js" defer></script>
    <script src="/hw1/pages/index/data.js" defer></script>
    <script src="/hw1/pages/index/index.js" defer></script>
    <script src="/hw1/APIs/openLibrary.js" defer></script>
    <script src="/hw1/APIs/ipGeolocation.js" defer></script>
</head>
<body>
    <?php include(__DIR__ . '/../header.php'); ?> 

    <div class="background-texture"></div>

    <article>
        <?php 
        require_once(__DIR__ . '/../../dbconfig.php');

        function formatPublishDate($publishDateString) {
            $now = new DateTime();
            $date = new DateTime($publishDateString);
        
            $diff = $now->getTimestamp() - $date->getTimestamp();
            $diffMinutes = floor($diff / 60);
            $diffHours = floor($diff / 3600);
            $diffDays = floor($diff / 86400);
        
            if (
                $now->format('Y') === $date->format('Y') &&
                $now->format('m') === $date->format('m') &&
                $now->format('d') === $date->format('d') &&
                $now->format('H') === $date->format('H')
            ) {
                return $diffMinutes === 1 ? "1 minuto fa" : "$diffMinutes minuti fa";
            }
        
            if (
                $now->format('Y') === $date->format('Y') &&
                $now->format('m') === $date->format('m') &&
                $now->format('d') === $date->format('d')
            ) {
                return $diffHours === 1 ? "1 ora fa" : "$diffHours ore fa";
            }
        
            if ($diffDays < 7) {
                return $diffDays === 1 ? "1 giorno fa" : "$diffDays giorni fa";
            }
        
            return $date->format('d/m/Y');
        }

        $article_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $content = "";

        if ($article_id > 0) {
            $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        if (!$conn) {
            http_response_code(500);
            echo json_encode(['error' => 'Errore di connessione al database']);
            exit;
        }
            if ($conn->connect_error) {
                $content = "<p>Errore di connessione al database.</p>";
            } else {
                $result = mysqli_query($conn, 
                "SELECT a.title, a.content, a.publishDate, u.name AS author_name, u.surname AS author_surname, u.profile_picture AS author_picture
                 FROM articles AS a
                 LEFT JOIN users AS u ON a.author = u.id
                 WHERE a.id = $article_id");
                if ($result && mysqli_num_rows($result) > 0) {
                    $row = mysqli_fetch_assoc($result);
                    $content = $row['content'];
                    $title = $row['title'];
                    $author_name = $row['author_name'];
                    $author_surname = $row['author_surname'];
                    $publish_date = date('d M Y', strtotime($row['publishDate']));
                    $author_picture = $row['author_picture'] ? $row['author_picture'] : '/hw1/images/default-avatar.jpg';
                } else {
                    $content = "<p>Articolo non trovato.</p>";
                }
                mysqli_close($conn);
            }
        } else {
            $content = "<p>Nessun articolo selezionato.</p>";
        }
        ?>
        <div class="container">
            <h1><?php echo $title?></h1>
        </div>
        <div class="content-container container">
            <div class="publisher-info">
                <img class="publisher-img" src="<?php echo $author_picture?>" alt="">
                <div>
                    <span class="publisher-username"> by <?php echo $author_name . ' ' . $author_surname?></span>
                    <span class="publish-date"><?php echo formatPublishDate($publish_date)?></span>
                </div>
            </div>
            
        <div class="content">
            <?php
                echo $content;
            ?>
        </div>

    </article>

    <?php include(__DIR__ . '/../footer.php'); ?>
</body>
</html>