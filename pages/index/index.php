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
    <link rel="stylesheet" href="/hw1/pages/index/index.css">
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
    
    <div class="home">
        <div class="background-scales"></div>
        <div class="background-texture"></div>
        <section class="top-section">
            <div class="home-card-group container"></div>

            <div class="home-button-group container">
                <div class="home-button">
                    <a href="">
                        Create a Character
                        <img class="home-button-icon" src="/hw1/images/mask.png" alt="">
                    </a>
                </div>
                <div class="home-button">
                    <a href="">
                        Browse the Marketplace
                        <img class="home-button-icon" src="/hw1/images/bowl.png" alt="">
                    </a>
                </div>
                <div class="home-button">
                    <a href="">
                        Subscription benefits
                        <img class="home-button-icon" src="/hw1/images/dice.png" alt="">
                    </a>
                </div>
                <div class="home-button">
                    <a href="">
                        Discover
                        <img class="home-button-icon" src="/hw1/images/map.png" alt="">
                    </a>
                </div>
            </div>

            <div class="home-body container">
                <div class="home-body-article">
                    <a class="article-title" href=""> Article Title</a>
                    <div class="home-body-article-extras">
                        <span class="article-publish-date"> 3 days ago</span>
                        by
                        <span class="article-author"> Utente </span>
                    </div>
                    <div class="article-description">
                    </div>
                    <a class="article-more"> read more</a>
                </div>
                <div class="home-body-image"></div>
            </div>
        </section>
        <section class="content-card-section">
            <div class="content-card-container container"></div>
            <div class="see-all-container container">
                <button class="contained-button contained-button-red see-more">See More</button>
            </div>

            <div class="home-button-group container">
                <div class="home-button">
                    <a href="">
                        Create a Character
                        <img class="home-button-icon" src="/hw1/images/mask.png" alt="">
                    </a>
                </div>
                <div class="home-button">
                    <a href="">
                        Browse the Marketplace
                        <img class="home-button-icon" src="/hw1/images/bowl.png" alt="">
                    </a>
                </div>
                <div class="home-button">
                    <a href="">
                        Subscription benefits
                        <img class="home-button-icon" src="/hw1/images/dice.png" alt="">
                    </a>
                </div>
                <div class="home-button">
                    <a href="">
                        Discover
                        <img class="home-button-icon" src="/hw1/images/map.png" alt="">
                    </a>
                </div>
            </div>
        </section>
        
    </div>

    
    <?php include(__DIR__ . '/../footer.php'); ?>
    
</body>
</html>