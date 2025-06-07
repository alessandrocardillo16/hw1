<?php
    require_once(__DIR__ . '/../../APIs/auth.php');

    if (checkAuth()) {
        header("Location: /hw1/pages/index/index.php");
        exit;
    }   

    if (!empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["name"]) && 
        !empty($_POST["surname"]) && !empty($_POST["confirm_password"]) && !empty($_POST["allow"]))
    {
        $error = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        
            $email = mysqli_real_escape_string($conn, $_POST['email']);
            $query = "SELECT email FROM users WHERE email = '$email'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "email già utilizzato";
            }
        if (strlen($_POST["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        } 
        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }
        
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
       


        if (count($error) == 0) {
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $surname = mysqli_real_escape_string($conn, $_POST['surname']);
            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO users(name, surname, email, password) VALUES('$name', '$surname', '$email', '$password')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["_email"] = $_POST["email"];
                $_SESSION["_user_id"] = mysqli_insert_id($conn);
                $_SESSION["_username"] = $_POST["name"] . ' ' . $_POST["surname"];
                $_SESSION["_profile_picture"] = "/hw1/images/default-avatar.jpg"; 
                mysqli_close($conn);
                header("Location: /hw1/pages/index/index.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }

        mysqli_close($conn);
    }
    else if (isset($_POST["email"])) {
        $error = array("Riempi tutti i campi");
    }

?>


<html>
    <head>
        <link rel="stylesheet" href="/hw1/pages/general.css">
        <link rel='stylesheet' href='/hw1/pages/signup/signup.css'>
        <script src='signup.js' defer></script>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="/hw1/icons/favicon.png">
        <meta charset="utf-8">

        <title>Iscriviti - DND</title>
    </head>
    <body>
        <div id="logo">
            <a class="home-anchor" href="/hw1/pages/index/index.php">
                <img class="img-logo" src="/hw1/images/login-logo.png" alt="DndBeyond Logo">
            </a>
        </div>
        <main>
        <section class="main_left">
        </section>
        <section class="main_right">
            <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
                <div class="names">
                    <div class="name">
                        <label for='name'>Nome</label>
                        <input type='text' name='name' <?php if(isset($_POST["name"])){echo "value=".$_POST["name"];} ?> >
                        <div><img src="/hw1/icons/close.svg"/><span>Devi inserire il tuo nome</span></div>
                    </div>
                    <div class="surname">
                        <label for='surname'>Cognome</label>
                        <input type='text' name='surname' <?php if(isset($_POST["surname"])){echo "value=".$_POST["surname"];} ?> >
                        <div><img src="/hw1/icons/close.svg"/><span>Devi inserire il tuo cognome</span></div>
                    </div>
                </div>
                <div class="email">
                    <label for='email'>Email</label>
                    <input type='text' name='email' <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>>
                    <div><img src="/hw1/icons/close.svg"/><span>Indirizzo email non valido</span></div>
                </div>
                <div class="password">
                    <label for='password'>Password</label>
                    <input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
                    <div><img src="/hw1/icons/close.svg"/><span>Inserisci almeno 8 caratteri</span></div>
                </div>
                <div class="confirm_password">
                    <label for='confirm_password'>Conferma Password</label>
                    <input type='password' name='confirm_password' <?php if(isset($_POST["confirm_password"])){echo "value=".$_POST["confirm_password"];} ?>>
                    <div><img src="/hw1/icons/close.svg"/><span>Le password non coincidono</span></div>
                </div>
                <div class="allow"> 
                    <input type='checkbox' name='allow' value="1" <?php if(isset($_POST["allow"])){echo $_POST["allow"] ? "checked" : "";} ?>>
                    <label for='allow'>Accetto i termini e condizioni d'uso di D&D Beyond.</label>
                </div>
                <?php if(isset($error)) {
                    foreach($error as $err) {
                        echo "<div class='errorj'><img src='/hw1/icons/close.svg'/><span>".$err."</span></div>";
                    }
                } ?>
                <div>
                    <input class="contained-button" type='submit' value="Registrati" id="submit">
                </div>
            </form>
            <div class="login"><h4>Hai già un account</h4></div>
            <a class="contained-button contained-button-red" href="/hw1/pages/login/login.php">ACCEDI</a>
        </section>
        </main>
    </body>
</html>