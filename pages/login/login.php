<?php
    require_once(__DIR__ . '/../../APIs/auth.php');
    if (checkAuth()) {
        header('Location: /hw1/pages/index/index.php');
        exit;
    }

    if (!empty($_POST["email"]) && !empty($_POST["password"]) )
    {
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $query = "SELECT * FROM users WHERE email = '".$email."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])) {

                $_SESSION["_email"] = $entry['email'];
                $_SESSION["_user_id"] = $entry['id'];
                $_SESSION["_username"] = $entry['name'] .' '.$entry['surname'];
                $_SESSION["_profile_picture"] = isset($entry['profile_picture']) ? $entry['profile_picture'] : "/hw1/images/default-avatar.jpg"; 
                header("Location: /hw1/pages/index/index.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        $error = "email e/o password errati.";
    }
    else if (isset($_POST["email"]) || isset($_POST["password"])) {
        $error = "Inserisci email e password.";
    }

?>

<html>
    <head>
        <link rel="stylesheet" href="/hw1/pages/general.css">
        <link rel='stylesheet' href='/hw1/pages/login/login.css'>


        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Accedi - DND</title>
    </head>
    <body>
        <div id="logo">
            <a class="home-anchor" href="/hw1/pages/index/index.php">
                <img class="img-logo" src="/hw1/images/login-logo.png" alt="DndBeyond Logo">
            </a>
        </div>
        <main class="login">
        <section class="login-container">
            <h5>Per continuare, accedi a D&D Beyond.</h5>
            <?php
                if (isset($error)) {
                    echo "<p class='error'>$error</p>";
                }
                
            ?>
            <form name='login' method='post'>
                <div class="email">
                    <label for='email'>Email</label>
                    <input type='text' name='email' <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>>
                </div>
                <div class="password">
                    <label for='password'>Password</label>
                    <input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
                </div>
                <input class="contained-button" type='submit' value="ACCEDI">
            </form>
            <div class="signup"><h4>Non hai un account?</h4></div>
            <a class="contained-button contained-button-red" href="/hw1/pages/signup/signup.php">ISCRIVITI</a>
        </section>
        </main>
    </body>
</html>