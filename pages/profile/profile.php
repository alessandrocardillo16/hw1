<?php 
    require_once(__DIR__ . '/../../APIs/auth.php');
    if (!checkAuth()) {
        header('Location: /hw1/pages/login/login.php');
        exit;
    }
?>

<html>
    <?php 
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = $_SESSION["_user_id"];
        $query = "SELECT * FROM users WHERE id = $userid";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1);   
    ?>

    <head>
        <link rel="stylesheet" href="/hw1/pages/header-footer.css">
        <link rel="stylesheet" href="/hw1/pages/index/index.css">
        <link rel="stylesheet" href="/hw1/pages/general.css">
        <link rel="stylesheet" href="/hw1/pages/profile/profile.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet">
        
        <script src="/hw1/APIs/ipGeolocation.js" defer></script>
        <script src="/hw1/pages/header.js" defer></script>
        <script src='profile.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">

        <title>D&D - <?php echo $userinfo['name']." ".$userinfo['surname'] ?></title>
    </head>

    <body>
    <?php include(__DIR__ . '/../header.php'); ?>
    <div class="background-texture"></div>       
    <section>
        <div class="container">
            <h1><?php echo $userinfo['name']." ".$userinfo['surname'] ?></h1>
        </div>
        <div class = "container">
            <div class="userInfo">
                <div class="content-card-container" id="results"></div>
                <button class="contained-button contained-button-red see-more">See More</button>
            </div>
        </div>
    </section>
    <?php include(__DIR__ . '/../footer.php'); ?>
        </body>
    </html>

<?php mysqli_close($conn); ?>
